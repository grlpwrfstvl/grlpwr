import { PortableText } from "@portabletext/react";
import { getPage } from "../../../../sanity/sanity-utils";
import Image from "next/image";
import { blobPaths } from "../components/blobpaths";

type Props = {
  params: { slug: string };
};

export const revalidate = 0;


export default async function Page({ params }: Props) {
  const page = await getPage(params.slug);
  let counter = 1;

  return (
    <div className="max-w-4xl mx-auto mt-16">
      <div>
      <svg viewBox="0 0 800 800" className="pointer-events-none absolute w-2/4 h-2 mx-auto inset-0 z-20" fill="#fff">
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
    <a href={page.link ? `${page.link}` : ''} key={page._id} className={`md:py-8 ${page.link ? '' : 'pointer-events-none cursor-not-allowed'}`}>
    <h1 className="text-5xl pt-8 p-4 md:px-10 md:pt-12 text-grlPink font-extrabold">
        {page.title}
      </h1>
      </a>
      {page.content.map((content) => (
      <div key={counter++}className="px-4 py-2 md:px-10">
        <PortableText value={content} />
      </div>
      ))}
      <a href={page.link ? `${page.link}` : ''} key={page._id} className={`md:py-8 z-40 ${page.link ? '' : 'pointer-events-none cursor-not-allowed opacity-0'}`}>
      <h1 className="text-2xl pt-8 p-4 md:px-10 text-grlPink font-extrabold">
      {page.title}!
      </h1>
      </a>

    </div>
  );
}
