import Image from 'next/image';
import { FC } from 'react';

interface LogoProps {
  link?: boolean;
  bg?: boolean;
  cat?: boolean;
}

const Logo: FC<LogoProps> = ({ link = true, bg = false, cat = false }) => {
  const imageContent = (
    <Image alt="Logo" src="images/logo.svg" width={32} height={32} priority className="w-[20px] w_500:w-[32px] h-[20px] w_500:h-[32px] object-contain"/>
  );

  const catGif = cat ? (
    <div className="absolute z-2 w_500:top-[-85px] top-[-40px] left-1/2 -translate-x-1/2 w_500:w-30 w-15 w_500:h-30 h-15 pointer-events-none">
      <Image src="images/cat.gif" alt="Cat" width={80} height={80} unoptimized className="w-full h-full object-contain drop-shadow-lg"/>
    </div>
  ) : null;

  const withBg = bg ? (
    <div className="p-[6px] max-w-[58px] w_500:p-[12px] w_500:rounded-[19px] rounded-[10px] bg-[#151515] border-[1.7px] border border-[#3D3D3D] shadow-md [filter:drop-shadow(0_0_10px_rgba(98,102,98,0.5))]">
      {imageContent}
    </div>
  ) : (
    imageContent
  );

  const logoElement = (
    <div className="relative flex justify-center">
      {catGif}
      {withBg}
    </div>
  );

  if (link) {
    return (
      <a href="/" className="duration-300">
        {logoElement}
      </a>
    );
  }

  return withBg;
};

export default Logo;