# Yale Impact Exposition — Build Spec

## 0. How to use this document

Build only the items in Section 3. Section 4 and Section 5 show the future
design. They give context. Do not build them now.

Do not make a Supabase client in Phase 1. Do not make an authentication flow.
Do not make a database table. Do not add an environment variable.

If an instruction in Section 3 does not agree with Section 4, obey Section 3.
If Section 3 does not tell you what to do, select the most simple option. The
option must not disagree with Section 4.

The result of this phase is a static web site with placeholder text. The site
has a login page. The two buttons on the login page are disabled.

---

## 1. Language rules for all documentation

Write all documentation in ASD-STE100 (Simplified Technical English). This rule
applies to:

- code comments
- JSDoc blocks
- README files
- commit messages
- this document and all subsequent specifications

Keep all documentation short. Write a comment only when the code is not clear.
Do not write a comment that says again what the code says.

User interface text is not documentation. Write UI text in clear, usual
English. Refer to Section 3.6 for the tone.

### 1.1 Sentence rules

- Write a maximum of 20 words in a procedural sentence.
- Write a maximum of 25 words in a descriptive sentence.
- Write one instruction in one sentence.
- Write a maximum of six sentences in a descriptive paragraph.
- Use the active voice.
- Use the articles `a`, `an`, and `the`.
- Use the simple present tense, the simple past tense, or the simple future
  tense.
- Do not use the -ing form of a verb.
- Do not put more than three nouns together.
- Use `must` for a requirement.
- Use `can` for a possibility.
- Use `do not` for a prohibition.
- Do not use a contraction.

### 1.2 Approved technical names

STE-100 lets a project approve its own technical names. Use these names. Do not
invent a different word for the same thing.

`branch`, `build`, `card`, `commit`, `component`, `deployment`, `hook`,
`migration`, `policy`, `prop`, `query`, `repository`, `route`, `token`,
`type`.

### 1.3 Approved technical verbs

`build`, `commit`, `deploy`, `merge`, `push`, `render`, `query`.

### 1.4 Word substitutions

| Do not write | Write |
|---|---|
| ensure | make sure |
| verify | check |
| utilize | use |
| provide | give |
| obtain | get |
| perform | do |
| implement | build |
| configure | set |
| generate | make |
| indicate | show |
| identify | find |
| require | need |
| prior to | before |
| in order to | to |
| approximately | about |
| additional | more |
| initial | first |
| sufficient | enough |
| via | with |

### 1.5 Examples

Correct:

```ts
// Count the sponsors in each sector. The home page shows the counts.
```

Not correct:

```ts
// This utility function is responsible for iterating over the sponsors array
// in order to generate an aggregated mapping of sector identifiers to their
// respective occurrence counts, which are subsequently utilized downstream.
```

---

## 2. Stack

| Layer | Choice | Note |
|---|---|---|
| Language | TypeScript | Set `strict` to true |
| Framework | React 19 and Vite | Single page. No SSR. |
| Routes | react-router-dom v7 | `BrowserRouter` and `Routes` |
| Style | Tailwind CSS v4 | Set the tokens in CSS |
| Icons | lucide-react | Outline only. Use few icons. |
| Host | Vercel | Deploy from the `main` branch |
| Backend | Supabase | Phase 2. Do not connect it now. |

Check the Tailwind version before you write the config. Run
`npm ls tailwindcss`. For v4, set the tokens in `@theme` in `src/index.css` and
add the `@tailwindcss/vite` plugin. For v3, write the same tokens in
`tailwind.config.js`. Do not use both methods.

Do not add a backend framework. Row Level Security in Postgres controls all
permissions from Phase 2. The only server code in this project is a small
number of Supabase Edge Functions. Refer to Section 4.6.

---

## 3. Phase 1 — build this

### 3.1 Scale targets

Each component must render correctly at both limits. Test each component with
the low number and the high number.

| Item | Plan for | Must also work at |
|---|---|---|
| Sponsors | 100 | 6 |
| Organizers | 20 | 4 |
| Schedule items | 25 | 5 |
| Students (Phase 4) | 500 | 20 |
| Admin accounts | 1 | 1 |

