import type { ReactNode } from 'react';

interface SectionProps {
  id?: string;
  eyebrow?: string;
  heading?: string;
  band?: boolean;
  children: ReactNode;
  className?: string;
}

export function Section({ id, eyebrow, heading, band = false, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`py-16 md:py-24 ${band ? 'bg-ink-50' : 'bg-white'} ${className}`}>
      <div className="mx-auto max-w-[1120px] px-6 md:px-12">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-blue-500">{eyebrow}</p>
        ) : null}
        {heading ? (
          <h2 className={`text-2xl font-semibold text-ink-900 md:text-[32px] ${eyebrow ? 'mt-2' : ''}`}>
            {heading}
          </h2>
        ) : null}
        <div className={heading || eyebrow ? 'mt-8' : ''}>{children}</div>
      </div>
    </section>
  );
}
