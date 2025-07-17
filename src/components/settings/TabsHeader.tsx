/* eslint-disable @next/next/no-img-element */
import IconAccount from "@/assets/icons/tabs_settings/account.svg"
import IconWorkspace from "@/assets/icons/tabs_settings/workspace.svg";
import IconPlans from "@/assets/icons/tabs_settings/plans.svg";
import IconPreferences from "@/assets/icons/tabs_settings/preferences.svg";
import ProgressLink from "../ui/ProgressLink";

const SETTINGS_TABS = [
  { id: "account", label: "Account",  icon: IconAccount  },
  { id: "workspace", label: "Workspace", icon: IconWorkspace  },
  { id: "plans", label: "Plans & Billing", icon: IconPlans  },
  { id: "preferences", label: "Preferences", icon: IconPreferences  },
];

type Tab = {
    id: string;
    label: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  };
  
  interface TabsHeaderProps {
    tabs?: Tab[];
    activeTab: string;
 
    className?: string;
  }
  export default function TabsHeader({
    tabs = SETTINGS_TABS,
    activeTab,
   
    className = "",
  }: TabsHeaderProps) {
    return (
      <div className={`max-w-4xl mx-auto grid grid-cols-4 gap-2 rounded-full border-2 border-[#CEFFA3] 
      bg-white p-1 mb-10 ${className}`}>
        {tabs.map((t) => {
            const Icon = t.icon;
          return (
            <ProgressLink
            href={`/settings/${t.id}`}
            key={t.id}
            className={`px-6 py-2 text-[#5E6B66]  flex justify-center items-center rounded-full font-medium 
                transition ${activeTab === t.id ? "bg-[#CEFFA3] text-black" : "hover:text-black hover:bg-[#CEFFA3]"}`}
            
            type="button"
          >
            
          <Icon className="w-4 h-4 mr-2" />
            <span>{t.label}</span>
          </ProgressLink>
          )
        })}
      </div>
    );
  }
  