The results of these limits:

- The sponsor directory needs a sector group and a filter at 100 sponsors.
- The filter must disappear when there are fewer than 12 sponsors.
- A sector group with zero sponsors must render nothing. Do not render an empty
  heading.
- The organizer grid must reflow. Do not use a fixed number of columns.

### 3.2 File tree

```
yimpact-site/
├─ public/
│  ├─ favicon.svg
│  └─ logos/                    placeholder sponsor logos
├─ src/
│  ├─ main.tsx
│  ├─ App.tsx                   routes only
│  ├─ index.css                 Tailwind import and @theme tokens
│  ├─ content/
│  │  ├─ event.ts
│  │  ├─ sponsors.ts
│  │  ├─ organizers.ts
│  │  ├─ schedule.ts
│  │  └─ faq.ts
│  ├─ types/
│  │  └─ content.ts             all types are here
│  ├─ components/
│  │  ├─ layout/
│  │  │  ├─ Header.tsx
│  │  │  ├─ Footer.tsx
│  │  │  └─ Layout.tsx
│  │  ├─ ui/
│  │  │  ├─ Button.tsx
│  │  │  ├─ Card.tsx
│  │  │  ├─ Section.tsx
│  │  │  └─ Badge.tsx
│  │  ├─ SponsorLogoGrid.tsx
│  │  ├─ SponsorCard.tsx
│  │  ├─ OrganizerCard.tsx
│  │  ├─ ScheduleTable.tsx
│  │  └─ EventDetailsBlock.tsx
│  └─ pages/
│     ├─ Home.tsx
│     ├─ Sponsors.tsx
│     ├─ Team.tsx
│     ├─ Schedule.tsx
│     ├─ Login.tsx
│     └─ NotFound.tsx
├─ index.html
├─ vercel.json
├─ tsconfig.json
├─ vite.config.ts
└─ package.json
```

### 3.3 Put all content in data files

This is the most important rule in Phase 1. Put all text, names, dates, and
logo paths in `src/content/*.ts`. Export each item as a typed array. Each
component gets its content as a prop.

There are three reasons for this rule. The designer can change the style and
not touch the content. A person who does not write code can change the text. In
Phase 3, you replace each array with a Supabase query, and the component props
do not change.

The types in `src/types/content.ts` agree with the database schema in Section
4.4. The field names must be the same in both places.

```ts
// src/types/content.ts

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
  blurb?: string;          // One or two sentences. The /sponsors page shows it.
  featured: boolean;       // True if the home page shows this sponsor.
}

export interface Organizer {
  id: string;
  name: string;
  role: string;            // Example: "Logistics Lead"
  affiliation?: string;    // Example: "Yale '27, Computer Science"
  headshotUrl: string;
  bio: string;
  linkedinUrl?: string;
  email?: string;
}

export interface ScheduleItem {
  id: string;
  startsAt: string;        // ISO 8601
  endsAt: string;          // ISO 8601
  title: string;
  description?: string;
  location?: string;
  track?: string;          // Null for a plenary item.
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
```

### 3.4 Placeholder content

Make this placeholder content:

- `event.ts` — The name is real: `Yale Impact Exposition`. All other fields are
  placeholders. Use a clearly false future date. Set the venue to `TBD`. A
  reader must not think that this information is correct.
- `sponsors.ts` — Make 24 sponsors. Use all six sectors. Use all three tiers.
  Set `featured` to true for eight sponsors. Placeholder names must look real.
  Write `Meridian Policy Institute`, not `Lorem Ipsum Corp`.
- Logos — Make one SVG placeholder for each sponsor in `public/logos/`. Each
  logo is a gray square with round corners and the initials of the sponsor. Do
  not use a real company logo.
- `organizers.ts` — Make 12 organizers. Each bio is two or three sentences of
  lorem ipsum. Each headshot is a gray circle with initials.
- `schedule.ts` — Make 10 items in one day. Two items must be in parallel
  tracks. This tests the track column.
- `faq.ts` — Make six items.

### 3.5 Design tokens

