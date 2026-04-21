import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { MdxContent } from "@/components/mdx-content";
import {
  getAdjacentPosts,
  getBlogPostBySlug,
  getBlogPosts,
} from "@/lib/content";
import { formatDate, slugify } from "@/lib/utils";

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const adjacent = getAdjacentPosts(post.slug);

  return (
    <section className="section-gap">
      <div className="shell max-w-4xl">
        <article className="surface overflow-hidden p-6 sm:p-7">
          <div className="mb-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${slugify(tag)}/`}
                className="tag-pill text-xs"
              >
                {tag}
              </Link>
            ))}
          </div>

          <h1 className="font-display text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            {post.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <span>{formatDate(post.publishedAt)}</span>
            <span aria-hidden="true">•</span>
            <span>{post.readTime}</span>
          </div>

          {post.image ? (
            <div className="mt-8 overflow-hidden rounded-[1rem] border border-slate-200">
              <Image
                src={post.image}
                alt={post.title}
                width={1600}
                height={900}
                className="h-auto w-full object-cover"
              />
            </div>
          ) : null}

          <div className="article-prose mt-8">
            <MdxContent source={post.content} />
          </div>
        </article>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {adjacent.previous ? (
            <Link href={`/blog/${adjacent.previous.slug}/`} className="surface playful-card p-5">
              <p className="kicker">Previous</p>
              <p className="mt-2 font-display text-xl font-semibold text-slate-950">
                {adjacent.previous.title}
              </p>
            </Link>
          ) : (
            <div />
          )}

          {adjacent.next ? (
            <Link href={`/blog/${adjacent.next.slug}/`} className="surface playful-card p-5">
              <p className="kicker">Next</p>
              <p className="mt-2 font-display text-xl font-semibold text-slate-950">
                {adjacent.next.title}
              </p>
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
