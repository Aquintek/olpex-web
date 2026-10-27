import { ArrowRight } from "lucide-react";
import { GearCircuit } from "./GearCircuit";

export function Hero() {
  return (
    <section id="inicio" className="container-page grid items-center gap-12 pt-16 pb-24 md:grid-cols-[1.1fr_1fr] md:pt-24 md:pb-32">
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

      <div className="mx-auto w-full max-w-[460px] md:max-w-none">
        <GearCircuit />
      </div>
    </section>
  );
}
