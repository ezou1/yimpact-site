export interface Member {
  id: string;
  name: string;
  role: string;
  affiliation?: string;
  headshotUrl: string;
  bio: string;
  email: string;
}

// Every tile on the Team page is 200px wide, officers and Expo team alike.
interface MemberChipProps {
  member: Member;
  isOpen: boolean;
  onToggle: () => void;
  panelId: string;
}

// The pyramid tile. Headshot, name, title — nothing else until it is opened.
export function MemberChip({ member, isOpen, onToggle, panelId }: MemberChipProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-controls={panelId}
      className={`group flex w-[200px] flex-col border text-left transition-colors duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 ${
        isOpen ? 'border-ink-900' : 'border-ink-100 hover:border-ink-300'
      }`}
    >
      <img
        src={member.headshotUrl}
        alt=""
        aria-hidden="true"
        width={200}
        height={128}
        className={`h-[128px] w-full shrink-0 bg-ink-50 object-cover transition-[filter] duration-500 ease-out ${
          isOpen ? 'grayscale-0' : 'grayscale group-hover:grayscale-0'
        }`}
      />
      <span className="block border-t border-ink-100 px-3 py-3">
        <span className="block truncate text-sm font-medium leading-[1.25] tracking-[-0.03em] text-ink-900">
          {member.name}
        </span>
        <span className="label mt-1.5 block truncate text-blue-500">{member.role}</span>
      </span>
    </button>
  );
}

interface MemberPanelProps {
  member: Member;
  id: string;
  compact?: boolean; // True inside the narrow admin column.
}

// The detail that a tile opens, rendered beneath the row so that the pyramid
// stays symmetric no matter which tile is selected.
export function MemberPanel({ member, id, compact = false }: MemberPanelProps) {
  return (
    <div id={id} className="mt-4 border border-ink-900 bg-white">
      <div className={`flex flex-col gap-4 p-5 ${compact ? '' : 'sm:flex-row sm:items-start'}`}>
        <img
          src={member.headshotUrl}
          alt={member.name}
          width={96}
          height={96}
          className="h-24 w-24 shrink-0 bg-ink-50 object-cover"
        />
        <div className="min-w-0 flex-1">
          <h3 className="display-3">{member.name}</h3>
          <p className="label mt-1.5 text-blue-500">{member.role}</p>
          {member.affiliation ? <p className="mt-1 text-xs text-ink-400">{member.affiliation}</p> : null}
          <p className="mt-3 max-w-[68ch] text-sm leading-[1.65] text-ink-700">{member.bio}</p>
          <a
            href={`mailto:${member.email}`}
            className="label mt-4 inline-flex items-center border border-ink-300 px-4 py-2.5 text-ink-900 transition-colors duration-300 ease-out hover:border-ink-900 hover:bg-ink-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          >
            Contact me
          </a>
        </div>
      </div>
    </div>
  );
}
