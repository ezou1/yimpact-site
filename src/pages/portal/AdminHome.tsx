import { useState } from 'react';
import { Layout } from '../../components/layout/Layout';
import { PageHeader } from '../../components/ui/PageHeader';
import { PortalNav } from '../../components/portal/PortalNav';
import { Badge } from '../../components/ui/Badge';
import { EmptyNote, ErrorNote, PendingLabel } from '../../components/ui/Status';
import { useMembers } from '../../hooks/useMembers';
import type { MemberStatus } from '../../types/db';

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

const statusLabels: Record<MemberStatus, string> = {
  pending: 'Pending',
  approved: 'Approved',
  rejected: 'Rejected',
};

export function AdminHome() {
  const { members, status, decide } = useMembers();
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function handleDecide(userId: string, approve: boolean) {
    setBusyId(userId);
    const result = await decide(userId, approve);
    setBusyId(null);
    setError(result.error);
  }

  const students = members.filter((member) => member.role === 'student');
  const staff = members.filter((member) => member.role !== 'student');

  return (
    <Layout
      title="Approvals · Yale Impact Expo"
      description="Approve the students who registered for the Yale Impact Expo."
    >
      <PortalNav />
      <PageHeader
        eyebrow="Admin"
        title="Approvals"
        meta="Automatic approval is on for the demo. Turn it off with one statement against app_settings, and every new student then waits here."
      />

      <div className="mx-auto max-w-[1200px] px-6 pb-24 md:px-10">
        {error ? <ErrorNote className="mb-6">{error}</ErrorNote> : null}
        {status === 'loading' ? <PendingLabel /> : null}
        {status === 'error' ? <ErrorNote>The member list did not load.</ErrorNote> : null}

        {status === 'ready' ? (
          <>
            <section aria-labelledby="students-heading">
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-ink-100 pb-3">
                <h2 id="students-heading" className="display-2">
                  Students
                </h2>
                <p className="label text-ink-400">{students.length} registered</p>
              </div>

              {students.length === 0 ? (
                <p className="mt-6">
                  <EmptyNote>Nobody has registered yet.</EmptyNote>
                </p>
              ) : (
                <ul className="mt-2 border-t border-ink-100">
                  {students.map((member) => (
                    <li
                      key={member.id}
                      className="grid gap-2 border-b border-ink-100 py-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-6"
                    >
                      <div className="min-w-0">
                        <p className="text-base leading-[1.35] tracking-[-0.025em] text-ink-900">
                          {member.full_name || member.email}
                        </p>
                        <p className="mt-1 font-mono text-xs text-ink-400">{member.email}</p>
                        <p className="mt-1 text-xs leading-[1.5] text-ink-500">
                          {[member.school, member.program, member.grad_year]
                            .filter(Boolean)
                            .join(' · ') || 'No school details yet'}
                        </p>
                        <p className="label mt-1 text-ink-300">
                          Registered {dateFormatter.format(new Date(member.created_at))}
                        </p>
                      </div>

                      <div className="flex shrink-0 flex-wrap items-center gap-3">
                        <Badge>{statusLabels[member.status]}</Badge>
                        {member.status !== 'approved' ? (
                          <DecideButton
                            onClick={() => handleDecide(member.id, true)}
                            isBusy={busyId === member.id}
                          >
                            Approve
                          </DecideButton>
                        ) : null}
                        {member.status !== 'rejected' ? (
                          <DecideButton
                            onClick={() => handleDecide(member.id, false)}
                            isBusy={busyId === member.id}
                          >
                            Reject
                          </DecideButton>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section aria-labelledby="staff-heading" className="mt-16">
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-ink-100 pb-3">
                <h2 id="staff-heading" className="display-2">
                  Partners and staff
                </h2>
                <p className="label text-ink-400">{staff.length} accounts</p>
              </div>
              <ul className="mt-2 border-t border-ink-100">
                {staff.map((member) => (
                  <li
                    key={member.id}
                    className="grid gap-1 border-b border-ink-100 py-3.5 sm:grid-cols-[200px_minmax(0,1fr)_auto] sm:gap-6"
                  >
                    <span className="text-sm leading-[1.4] text-ink-900">
                      {member.full_name || member.email}
                    </span>
                    <span className="font-mono text-xs text-ink-400">{member.email}</span>
                    <span className="label text-blue-500">{member.role}</span>
                  </li>
                ))}
              </ul>
            </section>
          </>
        ) : null}
      </div>
    </Layout>
  );
}

function DecideButton({
  onClick,
  isBusy,
  children,
}: {
  onClick: () => void;
  isBusy: boolean;
  children: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isBusy}
      className="label border border-ink-300 px-3 py-2 text-ink-900 transition-colors duration-300 ease-out hover:border-ink-900 hover:bg-ink-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 disabled:cursor-not-allowed disabled:border-ink-100 disabled:text-ink-400"
    >
      {isBusy ? 'Working' : children}
    </button>
  );
}
