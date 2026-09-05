-- Move each seeded blog post into the past.
--
-- The read policy on public.posts hides a row until its published_at time
-- arrives. The first seed gave every post a future date, so the blog was
-- empty for every reader. A future date is still a good way to schedule a
-- story. It was the wrong choice for the demo content.
--
-- Migration 0009 now holds these same dates. This file repairs a database
-- that already ran the first version.

update public.posts set published_at = '2026-04-07T09:00:00-04:00'::timestamptz
where slug = 'expo-opens-applications';

update public.posts set published_at = '2026-05-05T09:00:00-04:00'::timestamptz
where slug = 'nine-domains-one-standard';

update public.posts set published_at = '2026-06-02T09:00:00-04:00'::timestamptz
where slug = 'what-new-haven-asked-for';

update public.posts set published_at = '2026-06-30T09:00:00-04:00'::timestamptz
where slug = 'opportunity-not-prizes';

update public.posts set published_at = '2026-07-21T09:00:00-04:00'::timestamptz
where slug = 'faculty-join-the-panels';

update public.posts set published_at = '2026-08-11T09:00:00-04:00'::timestamptz
where slug = 'how-teams-are-formed';

update public.posts set published_at = '2026-09-01T09:00:00-04:00'::timestamptz
where slug = 'guardrails-for-sensitive-work';

-- Check the result. Expect 7 rows, and expect visible_now to equal 7.
select
  count(*) as total_posts,
  count(*) filter (where is_published and published_at <= now()) as visible_now,
  count(*) filter (where is_lead) as lead_posts
from public.posts;
