import type { Metadata } from "next";
import { fetchSanity } from "@/lib/sanity/fetch";
import { GALLERIES_QUERY } from "@/lib/sanity/queries";
import { PageTitle } from "../_components/Heading";
import Gallery from "./Gallery";

export const metadata: Metadata = { title: "Galleri" };

export default async function GalleryPage() {
  const galleries = await fetchSanity(GALLERIES_QUERY);

  return (
    <>
      <PageTitle>Galleri</PageTitle>
      <div className="space-y-16">
        {galleries.map((gallery) => (
          <section key={gallery._id}>
            <h2 className="mb-4 text-3xl font-extrabold text-grlPink md:text-4xl">{gallery.name}</h2>
            <Gallery images={gallery.images ?? []} title={gallery.name ?? "Galleri"} />
          </section>
        ))}
      </div>
    </>
  );
}
