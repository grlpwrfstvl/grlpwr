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
      <div>
      <svg viewBox="0 0 400 400" className="absolute w-3/4 mx-auto inset-0 z-20" fill="#fff">
      <clipPath id={page._id}>
      <path d={blobPaths[3]} transform="scale(1.9, 1.25)" />
      </clipPath>
      </svg>
      <Image
        src={page.image}
        alt="GRL PWR logo"
        priority={true}
        height={800}
        width={700}
        className="mx-auto mt-4 -mb-20 w-11/12"
        style={{ clipPath: `url(#${page._id})` }}
      />
    </div>
    <h1 className="text-5xl text-grlPink drop-shadow font-extrabold">
        {page.title}
      </h1>

      <div className="">
        <PortableText value={page.content} />
      </div>
    </div>
  );
}
