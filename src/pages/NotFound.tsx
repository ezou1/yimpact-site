import { Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { buttonClassNames } from '../components/ui/Button';

export function NotFound() {
  return (
    <Layout pattern="notfound" title="Page not found · Yale Impact Expo" description="This page does not exist.">
      <div className="mx-auto max-w-[1200px] px-4 py-6 sm:px-6 md:px-10 md:py-10">
        <div className="haze px-5 py-16 sm:px-7 md:px-12 md:py-24">
        <p className="label text-ink-400">Error 404</p>
        <h1 className="display-1 mt-5 max-w-[16ch]">
          This page does not <span className="accent-serif">exist</span>.
        </h1>
        <p className="mt-6 max-w-[46ch] text-base leading-[1.6] text-ink-500">
          The page moved, or the address is wrong.
        </p>
        <Link to="/" className={`${buttonClassNames('secondary')} mt-8`}>
          Go to the home page
        </Link>
        </div>
      </div>
    </Layout>
  );
}
