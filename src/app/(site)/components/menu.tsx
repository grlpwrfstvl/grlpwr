import Link from 'next/link';
import Image from 'next/image';
import blomstKvinne from '../assets/Blomst_Kvinne_Rosa_ 2.png';
import { getPages } from '../../../../sanity/sanity-utils';


async function Menu() {

    const pages = await getPages();


return (
<nav className='h-full pt-2 w-1xl text-grlGreen font-bold text-2xl fixed z-50'>
    <div className=''>
    <Image 
    src={blomstKvinne}
    alt="GRL PWR logo"
    priority={true}
    height={220}
    className=''
    />
    </div>
    <div className='flex flex-col gap-1 pl-4'>
    <Link className="hover:text-grlPink" href="/artists">Artister</Link>
    <Link className="hover:text-grlPink" href="/">Galleri</Link>
    <Link className="hover:text-grlPink" href="/contact">Kontakt</Link>

    {pages.map((page)=> (
              <Link key={page._id}
              href={`/${page.slug}`} className="hover:text-grlPink">
                {page.title}
              </Link>
            ))}
    </div>
</nav>
);
}
export default Menu;