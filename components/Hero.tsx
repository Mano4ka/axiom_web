'use client';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { useT } from '@/lib/i18n';
import { useState, useEffect, useRef, useCallback } from 'react';

interface Orb {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
  life: number;
}

const MAX_ORBS = 50;

export default function Hero() {
  const { t } = useT();
  const [orbs, setOrbs] = useState<Orb[]>([]);
  const orbIdRef = useRef(0);
  const animationRef = useRef<number | null>(null);
  const orbsRef = useRef<Orb[]>([]);
  const isAnimatingRef = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);
  const experienceTextRef = useRef<HTMLDivElement>(null);
  const pcButtonRef = useRef<HTMLDivElement>(null);
  const gitButtonRef = useRef<HTMLDivElement>(null);

  const getRelativeRect = useCallback((el: HTMLElement | null) => {
    if (!el || !sectionRef.current) return null;
    const sectionRect = sectionRef.current.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    return {
      left: elRect.left - sectionRect.left,
      right: elRect.right - sectionRect.left,
      top: elRect.top - sectionRect.top,
      bottom: elRect.bottom - sectionRect.top,
    };
  }, []);

  const startAnimation = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const gravity = 0.4;
    const friction = 0.98;
    const buttonCollisionDamping = 0.4;

    const animate = () => {
      const currentOrbs = orbsRef.current;
      if (currentOrbs.length === 0) {
        isAnimatingRef.current = false;
        return;
      }

      const pcRect = getRelativeRect(pcButtonRef.current);
      const gitRect = getRelativeRect(gitButtonRef.current);

      const updatedOrbs = currentOrbs.map(orb => {
        let { x, y, vx, vy, life } = orb;
        vy += gravity;
        vx *= friction;
        vy *= friction;
        x += vx;
        y += vy;

        if (pcRect && y >= pcRect.top && y <= pcRect.bottom && x >= pcRect.left && x <= pcRect.right) {
          vy = -Math.abs(vy) * buttonCollisionDamping;
          y = pcRect.top;
        } else if (gitRect && y >= gitRect.top && y <= gitRect.bottom && x >= gitRect.left && x <= gitRect.right) {
          vy = -Math.abs(vy) * buttonCollisionDamping;
          y = gitRect.top;
        }

        life -= 0.016;
        const opacity = Math.max(0, life / 1.5);

        return { ...orb, x, y, vx, vy, opacity, life };
      }).filter(orb => orb.life > 0);

      orbsRef.current = updatedOrbs;
      setOrbs(updatedOrbs);

      if (updatedOrbs.length > 0) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        isAnimatingRef.current = false;
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  }, [getRelativeRect]);

  const createOrbs = useCallback((startX: number, startY: number, count: number, spreadX: number) => {
    const newOrbs: Orb[] = [];
    for (let i = 0; i < count; i++) {
      const offsetX = (Math.random() - 0.5) * spreadX;
      newOrbs.push({
        id: orbIdRef.current++,
        x: startX + offsetX,
        y: startY + 10,
        vx: (Math.random() - 0.5) * 12,
        vy: Math.random() * -3 - 2,
        opacity: 1,
        life: 2.5,
      });
    }

    orbsRef.current = [...orbsRef.current, ...newOrbs].slice(-MAX_ORBS);
    setOrbs(orbsRef.current);
    startAnimation();
  }, [startAnimation]);

  const handleDownloadPC = useCallback(() => {
    if (!experienceTextRef.current || !sectionRef.current) return;
    
    const sectionRect = sectionRef.current.getBoundingClientRect();
    const textRect = experienceTextRef.current.getBoundingClientRect();
    
    const centerX = textRect.left - sectionRect.left + textRect.width / 2;
    const bottomY = textRect.bottom - sectionRect.top;
    const count = 8 + Math.floor(Math.random() * 5);

    createOrbs(centerX, bottomY, count, textRect.width * 0.8);
  }, [createOrbs]);

  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center">
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
          <div ref={pcButtonRef}>
            <Button
              variant="white"
              onClick={handleDownloadPC}
              className="relative z-10"
            >
              <span className="font-[ComplianceSans] w_500:text-[24px]/[46px] text-[9px]/[18px] flex gap-[10px] items-center">
                <img src="icons/win.svg" alt="win_svg" className="w_500:w-[25px] w-[12px]" />
                {t('hero.download_pc')}
              </span>
            </Button>
          </div>

          <div ref={gitButtonRef}>
            <Button variant="white" className="relative z-10">
              <span className="relative font-[ComplianceSans] w_500:text-[24px]/[46px] text-[9px]/[18px] flex gap-[10px] items-center">
                <img src="icons/git.svg" alt="git_svg" className="w_500:w-[25px] w-[12px]" />
                {t('hero.download_git')}
              </span>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {orbs.map(orb => (
          <div
            key={orb.id}
            className="absolute w-[12px] h-[12px]"
            style={{
              left: `${orb.x - 6}px`,
              top: `${orb.y - 6}px`,
              opacity: orb.opacity,
              transform: 'translateZ(0)',
              transition: 'opacity 0.1s ease-out',
            }}
          ><img src="/orbs.svg" alt="orb" className="w-full h-full" />
        </div>
        ))}
      </div>
    </section>
  );
}