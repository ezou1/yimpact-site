import type { AdminOfficer } from '../types/content';
import { MemberChip, MemberPanel } from './MemberTile';

interface AdminPanelProps {
  officers: AdminOfficer[];
  openId: string | null;
  onToggle: (id: string) => void;
}

// The standing officers of the organization, in a column down the left of the
// Team page. Their tiles are the same object, at the same size, as the Expo
// team's — only the column they sit in differs.
export function AdminPanel({ officers, openId, onToggle }: AdminPanelProps) {
  const openOfficer = officers.find((officer) => officer.id === openId);

  return (
    <aside aria-labelledby="admin-panel-heading">
      <div className="border-b border-bar/25 pb-3">
        <h2 id="admin-panel-heading" className="display-2">
          Admin
        </h2>
      </div>
      <p className="label mt-3 text-ink-400">Officers of the organization</p>

      <ul className="mt-8 flex flex-wrap justify-center gap-4 xl:justify-start">
        {officers.map((officer) => (
          <li key={officer.id}>
            <MemberChip
              member={officer}
              isOpen={openId === officer.id}
              onToggle={() => onToggle(officer.id)}
              panelId="member-panel-admin"
            />
          </li>
        ))}
      </ul>

      {openOfficer ? <MemberPanel member={openOfficer} id="member-panel-admin" compact /> : null}

      <p className="mt-4 max-w-[200px] text-xs leading-[1.55] text-ink-400">
        They hold the budget and the mandate, and decide what partner funding is allowed to buy.
      </p>
    </aside>
  );
}
