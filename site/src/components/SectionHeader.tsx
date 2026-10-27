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
      <p className="section-label">
        <span className="status-dot" />
        {eyebrow}
      </p>
      <h2 id={id} className="heading mt-4 text-[34px] sm:text-[44px]">
        {title}
      </h2>
      {text && <p className="mt-5 text-base leading-relaxed text-mute">{text}</p>}
    </div>
  );
}
