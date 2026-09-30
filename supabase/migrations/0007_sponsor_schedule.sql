-- The sponsor schedule. A sponsor reads their own items only.
-- The organization details come from src/content/sponsors.ts, matched on
-- profiles.org_slug. There is no organization table.

create table public.sponsor_schedule_items (
  id uuid primary key default gen_random_uuid(),
  sponsor_id uuid not null references public.profiles on delete cascade,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  title text not null,
  location text,
  description text,
  check (ends_at > starts_at)
);
alter table public.sponsor_schedule_items enable row level security;

create index sponsor_schedule_owner_idx
  on public.sponsor_schedule_items (sponsor_id, starts_at);

revoke all on table public.sponsor_schedule_items from anon, authenticated;
grant select, insert, update, delete on table public.sponsor_schedule_items to authenticated;

create policy "sponsor reads own schedule" on public.sponsor_schedule_items
  for select to authenticated
  using (sponsor_id = (select auth.uid()) or (select app.is_admin()));

create policy "admin writes a schedule item" on public.sponsor_schedule_items
  for all to authenticated
  using ((select app.is_admin()))
  with check ((select app.is_admin()));
