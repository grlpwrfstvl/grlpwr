import Link from "next/link";
import type { SanityImageData } from "@/lib/sanity/image";
import { hasAsset } from "@/lib/sanity/image";
import BlobImage from "./BlobImage";

export type ArtistCardData = {
  _id: string;
  name: string | null;
  slug: string | null;
  image: SanityImageData | null;
  headliner?: boolean | null;
};

const BOUNCES = ["moving-object4", "moving-object2", "moving-object3"];

type Props = {
  artist: ArtistCardData;
  index?: number;
  sizes?: string;
  priority?: boolean;
};

export default function ArtistCard({ artist, index = 0, sizes = "(min-width: 768px) 30vw, 46vw", priority }: Props) {
  return (
    <Link
      href={`/artists/${artist.slug}`}
      className={`group block text-center ${BOUNCES[index % BOUNCES.length]}`}
    >
      {hasAsset(artist.image) ? (
        <BlobImage
          image={artist.image}
          id={artist._id}
          sizes={sizes}
          priority={priority}
          className="transition duration-300 group-hover:-translate-y-2 group-hover:rotate-2"
        />
      ) : (
        <div className="aspect-square rounded-full bg-lightPink" />
      )}
      <h3 className="-mt-2 text-xl font-extrabold leading-tight text-grlPink transition group-hover:text-grlGreen md:text-3xl">
        {artist.name}
      </h3>
    </Link>
  );
}
