/* eslint-disable @next/next/no-img-element */
import { MockFile } from "@/data/mock-files";
import { getFileIcon } from "@/utils/getFileIcon";
import { MoreHorizontal } from "lucide-react";
import Button from "../ui/Button";

interface FileListTableProps {
    files: MockFile[];
}

    const tableHeaders = ["Name", "Type", "Tags", "Access", "Last Modified"];

    export default function FileListTable({ files }: FileListTableProps) {
    return (
        <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg">
        <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
            <tr>
                {tableHeaders.map((header) => (
                <th
                    key={header}
                    className="px-6 py-3 text-left font-medium text-gray-600"
                >
                    <div className="flex items-center gap-1">
                    {header}
                    <img src="/assets/icons/icon_filter.svg" alt="Sort" className="w-3 h-3" />
                    </div>
                </th>
                ))}
                <th className="px-6 py-3">
                <span className="sr-only">Actions</span>
                </th>
            </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
            {files.map((file) => (
                <tr key={file.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                    <img
                        src={getFileIcon(file.icon)}
                        alt={file.type}
                        className="w-6 h-6"
                    />
                    <span className="font-medium text-gray-900">{file.name}</span>
                    </div>
                </td>
                <td className="px-6 py-4 text-gray-600">{file.type}</td>
                <td className="px-6 py-4">
                    {file.tags.length > 0 ? (
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-full">
                        {file.tags[0]}
                    </span>
                    ) : (
                    <Button variant="outlineG" size="xs">
                        + Add
                    </Button>
                    )}
                </td>
                <td className="px-6 py-4 text-gray-600">{file.access}</td>
                <td className="px-6 py-4 text-gray-600">
                    {file.lastModified} ({file.modifiedBy})
                </td>
                <td className="px-6 py-4 text-right">
                    {/* Fix: Added a visually-hidden span for screen reader accessibility */}
                    <button className="text-gray-500 hover:text-gray-800">
                    <span className="sr-only">Actions</span>
                    <MoreHorizontal className="w-5 h-5" />
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
}