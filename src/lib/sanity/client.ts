import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, studioUrl } from "../../../sanity/env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
  // Click-to-edit overlays in the Presentation tool (only active in draft mode)
  stega: { studioUrl },
  // Lets you point the site at a local or staging API, e.g. for testing a migration
  ...(process.env.SANITY_API_HOST ? { apiHost: process.env.SANITY_API_HOST, useProjectHostname: false, useCdn: false } : {}),
});
