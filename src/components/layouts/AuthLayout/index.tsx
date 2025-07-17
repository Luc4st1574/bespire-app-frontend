"use client";

import { ReactNode } from "react";
import AuthHeader from "./Header";
import AuthFooter from "./Footer";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
<div className='min-h-screen flex flex-col justify-between items-center bg-no-repeat bg-center'
  style={{ backgroundImage: "url('/assets/illustrations/bg_points.webp')" }}
>
      <AuthHeader />
     
   <main
        className="w-full h-full bg-brand-light relative 
        
        flex"
       // URL de la imagen de fondo
      >
        {children}
      </main>
      <AuthFooter />
      </div>
  );
}
