"use client";

import {  usePathname } from "next/navigation";
import clsx from "clsx";
import Button from "../../ui/Button";

type FooterNavProps = {
  isNextDisabled?: boolean;
  onNext?: () => void;
  textFooter?: string;
  loading?: boolean; // 👈 nueva prop
};

export default function FooterNav({
  isNextDisabled = false,
  onNext,
  textFooter = "",
  loading = false,
}: FooterNavProps) {
  const pathname = usePathname();

  const step = parseInt(pathname.split("/step-")[1]) || 1;



  return (
    <div className="flex flex-col md:flex-row justify-between items-center px-6 pb-6 pt-10 gap-4">
      {step > 1 ? (
        <Button
        variant={isNextDisabled ? "primary" : "green2"}
          label="Back"
          className="min-w-[160px]"
          onClick={() => {
            const prevStep = step - 1;
            window.location.href = `/auth/onboarding/step-${prevStep}`;
          }}
          type="button"
            disabled={loading}
        ></Button>
      ) : (
        <div className="min-w-[160px]"></div>
      )}

      <div className="flex-1 text-center">
        <span
          className="text-xs text-gray-600"
          dangerouslySetInnerHTML={{ __html: textFooter }}
        ></span>
      </div>

      <Button
        type="button"
        variant={isNextDisabled ? "primary" : "green2"}

        label={loading ? "Loading..." : "Next"}
        onClick={() => onNext?.()}
        disabled={isNextDisabled}
        className={clsx(
          " transition min-w-[160px]",
          isNextDisabled ? "bg-gray-200 text-gray-400 cursor-not-allowed" : ""
        )}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        )}
      </Button>
    </div>
  );
}
