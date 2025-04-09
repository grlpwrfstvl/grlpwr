import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { blobPaths } from './blobpaths';


interface ArtistCardProps {
  artist: { slug: string; image: string; name: string; _id: string };
  size?:  number;
  index: number; 
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist, size = 500, index }) => {
  const randomIndex = Math.floor(Math.random() * blobPaths.length);
  const blobPath = blobPaths[randomIndex % blobPaths.length];
  const clipPathId = `blob-clip-${index}`;
  const firstInRow = index % 2 === 1;
  const firstBounce = index === 1 || index === 4 || index === 7 || index === 10;
  const secondBounce = index === 2 || index === 5 || index === 8 || index === 11;
  const thirdBounce = index === 0 || index === 3 || index === 6 || index === 9;


  return (
<Link href={`/artists/${artist.slug}`} key={artist._id} className={`relative w-full ${firstBounce? 'moving-object2' : ''} ${secondBounce ? 'moving-object3' : ''} ${thirdBounce ? 'moving-object4' : ''} `}>
  <h2 className={`absolute z-50 p-5 text-2xl md:text-3xl font-extrabold ${firstInRow ? 'top-2/3' : 'top-1/3'} text-white transform -translate-y-1/2  left-1/4 -translate-x-1/4 drop-shadow-lg`}>{artist.name}</h2>
  <svg viewBox={`0 0 ${size} ${size}`} className={`w-full ${firstInRow ? 'md:mt-24' : ''} transition-transform transform hover:-translate-y-2`} fill="#fff">
    <defs>
      <clipPath id={clipPathId}>
        <path d={blobPath} transform="translate(10 10) scale(1.1 1.1)" />
      </clipPath>
    </defs>
    <image href={artist.image} width={size} height={size} clipPath={`url(#${clipPathId})`} />
  </svg>
</Link>
  );
};

export default ArtistCard;


