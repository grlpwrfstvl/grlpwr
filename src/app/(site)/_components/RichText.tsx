import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "next-sanity";
import Link from "next/link";
import { hasAsset, type SanityImageData } from "@/lib/sanity/image";
import { isExternal } from "./Button";
import SanityImage from "./SanityImage";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2 className="mt-10 mb-3 text-3xl font-extrabold text-grlPink md:text-4xl">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-8 mb-2 text-2xl font-extrabold text-grlGreen">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-grlPink pl-4 text-2xl font-extrabold text-grlPink">{children}</blockquote>
    ),
    normal: ({ children }) => <p className="my-4 first:mt-0 last:mb-0">{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul className="my-4 list-disc space-y-1 pl-6 marker:text-grlPink">{children}</ul>,
    number: ({ children }) => <ol className="my-4 list-decimal space-y-1 pl-6 marker:font-extrabold marker:text-grlPink">{children}</ol>,
  },
  marks: {
    link: ({ value, children }) => {
      const href: string = value?.href ?? "";
      const className = "underline decoration-2 underline-offset-4 decoration-grlPink hover:text-grlPink";
      return isExternal(href) ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
          {children}
        </a>
      ) : (
        <Link href={href} className={className}>
          {children}
        </Link>
      );
    },
  },
  types: {
    image: ({ value }: { value: SanityImageData & { caption?: string } }) =>
      hasAsset(value) ? (
        <figure className="my-8">
          <SanityImage image={value} sizes="(min-width: 768px) 700px, 92vw" className="w-full h-auto rounded-3xl" />
          {value.caption && <figcaption className="mt-2 text-sm font-semibold text-gray-600">{value.caption}</figcaption>}
        </figure>
      ) : null,
  },
};

type Blocks = { _type: string; _key: string }[] | null | undefined;

export default function RichText({ value, className }: { value: Blocks; className?: string }) {
  if (!value?.length) return null;
  return (
    <div className={className}>
      <PortableText value={value as PortableTextBlock[]} components={components} />
    </div>
  );
}
