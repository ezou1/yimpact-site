import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { PageHeader } from '../components/ui/PageHeader';
import { Reveal } from '../components/ui/Reveal';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { buttonClassNames } from '../components/ui/Button';
import { event } from '../content/event';
import { useAdmin } from '../admin/AdminContext';

export function Login() {
  const { isAdmin, signIn, signOut } = useAdmin();
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(submitEvent: FormEvent) {
    submitEvent.preventDefault();
    if (signIn(passcode)) {
      setPasscode('');
      setError(null);
    } else {
      setError('That passcode is not recognised.');
    }
  }

  return (
    <Layout
      pattern="login"
      title="Log in · Yale Impact Expo"
      description="Sign in to the Yale Impact Expo student, partner, and organizer portal."
    >
      <PageHeader
        eyebrow="Portal"
        title="Log in"
        meta="The portal carries team submissions, mentor matching, judging assignments, and partner office-hour booking. It opens closer to the Expo."
      />

      <div className="mx-auto max-w-[1200px] px-4 pb-8 sm:px-6 md:px-10">
        <div className="haze px-5 py-8 sm:px-7 md:px-10 md:py-12">
        <Reveal>
          <div className="haze-inner grid grid-cols-1 gap-px overflow-hidden border border-bar/25 bg-bar/25 md:grid-cols-2">
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

          {/* Organizer access. See src/admin/AdminContext.tsx — this is a local
              demo gate, not authentication. */}
          <div className="haze-inner mt-6 border border-bar/25 p-6">
            <p className="label text-ink-400">03</p>
            <h2 className="display-3 mt-3">Organizers</h2>

            {isAdmin ? (
              <div className="mt-4">
                <p className="text-sm leading-[1.6] text-ink-500">
                  Signed in as an organizer. The Partners page now shows the add-a-partner control.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link to="/sponsors" className={buttonClassNames('primary')}>
                    Go to Partners
                  </Link>
                  <button type="button" onClick={signOut} className={buttonClassNames('secondary')}>
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-4 max-w-[420px]">
                <p className="text-sm leading-[1.6] text-ink-500">
                  Organizers sign in here to add partners to the field.
                </p>
                <label htmlFor="admin-passcode" className="label mt-5 block text-ink-400">
                  Organizer passcode
                </label>
                <div className="mt-2 flex flex-wrap gap-2">
                  <input
                    id="admin-passcode"
                    type="password"
                    value={passcode}
                    onChange={(changeEvent) => setPasscode(changeEvent.target.value)}
                    className="min-w-0 flex-1 border border-bar/45 px-3 py-2.5 text-sm text-ink-900 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-500"
                  />
                  <button type="submit" className={buttonClassNames('primary')}>
                    Sign in
                  </button>
                </div>
                {error ? (
                  <p role="alert" className="mt-3 text-xs text-ink-900">
                    {error}
                  </p>
                ) : null}
                <p className="mt-4 text-xs leading-[1.55] text-ink-400">
                  This gate runs in the browser and protects nothing. It exists so the team can try the
                  add-a-partner flow before the backend exists.
                </p>
              </form>
            )}
          </div>

          <p className="mt-6 max-w-[62ch] text-sm leading-[1.6] text-ink-500">
            Nothing here is needed to take part yet. Write to{' '}
            <a
              href={`mailto:${event.contactEmail}`}
              className="border-b border-bar/45 pb-0.5 text-ink-900 transition-colors duration-300 ease-out hover:border-bar focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
            >
              {event.contactEmail}
            </a>{' '}
            with any question in the meantime.
          </p>
        </Reveal>
        </div>
      </div>
    </Layout>
  );
}
