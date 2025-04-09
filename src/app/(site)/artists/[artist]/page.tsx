import { getArtist } from "../../../../../sanity/sanity-utils";
import { blobPaths } from "../../components/blobpaths";
import Image from "next/image";
import { PortableText } from '@portabletext/react';
import instaLogo from '../../assets/Instagram_Glyph_White.png'
import spotifyLogo from '../../assets/Spotify_Logo_CMYK_White.png'
import ArtistPortrait from "../../components/artistPortrait";
import ArtistPortraitSmall from "../../components/artistPortraitSmall";

export const revalidate = 0;


export default async function Artist({ params }: any) {
  const { artist: artistParam } = await params;
  const artist = await getArtist(artistParam);


  const playTime = new Date(artist.time); 
  const dateOptions: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' };
  const timeOptions: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric', timeZone: 'Europe/Oslo' };
  const formattedDate = playTime.toLocaleDateString("no", dateOptions);
  const formattedTime = playTime.toLocaleTimeString("no", timeOptions);

  const instaLink = artist.instagram;
  const spotiLink = artist.spotify;

  const nameLength = artist.name.length;
  const nameSize = nameLength>18? "lg" : "xl";

  return (
    <main className="pl-0 md:pl-12">
      <div className="relative flex flex-col w-full max-w-5xl mb-6 md:flex-row">

    <div className='z-10 pl-4 -mb-16 md:w-2/3 md:-mb-0 md:pl-0'>
    <ArtistPortrait key={artist._id} artist={artist} />
    </div>

    <div className="relative z-20 w-4/6 h-40 mt-0 md:w-2/6 md:mt-24 moving-object">
    <svg viewBox="0 0 500 500" className="absolute inset-0 z-10">
    <path d={blobPaths[2]} fill="#e82265" transform="scale(1.05)"/>
    </svg>
    <div className="absolute z-30 w-3/4 pt-8 pl-6 text-base font-bold text-white md:pt-12 top-1 md:pl-6 left-1 md:text-lg">
    <h2 className={`text-${nameSize} md:text-2xl`}>{artist.name}</h2>
    <p>{formattedDate}</p>
    <p>{formattedTime}</p> 
    {/* <h2>Tidspunkt: tba</h2> */}
    <p>{artist.stage}</p>
    <div className="flex justify-center gap-8 p-2 md:p-5">
    {artist.instagram && (
    <a
    href={instaLink}
    target="_blank" 
    rel="noopener noreferrer">
        <Image src={instaLogo} alt="Link to artists instagram" className="w-8 h-8 transition-transform transform-gpu hover:scale-110" />

    </a>
    )}
    {artist.spotify && (
    <a
    href={spotiLink}
    target="_blank" 
    rel="noopener noreferrer">
        <Image src={spotifyLogo} alt="Link to artists spotify" className="w-8 h-8 transition-transform transform-gpu hover:scale-110" />

    </a>
    )}
    </div>
    </div>
    </div>
  </div>


  <div className="relative w-full max-w-5xl">
  <svg viewBox="-10 0 400 350" className="absolute inset-0 opacity-0 md:opacity-100 -z-10 -mt-28">
    <path d={blobPaths[2]} fill="#e82265" transform="scale(0.96, 0.76)" />
  </svg>
  <div className="relative z-10 w-full px-4 mx-auto font-bold md:pt-10 md:w-3/4 md:px-0 text-grlPink md:text-white md:pb-40">
      <PortableText value={artist.description} />
  </div>
  </div>

    </main>
  )
}




