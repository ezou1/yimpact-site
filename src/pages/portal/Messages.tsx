import { Layout } from '../../components/layout/Layout';
import { PageHeader } from '../../components/ui/PageHeader';
import { PortalNav } from '../../components/portal/PortalNav';
import { MessageThread } from '../../components/chat/MessageThread';
import { MessageComposer } from '../../components/chat/MessageComposer';
import { ErrorNote } from '../../components/ui/Status';
import { useConversation } from '../../hooks/useConversation';
import { useAuth } from '../../auth/useAuth';

// One thread. The other side is the Expo team.
export function Messages() {
  const { session } = useAuth();
  const { messages, status, send, isSending } = useConversation();

  return (
    <Layout
      pattern="login"
      title="Messages · Yale Impact Expo"
      description="Message the Yale Impact Expo team."
    >
      <PortalNav />
      <PageHeader
        eyebrow="Portal"
        title="Messages"
        meta="A direct line to the Expo team. Ask about registration, tracks, partner resources, or anything the FAQ does not answer."
      />

      <div className="mx-auto max-w-[820px] px-4 pb-8 sm:px-6 md:px-10">
        <div className="haze px-5 py-8 sm:px-7 md:px-10 md:py-12">
          {status === 'error' ? (
            <ErrorNote className="mb-4">The messages did not load. Reload the page.</ErrorNote>
          ) : null}

          <MessageThread
            messages={messages}
            status={status}
            currentUserId={session?.user.id ?? null}
            otherName="Expo team"
          />
          <MessageComposer onSend={send} isSending={isSending} />
        </div>
      </div>
    </Layout>
  );
}
