// Invented copy for the sponsor portal. The team replaces it with real terms
// once each partner agreement is signed.

export interface PortalFact {
  term: string;
  value: string;
}

export const partnerFacts: PortalFact[] = [
  { term: 'Agreement', value: 'Lead partner, 2026 to 2027 cycle' },
  { term: 'Judging', value: 'Two panels, balanced across sectors by the Expo team' },
  { term: 'Track access', value: 'Every track. No partner owns a track.' },
  { term: 'Office hours', value: 'Two blocks on the Saturday of Expo weekend' },
  { term: 'Team contact', value: 'Partnerships desk, answers within two working days' },
];

export const partnerNote =
  'These details are placeholders for the demo. Your real agreement, judging panels, and room assignments appear here once the team confirms them.';
