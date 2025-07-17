/* eslint-disable @next/next/no-img-element */
import { useFieldArray, useFormContext } from "react-hook-form";
import { useState } from "react";
import { X, ExternalLink } from "lucide-react";
import { fetchLinkMetadata } from "@/utils/fetchLinkMetadata";
import Spinner from "../Spinner";
import SpinnerSmall from "../ui/Spinner";

function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function LinkInputList({ name = "links" }: { name?: string }) {
  const { control, register, setValue, watch } = useFormContext();
  const { fields, append, remove, replace } = useFieldArray({ control, name });
  const links = watch("links") as {
    url: string;
    title?: string;
    favicon?: string;
  }[];
  const [editing, setEditing] = useState(false);
  const [errorIndexes, setErrorIndexes] = useState<number[]>([]);

  const [loading, setLoading] = useState(false);
  const [metadata, setMetadata] = useState<{ [idx: number]: any }>({});
  // Acciones principales
  const handleAdd = () => {
    setEditing(true);
    append({ url: "", title: "", favicon: "" });
  };

  const handleDone = async () => {
    console.log("handleDone")
    let errors: number[] = [];
    const validLinks: { url: string; favicon: string; title: string }[] = [];
    setLoading(true);

    // Recopila promises para fetch
    const metaPromises = links.map(async (link: any, idx: number) => {
      if (!link.url) return null;
      if (!isValidUrl(link.url)) {
        errors.push(idx);
        return null;
      }
      const meta = await fetchLinkMetadata(link.url);
      console.log("Fetched metadata for", link.url, meta);
      return meta
        ? { url: link.url, title: meta.title, favicon: meta.favicon.url }
        : { url: link.url, title: "", favicon: "" };
    });

    console.log("metaPromises", metaPromises)

    const allMeta = await Promise.all(metaPromises);
    setLoading(false);

    setErrorIndexes(errors);

    if (errors.length > 0) {
      console.log("si hay errores", errors) 
      return
    }
    // Quitar vacíos y quedarnos con los válidos
    replace(allMeta.filter(Boolean) as any);
    setEditing(false);
    setMetadata({}); // limpiar
  };
  const handleRemove = (idx: number) => {
    remove(idx);
    setErrorIndexes((errs) => errs.filter((e) => e !== idx));
    if (fields.length - 1 === 0) setEditing(false);
  };

  // UI
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <label className="font-medium">Links</label>
        {!editing ? (
          <button
            type="button"
            className="text-xs text-[#758C5D] mt-1 px-2 py-1 rounded border border-[#758C5D] hover:bg-[#F1F3EE]"
            onClick={handleAdd}
          >
            Add +
          </button>
        ) : (
          <button
            type="button"
            className="text-xs text-white bg-[#758C5D] rounded px-3 py-1"
            onClick={handleDone}
            disabled={loading}
          >
            {loading ? <SpinnerSmall /> : "Done"}
          </button>
        )}
      </div>
      {/* Inputs para links abiertos */}
      {editing && (
        <div className="space-y-2">
          {fields.map((field, idx) => (
            <div key={field.id} className="flex items-center gap-2">
              <input
                {...register(`${name}.${idx}.url`)}
                placeholder="Enter link"
                disabled={loading}
                className={`flex-1 border p-2 rounded-md text-sm outline-none focus:ring-2 focus:ring-[#758C5D] focus:border-transparent ${
                  errorIndexes.includes(idx)
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              <button
                type="button"
                className="text-gray-400"
                onClick={() => handleRemove(idx)}
              >
                <X size={16} />
              </button>
            </div>
          ))}
          <button
            type="button"
            className="flex items-center gap-1 text-xs text-[#758C5D] mt-1"
            onClick={() => append({ url: "" })}
          >
            <span className="text-xl">＋</span> Add more link
          </button>
          {errorIndexes.length > 0 && (
            <div className="text-red-500 text-xs">
              Please enter valid URLs in all fields!
            </div>
          )}
        </div>
      )}
      {/* Si no está editando, mostrar las tarjetas */}
      {!editing && links.length > 0 && (
        <div className="flex flex-col gap-2 mt-2">
          {links.map((l: any, idx: number) => (
            <div
              key={idx}
              className="flex items-center gap-2  px-3 py-2 shadow rounded-md border border-gray-300 hover:bg-gray-50 transition-all cursor-pointer"
            >
              <img
                src={l.favicon || "/assets/icons/loading.svg"}
                alt=""
                className="w-5 h-5 rounded"
                onError={(e) =>
                  (e.currentTarget.src = "/assets/icons/loading.svg")
                }
              />
              <div className="flex flex-col flex-1">
                <a
                  href={l.url}
                  className="truncate max-w-[180px] text-xs text-gray-600"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="font-semibold truncate max-w-[180px] text-[#3A76FF]">
                    {l.title || l.url.replace(/^https?:\/\//, "")}
                  </span>
                </a>
              </div>
              <a
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1"
                title="Open"
              >
                <ExternalLink size={16} />
              </a>
              <button
                type="button"
                className="ml-1"
                title="Delete"
                onClick={() => {
                  handleRemove(idx);
                  if (links.length === 1) setEditing(false);
                }}
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
