import { Fragment, useState, useCallback, useEffect } from 'react';
import { Dialog, Transition, TransitionChild } from '@headlessui/react';
import { UploadCloud, X, File, Info } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

interface SupportedFormatsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

function SupportedFormatsModal({ isOpen, onClose }: SupportedFormatsModalProps) {
    const formatCategories = [
        {
            title: "Images",
            formats: ["JPG", "JPEG", "PNG", "GIF", "SVG", "BMP", "WEBP", "TIFF"]
        },
        {
            title: "Documents",
            formats: ["PDF", "DOC", "DOCX", "PPT", "PPTX", "XLS", "XLSX", "TXT", "RTF", "ODT"]
        },
        {
            title: "Videos",
            formats: ["MP4", "MOV", "AVI", "WMV", "FLV", "MKV", "WEBM"]
        },
        {
            title: "Design Files",
            formats: ["PSD (Photoshop)", "AI (Illustrator)", "INDD (InDesign)", "FIG (Figma)", "SKETCH"]
        }
    ];

    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-[60]" onClose={onClose}>
                <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-black/30" />
                </TransitionChild>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 flex items-center gap-2">
                                    <Info className="text-[#697D67]" size={20}/>
                                    Supported File Formats
                                </Dialog.Title>
                                <div className="mt-4 space-y-3 max-h-80 overflow-auto pr-2">
                                    {formatCategories.map(category => (
                                        <div key={category.title}>
                                            <h4 className="font-semibold text-gray-700">{category.title}</h4>
                                            <div className="mt-1 flex flex-wrap gap-2">
                                                {category.formats.map(format => (
                                                    <span key={format} className="px-2 py-0.5 text-sm bg-gray-100 text-gray-800 rounded-md">
                                                        {format}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6 flex justify-end">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-[#697D67] px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90 focus:outline-none"
                                        onClick={onClose}
                                    >
                                        Got it!
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

interface UploadFilesModalProps {
    open: boolean;
    onClose: () => void;
    onUpload: (files: File[]) => void;
}

export function UploadFilesModal({ open, onClose, onUpload }: UploadFilesModalProps) {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [isFormatsModalOpen, setFormatsModalOpen] = useState(false);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setSelectedFiles(acceptedFiles);
    }, []);
    
    const { getRootProps, getInputProps, isDragActive, open: openFileDialog } = useDropzone({
        onDrop,
        noClick: true,
        noKeyboard: true
    });

    const handleUploadClick = () => {
        if (selectedFiles.length > 0) {
            onUpload(selectedFiles);
        }
        onClose();
    };
    
    useEffect(() => {
        if (!open) {
            const timer = setTimeout(() => setSelectedFiles([]), 300);
            return () => clearTimeout(timer);
        }
    }, [open]);

    return (
        <>
            <Transition show={open} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={onClose}>
                    <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-gray-900/30" />
                    </TransitionChild>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                                <Dialog.Panel className="w-full max-w-xl p-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl flex flex-col relative">
                                    
                                    {/* --- MODIFIED HEADER --- */}
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        title="Close"
                                        className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors z-10"
                                    >
                                        <X size={32} />
                                    </button>
                                    <div className="mb-6">
                                        <Dialog.Title as="h3" className="text-3xl font-semibold text-gray-900">
                                            Upload Files
                                        </Dialog.Title>
                                    </div>
                                    
                                    {/* --- MODIFIED DRAG & DROP AREA --- */}
                                    <div {...getRootProps()} className={`border-2 border-dashed rounded-lg p-10 transition-colors bg-[#FBFFF7] ${isDragActive ? 'border-[#697D67]' : 'border-gray-300'}`}>
                                        <input {...getInputProps()} id="dropzone-file-input"/>
                                        <div className="flex items-center justify-center gap-6">
                                            {/* Composite Icon with clean overlap */}
                                            <div className="relative flex-shrink-0 w-20 h-20">
                                                {/* Layer 1: Base File icon */}
                                                <File size={80} className="absolute top-0 left-0 text-gray-300" strokeWidth={1} />
                                                
                                                {/* Layer 2: Overlapping UploadCloud in its circle */}
                                                <div className="absolute -bottom-1 -right-1 w-12 h-12 rounded-full bg-[#697D67] flex items-center justify-center border-4 border-white">
                                                    <UploadCloud className="text-white" size={26} strokeWidth={2} />
                                                </div>
                                            </div>
                                            {/* Text */}
                                            <div className="text-left">
                                                <p className="text-xl font-medium text-gray-800">Drag & Drop Files</p>
                                                <p className="text-md text-gray-500">
                                                    or <span onClick={openFileDialog} className="font-semibold text-black underline cursor-pointer hover:text-[#697D67]">Browse Files</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* --- NEW SUPPORTED FORMATS TEXT --- */}
                                    <div className="mt-4 text-center text-sm text-gray-600 whitespace-nowrap">
                                        Upload your JPG, PNG, PDF, MP4, DOCX, PPTX files. See
                                        <button onClick={() => setFormatsModalOpen(true)} className="ml-1 text-black font-medium underline hover:text-[#697D67]">
                                            (supported formats)
                                        </button>
                                    </div>
                                    
                                    {/* --- MODIFIED FOOTER BUTTONS --- */}
                                    <div className="mt-8 flex w-full justify-center gap-4">
                                        <button
                                            type="button"
                                            className="w-full justify-center px-10 py-3 text-sm font-medium text-[#697D67] bg-white border border-[#697D67] rounded-full hover:bg-gray-50 focus:outline-none transition-colors"
                                            onClick={onClose}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            className="w-full justify-center px-12 py-3 text-sm font-medium text-white bg-[#E0E0E0] rounded-full focus:outline-none transition-colors disabled:hover:bg-[#E0E0E0] enabled:bg-[#697D67] enabled:hover:bg-opacity-90"
                                            onClick={handleUploadClick}
                                            disabled={selectedFiles.length === 0}
                                        >
                                            Finish
                                        </button>
                                    </div>

                                </Dialog.Panel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            
            <SupportedFormatsModal isOpen={isFormatsModalOpen} onClose={() => setFormatsModalOpen(false)} />
        </>
    );
}
