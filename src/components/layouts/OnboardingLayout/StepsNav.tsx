'use client';

import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Image from 'next/image';
const steps = [
  { step: 1, label: 'Share Your Focus', icon: '/assets/icons/list2.svg' },
  { step: 2, label: 'Build Your Team',  icon: '/assets/icons/list3.svg' },
  { step: 3, label: 'Define Your Workspace ',  icon: '/assets/icons/list4.svg' },
  { step: 4, label: 'Choose Your Plan',  icon: '/assets/icons/list.svg' },
];

export default function StepsNav() {
  const pathname = usePathname();

  const currentStep = steps.find((step) =>
    pathname.includes(`/step-${step.step}`)
  )?.step || 1;

  return (
    <div className="flex sm:justify-between overflow-x-auto sm:overflow-visible border-b border-gray-200">
  {steps.map(({ step, label, icon }) => (
    <div
      key={step}
      className={clsx(
        'text-left flex-shrink-0 min-w-[180px] sm:flex-1',
        'px-4 py-4',
        step === currentStep
          ? 'text-black border-b-4 border-black'
          : 'text-gray-400 opacity-50'
      )}
    >
      <div className="flex items-center gap-2 mb-1">
        <Image src={icon} alt="" width={16} height={16} />
        <span className="block text-xs">Step {step}</span>
      </div>
      <span className="block whitespace-normal">{label}</span>
    </div>
  ))}
</div>

  );
}
