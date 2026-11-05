# Darshan Dye-Chem website

Next.js 16 (App Router, TypeScript) static site for darshandyechem.com. It exports plain HTML to `out/`.

## Scripts
- `npm run dev` start the dev server
- `npm run build` build and export to `out/`
- `npm run lint` / `npm run typecheck` quality checks
- `npm run preview` serve `out/` locally
- `node scripts/generate-icons.mjs` regenerate favicons

## Structure
- `src/app` pages, metadata routes (`robots.ts`, `sitemap.ts`, `manifest.ts`, `llms.txt`, `llms-full.txt`)
- `src/data` all content (dyes, FAQs, SEO titles, contacts); edit here, pages, schema and `llms.txt` follow
- `src/lib` schema (JSON-LD), metadata helpers, calculator, enquiry form
- `src/components` UI by section
- `public` images, shade card PDFs, `.htaccess`

## SEO / AEO / GEO
- Per-page title, description, canonical, Open Graph, Twitter (`src/data/seo.ts`)
- JSON-LD graph per page: Organization/LocalBusiness, WebSite, WebPage, BreadcrumbList, FAQPage, dye ItemList
- `llms.txt` and `llms-full.txt` generated from the same data; `robots.txt` allows AI crawlers
- Set `NEXT_PUBLIC_SITE_URL` and the verification variables (see `.env.example`)

## Deploy (Hostinger)
1. Push to `main`; the workflow publishes `out/` to the `production` branch.
2. In hPanel, Git deploy from the `production` branch (or upload the contents of `out/` to `public_html`).
3. Submit `https://darshandyechem.com/sitemap.xml` in Google Search Console.
