import { Link, useParams } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Reveal } from '../components/ui/Reveal';
import { formatPostDate, PostCard } from '../components/PostList';
import { ErrorNote, PendingLabel } from '../components/ui/Status';
import { usePost, usePosts } from '../hooks/usePosts';
import { NotFound } from './NotFound';

export function BlogPostPage() {
  const { slug } = useParams();
  const { post, status } = usePost(slug);
  const { posts } = usePosts();

  // Wait for the answer. The post is always missing on the first paint, so an
  // early return here shows the error 404 page for every story.
  if (status === 'loading') {
    return (
      <Layout title="Yale Impact Expo" description="A story from the Yale Impact Expo.">
        <div className="mx-auto max-w-[1200px] px-6 py-10 md:px-10 md:py-12">
          <PendingLabel>Loading the story</PendingLabel>
          <div aria-hidden="true" className="mt-6">
            <div className="h-8 w-full max-w-[26ch] bg-ink-50" />
            <div className="mt-3 h-8 w-full max-w-[20ch] bg-ink-50" />
            <div className="mt-6 h-3 w-full max-w-[62ch] bg-ink-50" />
            <div className="mt-2 h-3 w-full max-w-[54ch] bg-ink-50" />
          </div>
        </div>
      </Layout>
    );
  }

  if (status === 'error') {
    return (
      <Layout title="Yale Impact Expo" description="A story from the Yale Impact Expo.">
        <div className="mx-auto max-w-[1200px] px-6 py-10 md:px-10 md:py-12">
          <ErrorNote>The story did not load. Reload the page.</ErrorNote>
        </div>
      </Layout>
    );
  }

  if (!post) {
    return <NotFound />;
  }

  const more = posts.filter((other) => other.slug !== post.slug).slice(0, 3);

  return (
    <Layout title={`${post.title} · Yale Impact Expo`} description={post.excerpt} image={post.coverUrl}>
      <article className="mx-auto max-w-[1200px] px-6 py-10 md:px-10 md:py-12">
        <Reveal>
          <p className="label text-ink-400">
            <Link
              to="/blog"
              className="transition-colors duration-300 ease-out hover:text-ink-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
            >
              ← Blog
            </Link>
            <span className="px-2 text-ink-300">/</span>
            <span className="text-blue-500">{post.category}</span>
          </p>

          <h1 className="display-2 mt-5 max-w-[26ch]">{post.title}</h1>
          <p className="mt-5 max-w-[62ch] text-lg leading-[1.5] tracking-[-0.02em] text-ink-700">{post.excerpt}</p>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-1 border-y border-ink-100 py-3">
            <p className="label text-ink-900">{post.author}</p>
            {post.authorRole ? <p className="label text-ink-400">{post.authorRole}</p> : null}
            <p className="label ml-auto text-ink-400">{formatPostDate(post.publishedAt)}</p>
          </div>

          {post.coverUrl ? (
            <img
              src={post.coverUrl}
              alt={post.coverAlt ?? ''}
              width={960}
              height={640}
              className="mt-8 aspect-[3/2] w-full bg-ink-50 object-cover"
            />
          ) : null}

          <div className="mt-8 max-w-[68ch] space-y-5 text-base leading-[1.7] text-ink-700">
            {post.body.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </Reveal>

        {more.length > 0 ? (
          <section className="mt-16 border-t border-ink-100 pt-8" aria-labelledby="more-heading">
            <h2 id="more-heading" className="label text-ink-400">
              More from the Expo
            </h2>
            <ul className="mt-6 grid gap-x-8 gap-y-8 sm:grid-cols-3">
              {more.map((other) => (
                <li key={other.slug}>
                  <PostCard post={other} />
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </article>
    </Layout>
  );
}
