import { useState } from 'react';

// The Yale wordmark supplied as an image, standing in for the word "Yale" in
// the masthead. The artwork is navy; the filter drives it to white so it reads
// on the brick bar. SVG is tried first, then PNG, then plain type — so the
// header never renders a broken image while the file is being added.
const SOURCES = ['/logos/yale-wordmark.svg', '/logos/yale-wordmark.png'];

export function Wordmark() {
  const [attempt, setAttempt] = useState(0);

  return (
    <span className="flex items-baseline gap-[0.28em] whitespace-nowrap text-base font-medium tracking-[-0.035em] text-white">
      {attempt < SOURCES.length ? (
        <img
          src={SOURCES[attempt]}
          alt="Yale"
          onError={() => setAttempt((current) => current + 1)}
          className="h-[0.82em] w-auto translate-y-[0.02em] [filter:brightness(0)_invert(1)]"
        />
      ) : (
        <span>Yale</span>
      )}
      <span>
        Impact <span className="accent-serif">Expo</span>
      </span>
    </span>
  );
}
