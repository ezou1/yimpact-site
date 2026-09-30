import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { toScheduleItem } from '../lib/adapters';
import type { ScheduleItem } from '../types/content';
import type { SponsorScheduleRow } from '../types/db';
import type { LoadStatus } from './usePosts';

// A sponsor reads their own items. Row Level Security does the filter.
export function useSponsorSchedule() {
  const [items, setItems] = useState<ScheduleItem[]>([]);
  const [status, setStatus] = useState<LoadStatus>('loading');

  useEffect(() => {
    let ignore = false;

    supabase
      .from('sponsor_schedule_items')
      .select('id,sponsor_id,starts_at,ends_at,title,location,description')
      .order('starts_at', { ascending: true })
      .then(({ data, error }) => {
        if (ignore) return;
        if (error) {
          setStatus('error');
          return;
        }
        setItems((data as SponsorScheduleRow[]).map(toScheduleItem));
        setStatus('ready');
      });

    return () => {
      ignore = true;
    };
  }, []);

  return { items, status };
}
