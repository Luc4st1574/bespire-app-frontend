import React, { useState, useMemo, useEffect } from "react";
import RequestsTabs from "./RequestsTabs";
import RequestsTable from "./RequestsTable";
import { GET_REQUESTS } from "@/graphql/mutations/requests/getRequests";
import { useMutation, useQuery } from "@apollo/client";
import { RequestList } from "@/types/requests";
import { UserMember } from "@/types/users";
import { SEARCH_MEMBERS_BESPIRE } from "@/graphql/queries/users/search_members";
import { UPDATE_REQUEST_ASSIGNEES } from "@/graphql/mutations/requests/updateRequestAssignees";
import { useRequests } from "@/hooks/useRequests";
import RequestDetailsModal from "../modals/RequestDetails/RequestDetailsModal";
import { useMembersBespire } from "@/hooks/useMembersBespire";

const tabs = [
  { id: "all", statusFilter: null },
  { id: "in_progress", statusFilter: "in_progress" },
  { id: "pending", statusFilter: "queued" },
  { id: "completed", statusFilter: "completed" },
];

export default function RequestsPage() {
  const { requests, loading, error, refetch, assignUsers, loadingUpdate } =
    useRequests();

  const [activeTab, setActiveTab] = useState("all");

  const [requestId, setRequestId] = useState<string | null>(null);
  const [parentRequest, setParentRequest] = useState<any>(null); // Puede ser solo {id, title}, o todo el objeto

  const [open, setOpen] = useState(false);

  const { members, search, setSearch, fetchMembers } = useMembersBespire();

  // Para abrir modal principal
  const handleOpenRequest = (request) => {
    console.log("Opening request:", request);
    if (request.parentRequest) {
      console.log("This is a subtask, fetching parent request");
      //buscar el request parent en la lista de request
      const parentRequestId = request.parentRequest;
      const parent = requests.find((r) => r.id === parentRequestId);
      console.log("Parent request found:", parent);
      if (!parent) {
        console.error("Parent request not found in requests list");
        return;
      }
      setParentRequest(parent);
      setRequestId(request.id);
      setOpen(true);
      return;
    }
    setRequestId(request.id);
    setParentRequest(null);
    setOpen(true);
  };

  console.log("RequestsPage rendered with requests:", requests, members);

  // Contar requests por tab
  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    tabs.forEach(({ id, statusFilter }) => {
      c[id] =
        statusFilter === null
          ? requests.length
          : requests.filter((r) => r.status === statusFilter).length;
    });
    return c;
  }, [requests]);

  // Filtrar requests segun tab activa
  const filteredRequests = useMemo(() => {
    if (activeTab === "all") return requests;
    const statusFilter = tabs.find((t) => t.id === activeTab)?.statusFilter;
    if (!statusFilter) return requests;
    return requests.filter((r) => r.status === statusFilter);
  }, [activeTab, requests]);

  // Actualizar assignees
  function handleUpdateAssignees(requestId: string, newUsers: UserMember[]) {
    assignUsers(
      requestId,
      newUsers.map((u) => u.id)
    );
  }

  if (loading) return <p>Loading requests...</p>;
  if (error) return <p>Error loading requests</p>;
  return (
    <div className=" bg-white rounded-lg  border border-[#bcbcbc47] max-w-full overflow-x-auto">
      <RequestsTabs
        activeTab={activeTab}
        onChange={setActiveTab}
        counts={counts}
      />
      <RequestsTable
        usersMembers={members}
        requests={filteredRequests}
        onUpdateAssignees={handleUpdateAssignees}
        onSetRequest={(request) => {
          handleOpenRequest(request);
        }}
      />
      <RequestDetailsModal
        open={open}
        onClose={() => setOpen(false)}
        requestId={requestId}
        parentRequest={parentRequest}
        onOpenSubtask={(subtaskId, requestParent) => {
          console.log("Opening subtask:", subtaskId);
          setRequestId(subtaskId);
          setParentRequest(requestParent);
       
          setOpen(true);
        }}
        onBackToMain={() => {
          console.log("Back to main request clicked", parentRequest);
          if (parentRequest) {
            setRequestId(parentRequest.id || parentRequest._id);
            setParentRequest(null);
          }
        }}
      />
    </div>
  );
}
