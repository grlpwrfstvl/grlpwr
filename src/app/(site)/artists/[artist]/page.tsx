import { getArtist } from "../../../../../sanity/sanity-utils";
import { blobPaths } from "../../components/blobpaths";
import Image from "next/image";
import { PortableText } from '@portabletext/react';
import instaLogo from '../../assets/Instagram_Glyph_White.png'
import spotifyLogo from '../../assets/Spotify_Logo_CMYK_White.png'
import ArtistPortrait from "../../components/artistPortrait";
import ArtistPortraitSmall from "../../components/artistPortraitSmall";


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

  const instaLink = artist.instagram;
  const spotiLink = artist.spotify;

  console.log(instaLink);

  return (
    <main className="pl-0 md:pl-12">
      <div className="relative max-w-5xl w-full flex flex-col md:flex-row">

    <div className='z-40 opacity-0 w-0 md:w-max md:opacity-100'>
    <ArtistPortrait key={artist._id} artist={artist} />
    </div>
    <div 
     className='z-20 opacity-100 -mb-20 md:opacity-0 w-100vw md:w-0 object-cover object-center'>
      <ArtistPortraitSmall key={artist._id} artist={artist} index={1}          />
    </div>

    <div className="w-4/6 z-30 md:w-2/6 h-48 mt-0 md:mt-20 relative moving-object">
    <svg viewBox="0 0 500 500" className="absolute inset-0 z-10">
    <path d={blobPaths[2]} fill="#e82265" transform="scale(1)"/>
    </svg>
    <div className="text-white z-20 absolute pt-7 md:pt-10 top-1 pl-6 md:pl-12 left-1 font-semibold font-bold text-base md:text-lg">
    <h2 className="text-lg md:text-2xl">{artist.name}</h2>
    <h2>{formattedDate}</h2>
    <h2>{formattedTime}</h2>
    <h2>{artist.stage}</h2>
    <div className="flex justify-center p-4 gap-8">
    {artist.instagram && (
    <a
    href={"https://"+instaLink}
    target="_blank" 
    rel="noopener noreferrer">
        <Image src={instaLogo} alt="Link to artists instagram" className="w-8 h-8 transition-transform transform-gpu hover:scale-110" />

    </a>
    )}
    {artist.spotify && (
    <a
    href={"https://"+spotiLink}
    target="_blank" 
    rel="noopener noreferrer">
        <Image src={spotifyLogo} alt="Link to artists spotify" className="w-8 h-8 transition-transform transform-gpu hover:scale-110" />

    </a>
    )}
    </div>
    </div>
    </div>
  </div>


  <div className="relative max-w-5xl w-full">
  <svg viewBox="-10 0 400 350" className="absolute opacity-0 md:opacity-100 inset-0 -z-10 -mt-28">
    <path d={blobPaths[2]} fill="#e82265" transform="scale(0.93, 0.58)" />
  </svg>
  <div className="relative z-10 w-full md:w-3/4 px-4 md:px-0 text-grlPink md:text-white font-semibold pt-10 mx-auto">
      <PortableText value={artist.description} />
  </div>
  </div>

    </main>
  )
}




