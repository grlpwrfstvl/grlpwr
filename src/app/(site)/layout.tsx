import "./globals.css";
import type { Metadata, Viewport } from "next";
import { VisualEditing } from "next-sanity/visual-editing";
import { Inter } from "next/font/google";
import { draftMode } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { fetchSanity, getSettings } from "@/lib/sanity/fetch";
import { MENU_PAGES_QUERY } from "@/lib/sanity/queries";
import { hasAsset, sanityImageUrl } from "@/lib/sanity/image";
import { SanityLive } from "@/lib/sanity/live";
import hockey from "./assets/Hockey_Sveis_Grønn.png";
import Footer from "./_components/Footer";
import Menu, { type NavItem } from "./_components/Menu";
import { ticketHref } from "./_components/TicketButton";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const SITE_URL = "https://www.grlpwrfstvl.no";

const DEFAULT_NAV: NavItem[] = [
  { label: "Artister", href: "/artists" },
  { label: "Events", href: "/events" },
  { label: "Program", href: "/program" },
  { label: "Galleri", href: "/gallery" },
  { label: "Kontakt", href: "/contact" },
];

// Re-render daily so date logic (ticket button, "festival is over") stays current; data is cached by tag
export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const title = settings?.seo?.title || settings?.title || "GRL PWR FSTVL";
  const description = settings?.seo?.description || "GRL PWR Festivalens offisielle side!";
  const image = hasAsset(settings?.seo?.image) ? settings.seo.image : hasAsset(settings?.image) ? settings.image : null;

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: `%s | ${settings?.title || "GRL PWR FSTVL"}` },
    description,
    openGraph: {
      type: "website",
      siteName: settings?.title || "GRL PWR FSTVL",
      locale: "nb_NO",
      images: image ? [{ url: sanityImageUrl(image, 1200, 1200 / 630), width: 1200, height: 630 }] : undefined,
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#e82265",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [settings, pages, { isEnabled: isDraftMode }] = await Promise.all([
    getSettings(),
    fetchSanity(MENU_PAGES_QUERY),
    draftMode(),
  ]);

  const colors = {
    ...(settings?.primaryColor ? { "--color-grlPink": settings.primaryColor } : {}),
    ...(settings?.secondaryColor ? { "--color-grlGreen": settings.secondaryColor } : {}),
    ...(settings?.accentColor ? { "--color-lightPink": settings.accentColor } : {}),
  } as React.CSSProperties;

  // The editor's menu (or the default one), then any page it doesn't already link to
  const baseNav = settings?.navigation?.length
    ? settings.navigation.flatMap((item) => (item.label && item.href ? [{ label: item.label, href: item.href }] : []))
    : DEFAULT_NAV;
  const navItems = [
    ...baseNav,
    ...pages
      .filter((page) => page.title && !baseNav.some((item) => item.href === `/${page.slug}`))
      .map((page) => ({ label: page.title!, href: `/${page.slug}` })),
  ];
  const tickets = ticketHref(settings?.festival);
  const announcement = settings?.announcement;

  return (
    <html lang="nb" className={inter.variable} style={colors}>
      <body className="flex min-h-dvh flex-col bg-white font-sans text-gray-900 antialiased">
        <a href="#main" className="sr-only z-50 bg-grlPink p-3 text-white focus:not-sr-only focus:fixed focus:left-2 focus:top-2">
          Hopp til innhold
        </a>

        {announcement?.text && (
          <div className="relative z-50 bg-grlGreen px-4 py-2 text-center text-sm font-bold text-white md:text-base">
            {announcement.href ? (
              <Link href={announcement.href} className="underline-offset-4 hover:underline">
                {announcement.text} →
              </Link>
            ) : (
              announcement.text
            )}
          </div>
        )}

        {/* Desktop: the menu is sticky inside this row, so it scrolls away before the footer */}
        <div className="flex-1 md:flex">
          <Menu items={navItems} ticketHref={tickets} />

          <main id="main" className="relative z-10 w-full min-w-0 flex-1 px-4 pb-24 pt-6 md:pl-4 md:pr-16 md:pt-28 lg:pr-44">
            <div className="mx-auto max-w-6xl">{children}</div>
          </main>
        </div>

        <Image
          src={hockey}
          alt=""
          sizes="(min-width: 768px) 25vw, 30vw"
          className="pointer-events-none fixed bottom-0 right-0 z-20 h-28 w-auto md:h-[45vh]"
        />

        <Footer settings={settings} />

        {tickets && (
          <a
            href={tickets}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-4 left-4 z-30 rounded-full bg-grlPink px-6 py-3 text-lg font-extrabold text-white shadow-lg shadow-grlPink/30 transition active:scale-95 md:hidden"
          >
            Kjøp billetter
          </a>
        )}

        <SanityLive />
        {isDraftMode && <VisualEditing />}
      </body>
    </html>
  );
}
