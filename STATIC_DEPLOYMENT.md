# Static Site Deployment Guide

✅ **Your website is now 100% static and ready to deploy anywhere!**

This React SPA is fully static with no server dependencies. Deploy to GitHub Pages, Netlify, Vercel, or any static hosting service.

## 🏗️ Architecture Overview

```
Markdown Content → JSON Generation → React Build → Static Files → CDN
```

**The Flow:**
1. Content stored in markdown files (`content/` directory)
2. Build script converts markdown to JSON
3. Vite builds React SPA with static data
4. Output is pure HTML/CSS/JS files
5. Deployable to any static host

## 🚀 Quick Deploy Commands

### GitHub Pages (Recommended)

**Automatic deployment configured!** Just push to main:

```bash
git add .
git commit -m "Deploy update"
git push origin main
```

See [GITHUB_PAGES_DEPLOYMENT.md](./GITHUB_PAGES_DEPLOYMENT.md) for detailed setup.

### Netlify

```bash
# Build command
npm run build:static

# Publish directory
dist/public
```

**One-Click Deploy:**
1. Connect GitHub repository
2. Set build command: `npm run build:static`
3. Set publish directory: `dist/public`
4. Deploy!

### Vercel

```bash
# Build command
npm run build:static

# Output directory
dist/public
```

**Deploy:**
```bash
npm install -g vercel
vercel --prod
```

### Cloudflare Pages

```bash
# Build command
npm run build:static

# Build output directory
dist/public
```

### Manual Deployment

```bash
# Build
npm run build:static

# Upload dist/public/ contents to your host
# (via FTP, rsync, or your host's upload tool)
```

## 🛠️ Build Process

### Build Command

```bash
npm run build:static
```

**What happens:**
1. ✅ Reads markdown from `content/`
2. ✅ Generates JSON files
3. ✅ Copies to `client/public/api/`
4. ✅ Syncs images to `client/public/images/`
5. ✅ Builds React app with Vite
6. ✅ Outputs to `dist/public/`

### Build Output

```
dist/public/
├── index.html                    # Entry point
├── 404.html                      # SPA routing fallback
├── .nojekyll                     # GitHub Pages config
├── CNAME                         # Custom domain
├── robots.txt                    # SEO
├── assets/                       # Bundled JS/CSS
│   ├── index-[hash].js
│   ├── index-[hash].css
│   ├── vendor-[hash].js          # React, React DOM
│   ├── router-[hash].js          # Wouter
│   └── ui-[hash].js              # UI components
├── images/                       # Static images
│   ├── logo.png
│   ├── prof_pic.jpg
│   └── blog/...
└── api/                          # Static JSON data
    ├── about.json
    ├── blog-posts.json
    ├── blog-posts/slug/*.json
    ├── publications.json
    └── publications/featured.json
```

## 📝 Content Updates

### Update Blog Post

1. Edit markdown file:

```bash
# Edit existing
vim content/blog/my-post.md

# Or create new
touch content/blog/new-post.md
```

2. Add/update frontmatter:

```markdown
---
title: "My Post Title"
slug: "my-post-slug"
excerpt: "Description"
publishedAt: "2026-01-15"
tags: [tech, ai]
published: true
image: "/images/blog/cover.png"
readTime: "5 min read"
---

Content here...
```

3. Rebuild:

```bash
npm run build:static
```

4. Deploy (if not using auto-deploy):

```bash
git add .
git commit -m "Update blog post"
git push
```

### Update Publications

Same process, edit files in `content/publications/`:

```markdown
---
title: "Article Title"
url: "https://example.com"
description: "Brief description"
publication: "Publication Name"
category: "AI/ML"
publishedAt: "2026-01-15"
featured: true
priority: 1
---
```

### Update About Page

Edit `content/about/profile.md`:

```markdown
---
name: "Your Name"
title: "Your Title"
email: "your@email.com"
location: "City, Country"
linkedin: "https://linkedin.com/in/you"
twitter: "https://twitter.com/you"
---

Your bio...
```

## 🧪 Local Testing

### Development Server (with HMR)

```bash
npm run dev
```

Runs Express server on `http://localhost:5000` with hot reload.
**Note**: Server is for development only, not used in production.

### Test Production Build

```bash
# Build static site
npm run build:static

# Serve locally
npx serve dist/public

# Or use http-server
npx http-server dist/public
```

Test everything works:
- ✅ All pages load
- ✅ Navigation works
- ✅ Direct URLs work (e.g., `/blog/post-slug`)
- ✅ Images load
- ✅ Data fetches correctly

