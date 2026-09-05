import type { ReactNode } from 'react';

// The site has one animation and no spinner. A wait state is one mono line.
export function PendingLabel({ children = 'Loading' }: { children?: ReactNode }) {
  return (
    <p className="label text-ink-300" role="status">
      {children}
    </p>
  );
}

// No red. Section 3.5 of BUILD_SPEC.md permits one accent colour. The heavy
// left rule and the word carry the meaning without colour, which also keeps
// the contrast correct.
export function ErrorNote({
  title = 'Error',
  children,
  className = '',
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`border-l-2 border-ink-900 bg-ink-50 p-4 ${className}`} role="alert">
      <p className="label text-ink-900">{title}</p>
      <p className="mt-2 max-w-[62ch] text-sm leading-[1.6] text-ink-700">{children}</p>
    </div>
  );
}

// The same box, without the alert role. Use it for a saved state.
export function DoneNote({
  title = 'Saved',
  children,
  className = '',
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`border-l-2 border-blue-500 bg-blue-50 p-4 ${className}`} role="status">
      <p className="label text-blue-700">{title}</p>
      <p className="mt-2 max-w-[62ch] text-sm leading-[1.6] text-ink-700">{children}</p>
    </div>
  );
}

export function EmptyNote({ children }: { children: ReactNode }) {
  return <p className="text-sm text-ink-500">{children}</p>;
}
