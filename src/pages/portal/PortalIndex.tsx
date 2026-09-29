import { Navigate } from 'react-router-dom';
import { PortalWait } from '../../auth/RequireAuth';
import { useAuth } from '../../auth/useAuth';

// The role decides the destination, not the card the reader clicks.
export function PortalIndex() {
  const { profile, role } = useAuth();

  if (!profile) {
    return <PortalWait />;
  }

  if (role === 'admin') return <Navigate to="/portal/admin" replace />;
  if (role === 'announcements') return <Navigate to="/portal/admin/announcements" replace />;
  if (role === 'sponsor') return <Navigate to="/portal/sponsor" replace />;
  return <Navigate to="/portal/profile" replace />;
}
