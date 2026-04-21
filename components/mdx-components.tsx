import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

export function Callout({
  children,
  title,
}: {
  children: ReactNode;
  title?: string;
}) {
  return (
    <div className="my-8 rounded-3xl border border-blue-100 bg-blue-50/70 p-5 text-slate-700">
      {title ? (
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
          {title}
        </p>
      ) : null}
      <div>{children}</div>
    </div>
  );
}

export const mdxComponents: MDXComponents = {
  a: ({
    href = "",
    children,
    ...props
  }: ComponentPropsWithoutRef<"a">) => {
    const isInternal = href.startsWith("/");

    if (isInternal) {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      );
    }

    return (
      <a href={href} target="_blank" rel="noreferrer" {...props}>
        {children}
      </a>
    );
  },
  img: (props: ComponentPropsWithoutRef<"img">) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img {...props} alt={props.alt ?? ""} loading="lazy" />
  ),
  figure: ({ children }: ComponentPropsWithoutRef<"figure">) => (
    <figure className="my-10">{children}</figure>
  ),
  figcaption: ({ children }: ComponentPropsWithoutRef<"figcaption">) => (
    <figcaption className="mt-3 text-center text-sm text-slate-500">
      {children}
    </figcaption>
  ),
  Callout,
};
