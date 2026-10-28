"use client";

import { useEffect, useState } from "react";
import { WHATSAPP_URL } from "@/lib/content";

// Floating WhatsApp link to +502 3741-9090. Sits under the mobile menu (z-50).
// It steps aside over the contact section and footer, which carry their own
// WhatsApp link, so it never covers the map or the form there.
export function WhatsAppButton() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const targets = ["#contacto", "footer"]
      .map((s) => document.querySelector(s))
      .filter((el): el is Element => el !== null);
    const inView = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) inView.add(e.target);
          else inView.delete(e.target);
        }
        setHidden(inView.size > 0);
      },
      { rootMargin: "0px 0px -35% 0px" },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbanos por WhatsApp"
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
      data-hidden={hidden || undefined}
      className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 flex size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.25),0_2px_4px_rgb(0_0_0/0.25),0_12px_28px_-8px_rgb(0_0_0/0.55)] transition-[opacity,translate,scale] duration-200 ease-(--ease-out-quint) select-none hover:scale-105 active:scale-[0.97] active:duration-100 data-hidden:pointer-events-none data-hidden:translate-y-2 data-hidden:scale-95 data-hidden:opacity-0 sm:right-6 sm:bottom-6 motion-reduce:data-hidden:translate-y-0 motion-reduce:data-hidden:scale-100"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}
