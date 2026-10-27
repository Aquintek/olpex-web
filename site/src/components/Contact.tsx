import { ArrowUpRight } from "lucide-react";
import { EMAILS, PHONES, QUOTE_MAILTO, WHATSAPP_URL } from "@/lib/content";
import { SectionHeader } from "./SectionHeader";

export function Contact() {
  return (
    <section id="contacto" className="container-page grid items-start gap-12 py-24 md:grid-cols-[1fr_480px] md:py-32">
      <div>
        <SectionHeader
          eyebrow="Contacto"
          title="Hablemos de su próximo proyecto"
          text="Para requerimientos generales puede llamarnos o escribirnos. Le respondemos con una propuesta técnica y un costo claro."
        />
        <div className="mt-10">
          <p className="eyebrow">Teléfonos</p>
          <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {PHONES.map((p) => (
              <li key={p.tel}>
                <a href={`tel:${p.tel}`} className="text-lg tabular-nums text-ink transition-colors duration-150 hover:text-brand-2">
                  {p.display}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-md bg-chalk p-6 text-navy shadow-[0_1px_2px_rgb(0_0_0/0.3),0_24px_56px_-28px_rgb(0_0_0/0.7)] sm:p-8">
        <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.08em] text-[#3f5674]">
          <span className="status-dot" />
          Solicitar cotización
        </p>
        <h3 className="heading mt-4 text-[30px] sm:text-[36px]">Cuéntenos qué necesita su planta</h3>
        <ul className="mt-6 divide-y divide-[#d5e1ee] border-y border-[#d5e1ee]">
          {EMAILS.map((e) => (
            <li key={e.address}>
              <a
                href={`mailto:${e.address}`}
                className="group flex items-center justify-between gap-4 py-3.5"
              >
                <span className="min-w-0">
                  <span className="block font-mono text-[11px] uppercase tracking-[0.08em] text-[#5a6f8a]">{e.label}</span>
                  <span className="block truncate text-base">{e.address}</span>
                </span>
                <ArrowUpRight className="size-4 shrink-0 text-[#5a6f8a] transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a href={QUOTE_MAILTO} className="btn flex-1 bg-navy text-chalk hover:bg-[#0e2c52]">
            Solicitar cotización
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn flex-1 border border-[#c4d3e4] text-navy hover:border-navy"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
