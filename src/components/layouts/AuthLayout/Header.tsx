"use client";

import { useAuthActions } from "@/hooks/useAuthActions";
import { public_site_url } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthHeader() {
  const pathname = usePathname();
const {  logout } = useAuthActions();

const handleLogout =  () => {
  console.log("logout")
  try {
     logout();
  } catch (err) {
    console.error("Error logging out:", err);
    alert("Failed to logout.");
  } 
};
  const renderRightSection = () => {
    if (pathname === "/auth/login") {
      return (
        <>
          <span>New to Bespire?</span>
          <Link href="/auth/register" className="text-black font-semibold">
            Start here
          </Link>
        </>
      );
    }

    if (pathname === "/auth/register") {
      return (
        <>
          <span>Have an account?</span>
          <Link href="/auth/login" className="text-black font-semibold">
            Log in
          </Link>
        </>
      );
    }

    return (
      <>
        <span>Back to login</span>
        <Link href="/auth/login" className="text-black font-semibold">
          Go to login
        </Link>
      </>
    );
  };

  return (
    <header className="w-full py-4 px-4 bg-brand-light">
      <div className="max-w-4xl mx-auto flex items-center px-8 justify-between bg-white py-4 rounded-full border-2 border-[#CEFFA3]">
        {(pathname === "/auth/login" || pathname === "/auth/register") && (
          <div className="flex items-center gap-4">
            <Image
              src="/assets/icons/menorq.svg"
              alt=""
              width={12}
              height={12}
            />
            <a href={public_site_url}>Back to site</a>
          </div>
        )}
      <a href={public_site_url}>
      <Image
          src="/assets/logos/logo_bespire.svg"
          alt="Logo"
          width={120}
          height={30}
        />

      </a>
        
        {(pathname === "/auth/login" || pathname === "/auth/register") && (
          <div className="flex items-center gap-4">{renderRightSection()}</div>
        )}

        {(pathname.includes('auth/onboarding')) && (
          <div className="flex items-center gap-4">
            
  <span>Have an account?</span>
          <Link href="/auth/login"
          onClick={handleLogout}
          className="text-black font-semibold">
            Log in
          </Link>
          </div>
        )} 


{(pathname.includes('auth/welcome')) && (
          <div className="flex items-center gap-4">
            
  <span>Have Questions?</span>
          <Link href={public_site_url+"/contact"}
          onClick={handleLogout}
          className="text-[#5B6F59] font-medium">
            Contact us here
          </Link>
          </div>
        )} 
      </div>
    </header>
  );
}
