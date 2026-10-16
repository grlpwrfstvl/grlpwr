import { parseBody } from "next-sanity/webhook";
import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { SANITY_TAG } from "@/lib/sanity/live";

/**
 * Sanity webhook (sanity.io/manage → API → Webhooks), fired on create/update/delete with the
 * secret from SANITY_REVALIDATE_SECRET. Makes published changes show up even when nobody has
 * the site open for <SanityLive /> to pick them up.
 */
export async function POST(request: NextRequest) {
  const { isValidSignature } = await parseBody(request, process.env.SANITY_REVALIDATE_SECRET);
  if (!isValidSignature) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
  }

  revalidateTag(SANITY_TAG, { expire: 0 });
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
