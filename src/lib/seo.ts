import { siteConfig } from "./site";
import type { Note, Profile, WorkCase } from "./content";

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.siteUrl).toString();
}

export function personJsonLd(profile: Profile) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    email: profile.email,
    url: siteConfig.siteUrl,
    sameAs: [profile.linkedin, profile.twitter, profile.github].filter(Boolean),
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.location,
    },
  };
}

export function articleJsonLd(note: Note) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: note.title,
    description: note.description,
    datePublished: note.publishedAt,
    url: absoluteUrl(`/blog/${note.slug}/`),
  };
}

export function workJsonLd(work: WorkCase) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: work.title,
    description: work.description,
    url: absoluteUrl(`/work/${work.slug}/`),
  };
}
