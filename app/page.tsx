import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileText, LibraryBig, NotebookPen } from "lucide-react";

import { ArticleCard } from "@/components/article-card";
import { PublicationCard } from "@/components/publication-card";
import { SectionHeading } from "@/components/section-heading";
import {
  getBlogPosts,
  getFeaturedPublications,
  getProfile,
} from "@/lib/content";

const quickLinks = [
  {
    href: "/about/",
    label: "Profile",
    description: "Background, experience, and the kind of work I do.",
    icon: FileText,
  },
  {
    href: "/publications/",
    label: "Published writing",
    description: "Articles and explainers published with external teams and publications.",
    icon: LibraryBig,
  },
  {
    href: "/blog/",
    label: "Notes",
    description: "An archive of notes, reflections, and study notes from ongoing learning.",
    icon: NotebookPen,
  },
];

export default function HomePage() {
  const profile = getProfile();
  const posts = getBlogPosts().slice(0, 3);
  const publications = getFeaturedPublications(3);

  return (
    <>
      <section className="section-gap overflow-hidden">
        <div className="shell">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="surface relative overflow-hidden p-6 sm:p-7">
              <p className="eyebrow">Profile / Writing / Notes</p>
              <h1 className="max-w-3xl font-display text-4xl font-semibold tracking-tight text-[var(--pixel-dark)] sm:text-5xl">
                Hi, I&apos;m <span className="text-[var(--accent)]">Valeriia</span>{" "}
                <span className="text-slate-500">(Val)</span>
                <span className="mt-2 block text-[0.58em] leading-tight text-[var(--pixel-purple)]">
                  Building and growing AI/ML educational content
                </span>
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                {profile.intro}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/publications/" className="button-primary">
                  Read published writing
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/about/" className="button-secondary">
                  View profile
                </Link>
              </div>
            </div>

            <div className="mx-auto w-full max-w-sm">
              <div className="surface pixel-frame relative overflow-hidden p-3">
                <Image
                  src="/images/photo2.jpg"
                  alt={profile.name}
                  width={720}
                  height={880}
                  className="h-auto w-full rounded-[0.9rem] object-cover"
                  priority
                />
              </div>
              <div className="mt-3 rounded-[0.95rem] border border-[rgba(35,31,28,0.08)] bg-white/35 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--pixel-purple)]">
                  Focus
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Content strategy, technical writing, and making technical ideas easier to follow.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {quickLinks.map(({ href, label, description, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="surface playful-card flex h-full flex-col gap-3 p-5"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[rgba(35,31,28,0.08)] bg-white/40 text-[var(--pixel-purple)]">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-semibold text-[var(--pixel-dark)]">
                    {label}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-gap">
        <div className="shell">
          <SectionHeading
            eyebrow="Writing"
            title="Recent published writing"
            description="A selection of articles and explainers I&apos;ve written for external publications and communities."
          />

          <div className="grid gap-6 lg:grid-cols-3">
            {publications.map((publication) => (
              <PublicationCard key={publication.slug} publication={publication} />
            ))}
          </div>

          <div className="mt-6">
            <Link href="/publications/" className="card-link inline-flex items-center gap-2">
              Browse all writing
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-gap">
        <div className="shell">
          <SectionHeading
            eyebrow="Notes"
            title="Latest notes from the archive"
            description="Short reflections, study notes, and working notes on AI tools, web workflows, and learning in public."
          />

          <div className="grid gap-6 lg:grid-cols-3">
            {posts.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
