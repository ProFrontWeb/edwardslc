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
// Limits reflect the supplied openSEO audit's recommendations, not Google limits.
const descriptionRoutes = new Set(["/", "/about", "/contact", "/privacy", "/gallery", "/services"]);
const titleRoutes = new Set([
  "/blog/spring-to-summer-lawn-care", "/contact", "/gallery", "/services",
  "/services/aeration-seeding", "/services/fall-winter-cleanup",
  "/services/fertilization-weed-control",
]);
const decode = (text) => text.replace(/&amp;/g, "&").replace(/&apos;/g, "'").replace(/&quot;/g, '"')
  .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
  .replace(/&#x([\da-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)));
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
  const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/)[1];
  const meta = (attribute, key) => {
    const matches = [...head.matchAll(new RegExp(`<meta\\s+${attribute}="${key}"\\s+content="([^"]+)"`, "g"))];
    assert.equal(matches.length, 1, `${route}: exactly one ${key} in head`);
    return decode(matches[0][1]);
  };
  assert.equal((head.match(/<title>/g) || []).length, 1, `${route}: title count`);
  const pageTitle = decode(head.match(/<title>([^<]+)<\/title>/)[1]);
  const pageDescription = meta("name", "description");
  assert.equal(meta("property", "og:title"), pageTitle, `${route}: social title`);
  assert.equal(meta("property", "og:description"), pageDescription, `${route}: social description`);
  assert.equal(meta("property", "og:site_name"), "Edwards Landscape Group");
  assert.equal(meta("property", "og:url"), canonical);
  assert.equal(meta("property", "og:type"), /^\/blogs?\//.test(route) ? "article" : "website");
  assert.equal(meta("name", "twitter:card"), "summary_large_image");
  assert.equal(meta("name", "twitter:title"), pageTitle);
  assert.equal(meta("name", "twitter:description"), pageDescription);
  const imageUrl = new URL(meta("property", "og:image"));
  assert.equal(imageUrl.origin, "https://edwardscapes.com");
  assert.equal(meta("name", "twitter:image"), imageUrl.href);
  assert.equal(meta("name", "twitter:image:alt"), meta("property", "og:image:alt"));
  const imageBytes = readFileSync(path.join(root, decodeURIComponent(imageUrl.pathname).slice(1)));
  assert.equal(imageBytes.subarray(1, 4).toString(), "PNG", `${route}: PNG image`);
  assert.equal(meta("property", "og:image:type"), "image/png");
  assert.equal(Number(meta("property", "og:image:width")), imageBytes.readUInt32BE(16));
  assert.equal(Number(meta("property", "og:image:height")), imageBytes.readUInt32BE(20));
  assert(imageBytes.length < 5 * 1024 * 1024, `${route}: preview image size`);
  if (descriptionRoutes.has(route)) {
    const description = decode(html.match(/name="description" content="([^"]+)"/)[1]);
    assert(description.length >= 70 && description.length <= 160, `${route}: description length ${description.length}`);
  }
  if (titleRoutes.has(route)) {
    const title = decode(html.match(/<title>([^<]+)<\/title>/)[1]);
    assert(title.length <= 60, `${route}: title length ${title.length}`);
  }
  if (route === "/about" || route === "/contact") {
    let previous = 0;
    for (const [, level] of html.matchAll(/<h([1-6])\b/g)) {
      const current = Number(level);
      assert(current <= previous + 1, `${route}: heading skips H${previous} to H${current}`);
      previous = current;
    }
  }
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
console.log(`SEO checks passed for ${checked} pages: canonical URLs, social cards, sitemap, headings, descriptions, image alt text, local links, and email exclusions.`);
