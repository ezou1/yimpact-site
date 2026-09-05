import { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { Reveal } from '../components/ui/Reveal';
import { MemberChip, MemberPanel } from '../components/MemberTile';
import type { Member } from '../components/MemberTile';
import { AdminPanel } from '../components/AdminPanel';
import { adminOfficers, organizers } from '../content/organizers';

export function Team() {
  const [openId, setOpenId] = useState<string | null>(null);

  const chair = organizers.filter((organizer) => organizer.rank === 'chair');
  const executive = organizers.filter((organizer) => organizer.rank === 'executive');
  const leads = organizers.filter((organizer) => organizer.rank === 'team');

  // Every rank is one centred row, so the chair sits on the axis of symmetry
  // and the pyramid widens beneath him.
  const rows: { key: string; label: string; note: string; members: Member[] }[] = [
    { key: 'chair', label: 'Chair', note: 'Sets direction and answers for the programme', members: chair },
    {
      key: 'executive',
      label: 'Executive council',
      note: 'Reports to the chair. Each director owns one half of the programme',
      members: executive,
    },
    { key: 'leads', label: 'Leads', note: 'Reports to the council. Runs the day-to-day work', members: leads },
  ];

  function toggle(id: string) {
    setOpenId((current) => (current === id ? null : id));
  }

  return (
    <Layout
      pattern="team"
      title="Team · Yale Impact Expo"
      description="The students who run the Yale Impact Expo, and the officers of the organization behind it."
    >
      <div className="mx-auto max-w-[1200px] px-6 py-12 md:px-10 md:py-16">
        <Reveal>
          <h1 className="display-2">
            The Impact Expo <span className="accent-serif">Team</span>
          </h1>
        </Reveal>

        <div className="mt-10 grid gap-10 xl:grid-cols-[200px_minmax(0,1fr)] xl:gap-10">
          <AdminPanel officers={adminOfficers} openId={openId} onToggle={toggle} />

          <div>
            <div className="border-b border-ink-100 pb-3">
              <h2 className="display-2">Expo team</h2>
            </div>

            <div className="mt-8 space-y-8">
              {rows.map((row, rowIndex) => {
                const openMember = row.members.find((member) => member.id === openId);
                return (
                  <Reveal key={row.key}>
                    <section aria-labelledby={`rank-${row.key}`}>
                      <p id={`rank-${row.key}`} className="label text-center text-ink-400">
                        <span className="text-blue-500">{String(rowIndex + 1).padStart(2, '0')}</span>
                        <span className="px-2 text-ink-300">/</span>
                        {row.label}
                      </p>
                      <p className="mt-1.5 text-center text-xs text-ink-400">{row.note}</p>

                      <ul className="mt-4 flex flex-wrap justify-center gap-4">
                        {row.members.map((member) => (
                          <li key={member.id}>
                            <MemberChip
                              member={member}
                              isOpen={openId === member.id}
                              onToggle={() => toggle(member.id)}
                              panelId={`member-panel-${row.key}`}
                            />
                          </li>
                        ))}
                      </ul>

                      {openMember ? <MemberPanel member={openMember} id={`member-panel-${row.key}`} /> : null}
                    </section>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
