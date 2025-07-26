/* eslint-disable @typescript-eslint/ban-ts-comment */
import { toast } from "sonner";
import { Check, X } from "lucide-react";

/**
* A general success toast.
*/
export const showSuccessToast = (message: string) => {
  toast.custom((t) => (
    <div
      className="flex items-center justify-between gap-4 bg-[#F1F3EE] border border-[#E2E6E4] rounded-xl px-4 py-3 text-base shadow-lg"
      role="alert"
    >
      <div className="flex items-center gap-3">
        <span className="bg-[#697D67] text-white rounded-full p-1.5">
          <Check className="w-4 h-4" />
        </span>
        <span className="text-[#181B1A] font-medium">{message}</span>
      </div>
      <div className="flex items-center">
        <div className="h-6 w-px bg-gray-300 mx-2"></div>
        <button
          //@ts-ignore
          onClick={() => toast.dismiss(t.id)}
          className="p-1 text-gray-500 hover:text-gray-800"
          title="Dismiss"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  ));
};

/**
* A toast specifically for successful file uploads.
*/
export const showUploadSuccessToast = (fileCount: number) => {
  toast.custom((t) => (
    <div
      className="flex items-center justify-between gap-2 bg-[#F1F3EE] border border-[#E2E6E4] rounded-xl px-4 py-3 text-base shadow-lg"
      role="alert"
    >
      <div className="flex items-center gap-3">
        <span className="bg-[#697D67] text-white rounded-full p-1.5">
          <Check className="w-4 h-4" />
        </span>
        <span className="text-[#181B1A] font-medium">
          {fileCount} {fileCount > 1 ? 'Files' : 'File'} uploaded!
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div className="h-6 w-px bg-gray-300"></div>
        <button
          //@ts-ignore
          onClick={() => toast.dismiss(t.id)}
          className="text-gray-500 hover:text-gray-800 p-1"
          title="Dismiss"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  ));
};

/**
* A general error toast.
*/
export const showErrorToast = (message: string) => {
  toast.custom((t) => (
    <div
      className="flex items-center justify-between gap-4 bg-[#FDECEA] border border-[#F5C6C6] rounded-xl px-4 py-3 text-base shadow-lg"
      role="alert"
    >
      <div className="flex items-center gap-3 ">
        <span className="bg-[#D9534F] text-white rounded-full p-1.5">
          <X className="w-4 h-4" />
        </span>
        <span className="text-[#721C24] font-medium">{message}</span>
      </div>
      <div className="flex items-center">
        <div className="h-6 w-px bg-red-200 mx-2"></div>
        <button
          //@ts-ignore
          onClick={() => toast.dismiss(t.id)}
          className="p-1 text-[#721C24] hover:text-black"
          title="Dismiss"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  ));
};

export default toast;
