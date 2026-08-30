import type { Organizer } from '../types/content';
import { Card } from './ui/Card';

interface OrganizerCardProps {
  organizer: Organizer;
}

export function OrganizerCard({ organizer }: OrganizerCardProps) {
  return (
    <Card className="flex h-full flex-col items-center gap-3 text-center">
      <img src={organizer.headshotUrl} alt={organizer.name} width={96} height={96} className="rounded-full" />
      <div>
        <h3 className="text-lg font-semibold text-ink-900">{organizer.name}</h3>
        <p className="text-sm text-ink-500">{organizer.role}</p>
        {organizer.affiliation ? <p className="text-sm text-ink-500">{organizer.affiliation}</p> : null}
      </div>
      <p className="text-base leading-[1.7] text-ink-700">{organizer.bio}</p>
      {organizer.linkedinUrl ? (
        <a
          href={organizer.linkedinUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-auto text-sm font-semibold text-blue-500 hover:text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        >
          LinkedIn
        </a>
      ) : null}
    </Card>
  );
}
