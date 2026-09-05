import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

interface SectionProps {
  id?: string;
  index?: string; // A two-digit figure, printed in the label column. Example: "01".
  eyebrow?: string;
  heading?: string;
  intro?: string;
  children: ReactNode;
  className?: string;
}

// Each section is a translucent panel floating over the page pattern. The
// label sits in its own column and holds while the body scrolls past.
export function Section({ id, index, eyebrow, heading, intro, children, className = '' }: SectionProps) {
  const hasLabelColumn = Boolean(index || eyebrow);

  return (
    <section id={id} className={className}>
      <div className="mx-auto max-w-[1200px] px-4 py-2 sm:px-6 md:px-10 md:py-3">
        <div className="haze px-5 py-8 sm:px-7 md:px-10 md:py-12">
          <div className="grid gap-6 md:grid-cols-[140px_minmax(0,1fr)] md:gap-12">
            <div className="md:sticky md:top-24 md:self-start">
              {hasLabelColumn ? (
                <p className="label text-ink-400">
                  {index ? <span className="text-blue-500">{index}</span> : null}
                  {index && eyebrow ? <span className="px-2 text-ink-300">/</span> : null}
                  {eyebrow}
                </p>
              ) : null}
            </div>

            <div>
              <Reveal>
                {heading ? <h2 className="display-2">{heading}</h2> : null}
                {intro ? <p className="mt-4 max-w-[62ch] text-base leading-[1.6] text-ink-700">{intro}</p> : null}
                <div className={heading || intro ? 'mt-8' : ''}>{children}</div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
