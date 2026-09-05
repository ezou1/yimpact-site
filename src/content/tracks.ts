import type { Track } from '../types/content';

// Tracks are organizing tools for judging, mentorship, partner placement, and
// opportunity pathways. They are deliberately broad, not rigid boundaries.
export const tracks: Track[] = [
  {
    id: 'ai-for-humanity',
    name: 'AI for Humanity',
    focus: 'AI, software, data science, safety, and accessibility built for the public good.',
    examples: 'Tutoring tools, public benefits navigation, nonprofit workflow automation, model evaluation.',
  },
  {
    id: 'justice-and-equity',
    name: 'Justice & Equity',
    focus: 'Civil rights, institutional fairness, legal access, and algorithmic accountability.',
    examples: 'Bias audits, legal aid tools, hiring discrimination research, AI governance proposals.',
  },
  {
    id: 'climate-and-sustainability',
    name: 'Climate & Sustainability',
    focus: 'Climate resilience, clean energy, environmental justice, and resource use.',
    examples: 'Campus energy optimization, climate risk maps, carbon accounting, green finance.',
  },
  {
    id: 'health-and-wellbeing',
    name: 'Health & Wellbeing',
    focus: 'Healthcare access, public health, mental health, and health equity.',
    examples: 'Mental health resource matching, patient navigation, hospital workflow tools.',
  },
  {
    id: 'education-and-opportunity',
    name: 'Education & Opportunity',
    focus: 'Educational access, career mobility, and economic opportunity.',
    examples: 'College access tools, financial aid navigation, workforce training, equity research.',
  },
  {
    id: 'civic-and-new-haven',
    name: 'Civic & New Haven Impact',
    focus: 'Local government, public services, housing, transit, food access, and small business.',
    examples: 'Housing resource maps, food insecurity dashboards, city policy proposals.',
  },
  {
    id: 'global-impact',
    name: 'Global Impact',
    focus: 'Global development, humanitarian action, international health, and human rights.',
    examples: 'Aid distribution optimization, global health proposals, humanitarian logistics.',
  },
  {
    id: 'social-enterprise-and-finance',
    name: 'Social Enterprise & Finance',
    focus: 'Entrepreneurship, nonprofit models, market design, and impact investment.',
    examples: 'Social ventures, ethical investing tools, financial inclusion, funding models.',
  },
];
