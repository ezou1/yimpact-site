import { Link, useParams } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Reveal } from '../components/ui/Reveal';
import { formatPostDate, PostCard } from '../components/PostList';
import { getPost, postsByDate } from '../content/blog';
import { NotFound } from './NotFound';

export function BlogPostPage() {
  const { slug } = useParams();
  const post = slug ? getPost(slug) : undefined;

  if (!post) {
    return <NotFound />;
  }

  const more = postsByDate.filter((other) => other.slug !== post.slug).slice(0, 3);

  return (
    <Layout pattern="story" title={`${post.title} · Yale Impact Expo`} description={post.excerpt}>
      <article className="mx-auto max-w-[1200px] px-4 py-6 sm:px-6 md:px-10 md:py-10">
        <div className="haze px-5 py-8 sm:px-7 md:px-10 md:py-12">
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

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-1 border-y border-bar/25 py-3">
            <p className="label text-ink-900">{post.author}</p>
            <p className="label text-ink-400">{post.authorRole}</p>
            <p className="label ml-auto text-ink-400">{formatPostDate(post.publishedAt)}</p>
          </div>

          <div className="mt-8 max-w-[68ch] space-y-5 text-base leading-[1.7] text-ink-700">
            {post.body.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </Reveal>

        {more.length > 0 ? (
          <section className="mt-16 border-t border-bar/25 pt-8" aria-labelledby="more-heading">
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
        </div>
      </article>
    </Layout>
  );
}
