import type { Metadata } from "next";
import { toPlainText } from "next-sanity";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchSanity, fetchSanityStatic } from "@/lib/sanity/fetch";
import { hasAsset, sanityImageUrl } from "@/lib/sanity/image";
import { ARTIST_QUERY, ARTIST_SLUGS_QUERY } from "@/lib/sanity/queries";
import { formatDay, formatTime } from "@/lib/utils/date";
import ArtistCard from "../../_components/ArtistCard";
import BlobImage from "../../_components/BlobImage";
import { SpotifyPlayer, VideoPlayer } from "../../_components/Embeds";
import { SectionTitle } from "../../_components/Heading";
import { CalendarIcon, InstagramIcon, SpotifyIcon } from "../../_components/Icons";
import RichText from "../../_components/RichText";
import TicketButton from "../../_components/TicketButton";

type Props = { params: Promise<{ artist: string }> };

export async function generateStaticParams() {
  const artists = await fetchSanityStatic(ARTIST_SLUGS_QUERY);
  return artists.map(({ slug }) => ({ artist: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const artist = await fetchSanity(ARTIST_QUERY, { slug: (await params).artist });
  if (!artist) return {};
  return {
    title: artist.name,
    description: artist.description ? toPlainText(artist.description).slice(0, 160) : undefined,
    openGraph: hasAsset(artist.image) ? { images: [{ url: sanityImageUrl(artist.image, 1200, 1200 / 630), width: 1200, height: 630 }] } : undefined,
  };
}

export default async function ArtistPage({ params }: Props) {
  const artist = await fetchSanity(ARTIST_QUERY, { slug: (await params).artist });
  if (!artist) notFound();

  return (
    <article>
      <div className="grid items-start md:grid-cols-[3fr_2fr]">
        {hasAsset(artist.image) && (
          <BlobImage image={artist.image} id={artist._id} priority sizes="(min-width: 768px) 50vw, 92vw" />
        )}

        {/* The floating pink info bubble */}
        <div className="relative z-10 -mt-16 ml-auto w-[85%] rounded-[55%_45%_50%_50%/45%_50%_50%_55%] bg-grlPink px-8 py-10 text-white shadow-xl shadow-grlPink/20 md:-ml-24 md:mt-24 md:flex md:aspect-square md:w-[24rem] md:flex-col md:justify-center md:px-14 moving-object3">
          {artist.festival?.year && <p className="text-sm font-extrabold uppercase tracking-widest opacity-90">{artist.festival.title}</p>}
          <h1 className="text-4xl font-extrabold leading-none tracking-tight md:text-5xl">{artist.name}</h1>
          <dl className="mt-3 text-lg font-bold">
            {artist.time ? (
              <>
                <dt className="sr-only">Når</dt>
                <dd className="first-letter:uppercase">{formatDay(artist.time)}</dd>
                <dd>kl. {formatTime(artist.time)}</dd>
              </>
            ) : (
              <dd>Tidspunkt kommer</dd>
            )}
            {artist.stage && (
              <>
                <dt className="sr-only">Hvor</dt>
                <dd>{artist.stage}</dd>
              </>
            )}
          </dl>
          <div className="mt-4 flex gap-3">
            {artist.instagram && (
              <a href={artist.instagram} target="_blank" rel="noopener noreferrer" aria-label={`${artist.name} på Instagram`} className="transition hover:scale-110">
                <InstagramIcon className="size-8" />
              </a>
            )}
            {artist.spotify && (
              <a href={artist.spotify} target="_blank" rel="noopener noreferrer" aria-label={`${artist.name} på Spotify`} className="transition hover:scale-110">
                <SpotifyIcon className="size-8" />
              </a>
            )}
            {artist.time && artist.slug && (
              <a href={`/api/calendar/artist/${artist.slug}`} aria-label="Legg til i kalender" className="transition hover:scale-110">
                <CalendarIcon className="size-8" />
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-3xl space-y-8 md:mt-20">
        <RichText value={artist.description} className="text-xl font-semibold leading-relaxed text-gray-900 md:text-2xl" />
        {artist.spotify && <SpotifyPlayer url={artist.spotify} name={artist.name ?? ""} />}
        {artist.video && <VideoPlayer url={artist.video} title={`Video: ${artist.name}`} />}
        <TicketButton festival={artist.festival} />
      </div>

      {artist.more.length > 0 && (
        <section className="mt-24">
          <SectionTitle
            action={
              <Link href="/program" className="text-lg font-extrabold text-grlGreen hover:text-grlPink">
                Se hele programmet →
              </Link>
            }
          >
            Flere artister
          </SectionTitle>
          <ul className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0">
            {artist.more.map((other) => (
              <li key={other._id} className="w-2/5 shrink-0 snap-start md:w-auto">
                <ArtistCard artist={other} sizes="(min-width: 768px) 20vw, 40vw" />
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
