import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { BlogPost } from "@/lib/content";
import { formatDate } from "@/lib/utils";

type ArticleCardProps = {
  post: BlogPost;
};

export function ArticleCard({ post }: ArticleCardProps) {
  const category = post.tags[0] ?? "Note";

  return (
    <article className="surface playful-card h-full overflow-hidden">
      <div className="candy-gradient border-b border-[rgba(35,31,28,0.08)] p-4">
        <div className="flex items-center justify-between gap-3 text-sm text-[var(--muted)]">
          <span className="tag-pill text-xs">{category}</span>
          <span>{formatDate(post.publishedAt)}</span>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-3 flex flex-wrap items-center gap-3 text-sm text-slate-500">
          <span>{post.readTime}</span>
        </div>

        <h3 className="font-display text-[1.35rem] font-semibold tracking-tight text-[var(--pixel-dark)]">
          <Link href={`/blog/${post.slug}/`} className="hover:text-[var(--pixel-pink)]">
            {post.title}
          </Link>
        </h3>

        <p className="mt-3 text-[15px] leading-7 text-slate-600">{post.excerpt}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="tag-pill text-xs">
              {tag}
            </span>
          ))}
        </div>

        <Link
          href={`/blog/${post.slug}/`}
          className="card-link mt-5 inline-flex items-center gap-2"
        >
          Read note
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
