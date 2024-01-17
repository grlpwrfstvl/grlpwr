import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { blobPaths } from './blobpaths';


interface ArtistCardProps {
  artist: { slug: string; image: string; name: string; _id: string };
  size?:  number;
  index: number; 
}

const ArtistPortraitSmall: React.FC<ArtistCardProps> = ({ artist, size = 500, index }) => {
  const randomIndex = Math.floor(Math.random() * blobPaths.length);
  const blobPath = blobPaths[randomIndex % blobPaths.length];
  const clipPathId = `blob-clip-${index}`;

  return (
    <div key={artist._id} className={`z-10 h-72 w-full relative overflow-visible`}>
      <svg viewBox={`0 0 ${size} ${size}`} className="absolute top-0 z-10" fill="#fff">
        <clipPath id={clipPathId}>
          <path d={blobPath} transform=" translate(0 0) scale(0.9, 0.8)" />
        </clipPath>
      </svg>
      <Image src={artist.image} alt={artist.name} width={size} height={size} className='z-10 overflow-visible' style={{ clipPath: `url(#${clipPathId})` }} />
    </div>
  );
};

export default ArtistPortraitSmall;
