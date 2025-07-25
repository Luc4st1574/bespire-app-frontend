/* eslint-disable @next/next/no-img-element */
import { MockFile } from "@/data/mock-files";
import { getFileIcon } from "@/utils/getFileIcon";
import { useState, useEffect } from "react";
import TagsData from '@/data/tags.json';
import TagSelectPopover from "../ui/TagSelectPopover";
import ActionsMenu from "../ui/ActionsMenu"; // Import the new actions menu

interface FileListTableProps {
	files: MockFile[];
}

const availableTags = TagsData.map((tag) => ({ value: tag, label: tag }));
const tableHeaders = ["Name", "Type", "Tags", "Access", "Last Modified"];

export default function FileListTable({ files: initialFiles }: FileListTableProps) {
	const [files, setFiles] = useState<MockFile[]>(initialFiles);
	const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
	const [hoveredRow, setHoveredRow] = useState<string | null>(null);

	useEffect(() => {
		setFiles(initialFiles);
	}, [initialFiles]);

	const isAllSelected = selectedFiles.length === files.length && files.length > 0;
	const isIndeterminate = selectedFiles.length > 0 && !isAllSelected;

	const handleSelectFile = (fileId: string) => {
		setSelectedFiles((prev) =>
		prev.includes(fileId) ? prev.filter((id) => id !== fileId) : [...prev, fileId]
		);
	};

	const handleSelectAll = () => {
		setSelectedFiles(selectedFiles.length > 0 ? [] : files.map((file) => file.id));
	};

	const handleAddTagToFile = (fileId: string, tag: string) => {
		setFiles((prev) =>
		prev.map((file) => (file.id === fileId ? { ...file, tags: [tag] } : file))
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
		<div className="overflow-x-auto">
		<table className="min-w-full text-sm">
			<thead>
			<tr>
				<th className="px-4 py-3">
				<div className="flex h-6 w-4 items-center justify-center">
					<button type="button" onClick={handleSelectAll} aria-label="Select all files" className="flex h-4 w-4 items-center justify-center">
					{isAllSelected ? <img src="/assets/icons/check_green.svg" alt="All selected" /> : isIndeterminate ? <img src="/assets/icons/minus_green.svg" alt="Some selected" /> : <div className="h-4 w-4 rounded-md border border-gray-300 bg-white"></div>}
					</button>
				</div>
				</th>
				{tableHeaders.map((header) => (
				<th key={header} className="px-6 py-3 text-left font-medium text-gray-600">
					<div className="flex items-center gap-1">
					{header}
					<img src="/assets/icons/icon_filter.svg" alt="Sort" className="h-3 w-3" />
					</div>
				</th>
				))}
				<th className="px-6 py-3"><span className="sr-only">Actions</span></th>
			</tr>
			</thead>
			<tbody className="divide-y divide-gray-200">
			{files.map((file) => {
				const isSelected = selectedFiles.includes(file.id);
				const isHovered = hoveredRow === file.id;

				return (
				<tr key={file.id} onMouseEnter={() => setHoveredRow(file.id)} onMouseLeave={() => setHoveredRow(null)} className={isSelected ? "bg-blue-50" : "hover:bg-gray-50"}>
					<td className="px-4 py-4">
					<div className="flex h-6 w-4 items-center justify-center">
						{(isHovered || isSelected) && (
						<button onClick={() => handleSelectFile(file.id)} aria-label={`Select ${file.name}`} className="flex h-4 w-4 items-center justify-center">
							{isSelected ? <img src="/assets/icons/check_green.svg" alt="Selected" /> : <div className="h-4 w-4 rounded-md border border-gray-300 bg-white"></div>}
						</button>
						)}
					</div>
					</td>
					<td className="whitespace-nowrap px-6 py-4">
					<div className="flex items-center gap-3">
						<img src={getFileIcon(file.icon)} alt={file.type} className="h-6 w-6" />
						<span className="font-medium text-gray-900">{file.name}</span>
					</div>
					</td>
					<td className="px-6 py-4 text-gray-600">{file.type}</td>
					<td className="px-6 py-4">
					{file.tags.length > 0 ? <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-black">{file.tags[0]}</span> : <TagSelectPopover availableTags={availableTags} onSelectTag={(tag) => handleAddTagToFile(file.id, tag)} onClose={() => {}} />}
					</td>
					<td className="px-6 py-4 text-gray-600">{file.access}</td>
					<td className="px-6 py-4 text-gray-600">{file.lastModified} ({file.modifiedBy})</td>
					<td className="px-6 py-4 text-right">
					<ActionsMenu 
						onDownload={() => handleDownload(file)}
						onOpen={() => handleOpen(file)}
						onRename={() => handleRename(file)}
						onDelete={() => handleDelete(file.id)}
					/>
					</td>
				</tr>
				);
			})}
			</tbody>
		</table>
		</div>
	);
}