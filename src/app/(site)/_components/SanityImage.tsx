"use client";

import Image, { type ImageLoader } from "next/image";
import { sanityImageBaseUrl, withWidth, type SanityImageData } from "@/lib/sanity/image";

type Props = {
  image: SanityImageData;
  /** Crop to this width/height ratio around the hotspot. Omit to keep the original ratio. */
  aspectRatio?: number;
  sizes: string;
  priority?: boolean;
  className?: string;
  alt?: string;
};

// Sanity's CDN resizes for us, so next/image only has to build the srcset
const loader: ImageLoader = ({ src, width, quality }) => withWidth(src, width, quality ?? 70);

export default function SanityImage({ image, aspectRatio, sizes, priority, className, alt }: Props) {
  const ratio = aspectRatio ?? image.aspectRatio ?? 1;
  return (
    <Image
      loader={loader}
      src={sanityImageBaseUrl(image, aspectRatio)}
      alt={alt ?? image.alt ?? ""}
      width={1000}
      height={Math.round(1000 / ratio)}
      sizes={sizes}
      priority={priority}
      placeholder={image.lqip ? "blur" : "empty"}
      blurDataURL={image.lqip ?? undefined}
      className={className}
    />
  );
}
