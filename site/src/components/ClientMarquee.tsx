import Image from "next/image";
import { asset } from "@/lib/asset";
import { CLIENTS } from "@/lib/content";
import { SectionHeader } from "./SectionHeader";
import "./client-marquee.css";

function LogoList({ hidden }: { hidden?: boolean }) {
  return (
    <ul
      className={hidden ? "client-marquee__list client-marquee__list--copy" : "client-marquee__list"}
      aria-hidden={hidden || undefined}
    >
      {CLIENTS.map((c) => (
        <li
          key={c.name}
          className="flex h-24 w-[200px] shrink-0 items-center justify-center rounded-md bg-chalk px-6 py-4"
        >
          <Image
            src={asset(c.logo)}
            alt={hidden ? "" : c.name}
            width={160}
            height={64}
            className="h-full max-h-16 w-auto max-w-full object-contain"
          />
        </li>
      ))}
    </ul>
  );
}

export function ClientMarquee() {
  return (
    <section aria-labelledby="clientes" className="py-24 md:py-32">
      <div className="container-page">
        <SectionHeader id="clientes" eyebrow="Clientes" title="Algunos de nuestros clientes" />
      </div>
      <div className="client-marquee mt-12">
        <div className="client-marquee__track" data-pause-offscreen>
          <LogoList />
          <LogoList hidden />
        </div>
      </div>
    </section>
  );
}
