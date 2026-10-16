import type { ClientReturn } from "next-sanity";
import { cache } from "react";
import { SANITY_TAG, sanityFetch } from "./live";
import { SETTINGS_QUERY } from "./queries";

/**
 * In draft mode strings carry invisible stega markers for click-to-edit. They're typed as plain
 * strings here; use stegaClean() before comparing a value against a literal.
 */
export function fetchSanity<const Q extends string>(query: Q, params: Record<string, string> = {}) {
  return sanityFetch({ query, params, tags: [SANITY_TAG] }).then((result) => result.data as ClientReturn<Q, unknown>);
}

/** Static params must not depend on draft mode, so they skip stega and drafts */
export function fetchSanityStatic<const Q extends string>(query: Q) {
  return sanityFetch({ query, perspective: "published", stega: false, tags: [SANITY_TAG] }).then((result) => result.data);
}

/** Settings are used by the layout and most pages; dedupe within a request */
export const getSettings = cache(() => fetchSanity(SETTINGS_QUERY));
