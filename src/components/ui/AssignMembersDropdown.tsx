/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";
import SpinnerSmall from "./Spinner";
import { UserMember } from "@/types/users";
import { ASSIGN_USER_TO_REQUEST } from "@/graphql/mutations/requests/assignUserToRequest";
import { useMutation } from "@apollo/client";
import { REMOVE_USER_FROM_REQUEST } from "@/graphql/mutations/requests/removeUserFromRequest";
import { getInitials } from "@/utils/utils";
import AssignedMemberListItem from "./AssignedMemberListItem";

type User = {
  id: string;
  name: string;
  avatarUrl: string;
  teamRole: string;
};

type Props = {
  id: string;
  users: User[];
  assignedUsers: User[];
  onAssign: (users: User[]) => void;
  onClose: () => void;
  anchorRect: DOMRect | null;
  loading?: boolean;
};

export default function AssignMembersDropdown({
  id,
  users,
  assignedUsers,
  onAssign,
  onClose,
  anchorRect,
  loading = false,
}: Props) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<UserMember[]>(assignedUsers);
  const [assignUserToRequest, { loading: assigning }] = useMutation(
    ASSIGN_USER_TO_REQUEST
  );
  const [removeUserFromRequest, { loading: removing }] = useMutation(
    REMOVE_USER_FROM_REQUEST
  );

  const handleAssign = (requestId: string, userId: string) => {
    assignUserToRequest({
      variables: {
        requestId,
        userId,
      },
    });
  };
  const handleRemove = (requestId: string, userId: string) => {
    removeUserFromRequest({
      variables: {
        requestId,
        userId,
      },
    });
  };

  const filteredUsers = useMemo(() => {
    // Excluir usuarios ya asignados de la lista de selección para evitar duplicados
    return users
      .filter((u) => !selected.find((s) => s.id === u.id))
      .filter((u) => {
        const searchText = search.toLowerCase();
        return (
          u.name.toLowerCase().includes(searchText) ||
          u.teamRole.toLowerCase().includes(searchText)
        );
      });
  }, [search, users, selected]);

  // Quitar usuario asignado al hacer click en "x"
  const removeAssignedUser = (userId: string) => {
    // Llama la mutación para eliminar solo ese user del request actual
    //onRemoveUserFromRequest(userId);
    handleRemove(id, userId);
    const newSelected = selected.filter((u) => u.id !== userId);
    setSelected(newSelected);
    onAssign(newSelected);
  };

  const toggleUser = (user: User) => {
    if (selected.find((u) => u.id === user.id)) {
      const newSelected = selected.filter((u) => u.id !== user.id);
      //   setSelected(newSelected);
      onAssign(newSelected);

      removeAssignedUser(user.id);
    } else {
      // Llama la mutación para agregar solo ese user
      //    onAssignUserToRequest(user);
      handleAssign(id, user.id);
      const newSelected = [...selected, user];
      setSelected(newSelected);
      onAssign(newSelected);
    }
  };

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (!(e.target as Element).closest("#assign-members-dropdown")) {
        // No cerrar aquí para evitar cerrar al seleccionar, se cierra solo con botón Done
        // onClose();
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [onClose]);

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
  //@ts-ignore

  return createPortal(
    <div id="assign-members-dropdown font-medium" style={style} className="">
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

      {/* Assigned Members Section */}
      {selected.length > 0 && (
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
            {selected.map((user) => {
              return (
                <AssignedMemberListItem
                  key={user.id}
                  user={user}
                  onClick={() => removeAssignedUser(user.id)}
                />
              );
            })}
          </ul>
        </div>
      )}

      {/* Select Members Title */}
      <div className="flex items-center flex justify-start px-3 py-2 gap-2 items-center">
        <img src="/assets/icons/members.svg" alt="select" className="w-4 h-4" />
        <h3 className="text-gray-700 font-medium text-sm">Select Members</h3>
      </div>
      {loading ? (
        <SpinnerSmall />
      ) : (
        <ul className="max-h-30 overflow-auto">
          {filteredUsers.map((user) => {
            return (
              <AssignedMemberListItem
                key={user.id}
                user={user}
                onClick={() => toggleUser(user)}
              />
            );
          })}
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
