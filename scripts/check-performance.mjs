import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";

const root = path.resolve("dist");
const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]
  );
const pages = walk(root).filter(
  (file) => file.endsWith(".html") && !file.includes(`${path.sep}fonts${path.sep}`)
);
for (const file of pages) {
  const html = readFileSync(file, "utf8");
  assert(!html.includes("maps.googleapis.com"), `${file}: unused map API`);
  const assets = [
    ...html.matchAll(/(?:href|src)="(\/(?:css|js|_astro)\/[^"?]+\.(?:css|js))"/g),
  ].map((match) => match[1]);
  for (const url of assets) {
    assert.match(url, /\.[a-f0-9]{12}\.(css|js)$/, `${file}: asset bypassed optimization: ${url}`);
    assert(existsSync(path.join(root, url.slice(1))), `${file}: missing asset ${url}`);
    assert(
      !/google-map|stellar|scrollax|jquery\.easing/.test(url),
      `${file}: unused plugin ${url}`
    );
  }
  if (file === path.join(root, "index.html")) {
    const size = (ext) =>
      assets
        .filter((url) => url.endsWith(ext))
        .reduce((sum, url) => sum + readFileSync(path.join(root, url.slice(1))).length, 0);
    assert(size(".css") < 150000, "Homepage CSS exceeds 150 kB budget");
    assert(size(".js") < 200000, "Homepage JS exceeds 200 kB budget");
    assert(
      !assets.some((url) => /owl|magnific|waypoints|animate/.test(url)),
      "Homepage loads unused interactive features"
    );
    console.log(`Homepage local assets: ${size(".css")} bytes CSS, ${size(".js")} bytes JS.`);
  }
  if (/[/\\](about|gallery)\.html$/.test(file)) {
    assert(
      assets.some((url) => /owl\.carousel.*\.js$/.test(url)),
      `${file}: carousel missing`
    );
    assert(
      assets.some((url) => /waypoints.*\.js$/.test(url)),
      `${file}: animation support missing`
    );
    const css = assets
      .filter((url) => url.endsWith(".css"))
      .map((url) => readFileSync(path.join(root, url.slice(1)), "utf8"))
      .join("\n");
    assert(css.includes(".owl-stage"), `${file}: generated carousel styles removed`);
    if (file.endsWith("gallery.html")) {
      assert(
        assets.some((url) => /magnific.*\.js$/.test(url)),
        "Gallery lightbox missing"
      );
      assert(css.includes(".mfp-wrap"), "Generated lightbox styles removed");
    }
  }
}
console.log(`Performance asset checks passed for ${pages.length} pages.`);
