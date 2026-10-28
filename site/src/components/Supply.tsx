import type { CSSProperties } from "react";
import Image from "next/image";
import { asset } from "@/lib/asset";
import { SUPPLY_ITEMS } from "@/lib/content";
import { SectionHeader } from "./SectionHeader";

export function Supply() {
  return (
    <section id="suministro" aria-labelledby="suministro-titulo" className="border-y border-stroke bg-surface/40">
      <div className="container-page grid items-center gap-12 py-24 md:grid-cols-2 md:py-32">
        <div>
          <SectionHeader id="suministro-titulo" eyebrow="Excelentes tiempos de importación" title="Suministro de equipos" />
          <ul className="mt-8 divide-y divide-stroke border-y border-stroke" data-reveal style={{ "--d": "180ms" } as CSSProperties}>
            {SUPPLY_ITEMS.map((item) => (
              <li key={item} className="py-4 text-base text-soft">
                {item}
              </li>
            ))}
          </ul>
          <a href="mailto:compras@olpex.net" className="btn btn-dark mt-8">
            Escribir a compras@olpex.net
          </a>
        </div>
        <div className="surface-raised relative aspect-[16/10] overflow-hidden rounded-md border border-stroke bg-surface">
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
