'use client';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { useT } from '@/lib/i18n';
import { useState, useEffect, useRef } from 'react';

interface Orb {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
  life: number;
}

export default function Hero() {
  const { t } = useT();
  const [orbs, setOrbs] = useState<Orb[]>([]);
  const orbIdRef = useRef(0);
  const animationRef = useRef<number | null>(null);
  const experienceTextRef = useRef<HTMLParagraphElement>(null);
  const pcButtonRef = useRef<HTMLButtonElement>(null);
  const gitButtonRef = useRef<HTMLButtonElement>(null);

  const createOrb = (startX: number, startY: number) => {
    const id = orbIdRef.current++;

    const vx = (Math.random() - 0.5) * 12;
    const vy = Math.random() * -3 - 2;

    setOrbs(prev => [...prev, {
      id,
      x: startX,
      y: startY,
      vx,
      vy,
      opacity: 1,
      life: 2.5,
    }]);
  };

  const handleDownloadPC = () => {
    if (!experienceTextRef.current) return;
    const rect = experienceTextRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const bottomY = rect.bottom;
    const count = 15 + Math.floor(Math.random() * 11);

    for (let i = 0; i < count; i++) {
    const offsetX = (Math.random() - 0.5) * rect.width * 0.8;
    setTimeout(() => {
      createOrb(centerX + offsetX, bottomY + 10);
    }, i * 30);
  }
};
  useEffect(() => {
    if (orbs.length === 0) return;

    const gravity = 0.4;
    const friction = 0.98;
    const buttonCollisionDamping = 0.4;

    const animate = () => {
      setOrbs(prev => prev.map(orb => {
        let { x, y, vx, vy, opacity, life } = orb;
        vy += gravity;
        vx *= friction;
        vy *= friction;
        x += vx;
        y += vy;
        const pcRect = pcButtonRef.current?.getBoundingClientRect();
        const gitRect = gitButtonRef.current?.getBoundingClientRect();

        if (pcRect && y >= pcRect.top && y <= pcRect.bottom && x >= pcRect.left && x <= pcRect.right) {
          vy = -vy * buttonCollisionDamping;
          y = pcRect.top;
        } else if (gitRect && y >= gitRect.top && y <= gitRect.bottom && x >= gitRect.left && x <= gitRect.right) {
          vy = -vy * buttonCollisionDamping;
          y = gitRect.top;
        }

        life -= 0.016;
        opacity = Math.max(0, life / 1.5);

        return { ...orb, x, y, vx, vy, opacity, life };
      }).filter(orb => orb.life > 0));

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [orbs.length]);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center">
      <div className="absolute top-0 bottom-0 left-[-20%] right-[-20%] flex transform w_500:skew-x-[-13.14deg] w_500:flex-row flex flex-col w_500:skew-y-0">
        <div className="flex-1 relative">
          <Image src="images/hero/hero_1.png" alt="Left image" fill className="object-cover blur-[4px]" />
        </div>
        <div className="border border-[#FFFFFF] flex-1 relative">
          <Image src="images/hero/hero_2.png" alt="Middle image" fill className="object-cover blur-[4px]" />
        </div>
        <div className="flex-1 relative">
          <Image src="images/hero/hero_3.png" alt="Right image" fill className="object-cover blur-[4px]" />
        </div>
      </div>

      <div className="relative text-center text-white px-4 max-w-2xl mx-auto flex flex-col justify-center">
        <div className="relative inline-block">
          <p className="text-[96px]/[105px] w_1400:text-[250px]/[274px] flex justify-center font-[Homenaje]">
            {t('name')}
          </p>
          <p
            className="absolute font-[ComplianceSans] w_1400:text-[36px] text-[15px]/[29px] text-white w_1400:left-[365px] w_500:right-[15%] right-[-20%] w_1400:top-[-40px] top-[-40px]"
            style={{
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '70px',
              mixBlendMode: 'normal',
              transform: 'rotate(13.14deg)',
              position: 'absolute',
              whiteSpace: 'nowrap',
            }}
          >
            {t('hero.fature')}
          </p>
        </div>

        <div className='flex relative justify-center items-center flex-col'>
        <p className="text-[36px] mb-8 font-[ComplianceSans]">
          {t('hero.experience')}
        </p>

        <div ref={experienceTextRef} className="absolute w-[350px] top-[-20px] h-[15px]">
        </div> 
        </div>

        <div className="flex gap-3 justify-center">
          <Button
            ref={pcButtonRef}
            variant="white"
            onClick={handleDownloadPC}
            className="relative z-10"
          >
            <span className="font-[ComplianceSans] w_500:text-[24px]/[46px] text-[9px]/[18px] flex gap-[10px] items-center">
              <img src="icons/win.svg" alt="win_svg" className="w_500:w-[25px] w-[12px]" />
              {t('hero.download_pc')}
            </span>
          </Button>

          <Button ref={gitButtonRef} variant="white" className="relative z-10">
            <span className="relative font-[ComplianceSans] w_500:text-[24px]/[46px] text-[9px]/[18px] flex gap-[10px] items-center">
              <img src="icons/git.svg" alt="git_svg" className="w_500:w-[25px] w-[12px]" />
              {t('hero.download_git')}
            </span>
          </Button>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {orbs.map(orb => (
          <div
            key={orb.id}
            className="absolute w-3 h-3 rounded-full"
            style={{
              left: `${orb.x - 6}px`,
              top: `${orb.y - 6}px`,
              background: 'radial-gradient(circle, #A0FF6F 0%, #5EFF4F 50%, #00FF00 100%)',
              boxShadow: '0 0 8px #00FF00, inset 0 0 4px rgba(255,255,255,0.5)',
              opacity: orb.opacity,
              transform: 'translateZ(0)',
              transition: 'opacity 0.1s ease-out',
            }}
          />
        ))}
      </div>
    </section>
  );
}