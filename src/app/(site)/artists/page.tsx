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
  
  console.log('Older than two months:', formerArtists);
  console.log('Younger or not happened yet:', recentOrFutureArtists);
  

  // const filteredArtists = artists.filter(artist => artist.slug);

  return (
    <div className="m-auto pb-10">
{recentOrFutureArtists.length === 0 ? (
  <h1 className="text-3xl my-24 md:text-5xl p-4 md:px-10 text-grlPink drop-shadow font-extrabold">
    Ingen artister for neste festival annonsert ennå! 
  </h1>
) : (
  <div className='justify-end flex-col gap-y-20 grid grid-cols-1 md:grid-cols-2'>
    {recentOrFutureArtists.map((artist, index) => (
      <ArtistCard key={artist._id} artist={artist} index={index} />
    ))}
  </div>
)}

    <h1 className="text-3xl md:text-5xl p-4 md:px-10 text-grlPink drop-shadow font-extrabold">
            Tidligere artister:
        </h1>     <div 
      className='justify-end flex-col gap-y-20 grid grid-cols-1 md:grid-cols-2'
      >
      {formerArtists.map((artist, index) => (
        <ArtistCard key={artist._id} artist={artist} index={index}/>
      ))}
    </div>
    {/* <h2 className="p-10 mt-5 text-xl font-bold">Flere artister slippes snart!</h2> */}
    </div>
  )
}


