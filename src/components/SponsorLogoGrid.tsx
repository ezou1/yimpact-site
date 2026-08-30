import type { Sponsor, SponsorTier } from '../types/content';

interface SponsorLogoGridProps {
  sponsors: Sponsor[];
}

const sizeByTier: Record<SponsorTier, number> = {
  lead: 96,
  partner: 72,
  supporting: 56,
};

export function SponsorLogoGrid({ sponsors }: SponsorLogoGridProps) {
  return (
    <ul className="flex flex-wrap items-center justify-center gap-8">
      {sponsors.map((sponsor) => {
        const size = sizeByTier[sponsor.tier];
        const logo = (
          <img
            src={sponsor.logoUrl}
            alt={sponsor.name}
            width={size}
            height={size}
            className="rounded-[var(--radius-control)]"
          />
        );
        return (
          <li key={sponsor.id}>
            {sponsor.websiteUrl ? (
              <a
                href={sponsor.websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="block rounded-[var(--radius-control)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              >
                {logo}
              </a>
            ) : (
              logo
            )}
          </li>
        );
      })}
    </ul>
  );
}
