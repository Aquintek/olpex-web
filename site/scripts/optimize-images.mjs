// Resizes and compresses the source photos in ../Fotos into public/fotos as WebP.
// Next's image optimizer does not run in a static export, so this replaces it.
import sharp from "sharp";
import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";

const SRC = path.resolve("../Fotos");
const OUT = path.resolve("public/fotos");
const MAX = 1400;

const slug = (name) =>
  name
    .replace(path.extname(name), "")
    .replace(/Progeamacion/i, "programacion")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

await mkdir(OUT, { recursive: true });
for (const file of await readdir(SRC)) {
  if (!/\.(jpe?g|png|webp)$/i.test(file)) continue;
  const out = path.join(OUT, `${slug(file)}.webp`);
  const info = await sharp(path.join(SRC, file))
    .rotate()
    .resize({ width: MAX, height: MAX, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(out);
  console.log(`${file} -> ${path.basename(out)} (${info.width}x${info.height}, ${Math.round(info.size / 1024)} KB)`);
}
