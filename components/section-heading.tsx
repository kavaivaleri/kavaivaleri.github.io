type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="mb-8 max-w-3xl">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="font-display text-2xl font-semibold tracking-tight text-[var(--pixel-dark)] sm:text-[2rem]">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">{description}</p>
      ) : null}
    </div>
  );
}
