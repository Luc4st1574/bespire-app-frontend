import { useSectionVisible } from "@/hooks/useSectionVisible";
import GetStartedSection from "./GetStartedSection";
import { useUserPreferences } from "@/hooks/useUserPreferences";

export default function GetStartedWrapper() {
  const { visible, loading } = useSectionVisible("getStarted", "hideGetStarted");
  const { updatePreferences } = useUserPreferences();

  if (loading || !visible) return null;

  return (
    <GetStartedSection
      onHide={() => updatePreferences({ hideGetStarted: true })}
    />
  );
}
