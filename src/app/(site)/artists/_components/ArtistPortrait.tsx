import { blobPaths } from '@/lib/utils/blob';
import { transformedSanityUrl } from '@/lib/sanity/image';

interface ArtistPortraitProps {
    artist: { slug: string; image: string; name: string; _id: string };
  }

const ArtistPortrait: React.FC<ArtistPortraitProps> = ({ artist }) => {
  const randomIndex = Math.floor(Math.random() * blobPaths.length);
  const blobPath = blobPaths[randomIndex % blobPaths.length];
  const optimizedImageLink = transformedSanityUrl(artist.image, 900, 70);


return (
<div className="relative w-full">
<svg viewBox="5 0 500 500" className="inset-0 z-20 w-full" fill="#fff">
<defs>
      <clipPath id={artist._id}>
      <path d={blobPath}  transform="translate(24 0) scale(1.14)" />
      </clipPath>
    </defs>
    <image
    href={optimizedImageLink}
    width={500}
    height={500}
    className='z-40'
    clipPath={`url(#${artist._id})`}
    />
      </svg>

</div>

);
};

export default ArtistPortrait;
