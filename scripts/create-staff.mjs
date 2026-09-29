// Make the sponsor account, the admin account, and the announcements account.
// SQL cannot make a user, so this script calls the Admin API.
//
// Run it on your own machine only. The service role key ignores every policy.
// Never commit the key. Never put it in a VITE_ variable.
//
// Run these accounts BEFORE you turn the before-user-created hook on. The hook
// blocks an address that is not a Yale address.
//
// Usage:
//   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node scripts/create-staff.mjs

import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error('Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.');
  process.exit(1);
}

// Check the key before the first request. The anon key gives a confusing
// "not allowed" error much later, and the cause is hard to see.
function roleOfKey(value) {
  // A new project uses sb_secret_... and sb_publishable_... instead of a token.
  if (value.startsWith('sb_secret_')) return 'service_role';
  if (value.startsWith('sb_publishable_')) return 'anon';

  const parts = value.split('.');
  if (parts.length !== 3) return 'unknown';

  try {
    const body = Buffer.from(parts[1], 'base64url').toString('utf8');
    return JSON.parse(body).role ?? 'unknown';
  } catch {
    return 'unknown';
  }
}

const role = roleOfKey(key);
if (role !== 'service_role') {
  console.error(
    `That key has the role "${role}". This script needs the service role key.`,
  );
  console.error('Get it in the dashboard: Project Settings, then API, then service_role.');
  process.exit(1);
}

const admin = createClient(url, key, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// Change each password before you run this.
const staff = [
  {
    email: 'admin@yaleimpactexpo.org',
    password: process.env.ADMIN_PASSWORD ?? 'change-me-admin',
    app_metadata: { role: 'admin' },
  },
  {
    email: 'news@yaleimpactexpo.org',
    password: process.env.NEWS_PASSWORD ?? 'change-me-news',
    app_metadata: { role: 'announcements' },
  },
  {
    email: 'partner@ferrovia.example',
    password: process.env.SPONSOR_PASSWORD ?? 'change-me-sponsor',
    app_metadata: { role: 'sponsor', org_slug: 'ferrovia-logistics' },
    user_metadata: { full_name: 'Dana Whitlock' },
  },
];

for (const person of staff) {
  const { data, error } = await admin.auth.admin.createUser({
    email: person.email,
    password: person.password,
    email_confirm: true,
    app_metadata: person.app_metadata,
    user_metadata: person.user_metadata ?? {},
  });

  if (error) {
    console.error(`${person.email}: ${error.message}`);
    continue;
  }

  console.log(`${person.email}: ${data.user.id} (${person.app_metadata.role})`);
}

console.log('Done. Now seed the sponsor schedule with the sponsor user id.');
