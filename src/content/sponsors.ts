import type { Domain, Sponsor } from '../types/content';

// The nine domains, in the order they run across the top of the Sponsors page.
export const domainOrder: Domain[] = [
  'corporate',
  'government',
  'law',
  'tech',
  'entrepreneurship',
  'academia',
  'philanthropy',
  'sustainability',
  'healthcare',
];

export const domainLabels: Record<Domain, string> = {
  corporate: 'Corporate',
  government: 'Government',
  law: 'Law',
  tech: 'Tech',
  entrepreneurship: 'Entrepreneurship',
  academia: 'Academia',
  philanthropy: 'Philanthropy',
  sustainability: 'Sustainability',
  healthcare: 'Healthcare',
};

export const domainSummaries: Record<Domain, string> = {
  corporate:
    'Employers and industry partners who fund the Expo, judge student work, and open real doors on the other side of it.',
  government:
    'Public agencies who bring live problem statements, policy pathways, and the chance to pilot student work in the field.',
  law: 'Firms and legal aid organizations who mentor teams through formation, governance, privacy, and civil rights questions.',
  tech: 'AI labs, platforms, and tooling partners who supply credits, infrastructure, and the engineering help to ship.',
  entrepreneurship:
    'Investors, accelerators, and founders who give teams office hours, honest feedback, and a route to a first round.',
  academia:
    'Faculty, labs, and research centers whose mentorship keeps every project evidence-based and academically serious.',
  philanthropy:
    'Foundations and trusts who fund continuation grants and hold the Expo to a standard of genuine public benefit.',
  sustainability:
    'Climate and energy partners working with teams on resilience, environmental justice, and the transition ahead.',
  healthcare:
    'Health systems and biosciences partners who ground student work in patient outcomes and community health equity.',
};

