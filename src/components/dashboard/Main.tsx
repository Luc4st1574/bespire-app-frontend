"use client";

import DashboardRequestsPreview from "./DashboardRequestsPreview";
import DashboardResources from "./DashboardResources";
import GetStartedWrapper from "./GetStartedWrapper";
import QuickLinksWrapper from "./QuickLinksWrapper";

export default function DashboardMain() {
  return (
    <div>
      <GetStartedWrapper />
      <QuickLinksWrapper />
      <DashboardRequestsPreview />
      <DashboardResources />
    </div>
  );
}
