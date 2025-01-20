import { getGalleries } from "../../../../sanity/sanity-utils"
import imageUrlBuilder from '@sanity/image-url'
import Carousel from "../components/carousel"
import clientConfig from "../../../../sanity/config/client-config";

export const revalidate = 0;

export default async function Gallery() {

const galleries = await getGalleries();
const builder = imageUrlBuilder(clientConfig)

function urlFor(source: any) {
  return builder.image(source)}  

  const images23 = galleries && galleries[0].images ? galleries[0].images.map(image => urlFor(image).url()) : [];
  const images22 = galleries && galleries[1].images ? galleries[1].images.map(image => urlFor(image).url()) : [];
  const images24 = galleries && galleries[2].images ? galleries[2].images.map(image => urlFor(image).url()) : [];




    return (
        <main className="w-full py-2 md:py-20">
        <div className="flex flex-col justify-center">
        <h1 className="p-4 text-3xl font-extrabold md:text-5xl md:px-10 text-grlPink drop-shadow">
            {galleries[1].name}
        </h1> 
        <Carousel images={images22} />

        <h1 className="p-4 pt-8 text-3xl font-extrabold md:text-5xl md:px-10 text-grlPink drop-shadow">
            {galleries[0].name}
        </h1> 
        <Carousel images={images23} />

        <h1 className="p-4 text-3xl font-extrabold md:text-5xl md:px-10 text-grlPink drop-shadow">
            {galleries[2].name}
        </h1> 
        <Carousel images={images24} />


          
        </div>
        </main>
    )
}