import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { allowedDomainMessage, hasAllowedDomain } from '../lib/email';
import type { ProfileEdit, ProfileRow } from '../types/db';
import { AuthContext } from './context';
import type { AuthStatus, AuthValue, SignUpFields } from './context';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>('loading');
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<ProfileRow | null>(null);

  // The session effect. Do not await a Supabase call inside the callback.
  // The client holds a lock during that callback and an await deadlocks it.
  useEffect(() => {
    let ignore = false;

    supabase.auth.getSession().then(({ data }) => {
      if (ignore) return;
      setSession(data.session);
      setStatus(data.session ? 'signedIn' : 'signedOut');
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
      setStatus(next ? 'signedIn' : 'signedOut');
    });

    return () => {
      ignore = true;
      listener.subscription.unsubscribe();
    };
  }, []);

  const userId = session?.user.id ?? null;

  // The profile effect. A slow answer must not replace a newer one, so the
  // cleanup sets the ignore flag.
  useEffect(() => {
    if (!userId) {
      setProfile(null);
      return;
    }

    let ignore = false;

    supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle()
      .then(({ data }) => {
        if (!ignore) setProfile((data as ProfileRow | null) ?? null);
      });

    return () => {
      ignore = true;
    };
  }, [userId]);

  const refreshProfile = useCallback(async () => {
    if (!userId) return;
    // The token carries a stale role and status until it refreshes. Ask for a
    // new token first, then read the row.
    await supabase.auth.refreshSession();
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
    setProfile((data as ProfileRow | null) ?? null);
  }, [userId]);

  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error ? error.message : null };
  }, []);

  const signUp = useCallback(
    async (email: string, password: string, fields: SignUpFields) => {
      if (!hasAllowedDomain(email)) {
        return { error: allowedDomainMessage };
      }

      // These fields go to user_metadata. The signup trigger copies them into
      // the profile row once. The role never comes from here.
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fields.fullName,
            school: fields.school,
            program: fields.program,
            grad_year: fields.gradYear,
          },
        },
      });
      return { error: error ? error.message : null };
    },
    [],
  );

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setProfile(null);
  }, []);

  const saveProfile = useCallback(
    async (edit: ProfileEdit) => {
      if (!userId) return { error: 'You are not signed in.' };

      const { data, error } = await supabase
        .from('profiles')
        .update(edit)
        .eq('id', userId)
        .select()
        .maybeSingle();

      if (error) return { error: error.message };
      setProfile((data as ProfileRow | null) ?? null);
      return { error: null };
    },
    [userId],
  );

  const value = useMemo<AuthValue>(() => {
    const role = profile?.role ?? null;
    const isApprovedMember =
      role === 'admin' ||
      ((role === 'student' || role === 'sponsor') && profile?.status === 'approved');

    return {
      status,
      session,
      profile,
      role,
      isApprovedMember: Boolean(isApprovedMember),
      signIn,
      signUp,
      signOut,
      saveProfile,
      refreshProfile,
    };
  }, [status, session, profile, signIn, signUp, signOut, saveProfile, refreshProfile]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
