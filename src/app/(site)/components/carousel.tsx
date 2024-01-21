"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';

  interface CarouselProps {
    images: string[];
  }

  const Carousel: React.FC<CarouselProps> = ({ images }: CarouselProps) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [isFullSize, setIsFullSize] = useState(false);

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
        setCurrentImage(currentImage === images.length - 1 ? 0 : currentImage + 1);
    }, 3500);
    return () => clearInterval(intervalId);
}, [images.length, currentImage]);

  return (
    <div>
      {isFullSize ? (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-80 flex items-center justify-center z-50">
        <button className="h-full p-10 text-4xl text-white absolute opacity-10 md:opacity-80 left-1" onClick={handlePrev}>&#10094;</button>
          <Image
            src={images[currentImage]}
            alt="Full Size Image"
            height="800"
            width="800"
            onClick={toggleFullScreen}
            className="my-6 cursor-pointer h-full w-auto"
          />
          <button className="h-full p-10 text-4xl text-white absolute opacity-10 md:opacity-80 right-1 bottom-0" onClick={handleNext}>&#10095;</button>
          <button onClick={toggleFullScreen} className="text-white absolute top-2 right-2">
            Lukk
          </button>
        </div>
      ) : (
    <div className="mx-auto flex items-center relative justify-center my-4 pb-12">
        <button className="text-3xl md:text-6xl absolute p-2 left-20 bottom-0 md:bottom-auto text-grlPink" onClick={handlePrev}>&#10094;</button>

  <Image
    src={images[currentImage]}
    onClick={toggleFullScreen}
    className="h-full w-5/6 md:w-1/2 object-contain"
    height="600"
    width="600"
    alt={`Image ${currentImage}`}
  />
  <button className="text-3xl md:text-6xl absolute p-2 right-20 bottom-0 md:bottom-auto text-grlPink" onClick={handleNext}>&#10095;</button>
</div>
      )}
      </div>
  );
};

export default Carousel;

// "use client"

// import { useState, useEffect } from 'react';
// import ImageViewer from './viewImage';

//   interface CarouselProps {
//     images: string[];
//   }


//   const Carousel: React.FC<CarouselProps> = ({ images }: CarouselProps) => {
//     const [currentImage, setCurrentImage] = useState(0);


//   const handlePrev = () => {
//     setCurrentImage((currentImage) => (currentImage === 0 ? images.length - 1 : currentImage - 1));
//   };

//   const handleNext = () => {
//     setCurrentImage((currentImage) => (currentImage === images.length - 1 ? 0 : currentImage + 1));
//   };

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//         setCurrentImage(currentImage === images.length - 1 ? 0 : currentImage + 1);
//     }, 3500);
//     return () => clearInterval(intervalId);
// }, [currentImage]);

//   return (
//     <div className="mx-10 py-2 max-h-150 h-96 flex items-center justify-center my-10">
//         <button className="text-4xl" onClick={handlePrev}>&#8592;</button>

//   <img
//     src={images[currentImage]}
//     onClick={---}
//     className="h-full w-full object-contain"
//     alt={`Image ${currentImage}`}
//   />
//   <button className="text-4xl" onClick={handleNext}>&#8594;</button>
// </div>
//   );
// };

// export default Carousel;

{/* <div className="h-98 w-auto my-10 overflow-hidden background-black">
  <img
    src={images[currentImage]}
    onClick={handleNext}
    className="h-full w-full object-cover"
    alt={`Image ${currentImage}`}
  />
</div> */}


{/* <button
onClick={handlePrev}
className="absolute top-1/2 left-10 transform -translate-y-1/2 text-2xl"
>
&lt;
</button>
<button
onClick={handleNext}
className="absolute top-1/2 right-10 transform -translate-y-1/2 text-2xl"
>
&gt;
</button> */}