import { getHome, getNews } from '../../../sanity/sanity-utils'
import React from 'react';
import Link from 'next/link';
import ImageBlob from './components/imageBlob';
import { PortableText } from '@portabletext/react';

export const revalidate = 0;

export default async function Home() {

  const home = await getHome();
  const news = await getNews();

  const sortedNews = news.sort((a, b) => {
    return new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime();
  });


  return (

    <main className="w-full mx-auto">

    <div className="flex flex-col mx-auto md:my-6">
    <h1 className="mx-auto text-4xl font-extrabold md:text-5xl text-grlPink md:mt-14">
      Fredrikstad 2025</h1>
      <h2 className="p-2 mx-auto text-2xl font-extrabold md:text-3xl text-grlPink">
      9. - 10. mai</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-6'>

      
      <div>  
      <ImageBlob imagelink={home[0].image} id={home[0]._id+"home"} alt={home[0].title}></ImageBlob>  
      </div>
      <div className='flex flex-col text-xl font-semibold md:py-12'>
        <h2></h2>
      <div className='flex flex-col px-2 -mt-6 text-xl font-semibold md:-mt-0 md:my-6'>
      <PortableText value={home[0].description} />
      </div>
      </div>


      {sortedNews.map((news) => (
        <Link href={news.slug ? `${news.slug}` : ''} key={news._id} className={`md:py-8 ${news.slug ? '' : 'pointer-events-none cursor-not-allowed'}`}>
        <ImageBlob imagelink={news.image} id={news._id} alt={news.title}></ImageBlob>  
        <div className='flex flex-col justify-center px-2 -mt-4 text-xl font-semibold md:ml-14'>
        <h2 className='py-2 text-2xl font bold'>{news.title}</h2>
        <PortableText value={news.description} />
        </div>
        </Link>
      ))}



    </div>

    </div>
    <a href='https://checkout.ebillett.no/178/events/139725/purchase/setup?kanal=dxf'>
      <h2 className="py-6 mx-20 text-3xl font-bold text-grlPink">Kjøp billetter her!</h2>
      </a>
    </main>
    )
  }

