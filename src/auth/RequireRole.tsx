import { Navigate, Outlet } from 'react-router-dom';
import type { UserRole } from '../types/db';
import { PortalWait } from './RequireAuth';
import { useAuth } from './useAuth';

// Put this inside RequireAuth. It waits for the profile row, because the role
// comes from that row and not from the token.
export function RequireRole({ roles }: { roles: UserRole[] }) {
  const { profile, role } = useAuth();

  if (!profile) {
    return <PortalWait />;
  }

  if (!role || !roles.includes(role)) {
    return <Navigate to="/portal" replace />;
  }

  return <Outlet />;
}
