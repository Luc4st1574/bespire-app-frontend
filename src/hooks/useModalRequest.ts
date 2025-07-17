
import { useState } from "react";
import { useEffect } from "react";

export function useModalRequests() {
  const [showModalRequest, setShowModalRequest] = useState(false);
  const [parentId, setParentId] = useState<string | null>(null);

  useEffect(() => {
    // Aquí puedes realizar acciones cuando showModalRequest cambie
    // Por ejemplo, limpiar el parentId cuando se cierra el modal
   console.log("Modal state changed:", showModalRequest);
  }, [showModalRequest]);

  return {
    showModalRequest,
    setShowModalRequest,
    parentId,
    setParentId,
  };
}
