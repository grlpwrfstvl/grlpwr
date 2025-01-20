import { PortableText } from "@portabletext/react";
import { getPage } from "../../../../sanity/sanity-utils";
import Image from "next/image";
import { blobPaths } from "../components/blobpaths";

export const revalidate = 0;

export default async function Page({ params }: any) {
  const resolvedParams = await params;
  console.log('resolvedParams:', resolvedParams); // Add this line to log resolvedParams
  const { slug: pageParam } = resolvedParams;
  if (!pageParam) {
    throw new Error('Page parameter is missing');
  }
  const page = await getPage(pageParam as string);
  let counter = 1;

  return (
    <div className="max-w-4xl mx-auto mt-16">
      <div>
      <svg viewBox="0 0 800 800" className="absolute inset-0 z-20 w-2/4 h-2 mx-auto pointer-events-none" fill="#fff">
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
        className="w-0 w-11/12 h-0 mx-auto mt-4 -mb-20 opacity-0 md:w-max md:h-max md:opacity-100"
        style={{ clipPath: `url(#${page._id})` }}
      />
      <Image
        src={page.image}
        alt="GRL PWR Festival!"
        priority={true}
        height={800}
        width={800}
        className="w-11/12 w-full h-0 h-full mx-auto mt-4 -mb-20 opacity-100 md:w-0 md:opacity-0"
      />
    </div>
    <a href={page.link ? `${page.link}` : ''} key={page._id} className={`md:py-8 ${page.link ? '' : 'pointer-events-none cursor-not-allowed'}`}>
    <h1 className="p-4 pt-8 text-5xl font-extrabold md:px-10 md:pt-12 text-grlPink">
        {page.title}
      </h1>
      </a>
      {page.content.map((content) => (
      <div key={counter++}className="px-4 py-2 md:px-10">
        <PortableText value={content} />
      </div>
      ))}
      <a href={page.link ? `${page.link}` : ''} key={page._id} className={`md:py-8 z-40 ${page.link ? '' : 'pointer-events-none cursor-not-allowed opacity-0'}`}>
      <h1 className="p-4 pt-8 text-2xl font-extrabold md:px-10 text-grlPink">
      {page.title}!
      </h1>
      </a>

    </div>
  );
}

