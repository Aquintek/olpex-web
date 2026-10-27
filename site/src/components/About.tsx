import Image from "next/image";
import { SectionHeader } from "./SectionHeader";

const VALUES = ["Seguridad", "Costos transparentes", "Estándares de calidad"];

export function About() {
  return (
    <section id="nosotros" className="container-page grid items-center gap-12 py-24 md:grid-cols-[1fr_1.15fr] md:py-32">
      <div className="relative order-last aspect-[4/5] overflow-hidden rounded-md border border-stroke md:order-first">
        <Image
          src="/fotos/instalaciones-electricas.webp"
          alt="Instalación eléctrica y de ductos terminada en una planta industrial"
          fill
          sizes="(min-width: 768px) 45vw, 100vw"
          className="object-cover"
        />
      </div>

      <div>
        <SectionHeader eyebrow="Nosotros" title="Un equipo que da tranquilidad en planta" />
        <div className="mt-6 space-y-5 text-base leading-relaxed text-mute">
          <p>
            OLPEX se especializa en servicios eléctricos, mecánicos y de automatización. Diseñamos,
            instalamos y mantenemos las soluciones que hacen que una planta produzca más y se detenga
            menos.
          </p>
          <p>
            Nuestro equipo trabaja para superar lo que se espera de cada proyecto. Los clientes nos
            buscan por la confianza que generamos: priorizamos la seguridad, mostramos los costos con
            transparencia y cumplimos los estándares de calidad en cada material y cada operación.
          </p>
        </div>
        <ul className="mt-8 flex flex-wrap gap-2">
          {VALUES.map((v) => (
            <li key={v} className="rounded-xs border border-stroke px-3 py-1.5 font-mono text-xs uppercase tracking-[0.06em] text-soft">
              {v}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
