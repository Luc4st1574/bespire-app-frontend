import React from 'react';
import toast from 'react-hot-toast';
import { X } from 'lucide-react';
import Image from 'next/image';

interface FolderCreatedToastProps {
    t: {
        id: string;
        visible: boolean;
    };
}

const FolderCreatedToast: React.FC<FolderCreatedToastProps> = ({ t }) => {
    return (
        <div
        className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
        } flex w-full max-w-sm items-center justify-between gap-4 rounded-md bg-white px-4 py-3 shadow-lg`}
        >
        <div className="flex items-center gap-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#697d67]">
            <Image
                src="/assets/icons/check_green.svg"
                width={14}
                height={14}
                alt="success"
            />
            </div>
            <p className="text-sm font-light text-black">Folder created</p>
        </div>

        <div className="flex items-center gap-2">
            <button
            onClick={() => console.log('Undo clicked!')}
            className="transform rounded-full bg-[#697d67] px-3 py-1.5 text-sm font-light text-white transition-all hover:bg-opacity-90"
            title="Undo"
            >
            Undo
            </button>
            <div className="h-4 w-px bg-gray-200" />
            <button
            onClick={() => toast.dismiss(t.id)}
            className="transform rounded-full p-1 text-gray-500 transition-colors hover:bg-gray-100 hover:text-black"
            title="Close notification"
            >
            <X className="h-4 w-4" />
            </button>
        </div>
        </div>
    );
};

export default FolderCreatedToast;