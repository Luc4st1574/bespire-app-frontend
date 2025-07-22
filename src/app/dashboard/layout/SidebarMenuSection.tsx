"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { usePathname, useSearchParams, useRouter } from "next/navigation"; // Import useRouter
import { ChevronDown } from "lucide-react"; // This is the chevron icon
import ProgressLink from "@/components/ui/ProgressLink";
import Image from 'next/image'; // Import Next.js Image component

type MenuItem = {
  label: string;
  href: string;
  // Icon can be a string (for direct public path) or a React component (for SVG imports)
  icon: string | React.ComponentType<React.SVGProps<SVGSVGElement>>;
  badge?: number;
  children?: MenuItem[];
};

export default function SidebarMenuSection({
  title,
  items,
}: {
  title?: string;
  items: MenuItem[];
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter(); // Initialize useRouter
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  // Helper function to check if a menu item is active, considering query params for sub-items
  const isActive = (path: string, itemChildren?: MenuItem[]) => {
    const currentPathWithoutQuery = pathname.split('?')[0];
    const targetPathWithoutQuery = path.split('?')[0];

    // Check for base path matches (e.g., /files)
    if (currentPathWithoutQuery === targetPathWithoutQuery) {
      // If it's a base path without a view parameter
      if (currentPathWithoutQuery === path && !searchParams.get("view")) {
        return true;
      }
      // If the target path has a view parameter, check if it matches the current view
      const targetView = new URLSearchParams(path.split('?')[1]).get('view');
      if (targetView && searchParams.get('view') === targetView) {
          return true;
      }
      // If it's a parent item with children, and one of its children is active
      if (itemChildren && itemChildren.some(sub => isActive(sub.href))) {
          return true;
      }
    }
    return pathname.startsWith(path);
  };

  useEffect(() => {
    const openDefaults: Record<string, boolean> = {};
    items.forEach((item) => {
      // Check if any child's href matches the current pathname and view parameter
      if (item.children?.some((sub) => {
        const subPath = sub.href.split('?')[0];
        const subView = new URLSearchParams(sub.href.split('?')[1]).get('view');
        return pathname === subPath && searchParams.get('view') === subView;
      })) {
        openDefaults[item.label] = true;
      }
    });
    setOpenMenus((prev) => ({ ...prev, ...openDefaults }));
  }, [pathname, searchParams, items]);

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <div>
      {title && (
        <p className="text-xs text-gray-400 uppercase px-3 mb-2 mt-10">
          {title}
        </p>
      )}
      <nav className="space-y-1">
        {items.map((item) => {
          const isSubOpen = openMenus[item.label] || false;
          const isCurrentItemActive = isActive(item.href, item.children);

          // Render icon based on its type (string path for Image, or React component for SVG imports)
          const RenderIcon = ({ iconPathOrComponent, altText, className }: {
            iconPathOrComponent: string | React.ComponentType<React.SVGProps<SVGSVGElement>>;
            altText: string;
            className: string;
          }) => {
            if (typeof iconPathOrComponent === 'string') {
              return <Image src={iconPathOrComponent} alt={altText} width={24} height={24} className={className} />;
            } else {
              const IconComponent = iconPathOrComponent;
              return <IconComponent className={className} />;
            }
          };

          if (item.children) {
            // Special handling for menu items with children (e.g., File Manager)
            return (
              <div key={item.label}>
                <div
                  className={clsx(
                    "w-full flex items-center justify-between text-[#5E6B66] group rounded-md px-3 py-2 hover:bg-[#CEFFA3] hover:text-[#181B1A] transition",
                    isCurrentItemActive && "bg-[#CEFFA3] text-[#181B1A]"
                  )}
                >
                  {/* Link for the label (navigates to the parent path) */}
                  <ProgressLink
                    href={item.href}
                    className="flex items-center gap-2 flex-grow" // Flex-grow to make link take space
                    // Prevent default click behavior on ProgressLink if it conflicts with parent div
                    onClick={() => {
                       router.push(item.href); // Ensure navigation on click
                    }}
                  >
                    <RenderIcon
                      iconPathOrComponent={item.icon}
                      altText={item.label}
                      className={clsx(
                        "w-6 h-6 text-[#9FAAA5] group-hover:text-[#181B1A] transition",
                        isCurrentItemActive && "text-[#181B1A]"
                      )}
                    />
                    {item.label}
                  </ProgressLink>

                  {/* Button for the chevron (toggles submenu visibility) */}
                  <button
                    onClick={() => toggleMenu(item.label)}
                    className="p-1 rounded-full hover:bg-gray-100"
                    title={`Toggle ${item.label} options`}
                    aria-label={`Toggle ${item.label} options`}
                  >
                    <ChevronDown
                      className={clsx(
                        "w-4 h-4 transition-transform text-[#9FAAA5] group-hover:text-[#181B1A]",
                        isSubOpen && "rotate-180"
                      )}
                    />
                  </button>
                </div>

                {/* Submenu items */}
                {isSubOpen && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.children.map((sub) => {
                      const subHrefParams = new URLSearchParams(sub.href.split('?')[1]);
                      const isSubActive = pathname === sub.href.split('?')[0] && searchParams.get('view') === subHrefParams.get('view');

                      return (
                        <ProgressLink
                          key={sub.label}
                          href={sub.href}
                          className={clsx(
                            "flex items-center gap-2 text-[#5E6B66] group rounded-md px-3 py-2 hover:bg-[#CEFFA3] hover:text-[#181B1A] transition",
                            isSubActive && "bg-[#CEFFA3] text-[#181B1A]"
                          )}
                        >
                          <RenderIcon
                            iconPathOrComponent={sub.icon}
                            altText={sub.label}
                            className={clsx(
                              "w-5 h-5 text-[#9FAAA5] group-hover:text-[#181B1A]",
                              isSubActive && "text-[#181B1A]"
                            )}
                          />
                          {sub.label}
                        </ProgressLink>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          } else {
            // Standard menu item (no children)
            return (
              <div key={item.label}>
                <ProgressLink
                  href={item.href}
                  className={clsx(
                    "w-full flex items-center justify-between text-[#5E6B66] group rounded-md px-3 py-2 hover:bg-[#CEFFA3] hover:text-[#181B1A] transition",
                    isCurrentItemActive && "bg-[#CEFFA3] text-[#181B1A]"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <RenderIcon
                      iconPathOrComponent={item.icon}
                      altText={item.label}
                      className={clsx(
                        "w-6 h-6 text-[#9FAAA5] group-hover:text-[#181B1A] transition",
                        isCurrentItemActive && "text-[#181B1A]"
                      )}
                    />
                    {item.label}
                  </div>

                  {item.badge ? (
                    <span className="text-xs bg-[#758C5D] text-white rounded-full px-2 py-0.5">
                      {item.badge}
                    </span>
                  ) : null}
                </ProgressLink>
              </div>
            );
          }
        })}
      </nav>
    </div>
  );
}