/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';

import { useEffect } from "react";
import { usePathname } from "next/navigation";
//@ts-ignore
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// Opcional: puedes customizar estilos en tu propio CSS.

export default function RouteProgressBar() {
  const pathname = usePathname();

  useEffect(() => {
    // Termina la barra cuando la ruta ha cambiado (ya no arranca aquí)
    NProgress.done();
  }, [pathname]);

  return null;
}
