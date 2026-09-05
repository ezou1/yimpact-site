import { useId, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { Button } from '../ui/Button';
import { Textarea } from '../ui/Input';
import { ErrorNote } from '../ui/Status';

interface MessageComposerProps {
  onSend(body: string): Promise<{ error: string | null }>;
  isSending: boolean;
}

export function MessageComposer({ onSend, isSending }: MessageComposerProps) {
  const id = useId();
  const boxRef = useRef<HTMLTextAreaElement>(null);
  const [body, setBody] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function send() {
    // A click is not the only route into this handler. Guard here, not on the
    // button, because Enter submits without a click.
    if (isSending) return;
    const text = body.trim();
    if (!text) return;

    const result = await onSend(text);
    if (result.error) {
      setError(result.error);
      return;
    }
    setError(null);
    setBody('');
    boxRef.current?.focus();
  }

  function handleKeyDown(keyEvent: KeyboardEvent<HTMLTextAreaElement>) {
    if (keyEvent.key === 'Enter' && !keyEvent.shiftKey) {
      keyEvent.preventDefault();
      void send();
    }
  }

  return (
    <form
      className="mt-4"
      onSubmit={(formEvent) => {
        formEvent.preventDefault();
        void send();
      }}
    >
      <label htmlFor={id} className="label block text-ink-400">
        Your message
      </label>
      <div className="mt-2">
        <Textarea
          id={id}
          ref={boxRef}
          rows={3}
          value={body}
          onChange={(changeEvent) => setBody(changeEvent.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter sends. Shift and Enter make a new line."
        />
      </div>

      {error ? <ErrorNote className="mt-3">{error}</ErrorNote> : null}

      <div className="mt-3 flex items-center gap-4">
        <Button type="submit" isDisabled={isSending || body.trim().length === 0}>
          {isSending ? 'Sending' : 'Send'}
        </Button>
        <p className="label text-ink-300">The team answers during term.</p>
      </div>
    </form>
  );
}
