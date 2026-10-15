import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchSanity, fetchSanityStatic } from "@/lib/sanity/fetch";
import { hasAsset, sanityImageUrl } from "@/lib/sanity/image";
import { PAGE_QUERY, PAGE_SLUGS_QUERY } from "@/lib/sanity/queries";
import BlobImage from "../_components/BlobImage";
import { PageTitle } from "../_components/Heading";
import Sections from "../_components/Sections";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return fetchSanityStatic(PAGE_SLUGS_QUERY);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await fetchSanity(PAGE_QUERY, { slug: (await params).slug });
  if (!page) return {};
  const image = hasAsset(page.seo?.image) ? page.seo.image : hasAsset(page.image) ? page.image : null;
  return {
    title: page.seo?.title || page.title,
    description: page.seo?.description ?? undefined,
    openGraph: image ? { images: [{ url: sanityImageUrl(image, 1200, 1200 / 630), width: 1200, height: 630 }] } : undefined,
  };
}

export default async function Page({ params }: Props) {
  const page = await fetchSanity(PAGE_QUERY, { slug: (await params).slug });
  if (!page) notFound();

  return (
    <article>
      {hasAsset(page.image) && (
        <BlobImage
          image={page.image}
          id={page._id}
          aspectRatio={16 / 10}
          priority
          sizes="(min-width: 768px) 70vw, 92vw"
          className="mx-auto mb-10 max-w-4xl"
        />
      )}
      <div className="mx-auto max-w-3xl">
        <PageTitle>{page.title}</PageTitle>
      </div>
      <Sections sections={page.sections} />
    </article>
  );
}
