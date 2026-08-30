import type { Sponsor } from '../types/content';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';

interface SponsorCardProps {
  sponsor: Sponsor;
}

const tierLabel: Record<Sponsor['tier'], string> = {
  lead: 'Lead sponsor',
  partner: 'Partner',
  supporting: 'Supporting sponsor',
};

export function SponsorCard({ sponsor }: SponsorCardProps) {
  return (
    <Card className="flex h-full flex-col gap-4">
      <img
        src={sponsor.logoUrl}
        alt={sponsor.name}
        width={64}
        height={64}
        className="rounded-[var(--radius-control)]"
      />
      <div>
        <h3 className="text-lg font-semibold text-ink-900">{sponsor.name}</h3>
        <Badge className="mt-2">{tierLabel[sponsor.tier]}</Badge>
      </div>
      {sponsor.blurb ? <p className="text-base leading-[1.7] text-ink-700">{sponsor.blurb}</p> : null}
      {sponsor.websiteUrl ? (
        <a
          href={sponsor.websiteUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-auto text-sm font-semibold text-blue-500 hover:text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        >
          Visit website
        </a>
      ) : null}
    </Card>
  );
}
