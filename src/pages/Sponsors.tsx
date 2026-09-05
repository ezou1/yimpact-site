import { useMemo, useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { PageHeader } from '../components/ui/PageHeader';
import { Reveal } from '../components/ui/Reveal';
import { SponsorCard } from '../components/SponsorCard';
import { DomainNav } from '../components/DomainNav';
import type { DomainFilter } from '../components/DomainNav';
import { domainLabels, domainOrder, domainSummaries, sponsors } from '../content/sponsors';
import { event } from '../content/event';
import { buttonClassNames } from '../components/ui/Button';
import type { Domain } from '../types/content';

const counts = domainOrder.reduce(
  (acc, domain) => {
    acc[domain] = sponsors.filter((sponsor) => sponsor.domain === domain).length;
    return acc;
  },
  {} as Record<Domain, number>,
);

export function Sponsors() {
  const [activeDomain, setActiveDomain] = useState<DomainFilter>('all');

  // A domain with no partners yet must not render an empty heading.
  const groups = useMemo(
    () =>
      domainOrder
        .filter((domain) => activeDomain === 'all' || domain === activeDomain)
        .map((domain) => ({ domain, items: sponsors.filter((sponsor) => sponsor.domain === domain) }))
        .filter((group) => group.items.length > 0),
    [activeDomain],
  );

  return (
    <Layout
      title="Partners · Yale Impact Expo"
      description="The partners of the Yale Impact Expo, across nine domains — corporate, government, law, tech, entrepreneurship, academia, philanthropy, sustainability, and healthcare."
    >
      <PageHeader
        eyebrow={`${sponsors.length} partners · 9 domains`}
        title="Partners"
        meta="Corporate partners fund the Expo. Academic, civic, and community partners make it credible. No partner owns a track, every partner may judge, and organizations that contribute expertise rather than money are never priced out of the room."
      />

      <DomainNav active={activeDomain} counts={counts} onSelect={setActiveDomain} total={sponsors.length} />

      <div className="mx-auto max-w-[1200px] px-6 pb-20 md:px-10">
        {groups.map((group, groupIndex) => (
          <section key={group.domain} aria-labelledby={`domain-${group.domain}`} className="pt-12">
            <Reveal>
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-ink-100 pb-3">
                <h2 id={`domain-${group.domain}`} className="display-2">
                  {domainLabels[group.domain]}
                </h2>
                <p className="label text-ink-400">
                  <span className="text-blue-500">{String(groupIndex + 1).padStart(2, '0')}</span>
                  <span className="px-2 text-ink-300">/</span>
                  {String(group.items.length).padStart(2, '0')} partners
                </p>
              </div>
              <p className="mt-4 max-w-[68ch] text-sm leading-[1.6] text-ink-500">
                {domainSummaries[group.domain]}
              </p>
              <ul className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
                {group.items.map((sponsor) => (
                  <li key={sponsor.id}>
                    <SponsorCard sponsor={sponsor} />
                  </li>
                ))}
              </ul>
            </Reveal>
          </section>
        ))}

        <div className="mt-16 border-t border-ink-100 pt-8">
          <h2 className="display-2 max-w-[20ch]">
            Your organization belongs on this <span className="accent-serif">page</span>
          </h2>
          <p className="mt-4 max-w-[62ch] text-base leading-[1.6] text-ink-700">
            Tell us which of the nine domains you sit in, and we will send the partner brief, the judging model, and
            the track placements still open for the coming Expo.
          </p>
          <a href={`mailto:${event.sponsorEmail}`} className={`${buttonClassNames('primary')} mt-6`}>
            {event.sponsorEmail}
          </a>
        </div>
      </div>
    </Layout>
  );
}
