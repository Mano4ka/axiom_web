'use client';

import { useT } from '@/lib/i18n';

type StatsCardProps = {
  value: string;
  label: string | { ru: string; en: string };
  circleColor?: string;
  className?: string;
};

export const Stats = ({ value, label, circleColor = '#FFFFFF', className = '' }: StatsCardProps) => {
  const { t, lang } = useT();

  const getLabel = () => {
    if (typeof label === 'string') return label;
    return label[lang] ?? label.en ?? label.ru ?? '';
  };

  return (
    <div
      className={`w-[180px] h-[110px] bg-[#1C1C1C]/64 backdrop-blur-[5px] border border-[#444444] rounded-[55px] flex flex-col items-center justify-center ${className}`}
    >
      <div className="flex items-center">
        <div className="flex mr-3 relative items-center">
          <div className="w-[15px] h-[15px] rounded-full" style={{ backgroundColor: circleColor }} />
          <div className="absolute w-[15px] h-[15px] rounded-full blur-[5px]" style={{ backgroundColor: circleColor }}/>
        </div>
        <div className="text-[40px] leading-[48px] font-normal text-white font-['Bahnschrift']">
          {value}
        </div>
      </div>
      <div className="text-[14px] leading-[17px] text-white/72 font-['Bahnschrift'] mt-1">
        {getLabel()}
      </div>
    </div>
  );
};