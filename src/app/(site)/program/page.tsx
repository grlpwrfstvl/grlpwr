import Link from 'next/link';
import { getEvents, getArtists, getHome } from '@/lib/sanity/queries';
import { getOsloDateParts } from '@/lib/utils/date';
import type { Artist } from '../../../../types/Artist';
import type { Eventer } from '../../../../types/Eventer';

type ProgramItem = {
  id: string;
  time: string;
  title: string;
  href?: string;
  sortMinutes: number;
};

type ProgramDay = {
  day: string;
  date: string;
  dayOfMonth: number;
  items: ProgramItem[];
};

function buildArtistProgramItem(artist: Artist, festivalYear: number): (ProgramItem & { day: number }) | null {
  if (!artist.time) {
    return null;
  }

  const date = new Date(artist.time);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  const parts = getOsloDateParts(date);
  const isFestivalDate =
    parts.year === festivalYear &&
    parts.month === 5;

  if (!isFestivalDate) {
    return null;
  }

  const time = `${String(parts.hour).padStart(2, '0')}:${String(parts.minute).padStart(2, '0')}`;

  return {
    id: `artist-${artist._id}`,
    day: parts.day,
    time,
    title: artist.name,
    href: artist.slug ? `/artists/${artist.slug}` : undefined,
    sortMinutes: parts.hour * 60 + parts.minute,
  };
}

function buildEventProgramItem(eventer: Eventer, festivalYear: number): (ProgramItem & { day: number }) | null {
  if (!eventer.time) {
    return null;
  }

  const date = new Date(eventer.time);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  const parts = getOsloDateParts(date);
  const isFestivalDate =
    parts.year === festivalYear &&
    parts.month === 5;

  if (!isFestivalDate) {
    return null;
  }

  const time = `${String(parts.hour).padStart(2, '0')}:${String(parts.minute).padStart(2, '0')}`;

  return {
    id: `event-${eventer._id}`,
    day: parts.day,
    time,
    title: eventer.name,
    href: eventer.slug ? `/events/${eventer.slug}` : undefined,
    sortMinutes: parts.hour * 60 + parts.minute,
  };
}

export default async function ProgramPage() {
  const [homeResult, artists, events] = await Promise.all([getHome(), getArtists(), getEvents()]);
  const homeData = homeResult[0];

  const festivalYear = homeData.eventYear ?? new Date().getFullYear();
  const ticketsLink = homeData.ticketsLink ?? 'https://checkout.ebillett.no/178/events/151120/purchase/setup';

  const FESTIVAL_DAYS: Array<Omit<ProgramDay, 'items'>> = homeData.festivalDays?.length
    ? homeData.festivalDays.map((d) => ({ day: d.dayName, date: d.displayDate, dayOfMonth: d.dayOfMonth }))
    : [
        { day: 'Fredag', date: '8. mai', dayOfMonth: 8 },
        { day: 'Lørdag', date: '9. mai', dayOfMonth: 9 },
      ];

  const validDays = new Set(FESTIVAL_DAYS.map((d) => d.dayOfMonth));
  const itemsByDay: Record<number, ProgramItem[]> = {};
  for (const d of FESTIVAL_DAYS) {
    itemsByDay[d.dayOfMonth] = [];
  }

  artists.forEach((artist) => {
    const item = buildArtistProgramItem(artist, festivalYear);
    if (item && validDays.has(item.day)) {
      itemsByDay[item.day].push(item);
    }
  });

  events.forEach((eventer) => {
    const item = buildEventProgramItem(eventer, festivalYear);
    if (item && validDays.has(item.day)) {
      itemsByDay[item.day].push(item);
    }
  });

  const festivalProgram: ProgramDay[] = FESTIVAL_DAYS.map((day) => ({
    ...day,
    items: [...(itemsByDay[day.dayOfMonth] ?? [])].sort((a, b) => a.sortMinutes - b.sortMinutes),
  }));

  return (
    <div className="w-full max-w-5xl py-8 mx-auto md:py-14">
      <div className="max-w-3xl px-2 mx-auto mb-8 text-center md:mb-12">
        <h1 className="text-5xl font-extrabold md:text-6xl text-grlPink">Program</h1>
        <p className="mt-2 text-xl font-bold md:text-2xl text-grlGreen">GRL PWR FSTVL {festivalYear}</p>
      </div>

      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
        {festivalProgram.map((programDay) => (
          <section key={programDay.day}>
            <header className="px-5 py-4">
              <h2 className="text-4xl font-extrabold text-grlPink">{programDay.day}</h2>
              <p className="text-xl font-bold text-grlGreen">{programDay.date}</p>
            </header>

            <ul className="px-5 py-3">
              {programDay.items.length === 0 ? (
                <li className="py-3 text-xl font-bold text-grlGreen">Ingen programposter i CMS ennå.</li>
              ) : programDay.items.map((item) => (
                <li
                  key={item.id}
                  className="py-3"
                >
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="grid grid-cols-[88px_1fr] gap-3 hover:opacity-75"
                    >
                      <span className="text-3xl font-extrabold text-grlPink">{item.time}</span>
                      <div>
                        <p className="text-3xl font-extrabold leading-tight text-grlPink">{item.title}</p>
                      </div>
                    </Link>
                  ) : (
                    <div className="grid grid-cols-[88px_1fr] gap-3">
                      <span className="text-3xl font-extrabold text-grlPink">{item.time}</span>
                      <div>
                        <p className="text-3xl font-extrabold leading-tight text-grlPink">{item.title}</p>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="flex justify-center w-full mt-10">
        <a href={ticketsLink}>
          <h2 className="text-3xl font-bold text-grlPink">Kjøp billetter her!</h2>
        </a>
      </div>
    </div>
  );
}
