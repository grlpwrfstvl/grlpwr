"use client";

import { useSyncExternalStore } from "react";

const subscribe = (onChange: () => void) => {
  const id = setInterval(onChange, 30_000);
  return () => clearInterval(id);
};
// Minute resolution keeps the snapshot stable between renders
const nowMinute = () => Math.floor(Date.now() / 60_000);

/** "Nå!" while an item is on. Without an end time we assume it lasts an hour. */
export default function NowBadge({ start, end }: { start: string; end?: string | null }) {
  const minute = useSyncExternalStore(subscribe, nowMinute, () => null);
  if (minute === null) return null;

  const now = minute * 60_000;
  const startMs = new Date(start).getTime();
  const endMs = end ? new Date(end).getTime() : startMs + 60 * 60_000;
  if (now < startMs || now >= endMs) return null;

  return (
    <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-grlGreen px-2 py-0.5 align-middle text-xs font-extrabold uppercase tracking-wider text-white">
      <span className="size-2 animate-pulse rounded-full bg-white" /> Nå
    </span>
  );
}
