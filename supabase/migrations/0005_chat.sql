-- Chat. Each member holds one conversation. An admin joins every conversation.

create table public.conversations (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null unique references public.profiles on delete cascade,
  subject text not null default 'Support',
  created_at timestamptz not null default now(),
  last_message_at timestamptz not null default now()
);
alter table public.conversations enable row level security;

create table public.messages (
  id bigint generated always as identity primary key,
  conversation_id uuid not null references public.conversations on delete cascade,
  sender_id uuid not null references public.profiles on delete cascade,
  body text not null check (length(body) between 1 and 4000),
  created_at timestamptz not null default now()
);
alter table public.messages enable row level security;

create index messages_thread_idx on public.messages (conversation_id, created_at);
create index conversations_recent_idx on public.conversations (last_message_at desc);

revoke all on table public.conversations from anon, authenticated;
revoke all on table public.messages from anon, authenticated;

grant select, insert on table public.conversations to authenticated;
grant select, insert on table public.messages to authenticated;

create function app.can_use_conversation(p_id uuid) returns boolean
language sql stable security definer set search_path = ''
as $$
  select exists (
    select 1 from public.conversations c
    where c.id = p_id
      and (c.member_id = (select auth.uid()) or app.is_admin())
  )
$$;

revoke execute on function app.can_use_conversation(uuid) from public;
grant execute on function app.can_use_conversation(uuid) to authenticated;

create policy "read own conversation" on public.conversations
  for select to authenticated
  using (member_id = (select auth.uid()) or (select app.is_admin()));

create policy "start own conversation" on public.conversations
  for insert to authenticated
  with check (member_id = (select auth.uid()) or (select app.is_admin()));

create policy "read a message in own conversation" on public.messages
  for select to authenticated
  using ((select app.can_use_conversation(conversation_id)));

create policy "send a message in own conversation" on public.messages
  for insert to authenticated
  with check (
    sender_id = (select auth.uid())
    and (select app.can_use_conversation(conversation_id))
  );

-- A message is permanent. There is no update policy and no delete policy.

create function public.touch_conversation() returns trigger
language plpgsql security definer set search_path = ''
as $$
begin
  update public.conversations
  set last_message_at = new.created_at
  where id = new.conversation_id;
  return new;
end;
$$;

create trigger messages_touch_conversation
after insert on public.messages
for each row execute function public.touch_conversation();
