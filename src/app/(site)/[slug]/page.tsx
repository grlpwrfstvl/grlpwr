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
    <div className="max-w-4xl mx-auto">
      <h1 className="pt-10 text-4xl text-gray-700 drop-shadow font-extrabold">
        {page.title}
      </h1>
      <div>
      <svg viewBox="5 0 400 400" className="absolute w-64 h-64 inset-0 z-20" fill="#fff">
      <clipPath id={page._id}>
      <path d={blobPaths[3]} transform="scale(0.85, 0.62)" />
      </clipPath>
      </svg>
      <Image
        src={page.image}
        alt="GRL PWR logo"
        priority={true}
        height={400}
        width={400}
        className=""
        style={{ clipPath: `url(#${page._id})` }}
      />
    </div>
      <div className="">
        <PortableText value={page.content} />
      </div>
    </div>
  );
}
