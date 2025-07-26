"use client";

import { useState } from "react";
import Image from "next/image";
import CreateFolderModal from "../modals/CreateFolderModal";
import { MockFile } from "@/data/mock-files";
import { UploadingFilesModal, UploadingFile } from "../modals/UploadingFilesModal";
import { UploadFilesModal } from "../modals/UploadFilesModal"; 
import { showUploadSuccessToast } from "@/components/ui/toast";

interface GetStartedFileManagerProps {
  onFolderCreated: (newFolder: MockFile) => void;
  onDeleteFolder: (folderId: string) => void;
}

export default function GetStartedFileManager({ onFolderCreated, onDeleteFolder }: GetStartedFileManagerProps) {
  const [isCreateFolderModalOpen, setCreateFolderModalOpen] = useState(false);
  const [isUploadFilesModalOpen, setUploadFilesModalOpen] = useState(false);
  const [isUploadingModalOpen, setIsUploadingModalOpen] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  
  const createFolderAction = () => setCreateFolderModalOpen(true);
  const uploadFilesAction = () => setUploadFilesModalOpen(true);
  const createDocAction = () => alert("Create a Doc button clicked!");

  const handleStartUpload = (filesToUpload: File[]) => {
    if (filesToUpload.length === 0) return;

    const newFiles: UploadingFile[] = filesToUpload.map(file => ({
      file, progress: 0, done: false, error: false,
    }));
    
    setUploadingFiles(newFiles);
    setIsUploadingModalOpen(true);

    // --- Slower, Sequential Mock Upload Logic ---
    const uploadFile = (index: number) => {
      if (index >= newFiles.length) {
        return;
      }

      const interval = setInterval(() => {
        setUploadingFiles(prevFiles => {
          return prevFiles.map((file, i) => {
            if (i === index && (file.progress || 0) < 100) {
              return { ...file, progress: (file.progress || 0) + 10 };
            } else if (i === index && !file.done) {
              clearInterval(interval);
              uploadFile(index + 1);
              return { ...file, done: true };
            }
            return file;
          });
        });
      }, 300);
    };

    uploadFile(0);
  };
  
  const handleRemoveFile = (index: number) => {
    setUploadingFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleProgressModalClose = () => {
    const doneFiles = uploadingFiles.filter(f => f.done);
    if (doneFiles.length > 0) {
      showUploadSuccessToast(doneFiles.length);
    }
    setIsUploadingModalOpen(false);
    setUploadingFiles([]);
  };

  return (
    <>
      <section>
        <h2 className="text-xl font-medium mb-4">Get Started</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <button type="button" onClick={createFolderAction} className="w-56 bg-white px-3 py-5 border border-gray-200 rounded-md flex flex-col items-start gap-2 text-left hover:bg-gray-50 transition-colors">
            <Image src="/assets/icons/folders.svg" alt="Create Folder" width={24} height={24} className="w-6 h-6" />
            <span className="font-medium text-gray-800 text-sm">Create Folder</span>
          </button>

          <button type="button" onClick={uploadFilesAction} className="w-56 bg-white px-3 py-5 border border-gray-200 rounded-md flex flex-col items-start gap-2 text-left hover:bg-gray-50 transition-colors">
            <Image src="/assets/icons/files.svg" alt="Upload Files" width={24} height={24} className="w-6 h-6" />
            <span className="font-medium text-gray-800 text-sm">Upload Files</span>
          </button>

          <button type="button" onClick={createDocAction} className="w-56 bg-white px-3 py-5 border border-gray-200 rounded-md flex flex-col items-start gap-2 text-left hover:bg-gray-50 transition-colors">
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
      
      <UploadFilesModal 
        open={isUploadFilesModalOpen}
        onClose={() => setUploadFilesModalOpen(false)}
        onUpload={handleStartUpload}
      />

      <UploadingFilesModal
        files={uploadingFiles}
        open={isUploadingModalOpen}
        onRemove={handleRemoveFile}
        onClose={handleProgressModalClose}
        onUploadMore={uploadFilesAction}
      />
    </>
  );
}
