import { Link } from 'react-router-dom';
import type { BlogPost } from '../types/content';

const dateFormatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

export function formatPostDate(iso: string): string {
  return dateFormatter.format(new Date(iso));
}

// An upload has no known size, so the box holds a fixed ratio. Section 3.9 of
// BUILD_SPEC.md needs a width and a height on every image.
const coverWidth = 960;
const coverHeight = 640;

function Cover({ post, className = '' }: { post: BlogPost; className?: string }) {
  if (!post.coverUrl) return null;

  return (
    <img
      src={post.coverUrl}
      alt={post.coverAlt ?? ''}
      width={coverWidth}
      height={coverHeight}
      loading="lazy"
      className={`aspect-[3/2] w-full bg-ink-50 object-cover grayscale transition-[filter] duration-500 ease-out group-hover:grayscale-0 ${className}`}
    />
  );
}

// The byline strip that runs under every headline: category, date, author.
export function Byline({ post, className = '' }: { post: BlogPost; className?: string }) {
  return (
    <p className={`label flex flex-wrap items-center gap-x-2 text-ink-400 ${className}`}>
      <span className="text-blue-500">{post.category}</span>
      <span className="text-ink-300">·</span>
      <span>{formatPostDate(post.publishedAt)}</span>
      <span className="text-ink-300">·</span>
      <span>{post.author}</span>
    </p>
  );
}

// The lead story. One headline, set large, with the serif carrying the last
// clause the way a front page carries a lede.
export function LeadStory({ post }: { post: BlogPost }) {
  return (
    <article className="group border-b border-ink-100 pb-10">
      <Cover post={post} className="mb-6" />
      <p className="label text-blue-500">{post.kicker}</p>
      <h2 className="display-2 mt-3 max-w-[24ch]">
        <Link
          to={`/blog/${post.slug}`}
          className="transition-colors duration-300 ease-out hover:text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
        >
          {post.title}
        </Link>
      </h2>
      <p className="mt-4 max-w-[62ch] text-base leading-[1.6] text-ink-700">{post.excerpt}</p>
      <Byline post={post} className="mt-4" />
    </article>
  );
}

// A story in the ruled river below the lead.
export function PostCard({ post }: { post: BlogPost }) {
  return (
    <article className="group flex h-full flex-col border-t border-ink-100 pt-4">
      <Cover post={post} className="mb-4" />
      <p className="label text-ink-400">{post.kicker}</p>
      <h3 className="mt-2 text-lg font-medium leading-[1.2] tracking-[-0.032em] text-ink-900">
        <Link
          to={`/blog/${post.slug}`}
          className="transition-colors duration-300 ease-out hover:text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
        >
          {post.title}
        </Link>
      </h3>
      <p className="mt-2 text-sm leading-[1.55] text-ink-500">{post.excerpt}</p>
      <Byline post={post} className="mt-auto pt-4" />
    </article>
  );
}

// The dated rail down the right-hand side.
export function LatestRail({ posts }: { posts: BlogPost[] }) {
  return (
    <aside aria-labelledby="latest-heading" className="lg:sticky lg:top-24 lg:self-start">
      <h2 id="latest-heading" className="label border-b border-ink-100 pb-3 text-ink-900">
        Latest
      </h2>
      <ul>
        {posts.map((post) => (
          <li key={post.slug} className="border-b border-ink-100">
            <Link
              to={`/blog/${post.slug}`}
              className="group block py-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            >
              <p className="label text-ink-300">{formatPostDate(post.publishedAt)}</p>
              <p className="mt-1 text-sm leading-[1.35] tracking-[-0.025em] text-ink-700 transition-colors duration-300 ease-out group-hover:text-ink-900">
                {post.title}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

// Bars that hold the same geometry while the stories load. There is no pulse.
// Section 3.9 keeps every transition at 200 milliseconds or less, and this
// site carries one animation only.
export function PostListSkeleton() {
  return (
    <>
      <p className="sr-only" role="status">
        Loading stories
      </p>
      <div aria-hidden="true">
        <div className="border-b border-ink-100 pb-10">
          <div className="h-3 w-24 bg-ink-50" />
          <div className="mt-4 h-8 w-full max-w-[24ch] bg-ink-50" />
          <div className="mt-3 h-8 w-full max-w-[18ch] bg-ink-50" />
          <div className="mt-6 h-3 w-full max-w-[62ch] bg-ink-50" />
          <div className="mt-2 h-3 w-full max-w-[54ch] bg-ink-50" />
        </div>
        <ul className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2">
          {[0, 1, 2, 3].map((index) => (
            <li key={index} className="border-t border-ink-100 pt-4">
              <div className="h-3 w-20 bg-ink-50" />
              <div className="mt-3 h-5 w-full bg-ink-50" />
              <div className="mt-2 h-5 w-3/4 bg-ink-50" />
              <div className="mt-4 h-3 w-full bg-ink-50" />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
