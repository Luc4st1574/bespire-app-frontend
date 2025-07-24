import React, { useState, useEffect } from 'react';
import { MockFile } from '@/data/mock-files';
import { X } from 'lucide-react';
import CustomSelect from './CustomSelect';

// --- Mock Data for Dropdowns (Updated Structure) ---
const availableTags = [
  'Email Marketing',
  'Social Media',
  'Branding',
  'Q4 Campaign',
  'UX/UI',
  'Analytics',
  'Content Strategy',
].map((tag) => ({ value: tag, label: tag }));

const accessOptions = [
  { value: 'All', label: 'All (default)' },
  { value: 'Team', label: 'Team' },
  { value: 'Private', label: 'Private' },
];

// --- Prop Interface ---
interface CreateFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateFolder: (details: { name: string; tags: string[]; access: MockFile['access'] }) => void;
}

// --- Main Component ---
const CreateFolderModal: React.FC<CreateFolderModalProps> = ({ isOpen, onClose, onCreateFolder }) => {
  const [folderName, setFolderName] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [access, setAccess] = useState<MockFile['access']>('All');
  const [isLoading, setIsLoading] = useState(false);

  const isFormValid = folderName.trim() !== '';

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const resetForm = () => {
    setFolderName('');
    setSelectedTag(null);
    setAccess('All');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    setIsLoading(true);

    setTimeout(() => {
      onCreateFolder({
        name: folderName,
        tags: selectedTag ? [selectedTag] : [],
        access: access,
      });
      setIsLoading(false);
      onClose();
      resetForm();
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-gray-900/30"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-lg rounded-lg bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 pt-6">
          <h3 className="text-xl font-medium text-gray-900">New Folder</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close modal"
            title="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6 bg-white p-6">
            <div>
              <label htmlFor="folderName" className="mb-2 block text-sm font-medium text-gray-700">
                Folder name
              </label>
              <input
                id="folderName"
                type="text"
                placeholder="Enter folder name"
                className="block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                required
                autoFocus
              />
            </div>
            
            <div className="flex items-start gap-4">
              <CustomSelect
                label="Tag"
                value={selectedTag}
                onChange={setSelectedTag}
                options={availableTags}
              />
              <CustomSelect
                label="Access"
                value={access}
                onChange={(val) => setAccess(val as MockFile['access'])}
                options={accessOptions}
              />
            </div>
          </div>

          <div className="flex space-x-4 px-6 py-4">
            <button
              type="button"
              className="w-1/2 rounded-full border border-gray-500 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`w-1/2 rounded-full px-4 py-2.5 text-sm font-semibold text-white transition-colors ${
                isFormValid
                  ? 'bg-[#697d67] hover:bg-[#596b57]'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
              disabled={!isFormValid || isLoading}
            >
              {isLoading ? 'Creating...' : 'Create Folder'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFolderModal;