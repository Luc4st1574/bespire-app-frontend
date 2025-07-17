'use client';

export default function Spinner() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center ">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-300 border-t-black"></div>
        <p className="mt-4 text-gray-700">Loading...</p>
      </div>
    </div>
  );
}
