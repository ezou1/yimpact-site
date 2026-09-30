-- The resources directory and its gate.
-- This is the security critical migration. Read the note before you change it.
--
-- The access details live in a second table. An anonymous reader holds no
-- privilege on that table, so the request fails before RLS runs. A new secret
-- column is gated on the day someone adds it.
--
-- Do not move a secret column into public.resources. Do not hide a field in
-- the browser and call it gated. Anything the browser gets is readable in the
-- developer tools.

create type public.resource_kind as enum (
  'contact', 'office_hours', 'promo_code', 'tool_credit', 'link', 'mentor');

create type public.resource_owner_kind as enum ('org', 'person');

-- Every reader can read a published row. Do not put a secret in this table.
create table public.resources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  kind public.resource_kind not null,
  owner_kind public.resource_owner_kind not null,
  org_slug text,
  org_name text,
  person_name text,
  person_title text,
  person_affiliation text,
  summary text not null default '',
  domain text,
  is_published boolean not null default true,
  sort_order int not null default 100,
  created_at timestamptz not null default now(),
  constraint resources_owner_ck check (
    (owner_kind = 'org'
      and org_slug is not null
      and org_name is not null
      and person_name is null)
    or
    (owner_kind = 'person'
      and person_name is not null
      and org_slug is null)
  ),
  -- Stop an admin who pastes an address or a link into a public field.
  constraint resources_summary_clean_ck check (summary !~* '(@|https?://)'),
  constraint resources_title_clean_ck check (title !~* '(@|https?://)')
);
alter table public.resources enable row level security;

comment on column public.resources.summary is
  'Every reader sees this text. Do not write an address, a code, or a link here.';
comment on column public.resources.org_slug is
  'A sponsor id from src/content/sponsors.ts. There is no foreign key.';

-- Only an approved member reads this table. An anonymous reader gets nothing.
create table public.resource_secrets (
  resource_id uuid primary key references public.resources on delete cascade,
  contact_email text,
  contact_phone text,
  booking_url text,
  promo_code text,
  redeem_url text,
  instructions text,
  expires_on date,
  updated_at timestamptz not null default now()
);
alter table public.resource_secrets enable row level security;

-- Supabase gives every privilege on a new table to anon and authenticated.
revoke all on table public.resources from anon, authenticated;
revoke all on table public.resource_secrets from anon, authenticated;

grant select on table public.resources to anon, authenticated;
grant insert, update, delete on table public.resources to authenticated;

-- anon gets no privilege here at all. PostgREST answers 403.
grant select, insert, update, delete on table public.resource_secrets to authenticated;

create index resources_sort_idx on public.resources (sort_order, title)
  where is_published;

create policy "anyone reads a published resource" on public.resources
  for select to anon, authenticated
  using (is_published);

create policy "admin writes a resource" on public.resources
  for all to authenticated
  using ((select app.is_admin()))
  with check ((select app.is_admin()));

create policy "approved member reads a secret" on public.resource_secrets
  for select to authenticated
  using ((select app.is_approved_member()));

create policy "admin writes a secret" on public.resource_secrets
  for all to authenticated
  using ((select app.is_admin()))
  with check ((select app.is_admin()));
