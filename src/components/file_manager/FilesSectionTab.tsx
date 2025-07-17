import { useState } from "react";
import { useFiles } from "@/hooks/useFiles";
import FileUploaderStateless from "../inputs/FileUploaderStateless";
import FileListTableInTab from "./FileListTableInTab";
import Button from "../ui/Button";
import { Download } from "lucide-react";
import { showErrorToast } from "../ui/toast";

export default function FilesSectionTab({ linkedToId, linkedToType = "request" }) {
  const { files, addFile, removeFile, loading } = useFiles({
    linkedToId,
    linkedToType,
  });
  const [selectMode, setSelectMode] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSelect = (fileId: string) => {
    setSelected((prev) =>
      prev.includes(fileId)
        ? prev.filter((id) => id !== fileId)
        : [...prev, fileId]
    );
  };

  const handleSelectAll = () => setSelected(files.map((f) => f.id));
  const handleDeselectAll = () => setSelected([]);
  const handleDeleteSelected = async () => {
    for (const id of selected) await removeFile(id);
    setSelected([]);
  };
  const handleUpload = async (uploadedFiles) => {
    try {
      for (const f of uploadedFiles) {
        if (!f.done || !f.url) continue;
        await addFile({
          name: f.file.name,
          type: "file",
          url: f.url,
          ext: f.file.name.split(".").pop() || "",
          size: f.file.size,
          linkedToId,
          linkedToType,
        });
      }
    } catch (error) {
      // Replace with your toast implementation
      showErrorToast(error.message || "Error uploading file(s)");
      // Or use a library like react-toastify:
      // toast.error("Error uploading file(s)");
    }
  };
  const handleDownloadSelected = () => {
    selected.forEach((id) => {
      const file = files.find((f) => f.id === id);
      if (file && file.url) window.open(file.url, "_blank");
    });
  };

  // --- Lógica para mostrar botones dinámicamente ---
  const someSelected = selected.length > 0;

  return (
    <section className="flex flex-col gap-2">
      <div className="flex items-center gap-2 justify-between">
        <div className="flex items-center gap-2">
          <span className="font-medium text-base">All Files</span>
        </div>
        <div className="flex items-center gap-2">
          {/* Estado inicial: Select y Upload */}
          {!selectMode ? (
            <>
              <Button
                type="button"
                onClick={() => setSelectMode(true)}
                variant="gray"
                size="sm"
              >
                Select
              </Button>
              <FileUploaderStateless
                key={`uploader-tab-${linkedToId}`}
                onChange={handleUpload}
                onlyButton
                buttonLabel="Upload +"
              />
            </>
          ) : (
            <>
              <Button
                type="button"
                variant="outlineG"
                size="sm"
                onClick={handleSelectAll}
              >
                Select All
              </Button>

              {/* Sólo cuando hay alguno seleccionado */}
              {someSelected && (
                <>
                  <Button
                    type="button"
                    variant="red-outline"
                    size="sm"
                    onClick={handleDeleteSelected}
                    labelColor="flex items-center flex-row gap-1"
                  >
                    <span>Delete</span>
                    <img src="/assets/icons/trash-outline.svg" alt="" />
                  </Button>
                  <Button
                    type="button"
                    variant="outlineG"
                    size="sm"
                    onClick={handleDeselectAll}
                  >
                    Deselect All
                  </Button>
                  <Button
                    type="button"
                    variant="gray"
                    size="sm"
                    onClick={handleDownloadSelected}
                    labelColor="flex items-center flex-row gap-1"
                  >
                    <span>Download</span>
                    <Download size={20} />
                  </Button>
                </>
              )}

              <Button
                variant="green2"
                size="sm"
                type="button"
                onClick={() => {
                  setSelectMode(false);
                  setSelected([]);
                }}
              >
                Done
              </Button>
            </>
          )}
        </div>
      </div>
      <FileListTableInTab
        files={files}
        selectMode={selectMode}
        selected={selected}
        onToggleSelect={toggleSelect}
        onDelete={removeFile}
        onDownload={(file) => window.open(file.url, "_blank")}
      />
    </section>
  );
}
