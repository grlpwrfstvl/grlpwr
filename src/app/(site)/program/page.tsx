import type { Metadata } from "next";
import { stegaClean } from "next-sanity";
import Link from "next/link";
import { fetchSanity, getSettings } from "@/lib/sanity/fetch";
import { PROGRAM_QUERY } from "@/lib/sanity/queries";
import { festivalDates, formatDay, formatTime, osloDateKey } from "@/lib/utils/date";
import { PageTitle } from "../_components/Heading";
import TicketButton from "../_components/TicketButton";
import NowBadge from "./NowBadge";

export const metadata: Metadata = { title: "Program" };

const CATEGORY_LABELS: Record<string, string> = {
  workshop: "Workshop",
  party: "Fest",
  talk: "Samtale",
  screening: "Visning",
};

export default async function ProgramPage() {
  const [settings, items] = await Promise.all([getSettings(), fetchSanity(PROGRAM_QUERY)]);
  const festival = settings?.festival;

  // Group by Oslo date; days outside the main festival (warm-ups, screenings) get their own heading
  const days = new Map<string, typeof items>();
  for (const item of items) {
    if (!item.time) continue;
    const key = osloDateKey(item.time);
    days.set(key, [...(days.get(key) ?? []), item]);
  }
  const isFestivalDay = (key: string) =>
    Boolean(festival?.startDate && festival.endDate && key >= festival.startDate && key <= festival.endDate);

  return (
    <>
      <PageTitle kicker={festival ? [festival.title, festivalDates(festival)].filter(Boolean).join(" · ") : undefined}>
        Program
      </PageTitle>

      {days.size === 0 ? (
        <p className="text-3xl font-extrabold text-grlPink">Programmet slippes snart – følg med!</p>
      ) : (
        <>
          {/* Jump between days without scrolling through everything */}
          <nav aria-label="Dager" className="no-scrollbar sticky top-16 z-20 -mx-4 mb-8 flex gap-2 overflow-x-auto bg-white/95 px-4 py-3 backdrop-blur md:top-0">
            {[...days.keys()].map((key) => (
              <a
                key={key}
                href={`#dag-${key}`}
                className={`shrink-0 rounded-full px-4 py-2 font-extrabold capitalize transition ${
                  isFestivalDay(key) ? "bg-grlPink text-white hover:bg-grlGreen" : "border-2 border-grlPink text-grlPink hover:bg-lightPink"
                }`}
              >
                {formatDay(`${key}T12:00:00Z`).split(" ")[0]} {Number(key.slice(8))}.
              </a>
            ))}
          </nav>

          <div className="grid gap-12 md:grid-cols-2 md:gap-x-12">
            {[...days.entries()].map(([key, dayItems]) => (
              <section key={key} id={`dag-${key}`} className="scroll-mt-36 md:scroll-mt-24">
                <h2 className="text-4xl font-extrabold capitalize text-grlPink md:text-5xl">
                  {formatDay(`${key}T12:00:00Z`).split(" ")[0]}
                </h2>
                <p className="text-xl font-bold text-grlGreen">
                  {formatDay(`${key}T12:00:00Z`).split(" ").slice(1).join(" ")}
                  {!isFestivalDay(key) && " · før festivalen"}
                </p>

                <ol className="mt-4 divide-y-2 divide-lightPink">
                  {dayItems.map((item) => {
                    const href = item.slug ? `/${item._type === "artist" ? "artists" : "events"}/${item.slug}` : null;
                    const category = item._type === "event" ? CATEGORY_LABELS[stegaClean(item.category) ?? ""] : null;
                    const content = (
                      <>
                        <span className="text-2xl font-extrabold tabular-nums text-grlPink md:text-3xl">{formatTime(item.time!)}</span>
                        <span>
                          <span className="block text-2xl font-extrabold leading-tight text-grlPink transition group-hover:text-grlGreen md:text-3xl">
                            {item.name}
                            <NowBadge start={item.time!} end={item.endTime} />
                          </span>
                          <span className="text-base font-bold text-gray-600">
                            {[item.endTime && `til ${formatTime(item.endTime)}`, item.place, category].filter(Boolean).join(" · ")}
                          </span>
                        </span>
                      </>
                    );
                    return (
                      <li key={item._id}>
                        {href ? (
                          <Link href={href} className="group grid grid-cols-[4.5rem_1fr] gap-3 py-4 md:grid-cols-[5.5rem_1fr]">
                            {content}
                          </Link>
                        ) : (
                          <div className="grid grid-cols-[4.5rem_1fr] gap-3 py-4 md:grid-cols-[5.5rem_1fr]">{content}</div>
                        )}
                      </li>
                    );
                  })}
                </ol>
              </section>
            ))}
          </div>
        </>
      )}

      <div className="mt-16 flex justify-center">
        <TicketButton festival={festival} />
      </div>
    </>
  );
}
