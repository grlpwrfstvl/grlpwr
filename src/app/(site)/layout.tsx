import './globals.css'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import Menu from './components/menu'
import Image from 'next/image'
import logo from './assets/GRLPWRFST_logo_Png.png'
import hockey from './assets/Hockey_Sveis_Grønn.png'
import leg from './assets/Dansefot_Hæl_Rosa.png'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'GRL PWR FSTVL',
  description: 'Official website for GRL PWR Festival!',
  titleDate: '23-24 APRIL 2024',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en" className={inter.className}>
      <body className="w-full bg-white flex flex-col mx-auto min-h-screen">
      <header className='w-full'>  <Link className="" href="/"> <Image 
       src={logo}
       alt="GRL PWR logo"
       priority={true}
       height={150}
       className='fixed right-0 pt-4 pr-8 z-50'
    /> 
    </Link>
    </header>
      <Image
      src={hockey}
      alt="festive art"
      height={500}
      className='fixed bottom-0 right-0 z-50'
      />
      <Menu  />
      <div className='flex flex-row'>
      <main className="mx-auto w-5/6 pt-24 pl-10 pb-20">{children}</main>
      </div>
      <footer className='pt-20 z-10 relative w-full text-center'>
        <h2>
        GRL PWR FSTVL
        </h2>
        <Image
      src={leg}
      alt="festive art"
      height={200}
      className='absolute ml-10 -mt-40 transform rotate-180 z-50'
      />
      </footer>
      </body>
    </html>
  )
}
