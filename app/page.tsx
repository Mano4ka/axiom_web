import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import { Info } from '@/components/Info';
import { Marquee } from '@/components/ui/Marquee'
import { Functional } from '@/components/Functional'
import { Faq } from '@/components/Faq'

export default function Home() {
  return (
    <div className=" ">
      <Header />
      <main className="">
        <Hero />
        <hr className='text-white' />
        <Marquee imageSrc="images/logo.svg" count={0} speed={20} pauseOnHover className="py-[22.5px]" />
        <hr className='py-[1px] 1border-[rgba(255,_255,_255,_0.1)]' />
        <Info />
        <hr className='py-[1px] border-[rgba(255,_255,_255,_0.1)]' />
        <Functional />
        <hr className='py-[1px] border-[rgba(255,_255,_255,_0.1)]' />
        <Faq />
        <hr className='py-[1px] border-[rgba(255,_255,_255,_0.1)]' />
      </main>
      <Footer />
    </div>
  );
}