import { GEAR, INNER, NODES_Y, RING, TRACES } from "./GearCircuit";

// Static brand mark: the same gear geometry as the hero, without animation.
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="60 40 440 480" className="h-8 w-auto text-brand" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <path d={RING} strokeWidth={18} />
          <path d={GEAR} strokeWidth={18} />
          <path d={INNER} strokeWidth={16} />
          {TRACES.map((d) => (
            <path key={d} d={d} strokeWidth={16} />
          ))}
        </g>
        <g fill="currentColor">
          {NODES_Y.map((cy) => (
            <circle key={cy} cx="480" cy={cy} r="20" />
          ))}
        </g>
      </svg>
      <span className="flex flex-col leading-none">
        <span className="text-[19px] font-bold tracking-[-0.02em] text-ink">OLPEX</span>
        <span className="mt-1 font-mono text-[7.5px] tracking-[0.28em] text-mute">
          ENGINEERING SOLUTIONS
        </span>
      </span>
    </span>
  );
}
