// layouts/DashboardLayout.tsx
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Toaster } from "sonner";
import AuthGuard from "@/guards/AuthGuard";

export default function DashboardLayout({
  children,
  sidebar,
  titleHead = "Dashboard",
}: {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  titleHead?: string;
}) {


  return (
    <AuthGuard requireWorkspace  > 
       <div className="flex h-screen bg-[#F6FDF0] text-sm text-brand-dark">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header titleHead={titleHead} />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Contenido principal */}
            <div className="flex-1">{children}</div>

            {/* Sidebar derecho si existe */}
            {sidebar && (
              <aside className="w-full lg:w-[250px] shrink-0">{sidebar}</aside>
            )}
          </div>
        </main>
        <Toaster
  position="bottom-right"
  expand={false}
  duration={3000}
  closeButton={false} // lo hacemos manual
  className="z-[100]"
  toastOptions={{
    unstyled: true, // para usar solo tus clases
  }}
/>
      </div>
    </div>
    </AuthGuard>
   
  );
}
