import { PortableText } from "@portabletext/react";
import { getPage } from "../../../../sanity/sanity-utils";
import Image from "next/image";
import { blobPaths } from "../components/blobpaths";
import { useMemo } from "react";

type Props = {
  params: { 
    slug: string 
  };
};

export const revalidate = 0;

export default async function Page({ params }: Props) {
  const page = await getPage(params.slug);
  return <PageComponent page={page} />;
}

type ImageComponentProps = {
  src: string;
  alt: string;
  clipPathId?: string;
  className?: string;
};

const ImageComponent = ({ src, alt, clipPathId, className }: ImageComponentProps) => (
  <Image
    src={src}
    alt={alt}
    priority={true}
    height={800}
    width={800}
    className={className}
    style={{ clipPath: clipPathId ? `url(#${clipPathId})` : undefined }}
  />
);

type TitleComponentProps = {
  link: string;
  title: string;
  className?: string;
};

const TitleComponent = ({ link, title, className = '' }: TitleComponentProps) => (
  <a href={link || ''} className={`${className} ${link ? '' : 'pointer-events-none cursor-not-allowed'}`}>
    <h1 className="p-4 pt-8 text-5xl font-extrabold md:px-10 md:pt-12 text-grlPink">
      {title}
    </h1>
  </a>
);

const PageComponent = ({ page }: { page: any }) => {
  const clipPathId = useMemo(() => page._id, [page._id]);

  return (
    <div className="max-w-4xl mx-auto mt-16">
      <div>
        <svg viewBox="0 0 800 800" className="absolute inset-0 z-20 w-2/4 h-2 mx-auto pointer-events-none" fill="#fff">
          <clipPath id={clipPathId}>
            <path d={blobPaths[3]} transform="scale(1.9, 1.25)" />
          </clipPath>
        </svg>
        <ImageComponent
          src={page.image}
          alt="GRL PWR Festival!"
          clipPathId={clipPathId}
          className="w-0 w-11/12 h-0 mx-auto mt-4 -mb-20 opacity-0 md:w-max md:h-max md:opacity-100"
        />
        <ImageComponent
          src={page.image}
          alt="GRL PWR Festival!"
          className="w-11/12 w-full h-0 h-full mx-auto mt-4 -mb-20 opacity-100 md:w-0 md:opacity-0"
        />
      </div>
      <TitleComponent link={page.link} title={page.title} className="md:py-8" />
      {page.content.map((content: any, index: number) => (
        <div key={index} className="px-4 py-2 md:px-10">
          <PortableText value={content} />
        </div>
      ))}
      <TitleComponent link={page.link} title={`${page.title}!`} className="z-40 opacity-0 md:py-8" />
    </div>
  );
};



// export default async function Artist({params}: Props) {
//   const artist = await getArtist(params.artist);