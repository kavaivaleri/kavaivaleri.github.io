import Link from "next/link";

import { siteConfig } from "@/lib/site";

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(35,31,28,0.08)] bg-[rgba(248,245,241,0.88)] backdrop-blur-xl">
      <div className="shell flex h-16 items-center justify-between gap-4">
        <Link href="/" className="font-display text-xl font-semibold tracking-tight text-[var(--pixel-dark)]">
          Valeriia<span className="text-[var(--accent)]">.</span>
          <span className="text-[var(--pixel-purple)]">Kuka</span>
        </Link>

        <nav className="hidden items-center gap-1 text-sm text-slate-600 md:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 font-medium hover:bg-white/60 hover:text-[var(--pixel-dark)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
