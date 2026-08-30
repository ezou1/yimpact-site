import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { event } from '../../content/event';

interface LayoutProps {
  title: string;
  description: string;
  children: ReactNode;
}

// Each page sets its own title and description. This keeps the two in sync
// with the page content, because Vite does not render pages on the server.
export function Layout({ title, description, children }: LayoutProps) {
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
    <div className="flex min-h-screen flex-col bg-white">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-6 focus:z-50 focus:rounded-[var(--radius-control)] focus:bg-blue-700 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Header />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer contactEmail={event.contactEmail} />
    </div>
  );
}
