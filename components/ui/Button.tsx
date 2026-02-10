'use client';

import { ButtonHTMLAttributes, AnchorHTMLAttributes, ForwardedRef, forwardRef } from 'react';

type ButtonProps = {
  variant?: 'primary' | 'white' | 'social';
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
} & (ButtonHTMLAttributes<HTMLButtonElement> | AnchorHTMLAttributes<HTMLAnchorElement>);

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ variant = 'primary', className = '', style, href, target, rel, children, ...props }, ref) => {
    const baseStyles = 'w_500:px-4 px-[5px] w_500:py-2 py-[2px] rounded hover:cursor-pointer inline-flex items-center justify-center transition-colors';

    const variantStyles = {
      primary: 'bg-blue-500 text-white hover:bg-blue-600',
      white: 'bg-[#EDEDED] rounded-[12px] border border-[#D7D7D7] text-black',
      social: 'px-[5px] py-[5px] bg-[#1C1C1C] transition duration-300 transition-bg hover:bg-[var(--hover-bg)] w-[411px] rounded-[11px] border border-[#444444] text-white',
    };

    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`.trim();

    if (href) {
      return (
        <a href={href} target={target} rel={rel} className={combinedClassName} style={style} ref={ref as ForwardedRef<HTMLAnchorElement>} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
          {children}
        </a>
      );
    }

    return (
      <button className={combinedClassName} style={style} ref={ref as ForwardedRef<HTMLButtonElement>} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)} >
        {children}
      </button>
    );
  }
);

export default Button;