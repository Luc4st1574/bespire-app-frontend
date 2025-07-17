'use client';

import { useRouter } from "next/navigation";

export default function StripeCancelPage() {
  const router = useRouter();

  const handleTryAgain = () => {
    router.push("/onboarding/step-1");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        Payment Cancelled
      </h1>
      <p className="text-center mb-8">
        Your subscription was not completed. You can try selecting a plan again.
      </p>

      <button
        onClick={handleTryAgain}
        className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
      >
        Choose Plan Again
      </button>
    </div>
  );
}
