# GitHub Pages Deployment Guide

✅ **Your site is now 100% static and fully configured for GitHub Pages!**

This website is a fully static React SPA that works perfectly with GitHub Pages. No server required!

## 🎯 Quick Start

### 1. Enable GitHub Pages

1. Go to your repository **Settings → Pages**
2. Set **Source** to: **GitHub Actions**
3. That's it! The workflow will auto-deploy on push to `main`

### 2. Configure Custom Domain (Optional)

The CNAME file is already configured for `valeriiakuka.com`. To use your custom domain:

**DNS Configuration:**
- **Option A (Recommended)**: Add CNAME record
  - `valeriiakuka.com` → `yourusername.github.io`
  
- **Option B**: Add A records (apex domain)
  ```
  185.199.108.153
  185.199.109.153
  185.199.110.153
  185.199.111.153
  ```

**In GitHub:**
1. Settings → Pages → Custom domain
2. Enter: `valeriiakuka.com`
3. Save (DNS check happens automatically)

### 3. Deploy

Simply push to main branch:

```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

GitHub Actions will automatically:
1. ✅ Install dependencies
2. ✅ Generate static JSON from markdown
3. ✅ Build the React app
4. ✅ Deploy to GitHub Pages

## 🔧 How It Works

### Architecture

```
Markdown Content → Static JSON Files → React SPA → GitHub Pages
```

**Key Components:**

1. **Content Management**: Markdown files in `content/` directory
2. **Build Time Generation**: `scripts/generate-static-data.js` converts markdown to JSON
3. **Static Assets**: JSON files copied to `client/public/api/`
4. **Vite Build**: React app bundled to `dist/public/`
5. **SPA Routing**: `404.html` redirects preserve client-side routes
6. **GitHub Actions**: Automated build and deployment

### SPA Routing on GitHub Pages

GitHub Pages is designed for static sites, not SPAs. We solve this with:

- **404.html**: Intercepts all non-existent routes
- **Redirect Script**: Preserves the path in sessionStorage
- **Index.html**: Reads saved path and lets router handle it
- **.nojekyll**: Prevents Jekyll from processing files

This allows URLs like `/blog/my-post` to work correctly!

## 📦 Build Process

### What Happens During Build

```bash
npm run build:static
```

**Step 1: Generate Static Data**
- Reads markdown files from `content/blog/`, `content/publications/`, `content/about/`
- Parses frontmatter metadata
- Converts to JSON format
- Outputs to `client/public/api/`

**Step 2: Build React App**
- Vite bundles the React application
- Optimizes and minifies code
- Generates `dist/public/` directory
- Copies static assets (images, JSON, CNAME, .nojekyll, 404.html)

### Output Structure

```
dist/public/
├── index.html              # Main HTML file
├── 404.html                # SPA routing fallback
├── .nojekyll               # Disable Jekyll processing
├── CNAME                   # Custom domain configuration
├── assets/                 # JS, CSS bundles
├── images/                 # Image assets
└── api/                    # Static JSON data
    ├── blog-posts.json
    ├── blog-posts/slug/*.json
    ├── publications.json
    ├── publications/featured.json
    └── about.json
```

## 🧪 Local Testing

Test the production build locally before deploying:

```bash
# Build the static site
npm run build:static

# Serve it locally
npx serve dist/public
```

Open `http://localhost:3000` and test:
- ✅ Home page loads
- ✅ Navigation works
- ✅ Blog posts load
- ✅ Publications load
- ✅ Direct URLs work (e.g., `/blog/post-slug`)
- ✅ 404 page redirects correctly

## 📝 Adding Content

### New Blog Post

1. Create `content/blog/my-new-post.md`:

```markdown
---
title: "My New Post"
slug: "my-new-post"
excerpt: "Brief description"
publishedAt: "2026-01-15"
tags: [tech, writing]
published: true
image: "/images/blog/cover.png"
readTime: "5 min read"
---

Your content here...
```

2. Rebuild and deploy:

```bash
npm run build:static
git add .
git commit -m "Add new blog post"
git push origin main
```

### New Publication

1. Create `content/publications/my-article.md`:

```markdown
---
title: "Article Title"
url: "https://example.com/article"
description: "Brief description"
publication: "Publication Name"
category: "AI/ML"
publishedAt: "2026-01-15"
featured: true
priority: 1
---
```

2. Rebuild and deploy (same as above)

## 🐛 Troubleshooting

### Routes Return 404

**Problem**: Direct URLs like `/blog/post` show 404
**Solution**: 
- Verify `client/public/404.html` exists
- Check `.nojekyll` file is in `client/public/`
- Ensure these files are in `dist/public/` after build

### Images Not Loading

**Problem**: Images don't appear on the site
**Solution**:
- Images must be in `client/public/images/`
- Reference as `/images/filename.png` in markdown
- Run `npm run build:static` to include them in build

### Build Fails in GitHub Actions

**Problem**: Workflow fails with errors
**Solution**:
- Check Node.js version (requires 20+)
- Verify all dependencies in `package.json`
- Test build locally: `npm run build:static`
- Check workflow logs in GitHub Actions tab

### Custom Domain Not Working

**Problem**: Custom domain shows "Site can't be reached"
**Solution**:
- Wait for DNS propagation (up to 24 hours)
- Verify CNAME file contains correct domain
- Check DNS settings with `dig valeriiakuka.com`
- Enable "Enforce HTTPS" in GitHub Pages settings (after DNS works)

### Styles Not Applying

**Problem**: Site loads but looks unstyled
**Solution**:
- Check `base` path in `vite.config.ts` (should be `/` for custom domain)
- Verify build completed successfully
- Clear browser cache
- Check browser console for asset loading errors

## 🔐 Security & Performance

### What's Included

✅ **No Server Vulnerabilities**: Pure static files
✅ **Fast Loading**: Optimized bundles with code splitting
✅ **CDN Delivery**: GitHub Pages uses Fastly CDN
✅ **HTTPS**: Free SSL certificate
✅ **No Database**: No SQL injection risks

### Performance Optimizations

- Code splitting (vendor, router, UI chunks)
- Image optimization
- Minified CSS and JS
- Gzip compression (automatic via GitHub Pages)

## 📊 Analytics (Optional)

To add analytics, insert your tracking code in `client/index.html`:

```html
<head>
  <!-- Your existing head content -->
  
  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
  </script>
</head>
```

## 📚 Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Custom Domain Setup](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [GitHub Actions for Pages](https://github.com/actions/deploy-pages)
- [Vite Static Deploy Guide](https://vitejs.dev/guide/static-deploy.html)

## ✅ Deployment Checklist

Before deploying, verify:

- [ ] `.nojekyll` exists in `client/public/`
- [ ] `404.html` exists in `client/public/`
- [ ] `CNAME` contains correct domain (if using custom domain)
- [ ] `vite.config.ts` has correct base path
- [ ] `.github/workflows/deploy.yml` exists
- [ ] Local build succeeds: `npm run build:static`
- [ ] GitHub Pages enabled in repository settings
- [ ] DNS configured (if using custom domain)
- [ ] All content in `content/` directory
- [ ] Images in `client/public/images/`

## 🎉 Success!

Your static website is now:
- ✅ 100% static (no server needed)
- ✅ Automatically deployed via GitHub Actions
- ✅ Hosted on GitHub Pages with custom domain
- ✅ Fast, secure, and scalable
- ✅ Easy to update (just edit markdown and push!)

**Next Steps:**
1. Push to main branch
2. Wait for GitHub Actions to complete
3. Visit your site at `https://valeriiakuka.com`

Enjoy your new static website! 🚀
