import { Layout } from '../components/layout/Layout';
import { OrganizerCard } from '../components/OrganizerCard';
import { organizers } from '../content/organizers';

export function Team() {
  return (
    <Layout
      title="Team · Yale Impact Exposition"
      description="Meet the student organizers of the Yale Impact Exposition."
    >
      <div className="mx-auto max-w-[1120px] px-6 py-16 md:px-12 md:py-24">
        <h1 className="text-[32px] font-semibold text-ink-900">Team</h1>
        <p className="mt-2 text-base text-ink-700">{organizers.length} students run the event.</p>
        <h2 className="mt-12 text-2xl font-semibold text-ink-900">All organizers</h2>
        <ul className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-6">
          {organizers.map((organizer) => (
            <li key={organizer.id}>
              <OrganizerCard organizer={organizer} />
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}
