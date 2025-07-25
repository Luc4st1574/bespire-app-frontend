/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @next/next/no-img-element */
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";
import { X } from "lucide-react";
import clsx from "clsx";
import { useMutation } from "@apollo/client";

import { CREATE_FEEDBACK } from "@/graphql/mutations/feedback/feedback";
import { showSuccessToast } from "../ui/toast";
import { toast } from "sonner";

const categories = [
  {
    icon: "/assets/icons/paper_feedback.svg",
    label: "Feedback",
  },
  {
    icon: "/assets/icons/bug.svg",
    label: "Bug",
  },
  {
    icon: "/assets/icons/service.svg",
    label: "Service",
  },
];

export default function FeedbackModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [customCategory, setCustomCategory] = useState("");
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [sendCopy, setSendCopy] = useState(true);
  const [createFeedback, { loading }] = useMutation(CREATE_FEEDBACK);

  const canSubmit = title.trim().length > 0 && details.trim().length > 0;

  const handleSubmit = async () => {
    if (!canSubmit) return;

    try {
      await createFeedback({
        variables: {
          input: {
            category: selectedCategory || customCategory || "Other",
            title,
            details,
            sendCopy,
          },
        },
      });

      showSuccessToast("Feedback Sent!");
      onClose();

      // Reset form
      setSelectedCategory(null);
      setCustomCategory("");
      setTitle("");
      setDetails("");
      setSendCopy(true);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Failed to submit feedback");
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50 p-4">
      <DialogBackdrop className="fixed inset-0 bg-black/20 backdrop-blur-sm" />

      <div className="fixed inset-0 flex justify-end">
        <DialogPanel className="w-full max-w-md m-2 bg-white p-8 overflow-y-auto rounded-xl">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <DialogTitle className="text-xl font-semibold">
                Submit Your Feedback!
              </DialogTitle>
            </div>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-black"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Frequent Categories */}
          <div>
            <p className="font-medium text-sm text-gray-700 mb-2">
              Frequent Categories
            </p>
            <div className="flex gap-2 mb-6">
              {categories.map((cat) => (
                <button
                  key={cat.label}
                  onClick={() => {
                    //@ts-ignore
                    setSelectedCategory(cat);
                    setCustomCategory("");
                  }}
                  className={clsx(
                    "w-full py-2 px-3 border rounded-md text-sm flex flex-col items-start gap-2 transition",
                    //@ts-ignore
                    selectedCategory === cat
                      ? "bg-[#F1F3EE] border-[#758C5D] text-[#181B1A]"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  )}
                >
                  <img src={cat.icon} alt={cat.label} className="w-4 h-4" />
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Others */}
          <div className="mb-6">
            <label htmlFor="custom-category-select" className="font-medium text-sm text-gray-700 mb-1">Others</label>
            <select
              id="custom-category-select"
              title="Select a category"
              value={customCategory}
              onChange={(e) => {
                setCustomCategory(e.target.value);
                setSelectedCategory(null);
              }}
              className="w-full border border-gray-300 p-2 rounded-md text-sm"
            >
              <option value="">Select from list of categories</option>
              <option value="UI">UI</option>
              <option value="Performance">Performance</option>
              <option value="Billing">Billing</option>
            </select>
          </div>

          {/* Title */}
          <div className="mb-4">
            <p className="font-medium text-sm text-gray-700 mb-1">Title</p>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Title"
              className="w-full border border-gray-300 p-2 rounded-md text-sm"
            />
          </div>

          {/* Details */}
          <div className="mb-4">
            <p className="font-medium text-sm text-gray-700 mb-1">Details</p>
            <textarea
              rows={4}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Enter Details"
              className="w-full border border-gray-300 p-2 rounded-md text-sm"
            />
          </div>

          {/* Checkbox */}
          <label className="flex items-center text-sm mb-6">
            <input
              type="checkbox"
              checked={sendCopy}
              onChange={() => setSendCopy(!sendCopy)}
              className="mr-2"
            />
            Send copy and confirmation on email
          </label>

          {/* Buttons */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-full border border-gray-400 text-sm text-[#181B1A] hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              disabled={!canSubmit || loading}
              onClick={handleSubmit}
              className={clsx(
                "px-6 py-2 rounded-full text-sm",
                !canSubmit || loading
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-[#5E6B66] text-white hover:bg-[#4b5a52]"
              )}
            >
              {loading ? "Sending..." : "Submit"}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
