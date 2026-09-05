import type { Sponsor } from '../types/content';

interface SponsorCardProps {
  sponsor: Sponsor;
}

const tierLabel: Record<Sponsor['tier'], string> = {
  lead: 'Lead',
  partner: 'Partner',
  supporting: 'Supporting',
};

export function SponsorCard({ sponsor }: SponsorCardProps) {
  return (
    <div className="group flex h-full flex-col border border-ink-100 transition-colors duration-300 ease-out hover:border-ink-300">
      <div className="flex items-center justify-between gap-3 border-b border-ink-100 p-4">
        <img
          src={sponsor.logoUrl}
          alt={sponsor.name}
          width={40}
          height={40}
          className="grayscale transition-[filter] duration-500 ease-out group-hover:grayscale-0"
        />
        <span className="label text-ink-400">{tierLabel[sponsor.tier]}</span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-base font-medium leading-[1.25] tracking-[-0.028em] text-ink-900">{sponsor.name}</h3>
        {sponsor.blurb ? <p className="text-sm leading-[1.55] text-ink-500">{sponsor.blurb}</p> : null}
        {sponsor.websiteUrl ? (
          <a
            href={sponsor.websiteUrl}
            target="_blank"
            rel="noreferrer"
            className="label mt-auto pt-2 text-ink-400 transition-colors duration-300 ease-out hover:text-ink-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
          >
            Website →
          </a>
        ) : null}
      </div>
    </div>
  );
}
