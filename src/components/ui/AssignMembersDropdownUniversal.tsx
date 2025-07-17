import React, { useState, useMemo } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";
import SpinnerSmall from "./Spinner";
import AssignedMemberListItem from "./AssignedMemberListItem";
import { useAssignees } from "@/hooks/useAssignees";
import { showErrorToast, showSuccessToast } from "./toast";

type User = {
  id: string;
  name: string;
  avatarUrl: string;
  teamRole: string;
  email?: string;
};

type Props = {
  teamMembers: User[]; // Todos los miembros del equipo (workspace, sales, etc.)
  linkedToId: string; // ID de la entidad (request, sales, brand, etc.)
  linkedToType: string; // Tipo de entidad ('request', 'sales', etc.)
  onClose: () => void;
  anchorRect: DOMRect | null;
};

export default function AssignMembersDropdownUniversal({
  teamMembers,
  linkedToId,
  linkedToType,
  onClose,
  anchorRect,
}: Props) {
  const [search, setSearch] = useState("");
  const {
    assignees,
    addAssignee,
    removeAssignee,
    loading: loadingAssignees,
  } = useAssignees({ linkedToId, linkedToType });

  console.log("AssignMembersDropdownUniversal rendered with:", {
    teamMembers,
    assignees,
  });

  // IDs de los asignados actuales (convertir a string por si acaso)
  const assignedIds = useMemo(
    () => new Set(assignees.map((a) => a.user?._id || a.user?.id)),
    [assignees]
  );
  // Detalle de usuarios asignados
  const assignedUsers = useMemo(
    () => teamMembers.filter((u) => assignedIds.has(u.id)),
    [teamMembers, assignedIds]
  );
  // Usuarios disponibles para asignar
  const filteredUsers = useMemo(() => {
    const searchText = search.toLowerCase();
    return teamMembers
      .filter((u) => !assignedIds.has(u.id))
      .filter(
        (u) =>
          u.name.toLowerCase().includes(searchText) ||
          (u.teamRole?.toLowerCase().includes(searchText) ?? false)
      );
  }, [search, teamMembers, assignedIds]);

  // Handler para asignar o quitar
  const handleToggle = async (user: User) => {
    try {
      if (assignedIds.has(user.id)) {
        await removeAssignee(user.id);
        showSuccessToast(`${user.name} removed successfully`);
      } else {
        await addAssignee(user.id);
        showSuccessToast(`${user.name} assigned successfully`);
      }
    } catch (error) {
      showErrorToast(
        `An error occurred. Please try again. Error: ${error.message}`
      );
    }
  };

  if (!anchorRect) return null;

  const style: React.CSSProperties = {
    position: "absolute",
    top: anchorRect.bottom + window.scrollY,
    left: anchorRect.left + window.scrollX,
    width: 256,
    maxHeight: 400,
    overflowY: "auto",
    backgroundColor: "white",
    border: "1px solid #d1d5db",
    borderRadius: 8,
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    zIndex: 9999,
    display: "flex",
    flexDirection: "column",
  };

  return createPortal(
    <div id="assign-members-dropdown font-medium" style={style}>
      {/* Search input */}
      <div className="relative w-full flex items-center justify-start text-left py-2 border-b border-gray-300">
        <img
          src="/assets/icons/search.svg"
          alt="search"
          className="w-4 h-4 ml-2"
        />
        <input
          type="text"
          placeholder="Search a member"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full text-sm pl-2 outline-none text-[#5E6B66]"
        />
      </div>
      {/* Assigned Members */}
      {assignedUsers.length > 0 && (
        <div className=" border-b border-gray-300">
          <div className="flex items-center flex justify-start px-3 py-2 gap-2 items-center">
            <img
              src="/assets/icons/members.svg"
              alt="select"
              className="w-4 h-4"
            />
            <h3 className="text-gray-700 font-medium text-sm">
              Assigned Members
            </h3>
          </div>
          <ul className="max-h-30 overflow-auto">
            {assignedUsers.map((user) => (
              <AssignedMemberListItem
                key={user.id}
                user={user}
                onClick={() => handleToggle(user)}
              />
            ))}
          </ul>
        </div>
      )}
      {/* Select Members */}
      <div className="flex items-center flex justify-start px-3 py-2 gap-2 items-center">
        <img src="/assets/icons/members.svg" alt="select" className="w-4 h-4" />
        <h3 className="text-gray-700 font-medium text-sm">Select Members</h3>
      </div>
      {loadingAssignees ? (
        <SpinnerSmall />
      ) : (
        <ul className="max-h-30 overflow-auto">
          {filteredUsers.map((user) => (
            <AssignedMemberListItem
              key={user.id}
              user={user}
              onClick={() => handleToggle(user)}
            />
          ))}
          {filteredUsers.length === 0 && (
            <li className="px-3 py-2 text-center text-sm">No members found.</li>
          )}
        </ul>
      )}
      {/* Botón Done */}
      <div className="p-2 border-t border-gray-200 text-right">
        <Button
          type="button"
          variant="green2"
          size="md"
          onClick={onClose}
          className="w-full"
        >
          Done
        </Button>
      </div>
    </div>,
    document.body
  );
}
