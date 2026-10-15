import type { Metadata } from "next";
import { getSettings } from "@/lib/sanity/fetch";
import { PageTitle } from "../_components/Heading";
import RichText from "../_components/RichText";
import ContactForm from "./_components/ContactForm";

export const metadata: Metadata = { title: "Kontakt" };

export default async function Contact() {
  const settings = await getSettings();

  return (
    <div className="grid gap-10 md:grid-cols-2 md:gap-16">
      <div>
        <PageTitle>Kontakt</PageTitle>
        <RichText value={settings?.contactIntro} className="text-xl font-semibold leading-relaxed" />
        {settings?.contactEmail && (
          <a href={`mailto:${settings.contactEmail}`} className="mt-6 inline-block text-2xl font-extrabold text-grlGreen underline-offset-4 hover:underline">
            {settings.contactEmail}
          </a>
        )}
      </div>
      <ContactForm />
    </div>
  );
}
