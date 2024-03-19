import { getAllEventer, getWorkshops } from "../../../../sanity/sanity-utils";
import ImageBlob from "../components/imageBlob";
import Link from "next/link";

export const revalidate = 0;

export default async function Artists() {
  const events = await getAllEventer();
  const workshops = await getWorkshops();
  console.log({ Events: events.length })


  return (
    <div 
    className='flex justify-end flex-col gap-y-20 grid grid-cols-1 md:grid-cols-2 py-20'
    >   
      <div className='relative'>
      <div className="w-full flex justify-content">
      <h2 className="text-4xl text-grlPink font-bold p-4 md:mx-10">Arrangementer</h2>
      </div>

      {events.map((eventer) => (
                <Link href={`/events/${eventer.slug}`} key={eventer._id}>
        <h2 className="z-20 transform absolute p-20 my-16 md:mr-32 font-extrabold text-2xl text-white drop-shadow-lg">
        {eventer.name || ''}
         </h2>

        <ImageBlob imagelink={eventer.image} id={eventer._id} alt={eventer.name} title={eventer.name}/>

        </Link>
      ))}
    </div>
    <div className='relative'>
      <div className="w-full flex justify-content">
      <h2 className="text-4xl text-grlPink font-bold p-4 md:mx-10">Workshops</h2>
      </div>
      {workshops.map((workshop) => (
        <Link href={`/workshop/${workshop.slug}`} key={workshop._id} className=''>
        <div className="relative">
        <h2 className="absolute z-20 transform p-20 mx-16 my-16 md:mr-32 font-extrabold text-2xl text-white drop-shadow-lg">
        {workshop.name || ''}
         </h2>
        <ImageBlob imagelink={workshop.image} id={workshop._id} alt={workshop.name}/>
        </div>
        </Link>
        ))}
    </div>

    </div>
  )
}


