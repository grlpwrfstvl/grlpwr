import { blobPaths } from '@/lib/utils/blob';
import { transformedSanityUrl } from '@/lib/sanity/image';

interface ImageBlobProps {
  imagelink: string;
  id: string;
}

const getRandomBlobPath = () => {
  const randomIndex = Math.floor(Math.random() * blobPaths.length);
  return blobPaths[randomIndex % blobPaths.length];
};

const ImageBlob: React.FC<ImageBlobProps> = ({ imagelink, id}) => {
  const blobPath = getRandomBlobPath();
  const optimizedImageLink = transformedSanityUrl(imagelink, 900, 70);

  return (
    <div>
  <svg viewBox={`0 0 ${500} ${500}`} className={`w-full`} fill="#fff">
    <defs>
      <clipPath id={id}>
        <path d={blobPath} transform="translate(10 10) scale(1.1 1.1)" />
      </clipPath>
    </defs>
    <image href={optimizedImageLink} width={500} height={500} clipPath={`url(#${id})`} />
  </svg>
  </div>
  );
};

export default ImageBlob;
