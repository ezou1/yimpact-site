import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { toBlogPost } from '../lib/adapters';
import type { BlogPost } from '../types/content';
import type { PostRow } from '../types/db';

export type LoadStatus = 'loading' | 'ready' | 'error';

const columns =
  'id,slug,title,category,kicker,published_at,author,author_role,excerpt,body_text,cover_path,cover_alt,is_lead,is_published';

// Newest first. The Blog page reads the list in this order.
export function usePosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [status, setStatus] = useState<LoadStatus>('loading');
  const [attempt, setAttempt] = useState(0);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);

  useEffect(() => {
    let ignore = false;
    setStatus('loading');

    supabase
      .from('posts')
      .select(columns)
      .order('published_at', { ascending: false })
      .then(({ data, error }) => {
        if (ignore) return;
        if (error) {
          setStatus('error');
          return;
        }
        setPosts((data as PostRow[]).map(toBlogPost));
        setStatus('ready');
      });

    return () => {
      ignore = true;
    };
  }, [attempt]);

  return { posts, status, retry };
}

// One post. The page must not show the error 404 page while this loads.
export function usePost(slug: string | undefined) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [status, setStatus] = useState<LoadStatus>('loading');

  useEffect(() => {
    if (!slug) {
      setStatus('ready');
      setPost(null);
      return;
    }

    let ignore = false;
    setStatus('loading');

    supabase
      .from('posts')
      .select(columns)
      .eq('slug', slug)
      .maybeSingle()
      .then(({ data, error }) => {
        if (ignore) return;
        if (error) {
          setStatus('error');
          return;
        }
        setPost(data ? toBlogPost(data as PostRow) : null);
        setStatus('ready');
      });

    return () => {
      ignore = true;
    };
  }, [slug]);

  return { post, status };
}
