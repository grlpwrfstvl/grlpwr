import { getAllEventer, getWorkshops } from "../../../../sanity/sanity-utils";
import ImageBlob from "../components/imageBlob";
import Link from "next/link";

export default async function Artists() {
  const events = await getAllEventer();
  const workshops = await getWorkshops();
  console.log({ Events: events.length })


  return (
    <div className="m-auto flex flex-col md:flex-row  md:mt-24">
      <div className='flex flex-col'>
      {events.map((eventer) => (
                <Link href={`/events/${eventer.slug}`} key={eventer._id}>

        <ImageBlob imagelink={eventer.image} id={eventer._id} alt={eventer.name}/>
        </Link>
      ))}
    </div>
    {/* <div className='flex flex-col'>
      {workshops.map((workshop) => (
        <Link href={`/workshop/${workshop.slug}`} key={workshop._id}>
        <ImageBlob imagelink={workshop.image} id={workshop._id} alt={workshop.name}/>
        </Link>
        ))}
    </div> */}

    </div>
  )
}


