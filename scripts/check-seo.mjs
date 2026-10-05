import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";

const root = path.resolve("dist");
const read = (file) => readFileSync(file, "utf8");
const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
  entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]);
const pages = walk(root).filter((file) => file.endsWith(".html") && !file.includes(`${path.sep}fonts${path.sep}`));
const sitemap = read(path.join(root, "sitemap.xml"));
const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
assert.equal(new Set(locations).size, locations.length, "Duplicate sitemap URLs");
let checked = 0;
for (const file of pages) {
  const html = read(file);
  const route = "/" + path.relative(root, file).replaceAll(path.sep, "/").replace(/\.html$/, "").replace(/^index$/, "");
  if (route === "/main") {
    assert.match(html, /name="robots" content="noindex, follow"/);
    assert(!locations.includes("https://edwardscapes.com/main"));
    continue;
  }
  const canonical = "https://edwardscapes.com" + route;
  assert.equal((html.match(/rel="canonical"/g) || []).length, 1, `${route}: canonical count`);
  assert(html.includes(`rel="canonical" href="${canonical}"`), `${route}: canonical URL`);
  assert(locations.includes(canonical), `${route}: sitemap inclusion`);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${route}: H1 count`);
  assert.match(html, /<title>[^<]+<\/title>/, `${route}: title`);
  assert.match(html, /name="description" content="[^"]+"/, `${route}: description`);
  for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) {
    assert.match(tag, /\balt="[^"]+"/, `${route}: missing image description: ${tag}`);
  }
  for (const [, href] of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    const target = decodeURIComponent(href.split(/[?#]/)[0]);
    assert(!target.endsWith(".html"), `${route}: redirecting link ${href}`);
    assert(!target.startsWith("/cdn-cgi/"), `${route}: protected email link`);
    const local = path.join(root, target === "/" ? "index.html" : target.slice(1));
    assert(existsSync(local) || existsSync(local + ".html"), `${route}: broken local link ${href}`);
  }
  assert.match(html, /<!--email_off-->[\s\S]*?mailto:Will@edwardscapes\.com[\s\S]*?<!--\/email_off-->/, `${route}: email exclusion survives build`);
  checked++;
}
assert.equal(locations.length, checked, "Sitemap contains unexpected pages");
assert.match(read(path.join(root, "robots.txt")), /Sitemap: https:\/\/edwardscapes\.com\/sitemap\.xml/);
console.log(`SEO checks passed for ${checked} pages: canonical URLs, sitemap, headings, descriptions, image alt text, local links, and email exclusions.`);
