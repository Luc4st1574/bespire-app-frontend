'use client';
import Link from "next/link";
import NProgress from "nprogress";
import { useCallback } from "react";

export default function ProgressLink({ href, children, ...props }) {
  const handleClick = useCallback((e) => {
    NProgress.start();
  }, []);
  return (
    <Link
      href={href}
      {...props}
      onClick={handleClick}
      prefetch={true} // Mantén el prefetch si quieres
    >
      {children}
    </Link>
  );
}
