/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @next/next/no-img-element */
import IconDashboard from "@/assets/icons/icon_dashboard.svg";
import IconRequests from "@/assets/icons/icon_requests.svg";
import IconBrands from "@/assets/icons/icon_brands.svg";
import IconFileManager from "@/assets/icons/icon_file_manager.svg";
import IconAnalitycs from "@/assets/icons/icon_analytics.svg";
import IconLibrary from "@/assets/icons/icon_library.svg";
import IconFolders from "@/assets/icons/icon_folders.svg";
import IconFiles from "@/assets/icons/icon_files.svg";
import IconDocs from "@/assets/icons/icon_docs.svg";
import MessageSquare from "@/assets/icons/icon_send_feedback.svg";
import HelpCircle from "@/assets/icons/icon_helpcenter.svg";
import LogOut from "@/assets/icons/icon_logout.svg";
import Settings from "@/assets/icons/icon_settings.svg";
import SidebarMenuSection from "./SidebarMenuSection";
import AccountDropdown from "@/components/ui/AccountDropdown";
import { useState } from "react";
import FeedbackModal from "@/components/modals/FeedbackModal";
import { useAuthActions } from "@/hooks/useAuthActions";
import { useAppContext } from "@/context/AppContext";
// Removed useRouter, usePathname, useSearchParams as they are now handled by SidebarMenuSection or not directly needed here

export default function Sidebar() {
  const [showFeedback, setShowFeedback] = useState(false);
  const { user, workspace } = useAppContext();
  const { logout } = useAuthActions();

  // "File Manager" is now structured with children for SidebarMenuSection to handle
  const mainMenu = [
    { label: "Dashboard", href: "/dashboard", icon: IconDashboard },
    {
      label: "Requests",
      href: "/requests",
      icon: IconRequests,
      badge: 5,
    },
    { label: "Brands", href: "/brands", icon: IconBrands },
    {
      label: "File Manager",
      href: "/files", // Base href for the File Manager page
      icon: IconFileManager,
      children: [
        {
          label: "Folders",
          href: "/files?view=folders", // Updated href with query param
          icon: IconFolders, // These icons are strings pointing to public assets
        },
        { label: "Files", href: "/files?view=files", icon: IconFiles }, // Updated href with query param
        { label: "Docs", href: "/files?view=docs", icon: IconDocs },     // Updated href with query param
      ],
    },
  ];

  const exploreMenu = [
    { label: "Analytics", href: "/analytics", icon: IconAnalitycs },
    {
      label: "Template Library",
      href: "/templates",
      icon: IconLibrary,
    },
  ];

  const settingsMenu = [
    { label: "Settings", href: "/settings", icon: Settings },
  ];

  const handleLogout = async () => {
    console.log("logout")
    try {
      await logout();
    } catch (err) {
      console.error("Error logging out:", err);
      alert("Failed to logout.");
    }
  };

  return (
    <aside className="w-64 bg-[#FDFEFD] px-4 py-6 flex flex-col justify-between text-sm text-brand-dark">
      {/* Logo */}
      <div>
        <div className="mb-8">
          <a href="/dashboard">
            <img
              src="/assets/logos/logo_bespire.svg"
              className="h-8 "
              alt="Bespire"
            />
          </a>
        </div>

        {/* Main menu - SidebarMenuSection will now handle the File Manager item */}
        <SidebarMenuSection items={mainMenu} />

        {/* Explore menu */}
        <SidebarMenuSection title="Explore" items={exploreMenu} />
      </div>

      {/* Footer menu */}
      <div className="space-y-3 mt-6">
        <SidebarMenuSection items={settingsMenu} />

        <AccountDropdown
          //@ts-ignore
          workspace={workspace?.companyName}
          role={user?.role || ""}
          //@ts-ignore
          plan={'Pro'}
          //@ts-ignore
          avatar={workspace?.companyImg}
          items={[
            {
              label: "Send Feedback",
              icon: MessageSquare,
              onClick: () => setShowFeedback(true),
            },
            {
              label: "Help Center",
              icon: HelpCircle,
              onClick: () => console.log("Help Center"),
            },
            {
              label: "Log Out",
              icon: LogOut,
              onClick: handleLogout,
            },
          ]}
        />
      </div>
      {showFeedback && <FeedbackModal isOpen={showFeedback} onClose={() => setShowFeedback(false)} />}
    </aside>
  );
}