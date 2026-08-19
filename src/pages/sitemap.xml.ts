import { getNotes, getWorkCases } from "../lib/content";
import { siteConfig } from "../lib/site";

type SitemapEntry = {
  path: string;
  priority: string;
  lastmod?: string;
};

function pageUrl(path: string) {
  return new URL(path, siteConfig.siteUrl).toString();
}

export async function GET() {
  const [notes, workCases] = await Promise.all([getNotes(), getWorkCases()]);
  const entries: SitemapEntry[] = [
    { path: "/", priority: "1.0" },
    { path: "/work/", priority: "0.9" },
    ...workCases.map((work) => ({
      path: `/work/${work.slug}/`,
      priority: "0.8",
    })),
    { path: "/writing-samples/", priority: "0.8" },
    { path: "/blog/", priority: "0.8" },
    ...notes.map((note) => ({
      path: `/blog/${note.slug}/`,
      priority: "0.7",
      lastmod: note.publishedAt,
    })),
    { path: "/services/", priority: "0.8" },
    { path: "/about/", priority: "0.7" },
    { path: "/cv/", priority: "0.4" },
  ];

  const urls = entries
    .map((entry) => {
      const lastmod = entry.lastmod
        ? `\n    <lastmod>${entry.lastmod}</lastmod>`
        : "";

      return [
        "  <url>",
        `    <loc>${pageUrl(entry.path)}</loc>${lastmod}`,
        `    <priority>${entry.priority}</priority>`,
        "  </url>",
      ].join("\n");
    })
    .join("\n");

  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    "</urlset>",
  ].join("\n");

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
