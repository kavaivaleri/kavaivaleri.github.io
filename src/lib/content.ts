import { getCollection, getEntry } from "astro:content";

import { sortByNewest } from "./utils";

export type ContentImage = {
  src: string;
  width: number;
  height: number;
  format: "png" | "jpg" | "jpeg" | "tiff" | "webp" | "gif" | "svg" | "avif";
};

export type WorkCase = {
  slug: string;
  title: string;
  headline: string;
  description: string;
  client: string;
  completed: string;
  role: string;
  category: string;
  featured: boolean;
  heroImage?: ContentImage;
  focus: string;
  scope: string;
  tags: string[];
  stats: Array<{
    value: string;
    label: string;
  }>;
  links: Array<{
    label: string;
    url: string;
  }>;
  body: string;
};

export type Profile = {
  name: string;
  pronouns?: string;
  title: string;
  email: string;
  location: string;
  linkedin: string;
  twitter?: string;
  github?: string;
  intro: string;
  body: string;
};

export type Publication = {
  title: string;
  slug: string;
  description: string;
  url: string;
  publication: string;
  category: string;
  publishedAt: string;
  featured: boolean;
  readTime?: string;
};

export type Note = {
  title: string;
  slug: string;
  description: string;
  body: string;
  publishedAt: string;
  tags: string[];
  readTime?: string;
  image?: ContentImage;
};

function stripMarkdown(markdown: string) {
  return markdown
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function excerptFromContent(content: string, maxLength = 160) {
  const plain = stripMarkdown(content);

  if (plain.length <= maxLength) {
    return plain;
  }

  const slice = plain.slice(0, maxLength);
  return `${slice.slice(0, slice.lastIndexOf(" "))}...`;
}

function contentBody(entry: { body?: string }) {
  return entry.body ?? "";
}

function isPublished(value: boolean | undefined) {
  return value === undefined || value;
}

export function slugFromId(id: string) {
  return id.replace(/\.(md|mdx)$/, "");
}

export async function getProfile(): Promise<Profile> {
  const entry = await getEntry("about", "profile");

  if (!entry) {
    throw new Error("Missing src/content/about/profile.md");
  }

  const body = contentBody(entry);
  const intro =
    body
      .split("\n\n")
      .map((chunk) => chunk.trim())
      .find((chunk) => chunk && !chunk.startsWith("#")) ?? "";

  return {
    ...entry.data,
    intro,
    body,
  };
}

export async function getPublications(): Promise<Publication[]> {
  const entries = await getCollection("publications");

  return entries
    .map((entry) => ({
      title: entry.data.title,
      slug: slugFromId(entry.id),
      description:
        entry.data.description ?? excerptFromContent(contentBody(entry), 190),
      url: entry.data.url,
      publication: entry.data.publication,
      category: entry.data.category ?? "Article",
      publishedAt: entry.data.publishedAt,
      featured: entry.data.featured ?? false,
      readTime: entry.data.readTime,
    }))
    .sort((a, b) => {
      if (a.featured !== b.featured) {
        return Number(b.featured) - Number(a.featured);
      }

      return (
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    });
}

export async function getFeaturedPublications(limit = 3) {
  const publications = await getPublications();
  const featured = publications.filter((publication) => publication.featured);

  return (featured.length ? featured : publications).slice(0, limit);
}

export async function getNotes(): Promise<Note[]> {
  const entries = await getCollection("notes");

  return sortByNewest(
    entries
      .filter((entry) => isPublished(entry.data.published))
      .map((entry) => ({
        title: entry.data.title,
        slug: slugFromId(entry.id),
        description:
          entry.data.description ??
          entry.data.excerpt ??
          excerptFromContent(contentBody(entry), 190),
        body: contentBody(entry),
        publishedAt: entry.data.publishedAt,
        tags: entry.data.tags ?? [],
        readTime: entry.data.readTime,
        image: entry.data.image ?? entry.data.imageUrl,
      })),
  );
}

export async function getLatestNotes(limit = 3) {
  return (await getNotes()).slice(0, limit);
}

export async function getWorkCases(): Promise<WorkCase[]> {
  const entries = await getCollection("work");

  return entries
    .map((entry) => ({
      title: entry.data.title,
      slug: slugFromId(entry.id),
      headline: entry.data.headline,
      description: entry.data.description,
      client: entry.data.client,
      completed: entry.data.completed,
      role: entry.data.role,
      category: entry.data.category,
      featured: entry.data.featured,
      heroImage: entry.data.heroImage,
      focus: entry.data.focus,
      scope: entry.data.scope,
      tags: entry.data.tags,
      stats: entry.data.stats,
      links: entry.data.links,
      body: contentBody(entry),
    }))
    .sort((a, b) => Number(b.featured) - Number(a.featured));
}

export async function getFeaturedWork(limit = 3) {
  return (await getWorkCases()).filter((work) => work.featured).slice(0, limit);
}
