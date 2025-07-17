/* eslint-disable @typescript-eslint/ban-ts-comment */
// components/TeamMembersManager.tsx
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { INVITE_MEMBER } from "@/graphql/mutations/workspace/inviteMember";
import { REMOVE_MEMBER } from "@/graphql/mutations/workspace/removeMember";
import { GET_WORKSPACE_MEMBERS } from "@/graphql/queries/workspace/getWorkspaceMembers";
import { useAuth } from "@/hooks/useAuth";
import Spinner from "../Spinner";
import Button from "../ui/Button";
import { UPDATE_MEMBER_ROLE } from "@/graphql/mutations/workspace/updateRoleMember";
import TeamMemberRow from "../members/TeamMemberRow";
import { showSuccessToast, showErrorToast } from "../ui/toast";
import Swal from "sweetalert2";
import { useAppContext } from "@/context/AppContext";
const roles = ["admin", "user", "viewer"];

type Props = {
  workspaceId: string;
  maxMembers?: number;
  ownerId?: string
};

export default function TeamMembersManager({ workspaceId, maxMembers, ownerId }: Props) {
  const { user } = useAppContext();
  const { data, loading, refetch } = useQuery(GET_WORKSPACE_MEMBERS, {
    variables: { workspaceId },
    skip: !workspaceId,
  });
  const [inviteMember] = useMutation(INVITE_MEMBER);
  const [removeMember] = useMutation(REMOVE_MEMBER);
  const [updateMemberRole] = useMutation(UPDATE_MEMBER_ROLE);

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    if (data?.getWorkspaceMembers) setTeamMembers(data.getWorkspaceMembers);
  }, [data]);

  const handleAdd = async () => {
    const emailTrimmed = email.trim().toLowerCase();
    setEmailError(null);

    if (!emailTrimmed) {
      setEmailError("Please enter an email address.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    if (teamMembers.some((m) => m.email === emailTrimmed)) {
      setEmailError("This user is already added.");
      return;
    }
    if (maxMembers && teamMembers.length >= maxMembers) {
      setEmailError("You reached the maximum number of members.");
      return;
    }
    setIsChecking(true);
    try {
      await inviteMember({
        variables: { workspaceId, member: { email: emailTrimmed, role } },
      });
      await refetch();
      setEmail("");
      setRole("user");
    } catch (err) {
      setEmailError("An error occurred while inviting the member.");
    } finally {
      setIsChecking(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="bg-[#F6F7F7] p-6 rounded-lg w-full  mb-8">
      {/* Formulario de invitación */}
      <div className="flex flex-col md:flex-row md:items-start gap-4 mb-6">
        <div className="flex-1 text-sm">
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Invite with email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter Email Address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError(null);
            }}
            className={`bg-white w-full border outline-none rounded px-3 py-2 ${
              emailError ? "border-red-400" : "border-gray-300"
            }`}
            autoComplete="off"
          />
          {isChecking && (
            <p className="text-xs text-blue-500 mt-1">Checking...</p>
          )}
          {emailError && !isChecking && (
            <p className="text-xs text-red-500 mt-1">{emailError}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="role">
            Type
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full bg-white border outline-none border-gray-300 rounded px-3 py-2"
          >
            {roles.map((r) => (
              <option key={r} value={r}>
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            className="block invisible text-sm font-medium mb-1"
            htmlFor="invite"
          >
            Add
          </label>
          <Button
            type="button"
            variant="green2"
            size="md"
            disabled={isChecking || !email}
            onClick={handleAdd}
            label="Invite"
          />
        </div>
      </div>

      {/* Lista de miembros */}
      <ul className="flex flex-col gap-6">
        {teamMembers.map((member, idx) => {
          const isYou = user?.email && member.email === user.email;
          return (
            <TeamMemberRow
              key={member._id || idx}
              member={member}
              roles={roles}
              //@ts-ignore
              isYou={isYou}
               isOwner={ownerId === member._id}
              onRoleChange={async (newRole) => {
                if (member.role === newRole) return; // No cambió nada
                const result = await Swal.fire({
                  title: "Change member role?",
                  text: `Are you sure you want to set this member as "${newRole}"?`,
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#6DA77F",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, change it!",
                });
                if (!result.isConfirmed) return;
                try {
                  await updateMemberRole({
                    variables: {
                      input: {
                        workspaceId,
                        memberId: member._id,
                        role: newRole,
                      },
                    },
                  });
                  await refetch();
                  showSuccessToast("Member role updated!");
                } catch (e) {
                  showErrorToast( e instanceof Error ? e.message : "Error updating member role.");
                }
              }}
              onRemove={async () => {
                const result = await Swal.fire({
                  title: "Remove member?",
                  text: "This action cannot be undone.",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#d33",
                  cancelButtonColor: "#6DA77F",
                  confirmButtonText: "Yes, remove",
                });
                if (!result.isConfirmed) return;
                try {
                  await removeMember({
                    variables: { input: { workspaceId, memberId: member._id } },
                  });
                  await refetch();
                  showSuccessToast("Member removed.");
                } catch (e) {
                  showErrorToast(e instanceof Error ? e.message : "Error removing member.");
                }
              }}
            />
          );
        })}
      </ul>
    </div>
  );
}
