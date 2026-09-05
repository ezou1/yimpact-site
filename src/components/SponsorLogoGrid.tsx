import type { Sponsor } from '../types/content';

interface SponsorLogoGridProps {
  sponsors: Sponsor[];
}

// A ruled grid. Each logo sits in its own cell and the hairlines between the
// cells carry the structure.
export function SponsorLogoGrid({ sponsors }: SponsorLogoGridProps) {
  return (
    <ul className="haze-inner grid grid-cols-2 gap-px overflow-hidden border border-bar/25 bg-bar/25 sm:grid-cols-3 lg:grid-cols-5">
      {sponsors.map((sponsor) => {
        const logo = (
          <img
            src={sponsor.logoUrl}
            alt={sponsor.name}
            width={48}
            height={48}
            className="grayscale transition-[filter] duration-500 ease-out group-hover:grayscale-0"
          />
        );
        return (
          <li key={sponsor.id} className="group flex aspect-[3/2] items-center justify-center bg-white p-4">
            {sponsor.websiteUrl ? (
              <a
                href={sponsor.websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="flex focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
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
