interface VideoEmbedProps {
  videoId: string;
  title: string;
}

// The walkthrough player. Until the team sets a video id in
// `src/content/students.ts`, a ruled placeholder holds the same frame so the
// page never renders a broken player.
export function VideoEmbed({ videoId, title }: VideoEmbedProps) {
  if (!videoId) {
    return (
      <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 border border-ink-100 bg-ink-50 px-6 text-center">
        <p className="label text-ink-400">Walkthrough</p>
        <p className="max-w-[38ch] text-sm leading-[1.55] text-ink-500">
          The video walkthrough is being recorded. It appears here as soon as the team publishes it.
        </p>
      </div>
    );
  }

  return (
    <div className="aspect-video w-full border border-ink-100 bg-ink-900">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        className="h-full w-full"
      />
    </div>
  );
}
