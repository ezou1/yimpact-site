-- The access token hook puts the role and the status in the token.
-- The user interface reads these claims. The security boundary does not.
-- Each policy calls an app helper, which reads the table. Refer to risk R4 in
-- the build plan: a claim is stale until the token refreshes.

create function public.custom_access_token_hook(event jsonb)
returns jsonb
language plpgsql stable set search_path = ''
as $$
declare
  v_claims jsonb;
  v_role text;
  v_status text;
begin
  select p.role::text, p.status::text into v_role, v_status
  from public.profiles p
  where p.id = (event ->> 'user_id')::uuid;

  v_claims := coalesce(event -> 'claims', '{}'::jsonb);
  v_claims := jsonb_set(v_claims, '{user_role}', to_jsonb(coalesce(v_role, 'student')));
  v_claims := jsonb_set(v_claims, '{user_status}', to_jsonb(coalesce(v_status, 'pending')));

  return jsonb_set(event, '{claims}', v_claims);
end;
$$;

grant usage on schema public to supabase_auth_admin;
grant execute on function public.custom_access_token_hook(jsonb) to supabase_auth_admin;
revoke execute on function public.custom_access_token_hook(jsonb)
  from public, anon, authenticated;

grant select on table public.profiles to supabase_auth_admin;

create policy "auth admin reads profiles" on public.profiles
  for select to supabase_auth_admin using (true);
