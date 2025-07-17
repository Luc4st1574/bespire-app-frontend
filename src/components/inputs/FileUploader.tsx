import { useEffect, useRef, useState } from "react";
import { X, CheckCircle, Loader2, Download } from "lucide-react";
import clsx from "clsx";
import { uploadImageToBackend } from "@/services/imageService"; // tu endpoint actual
import { getFileIcon } from "@/utils/getFileIcon";

const ICONS = {
  pdf: "/assets/icons/pdf.svg",
  pptx: "/assets/icons/pptx.svg",
  docx: "/assets/icons/docx.svg",
  xlsx: "/assets/icons/xlsx.svg",
  default: "/assets/icons/file.svg"
};

function getIcon(fileName: string) {
  const ext = fileName.split(".").pop()?.toLowerCase();
  return ICONS[ext as keyof typeof ICONS] || ICONS.default;
}

interface UploadedFile {
  file: File;
  url?: string;
  progress: number;
  done: boolean;
  error?: boolean;
  
}

export default function FileUploader({
  value = [],
  onChange,
  name = "attachments",
}: {
  value?: UploadedFile[];
  onChange?: (files: UploadedFile[]) => void;
  name?: string;
}) {
  const [files, setFiles] = useState<UploadedFile[]>(value);
  const seenDoneRef = useRef<Set<number>>(new Set());
  const [showDone, setShowDone] = useState<number[]>([]);

  useEffect(() => {
    files.forEach((f, idx) => {
      // Si ahora está done y antes NO lo estaba (es nuevo done)
      if (f.done && !seenDoneRef.current.has(idx)) {
        setShowDone((prev) => [...prev, idx]);
        seenDoneRef.current.add(idx);
        setTimeout(() => {
          setShowDone((prev) => prev.filter((i) => i !== idx));
        }, 1000);
      }
      // Si el archivo se elimina o deja de estar done, limpiamos el ref
      if (!f.done && seenDoneRef.current.has(idx)) {
        seenDoneRef.current.delete(idx);
      }
    });
    // Solo queremos monitorear cambios en el array, no cada render
    // eslint-disable-next-line
  }, [files.map(f => f.done).join()]);
  useEffect(() => {
    // Solo dispara onChange cuando cambia el estado interno de archivos
    onChange?.(files);
    // eslint-disable-next-line
  }, [files]);
  
  // Para abrir el input con un botón custom
  const inputRef = useRef<HTMLInputElement>(null);

  function humanFileSize(bytes: number) {
    if (bytes < 1024) return `${bytes}b`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}kb`;
    return `${(bytes / 1024 / 1024).toFixed(1)}mb`;
  }
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    if (!selected.length) return;
  
    // Paso 1: agrega TODOS los archivos al estado (con done/progress inicial)
    setFiles(prev =>
      [
        ...prev,
        ...selected.map(f => ({
          file: f,
          progress: 0,
          done: false,
          error: false,
          url: "",
        })),
      ]
    );
  
    // Paso 2: Espera que el estado se actualice antes de subir
    // (usamos callback para capturar los índices correctos)
    setTimeout(() => {
      selected.forEach((file, i) => {
        // Calcula el índice real (posición en el array después del push)
        const idx = files.length + i;
        uploadFile(file, idx);
      });
      // Limpia input para poder subir el mismo archivo de nuevo
      if (inputRef.current) inputRef.current.value = "";
    }, 0);
  };
  const uploadFile = async (file: File, idx: number) => {
    setFiles(prev => prev.map((f, i) => (i === idx ? { ...f, progress: 10 } : f)));
  
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      const res = await uploadImageToBackend(formData);
  
      setFiles(prev => {
        const updated = prev.map((f, i) =>
          i === idx ? { ...f, progress: 100, done: true, url: res.url } : f
        );
        // Usar aquí updated, no files
        console.log("actualizar on change", updated);
      //  onChange?.(updated.filter(f => f.done && f.url));
        return updated;
      });
    } catch (err) {
      setFiles(prev =>
        prev.map((f, i) =>
          i === idx ? { ...f, progress: 100, done: false, error: true } : f
        )
      );
    }
  };
  
  

  const handleRemove = (idx: number) => {
    setFiles(prev => prev.filter((_, i) => i !== idx));
    onChange?.(files.filter((_, i) => i !== idx));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="font-medium text-sm">Attachments</label>
        <button
          type="button"
          className="text-xs text-[#758C5D] mt-1 px-2 py-1 rounded border border-[#758C5D] hover:bg-[#F1F3EE]"
          onClick={() => inputRef.current?.click()}
        >
          Add +
        </button>
        <input
          ref={inputRef}
          type="file"
          multiple
          hidden
          onChange={handleFileChange}
        />
      </div>
      <div className="flex flex-col rounded-lg ">
      {files.map((f, idx) => {
        return (
            <div
            key={idx}
            className={clsx(
                "flex items-center gap-2 px-4 relative min-h-[64px] transition-all ",
                f.done && !showDone.includes(idx)
                  ? "bg-white border border-gray-200 rounded-lg mb-2"
                  : "bg-[#F6F7F7]"
              )}
            style={{
              minHeight: "64px", // Espacio para barra y textos
            }}
          >
            {/* ICON */}
            <img src={getFileIcon(f.file.name)} className="w-8 h-8" alt="" />
  
            {/* INFO */}
            <div className="flex-1 min-w-0 flex flex-row gap-1">
              {/* File name */}
              <div className="font-medium text-base truncate">{f.file.name}</div>
              {/* Estado + Peso */}
              <div className="flex items-center gap-3 text-sm mt-1">
                <span className="text-[#454D48]">{humanFileSize(f.file.size)}</span>
                {/* ESTADO */}
                {!f.done && !f.error && (
                  <span className="flex items-center gap-1 text-green-700 ml-1 font-medium">
                    <Loader2 className="animate-spin w-5 h-5" />
                    <span>{f.progress}%</span>
                  </span>
                )}
                 {f.done && showDone.includes(idx) && (
                <span className="flex items-center gap-1 text-[#56704B] ml-1 font-medium animate-fade-out">
                  <CheckCircle className="w-5 h-5" /> Done
                </span>
              )}
                {f.error && (
                  <span className="flex items-center gap-1 text-red-600 ml-1 font-medium"
                    style={{ animation: "fadeOut 1s forwards" }}
                  >
                    Error uploading
                  </span>
                )}
              </div>
              {/* Barra de progreso */}
              <div className="h-2 rounded bg-[#DFE8DF] mt-2 overflow-hidden">
                <div
                  className={clsx(
                    "h-2 rounded bg-[#6C8C68] transition-all"
                  )}
                  style={{ width: `${f.progress}%` }}
                />
              </div>
            </div>
            
            {/* Download y eliminar */}
           <div className="flex items-center gap-2">
           {f.url && (
              <a
                href={f.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 ml-2"
                title="Download"
              >
                <Download size={20} />
              </a>
            )}
            <button
              onClick={() => handleRemove(idx)}
              className="text-gray-400 hover:text-red-600"
              title="Remove"
            >
              <X size={22} />
            </button>
           </div>
          </div>
        )

      }
        
       
      )}
    </div>
    </div>
  );
}
