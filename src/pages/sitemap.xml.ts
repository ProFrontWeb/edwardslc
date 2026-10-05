import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
  const pages = Object.keys(import.meta.glob("./**/*.astro"))
    .map((file) => file.replace(/^\.\//, "/").replace(/\.astro$/, "").replace(/\/index$/, "/"))
    .filter((route) => route !== "/main")
    .sort();
  const urls = pages.map((route) => `<url><loc>${new URL(route, site).href}</loc></url>`).join("\n");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
