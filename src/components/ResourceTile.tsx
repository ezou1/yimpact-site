import { useId, useState } from 'react';
import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Badge } from './ui/Badge';
import { buttonClassNames } from './ui/Button';
import { useAuth } from '../auth/useAuth';
import { sponsors } from '../content/sponsors';
import type { Resource, ResourceKind } from '../types/db';

const kindLabels: Record<ResourceKind, string> = {
  contact: 'Contact',
  office_hours: 'Office hours',
  promo_code: 'Promo code',
  tool_credit: 'Tool credit',
  link: 'Link',
  mentor: 'Mentor',
};

const logoBySlug = new Map(sponsors.map((sponsor) => [sponsor.id, sponsor.logoUrl]));

interface ResourceTileProps {
  resource: Resource;
  headingLevel: 2 | 3;
}

export function ResourceTile({ resource, headingLevel }: ResourceTileProps) {
  const { status, isApprovedMember } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();

  const Heading = headingLevel === 2 ? 'h2' : 'h3';
  const owner =
    resource.owner_kind === 'org' ? resource.org_name : resource.person_name;
  const logoUrl = resource.org_slug ? logoBySlug.get(resource.org_slug) : undefined;

  return (
    <div className="group flex h-full flex-col border border-ink-100 transition-colors duration-300 ease-out hover:border-ink-300">
      <div className="flex items-center justify-between gap-3 border-b border-ink-100 p-4">
        {logoUrl ? (
          <img
            src={logoUrl}
            alt=""
            width={32}
            height={32}
            className="grayscale transition-[filter] duration-500 ease-out group-hover:grayscale-0"
          />
        ) : (
          <span className="label text-ink-300">{resource.person_title ?? 'Person'}</span>
        )}
        <span className="label text-ink-400">{kindLabels[resource.kind]}</span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="label text-blue-500">{owner}</p>
        <Heading className="text-base font-medium leading-[1.25] tracking-[-0.028em] text-ink-900">
          {resource.title}
        </Heading>
        {resource.owner_kind === 'person' && resource.person_affiliation ? (
          <p className="text-xs leading-[1.5] text-ink-400">{resource.person_affiliation}</p>
        ) : null}
        <p className="text-sm leading-[1.55] text-ink-500">{resource.summary}</p>

        <div className="mt-auto pt-4">
          {status !== 'signedIn' ? (
            <Link
              to="/login"
              state={{ from: location.pathname }}
              className={`${buttonClassNames('secondary')} w-full`}
            >
              Sign in to see access details
            </Link>
          ) : !isApprovedMember ? (
            <Badge>Pending approval</Badge>
          ) : (
            <>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setIsOpen((open) => !open)}
                className={`${buttonClassNames('secondary')} w-full`}
              >
                {isOpen ? 'Hide access details' : 'Show access details'}
              </button>
              <div id={panelId} hidden={!isOpen}>
                <AccessDetails resource={resource} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// The gated half. It arrives only when Row Level Security allows it, so an
// empty secret means the reader may not see it.
function AccessDetails({ resource }: { resource: Resource }) {
  const secret = resource.secret;

  if (!secret) {
    return (
      <p className="mt-4 text-xs leading-[1.55] text-ink-400">
        The team has not added the details for this one yet.
      </p>
    );
  }

  const rows: { term: string; value: ReactNode }[] = [];

  if (secret.contact_email) {
    rows.push({
      term: 'Email',
      value: <MailLink address={secret.contact_email} />,
    });
  }
  if (secret.contact_phone) {
    rows.push({ term: 'Phone', value: <span className="font-mono text-xs">{secret.contact_phone}</span> });
  }
  if (secret.booking_url) {
    rows.push({ term: 'Book', value: <OutLink href={secret.booking_url} /> });
  }
  if (secret.promo_code) {
    rows.push({
      term: 'Code',
      value: <span className="font-mono text-xs tracking-[0.04em] text-ink-900">{secret.promo_code}</span>,
    });
  }
  if (secret.redeem_url) {
    rows.push({ term: 'Redeem', value: <OutLink href={secret.redeem_url} /> });
  }
  if (secret.expires_on) {
    rows.push({ term: 'Expires', value: <span className="font-mono text-xs">{secret.expires_on}</span> });
  }

  return (
    <div className="mt-4 border-t border-ink-100">
      <dl>
        {rows.map((row) => (
          <div key={row.term} className="grid gap-0.5 border-b border-ink-100 py-2.5 sm:grid-cols-[72px_minmax(0,1fr)] sm:gap-4">
            <dt className="label text-ink-400">{row.term}</dt>
            <dd className="min-w-0 break-words text-sm leading-[1.5] text-ink-900">{row.value}</dd>
          </div>
        ))}
      </dl>
      {secret.instructions ? (
        <p className="mt-3 text-xs leading-[1.55] text-ink-500">{secret.instructions}</p>
      ) : null}
    </div>
  );
}

const linkClass =
  'break-all border-b border-ink-300 pb-0.5 transition-colors duration-300 ease-out hover:border-ink-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500';

function MailLink({ address }: { address: string }) {
  return (
    <a href={`mailto:${address}`} className={`${linkClass} font-mono text-xs`}>
      {address}
    </a>
  );
}

function OutLink({ href }: { href: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={`${linkClass} font-mono text-xs`}>
      {href.replace(/^https?:\/\//, '')} →
    </a>
  );
}
