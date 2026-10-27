"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import "./circuit-rail.css";

type Stop = { y: number; rung: number };
type Geometry = { top: number; height: number; stops: Stop[] };

/*
 * A vertical trace in the left gutter that links every section header, like the
 * rail of a ladder diagram. It fills 1:1 with scroll and closes a rung into each
 * section as the reader reaches it. Wide screens only, where the gutter exists.
 */
export function CircuitRail() {
  const railRef = useRef<HTMLDivElement>(null);
  const [geo, setGeo] = useState<Geometry | null>(null);

  // Measure where each section's status dot sits, relative to <main>.
  useEffect(() => {
    const rail = railRef.current;
    const main = rail?.parentElement;
    if (!rail || !main) return;

    const measure = () => {
      if (getComputedStyle(rail).display === "none") return;
      const mainTop = main.getBoundingClientRect().top;
      const railLeft = rail.getBoundingClientRect().left;
      const dots = Array.from(main.querySelectorAll("section"))
        .map((s) => s.querySelector<HTMLElement>(".eyebrow .status-dot"))
        .filter((d): d is HTMLElement => d !== null);
      if (dots.length < 2) return;

      const points = dots.map((d) => {
        const r = d.getBoundingClientRect();
        return { y: r.top + r.height / 2 - mainTop, x: r.left - railLeft };
      });
      const top = points[0].y;
      setGeo({
        top,
        height: points[points.length - 1].y - top,
        // Only headers in the left column get a rung; others would cross content.
        stops: points.map((p) => ({ y: p.y - top, rung: p.x < 160 ? Math.max(p.x - 6, 0) : 0 })),
      });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(main);
    document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, []);

  // Fill the rail up to a line just below the middle of the viewport.
  useEffect(() => {
    const rail = railRef.current;
    if (!rail || !geo) return;
    const stops = Array.from(rail.querySelectorAll<HTMLElement>("[data-stop]"));
    let frame = 0;

    const update = () => {
      frame = 0;
      const reach = window.innerHeight * 0.55 - rail.getBoundingClientRect().top;
      const p = Math.min(Math.max(reach / geo.height, 0), 1);
      rail.style.setProperty("--p", String(p));
      stops.forEach((el, n) => {
        el.dataset.lit = String(reach >= geo.stops[n].y);
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [geo]);

  return (
    <div
      ref={railRef}
      className="circuit-rail"
      aria-hidden="true"
      data-ready={geo !== null}
      style={geo ? { top: geo.top, height: geo.height } : undefined}
    >
      <span className="circuit-rail__track" />
      <span className="circuit-rail__lit" />
      {geo?.stops.map((s, n) => (
        <span
          key={n}
          data-stop
          className="circuit-rail__stop"
          style={{ top: s.y, "--rung": `${s.rung}px` } as CSSProperties}
        />
      ))}
    </div>
  );
}
