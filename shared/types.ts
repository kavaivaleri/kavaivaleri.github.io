// Pure TypeScript types for static site
// No database dependencies required

export type Project = {
  id: string;
  title: string;
  description: string;
  content: string;
  technologies: string[];
  githubUrl?: string | null;
  liveUrl?: string | null;
  imageUrl?: string | null;
  category: string;
  featured: string;
  createdAt: Date | string;
};

export type InsertProject = Omit<Project, 'id' | 'createdAt'>;

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
  readTime: string;
  published: string;
  publishedAt: Date | string;
  imageUrl?: string | null;
  createdAt: Date | string;
};

export type InsertBlogPost = Omit<BlogPost, 'id' | 'createdAt' | 'publishedAt'>;

export type Publication = {
  id: string;
  title: string;
  description: string;
  url: string;
  publication: string;
  category: string;
  publishedAt: Date | string;
  featured: string;
  priority?: string | null;
  readTime?: string | null;
  imageUrl?: string | null;
  createdAt: Date | string;
};

export type InsertPublication = Omit<Publication, 'id' | 'createdAt'>;

