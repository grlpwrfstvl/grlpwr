import Link from "next/link";
import { fetchSanity, getSettings } from "@/lib/sanity/fetch";
import { hasAsset } from "@/lib/sanity/image";
import { HOME_QUERY } from "@/lib/sanity/queries";
import { festivalDates, isFestivalOver } from "@/lib/utils/date";
import ArtistCard from "./_components/ArtistCard";
import BlobImage from "./_components/BlobImage";
import Button from "./_components/Button";
import Countdown from "./_components/Countdown";
import { SectionTitle } from "./_components/Heading";
import { ArrowIcon } from "./_components/Icons";
import RichText from "./_components/RichText";
import TicketButton from "./_components/TicketButton";

export default async function Home() {
  const [settings, { lineup, news }] = await Promise.all([getSettings(), fetchSanity(HOME_QUERY)]);
  const festival = settings?.festival;
  const isOver = isFestivalOver(festival);
  const dates = festival ? festivalDates(festival) : null;

  return (
    <div className="space-y-20 md:space-y-32">
      <section className="grid items-center gap-6 md:grid-cols-2 md:gap-10">
        <div className="order-2 md:order-1">
          <p className="text-sm font-extrabold uppercase tracking-widest text-grlGreen md:text-base">
            {festival
              ? isOver
                ? `Takk for ${festival.year}!`
                : festival.title || `GRL PWR FSTVL ${festival.year ?? ""}`
              : settings?.title || "GRL PWR FSTVL"}
          </p>
          <h1 className="mt-1 text-5xl font-extrabold leading-[0.95] tracking-tight text-grlPink sm:text-6xl lg:text-7xl">
            {festival ? `${festival.location || "Fredrikstad"} ${festival.year ?? ""}` : "Neste festival kommer snart"}
          </h1>
          {/* Until dates are set (or after the festival) show a "stay tuned" line instead */}
          {festival && !isOver && dates ? (
            <>
              <p className="mt-2 text-3xl font-extrabold text-grlPink md:text-4xl">{dates}</p>
              {festival.startDate && <Countdown startDate={festival.startDate} className="mt-2 text-xl font-extrabold text-grlGreen" />}
            </>
          ) : (
            <p className="mt-3 text-xl font-extrabold text-grlGreen md:text-2xl">
              {festival && !isOver ? "Dato kommer snart – følg med!" : "Følg med for datoer, artister og billetter!"}
            </p>
          )}
          <RichText value={settings?.description} className="mt-6 text-xl font-semibold leading-snug md:text-2xl" />
          <div className="mt-8 flex flex-wrap gap-3">
            <TicketButton festival={festival} />
            {festival && !isOver ? (
              <Button href="/program" variant="secondary">
                Se programmet
              </Button>
            ) : (
              <Button href="/gallery" variant="secondary">
                Bilder fra tidligere år
              </Button>
            )}
          </div>
        </div>
        {hasAsset(settings?.image) && (
          <BlobImage
            image={settings.image}
            id="home-hero"
            priority
            sizes="(min-width: 768px) 45vw, 92vw"
            className="order-1 md:order-2 moving-object2"
          />
        )}
      </section>

      {lineup.length > 0 && (
        <section>
          <SectionTitle
            action={
              <Link href="/artists" className="inline-flex items-center gap-2 text-lg font-extrabold text-grlGreen hover:text-grlPink">
                Alle artister <ArrowIcon className="size-5" />
              </Link>
            }
          >
            {isOver ? `Artister ${festival?.year}` : "Årets artister"}
          </SectionTitle>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-x-10">
            {lineup.map((artist, index) => (
              <li key={artist._id}>
                <ArtistCard artist={artist} index={index} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {news.length > 0 && (
        <section>
          <SectionTitle>Nytt fra festivalen</SectionTitle>
          <ul className="grid gap-12 md:grid-cols-2 md:gap-x-16">
            {news.map((item, index) => {
              const content = (
                <>
                  {hasAsset(item.image) && <BlobImage image={item.image} id={item._id} sizes="(min-width: 768px) 40vw, 92vw" />}
                  <h3 className="mt-2 text-2xl font-extrabold leading-tight text-grlPink transition group-hover:text-grlGreen md:text-3xl">
                    {item.title}
                  </h3>
                  <RichText value={item.description} className="mt-2 text-lg font-semibold" />
                </>
              );
              return (
                <li key={item._id} className={index % 2 === 1 ? "md:mt-24" : ""}>
                  {item.href ? (
                    <Link href={item.href} className="group block">
                      {content}
                    </Link>
                  ) : (
                    content
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </div>
  );
}
