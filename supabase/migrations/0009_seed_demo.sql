-- Demo seed. Every row here is invented.
-- Replace each row with real content before the site goes live.
--
-- SQL cannot make a user. Make the sponsor account, the admin account, and the
-- announcements account with the Admin API. Refer to scripts/create-staff.mjs.
-- Make those accounts BEFORE you turn the before-user-created hook on.

-- Organization resources. Each org_slug matches an id in
-- src/content/sponsors.ts, so the tile can show the logo that is in git.
insert into public.resources
  (id, title, kind, owner_kind, org_slug, org_name, summary, domain, sort_order)
values
  ('11111111-1111-4111-8111-000000000001',
   'Ferrovia Logistics recruiting contact', 'contact', 'org',
   'ferrovia-logistics', 'Ferrovia Logistics',
   'A named contact for operations and supply chain teams. Ask about summer placements and the two opportunity awards.',
   'corporate', 10),
  ('11111111-1111-4111-8111-000000000002',
   'Cascade AI Labs research office hours', 'office_hours', 'org',
   'cascade-ai-labs', 'Cascade AI Labs',
   'Thirty minute slots with a research engineer. Bring a model evaluation question or an early prototype.',
   'tech', 20),
  ('11111111-1111-4111-8111-000000000003',
   'Ninth Street Legal Aid clinic intake', 'contact', 'org',
   'ninth-street-legal-aid', 'Ninth Street Legal Aid',
   'A route into the clinic for teams who work on legal access. The clinic reviews a project brief and answers within a week.',
   'law', 30),
  ('11111111-1111-4111-8111-000000000004',
   'Greenline Climate Trust pilot funding desk', 'contact', 'org',
   'greenline-climate-trust', 'Greenline Climate Trust',
   'The desk that reads continuation grant proposals for climate and resilience work after the Expo weekend.',
   'sustainability', 40);

-- Person resources. These are standalone. They have no sponsor row.
insert into public.resources
  (id, title, kind, owner_kind, person_name, person_title, person_affiliation,
   summary, domain, sort_order)
values
  ('22222222-2222-4222-8222-000000000001',
   'Faculty mentor, algorithmic fairness', 'mentor', 'person',
   'Dr Helena Ruiz', 'Associate Professor', 'Department of Statistics and Data Science',
   'Reads a bias audit design before you run it. Best for teams in Justice and Equity.',
   'academia', 50),
  ('22222222-2222-4222-8222-000000000002',
   'Faculty office hours, public health evidence', 'office_hours', 'person',
   'Dr Samuel Osei', 'Senior Lecturer', 'School of Public Health',
   'Weekly slots on study design, consent, and what a health claim can and cannot support.',
   'healthcare', 60),
  ('22222222-2222-4222-8222-000000000003',
   'Founder mentor, first round and pitch review', 'mentor', 'person',
   'Marisol Vance', 'Partner', 'New Quad Ventures',
   'One session on the pitch, the market, and the first round. Honest rather than encouraging.',
   'entrepreneurship', 70),
  ('22222222-2222-4222-8222-000000000004',
   'City policy contact, New Haven pilots', 'contact', 'person',
   'Darnell Pope', 'Programme Manager', 'Office of Regional Innovation',
   'The person who says whether a civic proposal can run as a real pilot, and what it needs first.',
   'government', 80);

-- Perk resources. The code and the redeem link are secrets.
insert into public.resources
  (id, title, kind, owner_kind, org_slug, org_name, summary, domain, sort_order)
