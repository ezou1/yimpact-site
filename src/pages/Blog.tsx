import { useMemo, useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { Reveal } from '../components/ui/Reveal';
import { LatestRail, LeadStory, PostCard, PostListSkeleton } from '../components/PostList';
import { ErrorNote } from '../components/ui/Status';
import { usePosts } from '../hooks/usePosts';
import type { BlogCategory } from '../types/content';

const categories: BlogCategory[] = ['Announcements', 'Campus', 'Partners', 'Research', 'New Haven', 'Opinion'];

type CategoryFilter = BlogCategory | 'all';

export function Blog() {
  const { posts, status, retry } = usePosts();
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');

  const visible = useMemo(
    () => (activeCategory === 'all' ? posts : posts.filter((post) => post.category === activeCategory)),
    [posts, activeCategory],
  );

  const lead = visible.find((post) => post.lead) ?? visible[0];
  const rest = visible.filter((post) => post !== lead);

  return (
    <Layout
      title="Blog · Yale Impact Expo"
      description="Reporting from the Yale Impact Expo: the programme, its partners, its research, and its work in New Haven."
    >
      {/* The masthead. A newspaper nameplate, straightened out. */}
      <div className="border-b border-ink-100">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-baseline justify-between gap-x-8 gap-y-2 px-6 py-8 md:px-10 md:py-10">
          <h1 className="display-2">
            The Expo <span className="accent-serif">Record</span>
          </h1>
          <p className="label text-ink-400">Reporting from the Yale Impact Expo</p>
        </div>
      </div>

      {/* The section rail. */}
      <div className="sticky top-[var(--header-h)] z-30 border-b border-ink-100 bg-white/90 backdrop-blur-md">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <div
            role="group"
            aria-label="Filter stories by section"
            className="flex overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <SectionTab label="All" active={activeCategory === 'all'} onClick={() => setActiveCategory('all')} />
            {categories.map((category) => (
              <SectionTab
                key={category}
                label={category}
                active={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] px-6 py-10 md:px-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-12">
          <div>
            {status === 'loading' ? <PostListSkeleton /> : null}

            {status === 'error' ? (
              <ErrorNote>
                The stories did not load.{' '}
                <button
                  type="button"
                  onClick={retry}
                  className="border-b border-ink-300 pb-0.5 text-ink-900 transition-colors duration-300 ease-out hover:border-ink-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
                >
                  Try again
                </button>
                .
              </ErrorNote>
            ) : null}

            {status === 'ready' ? (
              <>
                {lead ? (
                  <Reveal>
                    <LeadStory post={lead} />
                  </Reveal>
                ) : (
                  <p className="text-sm text-ink-500">No stories in this section yet.</p>
                )}

                {rest.length > 0 ? (
                  <Reveal>
                    <ul className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2">
                      {rest.map((post) => (
                        <li key={post.slug}>
                          <PostCard post={post} />
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                ) : null}
              </>
            ) : null}
          </div>

          <LatestRail posts={posts.slice(0, 6)} />
        </div>
      </div>
    </Layout>
  );
}

interface SectionTabProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

function SectionTab({ label, active, onClick }: SectionTabProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`label shrink-0 border-b-2 px-4 py-3 transition-colors duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-500 ${
        active ? 'border-ink-900 text-ink-900' : 'border-transparent text-ink-400 hover:text-ink-900'
      }`}
    >
      {label}
    </button>
  );
}
