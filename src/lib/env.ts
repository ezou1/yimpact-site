// Read the two Supabase values. Fail early with a clear message, because an
// undefined URL gives a confusing network error much later.
//
// Write each name in full. Vite replaces a literal `import.meta.env.VITE_NAME`
// at build time. It does not replace a lookup with a variable key, so a
// dynamic read gives undefined in the built site.

function need(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(`${name} is missing. Copy .env.example to .env.local.`);
  }
  return value;
}

export const supabaseUrl = need(import.meta.env.VITE_SUPABASE_URL, 'VITE_SUPABASE_URL');
export const supabaseAnonKey = need(
  import.meta.env.VITE_SUPABASE_ANON_KEY,
  'VITE_SUPABASE_ANON_KEY',
);
