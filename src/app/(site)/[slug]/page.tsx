import { PortableText } from "@portabletext/react";
import { getPage } from "../../../../sanity/sanity-utils";
import Image from "next/image";
import { blobPaths } from "../components/blobpaths";

type Props = {
  params: { slug: string };
};

export default async function Page({ params }: Props) {
  const page = await getPage(params.slug);

  return (
    <div className="max-w-4xl mx-auto mt-5">
      <div>
      <svg viewBox="0 0 800 800" className="absolute w-3/4 mx-auto inset-0 z-20" fill="#fff">
      <clipPath id={page._id}>
      <path d={blobPaths[3]} transform="scale(1.9, 1.25)" />
      </clipPath>
      </svg>
      <Image
        src={page.image}
        alt="GRL PWR Festival!"
        priority={true}
        height={800}
        width={800}
        className="mx-auto mt-4 -mb-20 w-11/12 opacity-0 w-0 h-0 md:w-max md:h-max md:opacity-100"
        style={{ clipPath: `url(#${page._id})` }}
      />
      <Image
        src={page.image}
        alt="GRL PWR Festival!"
        priority={true}
        height={800}
        width={800}
        className="mx-auto mt-4 -mb-20 w-11/12 opacity-100 h-full w-full md:w-0 h-0 md:opacity-0"
      />
    </div>
    <h1 className="text-5xl p-4 text-grlPink drop-shadow font-extrabold">
        {page.title}
      </h1>

      <div className="">
        <PortableText value={page.content} />
      </div>
    </div>
  );
}
