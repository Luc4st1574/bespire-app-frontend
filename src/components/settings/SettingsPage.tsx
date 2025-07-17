/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useState } from "react";
import AccountSettings from "./AccountSettings";
import TabsHeader from "./TabsHeader";
import WorkspaceSettings from "../workspace/WorkspaceSettings";
import UserPreferencesSettings from "./UserPreferencesSettings";
import PlansBillingSettings from "./PlansBillingSettings";
import WelcomeNewPlanModal from "../modals/WelcomeNewPlanModal";
import { useAppContext } from "@/context/AppContext";
// ...otros imports



export default function SettingsMain() {
    const { workspace } = useAppContext();
    const workspaceId = workspace?._id;
  
  const [tab, setTab] = useState("account");
  const [showPlanModal, setShowPlanModal] = useState(false);
  

  useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  if (params.get("showPlanModal")) {
    setShowPlanModal(true);
  }
}, []);

  return (
    <div className="w-full max-w-3xl mx-auto py-10">
      <TabsHeader
        activeTab={tab}
        onTabChange={setTab}
      />
      {/* Tab Content */}
      <div>
        {tab === "account" && <AccountSettings />}
        {tab === "workspace" && <WorkspaceSettings />}
        {tab === "preferences" && <UserPreferencesSettings />}
        {tab === "plans" && <PlansBillingSettings />}
        {/* ...otros tabs */}
      </div>

 <WelcomeNewPlanModal
  open={showPlanModal}
  onClose={() => setShowPlanModal(false)}
  //@ts-ignore
  workspaceId={workspaceId}
  plan={workspace?.plan || ""} // Asegúrate de que 'plan' sea el ID correcto del plan
/>

    </div>
  );
}
