import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../auth/useAuth';
import type { Resource, ResourceRow, ResourceSecretRow } from '../types/db';
import type { LoadStatus } from './usePosts';

// The public half. Every reader can read these columns.
const publicColumns =
  'id,title,kind,owner_kind,org_slug,org_name,person_name,person_title,person_affiliation,summary,domain,sort_order';

// The gated half. A reader with no session holds no privilege on
// resource_secrets, so the request answers 403. Ask for the embed only when
// there is a session, then let Row Level Security decide what comes back.
const memberColumns = `${publicColumns},resource_secrets(contact_email,contact_phone,booking_url,promo_code,redeem_url,instructions,expires_on)`;

type EmbeddedRow = ResourceRow & {
  resource_secrets?: ResourceSecretRow | ResourceSecretRow[] | null;
};

function firstSecret(row: EmbeddedRow): ResourceSecretRow | null {
  const secret = row.resource_secrets;
  if (!secret) return null;
  return Array.isArray(secret) ? (secret[0] ?? null) : secret;
}

export function useResources() {
  const { status: authStatus, session } = useAuth();
  const [resources, setResources] = useState<Resource[]>([]);
  const [status, setStatus] = useState<LoadStatus>('loading');
  const [attempt, setAttempt] = useState(0);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);
  const hasSession = Boolean(session);

  useEffect(() => {
    // Wait for the session. Otherwise the first request always runs as an
    // anonymous reader and the details never arrive.
    if (authStatus === 'loading') return;

    let ignore = false;
    setStatus('loading');

    supabase
      .from('resources')
      .select(hasSession ? memberColumns : publicColumns)
      .order('sort_order', { ascending: true })
      .then(({ data, error }) => {
        if (ignore) return;
        if (error) {
          setStatus('error');
          return;
        }
        const rows = data as unknown as EmbeddedRow[];
        setResources(
          rows.map((row) => ({ ...row, secret: hasSession ? firstSecret(row) : null })),
        );
        setStatus('ready');
      });

    return () => {
      ignore = true;
    };
  }, [authStatus, hasSession, attempt]);

  return { resources, status, retry };
}
