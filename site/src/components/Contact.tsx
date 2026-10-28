import type { CSSProperties } from "react";
import { EMAILS, PHONES, WHATSAPP_URL } from "@/lib/content";
import { ContactForm } from "./ContactForm";
import { CoverageMap } from "./CoverageMap";
import { SectionHeader } from "./SectionHeader";
import { WhatsAppIcon } from "./WhatsAppButton";

export function Contact() {
  return (
    <section id="contacto" className="container-page py-24 md:py-32">
      {/* Phones: header, map, form. Desktop: header and map left, form right. */}
      <div className="grid items-start gap-12 lg:grid-cols-[1fr_480px] lg:gap-16">
        <div>
          <SectionHeader
            eyebrow="Contacto"
            title="Atendemos plantas en toda América y el Caribe"
            text="Nuestra sede está en Guatemala y desde aquí coordinamos cada proyecto. Escríbanos con el formulario o por WhatsApp."
          />
          <div className="mx-auto mt-10 max-w-[520px] lg:mx-0">
            <CoverageMap />
          </div>
        </div>

        <div
          className="rounded-md bg-chalk p-6 text-navy shadow-[0_1px_2px_rgb(0_0_0/0.3),0_24px_56px_-28px_rgb(0_0_0/0.7)] sm:p-8 lg:sticky lg:top-24"
          data-reveal
          style={{ "--d": "120ms" } as CSSProperties}
        >
          <h3 className="heading text-[26px] sm:text-[30px]">Solicite una cotización</h3>
          <p className="mt-2 text-base text-paper-ink">
            Cuéntenos qué necesita su planta y le respondemos con una propuesta técnica.
          </p>
          <ContactForm />
          {/* Direct line: a full button, since the floating WhatsApp button hides in this section. */}
          <div className="mt-2 border-t border-paper-line pt-5">
            <p className="text-sm text-paper-ink">¿Prefiere hablar directo?</p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn mt-3 h-12 w-full bg-whatsapp text-base font-medium text-white hover:brightness-110"
            >
              <WhatsAppIcon className="size-5" />
              Escribir por WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Direct lines, kept compact under the map and form. */}
      <div className="mt-16 grid gap-8 border-t border-stroke pt-10 sm:grid-cols-2" data-reveal>
        <div>
          <p className="eyebrow">Teléfonos</p>
          {/* Links are 44px tall so a thumb lands on the right number. */}
          <ul className="mt-2 flex flex-wrap gap-x-6">
            {PHONES.map((p) => (
              <li key={p.tel}>
                <a
                  href={`tel:${p.tel}`}
                  className="inline-flex min-h-11 items-center text-base tabular-nums text-ink transition-colors duration-150 hover:text-brand-2"
                >
                  {p.display}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow">Correos</p>
          <ul className="mt-2 flex flex-col">
            {EMAILS.map((e) => (
              <li key={e.address} className="flex flex-wrap items-center gap-x-3">
                <a
                  href={`mailto:${e.address}`}
                  className="inline-flex min-h-11 items-center text-base text-ink transition-colors duration-150 hover:text-brand-2"
                >
                  {e.address}
                </a>
                <span className="text-sm text-mute">{e.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
