import './globals.css'
import { Inter } from 'next/font/google'
import Menu from './components/menu'
import Image from 'next/image'
import hockey from './assets/Hockey_Sveis_Grønn.png'
import leg from './assets/Dansefot_Hæl_Rosa.png'
import { getPages } from '../../../sanity/sanity-utils'
import instaLogo from './assets/Instagram_Glyph_White.png'
import faceLogo from './assets/Facebook_Logo_Secondary.png'
import stcroixLogo from './assets/StCroix_logo_hvit.png'
import kommuneLogo from './assets/fredrikstad_kommune.png'
import kulturLogo from './assets/KR_Kulturrådet_hvit.png'




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

      <footer className='pt-10 z-10 relative w-full text-center text-grlPink bg-lightPink'>
        
        <div className='flex flex-col justify-center'>
        <h2 className='py-2  text-2xl md:text-3xl font-bold'>
        GRL PWR FSTVL
        </h2>
        <div className='flex justify-center pb-8 gap-6 w-full'>
        <a
         href='https://www.instagram.com/grlpwr_fstvl/?next=%2Fmyuccia%2Ffeed%2F&hl'
         target="_blank" 
         rel="noopener noreferrer">
        <Image src={instaLogo} alt="Link to festival instagram" className="w-8 h-8 transition-transform transform-gpu hover:scale-110" />
        </a> 
        <a
         href='https://www.facebook.com/GRLPWRFSTVL/'
         target="_blank" 
         rel="noopener noreferrer">
        <Image src={faceLogo} alt="Link to festival facebook page" className="w-8 h-8 transition-transform transform-gpu hover:scale-110" />
        </a> 
        </div>
        <div className='pb-6 text-md font-semibold'>
          

        <h3>Festivalsjef: Sara Jeanine Heidenstrøm</h3>
        <a href='https://www.majabrenna.com/'><h3>Design og foto: Maja Brenna</h3></a>
        <a href='https://www.instagram.com/nillustrasjon/'><h3>Grafikk: Nora Syvertsen</h3></a>
        <a href='https://www.vadstein.dev/'><h3>Web: Håkon Vadstein</h3></a>

        </div>
        
        <div className='flex flex-col md:flex-row justify-center gap-8 md:gap-20 py-8'>
        <a
         href='https://www.fredrikstad.kommune.no/tjenester/kulturogfritid/kulturhusene/st.-croix-huset/'
         target="_blank" 
         rel="noopener noreferrer">
        <Image src={stcroixLogo} alt="Link to st Croix" className="h-16 w-auto  mx-auto transition-transform transform-gpu hover:scale-110" />
        </a> 


        <a
         href='https://www.kulturdirektoratet.no/'
         target="_blank" 
         rel="noopener noreferrer">
        <Image src={kulturLogo} alt="Link to kulturrådet" className="h-16 w-auto mx-auto transition-transform transform-gpu hover:scale-110" />
        </a> 

        <a
         href='https://www.fredrikstad.kommune.no/'
         target="_blank" 
         rel="noopener noreferrer">
        <Image src={kommuneLogo} alt="Link to kommunen" className="h-20 w-auto mx-auto transition-transform transform-gpu hover:scale-110" />
        </a> 

        </div>
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
