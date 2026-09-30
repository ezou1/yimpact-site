import type { ReactNode } from 'react';

interface BadgeProps {
  id?: string;
  children: ReactNode;
  className?: string;
}

export function Badge({ id, children, className = '' }: BadgeProps) {
  return (
    <span
      id={id}
      className={`haze-inner label inline-flex items-center border border-bar/25 px-2.5 py-1.5 text-ink-500 ${className}`}
    >
      {children}
    </span>
  );
}
