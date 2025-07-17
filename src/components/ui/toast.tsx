/* eslint-disable @typescript-eslint/ban-ts-comment */
import { toast } from "sonner";
import { Check, X } from "lucide-react";

export const showSuccessToast = (message: string) => {
  toast.custom((t) => (
    <div
      className="flex items-center justify-between gap-4 bg-[#F1F3EE] border 
      border-[#E2E6E4] rounded-xl px-4 py-3  text-base"
      role="alert"
    >
      <div className="flex items-center gap-3 ">
        <span className="bg-[#697D67] text-white rounded-full p-1.5">
          <Check className="w-4 h-4" />
        </span>
        <span className="text-[#181B1A] font-medium">{message}</span>
      </div>
      <button
      //@ts-ignore
        onClick={() => toast.dismiss(t.id)}
        className="text-[#181B1A] hover:text-black border-l border-gray-200"
      >  
        <X className="w-8 h-8" />
      </button>
    </div>
  ));
};

export const showErrorToast = (message: string) => {
  toast.custom((t) => (
    <div
      className="flex items-center justify-between gap-4 bg-[#FDECEA] border 
      border-[#F5C6C6] rounded-xl px-4 py-3 text-base"
      role="alert"
    >
      <div className="flex items-center gap-3 ">
        <span className="bg-[#D9534F] text-white rounded-full p-1.5">
          <X className="w-4 h-4" />
        </span>
        <span className="text-[#721C24] font-medium">{message}</span>
      </div>
      <button
        //@ts-ignore
        onClick={() => toast.dismiss(t.id)}
        className="text-[#721C24] hover:text-black border-l border-gray-200"
      >
        <X className="w-8 h-8" />
      </button>
    </div>
  ));
};
