import React from 'react';

interface IconProps {
  className?: string;
}

const SvgIcon: React.FC<{ children: React.ReactNode; className?: string, viewBox?: string }> = ({ children, className, viewBox = "0 0 24 24" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox={viewBox} stroke="currentColor" strokeWidth={1.5}>
    {children}
  </svg>
);

export const BookOpenIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <SvgIcon className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v11.494m-5.243-9.995l4.496-2.248a1.5 1.5 0 011.494 0l4.496 2.248m-10.485 5.5.213.106a1.5 1.5 0 001.494 0l4.062-2.031m-5.77 4.076a1.5 1.5 0 01-1.494 0l-4.496-2.248m16.47 4.496l-4.496-2.248a1.5 1.5 0 00-1.494 0l-4.496 2.248" />
  </SvgIcon>
);

export const BeakerIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <SvgIcon className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12.75l-4.5 4.5m0 0l-4.5-4.5M15 17.25V4.5a2.25 2.25 0 00-2.25-2.25h-3A2.25 2.25 0 007.5 4.5v12.75m0 0l-1.5-1.5m1.5 1.5v-2.25" />
  </SvgIcon>
);

export const CalculatorIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
    <SvgIcon className={className} viewBox="0 0 20 20" >
        <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm1 4a1 1 0 011-1h2a1 1 0 110 2H6a1 1 0 01-1-1zm0 4a1 1 0 011-1h2a1 1 0 110 2H6a1 1 0 01-1-1zm5-4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1zm0 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1zm-4 3a1 1 0 100 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
    </SvgIcon>
);

export const GlobeIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <SvgIcon className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.795A9 9 0 1112.205 3m8.795 9.795c-.328.02-1.03.04-1.785.04-3.56 0-6.429-2.869-6.429-6.429 0-.755.02-1.457.04-1.785M15.75 12.75a4.5 4.5 0 11-6.364-6.364m6.364 6.364l-6.364-6.364" />
  </SvgIcon>
);

export const ScaleIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <SvgIcon className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m0 0l-3.75-3.75M12 21l3.75-3.75M4.5 12h15" />
  </SvgIcon>
);