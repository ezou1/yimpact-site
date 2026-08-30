import type { EventDetails } from '../types/content';

interface EventDetailsBlockProps {
  event: EventDetails;
}

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});

const timeFormatter = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: '2-digit',
});

export function EventDetailsBlock({ event }: EventDetailsBlockProps) {
  const start = new Date(event.startsAt);
  const end = new Date(event.endsAt);

  return (
    <div className="rounded-[var(--radius-card)] border border-ink-100 p-8">
      <dl className="grid gap-6 sm:grid-cols-2">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-500">Date</dt>
          <dd className="mt-1 text-base text-ink-900">{dateFormatter.format(start)}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-500">Time</dt>
          <dd className="mt-1 text-base text-ink-900">
            {timeFormatter.format(start)}–{timeFormatter.format(end)}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-500">Venue</dt>
          <dd className="mt-1 text-base text-ink-900">{event.venueName}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-500">Address</dt>
          <dd className="mt-1 text-base text-ink-900">{event.venueAddress}</dd>
        </div>
      </dl>
      {event.mapUrl ? (
        <a
          href={event.mapUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-block text-sm font-semibold text-blue-500 hover:text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        >
          View the map
        </a>
      ) : null}
    </div>
  );
}
