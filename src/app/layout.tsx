import "./globals.css";
import { ReactNode } from "react";
import Providers from "@/components/Providers";
import RouteProgressBar from "../components/RouteProgressBar";

export const metadata = {
  title: "Bespire",
  description: "Bespire — Design at Scale",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        
        <Providers>
          <RouteProgressBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
