"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';

  interface CarouselProps {
    images: string[];
  }

  const Carousel: React.FC<CarouselProps> = ({ images }: CarouselProps) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [isFullSize, setIsFullSize] = useState(false);

  if (!images?.length) {
    return null;
  }

  const toggleFullScreen = () => {
    setIsFullSize(!isFullSize);
  };

  const handlePrev = () => {
    setCurrentImage((currentImage) => (currentImage === 0 ? images.length - 1 : currentImage - 1));
  };

  const handleNext = () => {
    setCurrentImage((currentImage) => (currentImage === images.length - 1 ? 0 : currentImage + 1));
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((previousImage) => (previousImage === images.length - 1 ? 0 : previousImage + 1));
    }, 3500);

    return () => clearInterval(intervalId);
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        handlePrev();
      }

      if (event.key === 'ArrowRight') {
        handleNext();
      }

      if (event.key === 'Escape' && isFullSize) {
        setIsFullSize(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullSize, images.length]);

  return (
    <div>
      {isFullSize ? (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen bg-black bg-opacity-80">
          <button
            type="button"
            className="absolute h-full p-10 text-4xl text-white opacity-10 md:opacity-80 left-1"
            onClick={handlePrev}
            aria-label="Forrige bilde"
          >
            &#10094;
          </button>
          <div className="relative w-[90vw] h-[85vh]">
            <Image
              src={images[currentImage]}
              alt="Full Size Image"
              fill
              onClick={toggleFullScreen}
              className="object-contain cursor-pointer"
              sizes="90vw"
            />
          </div>
          <button
            type="button"
            className="absolute bottom-0 h-full p-10 text-4xl text-white opacity-10 md:opacity-80 right-1"
            onClick={handleNext}
            aria-label="Neste bilde"
          >
            &#10095;
          </button>
          <button type="button" onClick={toggleFullScreen} className="absolute text-white top-2 right-2">
            Lukk
          </button>
        </div>
      ) : (
        <div className="relative flex items-center justify-center pb-12 mx-auto my-4">
          <button
            type="button"
            className="absolute bottom-0 p-2 text-3xl md:text-6xl left-8 md:left-12 md:bottom-auto text-grlPink"
            onClick={handlePrev}
            aria-label="Forrige bilde"
          >
            &#10094;
          </button>

          <div className="relative w-[88vw] max-w-4xl h-[52vh] sm:h-[58vh] md:h-[64vh] rounded-md overflow-hidden">
            <Image
              src={images[currentImage]}
              onClick={toggleFullScreen}
              className="object-contain cursor-pointer"
              fill
              sizes="(max-width: 768px) 88vw, 1024px"
              alt={`Image ${currentImage + 1}`}
            />
          </div>

          <button
            type="button"
            className="absolute bottom-0 p-2 text-3xl md:text-6xl right-8 md:right-12 md:bottom-auto text-grlPink"
            onClick={handleNext}
            aria-label="Neste bilde"
          >
            &#10095;
          </button>
        </div>
      )}
      </div>
  );
};

export default Carousel;
