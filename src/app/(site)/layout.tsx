import './globals.css'
import { Inter } from 'next/font/google'
import Menu from './components/menu'
import Image from 'next/image'
import hockey from './assets/Hockey_Sveis_Grønn.png'
import leg from './assets/Dansefot_Hæl_Rosa.png'
import { getPages } from '../../../sanity/sanity-utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'GRL PWR FSTVL',
  description: 'Official website for GRL PWR Festival!',
  titleDate: '23-24 APRIL 2024',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pages = await getPages();

  const filteredPages = pages.filter(page => page.slug !== 'kontaktinfo');



  return (
    <html lang="en" className={inter.className}>
      <body className="w-full bg-white flex flex-col mx-auto min-h-screen">
      <Image
      src={hockey}
      alt="festive art"
      height={400}
      className='fixed h-52 md:h-1/2 w-auto bottom-0 right-0 z-50'
      />

      <Menu pages={filteredPages}/>
      <div className='flex flex-row'>
      <main className="mx-auto flex items-center w-full md:w-5/6 pt-24 pb-20 pl-0 md:pl-16">{children}</main>
      </div>
      <footer className='pt-10 z-10 relative w-full text-center bg-lightPink'>
        <div className='pb-12 text-md font-semibold text-grlPink'>
        <h2 className='p-2 text-lg font-bold'>
        GRL PWR FSTVL
        </h2>
        <a href='https://www.majabrenna.com/'><h3>Design og foto: Maja Brenna</h3></a>
        <a href='https://www.instagram.com/nillustrasjon/'><h3>Grafikk: Nora Syvertsen</h3></a>
        <a href='https://www.vadstein.dev/'><h3>Web: Håkon Vadstein</h3></a>
        </div>
        <Image
      src={leg}
      alt="festive art"
      height={200}
      className='absolute -left-14 md:left-0  w-36 md:w-min ml-10 -mt-36 md:-mt-48 transform rotate-180 z-50'
      />
      </footer>
      </body>
    </html>
  )
}
