import { createContext } from 'react';
import type { Session } from '@supabase/supabase-js';
import type { ProfileEdit, ProfileRow, UserRole } from '../types/db';

export type AuthStatus = 'loading' | 'signedOut' | 'signedIn';

export interface SignUpFields {
  fullName: string;
  school: string;
  program: string;
  gradYear: string;
}

export interface AuthValue {
  status: AuthStatus;
  session: Session | null;
  profile: ProfileRow | null;
  role: UserRole | null;
  // True for an admin, or for an approved student or sponsor. This mirrors
  // app.is_approved_member in the database, but it controls the interface
  // only. Row Level Security is the real boundary.
  isApprovedMember: boolean;
  signIn(email: string, password: string): Promise<{ error: string | null }>;
  signUp(
    email: string,
    password: string,
    fields: SignUpFields,
  ): Promise<{ error: string | null }>;
  signOut(): Promise<void>;
  saveProfile(edit: ProfileEdit): Promise<{ error: string | null }>;
  refreshProfile(): Promise<void>;
}

export const AuthContext = createContext<AuthValue | null>(null);