The direction is clean and modern. The colours are white and blue. Keep the
design simple. A designer changes this design later. Use a small token set.

The blue is Yale Blue, because this is a Yale event. Do not add a second accent
colour.

```css
/* src/index.css */
@import "tailwindcss";

@theme {
  --color-ink-900: #0B1524;
  --color-ink-700: #334155;
  --color-ink-500: #64748B;
  --color-ink-300: #CBD5E1;
  --color-ink-100: #E8EDF4;
  --color-ink-50:  #F6F8FB;

  --color-blue-900: #00224A;
  --color-blue-700: #00356B;   /* primary */
  --color-blue-500: #286DC0;   /* interactive */
  --color-blue-100: #DCE8F7;
  --color-blue-50:  #F0F5FC;

  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;

  --radius-card: 12px;
  --radius-control: 8px;
}
```

Style rules:

- The page background is white.
- A section can use `ink-50` to make a band. Do not use a dark background.
- Body text is `ink-700`. A heading is `ink-900`. Small text is `ink-500`.
- Use `blue-700` for a primary button. Use `blue-500` for a link and a hover
  state.
- Use two font weights: 400 and 600.
- The type scale is 48, 32, 24, 18, 16, and 14 pixels.
- The hero heading is 48 pixels on a desktop and 32 pixels on a telephone.
- Body text is 16 pixels. The line height is 1.7.
- A border is 1 pixel and `ink-100`.
- Do not use a drop shadow. A card can lift on hover with
  `0 1px 3px rgb(0 0 0 / 0.06)`.
- Use sentence case for all text.
- A 12 pixel eyebrow label can use capital letters. Set the letter spacing to
  `0.08em`.
- The maximum content width is 1120 pixels.
- The gutter is 24 pixels on a telephone and 48 pixels on a desktop.
- The space between sections is 96 pixels on a desktop and 64 pixels on a
  telephone.

Group the sponsors by sector. Do not group them by tier. This event brings
together nonprofits, government, defense, AI research, academia, and industry.
The sector groups show this fact. The tier controls only the logo size on the
home page.

### 3.6 Routes

| Path | Page | Function |
|---|---|---|
| `/` | Home | About, details, sponsors, team |
| `/sponsors` | Sponsors | All sponsors, in sector groups |
| `/team` | Team | All organizer bios |
| `/schedule` | Schedule | The full agenda |
| `/login` | Login | Student and sponsor. Both disabled. |
| `*` | NotFound | Error 404 |

The `/portal/*` path is reserved for Phase 3. Do not make it now.

### 3.7 Home page sections

Put the sections in this sequence:

1. **Hero.** Show the event name, the tagline, and the date and venue. Add one
   primary button (`View the sponsors`) and one second button (`Log in`). Do not
   use a photograph. Do not use a gradient. Use white space and strong type.
2. **About.** Write two or three lorem ipsum paragraphs about the event.
3. **Event details.** Show the date, the time, the venue, the address, and a map
   link. Get the data from `event.ts`. Put it in a block with a border.
4. **Sectors.** Show six tiles, one for each sector. Show a count on each tile.
   Calculate each count from `sponsors.ts`. Do not write a count in the code.
5. **Featured sponsors.** Show a logo grid of the sponsors with `featured` set
   to true. The tier sets the logo size. Add a link to `/sponsors`. The link
   text is `See all NN sponsors`. Calculate `NN`.
6. **Organizers.** Show the first six organizer cards. Add a link to `/team`.
7. **FAQ.** Use an accordion. Each item is closed at first. The accordion must
   work with a keyboard.
8. **Contact.** Show `contactEmail` as a mailto link.

### 3.8 Login page

Make a real page at `/login`. The page has two options. Neither option works
now. The page shows the future shape of the portal.

The layout is centred. The maximum width is 880 pixels. The two cards are side
by side on a desktop. The cards stack on a telephone.

**Student card**

- Heading: `Students`
- Text: one sentence. Tell the student that sign-in uses a school email address.
- Button: `Sign in with school email`. The button is disabled.
- Badge: `Coming soon`

**Sponsor card**

- Heading: `Sponsors and mentors`
- Text: one sentence. Tell the sponsor that the team makes the account. An
  invitation comes by email.
