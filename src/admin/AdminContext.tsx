import { useAuth } from '../auth/useAuth';

// Organizer access. This used to be a passcode that shipped in the bundle and
// a session in localStorage. It is now the real account role, which comes from
// the profiles row and is enforced by Row Level Security in the database.
//
// The hook keeps its old name and shape so that the pages which call it do not
// change. AdminProvider is gone: AuthProvider in src/auth holds the session.
interface AdminValue {
  isAdmin: boolean;
}

export function useAdmin(): AdminValue {
  const { role } = useAuth();
  return { isAdmin: role === 'admin' };
}
