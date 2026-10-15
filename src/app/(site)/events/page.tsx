import type { Metadata } from "next";
import { fetchSanity, getSettings } from "@/lib/sanity/fetch";
import { EVENTS_QUERY } from "@/lib/sanity/queries";
import { PageTitle, SectionTitle } from "../_components/Heading";
import EventCard from "./EventCard";

export const metadata: Metadata = { title: "Events" };

export default async function Events() {
  const [settings, { current, past }] = await Promise.all([getSettings(), fetchSanity(EVENTS_QUERY)]);

  return (
    <>
      <PageTitle kicker={settings?.festival?.title}>Events og workshops</PageTitle>

      {current.length > 0 ? (
        <ul className="grid gap-12 sm:grid-cols-2 md:gap-x-12 lg:grid-cols-3">
          {current.map((event) => (
            <li key={event._id}>
              <EventCard event={event} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-3xl font-extrabold text-grlPink">Årets events kommer snart!</p>
      )}

      {past.length > 0 && (
        <details className="group mt-24">
          <summary className="cursor-pointer list-none marker:hidden">
            <SectionTitle action={<span className="text-lg font-extrabold text-grlGreen group-open:hidden">Vis {past.length} ▾</span>}>
              Tidligere events
            </SectionTitle>
          </summary>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">
            {past.map((event) => (
              <li key={event._id}>
                <EventCard event={event} sizes="(min-width: 768px) 20vw, 46vw" />
              </li>
            ))}
          </ul>
        </details>
      )}
    </>
  );
}
