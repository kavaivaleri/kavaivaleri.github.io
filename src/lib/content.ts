import { getCollection, getEntry } from "astro:content";

import projectsData from "../content/projects/projects.json";
import { sortByNewest } from "./utils";

export type Project = {
  slug: string;
  title: string;
  description: string;
  category: string;
  year: string;
  featured: boolean;
  image?: string;
  caseStudy?: boolean;
  technologies: string[];
  highlights: string[];
  links: Array<{
    label: string;
    url: string;
  }>;
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
  image?: string;
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

  const intro =
    entry.body
      .split("\n\n")
      .map((chunk) => chunk.trim())
      .find((chunk) => chunk && !chunk.startsWith("#")) ?? "";

  return {
    ...entry.data,
    intro,
    body: entry.body,
  };
}

export async function getPublications(): Promise<Publication[]> {
  const entries = await getCollection("publications");

  return entries
    .map((entry) => ({
      title: entry.data.title,
      slug: slugFromId(entry.id),
      description: entry.data.description ?? excerptFromContent(entry.body, 190),
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
          excerptFromContent(entry.body, 190),
        body: entry.body,
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

export function getProjects(): Project[] {
  return [...(projectsData as Project[])].sort(
    (a, b) => Number(b.featured) - Number(a.featured),
  );
}

export function getProjectBySlug(slug: string) {
  return getProjects().find((project) => project.slug === slug);
}