values
  ('33333333-3333-4333-8333-000000000001',
   'Cloud credits for Expo teams', 'tool_credit', 'org',
   'solstice-technologies', 'Solstice Technologies',
   'Compute and hosting credits for a registered team. One grant for each team, for the length of the semester.',
   'tech', 90),
  ('33333333-3333-4333-8333-000000000002',
   'Model API credits', 'promo_code', 'org',
   'cascade-ai-labs', 'Cascade AI Labs',
   'Inference credits for a team that builds an AI tool. The code expires at the end of the spring term.',
   'tech', 100),
  ('33333333-3333-4333-8333-000000000003',
   'Data platform seats for research teams', 'tool_credit', 'org',
   'lakeside-institute-for-data-science', 'Lakeside Institute for Data Science',
   'Analysis seats and a shared workspace for a team that runs an empirical study.',
   'academia', 110);

-- The access details. Only an approved member reads this table.
insert into public.resource_secrets
  (resource_id, contact_email, booking_url, promo_code, redeem_url, instructions, expires_on)
values
  ('11111111-1111-4111-8111-000000000001',
   'campus.recruiting@ferrovia.example', null, null, null,
   'Write with your track and your team size. Say that you are an Expo student.', null),
  ('11111111-1111-4111-8111-000000000002',
   'research@cascade-ai.example', 'https://cal.example/cascade-ai/expo', null, null,
   'Book one slot for each team. Send your prototype link the day before.', null),
  ('11111111-1111-4111-8111-000000000003',
   'intake@ninthstreetlegal.example', null, null, null,
   'Send a one page brief. The clinic answers within a week during term.', null),
  ('11111111-1111-4111-8111-000000000004',
   'pilots@greenlineclimate.example', null, null, null,
   'The desk opens for proposals after the Expo weekend.', null),
  ('22222222-2222-4222-8222-000000000001',
   'helena.ruiz@yale.edu', 'https://cal.example/h-ruiz', null, null,
   'Send your audit design in advance. Twenty minutes each.', null),
  ('22222222-2222-4222-8222-000000000002',
   'samuel.osei@yale.edu', 'https://cal.example/s-osei', null, null,
   'Thursday afternoons during term.', null),
  ('22222222-2222-4222-8222-000000000003',
   'marisol@newquad.example', 'https://cal.example/newquad-expo', null, null,
   'One session for each team. Bring five slides, not twenty.', null),
  ('22222222-2222-4222-8222-000000000004',
   'darnell.pope@newhaven.example', null, null, null,
   'Write with the neighbourhood and the problem. Do not send a finished tool.', null),
  ('33333333-3333-4333-8333-000000000001',
   'credits@solstice.example', null, 'EXPO-SOLSTICE-DEMO', 'https://redeem.example/solstice',
   'One grant for each team. The team lead redeems it.', '2027-06-30'),
  ('33333333-3333-4333-8333-000000000002',
   null, null, 'EXPO-CASCADE-DEMO', 'https://redeem.example/cascade-ai',
   'Enter the code at checkout. The credits do not carry over.', '2027-05-31'),
  ('33333333-3333-4333-8333-000000000003',
   'seats@lakeside.example', null, 'EXPO-LAKESIDE-DEMO', 'https://redeem.example/lakeside',
   'Ask for one seat for each member of the team.', '2027-06-30');

-- The blog posts that were in src/content/blog.ts.
-- Each date sits in the past. The read policy hides a post until its
-- published_at time arrives, so a future date makes an empty blog.
insert into public.posts
  (slug, title, category, kicker, published_at, author, author_role,
   excerpt, body_text, is_lead)
