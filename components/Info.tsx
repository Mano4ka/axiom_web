'use client';

import Image from 'next/image';
import { Stats } from '@/components/ui/Stats';
import { Marquee } from '@/components/ui/Marquee';
import { useT } from '@/lib/i18n';

const marqueeLines = [
  {
    top: {
      pc: 'top-[150px]',
      mb: 'top-[50px]'
    },
    height: 'h-[240px]',
    rotate: '-rotate-[2.77deg]',
    scale: 'scale-[0.92]',
    left: 'left-[-25vw]',
    width: 'w-[150vw]',
    zIndex: 'z-20',
    speed: 18,
    direction: 'right' as const,
    images: [
      'images/games/7daystodie.png',
      'images/games/beamngdrive.png',
      'images/games/borderlands.png',
      'images/games/civilizationiv.png',
      'images/games/cyberpunk2077.png',
      'images/games/dontstavetogether.png',
      'images/games/doomiternal.png'
    ],
  },
  {
    top: {
      pc: 'top-[240px]',
      mb: 'top-[140]'
    },
    height: 'h-[220px]',
    rotate: 'rotate-[0.98deg]',
    scale: 'scale-[0.95]',
    left: 'left-[-25vw]',
    width: 'w-[150vw]',
    zIndex: 'z-10',
    speed: 15,
    leftGradient: true,
    custom: 'radial-gradient(32.62% 25.67% at 48.8% 52.95%, rgba(20, 20, 20, 0.33) 0%, rgba(20, 20, 20, 0.9) 100%)',
    direction: 'left' as const,
    images: [
      'images/games/elderring.png',
      'images/games/eurotrucksimulator2.png',
      'images/games/fallout4.png',
      'images/games/farmingsimulator25.png',
      'images/games/forzahorizon5.png',
      'images/games/gtav.png',
      'images/games/isaac.png'
    ],
  },
  {
    top: {
      pc: 'top-[420px]',
      mb: 'top-[320px]'
    },
    height: 'h-[200px]',
    rotate: 'rotate-[4.80deg]',
    scale: 'scale-100',
    left: 'left-[-20vw]',
    width: 'w-[140vw]',
    zIndex: 'z-30',
    speed: 20,
    direction: 'left' as const,
    images: [
      'images/games/left4dead2.png',
      'images/games/nomanssky.png',
      'images/games/ori.png',
      'images/games/projectzomboid.png',
      'images/games/rdr2.png',
      'images/games/rvthereyt.png',
      'images/games/satisfactory.png'
    ],
  },
  {
    top: {
      pc: 'top-[600px]',
      mb: 'top-[500px]'
    },
    height: 'h-[200px]',
    rotate: 'rotate-[0.98deg]',
    scale: 'scale-[0.95]',
    left: 'left-[-25vw]',
    width: 'w-[150vw]',
    zIndex: 'z-40',
    speed: 15,
    direction: 'right' as const,
    images: [
      'images/games/sonsoftheforest.png',
      'images/games/stardewvalley.png',
      'images/games/terraria.png',
      'images/games/thecrew2.png',
      'images/games/valheim.png',
      'images/games/witcher3.png'
    ],
  },
];

const leftStats = [
  { value: '23M', label: { ru: 'Игр в библиотеке', en: 'Games in the library' }, circleColor: '#CD8C00' },
  { value: '23M', label: { ru: 'Терабайт загружено', en: 'Terabyte loaded' }, circleColor: '#FFFFFF' },
  { value: '23M', label: { ru: 'Игр скачано', en: 'Games downloaded' }, circleColor: '#FF0095' },
];

const rightStats = [
  { value: '23M', label: { ru: 'Дней Работы', en: 'Days Of Work' }, circleColor: '#8BFFB0' },
  { value: '23M', label: { ru: 'Всего пользователей', en: 'Total users' }, circleColor: '#543DFF' },
  { value: '23M', label: { ru: 'Игр скачано', en: 'Games downloaded' }, circleColor: '#00FF1A' },
];

export const Info = () => {
  const { t } = useT();

  return (
    <section className="relative w-full overflow-hidden py-52">
      <div className="absolute inset-0">
        {marqueeLines.map((line, i) => (
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
                <Stats value={leftStats[0].value} label={leftStats[0].label} circleColor={leftStats[0].circleColor} />
                    <div className="-translate-x-8">
                        <Stats value={leftStats[1].value} label={leftStats[1].label} circleColor={leftStats[1].circleColor} />
                    </div>
                <Stats value={leftStats[2].value} label={leftStats[2].label} circleColor={leftStats[2].circleColor} />
            </div>

            <div className="text-center items-center flex flex-col flex-1 max-w-3xl mx-auto">
                <h3 className="w_700:text-[36px]/[43px] text-[15px]/[10px] uppercase text-white tracking-[1.01em] ml-[1.5em] text-shadow-[0px_0px_6.5px_#FFFFFF]">{t('about.what_is')}</h3>
                    <Image src="images/logoName.svg" alt="Right image" width={600} height={205} className='w_500:w-auto w-[250px]'/>
                {/* <h1 className="text-[250px]/[274px] font-[Homenaje] text-shadow-[6px_15px_20.5px_#7c79796e] leading-[180px] font-bold text-white mb-6">AXIOM</h1> */}
                <p className="w_500:text-[16px]/[19px] text-[10px]/[12px] max-w-2xl text-[#FFFFFF] w_500:max-w-[497px] max-w-[170px] mx-auto">{t('about.text')}</p>
            </div>

            <div className="hidden lg:flex flex-col items-start gap-6 animate-fade-in-right">
                <Stats value={rightStats[0].value} label={rightStats[0].label} circleColor={rightStats[0].circleColor} />
                    <div className="translate-x-8">
                        <Stats value={rightStats[1].value} label={rightStats[1].label} circleColor={rightStats[1].circleColor} />
                    </div>
                <Stats value={rightStats[2].value} label={rightStats[2].label} circleColor={rightStats[2].circleColor} />
            </div>
        </div>
      </div>
      
      <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(32.62% 25.67% at 48.8% 52.95%, rgba(20, 20, 20, 0.33) 0%, rgba(20, 20, 20, 0.9) 100%)', backdropFilter: 'blur(0.75px)', WebkitBackdropFilter: 'blur(0.75px)', zIndex: 50}}/>
    </section>
  );
};