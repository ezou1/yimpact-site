-- The blog. The announcements account and an admin write here.
-- The form gives a title, a name, one image, and raw text. The table and the
-- trigger fill the rest.

create table public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text not null default 'Announcements'
    check (category in (
      'Campus', 'Partners', 'Research', 'New Haven', 'Opinion', 'Announcements')),
  kicker text not null default 'Expo 2027',
  published_at timestamptz not null default now(),
  author text not null,
  author_role text not null default 'Expo team',
  excerpt text not null default '',
  body_text text not null,
  cover_path text,
  cover_alt text not null default '',
  is_lead boolean not null default false,
  is_published boolean not null default true,
  created_by uuid references public.profiles,
  created_at timestamptz not null default now()
);
alter table public.posts enable row level security;

-- Only one story leads the Blog page.
create unique index posts_one_lead_uk on public.posts (is_lead) where is_lead;
create index posts_recent_idx on public.posts (published_at desc) where is_published;

revoke all on table public.posts from anon, authenticated;
grant select on table public.posts to anon, authenticated;
grant insert, update, delete on table public.posts to authenticated;

-- A crawler and a logged out reader both need this policy. Without it, the
-- blog page is empty for everybody who is not signed in.
create policy "anyone reads a published post" on public.posts
  for select to anon, authenticated
  using (is_published and published_at <= now());

create policy "publisher reads every post" on public.posts
  for select to authenticated
  using ((select app.is_publisher()));

create policy "publisher writes a post" on public.posts
  for all to authenticated
  using ((select app.is_publisher()))
  with check ((select app.is_publisher()));

create function public.posts_fill_defaults() returns trigger
language plpgsql security definer set search_path = ''
as $$
declare
  v_base text;
  v_n int := 1;
begin
  if coalesce(new.slug, '') = '' then
    v_base := trim(both '-' from regexp_replace(lower(new.title), '[^a-z0-9]+', '-', 'g'));
    v_base := coalesce(nullif(left(v_base, 60), ''), 'post');
    new.slug := v_base;
    while exists (select 1 from public.posts p where p.slug = new.slug and p.id <> new.id) loop
      v_n := v_n + 1;
      new.slug := v_base || '-' || v_n;
    end loop;
  end if;

  if coalesce(new.excerpt, '') = '' then
    new.excerpt := left(split_part(new.body_text, E'\n\n', 1), 240);
  end if;

  if new.created_by is null then
    new.created_by := (select auth.uid());
  end if;

  return new;
end;
$$;

create trigger posts_defaults
before insert or update on public.posts
for each row execute function public.posts_fill_defaults();
