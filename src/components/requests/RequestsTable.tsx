/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState } from "react";
import { SEARCH_MEMBERS_BESPIRE } from "@/graphql/queries/users/search_members";
import { useQuery } from "@apollo/client";
import { UserMember } from "@/types/users";
import { RequestList } from "@/types/requests";
import PriorityBadge from "../ui/PriorityBadge";
import AssignMembersDropdown from "../ui/AssignMembersDropdown";
import AssignMembersDropdownUniversal from "../ui/AssignMembersDropdownUniversal";
import { useAppContext } from "@/context/AppContext";
import { PERMISSIONS } from "@/constants/permissions";
import { hasPermission } from "@/utils/permissions";
import { usePermission } from "@/hooks/usePermission";

const categoryColors: Record<string, string> = {
  "Email Marketing": "bg-[#EBFDD8] text-black",
  "Short-forms": "bg-[#E6EAE2] text-black",
  "E-books": "bg-[#F0F3F4] text-black",
  "Print Design": "bg-[#C3EF9A] text-[#004049]",
  Illustration: "bg-[#C3EF9A] text-[#004049]",
  "Social Media": "bg-[#EBFDD8] text-black",
};

type Props = {
  requests: RequestList[];
  usersMembers: UserMember[];
  onUpdateAssignees: (requestId: string, assignees: UserMember[]) => void;
  onSetRequest?: (request: any) => void; // opcional si necesitas manejar el request seleccionado
};

export default function RequestsTable({
  requests,
  usersMembers,
  onUpdateAssignees,
  onSetRequest,
}: Props) {
  console.log("RequestsTable rendered with requests:", requests, usersMembers);

  const formatDate = (dateStr?: string) =>
    dateStr
      ? new Date(dateStr).toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "";

  const [openDropdownFor, setOpenDropdownFor] = useState<string | null>(null);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);
  const clickedRef = useRef<HTMLDivElement | null>(null);
const canAssignUsers = usePermission(PERMISSIONS.USER_ASSIGNMENTS);
  
  const handleOpenDropdown = (
    requestId: string,
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    e.stopPropagation();
    if (!canAssignUsers) return; // Si no tiene permiso, no abrir el dropdown
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    setAnchorRect(rect);
    setOpenDropdownFor(openDropdownFor === requestId ? null : requestId);
    clickedRef.current = e.currentTarget;
  };

  function getInitials(nameOrEmail: string) {
    if (!nameOrEmail) return "";
    const parts = nameOrEmail.split(/[ @.]/).filter(Boolean);
    if (parts.length === 1) return parts[0][0]?.toUpperCase() || "";
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return (
    <table className="w-full border-collapse relative z-0 ">
      <thead>
        <tr className="text-left border-b border-gray-200 text-gray-600 ">
          <th className="py-3 px-3 cursor-pointer font-medium">Title</th>
          <th className="py-3 px-3 cursor-pointer font-medium">Category</th>
          <th className="py-3 px-3 cursor-pointer font-medium">Deadline</th>
          <th className="py-3 px-3 cursor-pointer font-medium">Assigned</th>
          <th className="py-3 px-3 cursor-pointer font-medium">Activity</th>
          <th className="py-3 px-3 cursor-pointer font-medium">Credits</th>
          <th className="py-3 px-3 cursor-pointer font-medium">Priority</th>
        </tr>
      </thead>
      <tbody>
        {requests.map((r) => (
          <tr
            key={r.id}
            className="border-b border-gray-100 hover:bg-gray-50 transition"
          >
            <td
              className="py-3 px-4 max-w-[150px] cursor-pointer"
              onClick={() => {
                if (onSetRequest) {
                  onSetRequest(r);
                }
              }}
            >
              <div className="font-medium text-gray-900 truncate">
                {r.title}
              </div>
              <div className="text-xs text-[#7A8882]">
                {formatDate(r.createdAt)}
              </div>
            </td>

            <td className="py-3">
              <span
                className={`px-3 py-2 rounded-full text-xs font-medium ${
                  categoryColors[r.category] ?? "bg-gray-200 text-gray-600"
                }`}
              >
                {r.category}
              </span>
            </td>

            <td className="py-3">{formatDate(r.dueDate)}</td>

            <td className="relative py-3">
              <div
                className="flex -space-x-3 cursor-pointer"
                onClick={(e) => handleOpenDropdown(r.id, e)}
              >
                {r.assignees.length > 0 ? (
                  r.assignees.map((a) => {
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
                  })
                ) : (
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <img
                      src="/assets/icons/avatars.svg"
                      alt="No assigned"
                      title="No assigned"
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                  </div>
                )}
              </div>

              {openDropdownFor === r.id && anchorRect && (
                <AssignMembersDropdownUniversal
                  teamMembers={usersMembers} // Lista de todos los miembros posibles
                  linkedToId={r.id}
                  linkedToType="request" // o "sales", "brand", etc.
                  anchorRect={anchorRect}
                  onClose={() => setOpenDropdownFor(null)}
                />
              )}
            </td>

            <td className="py-3 ">
              <div className="flex items-center space-x-3 text-gray-500 text-sm">
                {r.commentsCount > 0 && (
                  <div
                    className="flex items-center space-x-1 border-2 border-gray-300
     rounded-md px-1  text-black"
                  >
                    <img
                      src="/assets/icons/comments_icon.svg" // reemplaza por tu URL real
                      alt="Comments"
                      className="w-4 h-4"
                      draggable={false}
                    />
                    <span>{r.commentsCount}</span>
                  </div>
                )}
                {r.attachmentsCount > 0 && (
                  <div
                    className="flex items-center space-x-1 border-2 border-gray-300
     rounded-md px-1 text-black"
                  >
                    <img
                      src="/assets/icons/attachments_icon.svg" // reemplaza por tu URL real
                      alt="Attachments"
                      className="w-4 h-4"
                      draggable={false}
                    />
                    <span>{r.attachmentsCount}</span>
                  </div>
                )}
                {r.subtasksCount > 0 && (
                  <div
                    className="flex items-center space-x-1 border-2 border-gray-300
     rounded-md px-1 text-black"
                  >
                    <img
                      src="/assets/icons/subtasks.svg" // reemplaza por tu URL real
                      alt="Subtasks"
                      className="w-4 h-4"
                      draggable={false}
                    />
                    <span>{r.subtasksCount}</span>
                  </div>
                )}
              </div>
            </td>

            <td className="py-3">
              <div className="text-[#62864D] font-medium flex items-center space-x-1">
                <span className="w-2 h-2 bg-[#62864D] rounded-full inline-block"></span>
                <span>
                  {r.credits} Credit{r.credits > 1 ? "s" : ""}
                </span>
              </div>
            </td>

            <td className="py-3 text-center">
              <PriorityBadge priority={r.priority} />
            </td>
          </tr>
        ))}

        {requests.length === 0 && (
          <tr>
            <td
              colSpan={7}
              className="text-center py-10 text-gray-400 italic select-none"
            >
              No requests found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
