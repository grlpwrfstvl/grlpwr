import { getArtists, getHome, getNews } from '../../../sanity/sanity-utils'
import ArtistCard from './components/artistCard';
import NewsCard from './components/newsCard';
import React from 'react';
import TextBlob from './components/textBlob';


export default async function Home() {

  const artists = await getArtists();
  const home = await getHome();
  const [firstNews, secondNews] = (await getNews()).slice(0, 2);

  console.log({ artistsCount: artists.length })

  return (

    <main className="w-full mx-auto pt-0 md:pt-16">

    <div className='flex flex-row grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-3 gap-x-8'>
    <ArtistCard key={artists[0]._id} artist={artists[0]} index={1} />
    <TextBlob text={home[0].description} />
    <ArtistCard key={artists[1]._id} artist={artists[1]} index={2} />
    <ArtistCard key={artists[2]._id} artist={artists[2]} index={3} />



    </div>

    </main>
    )
  }

