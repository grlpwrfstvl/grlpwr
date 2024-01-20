import Image from 'next/image';
import { blobPaths } from './blobpaths';

interface ImageBlobProps {
  imagelink: string;
  id: string;
  alt: string;
  title?: string;
}

const getRandomBlobPath = () => {
  const randomIndex = Math.floor(Math.random() * blobPaths.length);
  return blobPaths[randomIndex % blobPaths.length];
};

const ImageBlob: React.FC<ImageBlobProps> = ({ imagelink, id, alt, title }) => {
  const blobPath = getRandomBlobPath();

  return (
    <div className="w-full relative">
      {/* First SVG */}
      <svg viewBox="5 0 500 500" className="absolute z-10" fill="#fff">
        <clipPath id={`${id}-small`}>
          <path d={blobPath} transform="translate(10 0) scale(0.82)" />
        </clipPath>
      </svg>

      {/* Image with clip path */}
      <Image
        src={imagelink}
        alt={alt}
        width={500}
        height={500}
        className="z-10 opacity-100 md:opacity-0 md:h-0 hover:-translate-y-2 overflow-visible"
        style={{ clipPath: `url(#${id}-small)` }}
      />

      {/* Second SVG */}
      <svg viewBox="0 0 500 500" className="absolute z-20 h-0" fill="#fff">
        <clipPath id={`${id}-large`}>
          <path d={blobPath} transform="translate(40 0) scale(1.08)" />
        </clipPath>
      </svg>

      {/* Image with clip path */}
      <Image
        src={imagelink}
        alt={alt}
        width={500}
        height={500}
        className="z-10 hover:-translate-y-2 opacity-0 md:opacity-100 h-0 md:h-full overflow-visible"
        style={{ clipPath: `url(#${id}-large)` }}
      />
    </div>
  );
};

export default ImageBlob;


// "use client"
// import Image from 'next/image';
// import { blobPaths, squareBlob } from './blobpaths';

// interface ImageBlobProps {
//     imagelink: string;
//     id: string;
//     alt: string;
//     title?: string;
//   }

// const ImageBlob: React.FC<ImageBlobProps> = ({ imagelink, id, alt, title }) => {
//   const randomIndex = Math.floor(Math.random() * blobPaths.length);
//   const blobPath = blobPaths[randomIndex % blobPaths.length];


// return (
// <div className="w-full relative">
// <svg viewBox="5 0 500 500" className="absolute z-10" fill="#fff">
//       <clipPath id={id}>
//       <path d={blobPath}  transform="translate(10 0) scale(0.8)" />
//       </clipPath>
//       </svg>
//     <Image
//     src={imagelink}
//     alt={alt}
//     width={500}
//     height={500}
//     className='z-10 opacity-100 md:opacity-0 md:h-0 hover:-translate-y-2 overflow-visible'
//     style={{ clipPath: `url(#${id})` }}
//     />
// <svg viewBox="0 0 500 500" className="absolute z-20" fill="#fff">
// <clipPath id={id}>
// <path d={blobPath}  transform="translate(40 0) scale(1)" />
// </clipPath>
// </svg>
// <Image
// src={imagelink}
// alt={alt}
// width={500}
// height={500}
// className='z-10 hover:-translate-y-2 opacity-0 md:opacity-100 h-0 md:h-full overflow-visible'

// style={{ clipPath: `url(#${id})` }}
// />

// </div>

// );
// };

// export default ImageBlob;


{/* <svg viewBox="0 0 400 400" className="absolute h-0 z-20" fill="#fff">
<clipPath id={id}>
<path d={blobPath}  transform="translate(-10 0) scale(0.1)" />
</clipPath>
</svg>
<Image
src={imagelink}
alt={alt}
width={400}
height={400}
className='z-10 opacity-100 md:opacity-0 md:h-0 hover:-translate-y-2 overflow-visible'
style={{ clipPath: `url(#${id})` }}
/> */}
