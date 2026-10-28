import type { CSSProperties } from "react";
import Image from "next/image";
import { asset } from "@/lib/asset";
import { SUPPLY_ITEMS } from "@/lib/content";
import { SectionHeader } from "./SectionHeader";

export function Supply() {
  return (
    <section id="suministro" aria-labelledby="suministro-titulo" className="border-y border-stroke bg-surface/40">
      {/*
       * Phones read title, photo, list. On desktop the left column is a real
       * block again (md:block) and the photo sits beside it.
       */}
      <div className="container-page flex flex-col gap-8 py-24 md:grid md:grid-cols-2 md:items-center md:gap-12 md:py-32">
        <div className="contents md:block">
          <SectionHeader id="suministro-titulo" eyebrow="Excelentes tiempos de importación" title="Suministro de equipos" />
          <ul
            className="order-3 divide-y divide-stroke border-y border-stroke md:mt-8"
            data-reveal
            style={{ "--d": "180ms" } as CSSProperties}
          >
            {SUPPLY_ITEMS.map((item) => (
              <li key={item} className="py-4 text-base text-soft">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="surface-raised relative order-2 aspect-[16/10] overflow-hidden rounded-md border border-stroke bg-surface md:order-none">
          <div className="scan absolute inset-0" data-reveal>
            <Image
              src={asset("/fotos/point-io-ab.webp")}
              alt="Módulos de entradas y salidas Allen-Bradley Point I/O en un tablero"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
