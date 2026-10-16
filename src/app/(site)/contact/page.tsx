import type { Metadata } from "next";
import { getSettings } from "@/lib/sanity/fetch";
import RichText from "../_components/RichText";
import ContactForm from "./_components/ContactForm";

export const metadata: Metadata = { title: "Kontakt" };

const FALLBACK_INTRO = "Har du spørsmål om festivalen? Ønsker du fremtidig samarbeid? Ta kontakt, så svarer vi på henvendelsen din så fort vi kan.";

export default async function Contact() {
  const settings = await getSettings();

  return (
    <div className="mx-auto max-w-2xl">
      <header className="mb-10 text-center">
        <h1 className="text-5xl font-extrabold leading-[0.95] tracking-tight text-grlPink md:text-7xl">Kontakt</h1>
        {settings?.contactIntro?.length ? (
          <RichText value={settings.contactIntro} className="mt-6 text-xl font-semibold leading-relaxed" />
        ) : (
          <p className="mt-6 text-xl font-semibold leading-relaxed">{FALLBACK_INTRO}</p>
        )}
        {settings?.contactEmail && (
          <a href={`mailto:${settings.contactEmail}`} className="mt-4 inline-block text-2xl font-extrabold text-grlGreen underline-offset-4 hover:underline">
            {settings.contactEmail}
          </a>
        )}
      </header>
      <ContactForm />
    </div>
  );
}
