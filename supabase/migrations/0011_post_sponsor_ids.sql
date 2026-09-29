-- Link a story to the partners it names.
--
-- The partner page at /sponsors/:sponsorId lists every story that carries the
-- partner id. The frontend held this list in src/content/blog.ts. The blog now
-- lives in this table, so the column moves here too.

alter table public.posts
  add column if not exists sponsor_ids text[] not null default '{}';

comment on column public.posts.sponsor_ids is
  'Sponsor ids from src/content/sponsors.ts. There is no foreign key.';

-- A partner page reads by this column, so index it.
create index if not exists posts_sponsor_ids_idx
  on public.posts using gin (sponsor_ids);

update public.posts set sponsor_ids =
  '{ferrovia-logistics,solstice-technologies,tidewater-resilience-fund}'
where slug = 'expo-opens-applications';

update public.posts set sponsor_ids =
  '{cascade-ai-labs,harborlight-foundation,halloway-and-reed,ferrovia-logistics}'
where slug = 'nine-domains-one-standard';

update public.posts set sponsor_ids =
  '{office-of-regional-innovation,copperfield-community-health,common-ground-alliance}'
where slug = 'what-new-haven-asked-for';

update public.posts set sponsor_ids =
  '{elmwood-venture-partners,harborlight-foundation,greenline-climate-trust}'
where slug = 'opportunity-not-prizes';

update public.posts set sponsor_ids =
  '{whitfield-university-research-office,lakeside-institute-for-data-science,bridgeview-academic-consortium}'
where slug = 'faculty-join-the-panels';

update public.posts set sponsor_ids =
  '{founders-bridge-collective,new-quad-ventures,northwind-energy-alliance}'
where slug = 'how-teams-are-formed';

update public.posts set sponsor_ids =
  '{cascade-ai-labs,carrow-public-interest-law,wellspring-health-partners}'
where slug = 'guardrails-for-sensitive-work';

-- Check the result. Expect 7 rows, and expect with_partners to equal 7.
select
  count(*) as total_posts,
  count(*) filter (where cardinality(sponsor_ids) > 0) as with_partners
from public.posts;
