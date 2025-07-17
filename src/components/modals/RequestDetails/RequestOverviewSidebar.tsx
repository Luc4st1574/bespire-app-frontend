/* eslint-disable @next/next/no-img-element */
import { useRef, useState } from "react";
import AssignedMemberListItem from "../../ui/AssignedMemberListItem";
import PriorityBadge from "../../ui/PriorityBadge";
import CustomDatePicker from "../../ui/CustomDatePicker";
import TimeSpentInput from "../../ui/TimeSpentInput";
import AssignMembersDropdown from "../../ui/AssignMembersDropdown";
import { useMembersBespire } from "@/hooks/useMembersBespire";
import AssigneesSection from "../../requests/AssigneesSection";
import { getInitials } from "@/utils/utils";



export default function RequestOverviewSidebar({ request, onBackToMain }) {
  // Ejemplo de data mock para el request type (puedes cambiar según tu modelo real)
  const requestType = {
    main: request.typeMain || "Branding",
    sub: request.typeSub || "Logo",
  };
  const { members } = useMembersBespire();

   const isSubtask = !!request.parentRequest;
  
  return (
    <aside className="w-70 min-w-[260px] p-6 border-r border-[#E2E6E4] flex flex-col gap-2 overflow-y-auto">
        {/* ---- Botón Back to Main Task si es subtask ---- */}
      {isSubtask && (
        <button
          className="flex items-center gap-2 font-medium cursor-pointer "
          onClick={onBackToMain}
        >
         <img src="/assets/icons/menorq.svg" alt="" />
          <span>Back to Main Task</span>
        </button>
      )}
      <h1 className="font-medium text-xl">Overview</h1>
      {/* Priority */}
      <div className="flex flex-col items-start gap-2">
        <div className="text-base text-[#5E6B66]">Priority</div>
        <PriorityBadge priority={request.priority} />
      </div>
      {/* Client */}
      <div className="flex flex-col items-start gap-2">
        <div className="text-base text-[#5E6B66]">Client</div>
        <div className="flex items-center gap-2">
          {request.client.avatar ? (
            <img
              src={request.client.avatar}
              alt={request.client.name}
              className="w-7 h-7 rounded-full"
            />
          ) : (
            <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
              {getInitials(request.client.name)}
            </div>
          )}
          <span className="font-medium">{request.client.name}</span>
        </div>
      </div>
      {/* Requester */}
      <div className="flex flex-col items-start gap-2">
        <div className="text-base text-[#5E6B66]">Requester</div>

        <ul>
          <AssignedMemberListItem
            key={request.requester.id}
            user={request.requester}
          />
        </ul>
      </div>
      {/* Assignees */}
        <AssigneesSection
  linkedToId={request.id}
  teamMembers={members}
/>
      {/* Created & Due Date */}
      <div className="flex flex-col ">
        <div className="text-base text-[#5E6B66]">Created</div>
        <div className="flex items-center ">
          <CustomDatePicker
            value={request.createdAt}
            onChange={() => {}}
            disabled={true} // O true si solo visualizar
          />
        </div>
        <div className="text-base text-[#5E6B66] ">Due Date</div>
        <CustomDatePicker
          value={request.dueDate}
          onChange={() => {}}
          disabled={true} // O true si solo visualizar
        />
      </div>
      {/* Time Spent */}
      <div className="flex flex-col ">
        <div className="text-base text-[#5E6B66]">Time Spent</div>
        <TimeSpentInput
          hours={request.timeSpentHr || 0}
          minutes={request.timeSpentMin || 0}
          readOnly // solo lectura
        />
      </div>
      {/* Type */}
      <div className="flex flex-col gap-1 mt-2">
        <div className="text-base text-[#5E6B66]">Request Type</div>
        <div className="font-medium text-[#181B1A]">{requestType.main}</div>
        <div className="flex items-center gap-2">
          <span className="ml-2 text-2xl">↳</span>
          <span className="text-[#181B1A]">{requestType.sub}</span>
        </div>
      </div>
      {/* Credits */}
      <div className="flex flex-col gap-2 mt-2">
        <div className="text-base text-[#5E6B66]">Credits</div>
        <span className="font-medium text-[#181B1A]">{request.credits}</span>
      </div>
    </aside>
  );
}
