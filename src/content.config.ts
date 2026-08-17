import { defineCollection, z } from "astro:content";

const requiredString = z.string().trim().min(1);
const dateString = requiredString.refine(
  (value) => !Number.isNaN(new Date(value).getTime()),
  "Must be a parseable date string",
);
const booleanish = z.preprocess(
  (value) => {
    if (value === undefined) {
      return undefined;
    }

    return value === true || value === "true";
  },
  z.boolean().optional(),
);

const project = z
  .object({
    slug: requiredString,
    title: requiredString,
    description: requiredString,
    category: requiredString,
    year: requiredString,
    featured: z.boolean(),
    image: requiredString.optional(),
    caseStudy: z.boolean().optional(),
    technologies: z.array(requiredString).min(1),
    highlights: z.array(requiredString).min(1),
    links: z.array(
      z.object({
        label: requiredString,
        url: z.string().url(),
      }),
    ),
  })
  .passthrough();

const about = defineCollection({
  type: "content",
  schema: z
    .object({
      name: requiredString,
      pronouns: requiredString.optional(),
      title: requiredString,
      email: requiredString.email(),
      location: requiredString,
      linkedin: z.string().url(),
      twitter: z.string().url().optional(),
      github: z.string().url().optional(),
    })
    .passthrough(),
});

const notes = defineCollection({
  type: "content",
  schema: z
    .object({
      title: requiredString,
      description: requiredString.optional(),
      excerpt: requiredString.optional(),
      publishedAt: dateString,
      tags: z.array(requiredString).optional(),
      readTime: requiredString.optional(),
      image: requiredString.optional(),
      imageUrl: requiredString.optional(),
      published: booleanish,
    })
    .passthrough(),
});

const projects = defineCollection({
  type: "data",
  schema: z.array(project),
});

const publications = defineCollection({
  type: "content",
  schema: z
    .object({
      title: requiredString,
      description: requiredString.optional(),
      url: z.string().url(),
      publication: requiredString,
      category: requiredString.optional(),
      publishedAt: dateString,
      featured: booleanish,
      readTime: requiredString.optional(),
    })
    .passthrough(),
});

export const collections = {
  about,
  notes,
  projects,
  publications,
};
