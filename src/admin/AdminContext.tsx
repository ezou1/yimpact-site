import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

// IMPORTANT: this is a front-end convenience gate, not authentication. The
// passcode ships in the bundle and the session lives in this browser only.
// It exists so the team can demo the add-a-partner flow before there is a
// backend. Do not put anything private behind it. Replace both this file and
// the sponsor store with real server-side auth before launch.
const ADMIN_PASSCODE = 'impact-admin';
const STORAGE_KEY = 'yie.admin.session';

interface AdminContextValue {
  isAdmin: boolean;
  signIn: (passcode: string) => boolean;
  signOut: () => void;
}

const AdminContext = createContext<AdminContextValue | null>(null);

function readStoredSession(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);

  // Read after mount so that a blocked or empty localStorage cannot break the
  // first render.
  useEffect(() => {
    setIsAdmin(readStoredSession());
  }, []);

  const signIn = useCallback((passcode: string) => {
    if (passcode.trim() !== ADMIN_PASSCODE) {
      return false;
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // A browser with site data blocked still gets the session for this tab.
    }
    setIsAdmin(true);
    return true;
  }, []);

  const signOut = useCallback(() => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Nothing to clean up.
    }
    setIsAdmin(false);
  }, []);

  const value = useMemo(() => ({ isAdmin, signIn, signOut }), [isAdmin, signIn, signOut]);

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin(): AdminContextValue {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used inside an AdminProvider');
  }
  return context;
}
