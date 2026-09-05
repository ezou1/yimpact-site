import type { BlogCategory, BlogPost, ScheduleItem } from '../types/content';
import type { PostRow, SponsorScheduleRow } from '../types/db';
import { supabase } from './supabase';

// One string for each paragraph. The Blog page needs this shape.
export function toParagraphs(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function coverUrl(path: string | null): string | undefined {
  if (!path) return undefined;
  return supabase.storage.from('blog-images').getPublicUrl(path).data.publicUrl;
}

export function toBlogPost(row: PostRow): BlogPost {
  return {
    slug: row.slug,
    title: row.title,
    category: row.category as BlogCategory,
    kicker: row.kicker,
    publishedAt: row.published_at,
    author: row.author,
    authorRole: row.author_role,
    excerpt: row.excerpt,
    body: toParagraphs(row.body_text),
    lead: row.is_lead,
    coverUrl: coverUrl(row.cover_path),
    coverAlt: row.cover_alt,
  };
}

export function toScheduleItem(row: SponsorScheduleRow): ScheduleItem {
  return {
    id: row.id,
    startsAt: row.starts_at,
    endsAt: row.ends_at,
    title: row.title,
    description: row.description ?? undefined,
    location: row.location ?? undefined,
  };
}
