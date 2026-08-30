export type Sector =
  | 'nonprofit'
  | 'government'
  | 'defense'
  | 'ai-research'
  | 'academia'
  | 'industry';

export type SponsorTier = 'lead' | 'partner' | 'supporting';

export interface Sponsor {
  id: string;
  name: string;
  sector: Sector;
  tier: SponsorTier;
  logoUrl: string;
  websiteUrl?: string;
  blurb?: string; // One or two sentences. The /sponsors page shows it.
  featured: boolean; // True if the home page shows this sponsor.
}

export interface Organizer {
  id: string;
  name: string;
  role: string; // Example: "Logistics Lead"
  affiliation?: string; // Example: "Yale '27, Computer Science"
  headshotUrl: string;
  bio: string;
  linkedinUrl?: string;
  email?: string;
}

export interface ScheduleItem {
  id: string;
  startsAt: string; // ISO 8601
  endsAt: string; // ISO 8601
  title: string;
  description?: string;
  location?: string;
  track?: string; // Null for a plenary item.
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface EventDetails {
  name: string;
  tagline: string;
  startsAt: string;
  endsAt: string;
  venueName: string;
  venueAddress: string;
  mapUrl?: string;
  contactEmail: string;
}
