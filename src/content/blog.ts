import type { BlogPost } from '../types/content';

// Placeholder editorial. The communications team replaces these with real
// reporting as the semester runs.
export const posts: BlogPost[] = [
  {
    slug: 'expo-opens-applications',
    title: 'The Expo opens to every school at Yale, and asks for the unfinished ideas',
    category: 'Announcements',
    kicker: 'Expo 2026',
    publishedAt: '2026-01-20T09:00:00-05:00',
    author: 'Lucia Ferreira',
    authorRole: 'Executive Director, Communications',
    excerpt:
      'Applications are open to every Yale student, in every school and every year. You do not need a team, a prototype, or a connection to a lab. You need a problem you cannot stop thinking about.',
    body: [
      'The Yale Impact Expo opens today, and it opens wide. Any student, in any school, in any year, may apply — alone or with a team, with a finished prototype or with nothing more than a question that has been bothering them since September.',
      'That breadth is deliberate. Every year, a great deal of serious thinking on this campus stops at the end of a seminar, because the student who did it had no route to a lab, a firm, a funder, or an agency that could carry it further. Some students arrive already holding those connections. Most do not. The Expo is our attempt to make that access something a student can earn through the quality of their work rather than inherit through their address book.',
      'Over the semester, teams choose a track, research a real problem, consult faculty and partner organizations, and build toward something concrete: a working tool, an empirical study, a policy memo, a venture or nonprofit proposal, a governance framework, or a pilot plan. The unifying standard is not technical difficulty. It is that the work is evidence-based, ethical, feasible, and aimed at genuine public benefit.',
      'The semester ends with the Expo weekend, where teams present to partners across nine domains, and the strongest work leaves with commitments attached to it. We are not primarily offering prize money. We are offering the people and institutions who can move a project forward, in one room, for one weekend, ready to be convinced.',
    ],
    lead: true,
    sponsorIds: ['ferrovia-logistics', 'solstice-technologies', 'tidewater-resilience-fund'],
  },
  {
    slug: 'nine-domains-one-standard',
    title: 'Nine domains, one standard: how we chose our partners',
    category: 'Partners',
    kicker: 'Partner model',
    publishedAt: '2026-02-03T09:00:00-05:00',
    author: 'Omar Haddad',
    authorRole: 'Executive Director, Partnerships',
    excerpt:
      'Corporate funding pays for the Expo. Academic, civic, and community partners make it credible. Holding both without letting either capture the event is the whole design problem.',
    body: [
      'Our partner roster runs across nine domains, and the organizations in it arrive on very different terms. Corporate, tech, law, and healthcare partners contribute funding in exchange for visibility, judging access, and the chance to meet students doing their most impressive work. Faculty, labs, public agencies, foundations, and community organizations contribute expertise, problem statements, and implementation pathways, and pay nothing at all.',
      'That asymmetry is intentional. A programme funded only by employers becomes a recruiting fair wearing a mission statement. A programme with no funding cannot pay for the pilots, the stipends, or the continuation grants that make student work real. We need both, and we have written the rules so that neither can quietly take over.',
      'The rules are short. No sponsor owns a track. Every partner may judge, but the Expo team assigns the panels, balanced across sectors so that no single organization decides an outcome. Opportunity commitments are stated plainly, so that students know the difference between a guaranteed placement and a conversation. And community partners are never priced out of a room built partly to serve their neighbourhoods.',
    ],
    lead: false,
    sponsorIds: ['cascade-ai-labs', 'harborlight-foundation', 'halloway-and-reed', 'ferrovia-logistics'],
  },
  {
    slug: 'what-new-haven-asked-for',
    title: 'We asked New Haven organizations what they actually needed. Here is the list.',
    category: 'New Haven',
    kicker: 'Civic impact',
    publishedAt: '2026-02-17T09:00:00-05:00',
    author: 'Noah Fitzgerald',
    authorRole: 'Community Lead',
    excerpt:
      'Before writing a single track prompt, we sat down with local organizations. What came back was less glamorous and far more useful than what students tend to imagine.',
    body: [
      'A student project about a city, written without the city in the room, tends to solve a problem the city does not have. So before the track prompts were finalised, we spent six weeks meeting local organizations and asking a blunt question: if a capable team gave you a semester, what would you want them to work on?',
      'The answers were rarely the ones a hackathon would generate. Nobody asked for another app. They asked for clearer maps of housing resources, for help making sense of food access data already sitting unused, for small-business support materials in more than one language, and for honest evaluation of programmes that have never been measured.',
      'Those requests are now problem prompts, and the organizations that raised them sit on the judging panels. A civic project that the community it names would not actually want is not a successful project, however well it presents.',
    ],
    lead: false,
    sponsorIds: ['office-of-regional-innovation', 'copperfield-community-health', 'common-ground-alliance'],
  },
  {
    slug: 'opportunity-not-prizes',
    title: 'Why we measure this programme by what it changes, not what it pays',
    category: 'Opinion',
    kicker: 'From the chair',
    publishedAt: '2026-03-02T09:00:00-05:00',
    author: 'Jamal Whitfield',
    authorRole: 'Chairman',
    excerpt:
      'A cheque is spent by June. A project that a city agency actually adopts outlives everyone who built it. We strive to empower change, and we push opportunities toward the teams furthering that mission.',
    body: [
      'We were advised, more than once, to put a large cash prize at the centre of this programme. It is the easiest thing to advertise. We decided against it, and the reasoning is worth stating publicly.',
      'A prize rewards a weekend. It does not tell you whether the housing tool got used, whether the bias audit changed a policy, or whether the clinic is better off. Those are the only outcomes this programme is actually for, and none of them can be settled by a cheque handed over on a Sunday afternoon.',
      'So the awards here are pathways that carry work forward: research placements, formation support, technical credits, pilot access, and continuation grants. They exist to further the mission a team chose, and they are judged on whether the work reaches the people it was built for.',
      'They also, plainly, open doors for the students involved. We are glad about that. A student who spends a semester doing serious public-interest work should find it easier to get where they are going. But the door is the bonus. The change is the point, and we would rather run a programme that improves one neighbourhood than one that photographs well.',
    ],
    lead: false,
    sponsorIds: ['elmwood-venture-partners', 'harborlight-foundation', 'greenline-climate-trust'],
  },
  {
    slug: 'faculty-join-the-panels',
    title: 'Faculty and labs join the judging panels across all eight tracks',
    category: 'Research',
    kicker: 'Academic partners',
    publishedAt: '2026-03-16T09:00:00-04:00',
    author: 'Priya Nair',
    authorRole: 'Executive Director, Programs',
    excerpt:
      'Academic partners have committed mentors, research prompts, and judges — and, for the strongest teams, placements that begin the week after the Expo closes.',
    body: [
      'Every judging panel at the Expo will include an academic expert alongside partner representatives, student representatives, and community or domain experts. That structure is what keeps a showcase from becoming a sales floor.',
      'Faculty involvement runs earlier than the weekend, too. Research prompts arrive at the start of the semester, mentors are matched during the research phase, and methodology review happens well before anything is presented. A finding that cannot survive a careful question from someone who studies the field is not ready for a table at the Expo.',
      'For teams whose work holds up, several partners have committed lab placements and research assistant roles beginning immediately after the weekend.',
    ],
    lead: false,
    sponsorIds: ['whitfield-university-research-office', 'lakeside-institute-for-data-science', 'bridgeview-academic-consortium'],
  },
  {
    slug: 'how-teams-are-formed',
    title: 'Two weeks, eight tracks, and no requirement to arrive with a team',
    category: 'Campus',
    kicker: 'Getting started',
    publishedAt: '2026-03-30T09:00:00-04:00',
    author: 'Sofia Kim',
    authorRole: 'Outreach Lead',
    excerpt:
      'Team matching is a designed part of the programme, not an afterthought. Here is what the first fortnight looks like from the inside.',
    body: [
      'The most common reason a student talks themselves out of a programme like this is that everyone else appears to have already formed a team. So we built the first two weeks around fixing that.',
      'Week one is a kickoff, track introductions, partner problem prompts, and faculty lightning talks — an hour that reliably changes what people want to work on. Week two is structured matching: students post the problem they care about and the skills they bring, and the programmes team makes introductions across schools and years.',
      'The teams that come out of this are usually more mixed than the ones that arrive pre-formed: a computer science major, a public health student, and someone from the law school looking at the same problem from three directions. In our experience, that combination is what makes a project survive contact with a judging panel.',
    ],
    lead: false,
    sponsorIds: ['founders-bridge-collective', 'new-quad-ventures', 'northwind-energy-alliance'],
  },
  {
    slug: 'guardrails-for-sensitive-work',
    title: 'The guardrails we set before a single project was submitted',
    category: 'Campus',
    kicker: 'Ethics and oversight',
    publishedAt: '2026-04-06T09:00:00-04:00',
    author: 'Grace Lin',
    authorRole: 'Executive Director, Technology',
    excerpt:
      'Work touching health claims, private data, or vulnerable communities gets faculty oversight before it gets a stage. That constraint improves the projects.',
    body: [
      'The Expo invites work on AI, bias, health, civil rights, and public policy. Those subjects carry real risk of harm when handled carelessly, and student enthusiasm is not a substitute for review.',
      'So projects involving human subjects, private data, medical claims, or analysis of protected demographic groups route through faculty or institutional guidance before they are presented. Teams know this from week one, and it is written into the rubric rather than applied as a surprise at the end.',
      'The effect has been the opposite of what people expect from a constraint. Knowing that a methodologist will read the work makes teams sharper about what their evidence can and cannot support — which is, in the end, the skill the whole programme is trying to teach.',
    ],
    lead: false,
    sponsorIds: ['cascade-ai-labs', 'carrow-public-interest-law', 'wellspring-health-partners'],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug);
}

// Newest first. The Blog page reads the list in this order.
export const postsByDate = [...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
