"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { MockFile } from "@/data/mock-files";
import AllFilesSection from "./AllFilesSection";
import GetStartedFileManager from "./GetStartedFileManager";
import CreateFolderModal from "../modals/CreateFolderModal";

interface FileManagerMainProps {
  files: MockFile[];
  filterMessage: string | null;
  showFilterMessage: boolean;
}

export default function FileManagerMain({ files: initialFiles, filterMessage, showFilterMessage }: FileManagerMainProps) {
  const [files, setFiles] = useState<MockFile[]>(initialFiles);
  const [isCreateFolderModalOpen, setCreateFolderModalOpen] = useState(false);

  const handleActionClick = (actionLabel: string) => {
    if (actionLabel === "Create Folder") {
      setCreateFolderModalOpen(true);
    }
  };

  const handleCreateFolder = (details: { name: string; tags: string[]; access: MockFile['access'] }) => {
    const newFolder: MockFile = {
      id: `folder-${Date.now()}`,
      name: details.name,
      type: 'Folder',
      tags: details.tags,
      access: details.access,
      lastModified: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      modifiedBy: 'me',
      icon: 'folder',
    };
    setFiles((prevFiles) => [newFolder, ...prevFiles]);
    setCreateFolderModalOpen(false);

    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } flex items-center gap-3 rounded-md bg-light-black px-4 py-3 text-white shadow-lg`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/icons/completed.svg" width={20} height={20} alt="success" />
          <p className="text-sm font-semibold">Folder created</p>
        </div>
      ),
      { position: 'bottom-left', duration: 3000 },
    );
  };

  return (
    <>
      <div className="flex flex-col gap-8">
        <GetStartedFileManager onActionClick={handleActionClick} />
        <AllFilesSection
          files={files}
          filterMessage={filterMessage}
          showFilterMessage={showFilterMessage}
        />
      </div>
      <CreateFolderModal
        isOpen={isCreateFolderModalOpen}
        onClose={() => setCreateFolderModalOpen(false)}
        onCreateFolder={handleCreateFolder}
      />
    </>
  );
}