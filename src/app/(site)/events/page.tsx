import { getEvents, getWorkshops } from "@/lib/sanity/queries";
import ImageBlob from "../_components/ImageBlob";
import Link from "next/link";

export const revalidate = 36000;

export default async function Artists() {
  const events = await getEvents();
  const workshops = await getWorkshops();

  return (
    <div 
    className='flex grid flex-col justify-end w-full grid-cols-1 py-20 gap-y-20 md:grid-cols-2'
    >   
      <div className='relative'>
      <div className="flex w-full justify-content">
      <h2 className="p-4 text-4xl font-bold text-grlPink md:mx-10">Arrangementer</h2>
      </div>

      {events.map((eventer) => (
                <Link href={`/events/${eventer.slug}`} key={eventer._id}>
        <h2 className="absolute z-20 p-20 my-16 text-2xl font-extrabold text-white transform md:mr-32 drop-shadow-lg">
        {eventer.hideTitle ? '' : eventer.name}
         </h2>

        <ImageBlob imagelink={eventer.image} id={eventer._id}/>

        </Link>
      ))}
    </div>
    <div className='relative'>
      <div className="flex w-full justify-content">
      <h2 className="p-4 text-4xl font-bold text-grlPink md:mx-10">Workshops</h2>
      </div>
      {workshops.map((workshop) => (
        <Link href={`/workshop/${workshop.slug}`} key={workshop._id} className=''>
        <div className="relative">
        <h2 className="absolute z-20 p-20 mx-16 my-16 text-2xl font-extrabold text-white transform md:mr-32 drop-shadow-lg">
        {workshop.name || ''}
         </h2>
        <ImageBlob imagelink={workshop.image} id={workshop._id}/>
        </div>
        </Link>
        ))}
    </div>

    </div>
  )
}


