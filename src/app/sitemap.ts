import type { MetadataRoute } from "next";
import { fetchSanityStatic } from "@/lib/sanity/fetch";
import { SITEMAP_QUERY } from "@/lib/sanity/queries";

const SITE_URL = "https://www.grlpwrfstvl.no";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { artists, events, pages } = await fetchSanityStatic(SITEMAP_QUERY);
  const staticRoutes = ["", "/artists", "/program", "/events", "/gallery", "/contact"].map((path) => ({ url: `${SITE_URL}${path}` }));

  return [
    ...staticRoutes,
    ...artists.map((artist) => ({ url: `${SITE_URL}/artists/${artist.slug}`, lastModified: artist._updatedAt })),
    ...events.map((event) => ({ url: `${SITE_URL}/events/${event.slug}`, lastModified: event._updatedAt })),
    ...pages.map((page) => ({ url: `${SITE_URL}/${page.slug}`, lastModified: page._updatedAt })),
  ];
}
