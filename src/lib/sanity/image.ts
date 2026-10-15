import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { dataset, projectId } from "../../../sanity/env";

export const imageUrlBuilder = createImageUrlBuilder({ projectId, dataset });

export type SanityImageData = {
  asset: { _ref: string } | null;
  hotspot?: unknown;
  crop?: unknown;
  alt?: string | null;
  lqip?: string | null;
  aspectRatio?: number | null;
};

export const hasAsset = <T extends SanityImageData>(image: T | null | undefined): image is T & { asset: { _ref: string } } =>
  Boolean(image?.asset?._ref);

/**
 * Base URL cropped to `aspectRatio` around the editor's hotspot. The width is added per
 * srcset entry by the next/image loader, so the crop stays the same at every size.
 */
export function sanityImageBaseUrl(image: SanityImageData, aspectRatio?: number) {
  const builder = imageUrlBuilder.image(image as SanityImageSource);
  if (!aspectRatio) return builder.url();
  return builder.width(1000).height(Math.round(1000 / aspectRatio)).fit("crop").url();
}

export function sanityImageUrl(image: SanityImageData, width: number, aspectRatio?: number) {
  return withWidth(sanityImageBaseUrl(image, aspectRatio), width);
}

export function withWidth(url: string, width: number, quality = 70) {
  const parsed = new URL(url);
  parsed.searchParams.delete("h");
  parsed.searchParams.set("w", String(width));
  parsed.searchParams.set("q", String(quality));
  parsed.searchParams.set("auto", "format");
  parsed.searchParams.set("fit", "max");
  return parsed.toString();
}
