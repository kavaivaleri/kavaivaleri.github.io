import type { Metadata } from "next";

import { SectionHeading } from "@/components/section-heading";
import { getProfile } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected work by Valeria Kuka.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ProjectsPage() {
  const profile = getProfile();

  return (
    <section className="section-gap">
      <div className="shell">
        <SectionHeading
          eyebrow="Work"
          title="This section is private for now"
          description="I&apos;m keeping case studies and project details offline at the moment. If you&apos;re looking for something specific, feel free to reach out and I can share relevant work privately."
        />

        <div className="surface max-w-2xl p-8">
          <p className="text-base leading-7 text-slate-600">
            The public site is mainly a profile, writing archive, and notes space for now.
            Work samples can be shared directly when they&apos;re relevant.
          </p>
          <a href={`mailto:${profile.email}`} className="card-link mt-6 inline-flex items-center gap-2">
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
}
