import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition, TransitionChild } from "@headlessui/react";
import { X, Check, ChevronUp, Plus } from "lucide-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { getFileIcon } from "@/utils/getFileIcon";
import Image from 'next/image';

export interface UploadingFile {
  file: File;
  progress?: number;
  done?: boolean;
  error?: boolean;
}

interface UploadingFilesModalProps {
  files: UploadingFile[];
  open: boolean;
  onRemove: (index: number) => void;
  onClose: () => void;
  onUploadMore: () => void;
}

// A small component for the animated dots
const AnimatedDots = () => (
  <span className="uploading-dots">
    <span>.</span><span>.</span><span>.</span>
  </span>
);

export function UploadingFilesModal({ files, open, onRemove, onClose, onUploadMore }: UploadingFilesModalProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const total = files.length;
  const doneCount = files.filter((f) => f.done).length;
  const overallProgress =
    total > 0
      ? Math.round(files.reduce((sum, f) => sum + (f.progress || 0), 0) / total)
      : 0;

  useEffect(() => {
    // Automatically close the modal a moment after all uploads are complete
    if (open && files.length > 0 && files.every((f) => f.done || f.error)) {
      const timeout = setTimeout(() => {
        onClose();
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [open, files, onClose]);

  if (!open || files.length === 0) return null;

  return (
    <>
      {/* Style tag for the dot animation */}
      <style>
        {`
          @keyframes blink {
            0% { opacity: .2; }
            20% { opacity: 1; }
            100% { opacity: .2; }
          }

          .uploading-dots span {
            animation-name: blink;
            animation-duration: 1.4s;
            animation-iteration-count: infinite;
            animation-fill-mode: both;
          }

          .uploading-dots span:nth-child(2) {
            animation-delay: .2s;
          }

          .uploading-dots span:nth-child(3) {
            animation-delay: .4s;
          }
        `}
      </style>
      <Transition show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-[9999] inset-0 pointer-events-none"
          onClose={() => {}}
        >
          <div className="absolute bottom-6 right-8 pointer-events-auto">
            <TransitionChild
              as={Fragment}
              enter="transition-transform duration-200"
              enterFrom="translate-y-8 opacity-0"
              enterTo="translate-y-0 opacity-100"
              leave="transition-transform duration-200"
              leaveFrom="translate-y-0 opacity-100"
              leaveTo="translate-y-8 opacity-0"
            >
              <div className="bg-white rounded-xl shadow-2xl w-[380px] max-w-full border border-gray-200 overflow-hidden">
                {isExpanded ? (
                  // --- EXPANDED VIEW ---
                  <>
                    <div className="flex items-center justify-between p-4 border-b border-gray-200">
                      <h3 className="font-semibold text-lg text-gray-800">
                        Uploading<span className="ml-1"><AnimatedDots /></span>
                      </h3>
                      <button
                        type="button"
                        title="Collapse"
                        onClick={() => setIsExpanded(false)}
                        className="p-1 text-gray-500 hover:text-gray-800"
                      >
                        <ChevronUp size={20} className="transition-transform duration-300 rotate-180" />
                      </button>
                    </div>

                    <div className="p-4">
                      <ul className="space-y-4 mb-4 max-h-[260px] overflow-auto pr-2">
                        {files.map((f, idx) => (
                          <li key={idx} className="flex items-center gap-3">
                            <Image src={getFileIcon(f.file.name)} width={40} height={40} className="w-10 h-10 flex-shrink-0" alt="file icon" />
                            <div className="flex-1 overflow-hidden">
                              <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-800 truncate block pr-2">{f.file.name}</span>
                                {/* UPDATED: Percentage is now always visible */}
                                <span className="text-xs text-gray-500">{f.progress || 0}%</span>
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <div className="flex items-center justify-center w-5 h-5 flex-shrink-0">
                                  {f.done ? (
                                    <div className="w-5 h-5 rounded-full flex items-center justify-center bg-[#697d67]">
                                      <Check className="w-3.5 h-3.5 text-white" />
                                    </div>
                                  ) : (
                                    <FontAwesomeIcon icon={faSpinner} className="fa-spin w-4 h-4 text-gray-400" />
                                  )}
                                </div>
                                <div className="h-2 flex-1 rounded bg-gray-200 overflow-hidden">
                                  <div
                                    className="h-2 rounded bg-[#869d84] transition-all"
                                    style={{ width: `${f.progress || 0}%` }}
                                  />
                                </div>
                                <button type="button" onClick={() => onRemove(idx)} className="text-gray-400 hover:text-red-600 flex-shrink-0 ml-1" title="Remove" disabled={f.done}>
                                  <X size={16} />
                                </button>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between p-3 border-t border-gray-200 bg-gray-50">
                      <div className="flex items-center gap-2 bg-gray-200 rounded-full py-1 px-2.5">
                        <FontAwesomeIcon icon={faSpinner} className="fa-spin w-3.5 h-3.5 text-[#697d67]" />
                        <span className="text-xs font-medium text-gray-700">
                          Uploading {doneCount} of {total} items ({overallProgress}%)
                        </span>
                      </div>
                      <button type="button" onClick={onUploadMore} className="flex items-center justify-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-semibold text-white bg-[#697d67] hover:bg-opacity-90 transition-colors">
                        <Plus size={14} />
                        <span>Upload More</span>
                      </button>
                    </div>
                  </>
                ) : (
                  // --- COLLAPSED VIEW ---
                  <div className="relative">
                    <div className="flex items-center gap-3 p-4">
                      <FontAwesomeIcon icon={faSpinner} className="fa-spin w-6 h-6 flex-shrink-0 text-[#697d67]" />
                      <div className="flex-1">
                        <span className="text-base font-light text-black">
                          {doneCount === total ? "Upload Complete" : `Uploading ${doneCount} of ${total} items (${overallProgress}%)`}
                        </span>
                      </div>
                      <div className="h-6 w-px bg-gray-300 mx-2"></div>
                      <button
                        type="button"
                        title="Expand"
                        onClick={() => setIsExpanded(true)}
                        className="p-1 text-gray-500 hover:text-gray-800"
                      >
                        <ChevronUp size={20} className="transition-transform duration-300" />
                      </button>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-2 bg-gray-200">
                      <div className="h-2 bg-[#697d67] transition-all" style={{ width: `${overallProgress}%` }} />
                    </div>
                  </div>
                )}
              </div>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}