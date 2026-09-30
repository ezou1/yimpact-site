// Public files are referenced by absolute path in the content files, which is
// right at the site root but wrong when the site is served from a subpath —
// GitHub Pages serves this project at /<repo>/. Vite exposes that prefix as
// BASE_URL, so every public asset is resolved through here.
//
// Data URLs (a logo an organizer uploaded) and absolute URLs pass through
// untouched.
export function asset(path: string): string {
  if (/^(?:[a-z]+:)?\/\//i.test(path) || path.startsWith('data:')) {
    return path;
  }
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? '' : '/'}${path}`;
}
