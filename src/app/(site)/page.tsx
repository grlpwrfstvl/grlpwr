import { getArtists, getHome, getNews, getWorkshops, getAllEventer } from '../../../sanity/sanity-utils'
import React from 'react';
import Link from 'next/link';
import ImageBlob from './components/imageBlob';
import { PortableText } from '@portabletext/react';



export default async function Home() {

  const artists = await getArtists();
  const home = await getHome();
  const news = await getNews();

  const sortedNews = news.sort((a, b) => {
    return new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime();
  });


  
  console.log({artists})
  console.log({ artistsCount: artists.length })

  return (

    <main className="w-full mx-auto">

    <div className="flex flex-col mx-auto md:my-6">
    <h1 className="text-4xl mx-auto md:text-5xl text-grlPink font-extrabold md:mt-10">
      Fredrikstad 2024</h1>
      <h2 className="text-2xl mx-auto md:text-3xl p-2 text-grlPink font-extrabold">
      19-20 April</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-6'>

      
      <div>  
      <ImageBlob imagelink={home[0].image} id={home[0]._id} alt={home[0].title}></ImageBlob>  
      </div>
      <div className='md:py-12 text-xl font-semibold flex flex-col'>
        <h2></h2>
      <div className='px-2 -mt-8 md:-mt-0 md:my-6 text-xl font-semibold flex flex-col'>
      <PortableText value={home[0].description} />
      </div>
      </div>
      {sortedNews.map((news) => (
        <Link href={news.slug ? `${news.slug}` : ''} key={news._id} className={`md:py-8 ${news.slug ? '' : 'pointer-events-none cursor-not-allowed'}`}>
        <ImageBlob imagelink={news.image} id={news._id} alt={news.title}></ImageBlob>  
        <div className='px-2 -mt-4 md:ml-14 text-xl flex flex-col font-semibold justify-center'>
        <h2 className='text-2xl font bold py-2'>{news.title}</h2>
        <PortableText value={news.description} />
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

