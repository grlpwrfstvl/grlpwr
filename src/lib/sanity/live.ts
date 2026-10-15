import { defineLive } from "next-sanity/live";
import { client } from "./client";

const token = process.env.SANITY_API_READ_TOKEN || false;

/**
 * Every fetch is cached until Sanity reports a change: <SanityLive /> revalidates the affected
 * tags when someone has the site open, and /api/revalidate does it from the publish webhook.
 */
export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: token,
});

/** Tag on every fetch so the webhook can flush everything in one go */
export const SANITY_TAG = "sanity";
