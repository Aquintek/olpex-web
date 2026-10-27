"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "./Logo";
import { NAV_LINKS } from "@/lib/content";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // The hairline under the bar only shows once content is actually underneath it.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header data-scrolled={scrolled} className="material scroll-edge sticky top-0 z-40">
      <nav className="container-page flex h-[72px] items-center justify-between" aria-label="Principal">
        <a href="#inicio" aria-label="OLPEX Engineering Solutions, ir al inicio">
          <Logo className="h-14" priority />
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-mono text-[13px] uppercase tracking-[0.06em] text-soft transition-colors duration-150 hover:text-chalk"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a href="#contacto" className="btn btn-light hidden h-9 sm:inline-flex">
            Solicitar cotización
          </a>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="inline-flex size-11 items-center justify-center rounded-xs border border-stroke text-ink transition-transform duration-100 ease-(--ease-out-quint) active:scale-[0.97] md:hidden"
              aria-label="Abrir menú"
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="material-thick w-[85vw] max-w-sm border-stroke p-6 text-ink">
              <SheetTitle className="sr-only">Menú</SheetTitle>
              <Logo className="h-16" />
              <ul className="mt-8 flex flex-col">
                {NAV_LINKS.map((link) => (
                  <li key={link.href} className="border-b border-stroke">
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block py-4 text-2xl tracking-[-0.02em] transition-colors duration-100 active:text-brand-2"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a href="#contacto" onClick={() => setOpen(false)} className="btn btn-light mt-8 w-full">
                Solicitar cotización
              </a>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
