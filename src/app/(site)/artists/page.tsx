import ArtistCard from "../components/artistCard";
import { getArtists } from "../../../../sanity/sanity-utils";

export default async function Artists() {
  const artists = await getArtists();

  const filteredArtists = artists.filter(artist => artist.slug);

  return (
    <div className="">
      <div className='flex justify-end flex-col gap-y-10 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2  xl:grid-cols-3 py-20'>
      {filteredArtists.map((artist, index) => (
        <ArtistCard key={artist._id} artist={artist} index={index}/>
      ))}
    </div>
    </div>
  )
}


