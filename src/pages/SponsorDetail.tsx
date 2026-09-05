import { Link, useParams } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Reveal } from '../components/ui/Reveal';
import { PostCard } from '../components/PostList';
import { buttonClassNames } from '../components/ui/Button';
import { domainLabels } from '../content/sponsors';
import { postsByDate } from '../content/blog';
import { useSponsors } from '../admin/sponsorStore';
import { NotFound } from './NotFound';
import type { SponsorTier } from '../types/content';

const tierLabel: Record<SponsorTier, string> = {
  lead: 'Lead partner',
  partner: 'Partner',
  supporting: 'Supporting partner',
};

export function SponsorDetail() {
  const { sponsorId } = useParams();
  const { sponsors } = useSponsors();
  const sponsor = sponsors.find((entry) => entry.id === sponsorId);

  if (!sponsor) {
    return <NotFound />;
  }

  const stories = postsByDate.filter((post) => post.sponsorIds?.includes(sponsor.id));

  return (
    <Layout
      pattern="partner"
      title={`${sponsor.name} · Yale Impact Expo`}
      description={sponsor.blurb ?? `${sponsor.name} is a partner of the Yale Impact Expo.`}
    >
      <div className="mx-auto max-w-[1200px] px-4 py-6 sm:px-6 md:px-10 md:py-10">
        <div className="haze px-5 py-8 sm:px-7 md:px-10 md:py-12">
        <Reveal>
          <p className="label text-ink-400">
            <Link
              to="/sponsors"
              className="transition-colors duration-300 ease-out hover:text-ink-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
            >
              ← Partners
            </Link>
            <span className="px-2 text-ink-300">/</span>
            <span className="text-blue-500">{domainLabels[sponsor.domain]}</span>
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-6 border-b border-bar/25 pb-8">
            <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full border border-bar/25 bg-white">
              <img src={sponsor.logoUrl} alt={sponsor.name} className="h-1/2 w-1/2 object-contain" />
            </div>
            <div className="min-w-0">
              <p className="label text-ink-400">{tierLabel[sponsor.tier]}</p>
              <h1 className="display-2 mt-2">{sponsor.name}</h1>
            </div>
          </div>

          {sponsor.blurb ? (
            <p className="mt-8 max-w-[62ch] text-lg leading-[1.5] tracking-[-0.02em] text-ink-700">{sponsor.blurb}</p>
          ) : null}

          {sponsor.websiteUrl ? (
            <a
              href={sponsor.websiteUrl}
              target="_blank"
              rel="noreferrer"
              className={`${buttonClassNames('primary')} mt-8`}
            >
              Visit website →
            </a>
          ) : (
            <p className="mt-8 text-sm text-ink-400">No website on file for this partner yet.</p>
          )}
        </Reveal>

        <section className="mt-14 border-t border-bar/25 pt-8" aria-labelledby="sponsor-stories-heading">
          <h2 id="sponsor-stories-heading" className="display-2">
            From The Impact <span className="accent-serif">Record</span>
          </h2>
          <p className="mt-3 max-w-[62ch] text-sm leading-[1.6] text-ink-500">
            Stories in which this partner's work appears.
          </p>

          {stories.length > 0 ? (
            <ul className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {stories.map((post) => (
                <li key={post.slug}>
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="haze-inner mt-8 border border-bar/25 bg-ink-50/70 px-6 py-10 text-center">
              <p className="mx-auto max-w-[44ch] text-sm leading-[1.6] text-ink-500">
                Nothing published about this partner yet. Their first story appears here once the newsroom covers their
                work with a team.
              </p>
            </div>
          )}
        </section>
        </div>
      </div>
    </Layout>
  );
}
