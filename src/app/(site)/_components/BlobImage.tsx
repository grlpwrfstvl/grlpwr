import { blobIndexFor, blobMask } from "@/lib/utils/blob";
import type { SanityImageData } from "@/lib/sanity/image";
import SanityImage from "./SanityImage";

type Props = {
  image: SanityImageData;
  /** Used to pick a stable blob shape */
  id: string;
  sizes?: string;
  priority?: boolean;
  aspectRatio?: number;
  className?: string;
  alt?: string;
};

export default function BlobImage({
  image,
  id,
  sizes = "(min-width: 768px) 40vw, 92vw",
  priority,
  aspectRatio = 1,
  className = "",
  alt,
}: Props) {
  return (
    <div className={className} style={blobMask(blobIndexFor(id))}>
      <SanityImage image={image} aspectRatio={aspectRatio} sizes={sizes} priority={priority} alt={alt} className="w-full h-auto" />
    </div>
  );
}
