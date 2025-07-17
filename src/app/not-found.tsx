// src/app/not-found.tsx
"use client";

import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#101213] px-4">
      <div className="text-7xl font-bold text-[#8F4C4C] mb-4">404</div>
      <div className="text-2xl md:text-3xl font-semibold text-[#E7ECEB] mb-2">
        Page Not Found
      </div>
      <p className="text-[#b0b8bc] mb-6 text-center max-w-xl">
        Sorry, the page you are looking for does not exist or has been moved.<br />
        You can go back to the homepage or explore other sections of the platform.
      </p>
      <Link
        href="/"
        className="inline-block px-8 py-3 rounded-full bg-[#758C5D] text-white font-semibold shadow-md hover:bg-[#6C8C68] transition"
      >
        Back to Home
      </Link>
     
    </div>
  );
}
