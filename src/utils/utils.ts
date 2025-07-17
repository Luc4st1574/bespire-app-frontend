export const public_site_url = process.env.NEXT_PUBLIC_SITE_URL;

export function getInitials(nameOrEmail = ""): string {
    if (!nameOrEmail) return "";
    const parts = nameOrEmail.split(/[ @.]/).filter(Boolean);
    if (parts.length === 1) return parts[0][0]?.toUpperCase() || "";
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }

  export function truncateFileName(name: string, maxLength: number): string {
    if (name.length <= maxLength) return name;
    const extension = name.split('.').pop();
    const baseName = name.slice(0, maxLength - extension.length - 3);
    return `${baseName}...${extension}`;
  }

  export function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
// Importa los SVGs como componentes
import QueuedIcon from "@/assets/icons/status_dropdown/queued.svg";
import InProgressIcon from "@/assets/icons/status_dropdown/in_progress.svg";
import NeedsInfoIcon from "@/assets/icons/status_dropdown/needs_info.svg";
import ForApprovalIcon from "@/assets/icons/status_dropdown/for_approval.svg";
import CompletedIcon from "@/assets/icons/status_dropdown/completed.svg";
import RevisionIcon from "@/assets/icons/status_dropdown/revision.svg";
import ForReviewIcon from "@/assets/icons/status_dropdown/for_review.svg";
// Opciones con componentes SVG y estilos
export const STATUS_OPTIONS = [
  {
    value: "queued",
    label: "Queued",
    color: "text-[#181B1A]",
    colorInSelected: "text-[#181B1A]",
    bg: "bg-[#E2E6E4]",
    Icon: QueuedIcon,
  },
  {
    value: "in_progress",
    label: "In Progress",
    color: "text-[#181B1A]",
    colorInSelected: "text-[#181B1A]",
    bg: "bg-[#DEFCBD]",
    Icon: InProgressIcon,
  },
  {
    value: "needs_info",
    label: "Needs Info",
    color: "text-[#181B1A]",
    colorInSelected: "text-[#181B1A]",
    bg: "bg-[#FDC870]",
    Icon: NeedsInfoIcon,
  },
  {
    value: "for_approval",
    label: "For Approval",
    color: "text-[#181B1A]",
    colorInSelected: "text-[#181B1A]",
    bg: "bg-[#C8D8FF]",
    Icon: ForApprovalIcon,
  },
  {
    value: "completed",
    label: "Complete",
    color: "text-[#181B1A]",
    colorInSelected: "text-white",
    bg: "bg-[#697D67]",
    Icon: CompletedIcon,
  },
  {
    value: "revision",
    label: "Revision",
    color: "text-[#181B1A]",
    colorInSelected: "text-[#181B1A]",
    bg: "bg-[#FFBEBE]",
    Icon: RevisionIcon,
  },
  {
    value: "for_review",
    label: "For Review",
    color: "text-[#181B1A]",
    colorInSelected: "text-[#181B1A]",
    bg: "bg-[#A4C0FF]",
    Icon: ForReviewIcon,
  },
];