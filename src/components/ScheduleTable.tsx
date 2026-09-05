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
      <table className="w-full min-w-[640px] border-collapse text-left">
        <caption className="sr-only">The Saturday agenda for the Yale Impact Expo</caption>
        <thead>
          <tr className="border-y border-ink-100">
            <th scope="col" className="label py-3 pr-6 font-medium text-ink-400">
              Time
            </th>
            <th scope="col" className="label py-3 pr-6 font-medium text-ink-400">
              Session
            </th>
            <th scope="col" className="label py-3 pr-6 font-medium text-ink-400">
              Track
            </th>
            <th scope="col" className="label py-3 font-medium text-ink-400">
              Location
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedItems.map((item) => (
            <tr
              key={item.id}
              className="border-b border-ink-100 align-top transition-colors duration-300 ease-out hover:bg-ink-50"
            >
              <td className="whitespace-nowrap py-4 pr-6 font-mono text-xs tracking-[0.02em] text-ink-500">
                {formatTime(item.startsAt)}–{formatTime(item.endsAt)}
              </td>
              <td className="py-4 pr-6">
                <p className="text-base font-medium leading-[1.25] tracking-[-0.028em] text-ink-900">{item.title}</p>
                {item.description ? (
                  <p className="mt-1.5 max-w-[62ch] text-sm leading-[1.65] text-ink-500">{item.description}</p>
                ) : null}
              </td>
              <td className="label py-4 pr-6 text-ink-500">{item.track ?? '—'}</td>
              <td className="label py-4 text-ink-500">{item.location ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
