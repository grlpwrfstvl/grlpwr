import ArtistCard from "../components/artistCard";
import { getArtists } from "../../../../sanity/sanity-utils";

export default async function Artists() {
  const artists = await getArtists();

  const filteredArtists = artists.filter(artist => artist.slug);

  return (
    <div className="m-auto">
      <div 
      className='justify-end flex-col gap-y-20 grid grid-cols-1 md:grid-cols-2'
      >
      {filteredArtists.map((artist, index) => (
        <ArtistCard key={artist._id} artist={artist} index={index}/>
      ))}
    </div>
    {/* <h2 className="p-10 mt-5 text-xl font-bold">Flere artister slippes snart!</h2> */}
    </div>
  )
}


