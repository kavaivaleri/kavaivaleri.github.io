import { getNotes } from "../lib/content";
import { siteConfig } from "../lib/site";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const notes = await getNotes();
  const blogUrl = new URL("/blog/", siteConfig.siteUrl).toString();
  const items = notes
    .map((note) => {
      const url = new URL(`/blog/${note.slug}/`, siteConfig.siteUrl).toString();
      const publishedAt = new Date(note.publishedAt).toUTCString();

      return [
        "    <item>",
        `      <title>${escapeXml(note.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid>${url}</guid>`,
        `      <pubDate>${publishedAt}</pubDate>`,
        `      <description>${escapeXml(note.description)}</description>`,
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  const rss = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    "  <channel>",
    `    <title>${escapeXml(siteConfig.name)} Blog</title>`,
    `    <link>${blogUrl}</link>`,
    "    <description>Blog posts on AI tools, content work, and technical workflows.</description>",
    "    <language>en</language>",
    items,
    "  </channel>",
    "</rss>",
  ].join("\n");

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
