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
      className={`inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700 ${className}`}
    >
      {children}
    </span>
  );
}
