import { Navigate } from 'react-router-dom';
import { PortalWait } from '../../auth/RequireAuth';
import { NoProfileNote } from '../../auth/NoProfileNote';
import { useAuth } from '../../auth/useAuth';

// The role decides the destination, not the card the reader clicks.
export function PortalIndex() {
  const { profile, profileStatus, role } = useAuth();

  if (profileStatus === 'loading') return <PortalWait />;
  if (profileStatus === 'missing' || !profile) return <NoProfileNote />;

  if (role === 'admin') return <Navigate to="/portal/admin" replace />;
  if (role === 'announcements') return <Navigate to="/portal/admin/announcements" replace />;
  if (role === 'sponsor') return <Navigate to="/portal/sponsor" replace />;
  return <Navigate to="/portal/profile" replace />;
}
