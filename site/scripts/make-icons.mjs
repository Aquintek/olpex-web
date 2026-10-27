// Builds icon.svg, apple-touch-icon.png and og.png from the gear geometry in GearCircuit.tsx.
import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";

const src = await readFile("src/components/GearCircuit.tsx", "utf8");
const get = (name) => src.match(new RegExp(`export const ${name} =\\s*"([^"]+)"`))[1];
const traces = [...src.matchAll(/"(M[^"]+H470)"/g)].map((m) => m[1]);
const ys = [70, 154, 238, 322, 406, 490];

const mark = (sw) =>
  `<g fill="none" stroke="#1597C4" stroke-linecap="round" stroke-linejoin="round" stroke-width="${sw}">` +
  [get("RING"), get("GEAR"), get("INNER"), ...traces].map((d) => `<path d="${d}"/>`).join("") +
  `</g><g fill="#1597C4">${ys.map((y) => `<circle cx="480" cy="${y}" r="${sw + 4}"/>`).join("")}</g>`;

const icon =
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">` +
  `<rect width="512" height="512" rx="104" fill="#061A33"/>` +
  `<svg x="56" y="46" width="400" height="420" viewBox="60 40 440 480">${mark(22)}</svg></svg>`;
await writeFile("public/icon.svg", icon);
await sharp(Buffer.from(icon)).resize(180).png().toFile("public/apple-touch-icon.png");

const og =
  `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">` +
  `<rect width="1200" height="630" fill="#061A33"/>` +
  `<svg x="80" y="95" width="400" height="440" viewBox="60 40 440 480">${mark(9)}</svg>` +
  `<text x="560" y="300" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="120" fill="#EAF2FA" letter-spacing="-2">OLPEX</text>` +
  `<text x="566" y="352" font-family="Courier New, monospace" font-size="26" fill="#8DA2BF" letter-spacing="9">ENGINEERING SOLUTIONS</text>` +
  `<text x="566" y="440" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="#4FA8FF">Ingenieros de servicios para la industria</text></svg>`;
await sharp(Buffer.from(og)).png().toFile("public/og.png");
console.log("icons ok");
