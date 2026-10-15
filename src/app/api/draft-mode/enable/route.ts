import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { client } from "@/lib/sanity/client";

// Called by the Presentation tool in the Studio to show drafts with click-to-edit overlays
export const { GET } = defineEnableDraftMode({
  client: client.withConfig({ token: process.env.SANITY_API_READ_TOKEN }),
});