## 🔧 Configuration

### Base Path

For custom domain: `base: '/'` (default)
For subdirectory: `base: '/repo-name/'`

Edit `vite.config.ts`:

```typescript
export default defineConfig({
  base: '/', // or '/repo-name/'
  // ...
});
```

### Custom Domain

1. Add domain to `client/public/CNAME`:

```
yourdomain.com
```

2. Configure DNS (see GitHub Pages guide)

### Environment Variables

Create `.env.local` for local development:

```bash
# Not needed for static build, but available if you add features
VITE_SOME_API_KEY=your_key_here
```

Access in code: `import.meta.env.VITE_SOME_API_KEY`

## 📊 Performance

### Optimizations Included

✅ **Code Splitting**: Vendor, router, UI chunks
✅ **Tree Shaking**: Unused code removed
✅ **Minification**: CSS and JS compressed
✅ **Asset Optimization**: Hashed filenames for caching
✅ **Lazy Loading**: Components loaded on demand

### Bundle Analysis

```bash
# Install analyzer
npm install -D rollup-plugin-visualizer

# Add to vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer';

plugins: [
  visualizer({ open: true })
]

# Build and view
npm run build:static
```

## 🐛 Troubleshooting

### Build Fails

```bash
# Clean install
rm -rf node_modules dist
npm install
npm run build:static
```

### Routes Don't Work After Deploy

- Ensure `404.html` exists in build output
- Verify `.nojekyll` file is present (GitHub Pages)
- Check `base` path in vite.config.ts

### Data Not Loading

```bash
# Regenerate static data
npm run generate:static

# Check output
ls -la client/public/api/

# Rebuild
npm run build:static
```

### Images Missing

- Images must be in `client/public/images/`
- Or copied there during build from `public/images/`
- Check `generate-static-data.js` for image sync

## 🚀 Deployment Platforms Comparison

| Platform | Auto Deploy | Custom Domain | HTTPS | CDN | Cost |
|----------|------------|---------------|-------|-----|------|
| GitHub Pages | ✅ (Actions) | ✅ | ✅ | ✅ (Fastly) | Free |
| Netlify | ✅ | ✅ | ✅ | ✅ | Free tier |
| Vercel | ✅ | ✅ | ✅ | ✅ | Free tier |
| Cloudflare Pages | ✅ | ✅ | ✅ | ✅ (CF) | Free |
| AWS S3 + CloudFront | Manual | ✅ | ✅ | ✅ | ~$1/mo |

**Recommendation**: GitHub Pages (already configured!)

## 📚 File Structure Reference

```
personal-website/
├── client/                       # Frontend app
│   ├── src/                      # React source
│   ├── public/                   # Static assets
│   │   ├── api/                  # Generated JSON (auto)
│   │   ├── images/               # Images
│   │   ├── 404.html              # SPA fallback ✨
│   │   ├── .nojekyll             # GitHub Pages ✨
│   │   └── CNAME                 # Custom domain ✨
│   └── index.html                # HTML template
├── content/                      # Markdown content
│   ├── blog/                     # Blog posts
│   ├── publications/             # Publications
│   └── about/                    # About page
├── scripts/                      # Build scripts
│   └── generate-static-data.js   # Markdown → JSON
├── dist/public/                  # Build output
├── .github/workflows/            # CI/CD ✨
│   └── deploy.yml                # GitHub Actions
├── vite.config.ts                # Build config
├── package.json                  # Dependencies
└── README.md                     # Documentation

✨ = Static deployment files
```

## ✅ Pre-Deployment Checklist

- [ ] Content in markdown format
- [ ] Images in `client/public/images/`
- [ ] Build succeeds locally: `npm run build:static`
- [ ] Test build locally: `npx serve dist/public`
- [ ] All routes work
- [ ] Images load correctly
- [ ] Custom domain configured (if applicable)
- [ ] DNS records set (if applicable)
- [ ] `.nojekyll` in output
- [ ] `404.html` in output
- [ ] Git repository pushed

## 🎉 You're All Set!

Your static website is:
- ✅ Server-free
- ✅ Fast and scalable
- ✅ Easy to update
- ✅ Secure
- ✅ Free to host

**Deploy and enjoy!** 🚀

For GitHub Pages specific setup, see [GITHUB_PAGES_DEPLOYMENT.md](./GITHUB_PAGES_DEPLOYMENT.md)
