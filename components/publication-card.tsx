import { ArrowUpRight } from "lucide-react";

import type { Publication } from "@/lib/content";
import { formatDate } from "@/lib/utils";

type PublicationCardProps = {
  publication: Publication;
};

export function PublicationCard({ publication }: PublicationCardProps) {
  return (
    <article className="surface playful-card h-full overflow-hidden">
      <div className="border-b border-[rgba(35,31,28,0.08)] p-4">
        <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--muted)]">
          <span className="font-semibold">{publication.publication}</span>
          <span aria-hidden="true">•</span>
          <span>{publication.category}</span>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-3 text-sm text-slate-500">
          {formatDate(publication.publishedAt)}
        </div>

        <h3 className="font-display text-[1.35rem] font-semibold tracking-tight text-[var(--pixel-dark)]">
          {publication.title}
        </h3>

        <p className="mt-3 text-[15px] leading-7 text-slate-600">
          {publication.description}
        </p>

        <a
          href={publication.url}
          target="_blank"
          rel="noreferrer"
          className="card-link mt-5 inline-flex items-center gap-2"
        >
          Read on {publication.publication}
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </article>
  );
}
