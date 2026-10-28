"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { PILLARS } from "@/lib/content";
import "./pillars.css";

const i = (n: number) => ({ "--i": n }) as CSSProperties;

export function Pillars() {
  const ref = useRef<HTMLElement>(null);
  const [online, setOnline] = useState(false);

  // The panel "powers on" the first time it scrolls into view.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOnline(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} aria-label="Por qué OLPEX" data-online={online} className="readouts border-y border-stroke">
      {/* 1px gaps over the stroke color draw the hairline dividers at every breakpoint. */}
      {/* Phones get a 2×2 grid with tighter padding and type, so the band stays short. */}
      <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-px bg-stroke lg:grid-cols-4">
        {PILLARS.map((p, n) => (
          <div key={p.label} className="readout bg-canvas px-4 py-6 sm:px-6 sm:py-10 lg:px-8" style={i(n)}>
            {/* Label and value share one font and size; only color separates them. */}
            {/* The LED hangs in the cell padding so label and value share one left edge. */}
            <p className="heading-sm flex items-center gap-2 text-xl text-soft sm:-ml-[15px] sm:text-[28px]">
              <span className="readout-led" aria-hidden="true" />
              {p.label}
            </p>
            <p className="readout-value heading-sm mt-0.5 text-xl text-chalk tabular-nums sm:mt-1 sm:text-[28px]">
              <Counter value={p.value} run={online} delay={n * 120} />
            </p>
            <p className="mt-2 text-[13px] leading-normal text-mute sm:mt-3 sm:text-sm sm:leading-relaxed">{p.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// Counts the numeric part of a value ("+10 años") up from zero, like an instrument settling.
function Counter({ value, run, delay }: { value: string; run: boolean; delay: number }) {
  const match = value.match(/^(\D*)(\d+)(.*)$/);
  const target = match ? Number(match[2]) : 0;
  const [shown, setShown] = useState(target);

  useEffect(() => {
    if (!match || !run) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const duration = 900;
    const start = performance.now() + delay;
    const tick = (now: number) => {
      const t = Math.min(Math.max((now - start) / duration, 0), 1);
      setShown(Math.round(target * (1 - Math.pow(1 - t, 4))));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [run]);

  if (!match) return <>{value}</>;
  return (
    <>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true">
        {match[1]}
        {shown}
        {match[3]}
      </span>
    </>
  );
}
