'use client';
import Image from 'next/image';
import Logo from '@/components/ui/Logo';
import { useT } from '@/lib/i18n';
import {footerData} from '@/data/footer';

export default function Footer() {
  const { t, lang } = useT();

  const getText = (text: string | { ru: string; en: string }) => {
    if (typeof text === 'string') return text;
    return text[lang] ?? text.en ?? text.ru ?? '';
  };
  return (
    <footer className="overflow-hidden relative flex justify-center w_1000:mt-[250px] mt-[0px] w_1000:p-[30px] p-[7px] w_1000:pb-[50px] b-[10px]">
        <Image
          src="images/bg/footer_bg.svg"
          alt="Footer Logo"
          width={500}
          height={400}
          className="w-[95%] mb-[150px] w_700:mb-0 absolute bottom-0 z-0 h-auto"
          priority
        />
      {/*
      <div className="absolute inset-0 z-10 flex items-center justify-start pointer-events-none overflow-visible">
        <span
          className="font-homenaje text-[1100px] leading-[986px] bg-gradient-to-t 
                     from-[rgba(230,255,225,0)] via-[rgba(196,205,188,0.0315)] to-[rgba(153,143,143,0.21)] 
                     bg-clip-text text-transparent [-webkit-text-fill-color:transparent]
                     translate-x-[-200px] translate-y-[-150px]"
        >
          AXIOM
        </span>
      </div> */}
      <div className="relative w_500:rounded-[43px] rounded-[19px] z-20 mt-[250px] bg-[#1C1C1C] w-full flex flex-col justify-between w_500:p-[35px] p-[25px]">        
        <div className="flex flex-row items-start w_1400:flex-col justify-between w_1400:gap-0 gap-[15px]">
          <Logo bg={true} cat={true}/>
          <div className="flex ml-0 w_1400:ml-[200px] w_1400:justify-start justify-between w_1400:w-auto w-full w_1400:gap-[180px] gap-[15px] mb-[20px] text-[#ffffff85] w_1000:text-[20px]/[24px] text-[11px]/[13px]">
            {footerData.map((section, sectionIndex) => (
              <div key={sectionIndex} className='flex flex-col'>
                <p className='w_1000:text-[24px]/[29px] text-[14px]/[17px] text-white'>
                  {getText(section.name)}
                </p>
                {section.links.map((link, linkIndex) => (
                  <a 
                    key={linkIndex}
                    href={link.link} 
                    className="hover:text-white transition w-[max-content]"
                  >
                    {getText(link.name)}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col">
          <hr className="border border-[#ffffff26] w_1000:border-4 border-1 rounded" />
          <div className='flex w_1000:flex-row w_1000:items-auto items-center flex-col-reverse w_1000:gap-[70px] gap-[15p] w_1000:mt-[34px] mt-[15px] text-[#ffffff85]'>
            <p className='w_1000:text-[24px]/[29px] text-[11px]/[13px]'>{t('footer.name')} {t('footer.year_start')}-{new Date().getFullYear()}. {t('footer.all_rights_reserved')}</p>
            <a href="#" className="hover:text-white transition w_1000:text-[24px]/[29px] text-[11px]/[13px]">{t('footer.terms_and_policy')}</a>
            <a href={`mailto:${t('footer.support_email')}`} className="hover:text-white transition w_1000:text-[24px]/[29px] text-[11px]/[13px]">{t('footer.support_email')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}