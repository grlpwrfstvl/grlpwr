"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const DAY = 24 * 60 * 60 * 1000;

/** "Om 42 dager!" until the festival starts. Rendered on the client so a cached page never shows a stale count. */
export default function Countdown({ startDate, className }: { startDate: string; className?: string }) {
  const days = useSyncExternalStore(
    subscribe,
    () => Math.ceil((new Date(`${startDate}T00:00:00+02:00`).getTime() - Date.now()) / DAY),
    () => null,
  );

  let text: string | null = null;
  if (days === 1) text = "I morgen!";
  else if (days === 0) text = "I dag!";
  else if (days !== null && days > 1) text = `Om ${days} dager!`;

  // Keep the line height reserved so nothing jumps when it appears
  return (
    <p className={className} aria-live="polite">
      {text ?? " "}
    </p>
  );
}
