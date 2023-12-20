import { getArtist } from "../../../../../sanity/sanity-utils";
import { blobPaths } from "../../components/blobpaths";
import Image from "next/image";
import { PortableText } from '@portabletext/react';
import instaLogo from '../../assets/Instagram_Glyph_White.png'
import spotifyLogo from '../../assets/Spotify_Logo_CMYK_White.png'

type Props = {
  params: {artist: string};
};

export default async function Artist({params}: Props) {
  const slug = params.artist;
  const artist = await getArtist(slug);
  const playTime = new Date(artist.time); 
  const dateOptions: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' };
  const timeOptions: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric' };

  const formattedDate = playTime.toLocaleDateString("no", dateOptions);
  const formattedTime = playTime.toLocaleTimeString("no", timeOptions);


  return (
    <main className="pl-12">
      <div className="relative max-w-5xl w-full flex flex-row">
      <svg viewBox="5 0 400 400" className="absolute inset-0 z-20" fill="#fff">
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
    <div className="w-2/6 h-64 mt-20 relative">
    <svg viewBox="0 0 500 500" className="absolute inset-0 z-10">
    <path d={blobPaths[3]} fill="#e82265" transform="scale(1)"/>
    </svg>
    <div className="text-white z-20 absolute pt-10 top-1 pl-14 left-1 font-semibold font-bold text-lg">
    <h2 className="text-xl">{artist.name}</h2>
    <br />
    <h2>{formattedDate}</h2>
    <h2>{formattedTime}</h2>
    <h2>{artist.stage}</h2>
    <div className="flex items-center justify-center gap-6">
    <a
    href={"https://"+artist.instagram}
    target="_blank" 
    rel="noopener noreferrer">
        <Image src={instaLogo} alt="Link to artists instagram" className="w-8 h-8 transition-transform transform-gpu hover:scale-110" />

    </a>
    <a
    href={"https://"+artist.spotify}
    target="_blank" 
    rel="noopener noreferrer">
        <Image src={spotifyLogo} alt="Link to artists spotify" className="w-8 h-8 transition-transform transform-gpu hover:scale-110" />

    </a>
    <a
    href="https://www.nrk.no"
    target="_blank" 
    rel="noopener noreferrer">
        <Image src={spotifyLogo} alt="Link to artists spotify" className="w-8 h-8 transition-transform transform-gpu hover:scale-110" />

    </a>
    </div>
    </div>
    </div>
</div>


<div className="relative max-w-5xl w-full">
  <svg viewBox="-10 0 400 350" className="absolute inset-0 -z-10 -mt-28">
    <path d={blobPaths[2]} fill="#e82265" transform="scale(0.95, 0.6)" />
  </svg>
  <div className="relative z-10 w-3/4 text-white font-semibold pt-10 mx-auto">
      <PortableText value={artist.description} />
  </div>
</div>


    </main>
  )
}


