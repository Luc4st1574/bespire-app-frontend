import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { MoreHorizontal, Download, FolderOpen, Edit, Trash2 } from 'lucide-react';
import { Fragment } from 'react';

interface ActionsMenuProps {
    onDownload: () => void;
    onOpen: () => void;
    onRename: () => void;
    onDelete: () => void;
}

const menuItems = [
    { label: 'Download', icon: Download },
    { label: 'Open', icon: FolderOpen },
    { label: 'Rename', icon: Edit },
    { label: 'Delete', icon: Trash2 },
];

export default function ActionsMenu({ onDownload, onOpen, onRename, onDelete }: ActionsMenuProps) {
    const handleAction = (label: string) => {
        switch (label) {
        case 'Download':
            onDownload();
            break;
        case 'Open':
            onOpen();
            break;
        case 'Rename':
            onRename();
            break;
        case 'Delete':
            onDelete();
            break;
        }
    };

    return (
        <Menu as="div" className="relative inline-block text-left">
        <div>
            <MenuButton className="inline-flex w-full justify-center rounded-md text-gray-500 hover:text-gray-800 hover:bg-gray-100 p-1">
            <MoreHorizontal className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only">Actions</span>
            </MenuButton>
        </div>
        <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
        >
            {/* 👇 Border class updated here */}
            <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg border border-gray-300 focus:outline-none">
            <div className="py-1">
                {menuItems.map((item) => (
                <MenuItem key={item.label}>
                    {({ active }) => (
                    <button
                        onClick={() => handleAction(item.label)}
                        className={`${
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        } group flex w-full items-center px-4 py-2 text-sm ${
                            item.label === 'Delete' ? 'text-red-600' : ''
                        }`}
                    >
                        <item.icon
                        className={`mr-3 h-5 w-5 ${
                            item.label === 'Delete' ? 'text-red-500' : 'text-gray-400 group-hover:text-gray-500'
                        }`}
                        aria-hidden="true"
                        />
                        {item.label}
                    </button>
                    )}
                </MenuItem>
                ))}
            </div>
            </MenuItems>
        </Transition>
        </Menu>
    );
}