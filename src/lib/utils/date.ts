const TIME_ZONE = "Europe/Oslo";
const LOCALE = "nb-NO";

const format = (options: Intl.DateTimeFormatOptions) => (value: string | Date) =>
  new Intl.DateTimeFormat(LOCALE, { timeZone: TIME_ZONE, ...options }).format(new Date(value));

/** "20:15" */
export const formatTime = format({ hour: "2-digit", minute: "2-digit" });

/** "fredag 8. mai" */
export const formatDay = format({ weekday: "long", day: "numeric", month: "long" });

/** "8. mai" */
export const formatShortDate = format({ day: "numeric", month: "long" });

/** "2026-05-08" in Oslo time, for grouping */
export const osloDateKey = (value: string | Date) =>
  new Intl.DateTimeFormat("sv-SE", { timeZone: TIME_ZONE, year: "numeric", month: "2-digit", day: "2-digit" }).format(
    new Date(value),
  );

/** "8.–9. mai", "30. april – 1. mai" or the editor's own label */
export function festivalDates(festival: { startDate: string | null; endDate: string | null; dateLabel: string | null }) {
  if (festival.dateLabel) return festival.dateLabel;
  if (!festival.startDate) return null;
  // Dates are plain YYYY-MM-DD; noon UTC keeps them on the same day in Oslo
  const start = new Date(`${festival.startDate}T12:00:00Z`);
  const end = new Date(`${festival.endDate ?? festival.startDate}T12:00:00Z`);
  if (start.getTime() === end.getTime()) return formatShortDate(start);
  if (start.getUTCMonth() === end.getUTCMonth()) return `${start.getUTCDate()}.–${formatShortDate(end)}`;
  return `${formatShortDate(start)} – ${formatShortDate(end)}`;
}

/** The festival is over once its last day has passed in Oslo */
export function isFestivalOver(festival: { endDate: string | null } | null | undefined, now = new Date()) {
  return Boolean(festival?.endDate && osloDateKey(now) > festival.endDate);
}
