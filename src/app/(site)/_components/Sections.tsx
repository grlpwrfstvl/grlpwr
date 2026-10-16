import { stegaClean } from "next-sanity";
import type { PAGE_QUERY_RESULT } from "../../../../sanity.types";
import { hasAsset } from "@/lib/sanity/image";
import Gallery from "../gallery/Gallery";
import ArtistCard from "./ArtistCard";
import BlobImage from "./BlobImage";
import Button from "./Button";
import { VideoPlayer } from "./Embeds";
import { SectionTitle } from "./Heading";
import RichText from "./RichText";
import SanityImage from "./SanityImage";

type Section = NonNullable<NonNullable<PAGE_QUERY_RESULT>["sections"]>[number];

function SectionBlock({ section }: { section: Section }) {
  switch (section._type) {
    case "textSection":
      return <RichText value={section.body} className="mx-auto max-w-3xl text-xl font-semibold leading-relaxed" />;

    case "imageSection":
      if (!hasAsset(section.image)) return null;
      return (
        <figure className="mx-auto max-w-4xl">
          {stegaClean(section.shape) === "plain" ? (
            <SanityImage image={section.image} sizes="(min-width: 768px) 900px, 92vw" className="h-auto w-full rounded-3xl" />
          ) : (
            <BlobImage image={section.image} id={section._key} aspectRatio={section.image.aspectRatio ?? 1} sizes="(min-width: 768px) 900px, 92vw" />
          )}
          {section.caption && <figcaption className="mt-2 text-center font-bold text-gray-600">{section.caption}</figcaption>}
        </figure>
      );

    case "ctaSection":
      return (
        <div className="mx-auto max-w-3xl rounded-[3rem] bg-lightPink px-6 py-10 text-center md:px-12">
          {section.heading && <h2 className="text-3xl font-extrabold text-grlPink md:text-4xl">{section.heading}</h2>}
          <RichText value={section.text} className="mt-3 text-xl font-semibold" />
          {section.href && (
            <Button href={section.href} className="mt-6">
              {section.buttonLabel}
            </Button>
          )}
        </div>
      );

    case "faqSection":
      return (
        <div className="mx-auto max-w-3xl">
          {section.heading && <SectionTitle>{section.heading}</SectionTitle>}
          <div className="divide-y-2 divide-lightPink border-y-2 border-lightPink">
            {section.items?.map((item) => (
              <details key={item._key} className="group py-4">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-xl font-extrabold text-grlGreen marker:hidden hover:text-grlPink">
                  {item.question}
                  <span aria-hidden="true" className="text-2xl leading-none text-grlPink transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <RichText value={item.answer} className="mt-3 text-lg font-semibold" />
              </details>
            ))}
          </div>
        </div>
      );

    case "lineupSection":
      if (!section.artists.length) return null;
      return (
        <div>
          {section.heading && <SectionTitle>{section.heading}</SectionTitle>}
          <ul className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-x-10">
            {section.artists.map((artist, index) => (
              <li key={artist._id}>
                <ArtistCard artist={artist} index={index} />
              </li>
            ))}
          </ul>
        </div>
      );

    case "gallerySection":
      return section.gallery?.images ? <Gallery images={section.gallery.images} title={section.gallery.name ?? ""} /> : null;

    case "videoSection":
      return (
        <div className="mx-auto max-w-4xl">
          <VideoPlayer url={section.url ?? ""} title={section.title ?? "Video"} />
        </div>
      );

    default:
      return null;
  }
}

export default function Sections({ sections }: { sections: Section[] | null }) {
  if (!sections?.length) return null;
  return (
    <div className="space-y-14 md:space-y-20">
      {sections.map((section) => (
        <SectionBlock key={section._key} section={section} />
      ))}
    </div>
  );
}
