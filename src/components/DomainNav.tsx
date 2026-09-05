import type { Domain } from '../types/content';
import { domainLabels, domainOrder } from '../content/sponsors';

export type DomainFilter = Domain | 'all';

interface DomainNavProps {
  active: DomainFilter;
  counts: Record<Domain, number>;
  onSelect: (next: DomainFilter) => void;
  total: number;
}

// The nine domains run in a single ruled strip across the top of the page.
// It scrolls sideways on a narrow screen rather than wrapping into a block.
export function DomainNav({ active, counts, onSelect, total }: DomainNavProps) {
  return (
    <div className="sticky top-[var(--header-h)] z-30 border-y border-ink-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <div
          role="group"
          aria-label="Filter partners by domain"
          className="flex overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <DomainTab label="All" count={total} active={active === 'all'} onClick={() => onSelect('all')} />
          {domainOrder.map((domain) => (
            <DomainTab
              key={domain}
              label={domainLabels[domain]}
              count={counts[domain]}
              active={active === domain}
              onClick={() => onSelect(domain)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface DomainTabProps {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}

function DomainTab({ label, count, active, onClick }: DomainTabProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`label flex shrink-0 items-center gap-2 border-b-2 px-4 py-3.5 transition-colors duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-500 ${
        active ? 'border-ink-900 text-ink-900' : 'border-transparent text-ink-400 hover:text-ink-900'
      }`}
    >
      {label}
      <span className={active ? 'text-blue-500' : 'text-ink-300'}>{count}</span>
    </button>
  );
}
