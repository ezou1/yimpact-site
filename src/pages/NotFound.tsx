import { Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { buttonClassNames } from '../components/ui/Button';

export function NotFound() {
  return (
    <Layout title="Page not found · Yale Impact Exposition" description="This page does not exist.">
      <div className="mx-auto flex max-w-[720px] flex-col items-center px-6 py-24 text-center md:px-12">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-blue-500">Error 404</p>
        <h1 className="mt-2 text-[32px] font-semibold text-ink-900">This page does not exist.</h1>
        <p className="mt-4 text-base leading-[1.7] text-ink-700">The page moved, or the address is wrong.</p>
        <Link to="/" className={`${buttonClassNames('primary')} mt-8`}>
          Go to the home page
        </Link>
      </div>
    </Layout>
  );
}
