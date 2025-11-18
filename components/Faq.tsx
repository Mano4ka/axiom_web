'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useT } from '@/lib/i18n';
import { useScrollAnimation } from '@/lib/useScrollAnimation';

const faqData = [
  {
    question: {
      ru: 'Можно ли играть офлайн?',
      en: 'Can I play offline?',
    },
    answer: {
      ru: 'Да, после установки многие игры можно запускать без интернета — проверьте описание игры.',
      en: 'Yes, after installation many games can be launched without internet — check the game description.',
    },
  },
  {
    question: {
      ru: 'Поддерживает ли лаунчер облачные сохранения?',
      en: 'Does the launcher support cloud saves?',
    },
    answer: {
      ru: 'Да, для большинства игр доступны облачные сохранения — ваш прогресс будет в безопасности.',
      en: 'Yes, cloud saves are available for most games — your progress will be safe.',
    },
  },
  {
    question: {
      ru: 'Нужно ли платить за использование лаунчера?',
      en: 'Do I need to pay for using the launcher?',
    },
    answer: {
      ru: 'Нет, лаунчер полностью бесплатен.',
      en: 'No, the launcher is completely free.',
    },
  },
  {
    question: {
      ru: 'Могу ли я играть вместе с друзьями?',
      en: 'Can I play with friends?',
    },
    answer: {
      ru: 'Если игра поддерживает мультиплеер — да.',
      en: 'If the game supports multiplayer — yes.',
    },
  },
  {
    question: {
      ru: 'Может ли лаунчер повредить мой компьютер?',
      en: 'Can the launcher damage my computer?',
    },
    answer: {
      ru: 'Нет, лаунчер не вносит изменений в систему и не устанавливает постороннее ПО — только те игры, которые вы выбираете сами.',
      en: 'No, the launcher doesn\'t make system changes or install third-party software — only the games you choose yourself.',
    },
  }
];

export const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t, lang } = useT();
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const getText = (text: string | { ru: string; en: string }) => {
    if (typeof text === 'string') return text;
    return text[lang] ?? text.en ?? text.ru ?? '';
  };

  return (
    <section className="relative w-full py-20 overflow-hidden">
      <div className="overflow-hidden">
        <div className="absolute left-[10px] top-[50px] space-y-4">
          <Image src="images/bg/question_1.svg" alt="AXIOM Logo" width={64} height={140} className="rotate-[20.43deg]" />
        </div>
        <div className="absolute left-[-50px] top-[420px] space-y-4">
          <Image src="images/bg/question.svg" alt="AXIOM Logo" width={140} height={420} className="rotate-[20deg]" />
        </div>
        <div className="absolute right-[-100px] top-[50px] scale-x-[-1]">
          <Image src="images/bg/question.svg" alt="AXIOM Logo" width={310} height={500} className="rotate-[20deg]" />
        </div>
      </div>

      <div className="mx-auto max-w-[1500px] px-4">
        <h2 className="scroll-animate mb-12 text-center text-[56px] leading-[58px] text-white" ref={useScrollAnimation()}>
          {t('faq.title')}
        </h2>

        <div className="space-y-4">
          {faqData.map((faq, index) => {
            const faqRef = useScrollAnimation({ threshold: 0.3 });
            return (
              <div key={index} ref={faqRef} className="scroll-animate w-full rounded-[11px] border border-[#444444] bg-[#1C1C1C] backdrop-blur-sm overflow-hidden transition-all duration-300" style={{ animationDelay: `${index * 0.1}s` }}>
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex cursor-pointer w-full items-center justify-between px-6 py-4 text-left focus:outline-none"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-${index}`}
                  >
                  <span className="w_1000:text-[30px] w_500:text-[20px] text-[15px] font-semibold text-white pr-4">
                    {getText(faq.question)}
                  </span>
                  <Image src="icons/arrow-left.svg" alt="arrow" width={14} height={14} className={`transform transition-transform duration-300 ease-out ${openIndex === index ? 'rotate-[-90deg]' : 'rotate-0'}`}/>
                </button>

                <div className="transition-all duration-300 ease-out overflow-hidden" style={{ maxHeight: openIndex === index ? `${contentRefs.current[index]?.scrollHeight || 200}px` : '0px',}}>
                  <div ref={(el) => { contentRefs.current[index] = el;}} className="px-6 pb-4">
                    <p className="text-[18px] leading-[24px] text-[#ffffffb5] pt-2">
                      {getText(faq.answer)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};