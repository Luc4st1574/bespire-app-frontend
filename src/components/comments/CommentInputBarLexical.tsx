"use client";
import { useRef, useState } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { $getRoot } from "lexical";
import {
  FORMAT_BOLD_COMMAND,
  FORMAT_ITALIC_COMMAND,
  FORMAT_UNDERLINE_COMMAND,
} from "lexical";
import { Bold, Italic, Underline, Paperclip, AtSign, Smile, Send } from "lucide-react";

// ¡IMPORTANTE! Usa los nodes de rich text de Lexical
import { RichTextNode } from "@lexical/rich-text";

function Toolbar({ editor }: { editor: any }) {
  return (
    <div className="flex gap-2 items-center pt-2">
      <button type="button" title="Bold"
        onClick={() => editor?.dispatchCommand(FORMAT_BOLD_COMMAND, undefined)}
        className="text-[#758C5D] font-bold px-1"
      ><Bold size={16} /></button>
      <button type="button" title="Italic"
        onClick={() => editor?.dispatchCommand(FORMAT_ITALIC_COMMAND, undefined)}
        className="text-[#758C5D] italic px-1"
      ><Italic size={16} /></button>
      <button type="button" title="Underline"
        onClick={() => editor?.dispatchCommand(FORMAT_UNDERLINE_COMMAND, undefined)}
        className="text-[#758C5D] underline px-1"
      ><Underline size={16} /></button>
      <button className="text-[#758C5D] px-1" title="Attach file"><Paperclip size={16} /></button>
      <button className="text-[#758C5D] px-1" title="Mention"><AtSign size={16} /></button>
      <button className="text-[#758C5D] px-1" title="Emoji"><Smile size={16} /></button>
    </div>
  );
}

export default function CommentInputBarLexical({
  userAvatar,
  onSubmit,
  disabled = false,
  commentCount = 0,
  scrollToEnd,
}: {
  userAvatar: string;
  onSubmit: (html: string) => void;
  disabled?: boolean;
  commentCount?: number;
  scrollToEnd?: () => void;
}) {
  const editorRef = useRef<any>(null);
  const [canSend, setCanSend] = useState(false);

  const initialConfig = {
    namespace: "CommentInputBar",
    theme: {
      paragraph: "text-sm my-0 text-[#181B1A]",
    },
    onError: (e: any) => { throw e; },
    // La clave para los formatos: nodes de rich text
    nodes: [RichTextNode],
  };

  const handleSend = () => {
    if (!editorRef.current) return;
    let html = "";
    editorRef.current.update(() => {
      html = $getRoot().getTextContent();
    });
    if (html.trim()) {
      onSubmit(html.trim());
      editorRef.current.update(() => $getRoot().clear());
    }
  };

  return (
    <div className="w-full px-3 py-3 bg-white border-t border-[#E2E6E4] sticky bottom-0 z-20">
      <div className="flex items-center gap-2 mb-1">
        <img src={userAvatar} alt="" className="w-7 h-7 rounded-full" />
        <span className="ml-auto text-sm text-black font-medium bg-[#E2E6E4] w-5 h-5 flex items-center justify-center rounded-full">
          {commentCount}
        </span>
      </div>
      <div className="flex-1">
        <LexicalComposer initialConfig={initialConfig}>
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className="w-full border border-gray-200 rounded-md p-2 text-sm resize-none min-h-[40px] max-h-[120px] bg-white focus:outline-none focus:ring-2 focus:ring-[#758C5D]"
                placeholder="Write a comment..."
                spellCheck
              />
            }
            placeholder={<div className="text-gray-400">Write a comment...</div>}
          />
          <HistoryPlugin />
          <OnChangePlugin
            onChange={(editorState, editor) => {
              editorRef.current = editor;
              editorState.read(() => {
                const content = $getRoot().getTextContent();
                setCanSend(!!content.trim());
              });
            }}
          />
          <Toolbar editor={editorRef.current} />
        </LexicalComposer>
        <div className="flex justify-end mt-2">
          <button
            className={`bg-[#DFE8DF] text-[#62864D] px-4 py-1 rounded-full text-sm font-medium transition 
              ${!canSend ? "opacity-60 cursor-not-allowed" : "hover:bg-[#C7D9C7] cursor-pointer"}`}
            type="button"
            onClick={handleSend}
            disabled={!canSend}
          >
            <span className="flex items-center gap-1">
              Comment <Send className="ml-1" size={15} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
