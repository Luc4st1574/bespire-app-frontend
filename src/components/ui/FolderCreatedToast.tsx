import React from 'react';
import { toast } from 'sonner';
import { X, Check } from 'lucide-react';

interface FolderCreatedToastProps {
    toastId: string | number;
    folderId: string;
    onUndo: (folderId: string) => void; 
}

const FolderCreatedToast: React.FC<FolderCreatedToastProps> = ({ toastId, folderId, onUndo }) => {

    const handleUndo = () => {
        onUndo(folderId);
        toast.dismiss(toastId);
    };
    
    return (
        <div
            className="flex w-full max-w-sm items-center justify-between gap-4 rounded-xl border border-[#E2E6E4] bg-[#F1F3EE] px-4 py-3 text-base"
        >
            <div className="flex items-center gap-3">
                {/* This div for the icon keeps its own darker background */}
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#697d67] p-1.5">
                    <Check className="h-4 w-4 text-white" />
                </div>
                <p className="font-medium text-[#181B1A]">Folder created</p>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={handleUndo}
                    className="transform rounded-full bg-[#697d67] px-3 py-1.5 text-sm font-light text-white transition-all hover:bg-opacity-90"
                    title="Undo"
                >
                    Undo
                </button>
                <div className="h-4 w-px bg-gray-300" />
                <button
                    onClick={() => toast.dismiss(toastId)}
                    className="transform rounded-full p-1 text-gray-500 transition-colors hover:bg-gray-200 hover:text-black"
                    title="Close notification"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
};

export default FolderCreatedToast;