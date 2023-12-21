"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';
import blomstKvinne from '../assets/Blomst_Kvinne_Rosa_ 2.png';
import logo from '../assets/GRLPWRFST_logo_Png.png';
import { Page } from '../../../../types/Page';

function Menu({pages }: {pages: Page[]}) {
const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };

return (
  <div>

    <header className='w-full'>  
      <Link className="" href="/"> 
      <Image 
       src={logo}
       alt="GRL PWR logo"
       priority={true}
       height={150}
       className='fixed md:right-0 z-50 max-w-2xl w-3/4'
      /> 
    </Link>
    <button onClick={toggleMenu} className="text-5xl p-4 font-semibold mx-2 fixed right-0 md:hidden block  z-50"
      >{isMenuOpen ? '✕' : '☰'}
    </button>
    </header>
    <nav className={`h-full pt-20 md:pt-2 w-1xl text-grlGreen font-bold text-2xl fixed z-40 transition-left ease-in duration-500  ${isMenuOpen ? 'left-0 bg-white' : 'md:left-0 -left-[300px]'}`}>
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
</div>
);
}
export default Menu;