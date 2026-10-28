"use client";

import { useEffect } from "react";
import "./reveal.css";

/*
 * One observer for the whole page. Anything marked [data-reveal] gets
 * [data-visible] the first time it crosses into view, and keeps it: content
 * reveals once and never re-animates on scroll back.
 */
export function RevealObserver() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.visible = "";
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