- Button: `Sign in`. The button is disabled.
- Badge: `Coming soon`

Below the two cards, show one line of `ink-500` text: `Portal access opens
closer to the event.` Add a mailto link for questions.

**Rules for the disabled state.** Do not use only the `disabled` attribute. A
screen reader ignores a disabled control. Then the user does not learn that the
portal exists. Set `aria-disabled` to true. Keep the button in the tab order.
Catch the click event and do nothing. Use `bg-ink-100`, `text-ink-500`, and
`cursor-not-allowed`. Do not change the button on hover. Connect the badge to
the button with `aria-describedby`.

### 3.9 Quality floor

These rules are not optional. Do not show them in the user interface.

- The site works from a width of 320 pixels. Test at 320, 768, and 1440 pixels.
- Each interactive element shows a focus ring. Do not remove an outline unless
  you replace it.
- Use one `<header>`, one `<main>`, one `<footer>`, and one `<h1>` on each page.
- Put the headings in sequence. Do not skip a level.
- Each logo and each headshot has a correct `alt` value.
- A decorative image has an empty `alt` value.
- The contrast ratio of body text is 4.5:1 or more.
- Obey `prefers-reduced-motion`. Each transition is 200 milliseconds or less.
- The first element in the tab order is a skip link to the content.
- Set `<title>` and `<meta name="description">` for each route.
- Set the width and the height on each `<img>`. This prevents layout shift.

### 3.10 Vercel config

The site uses client routes. A refresh on `/sponsors` gives an error 404 without
this file. Put `vercel.json` in the root of the repository.

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### 3.11 Acceptance criteria

Phase 1 is complete when all of these items are true.

- [ ] `npm run build` finds zero TypeScript errors with `strict` set to true.
- [ ] All six routes render.
- [ ] A refresh on each route works on the deployed site.
- [ ] There is no content text in `src/components/` or `src/pages/`.
- [ ] The site calculates the sponsor count, the sector counts, and `NN`.
- [ ] The layout is correct with six sponsors and four organizers.
- [ ] There is no empty sector heading at low counts.
- [ ] Both login buttons look disabled.
- [ ] Both login buttons keep focus and tell the user why they are disabled.
- [ ] A keyboard reaches every control.
- [ ] The Lighthouse accessibility score is 95 or more on `/` and `/login`.
- [ ] The site runs without an `.env` file.
- [ ] `package.json` does not include a Supabase package.
- [ ] All code comments obey Section 1.

### 3.12 Do not build these in Phase 1

Do not build, install, or start any of these items.

- A Supabase client, `@supabase/supabase-js`, or an authentication library
- Login logic, session logic, a protected route, or `/portal`
- A database, a schema file, or a migration
- A form that sends data
- A CMS or a markdown loader
- A dark mode
- Analytics
- An animation library. Use CSS transitions only.
- A component library. Write the four UI components by hand.

---

## 4. Future phases — do not build now

This section is for reference. It keeps Phase 1 compatible with the future
design.

### 4.1 Phase sequence

| Phase | Scope | Start after |
|---|---|---|
| 1 | Static site | Now |
| 2 | Supabase project, schema, RLS, admin | The design is approved |
| 3 | Sponsor login, invitations, directory | Phase 2 is tested |
| 4 | Student login, profiles, consent, search | Phase 3 is complete |
| 5 | Admin chat | Only if the team needs it |

Phase 5 is last and optional. A mailto link and a contact form give most of the
same value. Chat also needs a person to answer the messages.

### 4.2 Portal location

The portal is in the same React application. It uses the same domain and the
same deployment. The marketing pages are at `/`. The portal is at `/portal/*`
behind a route guard.

The route guard controls the user experience only. RLS is the real security
boundary. Phase 1 reserves the `/portal` path for this reason.

### 4.3 Authentication providers

- **Students.** Use Google OAuth, Microsoft OAuth, and an email magic link.
  Yale student mail is EliApps, which is Google Workspace. A Google sign-in
  sends the student to Yale CAS and Duo. The student gets NetID authentication.
  We do not integrate with Yale ITS.
