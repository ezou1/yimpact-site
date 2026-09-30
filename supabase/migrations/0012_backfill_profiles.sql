-- Make a profile row for each account that does not have one.
--
-- The trigger in 0001 makes a profile row for each new account. An account
-- made BEFORE that migration ran has no row. The portal then waits for a
-- profile that never arrives, and the page stays empty.
--
-- This file repairs those accounts. It is safe to run more than once.

insert into public.profiles (id, role, status, email, full_name, school, program, grad_year)
select
  u.id,
  coalesce((u.raw_app_meta_data ->> 'role')::public.user_role, 'student'),
  case
    when coalesce((u.raw_app_meta_data ->> 'role')::public.user_role, 'student')
         in ('admin', 'announcements', 'sponsor') then 'approved'::public.member_status
    when (select (s.value)::boolean from public.app_settings s
          where s.key = 'auto_approve_students') then 'approved'::public.member_status
    else 'pending'::public.member_status
  end,
  u.email,
  coalesce(u.raw_user_meta_data ->> 'full_name', ''),
  u.raw_user_meta_data ->> 'school',
  u.raw_user_meta_data ->> 'program',
  nullif(regexp_replace(
    coalesce(u.raw_user_meta_data ->> 'grad_year', ''), '\D', '', 'g'), '')::int
from auth.users u
where not exists (select 1 from public.profiles p where p.id = u.id);

-- Check the result. accounts and profiles must be the same number.
select
  (select count(*) from auth.users) as accounts,
  (select count(*) from public.profiles) as profiles;
