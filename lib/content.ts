import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

import { slugify } from "@/lib/utils";

type AboutFrontmatter = {
  name: string;
  pronouns?: string;
  title: string;
  email: string;
  location: string;
  linkedin: string;
  twitter?: string;
  github?: string;
};

type BlogFrontmatter = {
  title: string;
  slug?: string;
  excerpt?: string;
  description?: string;
  readTime?: string;
  published?: boolean;
  tags?: string[];
  image?: string;
  publishedAt: string;
};

type PublicationFrontmatter = {
  title: string;
  description?: string;
  url: string;
  publication: string;
  category?: string;
  publishedAt: string;
  featured?: boolean;
  readTime?: string;
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  category: string;
  year: string;
  featured: boolean;
  image?: string;
  technologies: string[];
  highlights: string[];
  links: Array<{ label: string; url: string }>;
};

export type AboutProfile = AboutFrontmatter & {
  content: string;
  intro: string;
};

export type BlogPost = {
  title: string;
  slug: string;
  excerpt: string;
  description: string;
  readTime: string;
  published: boolean;
  tags: string[];
  image?: string;
  publishedAt: string;
  content: string;
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

const root = process.cwd();
const contentDir = path.join(root, "content");

function readFile(filePath: string) {
  return fs.readFileSync(filePath, "utf8");
}

function listMarkdownFiles(dir: string) {
  return fs
    .readdirSync(dir)
    .filter(
      (file) =>
        (file.endsWith(".md") || file.endsWith(".mdx")) &&
        file.toLowerCase() !== "readme.md" &&
        file.toLowerCase() !== "readme.mdx",
    )
    .sort();
}

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

function estimateReadTime(content: string) {
  const words = stripMarkdown(content).split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

function excerptFromContent(content: string, maxLength = 160) {
  const plain = stripMarkdown(content);
  if (plain.length <= maxLength) {
    return plain;
  }

  const slice = plain.slice(0, maxLength);
  return `${slice.slice(0, slice.lastIndexOf(" "))}...`;
}

export function getProfile(): AboutProfile {
  const profilePath = path.join(contentDir, "about", "profile.md");
  const { data, content } = matter(readFile(profilePath));
  const intro =
    content
      .split("\n\n")
      .map((chunk) => chunk.trim())
      .find((chunk) => chunk && !chunk.startsWith("#")) ?? "";

  return {
    ...(data as AboutFrontmatter),
    content,
    intro,
  };
}

export function getBlogPosts(): BlogPost[] {
  const blogDir = path.join(contentDir, "blog");

  return listMarkdownFiles(blogDir)
    .map((file) => {
      const raw = readFile(path.join(blogDir, file));
      const { data, content } = matter(raw);
      const frontmatter = data as BlogFrontmatter;
      const slug = frontmatter.slug ?? file.replace(/\.(md|mdx)$/, "");

      return {
        title: frontmatter.title,
        slug,
        excerpt:
          frontmatter.excerpt ??
          frontmatter.description ??
          excerptFromContent(content),
        description:
          frontmatter.description ??
          frontmatter.excerpt ??
          excerptFromContent(content),
        readTime: frontmatter.readTime ?? estimateReadTime(content),
        published: frontmatter.published !== false,
        tags: frontmatter.tags ?? [],
        image: frontmatter.image,
        publishedAt: frontmatter.publishedAt,
        content,
      };
    })
    .filter((post) => post.published)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

export function getBlogPostBySlug(slug: string) {
  return getBlogPosts().find((post) => post.slug === slug);
}

export function getBlogTags() {
  return Array.from(
    new Set(getBlogPosts().flatMap((post) => post.tags).filter(Boolean)),
  ).sort((a, b) => a.localeCompare(b));
}

export function getTagSlugMap() {
  return getBlogTags().map((tag) => ({ tag, slug: slugify(tag) }));
}

export function getPostsByTagSlug(tagSlug: string) {
  const tag = getTagSlugMap().find((entry) => entry.slug === tagSlug)?.tag;

  if (!tag) {
    return { tag: null, posts: [] as BlogPost[] };
  }

  return {
    tag,
    posts: getBlogPosts().filter((post) => post.tags.includes(tag)),
  };
}

export function getAdjacentPosts(slug: string) {
  const posts = getBlogPosts();
  const index = posts.findIndex((post) => post.slug === slug);

  return {
    previous: index < posts.length - 1 ? posts[index + 1] : null,
    next: index > 0 ? posts[index - 1] : null,
  };
}

export function getPublications(): Publication[] {
  const publicationsDir = path.join(contentDir, "publications");

  return listMarkdownFiles(publicationsDir)
    .map((file) => {
      const raw = readFile(path.join(publicationsDir, file));
      const { data, content } = matter(raw);
      const frontmatter = data as PublicationFrontmatter;

      return {
        title: frontmatter.title,
        slug: file.replace(/\.(md|mdx)$/, ""),
        description:
          frontmatter.description ?? excerptFromContent(content, 190),
        url: frontmatter.url,
        publication: frontmatter.publication,
        category: frontmatter.category ?? "Article",
        publishedAt: frontmatter.publishedAt,
        featured: Boolean(frontmatter.featured),
        readTime: frontmatter.readTime,
      };
    })
    .sort((a, b) => {
      if (a.featured !== b.featured) {
        return Number(b.featured) - Number(a.featured);
      }

      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });
}

export function getFeaturedPublications(limit = 3) {
  const publications = getPublications();
  const featured = publications.filter((publication) => publication.featured);

  return (featured.length ? featured : publications).slice(0, limit);
}

export function getProjects(): Project[] {
  const projectsPath = path.join(contentDir, "projects", "projects.json");

  if (!fs.existsSync(projectsPath)) {
    return [];
  }

  const projects = JSON.parse(readFile(projectsPath)) as Project[];
  return projects.sort((a, b) => Number(b.featured) - Number(a.featured));
}
