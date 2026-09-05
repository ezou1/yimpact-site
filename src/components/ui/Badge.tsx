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
      className={`label inline-flex items-center border border-ink-100 px-2.5 py-1.5 text-ink-500 ${className}`}
    >
      {children}
    </span>
  );
}
