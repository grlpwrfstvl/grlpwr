import { PortableText } from "@portabletext/react";
import { getEvent } from "../../../../../sanity/sanity-utils"
import Image from "next/image";
import { blobPaths } from "../../components/blobpaths";

type Props = {
  params: { slug: string };
};

export default async function Page({ params }: Props) {
  const event = await getEvent(params.slug);

  return (
    <div className="max-w-4xl mx-auto mt-16">
      <div>
      <svg viewBox="0 0 500 500" className="absolute w-3/4 mx-auto inset-0 z-20" fill="#fff">
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
        className="mx-auto mt-4 -mb-20 w-11/12 opacity-0 w-0 h-0 md:w-max md:h-max md:opacity-100"
        style={{ clipPath: `url(#${event._id})` }}
      />
      <Image
        src={event.image}
        alt="GRL PWR Festival!"
        priority={true}
        height={800}
        width={800}
        className="mx-auto mt-4 -mb-20 w-11/12 opacity-100 h-full w-full md:w-0 h-0 md:opacity-0"
      />
    </div>
    <h1 className="text-5xl pt-8 p-4 md:px-10 text-grlPink font-extrabold">
        {event.name}
      </h1>

      <div className="p-4 md:px-10">
        <PortableText value={event.description} />
      </div>
    </div>
  );
}
