import ArtistCard from "../components/artistCard";
import { getArtists } from "../../../../sanity/sanity-utils";

export default async function Artists() {
  const artists = await getArtists();

  return (
    <div className="pl-10">
      <div className='flex flex-col grid grid-cols-3 py-20'>
      {artists.map((artist, index) => (
        <ArtistCard key={artist._id} artist={artist} index={index}/>
      ))}
    </div>
    </div>
  )
}