values
  ($t$expo-opens-applications$t$,
   $t$The Expo opens to every school at Yale, and asks for the unfinished ideas$t$,
   $t$Announcements$t$,
   $t$Expo 2027$t$,
   '2026-04-07T09:00:00-04:00'::timestamptz,
   $t$Lucia Ferreira$t$,
   $t$Executive Director, Communications$t$,
   $t$Applications are open to every Yale student, in every school and every year. You do not need a team, a prototype, or a connection to a lab. You need a problem you cannot stop thinking about.$t$,
   $t$The Yale Impact Expo opens today, and it opens wide. Any student, in any school, in any year, may apply — alone or with a team, with a finished prototype or with nothing more than a question that has been bothering them since September.

That breadth is deliberate. Every year, a great deal of serious thinking on this campus stops at the end of a seminar, because the student who did it had no route to a lab, a firm, a funder, or an agency that could carry it further. Some students arrive already holding those connections. Most do not. The Expo is our attempt to make that access something a student can earn through the quality of their work rather than inherit through their address book.

Over the semester, teams choose a track, research a real problem, consult faculty and partner organizations, and build toward something concrete: a working tool, an empirical study, a policy memo, a venture or nonprofit proposal, a governance framework, or a pilot plan. The unifying standard is not technical difficulty. It is that the work is evidence-based, ethical, feasible, and aimed at genuine public benefit.

The semester ends with the Expo weekend, where teams present to partners across nine domains, and the strongest work leaves with commitments attached to it. We are not primarily offering prize money. We are offering the people and institutions who can move a project forward, in one room, for one weekend, ready to be convinced.$t$,
   true),
  ($t$nine-domains-one-standard$t$,
   $t$Nine domains, one standard: how we chose our partners$t$,
   $t$Partners$t$,
   $t$Partner model$t$,
   '2026-05-05T09:00:00-04:00'::timestamptz,
   $t$Omar Haddad$t$,
   $t$Executive Director, Partnerships$t$,
   $t$Corporate funding pays for the Expo. Academic, civic, and community partners make it credible. Holding both without letting either capture the event is the whole design problem.$t$,
   $t$Our partner roster runs across nine domains, and the organizations in it arrive on very different terms. Corporate, tech, law, and healthcare partners contribute funding in exchange for visibility, judging access, and the chance to meet students doing their most impressive work. Faculty, labs, public agencies, foundations, and community organizations contribute expertise, problem statements, and implementation pathways, and pay nothing at all.

That asymmetry is intentional. A programme funded only by employers becomes a recruiting fair wearing a mission statement. A programme with no funding cannot pay for the pilots, the stipends, or the continuation grants that make student work real. We need both, and we have written the rules so that neither can quietly take over.

The rules are short. No sponsor owns a track. Every partner may judge, but the Expo team assigns the panels, balanced across sectors so that no single organization decides an outcome. Opportunity commitments are stated plainly, so that students know the difference between a guaranteed placement and a conversation. And community partners are never priced out of a room built partly to serve their neighbourhoods.$t$,
   false),
  ($t$what-new-haven-asked-for$t$,
   $t$We asked New Haven organizations what they actually needed. Here is the list.$t$,
   $t$New Haven$t$,
   $t$Civic impact$t$,
   '2026-06-02T09:00:00-04:00'::timestamptz,
   $t$Noah Fitzgerald$t$,
   $t$Community Lead$t$,
   $t$Before writing a single track prompt, we sat down with local organizations. What came back was less glamorous and far more useful than what students tend to imagine.$t$,
   $t$A student project about a city, written without the city in the room, tends to solve a problem the city does not have. So before the track prompts were finalised, we spent six weeks meeting local organizations and asking a blunt question: if a capable team gave you a semester, what would you want them to work on?

The answers were rarely the ones a hackathon would generate. Nobody asked for another app. They asked for clearer maps of housing resources, for help making sense of food access data already sitting unused, for small-business support materials in more than one language, and for honest evaluation of programmes that have never been measured.

Those requests are now problem prompts, and the organizations that raised them sit on the judging panels. A civic project that the community it names would not actually want is not a successful project, however well it presents.$t$,
   false),
  ($t$opportunity-not-prizes$t$,
   $t$Why the Expo does not lead with prize money$t$,
   $t$Opinion$t$,
   $t$From the chair$t$,
   '2026-06-30T09:00:00-04:00'::timestamptz,
   $t$Jamal Whitfield$t$,
   $t$Chairman$t$,
   $t$A cheque is spent by June. An introduction to the lab, the firm, or the agency that can carry your work forward changes what you are able to do next.$t$,
   $t$We were advised, more than once, to put a large cash prize at the centre of this programme. It is the easiest thing to advertise. We decided against it, and the reasoning is worth stating publicly.

Prize money rewards a weekend. What students told us they wanted was a route — into a lab, onto a policy desk, in front of an investor, alongside a legal team who could actually incorporate the nonprofit they had spent four months designing. Those routes are worth more than the cheque, and they are precisely what is unevenly distributed on this campus.

So the awards at this Expo are opportunities: research placements, office hours, formation support, technical credits, pilot access, and continuation grants. They are harder to photograph and considerably harder to arrange. They are also the only version of this programme that still matters to a student a year later.$t$,
   false),
  ($t$faculty-join-the-panels$t$,
   $t$Faculty and labs join the judging panels across all eight tracks$t$,
   $t$Research$t$,
   $t$Academic partners$t$,
   '2026-07-21T09:00:00-04:00'::timestamptz,
   $t$Priya Nair$t$,
   $t$Executive Director, Programs$t$,
   $t$Academic partners have committed mentors, research prompts, and judges — and, for the strongest teams, placements that begin the week after the Expo closes.$t$,
   $t$Every judging panel at the Expo will include an academic expert alongside partner representatives, student representatives, and community or domain experts. That structure is what keeps a showcase from becoming a sales floor.

Faculty involvement runs earlier than the weekend, too. Research prompts arrive at the start of the semester, mentors are matched during the research phase, and methodology review happens well before anything is presented. A finding that cannot survive a careful question from someone who studies the field is not ready for a table at the Expo.

For teams whose work holds up, several partners have committed lab placements and research assistant roles beginning immediately after the weekend.$t$,
   false),
  ($t$how-teams-are-formed$t$,
   $t$Two weeks, eight tracks, and no requirement to arrive with a team$t$,
   $t$Campus$t$,
   $t$Getting started$t$,
   '2026-08-11T09:00:00-04:00'::timestamptz,
   $t$Sofia Kim$t$,
   $t$Outreach Lead$t$,
   $t$Team matching is a designed part of the programme, not an afterthought. Here is what the first fortnight looks like from the inside.$t$,
   $t$The most common reason a student talks themselves out of a programme like this is that everyone else appears to have already formed a team. So we built the first two weeks around fixing that.

Week one is a kickoff, track introductions, partner problem prompts, and faculty lightning talks — an hour that reliably changes what people want to work on. Week two is structured matching: students post the problem they care about and the skills they bring, and the programmes team makes introductions across schools and years.

The teams that come out of this are usually more mixed than the ones that arrive pre-formed: a computer science major, a public health student, and someone from the law school looking at the same problem from three directions. In our experience, that combination is what makes a project survive contact with a judging panel.$t$,
   false),
  ($t$guardrails-for-sensitive-work$t$,
   $t$The guardrails we set before a single project was submitted$t$,
   $t$Campus$t$,
   $t$Ethics and oversight$t$,
   '2026-09-01T09:00:00-04:00'::timestamptz,
   $t$Grace Lin$t$,
   $t$Executive Director, Technology$t$,
   $t$Work touching health claims, private data, or vulnerable communities gets faculty oversight before it gets a stage. That constraint improves the projects.$t$,
   $t$The Expo invites work on AI, bias, health, civil rights, and public policy. Those subjects carry real risk of harm when handled carelessly, and student enthusiasm is not a substitute for review.

So projects involving human subjects, private data, medical claims, or analysis of protected demographic groups route through faculty or institutional guidance before they are presented. Teams know this from week one, and it is written into the rubric rather than applied as a surprise at the end.

The effect has been the opposite of what people expect from a constraint. Knowing that a methodologist will read the work makes teams sharper about what their evidence can and cannot support — which is, in the end, the skill the whole programme is trying to teach.$t$,
   false)
;
