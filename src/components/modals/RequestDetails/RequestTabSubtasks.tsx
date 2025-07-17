/* eslint-disable @next/next/no-img-element */
// components/RequestTabSubtasks.tsx
import { useEffect, useState } from "react";
import { getInitials } from "@/utils/utils";
import Button from "../../ui/Button";
import RequestStatusBadge from "../../ui/RequestStatusBadge";
import { useAppContext } from "@/context/AppContext";
import { useRequestSubtasksLazy } from "@/hooks/useRequestSubtasks";

export default function RequestTabSubtasks({ request, onOpenSubtask }) {
  const { setParentId, setShowModalRequest } = useAppContext();

  // Guarda subtasks iniciales (prop) para UX instantánea
  const [subtasks, setSubtasks] = useState(request.subtasks || []);

  // --- Lazy Query para buscar subtasks cuando se necesite
  const {
    subtasks: remoteSubtasks,
    loading,
    fetchSubtasks,
    called,
  } = useRequestSubtasksLazy();

  // --- Al abrir el tab (o tras crear), dispara el fetch (solo si no se ha hecho)
  useEffect(() => {
    // Puedes condicionar por tab, o forzar siempre que abras el tab
    if (request.id && !called) {
      fetchSubtasks({ variables: { id: request.id } });
    }
  }, [request.id, called, fetchSubtasks]);

  // --- Cuando llegan los remoteSubtasks, actualiza la lista
  useEffect(() => {
    if (remoteSubtasks && remoteSubtasks.length > 0) {
      setSubtasks(remoteSubtasks);
    }
  }, [remoteSubtasks]);

  // --- Handler para crear subtask
  const handleAddSubtask = () => {
    setParentId(request.id || request._id);
    setShowModalRequest(true);

    // Luego de crear la subtask (en el modal), deberías volver a llamar fetchSubtasks()
    // Puedes pasar un callback, escuchar un evento, o simplemente hacer fetchSubtasks() en el modal de create al cerrar.
  };

  return (
    <div className="p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <label className="font-medium text-[#5E6B66]">Subtasks</label>
        <Button
          type="button"
          variant="outlineG"
          size="sm"
          onClick={handleAddSubtask}
        >
          Add +
        </Button>
      </div>
      <ul className="flex flex-col gap-2">
        {(loading ? subtasks : remoteSubtasks).map((st) => (
          <li
            key={st.id}
            className="flex items-center bg-white rounded-xl px-1 py-2 cursor-pointer hover:bg-[#F5F8F6] transition group"
            onClick={() => onOpenSubtask(st.id, request)}
          >
            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <img src="/assets/icons/corner-down-right.svg" alt="" />
                <span className="font-medium truncate max-w-[220px]">
                  {st.title}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                <span>
                  Due on{" "}
                  {st.dueDate
                    ? new Date(st.dueDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "-"}
                </span>
              </div>
            </div>

            {/* Status y Avatares */}
            <div className="flex flex-row items-center gap-2 ml-3">
              <RequestStatusBadge value={st.status} />
              {st.assignees.length > 0 &&
                st.assignees.map((a) => {
                  const initials = getInitials(a.name);
                  return (
                    <div
                      key={a.id}
                      className="w-8 h-8 rounded-full overflow-hidden"
                    >
                      {a.avatarUrl ? (
                        <img
                          src={a.avatarUrl}
                          alt={a.name}
                          className="w-full h-full object-cover"
                          draggable={false}
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-100 mr-3 text-gray-600 flex items-center justify-center font-semibold text-base">
                          {initials}
                        </div>
                      )}
                    </div>
                  );
                })}
              <img src="/assets/icons/mayorq.svg" alt="" />
            </div>
          </li>
        ))}
      </ul>
      {loading && (
        <div className="text-xs text-gray-400 mt-3">Loading subtasks...</div>
      )}
    </div>
  );
}
