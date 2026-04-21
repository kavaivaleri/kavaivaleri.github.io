import type { Metadata } from "next";

import { ArticleCard } from "@/components/article-card";
import { SectionHeading } from "@/components/section-heading";
import { TagList } from "@/components/tag-list";
import { getBlogPosts, getBlogTags } from "@/lib/content";

export const metadata: Metadata = {
  title: "Notes",
  description: "Notes, reflections, and study notes by Valeria Kuka.",
};

export default function BlogPage() {
  const posts = getBlogPosts();
  const tags = getBlogTags();

  return (
    <section className="section-gap">
      <div className="shell">
        <SectionHeading
          eyebrow="Notes"
          title="An archive of notes, reflections, and study notes"
          description="This is where I keep personal writing on learning, AI-assisted workflows, and figuring things out as I go."
        />

        <div className="mb-10">
          <TagList tags={tags} />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {posts.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
