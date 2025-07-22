/* eslint-disable @next/next/no-img-element */
import { MockFile } from "@/data/mock-files";
import { getFileIcon } from "@/utils/getFileIcon";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import Button from "../ui/Button";

interface FileListTableProps {
	files: MockFile[];
}

const tableHeaders = ["Name", "Type", "Tags", "Access", "Last Modified"];

export default function FileListTable({ files }: FileListTableProps) {
	const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
	const [hoveredRow, setHoveredRow] = useState<string | null>(null);

	const isAllSelected = selectedFiles.length === files.length && files.length > 0;
	const isIndeterminate = selectedFiles.length > 0 && !isAllSelected;

	const handleSelectFile = (fileId: string) => {
		setSelectedFiles((prevSelected) =>
			prevSelected.includes(fileId)
				? prevSelected.filter((id) => id !== fileId)
				: [...prevSelected, fileId]
		);
	};

	// If some or all files are selected, deselect all. Otherwise, select all.
	const handleSelectAll = () => {
		if (selectedFiles.length > 0) {
			setSelectedFiles([]);
		} else {
			setSelectedFiles(files.map((file) => file.id));
		}
	};

	return (
		<div className="overflow-x-auto">
			<table className="min-w-full text-sm">
				<thead>
					<tr>
						<th className="px-4 py-3">
							<div className="flex items-center justify-center w-4 h-6">
								<button
									onClick={handleSelectAll}
									aria-label="Select all files"
									className="flex items-center justify-center w-4 h-4"
								>
									{isAllSelected ? (
										<img
											src="/assets/icons/check_green.svg"
											alt="All selected"
											className="w-full h-full"
										/>
									) : isIndeterminate ? (
										<img
											src="/assets/icons/minus_green.svg"
											alt="Some selected"
											className="w-full h-full"
										/>
									) : (
										<div className="w-4 h-4 bg-white border border-gray-300 rounded-md"></div>
									)}
								</button>
							</div>
						</th>
						{tableHeaders.map((header) => (
							<th
								key={header}
								className="px-6 py-3 text-left font-medium text-gray-600"
							>
								<div className="flex items-center gap-1">
									{header}
									<img
										src="/assets/icons/icon_filter.svg"
										alt="Sort"
										className="w-3 h-3"
									/>
								</div>
							</th>
						))}
						<th className="px-6 py-3">
							<span className="sr-only">Actions</span>
						</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-200">
					{files.map((file) => {
						const isSelected = selectedFiles.includes(file.id);
						const isHovered = hoveredRow === file.id;

						return (
							<tr
								key={file.id}
								onMouseEnter={() => setHoveredRow(file.id)}
								onMouseLeave={() => setHoveredRow(null)}
								className={
									isSelected ? "bg-blue-50" : "hover:bg-gray-50"
								}
							>
								<td className="px-4 py-4">
									<div className="flex items-center justify-center w-4 h-6">
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
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<div className="flex items-center gap-3">
										<img
											src={getFileIcon(file.icon)}
											alt={file.type}
											className="w-6 h-6"
										/>
										<span className="font-medium text-gray-900">
											{file.name}
										</span>
									</div>
								</td>
								<td className="px-6 py-4 text-gray-600">{file.type}</td>
								<td className="px-6 py-4">
									{file.tags.length > 0 ? (
										<span className="px-2.5 py-1 text-xs font-medium text-black bg-green-100 rounded-full">
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
									<button className="text-gray-500 hover:text-gray-800">
										<span className="sr-only">Actions</span>
										<MoreHorizontal className="w-5 h-5" />
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}