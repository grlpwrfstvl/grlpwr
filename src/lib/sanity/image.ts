import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { clientConfig } from "./client";

export const imageUrlBuilder = createImageUrlBuilder(clientConfig);

export function transformedSanityUrl(url: string, width: number, quality = 70): string {
  if (!url) {
    return url;
  }

  try {
    const parsed = new URL(url);
    parsed.searchParams.set("w", String(width));
    parsed.searchParams.set("q", String(quality));
    parsed.searchParams.set("auto", "format");
    parsed.searchParams.set("fit", "max");
    return parsed.toString();
  } catch {
    return url;
  }
}

export function transformedSanitySourceUrl(source: SanityImageSource, width: number, quality = 70): string {
  if (!source) {
    return "";
  }

  try {
    return imageUrlBuilder.image(source).width(width).quality(quality).auto("format").fit("max").url();
  } catch {
    return "";
  }
}
