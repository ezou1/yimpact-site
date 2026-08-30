import type { ScheduleItem } from '../types/content';

interface ScheduleTableProps {
  items: ScheduleItem[];
}

const timeFormatter = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: '2-digit',
});

function formatTime(iso: string): string {
  return timeFormatter.format(new Date(iso));
}

export function ScheduleTable({ items }: ScheduleTableProps) {
  const sortedItems = [...items].sort((a, b) => a.startsAt.localeCompare(b.startsAt));

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[560px] border-collapse text-left">
        <caption className="sr-only">The full agenda for the Yale Impact Exposition</caption>
        <thead>
          <tr className="border-b border-ink-100 text-sm text-ink-500">
            <th scope="col" className="py-3 pr-4 font-semibold">
              Time
            </th>
            <th scope="col" className="py-3 pr-4 font-semibold">
              Session
            </th>
            <th scope="col" className="py-3 pr-4 font-semibold">
              Track
            </th>
            <th scope="col" className="py-3 font-semibold">
              Location
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedItems.map((item) => (
            <tr key={item.id} className="border-b border-ink-100 align-top">
              <td className="whitespace-nowrap py-4 pr-4 text-sm text-ink-700">
                {formatTime(item.startsAt)}–{formatTime(item.endsAt)}
              </td>
              <td className="py-4 pr-4">
                <p className="text-base font-semibold text-ink-900">{item.title}</p>
                {item.description ? (
                  <p className="mt-1 text-sm leading-[1.7] text-ink-500">{item.description}</p>
                ) : null}
              </td>
              <td className="py-4 pr-4 text-sm text-ink-700">{item.track ?? '—'}</td>
              <td className="py-4 text-sm text-ink-700">{item.location ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
