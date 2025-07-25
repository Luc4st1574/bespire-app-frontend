/* eslint-disable @next/next/no-img-element */
import { MockFile } from "@/data/mock-files";
import { getFileIcon } from "@/utils/getFileIcon";
import { useState, useEffect } from "react";
import ActionsMenu from "../ui/ActionsMenu";

interface FileGridProps {
    files: MockFile[];
}

export default function FileGrid({ files: initialFiles }: FileGridProps) {
    const [files, setFiles] = useState<MockFile[]>(initialFiles);
    const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
    const [hoveredFileId, setHoveredFileId] = useState<string | null>(null);
    
    useEffect(() => {
        setFiles(initialFiles);
    }, [initialFiles]);

    const handleSelectFile = (fileId: string) => {
        setSelectedFiles((prevSelected) =>
            prevSelected.includes(fileId)
                ? prevSelected.filter((id) => id !== fileId)
                : [...prevSelected, fileId]
        );
    };

    // --- Placeholder functions for actions ---
    const handleDownload = (file: MockFile) => alert(`Downloading: ${file.name}`);
    const handleOpen = (file: MockFile) => alert(`Opening: ${file.name}`);
    const handleRename = (file: MockFile) => alert(`Renaming: ${file.name}`);
    const handleDelete = (fileId: string) => {
        setFiles((prev) => prev.filter((file) => file.id !== fileId));
        alert(`Deleted file ID: ${fileId}`);
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {files.map((file) => {
                const isSelected = selectedFiles.includes(file.id);
                const isHovered = hoveredFileId === file.id;

                return (
                    <div
                        key={file.id}
                        onMouseEnter={() => setHoveredFileId(file.id)}
                        onMouseLeave={() => setHoveredFileId(null)}
                        className={`relative rounded-lg transition-all duration-200 p-4 ${
                            isSelected ? "bg-blue-50" : "bg-transparent"
                        }`}
                    >
                        {/* --- Selection Button --- */}
                        <div className="absolute top-2 left-2 z-10">
                            {(isHovered || isSelected) && (
                                <button
                                    onClick={() => handleSelectFile(file.id)}
                                    aria-label={`Select ${file.name}`}
                                    className="flex items-center justify-center w-4 h-4"
                                >
                                    {isSelected ? (
                                        <img
                                            src="/assets/icons/check_green.svg"
                                            alt="Selected"
                                            className="w-full h-full"
                                        />
                                    ) : (
                                        <div className="w-4 h-4 bg-white border border-gray-300 rounded-md"></div>
                                    )}
                                </button>
                            )}
                        </div>

                        {/* --- File Content --- */}
                        <div className="pt-4">
                            <div className="flex justify-center mb-4">
                                <img
                                    src={getFileIcon(file.icon)}
                                    alt={file.type}
                                    className="w-16 h-16"
                                />
                            </div>
                            <div className="text-center">
                                <p className="font-medium text-gray-900 truncate">
                                    {file.name}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    {file.lastModified}
                                </p>
                            </div>
                        </div>

                        {/* --- Actions Menu --- */}
                        <div className="absolute top-1 right-1 z-10">
							{(isHovered || isSelected) && (
									<ActionsMenu
										onDownload={() => handleDownload(file)}
										onOpen={() => handleOpen(file)}
										onRename={() => handleRename(file)}
										onDelete={() => handleDelete(file.id)}
									/>
							)}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}