import type { Organizer } from '../types/content';

interface OrganizerCardProps {
  organizer: Organizer;
  size?: 'lg' | 'md' | 'sm';
}

const portraitClass: Record<'lg' | 'md' | 'sm', string> = {
  lg: 'w-40 shrink-0',
  md: 'w-full',
  sm: 'w-full',
};

// Headshots are square and sit flush inside a hairline box. Colour arrives on
// hover, slowly. The chair gets the wide treatment; everyone else stacks.
export function OrganizerCard({ organizer, size = 'md' }: OrganizerCardProps) {
  const isWide = size === 'lg';

  return (
    <div
      className={`group flex h-full border border-ink-100 transition-colors duration-300 ease-out hover:border-ink-300 ${
        isWide ? 'flex-col sm:flex-row' : 'flex-col'
      }`}
    >
      <img
        src={organizer.headshotUrl}
        alt={organizer.name}
        width={320}
        height={320}
        className={`aspect-square bg-ink-50 object-cover grayscale transition-[filter] duration-500 ease-out group-hover:grayscale-0 ${portraitClass[size]}`}
      />
      <div
        className={`flex flex-1 flex-col gap-2 p-4 ${
          isWide ? 'border-t border-ink-100 sm:border-l sm:border-t-0' : 'border-t border-ink-100'
        }`}
      >
        <div>
          <h3 className="text-base font-medium leading-[1.25] tracking-[-0.028em] text-ink-900">{organizer.name}</h3>
          <p className="label mt-1.5 text-blue-500">{organizer.role}</p>
          {organizer.affiliation ? <p className="mt-1 text-xs text-ink-400">{organizer.affiliation}</p> : null}
        </div>
        <p className={`leading-[1.55] text-ink-500 ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>{organizer.bio}</p>
        {organizer.linkedinUrl ? (
          <a
            href={organizer.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="label mt-auto pt-1 text-ink-400 transition-colors duration-300 ease-out hover:text-ink-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
          >
            LinkedIn →
          </a>
        ) : null}
      </div>
    </div>
  );
}
