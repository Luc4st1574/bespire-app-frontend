import { useSectionVisible } from "@/hooks/useSectionVisible";
import QuickLinksSection from "./QuickLinksSection";
import { useUserPreferences } from "@/hooks/useUserPreferences";
import { useState } from "react";
import SectionHiddenAlert from "./SectionHiddenAlert";

export default function QuickLinksWrapper() {
  const { visible, loading } = useSectionVisible("quickLinks", "hideQuickLinks");
  const { updatePreferences } = useUserPreferences();
  const [showAlert, setShowAlert] = useState(false);

  // Handler para ocultar la sección y mostrar el alert
  const handleHide = async () => {
    await updatePreferences({ hideQuickLinks: true });
    setShowAlert(true);
  };

  // Undo
  const handleUndo = async () => {
    await updatePreferences({ hideQuickLinks: false });
    setShowAlert(false);
  };

  // Dismiss
  const handleDismiss = () => setShowAlert(false);

  // No mostrar la sección si loading, o si está oculta (pero sí mostrar el alert)
  if (loading) return null;

  return (
    <>
      {visible && !showAlert && <QuickLinksSection onHide={handleHide} />}
      {showAlert && (
        <SectionHiddenAlert
          message="Quick Links hidden. Manage them anytime in settings."
          onUndo={handleUndo}
          onDismiss={handleDismiss}
          duration={8000} // opcional: autodesaparece a los 8 seg.
        />
      )}
    </>
  );
}
