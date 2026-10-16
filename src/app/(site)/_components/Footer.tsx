import Image from "next/image";
import type { SETTINGS_QUERY_RESULT } from "../../../../sanity.types";
import { hasAsset, sanityImageUrl } from "@/lib/sanity/image";
import leg from "../assets/Dansefot_Hæl_Rosa.png";
import { FacebookIcon, InstagramIcon, TikTokIcon } from "./Icons";

type Settings = NonNullable<SETTINGS_QUERY_RESULT>;

export default function Footer({ settings }: { settings: Settings | null }) {
  // Keep the festival reachable even before Innstillinger is filled in
  const social = settings?.socialLinks ?? {
    instagram: "https://www.instagram.com/grlpwr_fstvl/",
    facebook: "https://www.facebook.com/GRLPWRFSTVL/",
  };
  const socialLinks = [
    { href: social?.instagram, label: "Instagram", Icon: InstagramIcon },
    { href: social?.facebook, label: "Facebook", Icon: FacebookIcon },
    { href: social?.tiktok, label: "TikTok", Icon: TikTokIcon },
  ].filter((link): link is typeof link & { href: string } => Boolean(link.href));

  return (
    <footer className="relative z-10 w-full bg-lightPink px-4 pb-24 pt-24 text-center md:pt-14 text-grlPink md:pb-12">
      <Image
        src={leg}
        alt=""
        sizes="(min-width: 768px) 200px, 144px"
        className="pointer-events-none absolute -top-24 left-0 h-auto w-36 rotate-180 md:-top-40 md:left-10 md:w-48"
      />

      <p className="text-3xl font-extrabold md:text-4xl">{settings?.title ?? "GRL PWR FSTVL"}</p>

      {socialLinks.length > 0 && (
        <ul className="mt-4 flex justify-center gap-4">
          {socialLinks.map(({ href, label, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`GRL PWR FSTVL på ${label}`}
                className="grid size-12 place-items-center rounded-full bg-white transition hover:scale-110 hover:bg-grlPink hover:text-white"
              >
                <Icon className="size-6" />
              </a>
            </li>
          ))}
        </ul>
      )}

      {settings?.credits?.length ? (
        <ul className="mx-auto mt-8 max-w-xl space-y-1 text-base font-semibold">
          {settings.credits.map((credit) => (
            <li key={credit._key}>
              {credit.role}:{" "}
              {credit.url ? (
                <a href={credit.url} target="_blank" rel="noopener noreferrer" className="font-extrabold underline-offset-4 hover:underline">
                  {credit.name}
                </a>
              ) : (
                <span className="font-extrabold">{credit.name}</span>
              )}
            </li>
          ))}
        </ul>
      ) : null}

      {settings?.sponsors?.length ? (
        <ul className="mx-auto mt-10 flex max-w-4xl flex-wrap items-center justify-center gap-x-12 gap-y-8">
          {settings.sponsors.filter((sponsor) => hasAsset(sponsor.logo)).map((sponsor) => {
            // eslint-disable-next-line @next/next/no-img-element -- small logos, already sized by the Sanity CDN
            const logo = <img src={sanityImageUrl(sponsor.logo!, 400)} alt={sponsor.name ?? ""} loading="lazy" className="h-14 w-auto max-w-40 object-contain md:h-16" />;
            return (
              <li key={sponsor._key}>
                {sponsor.url ? (
                  <a href={sponsor.url} target="_blank" rel="noopener noreferrer" className="block transition hover:scale-110">
                    {logo}
                  </a>
                ) : (
                  logo
                )}
              </li>
            );
          })}
        </ul>
      ) : null}
    </footer>
  );
}
