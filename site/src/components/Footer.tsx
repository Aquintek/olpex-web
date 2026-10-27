import { EMAILS, NAV_LINKS, PHONES, SERVICES } from "@/lib/content";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-stroke">
      <div className="container-page grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:py-24">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-mute">
            Servicios eléctricos, mecánicos, neumáticos y de automatización industrial en Guatemala.
          </p>
        </div>
        <FooterColumn title="Sitio">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </FooterColumn>
        <FooterColumn title="Servicios">
          {SERVICES.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`}>{s.title.replace("Servicios ", "")}</a>
            </li>
          ))}
        </FooterColumn>
        <FooterColumn title="Contacto">
          {EMAILS.map((e) => (
            <li key={e.address}>
              <a href={`mailto:${e.address}`} className="break-all">
                {e.address}
              </a>
            </li>
          ))}
          {PHONES.slice(0, 2).map((p) => (
            <li key={p.tel}>
              <a href={`tel:${p.tel}`}>{p.display}</a>
            </li>
          ))}
        </FooterColumn>
      </div>
      <div className="container-page flex flex-col gap-2 border-t border-stroke py-6 font-mono text-xs uppercase tracking-[0.06em] text-mute sm:flex-row sm:justify-between">
        <span>© {new Date().getFullYear()} OLPEX Engineering Solutions</span>
        <span>Guatemala</span>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="eyebrow text-ink">{title}</p>
      <ul className="mt-5 space-y-3 text-sm text-mute [&_a]:transition-colors [&_a]:duration-150 [&_a:hover]:text-chalk">
        {children}
      </ul>
    </div>
  );
}
