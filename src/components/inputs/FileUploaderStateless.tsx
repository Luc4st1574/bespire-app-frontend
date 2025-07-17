import { useEffect, useRef, useState } from "react";
import { X, CheckCircle, Loader2, Download } from "lucide-react";
import clsx from "clsx";
import { uploadImageToBackend } from "@/services/imageService";
import { getFileIcon } from "@/utils/getFileIcon";
import Button from "../ui/Button";
import { UploadingFilesModal } from "../modals/UploadingFilesModal";

interface UploadedFile {
  file: File;
  url?: string;
  progress: number;
  done: boolean;
  error?: boolean;
}

type Props = {
  value?: UploadedFile[];
  onChange?: (files: UploadedFile[]) => void;
  name?: string;
  buttonLabel?: string;
  showLabel?: boolean;
  label?: string;
  inline?: boolean;
  onlyButton?: boolean;
};

export default function FileUploaderStateless({
  value = [],
  onChange,
  name = "attachments",
  buttonLabel = "Add +",
  showLabel = false,
  label = "Files",
  inline = false,
  onlyButton = false,
}: Props) {
  const [files, setFiles] = useState<UploadedFile[]>(value);
  const [modalOpen, setModalOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mostrar modal si hay archivos en progreso
  useEffect(() => {
    if (files.length > 0 && files.some((f) => !f.done && !f.error)) {
      setModalOpen(true);
    }
    if (files.length === 0) setModalOpen(false);
  }, [files]);

  // Llama a onChange SOLO cuando todos estén listos y hayan sido subidos correctamente
  useEffect(() => {
    if (
      files.length > 0 &&
      files.every((f) => f.done || f.error)
    ) {
      const uploaded = files.filter((f) => f.done && f.url);
      if (uploaded.length > 0 && onChange) {
        onChange(uploaded);
      }
    }
    // eslint-disable-next-line
  }, [files]);

  // Limpia archivos y cierra modal
  const handleCloseModal = () => {
    setModalOpen(false);
    setTimeout(() => setFiles([]), 500); // delay animación
  };

  // Upload en lote, disparando cada upload en paralelo
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    if (!selected.length) return;

    setFiles((prev) => [
      ...prev,
      ...selected.map((f) => ({
        file: f,
        progress: 0,
        done: false,
        error: false,
        url: "",
      })),
    ]);

    // Sube todos los archivos en paralelo
    selected.forEach((file, i) => {
      const idx = files.length + i;
      uploadFile(file, idx);
    });

    if (inputRef.current) inputRef.current.value = "";
  };

  // Upload individual (estado funcional)
  const uploadFile = async (file: File, idx: number) => {
    setFiles((prev) =>
      prev.map((f, i) => (i === idx ? { ...f, progress: 10 } : f))
    );
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await uploadImageToBackend(formData);
      setFiles((prev) =>
        prev.map((f, i) =>
          i === idx ? { ...f, progress: 100, done: true, url: res.url } : f
        )
      );
    } catch (err) {
      setFiles((prev) =>
        prev.map((f, i) =>
          i === idx ? { ...f, progress: 100, done: false, error: true } : f
        )
      );
    }
  };

  const handleRemove = (idx: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  // BOTÓN: reusa en todos los layouts
  const uploadButton = (
    <>
      <Button
        type="button"
        variant="outlineG"
        size="sm"
        onClick={() => inputRef.current?.click()}
      >
        {buttonLabel}
      </Button>
      <input
        ref={inputRef}
        type="file"
        multiple
        hidden
        onChange={handleFileChange}
      />
    </>
  );

  return (
    <>
      {onlyButton ? (
        <div className="">{uploadButton}</div>
      ) : (
        <div>
          {inline && (
            <div className="flex items-center justify-between">
              {showLabel && (
                <label className="font-medium text-[#5E6B66]">{label}</label>
              )}
              {uploadButton}
            </div>
          )}
          {!inline && (
            <div className="flex flex-col ">
              {showLabel && (
                <label className="font-medium text-[#5E6B66]">{label}</label>
              )}
              {uploadButton}
            </div>
          )}
        </div>
      )}
      <UploadingFilesModal
        files={files}
        open={modalOpen}
        onRemove={handleRemove}
        onClose={handleCloseModal}
      />
    </>
  );
}
