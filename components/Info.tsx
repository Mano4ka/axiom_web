'use client';

import Image from 'next/image';
import { Stats } from '@/components/ui/Stats';
import { Marquee } from '@/components/ui/Marquee';
import { useT } from '@/lib/i18n';
import {StatsData, MarqueeLines} from '@/data/info';

export const Info = () => {
  const { t } = useT();

  return (
    <section className="relative w-full overflow-hidden py-52">
      <div className="absolute inset-0">
        {MarqueeLines.map((line, i) => (
          <div key={i} className={`absolute ${line.width} ${line.height} ${line.left} w_500:${line.top.pc} ${line.top.mb} ${line.rotate} ${line.zIndex} origin-center overflow-hidden`}>
            <Marquee imageSrcs={line.images} speed={line.speed} pauseOnHover={false} direction={line.direction} className="h-full"/>
            {line.leftGradient && (
              <div className="pointer-events-none absolute inset-y-0 left-0 w-[77vw] z-10 bg-gradient-to-r from-[#0F0F0F] via-[#1A1A1A] to-transparent [backdrop-filter:blur(1.5px)] [-webkit-backdrop-filter:blur(1.5px)]"/>
            )}
          </div>
        ))}
      </div>

      <div className="z-50 pointer-events-none absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0F0F0F] to-transparent" />
      <div className="z-50 pointer-events-none absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0F0F0F] to-transparent" />

      <div className="relative z-60 container mx-auto px-6 max-w-275">
        <div className="flex items-center justify-center gap-8">
            <div className="hidden lg:flex flex-col items-end gap-6 animate-fade-in-left">
                <Stats value={StatsData[0].value} label={StatsData[0].label} circleColor={StatsData[0].circleColor} />
                    <div className="-translate-x-8">
                        <Stats value={StatsData[1].value} label={StatsData[1].label} circleColor={StatsData[1].circleColor} />
                    </div>
                <Stats value={StatsData[2].value} label={StatsData[2].label} circleColor={StatsData[2].circleColor} />
            </div>

            <div className="text-center items-center flex flex-col flex-1 max-w-3xl mx-auto">
                <h3 className="w_700:text-[36px]/[43px] text-[15px]/[10px] uppercase text-white tracking-[1.01em] ml-[1.5em] text-shadow-[0px_0px_6.5px_#FFFFFF]">{t('about.what_is')}</h3>
                    <Image src="images/logoName.svg" alt="Right image" width={600} height={205} className='w_500:w-auto w-[250px]'/>
                {/* <h1 className="text-[250px]/[274px] font-[Homenaje] text-shadow-[6px_15px_20.5px_#7c79796e] leading-[180px] font-bold text-white mb-6">AXIOM</h1> */}
                <p className="w_500:text-[16px]/[19px] text-[10px]/[12px] max-w-2xl text-[#FFFFFF] w_500:max-w-[497px] max-w-[170px] mx-auto">{t('about.text')}</p>
            </div>

            <div className="hidden lg:flex flex-col items-start gap-6 animate-fade-in-right">
                <Stats value={StatsData[3].value} label={StatsData[3].label} circleColor={StatsData[3].circleColor} />
                    <div className="translate-x-8">
                        <Stats value={StatsData[4].value} label={StatsData[4].label} circleColor={StatsData[4].circleColor} />
                    </div>
                <Stats value={StatsData[5].value} label={StatsData[5].label} circleColor={StatsData[5].circleColor} />
            </div>
        </div>
      </div>
      
      <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(32.62% 25.67% at 48.8% 52.95%, rgba(20, 20, 20, 0.33) 0%, rgba(20, 20, 20, 0.9) 100%)', backdropFilter: 'blur(0.75px)', WebkitBackdropFilter: 'blur(0.75px)', zIndex: 50}}/>
    </section>
  );
};