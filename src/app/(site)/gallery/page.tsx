import { getGalleries } from "../../../../sanity/sanity-utils"
import { createImageUrlBuilder } from '@sanity/image-url'
import Carousel from "../components/carousel"
import clientConfig from "../../../../sanity/config/client-config";

export const revalidate = 0;

export default async function Gallery() {

const galleries = await getGalleries();
const builder = createImageUrlBuilder(clientConfig)

function urlFor(source: any) {
  return builder.image(source)}  
  
  galleries.sort((a, b) => b.name.localeCompare(a.name));

    return (
        <main className="items-center justify-center w-full mx-auto text-center">
            <h1 className="p-4 pt-8 text-4xl font-extrabold md:text-6xl md:px-10 md:pt-12 text-grlPink">Galleri</h1>
        {galleries.map((gallery) => (
          <div key={gallery._id} className="flex flex-col items-center justify-center w-full py-10">
            <h2 className="text-xl font-bold md:mb-6 md:text-3xl text-grlPink">{gallery.name}</h2>
            <Carousel images={gallery.images.map((image) => urlFor(image).url())} />
            </div>
        ))}
        </main>
    )
}