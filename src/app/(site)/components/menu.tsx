"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';
import blomstKvinne from '../assets/Blomst_Kvinne_Rosa_ 2.png';
import { Page } from '../../../../types/Page';
import Logo from '../assets/grlpwrlogo2025-small.png';


interface MenuProps {
  pages: Page[];
  logoFromSanity: string;
}

function Menu({ pages, logoFromSanity }: MenuProps) {
const [isMenuOpen, setIsMenuOpen] = useState(false);


    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
    const closeMenu = () => {
      setIsMenuOpen(false);
    };

return (
  <div>
    <header className='w-full'>  
      <Link className="" href="/"> 
      <Image 
       src={Logo}
       alt="GRL PWR logo"
       width={400}
       priority={true}
       className='fixed z-50 w-1/2 max-w-2xl md:right-0 md:w-auto'
      /> 
    </Link>
    <button onClick={toggleMenu} className="fixed right-0 z-50 block mx-4 text-4xl font-semibold text-grlGreen top-4 md:hidden"
      >{isMenuOpen ? '✕' : '☰'}
    </button>
    </header>
    <nav className={`h-full pt-20 md:pt-2 md:w-1xl text-grlGreen font-bold text-2xl fixed z-40 transition-left ease-in duration-500  ${isMenuOpen ? 'left-0 bg-white w-full' : 'md:left-0 -left-[350px]'}`}>
    <div className=''>
    <Image 
    src={blomstKvinne}
    alt="GRL PWR logo"
    priority={true}
    height={220}
    className=''
    />
    </div>
    <div className='flex flex-col items-center gap-2 pl-4 -mt-24 text-4xl md:-mt-0 md:items-start'>
    <Link className="hover:text-grlPink" onClick={closeMenu} href="/artists">Artister</Link>
    <Link className="hover:text-grlPink" onClick={closeMenu} href="/events">Events</Link>
    <Link className="hover:text-grlPink" onClick={closeMenu} href="/gallery">Galleri</Link>
    <Link className="hover:text-grlPink" onClick={closeMenu} href="/contact">Kontakt</Link>

    {pages.map((page)=> (
              <Link key={page._id}
              onClick={closeMenu} 
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