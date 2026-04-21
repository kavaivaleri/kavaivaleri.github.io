import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import type { Project } from "@/lib/content";

type ProjectCardProps = {
  project: Project;
};

const accents: Record<string, string> = {
  "Content Strategy": "from-[#e6dadf] to-[#f5efe9]",
  "Technical Writing": "from-[#ddd7dc] to-[#f2ece7]",
  "Community Building": "from-[#dde5e0] to-[#f3efe8]",
  "Editorial Strategy": "from-[#ebe1d7] to-[#f5efe9]",
};

export function ProjectCard({ project }: ProjectCardProps) {
  const accent =
    accents[project.category] ??
    "from-[#e6dadf] to-[#f5efe9]";

  return (
    <article className="surface playful-card h-full overflow-hidden">
      <div className={`relative min-h-48 bg-gradient-to-br ${accent} p-6 text-[var(--pixel-dark)]`}>
        {project.image ? (
          <>
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover opacity-10"
            />
            <div className="absolute inset-0 bg-[rgba(250,248,244,0.78)]" />
          </>
        ) : null}

        <div className="relative">
          <p className="text-sm uppercase tracking-[0.22em] text-[var(--muted)]">
            {project.category}
          </p>
          <h3 className="mt-6 max-w-md font-display text-3xl font-semibold tracking-tight">
            {project.title}
          </h3>
          <p className="mt-3 max-w-xl text-sm text-[var(--muted)]">{project.year}</p>
        </div>
      </div>

      <div className="p-6">
        <p className="text-base leading-7 text-slate-600">{project.description}</p>

        <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-600">
          {project.highlights.map((highlight) => (
            <li key={highlight}>• {highlight}</li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <span key={technology} className="tag-pill text-xs">
              {technology}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {project.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="link-chip"
            >
              {link.label}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
