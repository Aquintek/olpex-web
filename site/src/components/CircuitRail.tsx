"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import "./circuit-rail.css";

type Stop = { y: number; rung: number };
type Geometry = { top: number; height: number; stops: Stop[]; gap: [number, number] | null };

// Clearance kept between the rail and the moving client logos.
const GAP_PAD = 24;

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

    // Layout position inside <main>. Offsets ignore transforms, so headers that are
    // still shifted down by their scroll reveal measure where they will settle.
    const offsetIn = (el: HTMLElement) => {
      let x = 0;
      let y = 0;
      for (let n: HTMLElement | null = el; n && n !== main; n = n.offsetParent as HTMLElement | null) {
        x += n.offsetLeft;
        y += n.offsetTop;
      }
      return { x, y };
    };

    const measure = () => {
      if (getComputedStyle(rail).display === "none") return;
      const railLeft = rail.offsetLeft;
      const dots = Array.from(main.querySelectorAll("section"))
        .map((s) => s.querySelector<HTMLElement>(".section-label .status-dot, .eyebrow .status-dot"))
        .filter((d): d is HTMLElement => d !== null);
      if (dots.length < 2) return;

      const points = dots.map((d) => {
        const o = offsetIn(d);
        return { y: o.y + d.offsetHeight / 2, x: o.x - railLeft };
      });
      const top = points[0].y;
      // The rail breaks where the full-width logo marquee runs, so it never crosses the logos.
      const marquee = main.querySelector<HTMLElement>(".client-marquee");
      const mq = marquee ? offsetIn(marquee).y : 0;
      setGeo({
        top,
        height: points[points.length - 1].y - top,
        // Only headers in the left column get a rung; others would cross content.
        stops: points.map((p) => ({ y: p.y - top, rung: p.x < 160 ? Math.max(p.x - 6, 0) : 0 })),
        gap: marquee
          ? [mq - top - GAP_PAD, mq + marquee.offsetHeight - top + GAP_PAD]
          : null,
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
      data-gap={geo?.gap ? true : undefined}
      style={
        geo
          ? ({
              top: geo.top,
              height: geo.height,
              "--gap-a": `${geo.gap?.[0] ?? 0}px`,
              "--gap-b": `${geo.gap?.[1] ?? 0}px`,
            } as CSSProperties)
          : undefined
      }
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
