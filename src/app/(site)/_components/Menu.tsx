"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import blomstKvinne from "../assets/Blomst_Kvinne_Rosa_ 2.png";
import Logo from "../assets/grlpwrlogo2025-small.png";

export type NavItem = { label: string; href: string };

type Props = {
  items: NavItem[];
  ticketHref: string | null;
};

export default function Menu({ items, ticketHref }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState(pathname);

  // Close when navigating (adjusting state during render instead of in an effect)
  if (open && openedAt !== pathname) {
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      {/* Mobile: solid bar so content never scrolls under a floating logo */}
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between bg-white/95 px-4 backdrop-blur md:hidden">
        <Link href="/" aria-label="GRL PWR FSTVL – forside">
          <Image src={Logo} alt="GRL PWR FSTVL" priority sizes="180px" className="h-11 w-auto" />
        </Link>
        <button
          type="button"
          onClick={() => {
            setOpenedAt(pathname);
            setOpen(!open);
          }}
          aria-expanded={open}
          aria-controls="site-nav"
          aria-label={open ? "Lukk meny" : "Åpne meny"}
          className="relative z-50 -mr-2 grid size-12 place-items-center rounded-full text-grlGreen"
        >
          <span className="sr-only">Meny</span>
          <span aria-hidden="true" className="relative block h-[3px] w-7">
            <span className={`absolute left-0 h-[3px] w-7 rounded bg-current transition ${open ? "top-0 rotate-45" : "-top-2"}`} />
            <span className={`absolute left-0 top-0 h-[3px] w-7 rounded bg-current transition ${open ? "opacity-0" : ""}`} />
            <span className={`absolute left-0 h-[3px] w-7 rounded bg-current transition ${open ? "top-0 -rotate-45" : "top-2"}`} />
          </span>
        </button>
      </header>

      {/* Desktop: floating logo top right, as before */}
      <Link href="/" className="fixed right-0 top-0 z-40 hidden w-[min(400px,30vw)] md:block" aria-label="GRL PWR FSTVL – forside">
        <Image src={Logo} alt="GRL PWR FSTVL" priority sizes="30vw" className="h-auto w-full" />
      </Link>

      <nav
        id="site-nav"
        aria-label="Hovedmeny"
        className={`fixed inset-0 z-30 flex flex-col overflow-y-auto bg-white pt-16 transition-[transform,visibility] duration-300 ease-out md:sticky md:inset-auto md:top-0 md:h-dvh md:w-56 md:shrink-0 md:translate-x-0 md:bg-transparent md:pt-0 ${
          open ? "translate-x-0" : "-translate-x-full max-md:invisible"
        }`}
      >
        <Image src={blomstKvinne} alt="" sizes="(min-width: 768px) 224px, 60vw" className="mx-auto h-auto w-3/5 md:w-full" />
        <ul className="-mt-10 flex flex-col items-center gap-1 px-4 pb-10 text-4xl font-extrabold md:mt-0 md:items-start md:text-3xl lg:text-4xl">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`block py-1 transition hover:translate-x-1 hover:text-grlPink ${
                  isActive(item.href) ? "text-grlPink" : "text-grlGreen"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
          {ticketHref && (
            <li className="mt-6 md:hidden">
              <a href={ticketHref} target="_blank" rel="noopener noreferrer" className="rounded-full bg-grlPink px-8 py-3 text-2xl text-white">
                Kjøp billetter
              </a>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
}
