-- Roles, profiles, and the approval gate.
-- Run this file first.

create schema if not exists app;
grant usage on schema app to anon, authenticated;

create type public.user_role as enum ('student', 'sponsor', 'admin', 'announcements');
create type public.member_status as enum ('pending', 'approved', 'rejected');

-- Set auto_approve_students to false when an admin must approve each student.
create table public.app_settings (
  key text primary key,
  value jsonb not null
);
alter table public.app_settings enable row level security;
revoke all on table public.app_settings from anon, authenticated;

insert into public.app_settings (key, value)
values ('auto_approve_students', 'true'::jsonb);

create table public.profiles (
  id uuid primary key references auth.users on delete cascade,
  role public.user_role not null default 'student',
  status public.member_status not null default 'pending',
  email text not null,
  full_name text not null default '',
  school text,
  program text,
  grad_year int check (grad_year between 2020 and 2040),
  bio text,
  linkedin_url text,
  portfolio_url text,
  org_slug text,
  approved_at timestamptz,
  approved_by uuid references auth.users,
  created_at timestamptz not null default now()
);
alter table public.profiles enable row level security;

comment on column public.profiles.org_slug is
  'A sponsor id from src/content/sponsors.ts. There is no foreign key.';

create index profiles_status_idx on public.profiles (status, created_at desc);

-- Supabase gives every privilege on a new table to anon and authenticated.
-- Remove all privileges first. Then give back only what is necessary.
revoke all on table public.profiles from anon, authenticated;
grant select on table public.profiles to authenticated;

-- RLS cannot limit a column. A column grant can.
-- Without this list, a student can set their own role to admin.
grant update (full_name, school, program, grad_year, bio, linkedin_url, portfolio_url)
  on table public.profiles to authenticated;

-- A definer function ignores RLS. A policy can call it and cannot recurse.
create function app.is_admin() returns boolean
language sql stable security definer set search_path = ''
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = (select auth.uid()) and p.role = 'admin'
  )
$$;

create function app.is_publisher() returns boolean
language sql stable security definer set search_path = ''
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = (select auth.uid())
      and p.role in ('admin', 'announcements')
  )
$$;

-- True for an admin, or for an approved student or sponsor.
-- The announcements role posts to the blog. It reads no secret.
create function app.is_approved_member() returns boolean
language sql stable security definer set search_path = ''
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = (select auth.uid())
      and (
        p.role = 'admin'
        or (p.role in ('student', 'sponsor') and p.status = 'approved')
      )
  )
$$;

-- A definer function keeps EXECUTE for PUBLIC. Remove it every time.
revoke execute on function app.is_admin(), app.is_publisher(),
  app.is_approved_member() from public;
grant execute on function app.is_admin(), app.is_publisher(),
  app.is_approved_member() to anon, authenticated;

create policy "read own profile" on public.profiles
  for select to authenticated
  using ((select auth.uid()) = id);

create policy "admin reads every profile" on public.profiles
  for select to authenticated
  using ((select app.is_admin()));

create policy "update own profile" on public.profiles
  for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

-- There is no insert policy. The trigger below makes each row.
-- The trigger reads the role from app_metadata. Only the service role key can
-- write app_metadata. A user can write user_metadata, so never trust it here.
create function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = ''
as $$
declare
  v_role public.user_role;
  v_auto boolean;
  v_status public.member_status;
begin
  v_role := coalesce((new.raw_app_meta_data ->> 'role')::public.user_role, 'student');

  select (s.value)::boolean into v_auto
  from public.app_settings s
  where s.key = 'auto_approve_students';

  if v_role in ('admin', 'announcements', 'sponsor') then
    v_status := 'approved';
  elsif coalesce(v_auto, false) then
    v_status := 'approved';
  else
    v_status := 'pending';
  end if;

  insert into public.profiles (
    id, role, status, email, full_name, school, program, grad_year,
    bio, linkedin_url, portfolio_url, org_slug, approved_at
  )
  values (
    new.id,
    v_role,
    v_status,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    new.raw_user_meta_data ->> 'school',
    new.raw_user_meta_data ->> 'program',
    -- A bad number must not stop the signup.
    nullif(regexp_replace(
      coalesce(new.raw_user_meta_data ->> 'grad_year', ''), '\D', '', 'g'), '')::int,
    new.raw_user_meta_data ->> 'bio',
    new.raw_user_meta_data ->> 'linkedin_url',
    new.raw_user_meta_data ->> 'portfolio_url',
    new.raw_app_meta_data ->> 'org_slug',
    case when v_status = 'approved' then now() end
  );

  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- An admin approves a member here. This is the only route that writes status.
create function public.approve_member(p_user_id uuid, p_approve boolean default true)
returns void
language plpgsql security definer set search_path = ''
as $$
begin
  if not app.is_admin() then
    raise exception 'not allowed' using errcode = '42501';
  end if;

  update public.profiles
  set status = case when p_approve then 'approved' else 'rejected' end,
      approved_at = case when p_approve then now() end,
      approved_by = (select auth.uid())
  where id = p_user_id;
end;
$$;

-- This function sits in the exposed public schema. A missed revoke lets an
-- anonymous caller approve any account.
revoke execute on function public.approve_member(uuid, boolean) from public, anon;
grant execute on function public.approve_member(uuid, boolean) to authenticated;

create function public.set_member_role(p_user_id uuid, p_role public.user_role)
returns void
language plpgsql security definer set search_path = ''
as $$
begin
  if not app.is_admin() then
    raise exception 'not allowed' using errcode = '42501';
  end if;

  update public.profiles set role = p_role where id = p_user_id;
end;
$$;

revoke execute on function public.set_member_role(uuid, public.user_role) from public, anon;
grant execute on function public.set_member_role(uuid, public.user_role) to authenticated;
