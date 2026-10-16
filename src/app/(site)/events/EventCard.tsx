import Link from "next/link";
import { hasAsset, type SanityImageData } from "@/lib/sanity/image";
import { formatShortDate, formatTime } from "@/lib/utils/date";
import BlobImage from "../_components/BlobImage";

type Props = {
  event: {
    _id: string;
    name: string | null;
    slug: string | null;
    image: SanityImageData | null;
    hideTitle: boolean | null;
    time: string | null;
    location: string | null;
  };
  sizes?: string;
};

export default function EventCard({ event, sizes }: Props) {
  return (
    <Link href={`/events/${event.slug}`} className="group block">
      {hasAsset(event.image) && (
        <BlobImage image={event.image} id={event._id} sizes={sizes} className="transition duration-300 group-hover:-translate-y-2 group-hover:-rotate-1" />
      )}
      <p className="mt-1 text-base font-extrabold uppercase tracking-wider text-grlGreen">
        {[event.time && `${formatShortDate(event.time)} kl. ${formatTime(event.time)}`, event.location].filter(Boolean).join(" · ")}
      </p>
      {/* The title stays for screen readers even when it's already printed on the poster */}
      <h3
        className={
          event.hideTitle
            ? "sr-only"
            : "text-2xl font-extrabold leading-tight text-grlPink transition group-hover:text-grlGreen md:text-3xl"
        }
      >
        {event.name}
      </h3>
    </Link>
  );
}
