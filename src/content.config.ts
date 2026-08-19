import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

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

const about = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/about" }),
  schema: z.looseObject({
    name: requiredString,
    pronouns: requiredString.optional(),
    title: requiredString,
    email: z.email(),
    location: requiredString,
    linkedin: z.url(),
    twitter: z.url().optional(),
    github: z.url().optional(),
  }),
});

const notes = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/notes" }),
  schema: ({ image }) =>
    z.looseObject({
      title: requiredString,
      description: requiredString.optional(),
      excerpt: requiredString.optional(),
      publishedAt: dateString,
      tags: z.array(requiredString).optional(),
      readTime: requiredString.optional(),
      image: image().optional(),
      imageUrl: image().optional(),
      published: booleanish,
    }),
});

const publications = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/publications" }),
  schema: z.looseObject({
    title: requiredString,
    description: requiredString.optional(),
    url: z.url(),
    publication: requiredString,
    category: requiredString.optional(),
    publishedAt: dateString,
    featured: booleanish,
    readTime: requiredString.optional(),
  }),
});

const work = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/work" }),
  schema: ({ image }) =>
    z.looseObject({
      title: requiredString,
      headline: requiredString,
      description: requiredString,
      client: requiredString,
      completed: requiredString,
      role: requiredString,
      category: requiredString,
      featured: z.boolean(),
      heroImage: image().optional(),
      focus: requiredString,
      scope: requiredString,
      tags: z.array(requiredString).min(1),
      stats: z.array(
        z.object({
          value: requiredString,
          label: requiredString,
        }),
      ),
      links: z.array(
        z.object({
          label: requiredString,
          url: z.url(),
        }),
      ),
      evidence: z
        .object({
          followerGrowth: z.object({
            title: requiredString,
            period: requiredString,
            points: z.array(
              z.object({
                month: z.number().nonnegative(),
                value: z.number().positive(),
                displayValue: requiredString,
                date: requiredString,
              }),
            ),
          }),
          results: z.array(
            z.object({
              title: requiredString,
              paragraphs: z.array(requiredString).min(1),
            }),
          ),
        })
        .optional(),
    }),
});

export const collections = {
  about,
  notes,
  publications,
  work,
};
