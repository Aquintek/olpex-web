import Image from "next/image";
import { asset } from "@/lib/asset";
import { SERVICES } from "@/lib/content";
import { SectionHeader } from "./SectionHeader";

export function Services() {
  return (
    <section id="servicios" className="container-page py-24 md:py-32">
      <SectionHeader
        eyebrow="Servicios"
        title="Cinco disciplinas, un mismo responsable"
        text="Atendemos la planta completa: desde el tablero eléctrico hasta el transportador, el aire comprimido y el PLC que los coordina."
      />

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s) => (
          <article
            key={s.id}
            id={s.id}
            data-reveal
            className="card-reveal surface-raised flex flex-col overflow-hidden rounded-md border border-stroke bg-surface/30 target:border-brand-2"
          >
            <div className="scan relative aspect-[4/3] overflow-hidden bg-surface">
              <Image
                src={asset(s.photo)}
                alt={s.alt}
                fill
                sizes="(min-width: 1024px) 384px, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-canvas/20" aria-hidden="true" />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="heading-sm text-2xl">{s.title}</h3>
              <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-mute">
                {s.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-[9px] h-px w-3 shrink-0 bg-brand" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}

        <Thermography />
      </div>
    </section>
  );
}

function Thermography() {
  return (
    <article data-reveal className="card-reveal surface-raised flex flex-col overflow-hidden rounded-md border border-stroke bg-surface">
      <div className="grid aspect-[4/3] grid-cols-2 gap-px bg-stroke">
        {[1, 2].map((n) => (
          <div key={n} className="scan relative overflow-hidden">
            <Image
              src={asset(`/fotos/termografia-${n}.webp`)}
              alt={`Imagen termográfica de un tablero eléctrico, lectura ${n}`}
              fill
              sizes="(min-width: 1024px) 192px, (min-width: 640px) 25vw, 50vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="eyebrow flex items-center gap-2">
          <span className="status-dot" />
          En campo
        </p>
        <h3 className="heading-sm mt-3 text-2xl">Estudios de termografía</h3>
        <p className="mt-5 text-sm leading-relaxed text-mute">
          Detectamos puntos calientes en barras, breakers y conexiones antes de que se conviertan en un
          paro de línea. Entregamos el reporte con lecturas, hallazgos y prioridad de corrección.
        </p>
      </div>
    </article>
  );
}
