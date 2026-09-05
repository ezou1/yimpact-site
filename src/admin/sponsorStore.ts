import { useCallback, useEffect, useState } from 'react';
import type { Domain, Sponsor } from '../types/content';
import { sponsors as seededSponsors } from '../content/sponsors';

// Partners added through the admin panel live in this browser's localStorage.
// They are not shared with anyone else and do not survive a cleared cache.
// This is a demo path until there is a backend to post them to.
const STORAGE_KEY = 'yie.sponsors.local';

export interface AddedSponsor {
  id: string;
  name: string;
  domain: Domain;
  impact: number; // 0-100, set by the slider inside the drop's allowed range.
  logoUrl: string; // A data: URL produced from the uploaded file.
  websiteUrl?: string;
  addedAt: string;
}

function readAdded(): AddedSponsor[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as AddedSponsor[]) : [];
  } catch {
    return [];
  }
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

export function useSponsors() {
  const [added, setAdded] = useState<AddedSponsor[]>([]);

  useEffect(() => {
    setAdded(readAdded());
  }, []);

  const addSponsor = useCallback((entry: Omit<AddedSponsor, 'id' | 'addedAt'>) => {
    const record: AddedSponsor = {
      ...entry,
      id: `local-${Date.now().toString(36)}`,
      addedAt: new Date().toISOString(),
    };
    setAdded((current) => {
      const next = [...current, record];
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Over quota, most likely a large logo. The partner still shows for
        // this session.
      }
      return next;
    });
    return record;
  }, []);

  const removeSponsor = useCallback((id: string) => {
    setAdded((current) => {
      const next = current.filter((entry) => entry.id !== id);
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Nothing to do.
      }
      return next;
    });
  }, []);

  return {
    sponsors: [...seededSponsors, ...added.map(toSponsor)],
    addedIds: new Set(added.map((entry) => entry.id)),
    addSponsor,
    removeSponsor,
  };
}
