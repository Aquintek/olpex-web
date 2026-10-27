import { PILLARS } from "@/lib/content";

export function Pillars() {
  return (
    <section aria-label="Por qué OLPEX" className="border-y border-stroke">
      {/* 1px gaps over the stroke color draw the hairline dividers at every breakpoint. */}
      <div className="mx-auto grid max-w-[1200px] gap-px bg-stroke sm:grid-cols-2 lg:grid-cols-4">
        {PILLARS.map((p) => (
          <div key={p.label} className="bg-canvas px-4 py-10 sm:px-6 lg:px-8">
            <p className="eyebrow">{p.label}</p>
            <p className="heading mt-4 text-[32px] text-ink">{p.value}</p>
            <p className="mt-3 text-sm leading-relaxed text-mute">{p.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
