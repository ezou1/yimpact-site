import type { ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary';

const base =
  'inline-flex items-center justify-center rounded-[var(--radius-control)] px-5 py-3 text-base font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500';

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-blue-700 text-white hover:bg-blue-900',
  secondary: 'bg-white text-blue-700 border border-blue-700 hover:bg-blue-50',
};

const disabledClasses = 'bg-ink-100 text-ink-500 cursor-not-allowed';

// Use this to style a Link the same way as a Button. See Home.tsx.
export function buttonClassNames(variant: ButtonVariant = 'primary', isDisabled = false): string {
  return isDisabled ? `${base} ${disabledClasses}` : `${base} ${variantClasses[variant]}`;
}

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'> {
  variant?: ButtonVariant;
  isDisabled?: boolean;
  children: ReactNode;
}

// A screen reader skips a native `disabled` control. This button stays in the
// tab order and uses `aria-disabled` instead, so a disabled state is still
// announced. See BUILD_SPEC.md, Section 3.8.
export function Button({
  variant = 'primary',
  isDisabled = false,
  className = '',
  onClick,
  children,
  ...rest
}: ButtonProps) {
  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    if (isDisabled) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  }

  return (
    <button
      type="button"
      className={`${buttonClassNames(variant, isDisabled)} ${className}`}
      aria-disabled={isDisabled || undefined}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </button>
  );
}
