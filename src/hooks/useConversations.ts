import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { ConversationRow, MemberStatus, UserRole } from '../types/db';
import type { LoadStatus } from './usePosts';

export interface InboxEntry extends ConversationRow {
  memberName: string;
  memberEmail: string;
  memberRole: UserRole;
  memberStatus: MemberStatus;
}

type JoinedRow = ConversationRow & {
  profiles: {
    full_name: string;
    email: string;
    role: UserRole;
    status: MemberStatus;
  } | null;
};

// The admin inbox. An admin reads every conversation, so no filter is needed.
export function useConversations() {
  const [entries, setEntries] = useState<InboxEntry[]>([]);
  const [status, setStatus] = useState<LoadStatus>('loading');

  useEffect(() => {
    let ignore = false;

    supabase
      .from('conversations')
      .select(
        'id,member_id,subject,created_at,last_message_at,profiles!conversations_member_id_fkey(full_name,email,role,status)',
      )
      .order('last_message_at', { ascending: false })
      .then(({ data, error }) => {
        if (ignore) return;
        if (error) {
          setStatus('error');
          return;
        }
        const rows = data as unknown as JoinedRow[];
        setEntries(
          rows.map((row) => ({
            ...row,
            memberName: row.profiles?.full_name || row.profiles?.email || 'Member',
            memberEmail: row.profiles?.email ?? '',
            memberRole: row.profiles?.role ?? 'student',
            memberStatus: row.profiles?.status ?? 'pending',
          })),
        );
        setStatus('ready');
      });

    return () => {
      ignore = true;
    };
  }, []);

  return { entries, status };
}
