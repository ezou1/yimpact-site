import { useActionState, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { PageHeader } from '../components/ui/PageHeader';
import { Reveal } from '../components/ui/Reveal';
import { Button } from '../components/ui/Button';
import { buttonClassNames } from '../components/ui/Button';
import { Field } from '../components/ui/Field';
import { Input } from '../components/ui/Input';
import { ErrorNote } from '../components/ui/Status';
import { useAuth } from '../auth/useAuth';
import { event } from '../content/event';
import { useAdmin } from '../admin/AdminContext';

interface LoginState {
  error: string | null;
}

export function Login() {
  // The real account. Row Level Security answers to this one.
  const { status, signIn } = useAuth();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from;

  // The older passcode gate. It drives the add-a-partner control only.
  const { isAdmin, signIn: adminSignIn, signOut: adminSignOut } = useAdmin();
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState<string | null>(null);

  const [state, submit, isPending] = useActionState<LoginState, FormData>(
    async (_previous, form) => {
      const email = String(form.get('email') ?? '').trim();
      const password = String(form.get('password') ?? '');

      if (!email || !password) {
        return { error: 'Write your email address and your password.' };
      }

      return signIn(email, password);
    },
    { error: null },
  );

  function handlePasscodeSubmit(submitEvent: FormEvent) {
    submitEvent.preventDefault();
    if (adminSignIn(passcode)) {
      setPasscode('');
      setPasscodeError(null);
    } else {
      setPasscodeError('That passcode is not recognised.');
    }
  }

  // The role decides the destination. PortalIndex reads it and redirects.
  if (status === 'signedIn') {
    return <Navigate to={from ?? '/portal'} replace />;
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
        meta="Students sign in to edit a profile, read the partner resources, and message the team. Partners sign in to read their schedule and message the team."
      />

      <div className="mx-auto max-w-[1200px] px-4 pb-8 sm:px-6 md:px-10">
        <div className="haze px-5 py-8 sm:px-7 md:px-10 md:py-12">
        <Reveal>
          <div className="haze-inner grid grid-cols-1 gap-px overflow-hidden border border-bar/25 bg-bar/25 md:grid-cols-2">
            <div className="flex flex-col bg-white p-6">
              <p className="label text-ink-400">01</p>
              <h2 className="display-3 mt-4">Sign in</h2>
              <p className="mt-4 text-sm leading-[1.6] text-ink-500">
                One form for students, partners, and the team.
              </p>

              <form action={submit} className="mt-6 grid gap-5">
                <Field label="Email">
                  {({ id, describedBy }) => (
                    <Input
                      id={id}
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      aria-describedby={describedBy}
                    />
                  )}
                </Field>

                <Field label="Password">
                  {({ id, describedBy }) => (
                    <Input
                      id={id}
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      aria-describedby={describedBy}
                    />
                  )}
                </Field>

                {state.error ? <ErrorNote>{state.error}</ErrorNote> : null}

                <Button type="submit" isDisabled={isPending} className="w-full">
                  {isPending ? 'Signing in' : 'Sign in'}
                </Button>
              </form>

              <p className="mt-5 text-sm leading-[1.6] text-ink-500">
                New here?{' '}
                <Link
                  to="/signup"
                  className="border-b border-ink-300 pb-0.5 text-ink-900 transition-colors duration-300 ease-out hover:border-ink-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
                >
                  Register with your Yale email
                </Link>
                .
              </p>
            </div>

            <div className="flex flex-col bg-white p-6">
              <p className="label text-ink-400">02</p>
              <h2 className="display-3 mt-4">Partners and mentors</h2>
              <p className="mt-4 text-sm leading-[1.6] text-ink-500">
                Partners do not register here. The team makes your account and sends the details. Then
                sign in with the form on the left.
              </p>
              <p className="mt-4 text-sm leading-[1.6] text-ink-500">
                Write to us if you want to join the partner roster, or if you have lost your account
                details.
              </p>
              <a
                href={`mailto:${event.sponsorEmail}`}
                className="label mt-auto pt-6 text-ink-500 transition-colors duration-300 ease-out hover:text-ink-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
              >
                {event.sponsorEmail} →
              </a>
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
                  <button type="button" onClick={adminSignOut} className={buttonClassNames('secondary')}>
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handlePasscodeSubmit} className="mt-4 max-w-[420px]">
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
                {passcodeError ? (
                  <p role="alert" className="mt-3 text-xs text-ink-900">
                    {passcodeError}
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
            You do not need an account to read the site. The{' '}
            <Link
              to="/resources"
              className="border-b border-bar/45 pb-0.5 text-ink-900 transition-colors duration-300 ease-out hover:border-bar focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
            >
              resources page
            </Link>{' '}
            lists every partner offer. Sign in to see the contact details behind each one.
          </p>
        </Reveal>
        </div>
      </div>
    </Layout>
  );
}
