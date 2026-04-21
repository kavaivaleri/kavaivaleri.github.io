import Link from "next/link";

import { cn } from "@/lib/utils";
import { slugify } from "@/lib/utils";

type TagListProps = {
  tags: string[];
  activeTag?: string | null;
};

export function TagList({ tags, activeTag }: TagListProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {tags.map((tag) => {
        const href = `/tags/${slugify(tag)}/`;

        return (
          <Link
            key={tag}
            href={href}
            className={cn(
              "tag-pill transition",
              activeTag === tag &&
                "border-[rgba(127,89,103,0.18)] bg-[var(--pixel-light-pink)] text-[var(--pixel-dark)]",
            )}
          >
            {tag}
          </Link>
        );
      })}
    </div>
  );
}
