import type { ReactNode } from 'react';

interface PanelProps {
  children: ReactNode;
  className?: string;
}

// A page-body panel: the same translucent, heavily rounded box the sections
// use, for pages that lay their own content out.
export function Panel({ children, className = '' }: PanelProps) {
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-2 sm:px-6 md:px-10 md:py-3">
      <div className={`haze px-5 py-8 sm:px-7 md:px-10 md:py-12 ${className}`}>{children}</div>
    </div>
  );
}
