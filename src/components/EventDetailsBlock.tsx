import type { EventDetails } from '../types/content';

interface EventDetailsBlockProps {
  event: EventDetails;
}

export function EventDetailsBlock({ event }: EventDetailsBlockProps) {
  const rows = [
    { term: 'When', value: event.dateLabel },
    { term: 'Where', value: `${event.venueName} · ${event.venueAddress}` },
    { term: 'Who', value: 'Every Yale student, from every school and every year. Free to take part.' },
    { term: 'Partners', value: 'Nine domains, from corporate and government to philanthropy and healthcare.' },
  ];

  return (
    <div className="border-t border-bar/25">
      <dl>
        {rows.map((row) => (
          <div
            key={row.term}
            className="grid gap-0.5 border-b border-bar/25 py-3.5 sm:grid-cols-[120px_minmax(0,1fr)] sm:gap-8"
          >
            <dt className="label text-ink-400">{row.term}</dt>
            <dd className="text-base leading-[1.5] tracking-[-0.02em] text-ink-900">{row.value}</dd>
          </div>
        ))}
      </dl>
      {event.mapUrl ? (
        <a
          href={event.mapUrl}
          target="_blank"
          rel="noreferrer"
          className="label mt-5 inline-block text-blue-500 transition-colors duration-300 ease-out hover:text-ink-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
        >
          View the map →
        </a>
      ) : null}
    </div>
  );
}
