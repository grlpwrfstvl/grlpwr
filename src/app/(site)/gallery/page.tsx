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

  const images22 = galleries && galleries[0].images ? galleries[0].images.map(image => urlFor(image).url()) : [];
  const images23 = galleries && galleries[1].images ? galleries[1].images.map(image => urlFor(image).url()) : [];
  const images24 = galleries && galleries[2].images ? galleries[2].images.map(image => urlFor(image).url()) : [];




    return (
        <main className="w-full py-2 md:py-20">
        <div className="flex flex-col justify-center">
        <h1 className="text-3xl md:text-5xl p-4 md:px-10 text-grlPink drop-shadow font-extrabold">
            Bilder fra GRLPWR 24
        </h1> 
        <Carousel images={images24} />

        <h1 className="text-3xl md:text-5xl pt-8 p-4 md:px-10 text-grlPink drop-shadow font-extrabold">
            Bilder fra GRLPWR 23
        </h1> 
        <Carousel images={images23} />

        <h1 className="text-3xl md:text-5xl p-4 md:px-10 text-grlPink drop-shadow font-extrabold">
            Bilder fra GRLPWR 22
        </h1> 
        <Carousel images={images22} />


          
        </div>
        </main>
    )
}