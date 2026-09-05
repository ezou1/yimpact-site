import { Layout } from '../components/layout/Layout';
import { PageHeader } from '../components/ui/PageHeader';
import { Reveal } from '../components/ui/Reveal';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { event } from '../content/event';

export function Login() {
  return (
    <Layout
      title="Log in · Yale Impact Expo"
      description="Sign in to the Yale Impact Expo student and partner portal."
    >
      <PageHeader
        eyebrow="Portal"
        title="Log in"
        meta="The portal carries team submissions, mentor matching, judging assignments, and partner office-hour booking. It opens closer to the Expo."
      />

      <div className="mx-auto max-w-[1200px] px-6 pb-24 md:px-10">
        <Reveal>
          <div className="grid grid-cols-1 gap-px border border-ink-100 bg-ink-100 md:grid-cols-2">
            <div className="flex flex-col items-start gap-4 bg-white p-6">
              <p className="label text-ink-400">01</p>
              <h2 className="display-3">Students</h2>
              <p className="text-sm leading-[1.6] text-ink-500">
                Sign in with your Yale email to submit work, book mentor time, and claim partner office hours.
              </p>
              <Button isDisabled aria-describedby="student-badge" className="mt-auto w-full">
                Sign in with Yale email
              </Button>
              <Badge id="student-badge">Coming soon</Badge>
            </div>

            <div className="flex flex-col items-start gap-4 bg-white p-6">
              <p className="label text-ink-400">02</p>
              <h2 className="display-3">Partners and mentors</h2>
              <p className="text-sm leading-[1.6] text-ink-500">
                The team creates your account and sends an invitation. Partners use the portal for judging
                assignments and office-hour scheduling.
              </p>
              <Button isDisabled aria-describedby="partner-badge" className="mt-auto w-full">
                Sign in
              </Button>
              <Badge id="partner-badge">Coming soon</Badge>
            </div>
          </div>

          <p className="mt-6 max-w-[62ch] text-sm leading-[1.6] text-ink-500">
            Nothing here is needed to take part yet. Write to{' '}
            <a
              href={`mailto:${event.contactEmail}`}
              className="border-b border-ink-300 pb-0.5 text-ink-900 transition-colors duration-300 ease-out hover:border-ink-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
            >
              {event.contactEmail}
            </a>{' '}
            with any question in the meantime.
          </p>
        </Reveal>
      </div>
    </Layout>
  );
}
