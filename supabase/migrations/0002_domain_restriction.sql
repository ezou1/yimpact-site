-- The Yale email restriction. Refer to BUILD_SPEC.md, section 4.7.
-- Make the staff accounts BEFORE you turn this hook on.

create table public.allowed_domains (
  domain text primary key,
  school_name text not null,
  enabled boolean not null default true
);
alter table public.allowed_domains enable row level security;
revoke all on table public.allowed_domains from anon, authenticated;

insert into public.allowed_domains (domain, school_name)
values ('yale.edu', 'Yale University');

-- The hook runs before the insert into auth.users. An error stops the signup.
-- Compare the end of the domain. Do not compare the full domain.
-- sm.yale.edu and som.yale.edu are real domains.
create function public.before_user_created_hook(event jsonb)
returns jsonb
language plpgsql stable set search_path = ''
as $$
declare
  v_email text := lower(event -> 'user' ->> 'email');
  v_role text := event -> 'user' -> 'raw_app_meta_data' ->> 'role';
  v_ok boolean;
begin
  -- A staff account carries a role in app_metadata. Only the service role key
  -- can write that. A staff address does not need to be a Yale address.
  if v_role is not null and v_role <> 'student' then
    return event;
  end if;

  select exists (
    select 1 from public.allowed_domains d
    where d.enabled
      and (v_email like ('%@' || d.domain) or v_email like ('%@%.' || d.domain))
  ) into v_ok;

  if not v_ok then
    return jsonb_build_object(
      'error', jsonb_build_object(
        'http_code', 400,
        'message', 'Use your Yale email address to register.'
      )
    );
  end if;

  return event;
end;
$$;

grant execute on function public.before_user_created_hook(jsonb) to supabase_auth_admin;
revoke execute on function public.before_user_created_hook(jsonb)
  from public, anon, authenticated;

grant usage on schema public to supabase_auth_admin;
grant select on table public.allowed_domains to supabase_auth_admin;

create policy "auth admin reads allowed domains" on public.allowed_domains
  for select to supabase_auth_admin using (true);
