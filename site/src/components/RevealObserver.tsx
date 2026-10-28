"use client";

import { useEffect } from "react";
import "./reveal.css";

/*
 * Page-wide observers, mounted once.
 *
 * 1. Reveal: anything marked [data-reveal] gets [data-visible] the first time it
 *    crosses into view, and keeps it. Setting html[data-reveal-ready] tells the
 *    inline fallback in layout.tsx that reveals are live (see there).
 * 2. Pause: anything marked [data-pause-offscreen] gets [data-offscreen] while it
 *    is out of view, so its looping CSS animation stops costing frames.
 */
export function RevealObserver() {
  useEffect(() => {
    document.documentElement.dataset.revealReady = "";

    const reveal = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.visible = "";
          reveal.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => reveal.observe(el));

    const pause = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const el = entry.target as HTMLElement;
        if (entry.isIntersecting) delete el.dataset.offscreen;
        else el.dataset.offscreen = "";
      }
    });
    document.querySelectorAll<HTMLElement>("[data-pause-offscreen]").forEach((el) => pause.observe(el));

    return () => {
      reveal.disconnect();
      pause.disconnect();
    };
  }, []);

  return null;
}
