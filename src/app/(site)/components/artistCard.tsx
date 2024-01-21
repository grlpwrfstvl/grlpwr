import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { blobPaths } from './blobpaths';


interface ArtistCardProps {
  artist: { slug: string; image: string; name: string; _id: string };
  size?:  number;
  index: number; 
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist, size = 400, index }) => {
  const randomIndex = Math.floor(Math.random() * blobPaths.length);
  const blobPath = blobPaths[randomIndex % blobPaths.length];
  const clipPathId = `blob-clip-${index}`;
  const isMiddleCard = index % 2 === 1;

  return (
    <Link href={`/artists/${artist.slug}`} key={artist._id} className={`z-10 h-72 w-full relative overflow-visible ${isMiddleCard ? 'md:mt-32' : 'md:-mb-10'} transition-transform transform hover:-translate-y-2`}>
      <svg viewBox={`0 0 ${size} ${size}`} className="absolute top-0 z-10" fill="#fff">
        <clipPath id={clipPathId}>
          <path d={blobPath} transform="translate(18 0) scale(0.83)" />
        </clipPath>
      </svg>
      <Image src={artist.image} alt={artist.name} width={size} height={size} className='z-10 overflow-visible' style={{ clipPath: `url(#${clipPathId})` }} />
      <h2 className="z-20 transform absolute p-5 bottom-1 left-14 transform font-extrabold text-2xl text-white drop-shadow-lg">{artist.name}</h2>
    </Link>
  );
};

export default ArtistCard;
