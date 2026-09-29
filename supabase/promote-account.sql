-- Make a real admin, sponsor, or announcements account.
--
-- This is the simple route for local tests. It needs no service role key.
-- Register at /signup first, then run the statement you need below.
--
-- The SQL Editor runs as the database owner, so it ignores Row Level Security.
-- That is why a plain update works here and fails from the browser.
--
-- The role takes effect when the page next reads the profile row. Reload the
-- site after you run this.

-- 1. Check who exists, and what role each account holds.
select email, role, status, org_slug, created_at
from public.profiles
order by created_at desc;

-- 2. Make yourself an admin. Change the address to your own.
update public.profiles
set role = 'admin', status = 'approved'
where email = 'eric.zou@yale.edu';

-- 3. Make a sponsor account. Register a second address first.
--    org_slug must match an id in src/content/sponsors.ts.
-- update public.profiles
-- set role = 'sponsor', status = 'approved', org_slug = 'ferrovia-logistics'
-- where email = 'YOUR-SECOND-ADDRESS@yale.edu';

-- 4. Make an announcements account. It posts to the blog and nothing else.
-- update public.profiles
-- set role = 'announcements', status = 'approved'
-- where email = 'YOUR-THIRD-ADDRESS@yale.edu';

-- 5. Give the sponsor account something to read in the partner portal.
--    Take the id from the query in step 1.
-- insert into public.sponsor_schedule_items
--   (sponsor_id, starts_at, ends_at, title, location)
-- values
--   ('THE-SPONSOR-PROFILE-ID', '2027-04-17T09:15:00-04:00',
--    '2027-04-17T09:45:00-04:00', 'Opening remarks', 'Auditorium'),
--   ('THE-SPONSOR-PROFILE-ID', '2027-04-17T10:45:00-04:00',
--    '2027-04-17T12:15:00-04:00', 'Judging block one', 'Exhibit Hall');

-- To test the approval queue, turn automatic approval off, then register a
-- new student and approve it at /portal/admin.
-- update public.app_settings set value = 'false'::jsonb
-- where key = 'auto_approve_students';
