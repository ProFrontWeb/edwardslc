// @ts-check
import { defineConfig } from "astro/config";
import { fileURLToPath } from "node:url";
import { optimizeAssets } from "./scripts/optimize-assets.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://edwardscapes.com",
  trailingSlash: "never",
  integrations: [
    {
      name: "optimize-static-assets",
      hooks: { "astro:build:done": async ({ dir }) => optimizeAssets(fileURLToPath(dir)) },
    },
  ],
  build: {
    format: "file",
  },
});
