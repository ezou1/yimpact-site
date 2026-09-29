import { useEffect, useRef } from 'react';
import type { MessageRow } from '../../types/db';
import { EmptyNote, PendingLabel } from '../ui/Status';
import type { LoadStatus } from '../../hooks/usePosts';

const timeFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
});

interface MessageThreadProps {
  messages: MessageRow[];
  status: LoadStatus;
  currentUserId: string | null;
  otherName: string;
}

export function MessageThread({
  messages,
  status,
  currentUserId,
  otherName,
}: MessageThreadProps) {
  const listRef = useRef<HTMLOListElement>(null);

  // Scroll the container, not the window. scrollIntoView pulls the whole page
  // past the sticky header on every message.
  useEffect(() => {
    const node = listRef.current;
    if (node) node.scrollTo({ top: node.scrollHeight });
  }, [messages.length]);

  if (status === 'loading') {
    return (
      <div className="border border-ink-100 p-4">
        <PendingLabel>Loading messages</PendingLabel>
      </div>
    );
  }

  return (
    <ol
      ref={listRef}
      role="log"
      aria-live="polite"
      aria-relevant="additions"
      aria-label="Messages"
      className="flex h-[420px] flex-col gap-3 overflow-y-auto border border-ink-100 p-4"
    >
      {messages.length === 0 ? (
        <li>
          <EmptyNote>No messages yet. Write the first one below.</EmptyNote>
        </li>
      ) : null}

      {messages.map((message) => {
        const isOwn = message.sender_id === currentUserId;
        return (
          <li
            key={message.id}
            className={`max-w-[52ch] p-3 ${
              isOwn ? 'ml-auto border border-ink-900 bg-white' : 'border border-ink-100 bg-ink-50'
            }`}
          >
            <p className="label text-ink-400">
              <span className="sr-only">{isOwn ? 'You wrote' : `${otherName} wrote`}</span>
              <span aria-hidden="true">{isOwn ? 'You' : otherName}</span>
            </p>
            <p className="mt-2 whitespace-pre-wrap text-sm leading-[1.6] text-ink-900">
              {message.body}
            </p>
            <time
              dateTime={message.created_at}
              className="mt-2 block font-mono text-xs tracking-[0.02em] text-ink-400"
            >
              {timeFormatter.format(new Date(message.created_at))}
            </time>
          </li>
        );
      })}
    </ol>
  );
}
