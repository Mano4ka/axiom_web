'use client';

import Image from 'next/image';
import { useState, useRef, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper';
import Button from '@/components/ui/Button';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import { useT } from '@/lib/i18n';
import {FeaturesData} from '@/data/functionality';
import {SocialData} from '@/data/social';

export const Functional = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const imageSwiperRef = useRef<SwiperType | null>(null);
  const listSwiperRef = useRef<SwiperType | null>(null);
  const isSyncing = useRef(false);
  const { t, lang } = useT();

  const syncImageFromList = useCallback((index: number) => {
    if (isSyncing.current) return;
    isSyncing.current = true;
    setActiveIndex(index);
    imageSwiperRef.current?.slideToLoop(index);
    setTimeout(() => { isSyncing.current = false; }, 100);
  }, []);

  const syncListFromImage = useCallback((index: number) => {
    if (isSyncing.current) return;
    isSyncing.current = true;
    setActiveIndex(index);
    listSwiperRef.current?.slideToLoop(index);
    setTimeout(() => { isSyncing.current = false; }, 100);
  }, []);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
    listSwiperRef.current?.slideTo(index);
    imageSwiperRef.current?.slideTo(index);
  };

  const getText = (text: string | { ru: string; en: string }) => {
    if (typeof text === 'string') return text;
    return text[lang] ?? text.en ?? text.ru ?? '';
  };
  
  return (
    <section className="relative w-full overflow-hidden w_500:py-20 py-[25px]">
      <div className="absolute left-[-50px] top-[120px] space-y-4">
        <h2 className="w_500:text-[128px] text-[64px] w_500:leading-[140px] leading-[40px] rotate-[-23deg] bg-gradient-to-r from-transparent to-[rgba(153,153,153,0.46)] bg-clip-text text-transparent">
          {t('name')}
        </h2>
        <Image src="images/bg/logoName_1.svg" alt="AXIOM" width={500} height={500} className="w_500:w-auto w-[250px] rotate-[-23deg]" />
        <h3 className="w_500:text-[85px] text-[40px] w_500:leading-[93px] leading-[53px] rotate-[-23deg] bg-gradient-to-r from-transparent to-[rgba(153,153,153,0.46)] bg-clip-text text-transparent">
            {t('functional.launcher')}
        </h3>
      </div>

      <div className="flex w-full justify-center w_1400:justify-end">
        <div className="flex flex-col w-auto max-w-[1291px] w_1400:w-full w_1400:mr-[50px]">
          <h2 className="hidden w_500:block text-[48px] leading-[58px] text-white text-center mb-8">{t('functional.functionality')}</h2>
          <div className="flex flex-col w_1400:flex-row gap-[19px] w_1400:items-start items-center">
            <div className="relative w-full w_700:max-w-[830px] w_500:max-w-[500px] w_380:max-w-[400px] max-w-[300px] bg-[#1C1C1C] border border-[#444444] w_500:px-[19px] px-[6px] w_500:py-[40px] py-[20px] w_1400:py-[95px] rounded-[11px]">
            <h2 className="block w_500:hidden w_500:block text-[15px]/[18px] text-white text-center mb-[15px]">{t('functional.functionality')}</h2>
            <div className="flex items-center justify-center gap-6">
              <button
                onClick={() => {
                  if (!imageSwiperRef.current) return;
                  const swiper = imageSwiperRef.current;
                  if (swiper.isBeginning) {
                    goToSlide(FeaturesData.length - 1);
                  } else {
                    swiper.slidePrev();
                  }
                }}
                className="cursor-pointer transition-opacity hover:opacity-70"
              >
                <svg className='w_500:w-auto w-[8px]' width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.522 15.491L3.52197 10.1577C2.66249 9.69933 2.23275 9.46974 2.09192 9.16455C1.96924 8.89869 1.96924 8.5918 2.09192 8.32594C2.23256 8.02118 2.66128 7.79253 3.51834 7.33543L3.52197 7.33382L13.522 2.00049" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <Swiper
                modules={[EffectFade]}
                effect="fade"
                loop={false}
                speed={600}
                onSwiper={(s) => (imageSwiperRef.current = s)}
                onSlideChange={(swiper) => syncListFromImage(swiper.realIndex)}
                className="w-full max-w-[500px]"
              >
                {FeaturesData.map((f, i) => (
                  <SwiperSlide key={i}>
                    <div className="relative aspect-video overflow-hidden rounded-lg">
                      <Image src={f.img} alt={getText(f.name)} fill className="object-cover" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <button
                onClick={() => {
                  if (!imageSwiperRef.current) return;
                  const swiper = imageSwiperRef.current;
                  if (swiper.isEnd) {
                    goToSlide(0);
                  } else {
                    swiper.slideNext();
                  }
                }}
                className="cursor-pointer transition-opacity hover:opacity-70"
              >
                <svg className='w_500:w-auto w-[8px]' width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.00049 15.491L12.0005 10.1577C12.86 9.69933 13.2897 9.46974 13.4305 9.16455C13.5532 8.89869 13.5532 8.5918 13.4305 8.32594C13.2899 8.02118 12.8612 7.79253 12.0041 7.33543L12.0005 7.33382L2.00049 2.00049" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

              <div className="mt-8 flex justify-center gap-2">
                {FeaturesData.map((_, i) => (
                  <button key={i} onClick={() => goToSlide(i)} className={`w-3 h-3 rounded-full transition-all duration-300 ${activeIndex === i ? 'bg-white w-8' : 'cursor-pointer bg-white/30'}`}/>
                ))}
              </div>
            </div>

            <div className="relative flex-1 w_1000:w-auto w-[90%]">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-[5%] bg-gradient-to-b from-[#161616] to-transparent z-10" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[5%] bg-gradient-to-t from-[#161616] to-transparent z-10" />

              <Swiper
                modules={[Navigation]}
                direction="vertical"
                loop={false}
                slidesPerView={3}
                centeredSlides={true}
                spaceBetween={10}
                onSwiper={(s) => (listSwiperRef.current = s)}
                onSlideChange={(swiper) => syncImageFromList(swiper.realIndex)}
                className=" max-h-[200px] max-w-[590px] w_1000:!pr-[5px]  w_700:max-h-[515px] !overflow-hidden"
                navigation={{ prevEl: null, nextEl: null }}
              >
                {FeaturesData.map((feature, i) => (
                  <SwiperSlide key={i} className="h-[55px] overflow-hidden w_700:h-[160px]" style={{ marginBottom: '10px' }}>
                    <div onClick={() => goToSlide(i)} className={`relative cursor-pointer flex justify-between items-center gap-[10px] h-full bg-[#1C1C1C] rounded-2xl w-full px-6 py-[15px] transition-all duration-300 opacity-40 hover:opacity-100 border border-[#444444] ${activeIndex === i ? 'opacity-100 max-[768px]:shadow-inner' : ''}`} style={{ boxShadow: activeIndex === i ? 'rgba(0, 0, 0, 0.06) 0px 4px 8px 0px' : 'none'}}>
                      <Image src={feature.bg.img} alt={getText(feature.name)} width={50} height={50} style={{rotate: `${feature.bg.rotate}`}} className={`absolute w-auto w_500:h-[200px] h-[100px] object-cover right-[30px]`} />
                      <div className="text-white  flex-col font-semibold text-xl flex justify-between">
                          <h4 className={`w_700:text-[40px]/[48px] text-[15px]/[18px] ${activeIndex === i ? 'text-[#fff]' : 'text-[#ffffff66]'} font-semibold tracking-wide group-hover:text-white transition-colors`}>
                              {getText(feature.name)}
                          </h4>
                          <p className={`w_700:text-[20px]/[24px] text-[8px]/[10px] transition-colors ${activeIndex === i ?  'text-[#ffffff66]' : 'text-[#ffffff33]'}`}>{getText(feature.info)}</p>
                      </div>
                      <div className="relative">
                          <span className={`w_500:text-5xl text-[24px]/[29px] font-bold transition-all duration-500 ${activeIndex === i ?  'text-white' : 'text-transparent'}`}>
                          {feature.id}
                          </span>
                          <span className="w_500:text-5xl text-[24px]/[29px] absolute top-0 left-0 font-bold [-webkit-text-stroke:1px_rgba(255,255,255,0.25)] [-webkit-text-fill-color:transparent] pointer-events-none">
                          {feature.id}
                          </span>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>

      <div className='w_700:mt-0 mt-[20px] w_700:mx-[52px] mx-[18px] relative'>
        <div className='static top-[-140px] text-start w_700:text-center w_1400:absolute w_1400:text-start'>
            <h3 className='text-white w_700:text-[40px]/[48px] text-[16px]/[19px]'>{t('functional.subscribe')}</h3>
            <p className='text-[#ffffff75] w_700:text-[32px]/[38px] text-[13px]/[16px]'>{t('functional.get_news')}</p>
        </div>
        <div className='flex mt-0 w_1400:mt-[150px] w_1860:mt-[60px] justify-between gap-[5px] w-full'>
            {SocialData.map((social, index) => (
              <Button style={{ '--hover-bg': social.color } as React.CSSProperties } key={index} href={social.link} target="_blank" rel="noopener noreferrer" variant='social'>
                <Image src={social.icon} alt="Icon" fill={false} width={200} height={80}/>
              </Button>
            ))}
        </div>
      </div>
    </section>
  );
};