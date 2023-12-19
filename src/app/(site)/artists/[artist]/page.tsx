import { getArtist } from "../../../../../sanity/sanity-utils";
import { blobPaths } from "../../components/blobpaths";
import Image from "next/image";
import { PortableText } from '@portabletext/react';
import TextBlob from "../../components/textBlob";


type Props = {
  params: {artist: string};
};

export default async function Artist({params}: Props) {
  const slug = params.artist;
  const artist = await getArtist(slug);


  return (
    <main className="pl-12">
      <div className="relative max-w-5xl w-full flex flex-row">
      <svg viewBox="5 0 500 500" className="absolute inset-0 z-20" fill="#fff">
      <clipPath id={artist._id}>
      <path d={blobPaths[1]} transform="scale(1.2)" />
      </clipPath>
      </svg>
    <Image
    src={artist.image}
    alt={artist.name}
    width={550}
    height={550}
    className='z-40 moving-object'
    style={{ clipPath: `url(#${artist._id})` }}
    />
    <div className="w-2/6  relative">
    <svg viewBox="0 0 500 500" className="absolute inset-0 z-10 mt-8">
    <path d={blobPaths[3]} fill="#e82265" transform="scale(0.8" />
    <p className="text-black z-20 font-semibold font-xl">{artist.stage}</p>
    </svg>
    </div>
</div>


<div className="relative max-w-5xl w-full">
  <svg viewBox="-10 0 400 350" className="absolute inset-0 -z-10 -mt-28">
    <path d={blobPaths[2]} fill="#e82265" transform="scale(0.95, 0.8)" />
  </svg>
  <div className="relative z-10 w-3/4 text-white font-semibold pt-10 mx-auto">
      <PortableText value={artist.description} />
  </div>
</div>


    </main>
  )
}


