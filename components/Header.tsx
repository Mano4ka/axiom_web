'use client';
import { useState, useEffect } from 'react';
import Logo from '@/components/ui/Logo';
import Image from 'next/image';
import { useT } from '@/lib/i18n';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { t, lang, changeLang } = useT();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Element;
    if (open && !target.closest('.lang-menu-container')) {
      setOpen(false);
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
}, [open]);

  return (
    <header className="fixed z-[1000] w-full transition-all duration-300 flex justify-center" style={{ paddingTop: scrolled ? '20px' : '40px' }}>
      <div className="absolute inset-x-0 top-[-40px]" style={{ height: '114px', background: 'linear-gradient(180deg, #232323 59.83%, rgba(35, 35, 35, 0) 121.35%)', filter: 'blur(13.4px)'}}/>

      <div className="relative flex gap-5 items-center justify-between">
        <Logo bg={true} />

        <div className="flex p-[3px] w_500:p-[11px] w_500:text-[16px] text-[11px]/[13px]  w_500:rounded-[19px] rounded-[12px] bg-[#151515] border border-[1.7px] border-[#3D3D3D] shadow-md [filter:drop-shadow(0_0_10px_rgba(98,102,98,0.5))] items-center gap-6">
          <nav className="ps-4 gap-6 flex">
            <a className="text-[#C0C0C0] hover:text-[#FFFFFF] transition-colors" href="/">{t('header.about')}</a>
            <a className="text-[#C0C0C0] hover:text-[#FFFFFF] transition-colors" href="/">{t('header.products')}</a>
            <a className="text-[#C0C0C0] hover:text-[#FFFFFF] transition-colors" href="/">{t('header.download')}</a>
            <a className="text-[#C0C0C0] hover:text-[#FFFFFF] transition-colors" href="/">{t('header.contact')}</a>
          </nav>

          <div className="relative lang-menu-container">
            <button onClick={() => setOpen(!open)} className="p-[6px]  w_500:-[8.5px] cursor-pointer -border border-[1.7px] border-[#3D3D3D] w_500:rounded-[12px] rounded-[8px] hover:bg-white/5 transition">
              <Image src="icons/world.svg" alt="lang" fill={false} width={3} height={5} className="w-3 w_500:w-5 h-3 w_500:h-5"/>
            </button>

            <div className={`absolute right-0 top-full mt-2 w-32 bg-[#1a1a1a] border border-[#3D3D3D] rounded-lg shadow-xl overflow-hidden transition-all duration-300 ease-out ${ open ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
              <button onClick={() => { changeLang('ru'); setOpen(false); }} className="block cursor-pointer w-full text-left px-4 py-2 text-sm text-[#C0C0C0] hover:bg-white/10 transition">
                Русский
              </button>
              <button onClick={() => { changeLang('en'); setOpen(false); }} className="block cursor-pointer w-full text-left px-4 py-2 text-sm text-[#C0C0C0] hover:bg-white/10 transition">
                English
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}