// Placeholder partners. The team replaces this list with real organizations as
// commitments are signed.
export const sponsors: Sponsor[] = [
  // Corporate
  {
    id: 'ferrovia-logistics',
    name: 'Ferrovia Logistics',
    domain: 'corporate',
    tier: 'lead',
    logoUrl: '/logos/ferrovia-logistics.svg',
    websiteUrl: 'https://ferrovia-logistics.example',
    blurb:
      'Ferrovia funds two opportunity awards and sends operations leaders to judge, mentor, and interview finalists on the spot.',
    featured: true,
  },
  {
    id: 'brightline-consulting-group',
    name: 'Brightline Consulting Group',
    domain: 'corporate',
    tier: 'partner',
    logoUrl: '/logos/brightline-consulting-group.svg',
    websiteUrl: 'https://brightline-consulting.example',
    blurb:
      'Brightline runs problem-framing workshops through the semester and hosts coffee chats across every track at the Expo.',
    featured: false,
  },
  {
    id: 'vantage-point-technologies',
    name: 'Vantage Point Technologies',
    domain: 'corporate',
    tier: 'supporting',
    logoUrl: '/logos/vantage-point-technologies.svg',
    blurb: 'Vantage Point underwrites travel stipends so cost never decides who takes part.',
    featured: false,
  },

  // Government
  {
    id: 'office-of-regional-innovation',
    name: 'Office of Regional Innovation',
    domain: 'government',
    tier: 'lead',
    logoUrl: '/logos/office-of-regional-innovation.svg',
    websiteUrl: 'https://regional-innovation.example',
    blurb:
      'The office brings live problem statements to the Expo and offers the strongest civic teams a route to a real municipal pilot.',
    featured: true,
  },
  {
    id: 'bureau-of-applied-analytics',
    name: 'Bureau of Applied Analytics',
    domain: 'government',
    tier: 'partner',
    logoUrl: '/logos/bureau-of-applied-analytics.svg',
    websiteUrl: 'https://applied-analytics.example',
    blurb: 'Analysts from the bureau mentor teams on public data, evaluation design, and responsible measurement.',
    featured: false,
  },
  {
    id: 'civic-systems-directorate',
    name: 'Civic Systems Directorate',
    domain: 'government',
    tier: 'supporting',
    logoUrl: '/logos/civic-systems-directorate.svg',
    blurb: 'The directorate reviews policy memos and connects teams to the departments that would carry them out.',
    featured: false,
  },

  // Law
  {
    id: 'halloway-and-reed',
    name: 'Halloway & Reed LLP',
    domain: 'law',
    tier: 'lead',
    logoUrl: '/logos/halloway-and-reed.svg',
    websiteUrl: 'https://halloway-reed.example',
    blurb:
      'Halloway & Reed gives finalist teams pro bono formation support, so a nonprofit or venture born at the Expo can actually exist.',
    featured: true,
  },
  {
    id: 'carrow-public-interest-law',
    name: 'Carrow Public Interest Law',
    domain: 'law',
    tier: 'partner',
    logoUrl: '/logos/carrow-public-interest-law.svg',
    websiteUrl: 'https://carrow-law.example',
    blurb: 'Carrow advises Justice & Equity teams on civil rights research, evidence standards, and AI governance.',
    featured: false,
  },
  {
    id: 'ninth-street-legal-aid',
    name: 'Ninth Street Legal Aid',
    domain: 'law',
    tier: 'supporting',
    logoUrl: '/logos/ninth-street-legal-aid.svg',
    blurb: 'Legal aid attorneys keep access-to-justice projects grounded in what clients actually need.',
    featured: false,
  },

  // Tech
  {
    id: 'cascade-ai-labs',
    name: 'Cascade AI Labs',
    domain: 'tech',
    tier: 'lead',
    logoUrl: '/logos/cascade-ai-labs.svg',
    websiteUrl: 'https://cascade-ai-labs.example',
    blurb:
      'Cascade supplies model access and research credits, and its engineers hold weekly office hours through the build phase.',
    featured: true,
  },
  {
    id: 'recurrent-systems-group',
    name: 'Recurrent Systems Group',
    domain: 'tech',
    tier: 'partner',
    logoUrl: '/logos/recurrent-systems-group.svg',
    websiteUrl: 'https://recurrent-systems.example',
    blurb: 'Recurrent mentors teams on evaluation, safety review, and getting a prototype in front of real users.',
    featured: false,
  },
  {
    id: 'solstice-technologies',
    name: 'Solstice Technologies',
    domain: 'tech',
    tier: 'supporting',
    logoUrl: '/logos/solstice-technologies.svg',
    blurb: 'Solstice covers cloud infrastructure for every team that needs it, at no cost to students.',
    featured: false,
  },

  // Entrepreneurship
  {
    id: 'elmwood-venture-partners',
    name: 'Elmwood Venture Partners',
    domain: 'entrepreneurship',
    tier: 'lead',
    logoUrl: '/logos/elmwood-venture-partners.svg',
    websiteUrl: 'https://elmwood-ventures.example',
    blurb:
      'Elmwood runs investor office hours through Expo weekend and commits follow-on conversations to teams it backs.',
    featured: true,
  },
  {
    id: 'founders-bridge-collective',
    name: 'Founders Bridge Collective',
    domain: 'entrepreneurship',
    tier: 'partner',
    logoUrl: '/logos/founders-bridge-collective.svg',
    websiteUrl: 'https://founders-bridge.example',
    blurb: 'Working founders coach teams on scoping, users, and the unglamorous parts of getting something started.',
    featured: false,
  },
  {
    id: 'new-quad-ventures',
    name: 'New Quad Ventures',
    domain: 'entrepreneurship',
    tier: 'supporting',
    logoUrl: '/logos/new-quad-ventures.svg',
    blurb: 'New Quad reviews accelerator applications and prepares finalists for their first real pitch.',
    featured: false,
  },

  // Academia
  {
    id: 'whitfield-university-research-office',
    name: 'Whitfield University Research Office',
    domain: 'academia',
    tier: 'lead',
    logoUrl: '/logos/whitfield-university-research-office.svg',
    websiteUrl: 'https://whitfield-research.example',
    blurb:
      'The research office opens lab placements and research assistant roles to students whose Expo work earns them.',
    featured: true,
  },
  {
    id: 'lakeside-institute-for-data-science',
    name: 'Lakeside Institute for Data Science',
    domain: 'academia',
    tier: 'partner',
    logoUrl: '/logos/lakeside-institute-for-data-science.svg',
    websiteUrl: 'https://lakeside-data.example',
    blurb: 'Lakeside faculty review methodology so that every finding presented at the Expo holds up to scrutiny.',
    featured: false,
  },
  {
    id: 'bridgeview-academic-consortium',
    name: 'Bridgeview Academic Consortium',
    domain: 'academia',
    tier: 'supporting',
    logoUrl: '/logos/bridgeview-academic-consortium.svg',
    blurb: 'Bridgeview contributes research prompts and judges drawn from across its member institutions.',
    featured: false,
  },

  // Philanthropy
  {
    id: 'harborlight-foundation',
    name: 'Harborlight Foundation',
    domain: 'philanthropy',
    tier: 'lead',
    logoUrl: '/logos/harborlight-foundation.svg',
    websiteUrl: 'https://harborlight-foundation.example',
    blurb:
      'Harborlight funds continuation grants, so the best projects keep going long after the closing reception.',
    featured: true,
  },
  {
    id: 'meridian-policy-institute',
    name: 'Meridian Policy Institute',
    domain: 'philanthropy',
    tier: 'partner',
    logoUrl: '/logos/meridian-policy-institute.svg',
    websiteUrl: 'https://meridian-policy-institute.example',
    blurb: 'Meridian publishes the strongest student policy memos and puts their authors in front of practitioners.',
    featured: false,
  },
  {
    id: 'common-ground-alliance',
    name: 'Common Ground Alliance',
    domain: 'philanthropy',
    tier: 'supporting',
    logoUrl: '/logos/common-ground-alliance.svg',
    blurb: 'The alliance holds the Expo to a plain standard: does this actually help the community it names?',
    featured: false,
  },

  // Sustainability
  {
    id: 'greenline-climate-trust',
    name: 'Greenline Climate Trust',
    domain: 'sustainability',
    tier: 'lead',
    logoUrl: '/logos/greenline-climate-trust.svg',
    websiteUrl: 'https://greenline-climate.example',
    blurb:
      'Greenline mentors climate teams and funds the pilot costs for projects that move from a model to a measurement.',
    featured: true,
  },
  {
    id: 'tidewater-resilience-fund',
    name: 'Tidewater Resilience Fund',
    domain: 'sustainability',
    tier: 'partner',
    logoUrl: '/logos/tidewater-resilience-fund.svg',
    websiteUrl: 'https://tidewater-resilience.example',
    blurb: 'Tidewater brings coastal resilience data and the community partners who live with the results.',
    featured: false,
  },
  {
    id: 'northwind-energy-alliance',
    name: 'Northwind Energy Alliance',
    domain: 'sustainability',
    tier: 'supporting',
    logoUrl: '/logos/northwind-energy-alliance.svg',
    blurb: 'Northwind engineers advise teams working on energy efficiency and the grid.',
    featured: false,
  },

  // Healthcare
  {
    id: 'wellspring-health-partners',
    name: 'Wellspring Health Partners',
    domain: 'healthcare',
    tier: 'lead',
    logoUrl: '/logos/wellspring-health-partners.svg',
    websiteUrl: 'https://wellspring-health.example',
    blurb:
      'Wellspring clinicians judge health projects and host the teams whose tools are ready for a supervised trial.',
    featured: true,
  },
  {
    id: 'copperfield-community-health',
    name: 'Copperfield Community Health',
    domain: 'healthcare',
    tier: 'partner',
    logoUrl: '/logos/copperfield-community-health.svg',
    websiteUrl: 'https://copperfield-health.example',
    blurb: 'Copperfield keeps health equity work anchored to the neighbourhoods it is meant to serve.',
    featured: false,
  },
  {
    id: 'aurora-biosciences',
    name: 'Aurora Biosciences',
    domain: 'healthcare',
    tier: 'supporting',
    logoUrl: '/logos/aurora-biosciences.svg',
    blurb: 'Aurora scientists mentor teams on study design, evidence, and responsible medical claims.',
    featured: false,
  },
];
