import { fetchLinkMetadata } from "@/utils/fetchLinkMetadata";
import { useState } from "react";
import LinkCardList from "../for_mocks/LinkCardList";
import { useLinks } from "@/hooks/useLinks";

export default function LinksBlock({
  linkedToId,
  linkedToType = "request",
  onChange,
}: {
  linkedToId: string;
  linkedToType?: string;
  onChange?: (links: any[]) => void;
}) {
  const { links, loading, addLink, removeLink } = useLinks({ linkedToId, linkedToType });
  const [adding, setAdding] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState("");
  const [metaLoading, setMetaLoading] = useState(false);

  // Add new link (with metadata)
  const handleAddLink = async () => {
    setInputError("");
    setMetaLoading(true);
    try {
      // Validar URL básica
      if (!inputValue.trim()) {
        setInputError("Enter a URL");
        setMetaLoading(false);
        return;
      }
      let url = inputValue.trim();
      if (!/^https?:\/\//.test(url)) url = "https://" + url;
      const meta = await fetchLinkMetadata(url);
      await addLink({
        url,
        title: meta?.title || url.replace(/^https?:\/\//, ""),
        favicon: meta?.favicon?.url || "",
        linkedToId,
        linkedToType,
      });
      setAdding(false);
      setInputValue("");
      setInputError("");
    } catch (e) {
      setInputError("Could not fetch metadata or save link.");
    } finally {
      setMetaLoading(false);
    }
  };

  // Remove link
  const handleRemove = async (idx: number) => {
    const link = links[idx];
    if (!link) return;
    await removeLink(link.id);
  };

  return (
    <section className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="font-medium text-base text-[#5E6B66]">Links</label>
        {!adding ? (
          <button
            type="button"
            className="text-xs text-[#758C5D] mt-1 px-2 py-1 rounded border border-[#758C5D] hover:bg-[#F1F3EE]"
            onClick={() => setAdding(true)}
          >
            Add +
          </button>
        ) : (
          <div className="flex items-center gap-1">
            <input
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              className="border px-2 py-1 rounded text-sm outline-none focus:border-[#758C5D] w-64"
              placeholder="Paste link..."
              autoFocus
              disabled={metaLoading}
              onKeyDown={e => {
                if (e.key === "Enter") handleAddLink();
                if (e.key === "Escape") setAdding(false);
              }}
            />
            <button
              type="button"
              className="text-xs bg-[#758C5D] text-white rounded px-3 py-1"
              onClick={handleAddLink}
              disabled={metaLoading}
            >
              {metaLoading ? "..." : "Save"}
            </button>
            <button
              type="button"
              className="text-xs text-gray-600 ml-1"
              onClick={() => setAdding(false)}
              disabled={metaLoading}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
      {inputError && <div className="text-xs text-red-500">{inputError}</div>}
      <LinkCardList links={links} onRemove={handleRemove} />
      {loading && <div className="text-xs text-gray-400 mt-2">Cargando links...</div>}
    </section>
  );
}
