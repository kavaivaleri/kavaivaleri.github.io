import type { Metadata } from "next";

import { PublicationCard } from "@/components/publication-card";
import { SectionHeading } from "@/components/section-heading";
import { getPublications } from "@/lib/content";

export const metadata: Metadata = {
  title: "Writing",
  description: "Published writing by Valeria Kuka.",
};

export default function PublicationsPage() {
  const publications = getPublications();

  return (
    <section className="section-gap">
      <div className="shell">
        <SectionHeading
          eyebrow="Published writing"
          title="Articles published with external teams and publications"
          description="A selection of explainers, articles, and newsletter pieces across AI, machine learning, and developer tools."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {publications.map((publication) => (
            <PublicationCard key={publication.slug} publication={publication} />
          ))}
        </div>
      </div>
    </section>
  );
}
