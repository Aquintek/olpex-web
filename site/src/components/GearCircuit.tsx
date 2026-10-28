import type { CSSProperties } from "react";
import "./gear-circuit.css";

const i = (n: number) => ({ "--i": n }) as CSSProperties;

export const RING = "M326.3 166.2A170 170 0 1 0 326.3 393.8";
export const GEAR =
  "M275.6 220.9A96 96 0 0 0 263.9 208.3L273 187.3A118 118 0 0 0 250.3 173.2L235.5 190.8A96 96 0 0 0 201.9 184L195.1 162.1A118 118 0 0 0 168.7 166.2L169 189.2A96 96 0 0 0 139 205.8L119.6 193.6A118 118 0 0 0 102.3 213.9L117.3 231.2A96 96 0 0 0 105.5 263.3L82.8 266.6A118 118 0 0 0 82.8 293.4L105.5 296.7A96 96 0 0 0 117.3 328.8L102.3 346.1A118 118 0 0 0 119.6 366.4L139 354.2A96 96 0 0 0 169 370.8L168.7 393.8A118 118 0 0 0 195.1 397.9L201.9 376A96 96 0 0 0 235.5 369.2L250.3 386.8A118 118 0 0 0 273 372.7L263.9 351.7A96 96 0 0 0 275.6 339.1";
export const INNER = "M230.7 238A52 52 0 1 0 230.7 322";

// Each trace leaves the gear and ends on a service; the label links to its section.
const AREAS = [
  { label: "Eléctricos", href: "#electricos", y: 70, d: "M326.3 166.2L422.5 70H470" },
  { label: "Automatización", href: "#automatizacion", y: 154, d: "M275.6 220.9H345L411.9 154H470" },
  { label: "Mecánicos", href: "#mecanicos", y: 238, d: "M230.7 238H470" },
  { label: "Neumáticos", href: "#neumaticos", y: 322, d: "M230.7 322H470" },
  { label: "Estructuras", href: "#estructuras", y: 406, d: "M275.6 339.1H345L411.9 406H470" },
  { label: "Suministro", href: "#suministro", y: 490, d: "M326.3 393.8L422.5 490H470" },
];

export function GearCircuit({ className }: { className?: string }) {
  return (
    <nav aria-label="Áreas de servicio" className={className}>
      <svg className="gear-circuit" viewBox="16 30 764 500" data-pause-offscreen>
        {/* Drafting marks: center lines through the gear and the ring's diameter. */}
        <g className="annot" fill="none" aria-hidden="true">
          <path className="annot-center" d="M200 92V468M18 280H64M182 280H218" />
          <path d="M30 300V490M370 455V490M30 482H370M30 476V488M370 476V488" />
          <text x="200" y="508" textAnchor="middle">Ø 340</text>
        </g>

        <g fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path className="ln ln-ring" pathLength={1} d={RING} />
          <path className="ln ln-gear" pathLength={1} d={GEAR} />
          <path className="ln ln-inner" pathLength={1} d={INNER} />
        </g>
        {AREAS.map((a, n) => (
          <a key={a.href} href={a.href} className="area" style={i(n)}>
            <g fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path className="ln ln-trace" pathLength={1} d={a.d} />
              {/* A short bright segment that travels the trace, like a signal. */}
              <path className="pulse" pathLength={1} d={a.d} />
            </g>
            {/* Invisible hit area so the whole row is tappable, not just the text. */}
            <rect className="hit" x="455" y={a.y - 40} width="325" height="80" />
            <g className="node">
              <circle cx="480" cy={a.y} r="11" />
              <text x="506" y={a.y + 8}>
                {a.label}
              </text>
            </g>
          </a>
        ))}
      </svg>
    </nav>
  );
}
