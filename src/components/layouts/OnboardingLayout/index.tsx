'use client';

import { ReactNode } from 'react';
import StepsNav from './StepsNav';
;

export default function OnboardingLayout({ children }: { children: ReactNode }) {
  return (
    <div className='w-full px-4'>
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow  py-4 ">
      <StepsNav />
      <div className="px-4">{children}</div>
    </div>
    </div>
  );
}
