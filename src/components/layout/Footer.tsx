interface FooterProps {
  contactEmail: string;
}

export function Footer({ contactEmail }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-100 bg-white">
      <div className="mx-auto flex max-w-[1120px] flex-col gap-2 px-6 py-8 text-sm text-ink-500 md:flex-row md:items-center md:justify-between md:px-12">
        <p>© {year} Yale Impact Exposition. All rights reserved.</p>
        <a
          href={`mailto:${contactEmail}`}
          className="rounded-[var(--radius-control)] font-semibold text-blue-500 hover:text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        >
          {contactEmail}
        </a>
      </div>
    </footer>
  );
}
