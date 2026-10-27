import type { CSSProperties } from "react";
import "./gear-circuit.css";

const i = (n: number) => ({ "--i": n }) as CSSProperties;

export const RING = "M326.3 166.2A170 170 0 1 0 326.3 393.8";
export const GEAR =
  "M275.6 220.9A96 96 0 0 0 263.9 208.3L273 187.3A118 118 0 0 0 250.3 173.2L235.5 190.8A96 96 0 0 0 201.9 184L195.1 162.1A118 118 0 0 0 168.7 166.2L169 189.2A96 96 0 0 0 139 205.8L119.6 193.6A118 118 0 0 0 102.3 213.9L117.3 231.2A96 96 0 0 0 105.5 263.3L82.8 266.6A118 118 0 0 0 82.8 293.4L105.5 296.7A96 96 0 0 0 117.3 328.8L102.3 346.1A118 118 0 0 0 119.6 366.4L139 354.2A96 96 0 0 0 169 370.8L168.7 393.8A118 118 0 0 0 195.1 397.9L201.9 376A96 96 0 0 0 235.5 369.2L250.3 386.8A118 118 0 0 0 273 372.7L263.9 351.7A96 96 0 0 0 275.6 339.1";
export const INNER = "M230.7 238A52 52 0 1 0 230.7 322";
export const TRACES = [
  "M326.3 166.2L422.5 70H470",
  "M275.6 220.9H345L411.9 154H470",
  "M230.7 238H470",
  "M230.7 322H470",
  "M275.6 339.1H345L411.9 406H470",
  "M326.3 393.8L422.5 490H470",
];
export const NODES_Y = [70, 154, 238, 322, 406, 490];

export function GearCircuit({ className }: { className?: string }) {
  return (
    <svg
      className={className ? `gear-circuit ${className}` : "gear-circuit"}
      viewBox="60 40 440 480"
      aria-hidden="true"
    >
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path className="ln ln-ring" pathLength={1} d={RING} />
        <path className="ln ln-gear" pathLength={1} d={GEAR} />
        <path className="ln ln-inner" pathLength={1} d={INNER} />
        {TRACES.map((d, n) => (
          <path key={d} className="ln ln-trace" pathLength={1} style={i(n)} d={d} />
        ))}
      </g>
      <g className="nodes">
        {NODES_Y.map((cy, n) => (
          <circle key={cy} style={i(n)} cx="480" cy={cy} r="11" />
        ))}
      </g>
    </svg>
  );
}
