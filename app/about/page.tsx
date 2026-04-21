import type { Metadata } from "next";
import { Linkedin, Mail, MapPin, Twitter } from "lucide-react";

import { MdxContent } from "@/components/mdx-content";
import { SectionHeading } from "@/components/section-heading";
import { getProfile } from "@/lib/content";

export const metadata: Metadata = {
  title: "Profile",
  description: "Profile and background for Valeria Kuka.",
};

export default async function AboutPage() {
  const profile = getProfile();

  return (
    <section className="section-gap">
      <div className="shell">
        <SectionHeading
          eyebrow="Profile"
          title={profile.name}
          description={profile.title}
        />

        <div className="grid gap-6 lg:grid-cols-[0.36fr_0.64fr]">
          <aside className="surface h-fit p-5">
            <div className="space-y-4 text-sm text-slate-600">
              {profile.pronouns ? (
                <div className="flex items-center gap-3">
                  <span className="eyebrow mb-0 px-2.5 py-1 text-[10px]">
                    {profile.pronouns}
                  </span>
                </div>
              ) : null}
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-accent" />
                <span>{profile.location}</span>
              </div>
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3 hover:text-accent"
              >
                <Mail className="h-4 w-4 text-accent" />
                <span>{profile.email}</span>
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 hover:text-accent"
              >
                <Linkedin className="h-4 w-4 text-accent" />
                <span>LinkedIn</span>
              </a>
              {profile.twitter ? (
                <a
                  href={profile.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 hover:text-accent"
                >
                  <Twitter className="h-4 w-4 text-accent" />
                  <span>X / Twitter</span>
                </a>
              ) : null}
            </div>

            <div className="mt-6 rounded-[0.95rem] border border-[rgba(35,31,28,0.08)] bg-white/40 p-4">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--pixel-purple)]">
                Focus
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Content strategy, technical writing, editorial systems, and audience
                development for technical teams working in AI.
              </p>
            </div>
          </aside>

          <article className="surface p-6 sm:p-7">
            <div className="article-prose">
              <MdxContent source={profile.content} />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
