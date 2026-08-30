import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { event } from '../content/event';

export function Login() {
  return (
    <Layout
      title="Log in · Yale Impact Exposition"
      description="Sign in to the Yale Impact Exposition student and sponsor portal."
    >
      <div className="mx-auto max-w-[880px] px-6 py-16 md:px-12 md:py-24">
        <h1 className="text-center text-[32px] font-semibold text-ink-900">Log in</h1>
        <p className="mt-2 text-center text-base text-ink-700">The portal opens closer to the event.</p>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card className="flex flex-col items-start gap-4">
            <h2 className="text-lg font-semibold text-ink-900">Students</h2>
            <p className="text-sm leading-[1.7] text-ink-700">Sign-in uses your school email address.</p>
            <Button isDisabled aria-describedby="student-badge" className="w-full">
              Sign in with school email
            </Button>
            <Badge id="student-badge">Coming soon</Badge>
          </Card>

          <Card className="flex flex-col items-start gap-4">
            <h2 className="text-lg font-semibold text-ink-900">Sponsors and mentors</h2>
            <p className="text-sm leading-[1.7] text-ink-700">
              The team makes your account. An invitation comes by email.
            </p>
            <Button isDisabled aria-describedby="sponsor-badge" className="w-full">
              Sign in
            </Button>
            <Badge id="sponsor-badge">Coming soon</Badge>
          </Card>
        </div>

        <p className="mt-8 text-center text-sm text-ink-500">
          Portal access opens closer to the event. Write to{' '}
          <a
            href={`mailto:${event.contactEmail}`}
            className="rounded-[var(--radius-control)] font-semibold text-blue-500 hover:text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          >
            {event.contactEmail}
          </a>{' '}
          with questions.
        </p>
      </div>
    </Layout>
  );
}
