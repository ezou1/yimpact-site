import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

interface PageHeaderProps {
  eyebrow: string;
  title: ReactNode;
  meta?: ReactNode;
}

// The top of every page below the home page: a mono label, a tight display
// line, and one line of detail. Deliberately shorter than the home hero.
export function PageHeader({ eyebrow, title, meta }: PageHeaderProps) {
  return (
    <div className="mx-auto max-w-[1200px] px-6 py-12 md:px-10 md:py-16">
      <Reveal>
        <p className="label text-ink-400">{eyebrow}</p>
        <h1 className="display-2 mt-4">{title}</h1>
        {meta ? <div className="mt-4 max-w-[62ch] text-base leading-[1.6] text-ink-500">{meta}</div> : null}
      </Reveal>
    </div>
  );
}
