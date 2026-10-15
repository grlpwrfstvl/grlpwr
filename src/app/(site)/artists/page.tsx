import type { Metadata } from "next";
import { fetchSanity, getSettings } from "@/lib/sanity/fetch";
import { ARTISTS_QUERY } from "@/lib/sanity/queries";
import ArtistCard from "../_components/ArtistCard";
import { PageTitle, SectionTitle } from "../_components/Heading";

export const metadata: Metadata = { title: "Artister" };

export default async function Artists() {
  const [settings, festivals] = await Promise.all([getSettings(), fetchSanity(ARTISTS_QUERY)]);
  const currentId = settings?.festival?._id;
  const current = festivals.find((festival) => festival._id === currentId);
  const past = festivals.filter((festival) => festival._id !== currentId);

  return (
    <>
      <PageTitle kicker={settings?.festival?.title}>Artister</PageTitle>

      {current ? (
        <ul className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-10 md:gap-y-16">
          {current.artists.map((artist, index) => (
            <li key={artist._id}>
              <ArtistCard artist={artist} index={index} priority={index < 2} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-3xl font-extrabold text-grlPink md:text-4xl">Ingen artister for neste festival annonsert ennå – følg med!</p>
      )}

      {past.length > 0 && (
        <section className="mt-24 md:mt-32">
          <SectionTitle>Tidligere artister</SectionTitle>
          <div className="divide-y-2 divide-lightPink border-y-2 border-lightPink">
            {past.map((festival, festivalIndex) => (
              // Closed <details> keep their images from loading until opened
              <details key={festival._id} open={!current && festivalIndex === 0} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between py-5 text-3xl font-extrabold text-grlGreen marker:hidden hover:text-grlPink">
                  {festival.year}
                  <span className="text-base font-bold">
                    {festival.artists.length} artister{" "}
                    <span aria-hidden="true" className="inline-block transition group-open:rotate-180">
                      ▾
                    </span>
                  </span>
                </summary>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-8 pb-10 md:grid-cols-4">
                  {festival.artists.map((artist) => (
                    <li key={artist._id}>
                      <ArtistCard artist={artist} sizes="(min-width: 768px) 20vw, 46vw" />
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
