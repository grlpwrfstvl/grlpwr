"use client"
import Image from 'next/image';
import { blobPaths } from './blobpaths';

interface ArtistPortraitProps {
    artist: { slug: string; image: string; name: string; _id: string };
  }

const ArtistPortrait: React.FC<ArtistPortraitProps> = ({ artist }) => {

return (
<div className="w-full">
<svg width="100%" height="100%" viewBox="5 0 500 500" className="absolute h-0 md:h-max inset-0 z-20" fill="#fff">
      <clipPath id={artist._id}>
      <path d={blobPaths[1]} transform="scale(1.2)" />
      </clipPath>
      </svg>
    <Image
    src={artist.image}
    alt={artist.name}
    width={500}
    height={500}
    className='z-40 moving-object'
    style={{ clipPath: `url(#${artist._id})` }}
    />
</div>

);
};

export default ArtistPortrait;
