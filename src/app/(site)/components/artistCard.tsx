import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { blobPaths } from './blobpaths';


interface ArtistCardProps {
  artist: { slug: string; image: string; name: string; _id: string };
  size?: number;
  index: number; 
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist, size = 300, index }) => {
  const randomIndex = Math.floor(Math.random() * blobPaths.length);
  const blobPath = blobPaths[randomIndex % blobPaths.length];
  const clipPathId = `blob-clip-${index}`;
  const isMiddleCard = index % 3 === 1;

  return (
    <Link href={`/artists/${artist.slug}`} key={artist._id} className={`-mx-6 -my-6 z-10 relative overflow-visible ${isMiddleCard ? 'mb-0' : 'mt-0'} transition-transform transform hover:-translate-y-2`}>
      <svg viewBox={`0 0 ${size} ${size}`} className="absolute top-0 left-0 z-10" fill="#fff">
        <clipPath id={clipPathId}>
          <path d={blobPath} transform=" translate(0 0) scale(0.7, 0.68)" />
        </clipPath>
      </svg>
      <Image src={artist.image} alt={artist.name} width={size} height={size} className='z-10 overflow-visible' style={{ clipPath: `url(#${clipPathId})` }} />
      <h2 className="z-20 absolute bottom-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 p-4 font-extrabold text-2xl text-white">{artist.name}</h2>
    </Link>
  );
};

export default ArtistCard;
