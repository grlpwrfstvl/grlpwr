import ArtistCard from "../components/artistCard";
import { getArtists } from "../../../../sanity/sanity-utils";
import type { Artist } from "../../../../types/Artist";

export const revalidate = 0;

export default async function Artists() {
  const artists : Artist[] = await getArtists();

  
  const now = new Date();
  const twoMonthsAgo = new Date();
  twoMonthsAgo.setMonth(now.getMonth() - 2);
  
  const formerArtists: Artist[] = [];
  const recentOrFutureArtists: Artist[] = [];
  
  artists.forEach((artist) => {
    const artistDate = new Date(artist.time);
    
    if (artistDate < twoMonthsAgo) {
      formerArtists.push(artist);
    } else {
      recentOrFutureArtists.push(artist);
    }
  });
    

  // const filteredArtists = artists.filter(artist => artist.slug);

  return (
    <div className="pb-10 m-auto">
{recentOrFutureArtists.length === 0 ? (
  <h1 className="p-4 my-24 text-3xl font-extrabold md:text-5xl md:px-10 text-grlPink drop-shadow">
    Ingen artister for neste festival annonsert ennå! 
  </h1>
) : (
  <div className='grid flex-col justify-end grid-cols-1 gap-y-20 md:grid-cols-2'>
    {recentOrFutureArtists.map((artist, index) => (
      <ArtistCard key={artist._id} artist={artist} index={index} />
    ))}
  </div>
)}

    <h1 className="p-4 mt-20 text-3xl font-extrabold md:text-5xl md:px-10 md:mt-32 text-grlPink drop-shadow">
            Tidligere artister:
        </h1>     <div 
      className='grid flex-col justify-end grid-cols-1 gap-y-20 md:grid-cols-2'
      >
      {formerArtists.map((artist, index) => (
        <ArtistCard key={artist._id} artist={artist} index={index}/>
      ))}
    </div>
    {/* <h2 className="p-10 mt-5 text-xl font-bold">Flere artister slippes snart!</h2> */}
    </div>
  )
}


