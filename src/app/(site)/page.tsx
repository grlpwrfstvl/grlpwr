import { getArtists, getHome, getNews, getWorkshops, getAllEventer } from '../../../sanity/sanity-utils'
import React from 'react';
import Link from 'next/link';
import ImageBlob from './components/imageBlob';
import { PortableText } from '@portabletext/react';



export default async function Home() {

  const artists = await getArtists();
  const home = await getHome();
  const news = await getNews();
  const eventer = await getAllEventer();

  const sortedNews = news.sort((a, b) => {
    return new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime();
  });


  
  console.log({artists})
  console.log({ artistsCount: artists.length })

  return (

    <main className="w-full mx-auto">

    <div className="flex flex-col mx-auto my-8">


    <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
      <div>
        <ImageBlob imagelink={sortedNews[0].image} id={sortedNews[0]._id} alt={sortedNews[0].title}></ImageBlob>  
      </div>
      <div className='py-4 md:py-12 text-xl font-semibold flex flex-col'>
      <h1 className="text-4xl mx-auto md:text-5xl text-grlPink font-extrabold ">
      Fredrikstad 2024</h1>
      <h2 className="text-2xl mx-auto md:text-3xl p-2 text-grlPink font-extrabold">
      19-20 April</h2>
      <div className='p-2 my-8 text-xl font-semibold flex flex-col justify-center items-center'>
      <PortableText value={sortedNews[0].description} />
      </div>
      </div>
      {eventer.map((eventer) => (
        <Link href={`/workshop/${eventer.slug}`} key={eventer._id} className=''>
        <div className="relative">
        <h2 className="absolute z-20 transform py-16 m-20 pr-28 font-extrabold text-xl md:text-3xl text-white drop-shadow-lg">
        {eventer.name || ''}
         </h2>
        <ImageBlob imagelink={eventer.image} id={eventer._id} alt={eventer.name}/>
        </div>
        </Link>
        ))}
    </div>

    </div>
    <a href='https://checkout.ebillett.no/178/events/130533/purchase/setup?kanal=dxf'>
      <h2 className="text-grlPink text-2xl font-bold px-10">Kjøp billetter her!</h2>
      </a>
    </main>
    )
  }

