"use client";

import { useEffect, useRef, useState } from "react";
import { hasAsset, type SanityImageData } from "@/lib/sanity/image";
import SanityImage from "../_components/SanityImage";

type Props = { images: SanityImageData[]; title: string };

/**
 * A swipeable row (native scroll-snap, no JS needed to swipe) that opens a full-screen viewer.
 * Images lazy-load as they come into view.
 */
export default function Gallery({ images: allImages, title }: Props) {
  const images = allImages.filter(hasAsset);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const [openAt, setOpenAt] = useState<number | null>(null);

  useEffect(() => {
    if (openAt === null) return;
    dialogRef.current?.showModal();
    viewerRef.current?.children[openAt]?.scrollIntoView({ behavior: "instant", inline: "start" });
  }, [openAt]);

  const scrollBy = (element: HTMLElement | null, direction: 1 | -1) =>
    element?.scrollBy({ left: direction * element.clientWidth * 0.8, behavior: "smooth" });

  if (!images.length) return null;

  return (
    <div className="relative">
      <div ref={trackRef} className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 md:mx-0 md:px-0">
        {images.map((image, index) => (
          <button
            key={image.asset._ref + index}
            type="button"
            onClick={() => setOpenAt(index)}
            className="shrink-0 snap-start overflow-hidden rounded-3xl focus-visible:outline-offset-[-3px]"
            aria-label={`Vis bilde ${index + 1} av ${images.length} i fullskjerm${image.alt ? `: ${image.alt}` : ""}`}
          >
            <SanityImage
              image={image}
              sizes="(min-width: 768px) 420px, 75vw"
              className="h-64 w-auto max-w-[85vw] object-cover transition duration-300 hover:scale-105 md:h-96"
            />
          </button>
        ))}
      </div>

      {images.length > 2 && (
        <div className="mt-3 hidden justify-end gap-2 md:flex">
          <ArrowButton direction={-1} onClick={() => scrollBy(trackRef.current, -1)} />
          <ArrowButton direction={1} onClick={() => scrollBy(trackRef.current, 1)} />
        </div>
      )}

      <dialog
        ref={dialogRef}
        onClose={() => setOpenAt(null)}
        aria-label={title}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-black/95 p-0 backdrop:bg-black/80"
      >
        <div ref={viewerRef} className="no-scrollbar flex h-full snap-x snap-mandatory overflow-x-auto">
          {openAt !== null &&
            images.map((image, index) => (
              <figure key={image.asset._ref + index} className="flex h-full w-screen shrink-0 snap-center items-center justify-center p-4">
                <SanityImage image={image} sizes="100vw" className="max-h-full w-auto max-w-full object-contain" />
              </figure>
            ))}
        </div>
        <form method="dialog" className="absolute right-3 top-3">
          <button className="rounded-full bg-white px-5 py-2 font-extrabold text-grlPink">Lukk</button>
        </form>
        <div className="absolute bottom-6 left-0 right-0 hidden justify-center gap-3 md:flex">
          <ArrowButton direction={-1} onClick={() => scrollBy(viewerRef.current, -1)} />
          <ArrowButton direction={1} onClick={() => scrollBy(viewerRef.current, 1)} />
        </div>
      </dialog>
    </div>
  );
}

function ArrowButton({ direction, onClick }: { direction: 1 | -1; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === 1 ? "Neste bilder" : "Forrige bilder"}
      className="grid size-12 place-items-center rounded-full bg-grlPink text-2xl font-extrabold text-white transition hover:scale-110 hover:bg-grlGreen"
    >
      {direction === 1 ? "→" : "←"}
    </button>
  );
}
