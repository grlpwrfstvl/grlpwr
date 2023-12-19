import React from 'react';
import Image from 'next/image';
import { blobPaths } from './blobpaths';

interface ImageBlobProps {
  image: string;
  alt?: string;
  height?: number;
  index: number;
}

const ImageBlob: React.FC<ImageBlobProps> = ({ image, alt = "grl pwr festival!", height = 500, index }) => {
  const randomIndex = Math.floor(Math.random() * blobPaths.length);
  const blobPath = blobPaths[randomIndex % blobPaths.length];
  const clipPathId = `blob-clip-${index}`;

  return (
    <div key={index} className={`image-blob-container`} >
      <svg viewBox={`0 0 ${height}`} className="blob-svg" fill="#fff">
        <clipPath id={clipPathId}>
          <path d={blobPath} transform={`translate(0 0) scale(${1})`} />
        </clipPath>
      </svg>
      <Image
        src={image}
        alt={alt}
        height={height}
        width={height}
        className='image-blob-image'
        style={{ clipPath: `url(#${clipPathId})` }}
      />
    </div>
  );
};

export default ImageBlob;
