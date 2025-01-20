import { PortableText } from "@portabletext/react";
import { getEvent } from "../../../../../sanity/sanity-utils"
import Image from "next/image";
import { blobPaths } from "../../components/blobpaths";
import Carousel from "../../components/carousel";
import imageUrlBuilder from '@sanity/image-url';
import clientConfig from "../../../../../sanity/config/client-config";

// type Props = {
//   params: { slug: string };
// };

export const revalidate = 0;


export default async function Page({ params }: any) {
  const event = await getEvent(params.slug);

  const builder = imageUrlBuilder(clientConfig)

  function urlFor(source: any) {
    return builder.image(source)}  
  
    const eventGallery = event && event.gallery ? event.gallery.map(image => urlFor(image).url()) : [];
  


  return (
    <div className="max-w-4xl mx-auto mt-16">
      <div>
      <svg viewBox="0 0 500 500" className="absolute inset-0 z-20 w-3/4 mx-auto" fill="#fff">
      <clipPath id={event._id}>
      <path d={blobPaths[3]} transform="scale(1.3, 1)" />
      </clipPath>
      </svg>
      <Image
        src={event.image}
        alt="GRL PWR Festival!"
        priority={true}
        height={500}
        width={500}
        className="w-0 w-11/12 h-0 mx-auto mt-4 -mb-20 opacity-0 md:w-max md:h-max md:opacity-100"
        style={{ clipPath: `url(#${event._id})` }}
      />
      <Image
        src={event.image}
        alt="GRL PWR Festival!"
        priority={true}
        height={800}
        width={800}
        className="w-11/12 w-full h-0 h-full mx-auto mt-4 -mb-20 opacity-100 md:w-0 md:opacity-0"
      />
    </div>
    <h1 className="p-4 pt-8 text-5xl font-extrabold md:px-10 text-grlPink">
        {event.name}
      </h1>

      <div className="p-4 md:px-10">
        <PortableText value={event.description} />
      </div>
      <div>
      {eventGallery.length > 0 && 
      <Carousel images={eventGallery}></Carousel>}      
      </div>
      {event.link &&
      <a href={event.link}>
      <h2>Klikk for event på facebook!</h2>
      </a>}
    </div>
  );
}
