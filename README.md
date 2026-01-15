# Valeriia Kuka - Personal Website

A modern, fully static personal website built with React, Vite, and TailwindCSS. Optimized for GitHub Pages deployment with client-side routing support.

## 🚀 Features

- **100% Static**: No server required, deploys to GitHub Pages
- **Fast Performance**: Optimized build with code splitting
- **SPA Routing**: Client-side routing with GitHub Pages support
- **Content Management**: Markdown-based blog posts and publications
- **Auto Deploy**: GitHub Actions workflow for automatic deployment
- **Custom Domain**: Configured for valeriiakuka.com

## 📁 Project Structure

```
personal-website/
├── client/                    # React frontend application
│   ├── src/                   # Source code
│   │   ├── components/        # React components
│   │   ├── pages/             # Page components
│   │   ├── lib/               # Utilities and helpers
│   │   └── main.tsx           # Application entry point
│   ├── public/                # Static assets
│   │   ├── api/               # Generated JSON files (auto-generated)
│   │   ├── images/            # Images
│   │   ├── 404.html           # SPA routing fallback
│   │   ├── .nojekyll          # Prevent Jekyll processing
│   │   └── CNAME              # Custom domain configuration
│   └── index.html             # HTML template
├── content/                   # Markdown content
│   ├── blog/                  # Blog posts
│   ├── publications/          # Publications
│   └── about/                 # About page content
├── scripts/                   # Build scripts
│   └── generate-static-data.js  # Markdown to JSON converter
├── server/                    # Express server (dev only)
├── .github/workflows/         # GitHub Actions
│   └── deploy.yml             # Deployment workflow
└── dist/public/               # Build output (generated)
```

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Routing**: Wouter (client-side)
- **UI Components**: Radix UI
- **Data Fetching**: TanStack Query
- **Deployment**: GitHub Pages + GitHub Actions

## 📝 Content Management

### Blog Posts

Create new blog posts in `content/blog/`:

```markdown
---
title: "Your Post Title"
slug: "your-post-slug"
excerpt: "Brief description"
publishedAt: "2026-01-15"
tags: [tag1, tag2]
published: true
image: "/images/blog/cover.png"
readTime: "5 min read"
---

Your content here...
```

### Publications

Create new publications in `content/publications/`:

```markdown
---
title: "Publication Title"
url: "https://example.com/article"
description: "Brief description"
publication: "Publication Name"
category: "Category"
publishedAt: "2026-01-15"
featured: true
priority: 1
---
```

### About Page

Edit `content/about/profile.md`:

```markdown
---
name: "Your Name"
title: "Your Title"
email: "your@email.com"
location: "Your Location"
linkedin: "https://linkedin.com/in/yourprofile"
twitter: "https://twitter.com/yourhandle"
---

Your bio content...
```

## 🚀 Development

### Prerequisites

- Node.js 20+
- npm

### Setup

```bash
# Install dependencies
npm install

# Generate static data from markdown
npm run generate:static

# Start development server
npm run dev
```

The development server runs on `http://localhost:5000` with hot module replacement.

## 📦 Building for Production

Build the static site:

```bash
npm run build:static
```

This command:
1. Generates JSON files from markdown content
2. Builds the React app with Vite
3. Outputs everything to `dist/public/`

### Test Production Build Locally

```bash
# After building
npx serve dist/public
```

## 🌐 Deployment

### Automatic Deployment (GitHub Actions)

The site automatically deploys to GitHub Pages when you push to the `main` branch.

**Setup Steps:**

1. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: GitHub Actions
   - Branch will be deployed automatically

2. **Configure Custom Domain** (if using):
   - Update `client/public/CNAME` with your domain
   - Configure DNS:
     - Add CNAME record: `valeriiakuka.com` → `yourusername.github.io`
     - Or use GitHub's IP addresses for A records

3. **Push to Deploy**:
   ```bash
   git push origin main
   ```

The GitHub Actions workflow will:
- Install dependencies
- Generate static data
- Build the site
- Deploy to GitHub Pages

### Manual Deployment

```bash
# Build the site
npm run build:static

# Deploy contents of dist/public/ to your hosting service
```

## 🎨 Customization

### Styling

- Edit TailwindCSS configuration in `tailwind.config.ts`
- Global styles in `client/src/index.css`
- Component styles using Tailwind utility classes

### Components

- UI components in `client/src/components/`
- Page components in `client/src/pages/`

### Configuration

- Vite config: `vite.config.ts`
- TypeScript config: `tsconfig.json`
- PostCSS config: `postcss.config.js`

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build app and server
- `npm run build:static` - Generate static data and build for deployment
- `npm run generate:static` - Generate JSON files from markdown
- `npm run start` - Start production server (not needed for static deployment)
- `npm run check` - Type check TypeScript

## 🔧 How Static Deployment Works

1. **Content Storage**: All content is in markdown files in `content/`
2. **Build Time**: `generate-static-data.js` converts markdown to JSON
3. **Runtime**: React app fetches from static JSON files
4. **Routing**: GitHub Pages serves `404.html` for unknown routes, which redirects to `index.html` preserving the path
5. **Client Router**: Wouter handles routing on the client side

## 🐛 Troubleshooting

### Routes not working on GitHub Pages

- Ensure `404.html` exists in `client/public/`
- Verify `.nojekyll` file exists
- Check base path in `vite.config.ts` (should be `/` for custom domain)

### Images not loading

- Images must be in `client/public/images/`
- Reference as `/images/filename.png` in markdown
- Run `npm run build:static` to copy images

### Build fails

- Run `npm ci` to clean install dependencies
- Check Node.js version (requires 20+)
- Clear cache: `rm -rf node_modules dist && npm install`

## 📄 License

MIT

## 👤 Author

**Valeriia Kuka**
- Website: [valeriiakuka.com](https://valeriiakuka.com)
- LinkedIn: [linkedin.com/in/valeriiakuka](https://linkedin.com/in/valeriiakuka)

---

Built with ❤️ using React, Vite, and TailwindCSS

