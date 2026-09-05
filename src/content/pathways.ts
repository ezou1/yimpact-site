import type { Pathway } from '../types/content';

// The Expo competes on opportunity rather than on prize money. These are the
// routes a strong team can take out of the weekend.
export const pathways: Pathway[] = [
  {
    id: 'research-placement',
    name: 'Research placement',
    summary: 'Lab internships, research assistant roles, faculty mentorship, and publication guidance.',
  },
  {
    id: 'startup-acceleration',
    name: 'Startup acceleration',
    summary: 'Investor office hours, accelerator application review, founder mentorship, and pitch feedback.',
  },
  {
    id: 'policy-implementation',
    name: 'Policy implementation',
    summary: 'Memo review, stakeholder meetings, city and state feedback, and pilot design support.',
  },
  {
    id: 'legal-and-governance',
    name: 'Legal and governance',
    summary: 'Nonprofit and startup formation guidance, privacy review, and civil rights mentorship.',
  },
  {
    id: 'technical-deployment',
    name: 'Technical deployment',
    summary: 'Cloud credits, API access, engineering mentorship, and help getting a project shipped.',
  },
  {
    id: 'implementation-grants',
    name: 'Implementation grants',
    summary: 'Funding and partner support to run a real pilot after the Expo weekend ends.',
  },
];
