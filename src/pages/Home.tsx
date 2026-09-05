import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { Section } from '../components/ui/Section';
import { Reveal } from '../components/ui/Reveal';
import { buttonClassNames } from '../components/ui/Button';
import { EventDetailsBlock } from '../components/EventDetailsBlock';
import { SponsorLogoGrid } from '../components/SponsorLogoGrid';
import { OrganizerCard } from '../components/OrganizerCard';
import { Byline } from '../components/PostList';
import { event } from '../content/event';
import { domainLabels, domainOrder, sponsors } from '../content/sponsors';
import { organizers } from '../content/organizers';
import { tracks } from '../content/tracks';
import { pathways } from '../content/pathways';
import { faq } from '../content/faq';
import { postsByDate } from '../content/blog';

const inlineLink =
  'label text-ink-500 transition-colors duration-300 ease-out hover:text-ink-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500';

// The display line sets the last word of the name in the light serif.
function SerifTail({ text }: { text: string }) {
  const words = text.trim().split(' ');
  const tail = words.pop() ?? '';
  return (
    <>
      {words.join(' ')} <span className="accent-serif">{tail}</span>
    </>
  );
}

export function Home() {
  const featuredSponsors = sponsors.filter((sponsor) => sponsor.featured);
  const council = organizers.filter((organizer) => organizer.rank !== 'team').slice(0, 5);
  const latestPosts = postsByDate.slice(0, 3);

  return (
    <Layout title="Yale Impact Expo" description={event.tagline}>
      {/* The title screen keeps its air. Everything below it runs tighter. */}
      <div className="mx-auto max-w-[1200px] px-6 pb-20 pt-16 md:px-10 md:pb-28 md:pt-32">
        <Reveal>
          <p className="label text-ink-400">
            {event.dateLabel}
            <span className="px-2 text-ink-300">—</span>
            {event.venueAddress}
          </p>
          <h1 className="display-1 mt-8 max-w-[13ch]">
            <SerifTail text={event.name} />
          </h1>
          <p className="mt-8 max-w-[54ch] text-lg leading-[1.5] tracking-[-0.02em] text-ink-700">{event.tagline}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/students" className={buttonClassNames('primary')}>
              For students
            </Link>
            <a href={`mailto:${event.sponsorEmail}`} className={buttonClassNames('secondary')}>
              For sponsors
            </a>
          </div>
          <p className="mt-5 max-w-[54ch] text-sm leading-[1.55] text-ink-400">
            Students: watch the two-minute walkthrough and apply. Sponsors: write to us and we will send the partner
            brief for your domain.
          </p>
        </Reveal>
      </div>

      <Section index="01" eyebrow="Mission" heading="Opportunity, made something you can earn">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4 text-base leading-[1.6] text-ink-700">
            <p>{event.mission}</p>
            <p>
              Every year a great deal of serious thinking at Yale stops at the end of a seminar, because the student
              who did it had no route to a lab, a firm, a funder, or an agency who could carry it further. Some
              students arrive already holding those connections. Most do not.
            </p>
            <p>
              The Expo is our attempt to close that gap in the fairest way we know: put the work in front of the
              people who can advance it, and let its quality do the arguing.
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-px self-start border border-ink-100 bg-ink-100">
            {[
              { figure: '8', label: 'Project tracks' },
              { figure: '9', label: 'Partner domains' },
              { figure: '13', label: 'Weeks of mentorship' },
              { figure: 'Free', label: 'Cost to take part' },
            ].map((stat) => (
              <li key={stat.label} className="bg-white p-5">
                <p className="text-[2rem] font-medium leading-none tracking-[-0.04em] text-ink-900">{stat.figure}</p>
                <p className="label mt-3 text-ink-400">{stat.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section
        index="02"
        eyebrow="Tracks"
        heading="Eight tracks, and none of them require code"
        intro="Tracks organize judging, mentorship, and partner placement. A team might build an AI tool, audit an algorithm, write a policy memo, design a health intervention, or draft a New Haven pilot plan."
      >
        <ul className="grid gap-px border border-ink-100 bg-ink-100 sm:grid-cols-2">
          {tracks.map((track) => (
            <li key={track.id} className="bg-white p-5">
              <h3 className="text-base font-medium leading-[1.25] tracking-[-0.028em] text-ink-900">{track.name}</h3>
              <p className="mt-2 text-sm leading-[1.55] text-ink-700">{track.focus}</p>
              <p className="mt-2 text-xs leading-[1.55] text-ink-400">{track.examples}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        index="03"
        eyebrow="Awards"
        heading="We compete on opportunity, not prize money"
        intro="A cheque is spent by June. An introduction to the lab, the firm, or the agency that can carry your work forward changes what you are able to do next."
      >
        <ul className="border-t border-ink-100">
          {pathways.map((pathway, index) => (
            <li
              key={pathway.id}
              className="grid gap-1 border-b border-ink-100 py-3.5 sm:grid-cols-[40px_200px_minmax(0,1fr)] sm:gap-6"
            >
              <span className="label text-ink-300">{String(index + 1).padStart(2, '0')}</span>
              <span className="text-base leading-[1.4] tracking-[-0.025em] text-ink-900">{pathway.name}</span>
              <span className="text-sm leading-[1.55] text-ink-500">{pathway.summary}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section index="04" eyebrow="Partners" heading="Nine domains, one standard">
        <ul className="mb-8 flex flex-wrap gap-x-1 gap-y-1">
          {domainOrder.map((domain) => (
            <li key={domain}>
              <Link
                to="/sponsors"
                className="label inline-block border border-ink-100 px-3 py-2 text-ink-500 transition-colors duration-300 ease-out hover:border-ink-900 hover:text-ink-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              >
                {domainLabels[domain]}
              </Link>
            </li>
          ))}
        </ul>
        <SponsorLogoGrid sponsors={featuredSponsors} />
        <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          <Link to="/sponsors" className={inlineLink}>
            All {sponsors.length} partners →
          </Link>
          <a href={`mailto:${event.sponsorEmail}`} className={inlineLink}>
            Become a partner →
          </a>
        </p>
      </Section>

      <Section index="05" eyebrow="Logistics" heading="Event details">
        <EventDetailsBlock event={event} />
      </Section>

      <Section index="06" eyebrow="Team" heading="Who runs it">
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(190px,1fr))] gap-4">
          {council.map((organizer) => (
            <li key={organizer.id}>
              <OrganizerCard organizer={organizer} size="sm" />
            </li>
          ))}
        </ul>
        <p className="mt-6">
          <Link to="/team" className={inlineLink}>
            The full team →
          </Link>
        </p>
      </Section>

      <Section index="07" eyebrow="Blog" heading="From the newsroom">
        <ul className="grid gap-6 md:grid-cols-3">
          {latestPosts.map((post) => (
            <li key={post.slug}>
              <article className="border-t border-ink-100 pt-4">
                <p className="label text-ink-400">{post.kicker}</p>
                <h3 className="mt-2 text-base font-medium leading-[1.25] tracking-[-0.03em] text-ink-900">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="transition-colors duration-300 ease-out hover:text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
                  >
                    {post.title}
                  </Link>
                </h3>
                <Byline post={post} className="mt-3" />
              </article>
            </li>
          ))}
        </ul>
        <p className="mt-6">
          <Link to="/blog" className={inlineLink}>
            All coverage →
          </Link>
        </p>
      </Section>

      <Section index="08" eyebrow="FAQ" heading="Questions">
        <div className="border-t border-ink-100">
          {faq.map((item) => (
            <details key={item.id} className="group border-b border-ink-100 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-base leading-[1.4] tracking-[-0.025em] text-ink-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500">
                {item.question}
                <ChevronDown
                  className="h-4 w-4 flex-shrink-0 text-ink-400 transition-transform duration-300 ease-out group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="mt-3 max-w-[68ch] text-sm leading-[1.6] text-ink-500">{item.answer}</p>
            </details>
          ))}
        </div>
      </Section>

      <Section index="09" eyebrow="Contact" heading="Get in touch">
        <div className="grid gap-6 border-t border-ink-100 pt-6 sm:grid-cols-2">
          <div>
            <p className="label text-ink-400">Students</p>
            <p className="mt-2 max-w-[46ch] text-sm leading-[1.6] text-ink-700">
              Start with the walkthrough, then write to us with anything the FAQ does not answer.
            </p>
            <Link to="/students" className={`${buttonClassNames('secondary')} mt-4`}>
              How to get involved
            </Link>
          </div>
          <div>
            <p className="label text-ink-400">Sponsors and partners</p>
            <p className="mt-2 max-w-[46ch] text-sm leading-[1.6] text-ink-700">
              Tell us your domain and we will send the partner brief, the judging model, and the track placements
              still open.
            </p>
            <a href={`mailto:${event.sponsorEmail}`} className={`${buttonClassNames('primary')} mt-4`}>
              {event.sponsorEmail}
            </a>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
