-- Partners added through the portal.
--
-- These used to live in the localStorage of one browser, with the logo held
-- as a data URL. Nobody else saw them and a cleared cache lost them. They now
-- live here, and the logo goes to a bucket.
--
-- The seeded roster stays in src/content/sponsors.ts. This table holds only
-- the partners an organizer adds later. The Partners page joins the two.

create table public.added_sponsors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  domain text not null check (domain in (
    'corporate', 'government', 'law', 'tech', 'entrepreneurship',
    'academia', 'philanthropy', 'sustainability', 'healthcare')),
  -- Impact, 0 to 100. The Partners page turns this into a bubble diameter
  -- and into the tier label.
  impact int not null default 50 check (impact between 0 and 100),
  logo_path text,
  website_url text,
  created_by uuid references public.profiles,
  created_at timestamptz not null default now()
);
alter table public.added_sponsors enable row level security;

create index added_sponsors_recent_idx on public.added_sponsors (created_at desc);

-- Supabase gives every privilege on a new table to anon and authenticated.
revoke all on table public.added_sponsors from anon, authenticated;
grant select on table public.added_sponsors to anon, authenticated;
grant insert, update, delete on table public.added_sponsors to authenticated;

-- The partner roster is public. Every reader sees it.
create policy "anyone reads an added partner" on public.added_sponsors
  for select to anon, authenticated
  using (true);

create policy "admin writes an added partner" on public.added_sponsors
  for all to authenticated
  using ((select app.is_admin()))
  with check ((select app.is_admin()));

-- A partner logo is not a secret. Never put a resource secret in a bucket.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'sponsor-logos',
  'sponsor-logos',
  true,
  2097152,
  array['image/svg+xml', 'image/png', 'image/jpeg', 'image/webp']
)
on conflict (id) do nothing;

create policy "anyone reads a partner logo" on storage.objects
  for select to anon, authenticated
  using (bucket_id = 'sponsor-logos');

create policy "admin adds a partner logo" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'sponsor-logos' and (select app.is_admin()));

create policy "admin changes a partner logo" on storage.objects
  for update to authenticated
  using (bucket_id = 'sponsor-logos' and (select app.is_admin()))
  with check (bucket_id = 'sponsor-logos' and (select app.is_admin()));

create policy "admin removes a partner logo" on storage.objects
  for delete to authenticated
  using (bucket_id = 'sponsor-logos' and (select app.is_admin()));
