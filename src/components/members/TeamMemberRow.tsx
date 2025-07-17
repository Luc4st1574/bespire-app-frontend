// components/team/TeamMemberRow.tsx
import Button from "../ui/Button";

type TeamMemberRowProps = {
  member: any;
  roles: string[];
  isYou: boolean;
   isOwner: boolean;
  onRoleChange: (role: string) => void;
  onRemove: () => void;
};

export default function TeamMemberRow({ member, roles, isYou,isOwner, onRoleChange, onRemove }: TeamMemberRowProps) {
  function getInitials(nameOrEmail: string) {
    if (!nameOrEmail) return "";
    const parts = nameOrEmail.split(/[ @.]/).filter(Boolean);
    if (parts.length === 1) return parts[0][0]?.toUpperCase() || "";
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  const initials = getInitials(member.firstName || member.email);

  const disableRoleChange = isOwner || isYou;
  const disableRemove = isOwner || isYou;

  return (
    <li className="grid grid-cols-4 items-center gap-4">
      <div className="w-full flex items-center gap-3 min-w-0">
        {member.avatarUrl ? (
          <img src={member.avatarUrl} alt={member.email} className="w-8 h-8 rounded-full object-cover" />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center font-semibold text-base">
            {initials}
          </div>
        )}
        <div className="min-w-0">
          <span className="block font-medium truncate">
            {member.firstName ? `${member.firstName} ${member.lastName || ""}` : member.email}
            {isYou && (
              <span className="ml-2 text-xs text-[#749668] font-semibold">(You)</span>
            )}
          </span>
          <span className="block text-gray-500 text-xs truncate">{member.email}</span>
        </div>
      </div>
      {member.joinedAt && (
        <span className="w-full ml-4 text-xs text-[#353B38] text-center">
          {new Date(member.joinedAt).toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </span>
      )}
      <div className="w-full flex items-end justify-center gap-2">
        <select
          value={member.role}
          disabled={disableRoleChange}
          onChange={e => onRoleChange(e.target.value)}
          className="outline-none border border-[#5B6F59] rounded-full px-4 py-1 text-sm font-medium text-[#5B6F59] bg-white"
          style={{ minWidth: 80 }}
        >
          {roles.map(r => (
            <option key={r} value={r}>
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <div>
        {disableRemove ? (
          <button
            type="button"
            className="text-gray-400 text-xs cursor-not-allowed ml-2"
            disabled
            title={
              isOwner
                ? "You can't remove the workspace owner"
                : "You can't remove yourself"
            }
          >
            {isOwner ? "Owner cannot be removed" : "Cannot be removed"}
          </button>
        ) : (
          <Button type="button" variant="green2" size="md" onClick={onRemove} label="Remove Member" />
        )}
      </div>
    </li>
  );
}
