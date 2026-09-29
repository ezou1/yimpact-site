import { useCallback, useEffect, useState } from 'react';
import type { Domain, Sponsor } from '../types/content';
import { sponsors as seededSponsors } from '../content/sponsors';
import { supabase } from '../lib/supabase';

// Partners added through the portal live in the database, so every reader sees
// the same roster. The seeded partners stay in src/content/sponsors.ts. This
// hook joins the two lists.
//
// The logo goes to the sponsor-logos bucket. A data URL held the whole image
// in the row, which is heavy and has no cache.

export interface AddedSponsor {
  id: string;
  name: string;
  domain: Domain;
  impact: number; // 0-100. Sets the bubble diameter and the tier label.
  logoUrl: string;
  websiteUrl?: string;
  addedAt: string;
}

interface AddedSponsorRow {
  id: string;
  name: string;
  domain: Domain;
  impact: number;
  logo_path: string | null;
  website_url: string | null;
  created_at: string;
}

export interface NewSponsor {
  name: string;
  domain: Domain;
  impact: number;
  logoFile: File | null;
  websiteUrl?: string;
}

function publicLogoUrl(path: string | null): string {
  if (!path) return '/logos/filler/yale-placeholder.svg';
  return supabase.storage.from('sponsor-logos').getPublicUrl(path).data.publicUrl;
}

function toAdded(row: AddedSponsorRow): AddedSponsor {
  return {
    id: row.id,
    name: row.name,
    domain: row.domain,
    impact: row.impact,
    logoUrl: publicLogoUrl(row.logo_path),
    websiteUrl: row.website_url ?? undefined,
    addedAt: row.created_at,
  };
}

function tierFor(impact: number): Sponsor['tier'] {
  if (impact >= 76) return 'lead';
  if (impact >= 50) return 'partner';
  return 'supporting';
}

function toSponsor(added: AddedSponsor): Sponsor {
  return {
    id: added.id,
    name: added.name,
    domain: added.domain,
    tier: tierFor(added.impact),
    impact: added.impact,
    logoUrl: added.logoUrl,
    websiteUrl: added.websiteUrl,
    featured: false,
  };
}

const columns = 'id,name,domain,impact,logo_path,website_url,created_at';

export function useSponsors() {
  const [added, setAdded] = useState<AddedSponsor[]>([]);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const { data, error: readError } = await supabase
      .from('added_sponsors')
      .select(columns)
      .order('created_at', { ascending: true });

    if (readError) {
      setError(readError.message);
      return;
    }
    setError(null);
    setAdded((data as AddedSponsorRow[]).map(toAdded));
  }, []);

  useEffect(() => {
    let ignore = false;
    void (async () => {
      const { data } = await supabase
        .from('added_sponsors')
        .select(columns)
        .order('created_at', { ascending: true });
      if (!ignore && data) setAdded((data as AddedSponsorRow[]).map(toAdded));
    })();
    return () => {
      ignore = true;
    };
  }, []);

  // Row Level Security allows this for an admin only. A student gets an error.
  const addSponsor = useCallback(
    async (entry: NewSponsor): Promise<{ error: string | null }> => {
      const { data, error: insertError } = await supabase
        .from('added_sponsors')
        .insert({
          name: entry.name,
          domain: entry.domain,
          impact: entry.impact,
          website_url: entry.websiteUrl ?? null,
        })
        .select('id')
        .single();

      if (insertError) return { error: insertError.message };

      const row = data as { id: string };

      // The object path needs the row id, so the upload follows the insert.
      if (entry.logoFile) {
        const path = `partners/${row.id}/${entry.logoFile.name}`;
        const upload = await supabase.storage
          .from('sponsor-logos')
          .upload(path, entry.logoFile, { upsert: true });

        if (upload.error) {
          await load();
          return { error: `The partner is saved, but the logo did not upload: ${upload.error.message}` };
        }

        const patch = await supabase
          .from('added_sponsors')
          .update({ logo_path: path })
          .eq('id', row.id);
        if (patch.error) return { error: patch.error.message };
      }

      await load();
      return { error: null };
    },
    [load],
  );

  const removeSponsor = useCallback(
    async (id: string): Promise<{ error: string | null }> => {
      const { error: deleteError } = await supabase
        .from('added_sponsors')
        .delete()
        .eq('id', id);
      if (deleteError) return { error: deleteError.message };
      await load();
      return { error: null };
    },
    [load],
  );

  return {
    sponsors: [...seededSponsors, ...added.map(toSponsor)],
    addedIds: new Set(added.map((entry) => entry.id)),
    addSponsor,
    removeSponsor,
    error,
    reload: load,
  };
}
