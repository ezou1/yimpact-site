import { useMemo, useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { SponsorCard } from '../components/SponsorCard';
import { sponsors } from '../content/sponsors';
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

type SectorFilter = Sector | 'all';

export function Sponsors() {
  const [activeSector, setActiveSector] = useState<SectorFilter>('all');
  const showFilter = sponsors.length >= 12;

  const visibleSponsors = useMemo(
    () => (activeSector === 'all' ? sponsors : sponsors.filter((sponsor) => sponsor.sector === activeSector)),
    [activeSector],
  );

  // A sector with zero sponsors must not render, so this list drops empty groups.
  const groups = sectorOrder
    .map((sector) => ({
      sector,
      items: visibleSponsors.filter((sponsor) => sponsor.sector === sector),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <Layout
      title="Sponsors · Yale Impact Exposition"
      description="Meet the sponsors of the Yale Impact Exposition, grouped by sector."
    >
      <div className="mx-auto max-w-[1120px] px-6 py-16 md:px-12 md:py-24">
        <h1 className="text-[32px] font-semibold text-ink-900">Sponsors</h1>
        <p className="mt-2 text-base text-ink-700">{sponsors.length} organizations support the event.</p>

        {showFilter ? (
          <div role="group" aria-label="Filter sponsors by sector" className="mt-8 flex flex-wrap gap-2">
            <FilterButton label="All sectors" active={activeSector === 'all'} onClick={() => setActiveSector('all')} />
            {sectorOrder.map((sector) => (
              <FilterButton
                key={sector}
                label={sectorLabels[sector]}
                active={activeSector === sector}
                onClick={() => setActiveSector(sector)}
              />
            ))}
          </div>
        ) : null}

        <div className="mt-12 space-y-16">
          {groups.map((group) => (
            <section key={group.sector} aria-labelledby={`sector-${group.sector}`}>
              <h2 id={`sector-${group.sector}`} className="text-2xl font-semibold text-ink-900">
                {sectorLabels[group.sector]}
              </h2>
              <ul className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-6">
                {group.items.map((sponsor) => (
                  <li key={sponsor.id}>
                    <SponsorCard sponsor={sponsor} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </Layout>
  );
}

interface FilterButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

function FilterButton({ label, active, onClick }: FilterButtonProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 ${
        active ? 'border-blue-700 bg-blue-700 text-white' : 'border-ink-100 bg-white text-ink-700 hover:border-blue-500'
      }`}
    >
      {label}
    </button>
  );
}
