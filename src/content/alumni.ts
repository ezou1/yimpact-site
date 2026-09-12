import type { AlumniEntry } from '../types/content';

// The presenting partner for the Alumni page. Leave empty until it is
// confirmed; the page shows a blank rule in its place.
export const alumniPresentedBy = '';

// Placeholder listings. Every name, company, and club below is invented and
// is replaced with real contributors as gifts are confirmed. Do not add a real
// person or organization here until they have agreed to be listed.
export const alumniDonors: AlumniEntry[] = [
  { id: 'harriet-vandermeer', name: 'Harriet Vandermeer', detail: 'Yale College, Class of 1976' },
  { id: 'julian-ashcombe', name: 'Julian Ashcombe', detail: 'Yale College, Class of 1983' },
  { id: 'nadia-castellanos', name: 'Nadia Castellanos', detail: 'Yale School of Public Health, 1991' },
  { id: 'theodore-marchetti', name: 'Theodore Marchetti', detail: 'Yale College, Class of 1995' },
  { id: 'priyanka-deshmukh', name: 'Priyanka Deshmukh', detail: 'Yale Law School, 2002' },
  { id: 'everett-lindqvist', name: 'Everett Lindqvist', detail: 'Yale College, Class of 2007' },
  { id: 'simone-achterberg', name: 'Simone Achterberg', detail: 'Yale School of the Environment, 2011' },
  { id: 'daniel-kwarteng', name: 'Daniel Kwarteng', detail: 'Yale College, Class of 2014' },
];

export const alumniCompanies: AlumniEntry[] = [
  { id: 'northbridge-capital', name: 'Northbridge Capital Partners', detail: 'Alumni-founded · Impact investment' },
  { id: 'ashgrove-health', name: 'Ashgrove Health Systems', detail: 'Alumni-led · Community health' },
  { id: 'wexler-dunmore', name: 'Wexler & Dunmore LLP', detail: 'Alumni partners · Public interest law' },
  { id: 'tessellate-technologies', name: 'Tessellate Technologies', detail: 'Alumni-founded · Civic software' },
  { id: 'brightwater-energy', name: 'Brightwater Energy Group', detail: 'Alumni-led · Clean energy' },
  { id: 'kestrel-learning', name: 'Kestrel Learning Co.', detail: 'Alumni-founded · Education access' },
];

export const yaleClubs: AlumniEntry[] = [
  { id: 'club-harborview', name: 'Yale Club of Harborview', detail: 'Regional alumni club' },
  { id: 'club-elmridge', name: 'Yale Club of Elmridge', detail: 'Regional alumni club' },
  { id: 'association-westmarch', name: 'Yale Alumni Association of Westmarch', detail: 'Alumni association' },
  { id: 'club-ashbury-hills', name: 'Yale Club of Ashbury Hills', detail: 'Regional alumni club' },
  { id: 'club-glenmere', name: 'Yale Club of Glenmere', detail: 'Regional alumni club' },
];
