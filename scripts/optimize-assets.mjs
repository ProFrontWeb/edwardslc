import { createHash } from "node:crypto";
import { readFile, writeFile, readdir } from "node:fs/promises";
import path from "node:path";
import { PurgeCSS } from "purgecss";
import { transform } from "esbuild";

const walk = async (dir) =>
  (
    await Promise.all(
      (await readdir(dir, { withFileTypes: true })).map((entry) =>
        entry.isDirectory() ? walk(path.join(dir, entry.name)) : path.join(dir, entry.name)
      )
    )
  ).flat();

// Run after Astro renders HTML so generated/scoped classes are visible to PurgeCSS.
// Keep output alongside its source asset so relative font/image URLs still resolve.
export async function optimizeAssets(dir) {
  const files = await walk(dir);
  const pages = await Promise.all(
    files
      .filter((file) => file.endsWith(".html") && !file.includes(`${path.sep}fonts${path.sep}`))
      .map(async (file) => ({ file, html: await readFile(file, "utf8") }))
  );
  const content = pages.map(({ html }) => ({ raw: html, extension: "html" }));
  content.push({ raw: await readFile(path.join(dir, "js/main.js"), "utf8"), extension: "js" });
  const urls = new Set();
  for (const { html } of pages) {
    for (const [, url] of html.matchAll(
      /(?:href|src)="(\/(?:css|js|_astro)\/[^"?]+\.(?:css|js))"/g
    ))
      urls.add(url);
  }
  const replacements = new Map();
  let before = 0,
    after = 0;
  for (const url of urls) {
    const file = path.join(dir, url.slice(1));
    const source = await readFile(file, "utf8");
    const css = url.endsWith(".css");
    let code = source;
    if (css) {
      const [result] = await new PurgeCSS().purge({
        content,
        css: [{ raw: source }],
        // Bootstrap transitions and classes inserted by the carousel/lightbox plugins.
        safelist: {
          standard: [
            "show",
            "collapse",
            "collapsing",
            "active",
            "disabled",
            "fade",
            "modal-open",
            "ftco-animated",
            "item-animate",
            "fadeIn",
            "fadeInUp",
            "fadeInLeft",
            "fadeInRight",
          ],
          greedy: [/owl-/, /mfp-/],
        },
      });
      code = result.css;
    }
    const result = await transform(code, {
      loader: css ? "css" : "js",
      minify: true,
      legalComments: "inline",
      target: "es2018",
    });
    const hash = createHash("sha256").update(result.code).digest("hex").slice(0, 12);
    const extension = path.extname(url);
    const optimizedUrl = `${url.slice(0, -extension.length)}.${hash}${extension}`;
    await writeFile(path.join(dir, optimizedUrl.slice(1)), result.code);
    replacements.set(url, optimizedUrl);
    before += Buffer.byteLength(source);
    after += Buffer.byteLength(result.code);
  }
  for (const { file, html } of pages) {
    const optimized = html.replace(/(href|src)="([^\"]+)"/g, (tag, attr, url) =>
      replacements.has(url) ? `${attr}="${replacements.get(url)}"` : tag
    );
    await writeFile(file, optimized);
  }
  console.log(
    `Optimized ${urls.size} local CSS/JS assets: ${before} -> ${after} bytes (before compression).`
  );
}
