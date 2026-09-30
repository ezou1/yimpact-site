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
      className={`haze-inner border border-bar/25 bg-white/70 p-5 transition-colors duration-300 ease-out hover:border-bar/45 ${className}`}
    >
      {children}
    </div>
  );
}
