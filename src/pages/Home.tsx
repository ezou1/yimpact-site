import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { Section } from '../components/ui/Section';
import { buttonClassNames } from '../components/ui/Button';
import { EventDetailsBlock } from '../components/EventDetailsBlock';
import { SponsorLogoGrid } from '../components/SponsorLogoGrid';
import { OrganizerCard } from '../components/OrganizerCard';
import { event } from '../content/event';
import { sponsors } from '../content/sponsors';
import { organizers } from '../content/organizers';
import { faq } from '../content/faq';
import type { Sector } from '../types/content';

const sectorOrder: Sector[] = ['nonprofit', 'government', 'defense', 'ai-research', 'academia', 'industry'];

const sectorLabels: Record<Sector, string> = {
  nonprofit: 'Nonprofit',
  government: 'Government',
  defense: 'Defense',
  'ai-research': 'AI research',
  academia: 'Academia',
  industry: 'Industry',
};

const dateFormatter = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

export function Home() {
  const featuredSponsors = sponsors.filter((sponsor) => sponsor.featured);
  const featuredOrganizers = organizers.slice(0, 6);

  return (
    <Layout title="Yale Impact Exposition" description={event.tagline}>
      <div className="mx-auto max-w-[1120px] px-6 py-16 md:px-12 md:py-24">
        <h1 className="text-[32px] font-semibold text-ink-900 md:text-[48px]">{event.name}</h1>
        <p className="mt-4 max-w-[640px] text-lg leading-[1.7] text-ink-700">{event.tagline}</p>
        <p className="mt-2 text-base text-ink-500">
          {dateFormatter.format(new Date(event.startsAt))} · {event.venueName}
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link to="/sponsors" className={buttonClassNames('primary')}>
            View the sponsors
          </Link>
          <Link to="/login" className={buttonClassNames('secondary')}>
            Log in
          </Link>
        </div>
      </div>

      <Section heading="About the event">
        <div className="max-w-[720px] space-y-4 text-base leading-[1.7] text-ink-700">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
            ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
            laborum.
          </p>
        </div>
      </Section>

      <Section heading="Event details" band>
        <EventDetailsBlock event={event} />
      </Section>

      <Section heading="Who is in the room">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {sectorOrder.map((sector) => {
            const count = sponsors.filter((sponsor) => sponsor.sector === sector).length;
            return (
              <li key={sector} className="rounded-[var(--radius-card)] border border-ink-100 p-4 text-center">
                <p className="text-2xl font-semibold text-ink-900">{count}</p>
                <p className="mt-1 text-sm text-ink-500">{sectorLabels[sector]}</p>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section heading="Featured sponsors" band>
        <SponsorLogoGrid sponsors={featuredSponsors} />
        <p className="mt-8 text-center">
          <Link
            to="/sponsors"
            className="rounded-[var(--radius-control)] text-sm font-semibold text-blue-500 hover:text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          >
            See all {sponsors.length} sponsors
          </Link>
        </p>
      </Section>

      <Section heading="Organizers">
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-6">
          {featuredOrganizers.map((organizer) => (
            <li key={organizer.id}>
              <OrganizerCard organizer={organizer} />
            </li>
          ))}
        </ul>
        <p className="mt-8 text-center">
          <Link
            to="/team"
            className="rounded-[var(--radius-control)] text-sm font-semibold text-blue-500 hover:text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          >
            Meet the full team
          </Link>
        </p>
      </Section>

      <Section heading="Questions" band>
        <div className="divide-y divide-ink-100">
          {faq.map((item) => (
            <details key={item.id} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-[var(--radius-control)] font-semibold text-ink-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500">
                {item.question}
                <ChevronDown
                  className="h-5 w-5 flex-shrink-0 text-ink-500 transition-transform duration-200 group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="mt-3 text-base leading-[1.7] text-ink-700">{item.answer}</p>
            </details>
          ))}
        </div>
      </Section>

      <Section heading="Contact">
        <p className="text-base leading-[1.7] text-ink-700">
          Have a question before the event? Write to{' '}
          <a
            href={`mailto:${event.contactEmail}`}
            className="rounded-[var(--radius-control)] font-semibold text-blue-500 hover:text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          >
            {event.contactEmail}
          </a>
          .
        </p>
      </Section>
    </Layout>
  );
}