- **Sponsors.** Use email and a password. The team makes each account and sends
  an invitation.
- **Yale CAS.** Do not build this. CAS 2.0 returns only a NetID. It returns no
  other attributes. Yale ITS must register the service. An attribute release
  needs approval from the CISO and the data owner. This is too slow for our
  schedule.

### 4.4 Database schema

The field names here agree with `src/types/content.ts`.

```sql
-- Enable RLS on each table at the time you make the table.
create table profiles (
  id uuid primary key references auth.users on delete cascade,
  role text not null check (role in ('student','sponsor','organizer','admin')),
  full_name text,
  email text not null,
  school text,
  grad_year int,
  bio text,
  portfolio_url text,
  linkedin_url text,
  resume_path text,
  share_with_sponsors boolean not null default false,
  created_at timestamptz not null default now()
);
alter table profiles enable row level security;

create table sponsors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  sector text not null,
  tier text not null,
  logo_url text,
  website_url text,
  blurb text,
  featured boolean not null default false
);
alter table sponsors enable row level security;

create table sponsor_contacts (
  id uuid primary key default gen_random_uuid(),
  sponsor_id uuid not null references sponsors on delete cascade,
  profile_id uuid not null references profiles on delete cascade,
  title text
);
alter table sponsor_contacts enable row level security;

create table sponsor_resources (
  id uuid primary key default gen_random_uuid(),
  sponsor_id uuid not null references sponsors on delete cascade,
  title text not null,
  description text,
  url text,
  kind text
);
alter table sponsor_resources enable row level security;

create table allowed_domains (
  domain text primary key,
  school_name text not null,
  enabled boolean not null default true
);
alter table allowed_domains enable row level security;
```

### 4.5 RLS policies

The consent policy is the most important one.

```sql
create policy "sponsors read consenting students"
on profiles for select
using (
  (auth.jwt() ->> 'user_role') in ('sponsor','organizer','admin')
  and role = 'student'
  and share_with_sponsors = true
);

create policy "students read own row"
on profiles for select
using (auth.uid() = id);

create policy "students update own row"
on profiles for update
using (auth.uid() = id)
with check (auth.uid() = id);
```

Remember two facts. The default value of `share_with_sponsors` is false, so
silence means no consent. An `update` policy needs the same care as a `select`
policy. A weak `update` policy lets a student change another student's profile.

Put the role in the JWT with a Custom Access Token hook. Do not put the role in
`user_metadata`. A user can write to `user_metadata`. Then any user can become
a sponsor.

### 4.6 Edge Functions

This is the complete list of server code for this project.

| Function | Task |
|---|---|
| `invite-sponsor` | Check that the caller is an admin. Send an invitation. |
| `bulk-invite-sponsors` | Do the same task for a CSV file of 50 to 100 sponsors. |
| `set-user-role` | Let an admin set the role of a user. |

Each function checks the JWT and the role of the caller first. The service role
key is in the environment variables of the Edge Functions. The key must never
go to a browser.

### 4.7 Domain restriction

Use the Supabase before-user-created hook. Write it as a Postgres function. The
function reads the `allowed_domains` table.

The hook runs before the insert into `auth.users`. It works for OAuth and for
the magic link. An error from the hook stops the signup.

Compare the end of the domain. Do not compare the full domain. `sm.yale.edu`
and `cs.stanford.edu` are real domains. Do the same check in the browser. This
gives the user a clear error message.

### 4.8 Email

The Supabase SMTP server has a low rate limit. It is not for production. It
cannot send 50 to 100 invitations.

Set a real email service before you send the first invitation. Resend and
Postmark are both good.

---

## 5. Open questions

Answer these questions before Phase 2 starts.

1. What is the date, the venue, and the address of the event?
2. What is the final sponsor list? Do we have the logo files and permission to
   show them?
3. What are the organizer names, headshots, and bios?
4. Which schools do we invite? This gives us the `allowed_domains` table.
5. What is the domain name? Which registrar do we use?
6. Do sponsors see student resumes, or only links?
7. Who holds the admin account and the Supabase billing seat?
