import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section-gap">
      <div className="shell">
        <div className="surface max-w-2xl p-10">
          <p className="eyebrow">404</p>
          <h1 className="font-display text-4xl font-semibold text-slate-950">
            This page is not here.
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            The link may be outdated, or the page may have moved during the
            rebuild.
          </p>
          <Link href="/" className="link-chip mt-8 inline-flex">
            Return home
          </Link>
        </div>
      </div>
    </section>
  );
}
