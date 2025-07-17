import { Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X, CheckCircle, Loader2 } from "lucide-react";
import clsx from "clsx";
import { getFileIcon } from "@/utils/getFileIcon";

export function UploadingFilesModal({ files, open, onRemove, onClose }) {
  const total = files.length;
  const doneCount = files.filter((f) => f.done).length;
  const percent =
    total > 0
      ? Math.round(files.reduce((sum, f) => sum + (f.progress || 0), 0) / total)
      : 0;

  useEffect(() => {
    if (open && files.length > 0 && files.every((f) => f.done || f.error)) {
      const timeout = setTimeout(() => {
        onClose();
      }, 900);
      return () => clearTimeout(timeout);
    }
  }, [open, files, onClose]);

  if (!open || files.length === 0) return null;

  return (
    <Transition show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-[9999] inset-0 pointer-events-none"
        onClose={() => {}}
      >
        <div className="absolute bottom-6 right-8 pointer-events-none">
          <Transition.Child
            as={Fragment}
            enter="transition-transform duration-200"
            enterFrom="translate-y-8 opacity-0"
            enterTo="translate-y-0 opacity-100"
            leave="transition-transform duration-200"
            leaveFrom="translate-y-0 opacity-100"
            leaveTo="translate-y-8 opacity-0"
          >
            <div className="bg-white rounded-2xl shadow-2xl px-7 py-5 min-w-[350px] max-w-full border border-[#d8e5d7] pointer-events-auto">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-semibold text-lg">Uploading...</span>
              </div>
              <ul className="space-y-3 mb-3 max-h-[220px] overflow-auto">
                {files.map((f, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <img
                      src={getFileIcon(f.file.name)}
                      className="w-8 h-8"
                      alt=""
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-medium">
                          {f.file.name}
                        </span>
                        {!f.done && !f.error && (
                          <span className="flex items-center gap-1 text-[#758C5D] text-sm">
                            <Loader2 className="animate-spin w-4 h-4" />{" "}
                            {f.progress || 0}%
                          </span>
                        )}
                        {f.done && (
                          <span className="flex items-center gap-1 text-[#758C5D] text-sm">
                            <CheckCircle className="w-5 h-5" /> Done
                          </span>
                        )}
                        {f.error && (
                          <span className="flex items-center gap-1 text-red-600 text-sm">
                            Error
                          </span>
                        )}
                      </div>
                      <div className="h-2 rounded bg-[#DFE8DF] mt-2 overflow-hidden w-full">
                        <div
                          className={clsx(
                            "h-2 rounded transition-all",
                            f.done ? "bg-[#97b99e]" : "bg-[#758C5D]"
                          )}
                          style={{ width: `${f.progress}%` }}
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => onRemove(idx)}
                      className="text-gray-400 hover:text-red-600 ml-2"
                      title="Remove"
                      disabled={f.done}
                    >
                      <X size={22} />
                    </button>
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between mt-3">
                <span className="text-sm text-[#465348]">
                  Uploading{" "}
                  {doneCount < total ? `${doneCount} of ${total}` : total} items
                  ({percent}%)
                </span>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
