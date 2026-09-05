import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

// A card is a hairline box. It gains no shadow and no corner on hover, only
// a darker rule.
export function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`border border-ink-100 bg-white p-5 transition-colors duration-300 ease-out hover:border-ink-300 ${className}`}
    >
      {children}
    </div>
  );
}
