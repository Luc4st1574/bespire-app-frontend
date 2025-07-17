import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { X, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import Button from "../ui/Button";

const SIDEBAR_ITEMS = [
  { label: "Logo", icon: "🖼️", disabled: true },
  { label: "Colors", icon: "🎨", disabled: true },
  { label: "Fonts", icon: "🔤", disabled: true },
  // Puedes agregar más en el futuro, o íconos SVG en vez de emojis
];

export default function ModalBrands({
  isOpen,
  onClose,
  onSubmit,
  onDelete, // <- Nueva prop
  editingBrand,
  loading,
  deleting,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: { name: string }) => Promise<void>;
  onDelete?: () => Promise<void>;
  editingBrand?: any;
  loading?: boolean;
  deleting?: boolean;
}) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (editingBrand) {
      setName(editingBrand.name || "");
    } else {
      setName("");
    }
  }, [editingBrand, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit({ name: name.trim() });
  };

  // Para cuando implementes navegación en el sidebar en el futuro
  const [activeItem, setActiveItem] = useState(0);

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50 p-4">
      <DialogBackdrop className="fixed inset-0 bg-black/20 backdrop-blur-sm" />
      <div className="fixed inset-0 flex justify-center items-center">
        <DialogPanel className="w-full max-w-2xl min-h-[500px] bg-white rounded-2xl overflow-hidden flex flex-row shadow-xl p-0">
          {/* Sidebar */}
          <aside className="w-56 bg-[#f6f8f6] flex flex-col justify-between border-r py-6 px-2">
            <div>
              <button
                className="flex items-center gap-2 text-sm text-gray-500 mb-6 hover:underline"
                onClick={onClose}
                type="button"
              >
                &larr; Back to Brands
              </button>
              <nav className="flex flex-col gap-2">
                {SIDEBAR_ITEMS.map((item, idx) => (
                  <button
                    key={item.label}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm
                    ${
                      idx === activeItem
                        ? "bg-white font-semibold text-gray-900"
                        : "text-gray-500"
                    }
                    ${item.disabled ? "opacity-50 cursor-not-allowed" : ""}
                  `}
                    disabled={item.disabled}
                    onClick={() => setActiveItem(idx)}
                  >
                    <span className="text-xl">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
            {editingBrand && (
              <Button
                type="button"
                variant="ghostRed"
                size="lg"
                className="flex gap-2 items-center mt-2"
                onClick={onDelete}
                loading={deleting}
              >
                <Trash2 className="w-5 h-5" />
                Delete Brand
              </Button>
            )}
          </aside>
          {/* Main content */}
          <div className="flex-1 flex flex-col py-8 px-8">
            {/* Header */}
            <div className="flex justify-between items-start mb-8">
              <DialogTitle className="text-2xl font-bold">
                {editingBrand ? "Edit Brand" : "Customize Your Brand"}
              </DialogTitle>
              <button
                onClick={onClose}
                className="text-gray-600 hover:text-black"
                type="button"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form
              className="flex flex-col gap-6 flex-1 justify-between"
              onSubmit={handleSubmit}
            >
              {/* Campos del brand */}
              <div className="flex flex-col gap-4">
                <label className="block font-semibold mb-1 text-base">
                  Brand Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Brand name"
                  className="w-full border rounded-md px-3 py-2 text-base"
                  required
                  minLength={2}
                  maxLength={40}
                  autoFocus
                />
              </div>
              {/* Acciones abajo */}
              <div className="flex justify-between items-center gap-4 mt-12">
                <Button
                  type="button"
                  variant="outlineG"
                  size="lg"
                  className="flex-1"
                  onClick={onClose}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="green2"
                  size="lg"
                  className="flex-1"
                  loading={loading}
                >
                  {editingBrand ? "Update" : "Add Brand"}
                </Button>
              </div>
            </form>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
