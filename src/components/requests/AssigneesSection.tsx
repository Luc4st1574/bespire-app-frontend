/* eslint-disable @next/next/no-img-element */
import { useState, useRef } from "react";
import { useMembersBespire } from "@/hooks/useMembersBespire";
import AssignMembersDropdownUniversal from "../ui/AssignMembersDropdownUniversal";
import AssignedMemberListItem from "../ui/AssignedMemberListItem";
import { useAssignees } from "@/hooks/useAssignees";
import { usePermission } from "@/hooks/usePermission";
import { PERMISSIONS } from "@/constants/permissions";

export default function AssigneesSection({
  linkedToId,
  linkedToType = "request",
  teamMembers,
}) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);
  const iconRef = useRef<HTMLImageElement>(null);

  // Usa el hook generalizado para obtener los asignados actuales
  const { assignees, loading } = useAssignees({ linkedToId, linkedToType });

  // Busca los datos de usuario completos para cada asignado actual,
  // usando la lista de miembros del equipo (prop)
  const assignedUsers = teamMembers.filter(member =>
    assignees.some(a => a.user && (a.user._id === member.id || a.user.id === member.id))
  );
const canAssignUsers = usePermission(PERMISSIONS.USER_ASSIGNMENTS);
  const handleOpenDropdown = (e) => {
    e.stopPropagation();
    if (!canAssignUsers) return; // Si no tiene permiso, no abrir el dropdown
    const rect = (e.currentTarget as HTMLImageElement).getBoundingClientRect();
    setAnchorRect(rect);
    setOpenDropdown(true);
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <div className="text-base text-[#5E6B66] flex items-center gap-2">
        <span>Assignees</span>
        <img
          ref={iconRef}
          src="/assets/icons/arrow-l.svg"
          alt=""
          className="cursor-pointer"
          onClick={handleOpenDropdown}
        />
      </div>
      {assignedUsers.length === 0 && (
        <div
          className="w-8 h-8 rounded-full overflow-hidden cursor-pointer"
          onClick={handleOpenDropdown}
        >
          <img
            src="/assets/icons/avatars.svg"
            alt="No assigned"
            title="No assigned"
            className="w-full h-full object-cover"
            draggable={false}
          />
        </div>
      )}

      {openDropdown && anchorRect && (
        <AssignMembersDropdownUniversal
          teamMembers={teamMembers}
          linkedToId={linkedToId}
          linkedToType={linkedToType}
          anchorRect={anchorRect}
          onClose={() => setOpenDropdown(false)}
        />
      )}

      <ul>
        {assignedUsers.map((assignee) => (
          <AssignedMemberListItem key={assignee.id} user={assignee} />
        ))}
      </ul>
    </div>
  );
}
