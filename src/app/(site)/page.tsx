import { getArtists, getHome, getNews } from '../../../sanity/sanity-utils'
import React from 'react';


export default async function Home() {

  const artists = await getArtists();
  const home = await getHome();
  const [firstNews, secondNews] = (await getNews()).slice(0, 2);

  console.log({artists})
  console.log({ artistsCount: artists.length })

  return (

    <main className="w-full mx-auto md:pt-12">

    <div className="flex flex-col mx-auto">
    <h1 className="text-4xl md:text-5xl pt-0 p-2 text-grlPink font-extrabold ">
      Fredrikstad 2024</h1>
    <h2 className="text-2xl md:text-3xl p-2 text-grlPink font-extrabold">
      19-20 April</h2>
    <div>

    </div>

    </div>

    </main>
    )
  }

