import type { EventDetails } from '../types/content';

// The semester runs from a kickoff party in the autumn of 2026 to the
// exposition in the spring of 2027. The room is a placeholder. The team sets
// the firm values once the University calendar is confirmed.
export const event: EventDetails = {
  name: 'Yale Impact Expo',
  shortName: 'Impact Expo',
  tagline:
    'A semester-long social impact incubator that helps Yale students turn ambitious ideas into research, policy, ventures, and working prototypes — and connects that work to the people who can advance it.',
  mission:
    'We believe the best ideas on this campus should not stop at a problem set. The Expo exists to widen access to opportunity, to ground student work in real community needs, and to send serious, evidence-based projects out into the world where they can do good.',
  dateLabel: 'Kickoff autumn 2026 · Expo weekend spring 2027',
  startsAt: '2027-04-16T17:00:00-04:00',
  endsAt: '2027-04-18T16:00:00-04:00',
  venueName: 'Yale University',
  venueAddress: 'New Haven, Connecticut',
  contactEmail: 'hello@yaleimpactexpo.org',
  sponsorEmail: 'yafee.khan@yale.edu',
};

// The kickoff party opens the semester. The Students page shows this date.
export const kickoffAt = '2026-09-18T18:00:00-04:00';
export const kickoffLabel = 'Kickoff party · Friday 18 September 2026';
