"use client";

import { useState } from "react";
import Image from "next/image";
import CreateFolderModal from "../modals/CreateFolderModal";
import { MockFile } from "@/data/mock-files";

interface GetStartedFileManagerProps {
  onFolderCreated: (newFolder: MockFile) => void;
  onDeleteFolder: (folderId: string) => void;
}

export default function GetStartedFileManager({ onFolderCreated, onDeleteFolder }: GetStartedFileManagerProps) {
  const [isCreateFolderModalOpen, setCreateFolderModalOpen] = useState(false);

  const createFolderAction = () => setCreateFolderModalOpen(true);
  const uploadFilesAction = () => alert("Upload Files button clicked!");
  const createDocAction = () => alert("Create a Doc button clicked!");

  return (
    <>
      <section>
        <h2 className="text-xl font-medium mb-4">Get Started</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <button
            type="button"
            onClick={createFolderAction}
            className="w-56 bg-white px-3 py-5 border border-gray-200 rounded-md flex flex-col items-start gap-2 text-left hover:bg-gray-50 transition-colors"
          >
            <Image src="/assets/icons/folders.svg" alt="Create Folder" width={24} height={24} className="w-6 h-6" />
            <span className="font-medium text-gray-800 text-sm">Create Folder</span>
          </button>

          <button
            type="button"
            onClick={uploadFilesAction}
            className="w-56 bg-white px-3 py-5 border border-gray-200 rounded-md flex flex-col items-start gap-2 text-left hover:bg-gray-50 transition-colors"
          >
            <Image src="/assets/icons/files.svg" alt="Upload Files" width={24} height={24} className="w-6 h-6" />
            <span className="font-medium text-gray-800 text-sm">Upload Files</span>
          </button>

          <button
            type="button"
            onClick={createDocAction}
            className="w-56 bg-white px-3 py-5 border border-gray-200 rounded-md flex flex-col items-start gap-2 text-left hover:bg-gray-50 transition-colors"
          >
            <Image src="/assets/icons/docs.svg" alt="Create a Doc" width={24} height={24} className="w-6 h-6" />
            <span className="font-medium text-gray-800 text-sm">Create a Doc</span>
          </button>
        </div>
      </section>

      <CreateFolderModal
        isOpen={isCreateFolderModalOpen}
        onClose={() => setCreateFolderModalOpen(false)}
        onCreateFolder={onFolderCreated}
        onDeleteFolder={onDeleteFolder}
      />
    </>
  );
}
