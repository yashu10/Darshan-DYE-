/**
 * Regenerates the favicon and app icons from the logo mark.
 *   node scripts/generate-icons.mjs
 * Writes src/app/icon.svg, src/app/apple-icon.png and public/icons/*.png.
 */
import { mkdir, writeFile } from "node:fs/promises";
import sharp from "sharp";

const MARK = [
  ["M7 6h8c0 4-3 7-8 8z", "#3a31c9"],
  ["M15 6c6 0 10 4 10 9-5 0-10-3-10-9z", "#8e2fb0"],
  ["M7 15c5 0 8 3 8 11H7z", "#c68a22"],
  ["M25 15c0 6-4 11-10 11 0-6 4-10 10-11z", "#24c498"]
];

/** `radius` rounds the dark tile (browser tab icon); `scale` shrinks the mark so it survives circular masks. */
const svg = ({ radius = 0, scale = 1 }) => {
  const offset = (32 - 32 * scale) / 2;
  const paths = MARK.map(([d, fill]) => `<path d="${d}" fill="${fill}"/>`).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="${radius}" fill="#09090f"/><g transform="translate(${offset} ${offset}) scale(${scale})">${paths}</g></svg>`;
};

await mkdir("public/icons", { recursive: true });
await writeFile("src/app/icon.svg", svg({ radius: 6 }));

const png = (markup, size, file) => sharp(Buffer.from(markup), { density: 600 }).resize(size, size).png().toFile(file);

await png(svg({}), 180, "src/app/apple-icon.png");
await png(svg({}), 192, "public/icons/icon-192.png");
await png(svg({}), 512, "public/icons/icon-512.png");
await png(svg({ scale: 0.72 }), 512, "public/icons/icon-maskable-512.png");
console.log("icons written");
