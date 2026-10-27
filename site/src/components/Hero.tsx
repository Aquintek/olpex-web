import { ArrowRight } from "lucide-react";
import { GearCircuit } from "./GearCircuit";
import "./blueprint.css";

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden">
      <div className="blueprint-grid" aria-hidden="true" />
      <div className="container-page relative grid items-center gap-12 pt-16 pb-24 md:grid-cols-[1.1fr_1fr] md:pt-24 md:pb-32">
        <div>
          <p className="eyebrow flex items-center gap-2">
            <span className="status-dot" />
            Guatemala · EE.UU. · México · Caribe
          </p>
          <h1 className="display mt-6 text-[44px] sm:text-6xl lg:text-[72px]">
            Ingenieros <span className="text-brand-2">de servicios</span> para la industria
          </h1>
          <p className="mt-6 max-w-[34rem] text-base leading-relaxed text-mute sm:text-lg">
            Mantenimiento eléctrico, mecánico y neumático, automatización con PLC y SCADA, fabricación
            de transportadores y suministro de equipos. Un solo equipo para que su línea no se detenga.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#contacto" className="btn btn-light">
              Solicitar cotización
            </a>
            <a href="#servicios" className="btn btn-ghost">
              Ver servicios <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Drawing sheet: corner marks and captions frame the diagram like a technical figure. */}
        <div className="blueprint-frame">
          <span className="bp-corner bp-tl" aria-hidden="true" />
          <span className="bp-corner bp-tr" aria-hidden="true" />
          <span className="bp-corner bp-bl" aria-hidden="true" />
          <span className="bp-corner bp-br" aria-hidden="true" />
          <p className="bp-caption bp-caption-top" aria-hidden="true">
            Fig. 01 · Áreas de servicio
          </p>
          <GearCircuit />
          <p className="bp-caption bp-caption-bottom" aria-hidden="true">
            14.6349° N · 90.5069° O
          </p>
        </div>
      </div>
    </section>
  );
}
