import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleCard } from "@/components/article-card";
import { SectionHeading } from "@/components/section-heading";
import { TagList } from "@/components/tag-list";
import { getBlogTags, getPostsByTagSlug, getTagSlugMap } from "@/lib/content";

type TagPageProps = {
  params: {
    tag: string;
  };
};

export function generateStaticParams() {
  return getTagSlugMap().map(({ slug }) => ({ tag: slug }));
}

export function generateMetadata({ params }: TagPageProps): Metadata {
  const result = getPostsByTagSlug(params.tag);

  if (!result.tag) {
    return {};
  }

  return {
    title: `${result.tag} articles`,
    description: `Blog posts tagged ${result.tag}.`,
  };
}

export default function TagPage({ params }: TagPageProps) {
  const tags = getBlogTags();
  const result = getPostsByTagSlug(params.tag);

  if (!result.tag) {
    notFound();
  }

  return (
    <section className="section-gap">
      <div className="shell">
        <SectionHeading
          eyebrow="Tag"
          title={result.tag}
          description={`Posts related to ${result.tag}.`}
        />

        <div className="mb-10">
          <TagList tags={tags} activeTag={result.tag} />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {result.posts.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
