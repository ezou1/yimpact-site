import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// A router navigation keeps the old scroll position by default, which lands a
// reader halfway down a story they have just opened.
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
