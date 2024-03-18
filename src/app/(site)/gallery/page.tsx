import { getGalleries } from "../../../../sanity/sanity-utils"
import imageUrlBuilder from '@sanity/image-url'
import Carousel from "../components/carousel"
import clientConfig from "../../../../sanity/config/client-config";

export default async function Contact() {

const galleries = await getGalleries();
const builder = imageUrlBuilder(clientConfig)

function urlFor(source: any) {
  return builder.image(source)}  

  const images22 = galleries && galleries[0].images ? galleries[0].images.map(image => urlFor(image).url()) : [];
  const images23 = galleries && galleries[1].images ? galleries[1].images.map(image => urlFor(image).url()) : [];


    return (
        <main className="w-full py-2 md:py-20">
        <div className="flex flex-col justify-center">
        <h1 className="text-3xl md:text-5xl p-4 md:px-10 text-grlPink drop-shadow font-extrabold">
            Bilder fra GRLPWR 23
        </h1> 
        <Carousel images={images22} />

        <h1 className="text-3xl md:text-5xl pt-8 p-4 md:px-10 text-grlPink drop-shadow font-extrabold">
            Bilder fra GRLPWR 22
        </h1> 
        <Carousel images={images23} />

          
        </div>
        </main>
    )
}