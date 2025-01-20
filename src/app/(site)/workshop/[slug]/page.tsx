import { PortableText } from "@portabletext/react";
import { getWorkshop } from "../../../../../sanity/sanity-utils"
import Image from "next/image";
import { blobPaths } from "../../components/blobpaths";

type Props = {
  params: { slug: string };
};

export const revalidate = 0;

export default async function Page({ params }: any) {
  const workshop = await getWorkshop(params.slug);

  return (
    <div className="max-w-4xl mx-auto mt-8 md:mt-16">
      <div className="">
      <svg viewBox="0 0 500 500" className="absolute inset-0 w-3/4 mx-auto" fill="#fff">
      <clipPath id={workshop._id}>
      <path d={blobPaths[3]} transform="translate(-20 0) scale(1.35, 1.2)" />
      </clipPath>
      </svg>
      <Image
        src={workshop.image}
        alt="GRL PWR Festival!"
        priority={true}
        height={600}
        width={600}
        className="w-0 w-11/12 h-0 mx-auto mt-4 -mb-20 opacity-0 md:w-max md:h-max md:opacity-100"
        style={{ clipPath: `url(#${workshop._id})` }}
      />
      <Image
        src={workshop.image}
        alt="GRL PWR Festival!"
        priority={true}
        height={400}
        width={400}
        className="w-11/12 w-full h-0 h-full mx-auto mt-4 -mb-20 opacity-100 md:w-0 md:opacity-0"
      />
    </div>
    <h1 className="p-4 pt-12 mt-16 text-5xl font-extrabold md:px-10 text-grlPink">
        {workshop.name}
    </h1>

    <div className="p-4 md:px-10">

        <PortableText value={workshop.description} />
      </div>
      <a href={workshop.link} target="_blank" rel="noopener noreferrer" className="z-20 h-20">
    <h2 className="p-4 text-lg font-bold md:px-10">
    Event på Facebook
    </h2>
    </a>

    </div>
  );
}
