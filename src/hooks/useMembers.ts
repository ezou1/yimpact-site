import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { ProfileRow } from '../types/db';
import type { LoadStatus } from './usePosts';

// Every profile. Only an admin gets more than their own row back.
export function useMembers() {
  const [members, setMembers] = useState<ProfileRow[]>([]);
  const [status, setStatus] = useState<LoadStatus>('loading');
  const [attempt, setAttempt] = useState(0);

  const reload = useCallback(() => setAttempt((n) => n + 1), []);

  useEffect(() => {
    let ignore = false;
    setStatus('loading');

    supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (ignore) return;
        if (error) {
          setStatus('error');
          return;
        }
        setMembers(data as ProfileRow[]);
        setStatus('ready');
      });

    return () => {
      ignore = true;
    };
  }, [attempt]);

  // approve_member checks the caller. A student who calls it gets error 42501.
  const decide = useCallback(
    async (userId: string, approve: boolean): Promise<{ error: string | null }> => {
      const { error } = await supabase.rpc('approve_member', {
        p_user_id: userId,
        p_approve: approve,
      });
      if (error) return { error: error.message };
      reload();
      return { error: null };
    },
    [reload],
  );

  return { members, status, decide, reload };
}
