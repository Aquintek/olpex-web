import type { CSSProperties } from "react";

// Stagger step for the header's reveal: label, title, then text, 60ms apart.
const d = (n: number) => ({ "--d": `${n * 60}ms` }) as CSSProperties;

export function SectionHeader({
  id,
  eyebrow,
  title,
  text,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="section-label" data-reveal style={d(0)}>
        <span className="status-dot" />
        {eyebrow}
      </p>
      <h2 id={id} className="heading mt-4 text-[34px] sm:text-[44px]" data-reveal style={d(1)}>
        {title}
      </h2>
      {text && (
        <p className="mt-5 text-base leading-relaxed text-mute" data-reveal style={d(2)}>
          {text}
        </p>
      )}
    </div>
  );
}
