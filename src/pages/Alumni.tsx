import { Layout } from '../components/layout/Layout';
import { Reveal } from '../components/ui/Reveal';
import { buttonClassNames } from '../components/ui/Button';
import { event } from '../content/event';
import { alumniCompanies, alumniDonors, alumniPresentedBy, yaleClubs } from '../content/alumni';
import type { AlumniEntry } from '../types/content';

const groups: { key: string; title: string; note: string; entries: AlumniEntry[] }[] = [
  {
    key: 'donors',
    title: 'Alumni donors',
    note: 'Graduates backing the students doing this work now',
    entries: alumniDonors,
  },
  {
    key: 'companies',
    title: 'Companies',
    note: 'Organizations founded or led by Yale alumni',
    entries: alumniCompanies,
  },
  {
    key: 'clubs',
    title: 'Yale clubs',
    note: 'Regional clubs and alumni associations',
    entries: yaleClubs,
  },
];

export function Alumni() {
  return (
    <Layout
      pattern="alumni"
      title="Alumni · Yale Impact Expo"
      description="The alumni donors, alumni-led companies, and Yale clubs whose contributions support the Yale Impact Expo."
    >
      <div className="mx-auto max-w-[1200px] px-4 py-2 sm:px-6 md:px-10 md:py-3">
        <header className="haze px-5 py-8 sm:px-7 md:px-10 md:py-12">
          <Reveal>
            <p className="label text-ink-400">Alumni</p>
            <h1 className="display-2 mt-4">
              Alumni <span className="accent-serif">Relationships</span>
            </h1>
            <p className="mt-4 flex flex-wrap items-baseline gap-x-3 text-lg tracking-[-0.02em] text-ink-700">
              <span>presented by</span>
              {alumniPresentedBy ? (
                <span className="font-medium text-ink-900">{alumniPresentedBy}</span>
              ) : (
                <>
                  {/* Held open until the presenting partner is confirmed. */}
                  <span aria-hidden="true" className="inline-block w-48 border-b-2 border-bar/45">
                    &nbsp;
                  </span>
                  <span className="sr-only">a presenting partner to be announced</span>
                </>
              )}
            </p>
            <p className="mt-5 max-w-[62ch] text-base leading-[1.6] text-ink-500">
              Generations of Yale graduates, the companies they have built, and the clubs that keep them connected.
              Their contributions fund continuation grants and mentorship, and carry student work out into the
              communities it was built to serve.
            </p>
          </Reveal>
        </header>
      </div>

      <div className="mx-auto max-w-[1200px] px-4 pb-8 sm:px-6 md:px-10">
        <div className="haze px-5 py-8 sm:px-7 md:px-10 md:py-12">
          <div className="grid gap-10 lg:grid-cols-3 lg:gap-8">
            {groups.map((group) => (
              <Reveal key={group.key}>
                <section aria-labelledby={`alumni-${group.key}`}>
                  <div className="flex items-baseline justify-between gap-4 border-b border-bar/25 pb-3">
                    <h2 id={`alumni-${group.key}`} className="display-3">
                      {group.title}
                    </h2>
                    <span className="label text-blue-500">{String(group.entries.length).padStart(2, '0')}</span>
                  </div>
                  <p className="label mt-3 text-ink-400">{group.note}</p>
                  <ul className="mt-3">
                    {group.entries.map((entry) => (
                      <li key={entry.id} className="border-b border-bar/25 py-3">
                        <p className="text-base font-medium leading-[1.3] tracking-[-0.025em] text-ink-900">
                          {entry.name}
                        </p>
                        <p className="mt-1 text-xs text-ink-500">{entry.detail}</p>
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>
            ))}
          </div>

          <p className="label mt-8 text-ink-300">Listings are placeholders until contributions are confirmed.</p>

          <div className="mt-10 border-t border-bar/25 pt-8">
            <h2 className="display-2 max-w-[22ch]">
              Give back to the work happening <span className="accent-serif">now</span>
            </h2>
            <p className="mt-4 max-w-[62ch] text-base leading-[1.6] text-ink-700">
              Alumni, alumni-led companies, and Yale clubs can fund continuation grants, back a track, or mentor a
              team through the semester. Write to us and we will share how contributions are directed and
              recognised.
            </p>
            <a href={`mailto:${event.sponsorEmail}`} className={`${buttonClassNames('primary')} mt-6`}>
              {event.sponsorEmail}
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
