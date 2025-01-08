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
import ostfoldLogo from './assets/ostfold.fk.png'
import { getHome } from '../../../sanity/sanity-utils'



const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'GRL PWR FSTVL',
  description: 'GRL PWR Festivalens offisielle side!',
  titleDate: '23-24 APRIL 2024',
  meta: {
    title: 'GRL PWR FSTVL | 23-24 APRIL 2024',
    description: 'GRL PWR Festivalens offisielle side! En feiring av kvinner, musikk og kreativitet.',
    keywords: 'GRL PWR, festival, women empowerment, music, art',
    canonical: 'https://www.grlpwrfstvl.no/',
    og: {
      title: 'GRL PWR FSTVL | 23-24 APRIL 2024',
      description: 'GRL PWR Festivalens offisielle side! En feiring av kvinner, musikk og kreativitet.',
      type: 'website',
      url: 'https://www.grlpwrfstvl.no/',
    }
  }
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pages = await getPages();

  const filteredPages = pages.filter(page => page.slug !== 'kontaktinfo');

  const home = await getHome();



  return (
    <html lang="en" className={inter.className}>
      <body className="flex flex-col w-full min-h-screen mx-auto bg-white">
      <Image
      src={hockey}
      alt="festive art"
      height={400}
      className='fixed bottom-0 right-0 z-50 w-auto h-52 md:h-1/2'
      />

      <Menu pages={filteredPages} logoFromSanity={home[0].logo}/>
      <div className='flex flex-row'>
      <main className="flex items-center w-full pt-24 pb-20 pl-0 mx-auto md:w-5/6 md:pl-16">{children}</main>
      </div>

      <footer className='relative z-10 w-full pt-10 text-center text-grlPink bg-lightPink'>
        
        <div className='flex flex-col justify-center'>
        <h2 className='py-2 text-2xl font-bold md:text-3xl'>
        GRL PWR FSTVL
        </h2>
        <div className='flex justify-center w-full gap-6 pb-8'>
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
        <div className='pb-6 font-semibold text-md'>
          

        <h3>Festivalsjef: Sara Jeanine Heidenstrøm</h3>
        <a href='https://www.majabrenna.com/'><h3>Design og foto: Maja Brenna</h3></a>
        <a href='https://www.instagram.com/nillustrasjon/'><h3>Grafikk: Nora Syvertsen</h3></a>
        <a href='https://www.vadstein.dev/'><h3>Web: Håkon Vadstein</h3></a>

        </div>
        
        <div className='flex flex-col justify-center gap-8 py-8 md:flex-row md:gap-20'>
        <a
         href='https://www.fredrikstad.kommune.no/tjenester/kulturogfritid/kulturhusene/st.-croix-huset/'
         target="_blank" 
         rel="noopener noreferrer">
        <Image src={stcroixLogo} alt="Link to st Croix" className="w-auto h-16 mx-auto transition-transform transform-gpu hover:scale-110" />
        </a> 


        <a
         href='https://www.kulturdirektoratet.no/'
         target="_blank" 
         rel="noopener noreferrer">
        <Image src={kulturLogo} alt="Link to kulturrådet" className="w-auto h-16 mx-auto transition-transform transform-gpu hover:scale-110" />
        </a> 

        <a
         href='https://www.fredrikstad.kommune.no/'
         target="_blank" 
         rel="noopener noreferrer">
        <Image src={kommuneLogo} alt="Link to kommunen" className="w-auto h-20 mx-auto transition-transform transform-gpu hover:scale-110" />
        </a> 

        <a
         href='https://www.ofk.no/'
         target="_blank" 
         rel="noopener noreferrer">
        <Image src={ostfoldLogo} alt="Link to fylkeskommunen" className="w-auto mx-auto transition-transform h-14 transform-gpu hover:scale-110" />
        </a> 
        </div>
        </div>

        <Image
      src={leg}
      alt="festive art"
      height={200}
      className='absolute z-50 ml-10 transform rotate-180 -left-14 md:left-0 w-36 md:w-min -mt-36 md:-mt-48'
      />
      </footer>
      </body>
    </html>
  )
}
