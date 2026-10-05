# openSEO crawl fixes

The supplied audit is a crawl inventory, not a ranking or traffic baseline. It reports two missing blog image descriptions, a Cloudflare email-protection 404, and internal links through legacy .html redirects. Image URLs and redirect responses do not require HTML page titles or H1s. Short word counts alone do not establish poor content quality.

Changes include descriptive blog image alt text, clean internal links, production canonical URLs on all 20 content pages, an automatically generated sitemap, robots.txt discovery, Lynchburg service-page titles, and the missing About description. The template attribution page retains its content and has noindex; it is excluded from the sitemap.

Email links are wrapped in Cloudflare's documented email_off comments. The production build preserves those markers. Verify the deployed response after Cloudflare processing; if its settings or another minifier removes the markers, disable email obfuscation for the affected pages in Cloudflare.

## Verification

Run `npm ci`, `npm run build`, and `npm run test:seo`. The regression check crawls generated HTML for canonical/sitemap agreement, one H1, titles, descriptions, image alt text, local link destinations, and preserved email exclusions. Existing build warnings concern legacy CSS image/font references and an Astro dependency's unused imports.

After deploying the PR, rerun openSEO, verify the live sitemap and robots.txt, and confirm legacy .html URLs still redirect to clean URLs. The existing Cloudflare Pages clean-URL behavior is preserved. Submit https://edwardscapes.com/sitemap.xml in Search Console and compare impressions, clicks, CTR, and qualified inquiries over comparable periods after recrawling. No ranking improvement or new live audit score has been measured by this change.

References: [Google canonicalization guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls) and [Cloudflare email exclusions](https://developers.cloudflare.com/waf/tools/scrape-shield/email-address-obfuscation/).
