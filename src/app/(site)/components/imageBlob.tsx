"use client"
import Image from 'next/image';
import { blobPaths, squareBlob } from './blobpaths';

interface ImageBlobProps {
    imagelink: string;
    id: string;
    alt: string;
  }

const ImageBlob: React.FC<ImageBlobProps> = ({ imagelink, id, alt }) => {
  const randomIndex = Math.floor(Math.random() * blobPaths.length);
  const blobPath = blobPaths[randomIndex % blobPaths.length];


return (
<div className="w-full">
<svg width="100%" height="100%" viewBox="5 0 500 500" className="absolute h-0 z-20" fill="#fff">
      <clipPath id={id}>
      <path d={blobPath}  transform="translate(40 0) scale(1.1)" />
      </clipPath>
      </svg>
    <Image
    src={imagelink}
    alt={alt}
    width={500}
    height={500}
    className='z-40 opacity-0 h-0 md:opacity-100 md:h-full'
    style={{ clipPath: `url(#${id})` }}
    />
    <svg width="100%" height="100%" viewBox="0 0 400 400" className="absolute h-0 z-20" fill="#fff">
      <clipPath id={id}>
      <path d={blobPath}  transform="translate(0 0) scale(0.6)" />
      </clipPath>
      </svg>
    <Image
    src={imagelink}
    alt={alt}
    width={400}
    height={400}
    className='z-40 opacity-100 md:opacity-0 md:h-0'
    style={{ clipPath: `url(#${id})` }}
    />
</div>

);
};

export default ImageBlob;
