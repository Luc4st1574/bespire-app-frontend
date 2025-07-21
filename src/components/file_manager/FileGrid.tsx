/* eslint-disable @next/next/no-img-element */
import { MockFile } from "@/data/mock-files";
import { getFileIcon } from "@/utils/getFileIcon";

interface FileGridProps {
    files: MockFile[];
}

export default function FileGrid({ files }: FileGridProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {files.map((file) => (
            <div
            key={file.id}
            className="flex flex-col items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 hover:shadow-sm transition-all"
            >
            <img
                src={getFileIcon(file.icon)}
                alt={file.type}
                className="w-16 h-16 mb-3"
            />
            <span className="text-sm font-medium text-gray-800 text-center break-words w-full">
                {file.name}
            </span>
            </div>
        ))}
        </div>
    );
}