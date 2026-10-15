import type { Metadata } from "next";
import { toPlainText } from "next-sanity";
import { notFound } from "next/navigation";
import { fetchSanity, fetchSanityStatic } from "@/lib/sanity/fetch";
import { hasAsset, sanityImageUrl } from "@/lib/sanity/image";
import { EVENT_QUERY, EVENT_SLUGS_QUERY } from "@/lib/sanity/queries";
import { formatDay, formatTime } from "@/lib/utils/date";
import BlobImage from "../../_components/BlobImage";
import Button from "../../_components/Button";
import { CalendarIcon } from "../../_components/Icons";
import RichText from "../../_components/RichText";
import Gallery from "../../gallery/Gallery";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return fetchSanityStatic(EVENT_SLUGS_QUERY);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = await fetchSanity(EVENT_QUERY, { slug: (await params).slug });
  if (!event) return {};
  return {
    title: event.name,
    description: event.description ? toPlainText(event.description).slice(0, 160) : undefined,
    openGraph: hasAsset(event.image) ? { images: [{ url: sanityImageUrl(event.image, 1200, 1200 / 630), width: 1200, height: 630 }] } : undefined,
  };
}

export default async function EventPage({ params }: Props) {
  const event = await fetchSanity(EVENT_QUERY, { slug: (await params).slug });
  if (!event) notFound();

  return (
    <article className="grid gap-8 md:grid-cols-2 md:gap-14">
      {hasAsset(event.image) && (
        <BlobImage image={event.image} id={event._id} priority sizes="(min-width: 768px) 45vw, 92vw" className="md:sticky md:top-28 md:self-start" />
      )}
      <div>
        <h1 className="text-4xl font-extrabold leading-none tracking-tight text-grlPink md:text-6xl">{event.name}</h1>
        {(event.time || event.location) && (
          <p className="mt-4 text-xl font-extrabold text-grlGreen">
            {event.time && (
              <span className="inline-block first-letter:uppercase">
                {formatDay(event.time)} kl. {formatTime(event.time)}
                {event.endTime && `–${formatTime(event.endTime)}`}
              </span>
            )}
            {event.location && <span className="block">{event.location}</span>}
          </p>
        )}
        <RichText value={event.description} className="mt-6 text-xl font-semibold leading-relaxed" />
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {event.link && <Button href={event.link}>{event.linkLabel || "Mer info"}</Button>}
          {event.time && event.slug && (
            <a
              href={`/api/calendar/event/${event.slug}`}
              className="inline-flex items-center gap-2 rounded-full border-[3px] border-grlGreen px-5 py-2.5 font-extrabold text-grlGreen transition hover:bg-grlGreen hover:text-white"
            >
              <CalendarIcon className="size-5" /> Legg i kalender
            </a>
          )}
        </div>
      </div>
      {event.gallery?.length ? (
        <div className="md:col-span-2">
          <Gallery images={event.gallery} title={event.name ?? ""} />
        </div>
      ) : null}
    </article>
  );
}
