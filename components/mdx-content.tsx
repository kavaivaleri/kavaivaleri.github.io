import { compileMDX } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import { mdxComponents } from "@/components/mdx-components";

export async function MdxContent({ source }: { source: string }) {
  const { content } = await compileMDX({
    source,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          rehypeHighlight,
          [
            rehypeAutolinkHeadings,
            {
              behavior: "append",
              properties: {
                className: ["ml-2", "text-slate-300", "no-underline"],
              },
              content: {
                type: "text",
                value: "#",
              },
            },
          ],
        ],
      },
    },
  });

  return <>{content}</>;
}
