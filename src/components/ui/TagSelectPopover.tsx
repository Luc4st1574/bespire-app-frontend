import { Fragment, useState } from 'react';
import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react';
import { X } from 'lucide-react';

interface TagSelectPopoverProps {
    availableTags: { value: string; label: string }[];
    onSelectTag: (tag: string) => void;
    onClose: () => void;
}

export default function TagSelectPopover({ availableTags, onSelectTag, onClose }: TagSelectPopoverProps) {
    const [newTag, setNewTag] = useState('');

    const handleAddTag = () => {
        if (newTag.trim() !== '') {
        onSelectTag(newTag.trim());
        setNewTag('');
        onClose();
        }
    };

    return (
        <Popover as="div" className="relative">
        {({ close }) => (
            <>
            <PopoverButton className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 hover:bg-gray-200">
                + Add
            </PopoverButton>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
            >
                {/* 👇 Border class updated here to match your project's UI */}
                <PopoverPanel anchor="bottom end" className="z-10 mt-2 w-64 transform rounded-lg bg-white shadow-lg border border-gray-300 focus:outline-none">
                <div className="p-4">
                    <div className="mb-3 flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-900">Add a tag</h4>
                    <button
                        type="button"
                        onClick={() => close()}
                        className="text-gray-400 hover:text-gray-600"
                        title="Close"
                        aria-label="Close"
                    >
                        <X className="h-4 w-4" />
                    </button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                    {availableTags.map((tag) => (
                        <button
                        type="button"
                        key={tag.value}
                        onClick={() => {
                            onSelectTag(tag.value);
                            close();
                        }}
                        className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-black hover:bg-green-200"
                        >
                        {tag.label}
                        </button>
                    ))}
                    </div>

                    <div className="flex gap-2">
                    <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Create new tag..."
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                    />
                    <button
                        type="button"
                        onClick={handleAddTag}
                        className="rounded-md bg-[#697d67] px-3 py-1.5 text-sm font-semibold text-white hover:bg-[#596b57]"
                    >
                        Add
                    </button>
                    </div>
                </div>
                </PopoverPanel>
            </Transition>
            </>
        )}
        </Popover>
    );
}