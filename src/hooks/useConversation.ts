import { useCallback, useEffect, useRef, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../auth/useAuth';
import type { ConversationRow, MessageRow } from '../types/db';
import type { LoadStatus } from './usePosts';

const pollMs = 4000;

interface Options {
  // False for an admin. An admin opens the thread of another member, and must
  // not fall back to a thread of their own.
  findOwn?: boolean;
}

// Find the conversation of the signed-in member, or make it on the first
// message. An admin passes a conversation id instead.
export function useConversation(conversationId?: string, { findOwn = true }: Options = {}) {
  const { session } = useAuth();
  const userId = session?.user.id ?? null;

  const [threadId, setThreadId] = useState<string | null>(conversationId ?? null);
  const [messages, setMessages] = useState<MessageRow[]>([]);
  const [status, setStatus] = useState<LoadStatus>('loading');
  const [isSending, setIsSending] = useState(false);
  const lastId = useRef(0);

  // Reset every piece of state when the open thread changes. Without this, the
  // messages of the last thread stay on screen.
  useEffect(() => {
    setThreadId(conversationId ?? null);
    setMessages([]);
    lastId.current = 0;
    // An admin with no thread open waits for nothing.
    setStatus(!conversationId && !findOwn ? 'ready' : 'loading');
  }, [conversationId, findOwn]);

  // Find the thread of the member. An admin already has the id.
  useEffect(() => {
    if (conversationId || !userId || !findOwn) return;

    let ignore = false;

    supabase
      .from('conversations')
      .select('id')
      .eq('member_id', userId)
      .maybeSingle()
      .then(({ data, error }) => {
        if (ignore) return;
        if (error) {
          setStatus('error');
          return;
        }
        // No row yet. The first message makes one.
        setThreadId((data as Pick<ConversationRow, 'id'> | null)?.id ?? null);
        if (!data) setStatus('ready');
      });

    return () => {
      ignore = true;
    };
  }, [conversationId, userId, findOwn]);

  // The caller can pass an id. A new thread is not in state yet when the first
  // message lands.
  const fetchNew = useCallback(
    async (id?: string) => {
    const target = id ?? threadId;
    if (!target) return;

    const { data, error } = await supabase
      .from('messages')
      .select('id,conversation_id,sender_id,body,created_at')
      .eq('conversation_id', target)
      .gt('id', lastId.current)
      .order('id', { ascending: true });

    if (error) {
      setStatus('error');
      return;
    }

    const rows = data as MessageRow[];
    if (rows.length > 0) {
      lastId.current = rows[rows.length - 1].id;
      setMessages((current) => [...current, ...rows]);
    }
    setStatus('ready');
    },
    [threadId],
  );

  // Poll while the tab is visible. Realtime is a small change later.
  useEffect(() => {
    if (!threadId) return;

    let timer: number | undefined;

    const start = () => {
      void fetchNew();
      timer = window.setInterval(() => void fetchNew(), pollMs);
    };

    const stop = () => {
      if (timer) window.clearInterval(timer);
      timer = undefined;
    };

    const onVisibility = () => {
      stop();
      if (document.visibilityState === 'visible') start();
    };

    start();
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      stop();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [threadId, fetchNew]);

  const send = useCallback(
    async (body: string): Promise<{ error: string | null }> => {
      const text = body.trim();
      if (!text || !userId) return { error: null };
      // An admin always opens an existing thread, and never makes one here.
      if (!threadId && !findOwn) return { error: 'Open a conversation first.' };

      setIsSending(true);
      let id = threadId;

      // Make the thread on the first message.
      if (!id) {
        const { data, error } = await supabase
          .from('conversations')
          .insert({ member_id: userId })
          .select('id')
          .single();

        if (error) {
          setIsSending(false);
          return { error: error.message };
        }
        id = (data as Pick<ConversationRow, 'id'>).id;
        setThreadId(id);
      }

      const { error } = await supabase
        .from('messages')
        .insert({ conversation_id: id, sender_id: userId, body: text });

      setIsSending(false);
      if (error) return { error: error.message };

      await fetchNew(id);
      return { error: null };
    },
    [threadId, userId, findOwn, fetchNew],
  );

  return { messages, status, send, isSending, threadId };
}
