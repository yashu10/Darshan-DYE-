/**
 * Static export: `npm run build` writes a plain HTML/CSS/JS site to `out/`,
 * which can be hosted anywhere (Hostinger public_html, Netlify...).
 * Plain JS so it loads even where the native SWC binary is unavailable.
 *
 * @type {import("next").NextConfig}
 */
const nextConfig = {
  output: "export",
  // /about/ -> out/about/index.html, which every static host serves without extra rules.
  trailingSlash: true,
  // The optimiser needs a server; images are pre-sized in public/assets instead.
  images: { unoptimized: true },
  reactStrictMode: true
};

export default nextConfig;
