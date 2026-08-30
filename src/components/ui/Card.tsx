import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`rounded-[var(--radius-card)] border border-ink-100 bg-white p-6 transition-shadow duration-200 hover:shadow-[0_1px_3px_rgb(0_0_0_/_0.06)] ${className}`}
    >
      {children}
    </div>
  );
}
