import { Layout } from '../components/layout/Layout';
import { PageHeader } from '../components/ui/PageHeader';
import { Reveal } from '../components/ui/Reveal';
import { OrganizerCard } from '../components/OrganizerCard';
import { AdminPanel } from '../components/AdminPanel';
import { adminOfficers, organizers } from '../content/organizers';

export function Team() {
  const chair = organizers.filter((organizer) => organizer.rank === 'chair');
  const executive = organizers.filter((organizer) => organizer.rank === 'executive');
  const team = organizers.filter((organizer) => organizer.rank === 'team');

  return (
    <Layout
      title="Team · Yale Impact Expo"
      description="The students who run the Yale Impact Expo, and the officers of the organization behind it."
    >
      <PageHeader
        eyebrow={`${adminOfficers.length + organizers.length} students`}
        title="Team"
        meta="The Expo runs in three ranks under a chair, with the officers of the organization holding the budget and the mandate."
      />

      <div className="mx-auto max-w-[1200px] px-6 pb-20 md:px-10">
        <div className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-12">
          <AdminPanel officers={adminOfficers} />

          <div className="space-y-12">
            <Reveal>
              <TierHeading index="01" title="Chair" note="Sets direction and answers for the programme." />
              <ul className="mt-5 grid gap-4">
                {chair.map((organizer) => (
                  <li key={organizer.id}>
                    <OrganizerCard organizer={organizer} size="lg" />
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal>
              <TierHeading
                index="02"
                title="Executive council"
                note="Reports to the chair. Each director owns one half of the programme."
              />
              <ul className="mt-5 grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
                {executive.map((organizer) => (
                  <li key={organizer.id}>
                    <OrganizerCard organizer={organizer} />
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal>
              <TierHeading index="03" title="Leads" note="Reports to the council. Runs the day-to-day work." />
              <ul className="mt-5 grid grid-cols-[repeat(auto-fill,minmax(190px,1fr))] gap-4">
                {team.map((organizer) => (
                  <li key={organizer.id}>
                    <OrganizerCard organizer={organizer} size="sm" />
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </Layout>
  );
}

interface TierHeadingProps {
  index: string;
  title: string;
  note: string;
}

function TierHeading({ index, title, note }: TierHeadingProps) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-ink-100 pb-3">
      <h2 className="display-2">
        <span className="label mr-3 align-middle text-blue-500">{index}</span>
        {title}
      </h2>
      <p className="label text-ink-400">{note}</p>
    </div>
  );
}
