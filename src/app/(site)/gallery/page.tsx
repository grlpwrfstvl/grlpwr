import { getGalleries } from "@/lib/sanity/queries";
import { imageUrlBuilder } from "@/lib/sanity/image";
import Carousel from "./_components/Carousel";

export const revalidate = 36000;

export default async function Gallery() {
  const galleries = await getGalleries();

  galleries.sort((a, b) => b.name.localeCompare(a.name));

  return (
    <main className="items-center justify-center w-full mx-auto text-center">
      <h1 className="p-4 pt-8 text-4xl font-extrabold md:text-6xl md:px-10 md:pt-12 text-grlPink">Galleri</h1>
      {galleries.map((gallery) => (
        <div key={gallery._id} className="flex flex-col items-center justify-center w-full py-10">
          <h2 className="text-xl font-bold md:mb-6 md:text-3xl text-grlPink">{gallery.name}</h2>
          <Carousel images={gallery.images.map((image) => imageUrlBuilder.image(image).url())} />
        </div>
      ))}
    </main>
  );
}
