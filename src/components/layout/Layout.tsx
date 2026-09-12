import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { event } from '../../content/event';

// Each page has its own motif. 'home' is the only one that fades out; 'none'
// is the partner field, where the brand colour lives in the bubble outlines.
export type PatternKind =
  | 'home'
  | 'students'
  | 'team'
  | 'schedule'
  | 'record'
  | 'story'
  | 'partner'
  | 'login'
  | 'notfound'
  | 'alumni'
  | 'none';

const patternClass: Record<Exclude<PatternKind, 'none'>, string> = {
  home: 'pattern-home',
  students: 'pattern-students',
  team: 'pattern-team',
  schedule: 'pattern-schedule',
  record: 'pattern-record',
  story: 'pattern-story',
  partner: 'pattern-partner',
  login: 'pattern-login',
  notfound: 'pattern-notfound',
  alumni: 'pattern-alumni',
};

interface LayoutProps {
  title: string;
  description: string;
  pattern: PatternKind;
  children: ReactNode;
}

// Each page sets its own title and description. This keeps the two in sync
// with the page content, because Vite does not render pages on the server.
export function Layout({ title, description, pattern, children }: LayoutProps) {
  useEffect(() => {
    document.title = title;

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', description);
  }, [title, description]);

  return (
    <div className="relative flex min-h-screen flex-col bg-white">
      {/* The motif is pinned to the viewport and fades toward the foot of the
          screen. It holds still while the panels slide over it. */}
      {pattern !== 'none' ? (
        <div
          aria-hidden="true"
          className={`${patternClass[pattern]} pattern-fade pointer-events-none fixed inset-0 z-0`}
        />
      ) : null}

      <a
        href="#main-content"
        className="label sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-6 focus:z-50 focus:bg-blue-700 focus:px-4 focus:py-3 focus:text-white"
      >
        Skip to content
      </a>
      <Header />
      <main id="main-content" className="relative z-10 flex-1">
        {children}
      </main>
      <Footer contactEmail={event.contactEmail} sponsorEmail={event.sponsorEmail} />
    </div>
  );
}
