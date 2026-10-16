import { defineQuery } from "next-sanity";
import { client } from "@/lib/sanity/client";

const CALENDAR_QUERY = defineQuery(`*[_type == $type && slug.current == $slug][0]{
  name,
  time,
  endTime,
  "place": coalesce(stage->name + ", " + stage->venue, stage->name, location),
  "city": festival->location
}`);

const SITE_URL = "https://www.grlpwrfstvl.no";

// 20260509T200000Z
const icsDate = (value: string) => new Date(value).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
const escape = (value: string) => value.replace(/([,;\\])/g, "\\$1").replace(/\n/g, "\\n");

export async function GET(_request: Request, { params }: { params: Promise<{ type: string; slug: string }> }) {
  const { type, slug } = await params;
  if (type !== "artist" && type !== "event") return new Response("Not found", { status: 404 });

  const item = await client.fetch(CALENDAR_QUERY, { type, slug }, { stega: false });
  if (!item?.time) return new Response("Not found", { status: 404 });

  const end = item.endTime ?? new Date(new Date(item.time).getTime() + 60 * 60_000).toISOString();
  const path = `/${type === "artist" ? "artists" : "events"}/${slug}`;
  const location = [item.place, item.city].filter(Boolean).join(", ");

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//GRL PWR FSTVL//NO",
    "BEGIN:VEVENT",
    `UID:${type}-${slug}@grlpwrfstvl.no`,
    `DTSTAMP:${icsDate(new Date().toISOString())}`,
    `DTSTART:${icsDate(item.time)}`,
    `DTEND:${icsDate(end)}`,
    `SUMMARY:${escape(`${item.name} – GRL PWR FSTVL`)}`,
    location && `LOCATION:${escape(location)}`,
    `URL:${SITE_URL}${path}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .filter(Boolean)
    .join("\r\n");

  return new Response(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${slug}.ics"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
