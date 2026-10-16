"use client";

import { useState } from "react";
import { SpotifyIcon } from "./Icons";

// Embeds load ~1 MB of third-party JS each, so they only load when someone asks for them

export function spotifyEmbedUrl(url: string | null | undefined) {
  const match = url?.match(/open\.spotify\.com\/(?:intl-\w+\/)?(artist|album|track|playlist)\/([A-Za-z0-9]+)/);
  return match ? `https://open.spotify.com/embed/${match[1]}/${match[2]}?theme=0` : null;
}

export function youTubeId(url: string | null | undefined) {
  return url?.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/)?.[1] ?? null;
}

export function SpotifyPlayer({ url, name }: { url: string; name: string }) {
  const [active, setActive] = useState(false);
  const embed = spotifyEmbedUrl(url);
  if (!embed) return null;

  if (active) {
    return (
      <iframe
        title={`${name} på Spotify`}
        src={embed}
        height={352}
        className="w-full rounded-3xl border-0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      />
    );
  }
  return (
    <button
      type="button"
      onClick={() => setActive(true)}
      className="flex w-full items-center gap-4 rounded-full bg-grlGreen px-6 py-4 text-left text-lg font-extrabold text-white transition hover:scale-[1.02]"
    >
      <SpotifyIcon className="size-8 shrink-0" />
      Hør {name} på Spotify
    </button>
  );
}

export function VideoPlayer({ url, title }: { url: string; title: string }) {
  const [active, setActive] = useState(false);
  const id = youTubeId(url);
  if (!id) return null;

  return (
    <div className="relative aspect-video overflow-hidden rounded-3xl bg-black">
      {active ? (
        <iframe
          title={title}
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
          className="absolute inset-0 size-full border-0"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      ) : (
        <button type="button" onClick={() => setActive(true)} className="group absolute inset-0" aria-label={`Spill av ${title}`}>
          {/* eslint-disable-next-line @next/next/no-img-element -- YouTube already serves a sized thumbnail */}
          <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" className="size-full object-cover opacity-90" />
          <span className="absolute left-1/2 top-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-grlPink text-white transition group-hover:scale-110">
            <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 size-9" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
