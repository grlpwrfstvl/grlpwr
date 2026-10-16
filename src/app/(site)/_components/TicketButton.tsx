import { stegaClean } from "next-sanity";
import { isFestivalOver } from "@/lib/utils/date";
import Button from "./Button";

type Festival = { ticketStatus: string | null; ticketsLink: string | null; endDate: string | null } | null | undefined;

/** The ticket link, or null when there's nothing to sell */
export function ticketHref(festival: Festival) {
  if (!festival || isFestivalOver(festival)) return null;
  return stegaClean(festival.ticketStatus) === "onSale" && festival.ticketsLink ? festival.ticketsLink : null;
}

export default function TicketButton({ festival, className, variant }: { festival: Festival; className?: string; variant?: "primary" | "light" }) {
  if (!festival || isFestivalOver(festival)) return null;

  if (stegaClean(festival.ticketStatus) === "soldOut") {
    return <p className={`text-2xl font-extrabold text-grlPink ${className ?? ""}`}>Utsolgt!</p>;
  }

  const href = ticketHref(festival);
  if (!href) return null;
  return (
    <Button href={href} variant={variant} className={className}>
      Kjøp billetter
    </Button>
  );
}
