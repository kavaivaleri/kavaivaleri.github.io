# Valeria Kuka Portfolio

A static Next.js portfolio site for `valeriiakuka.com`, built for GitHub Pages deployment.

## Stack

- Next.js App Router with `output: "export"`
- Tailwind CSS
- Markdown/MDX-style content loading with `gray-matter` and `next-mdx-remote`
- GitHub Actions deployment to Pages

## Structure

```text
app/                      Next.js routes
components/               Shared UI components
content/about/            CV and profile content
content/blog/             Blog posts in .md or .mdx
content/publications/     External publication entries
content/projects/         Project data
lib/                      Content loaders and helpers
public/                   Images, CNAME, and static assets
```

## Content editing

### About / CV

Edit `content/about/profile.md`.

### Blog posts

Create a file in `content/blog/` using `.md` or `.mdx`:

```md
---
title: "Article Title"
slug: "article-title"
excerpt: "Short summary for cards and SEO"
publishedAt: "2026-04-20"
tags: ["AI Tools", "Learning"]
published: true
image: "/images/blog/cover.png"
readTime: "4 min read"
---

Your article content here.
```

### Publications

Create a file in `content/publications/`:

```md
---
title: "Publication title"
description: "Short description"
url: "https://example.com/article"
publication: "Publication name"
category: "Article"
publishedAt: "2026-04-20"
featured: false
---
```

### Projects

Edit `content/projects/projects.json`.

## Local development

```bash
npm install
npm run dev
```

Local site: `http://localhost:3000`

## Checks

```bash
npm run check
npm run build
```

`npm run build` exports the static site to `out/`.

## Deployment

The site deploys automatically from `.github/workflows/deploy.yml`.

GitHub Pages should be configured to use GitHub Actions, and the custom domain is carried through `public/CNAME`.
