import { PortableText } from "@portabletext/react";
import { getWorkshop } from "../../../../../sanity/sanity-utils"
import Image from "next/image";
import { blobPaths } from "../../components/blobpaths";
import { transformedSanityUrl } from "../../utils/sanityImage";
import { notFound } from "next/navigation";

type Props = {
  params: { slug: string };
};

export const revalidate = 36000;

export default async function Page({ params }: any) {
  const resolvedParams = await params;
  const workshop = await getWorkshop(resolvedParams.slug);
  if (!workshop) {
    notFound();
  }
  const desktopHeroImage = transformedSanityUrl(workshop.image, 1400, 70);
  const mobileHeroImage = transformedSanityUrl(workshop.image, 900, 68);

  return (
    <div className="max-w-4xl mx-auto mt-8 md:mt-16">
      <div className="">
      <svg viewBox="0 0 500 500" className="absolute inset-0 w-3/4 mx-auto" fill="#fff">
      <clipPath id={workshop._id}>
      <path d={blobPaths[3]} transform="translate(-20 0) scale(1.35, 1.2)" />
      </clipPath>
      </svg>
      <Image
        src={desktopHeroImage}
        alt="GRL PWR Festival!"
        priority={true}
        height={600}
        width={600}
        sizes="(max-width: 768px) 0px, 92vw"
        className="w-0 w-11/12 h-0 mx-auto mt-4 -mb-20 opacity-0 md:w-max md:h-max md:opacity-100"
        style={{ clipPath: `url(#${workshop._id})` }}
      />
      <Image
        src={mobileHeroImage}
        alt="GRL PWR Festival!"
        priority={false}
        height={400}
        width={400}
        sizes="(max-width: 768px) 100vw, 0px"
        loading="lazy"
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
