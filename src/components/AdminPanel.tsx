import type { AdminOfficer } from '../types/content';

interface AdminPanelProps {
  officers: AdminOfficer[];
}

// The standing officers of the organization, in a vertical panel down the left
// of the Team page. They sit above the Expo's own chain of responsibility.
export function AdminPanel({ officers }: AdminPanelProps) {
  return (
    <aside aria-labelledby="admin-panel-heading" className="lg:sticky lg:top-24 lg:self-start">
      <div className="border border-ink-100">
        <div className="border-b border-ink-100 bg-ink-50 px-4 py-3">
          <h2 id="admin-panel-heading" className="label text-ink-900">
            Administration
          </h2>
        </div>
        <ul>
          {officers.map((officer) => (
            <li key={officer.id} className="border-b border-ink-100 last:border-b-0">
              <div className="flex items-start gap-3 p-4">
                <img
                  src={officer.headshotUrl}
                  alt={officer.name}
                  width={44}
                  height={44}
                  className="h-11 w-11 shrink-0 bg-ink-50 object-cover"
                />
                <div className="min-w-0">
                  <p className="text-sm font-medium leading-[1.3] tracking-[-0.025em] text-ink-900">{officer.name}</p>
                  <p className="label mt-1 text-blue-500">{officer.role}</p>
                  {officer.affiliation ? <p className="mt-1 text-xs text-ink-400">{officer.affiliation}</p> : null}
                  {officer.email ? (
                    <a
                      href={`mailto:${officer.email}`}
                      className="mt-1.5 block truncate font-mono text-[11px] text-ink-400 transition-colors duration-300 ease-out hover:text-ink-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                    >
                      {officer.email}
                    </a>
                  ) : null}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-3 text-xs leading-[1.5] text-ink-400">
        Officers of the organization. They set the budget and hold the Expo accountable to the wider student body.
      </p>
    </aside>
  );
}
