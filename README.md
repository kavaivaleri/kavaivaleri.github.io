# Valeriia Kuka Portfolio

A static Astro portfolio site for `valeriiakuka.com`, deployed to GitHub Pages.

## Stack

- Astro with static output
- Astro content collections for profile, blog posts, and writing samples
- Plain CSS in `src/styles/global.css`
- GitHub Actions deployment to Pages

## Structure

```text
src/pages/              Astro routes
src/components/         Shared Astro components
src/layouts/            Shared page layout
src/content/about/      Profile and CV content
src/content/notes/      Blog posts in Markdown
src/content/publications/ External writing sample entries
src/content/work/       Work case studies
public/                 Images, CNAME, feed, robots, and sitemap
```

## Content Editing

Edit the main profile and CV in `src/content/about/profile.md`.

Add blog posts as Markdown files in `src/content/notes/`.

Add external writing sample entries as Markdown files in `src/content/publications/`.

Edit work case studies in `src/content/work/`.

## Local Development

```bash
npm install
npm run dev
```

Local site: `http://localhost:4321`

## Checks

```bash
npm run check
npm run build
```

`npm run build` exports the static site to `dist/`.
