import type { ComponentPropsWithRef } from 'react';

const base =
  'w-full border bg-white px-3 py-2.5 text-base leading-[1.5] tracking-[-0.011em] text-ink-900 placeholder:text-ink-400 transition-colors duration-300 ease-out focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-blue-500';

// text-base is 16 pixels on purpose. Body text is 15 pixels, but a smaller
// input makes Safari on iOS zoom when the reader taps it.
export function controlClassNames(hasError = false): string {
  const border = hasError
    ? 'border-ink-900'
    : 'border-ink-300 hover:border-ink-500 focus:border-ink-900';
  return `${base} ${border}`;
}

// React 19 passes ref as a normal prop, so the spread below carries it.
type WithError<T> = T & { hasError?: boolean };

export function Input({
  hasError,
  className = '',
  ...rest
}: WithError<ComponentPropsWithRef<'input'>>) {
  return <input className={`${controlClassNames(hasError)} ${className}`} {...rest} />;
}

export function Textarea({
  hasError,
  className = '',
  ...rest
}: WithError<ComponentPropsWithRef<'textarea'>>) {
  return <textarea className={`${controlClassNames(hasError)} ${className}`} {...rest} />;
}

export function Select({
  hasError,
  className = '',
  ...rest
}: WithError<ComponentPropsWithRef<'select'>>) {
  return <select className={`${controlClassNames(hasError)} ${className}`} {...rest} />;
}
