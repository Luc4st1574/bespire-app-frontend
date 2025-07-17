"use client";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { $getRoot } from "lexical";
import { useRef, useState } from "react";
import {
  FORMAT_BOLD_COMMAND,
  FORMAT_ITALIC_COMMAND,
  FORMAT_UNDERLINE_COMMAND,
} from "lexical";
import { Bold, Italic, Underline, Paperclip, AtSign, Smile, Send } from "lucide-react";

function Toolbar({ editor }: { editor: any }) {
  return (
    <div className="flex gap-2 items-center px-1 pt-2 pb-1">
      <button type="button" title="Bold"
        onClick={() => editor.dispatchCommand(FORMAT_BOLD_COMMAND, undefined)}
        className="text-[#758C5D] font-bold px-1"
      ><Bold size={16} /></button>
      <button type="button" title="Italic"
        onClick={() => editor.dispatchCommand(FORMAT_ITALIC_COMMAND, undefined)}
        className="text-[#758C5D] italic px-1"
      ><Italic size={16} /></button>
      <button type="button" title="Underline"
        onClick={() => editor.dispatchCommand(FORMAT_UNDERLINE_COMMAND, undefined)}
        className="text-[#758C5D] underline px-1"
      ><Underline size={16} /></button>
      <button className="text-[#758C5D] px-1" title="Attach file"><Paperclip size={16} /></button>
      <button className="text-[#758C5D] px-1" title="Mention"><AtSign size={16} /></button>
      <button className="text-[#758C5D] px-1" title="Emoji"><Smile size={16} /></button>
    </div>
  );
}

export default function LexicalCommentInput({
  onSubmit,
  userAvatar,
  commentCount = 0,
}: {
  onSubmit: (text: string) => void;
  userAvatar: string;
  commentCount?: number;
}) {
  const editorRef = useRef<any>(null);
  const [canSend, setCanSend] = useState(false);

  const editorConfig = {
    namespace: "CommentInputBar",
    theme: {
      paragraph: "text-sm my-0 text-[#181B1A]",
    },
    onError: (e: any) => { throw e; },
  };

  const handleSend = () => {
    if (!editorRef.current) return;
    let text = "";
    editorRef.current.update(() => {
      text = $getRoot().getTextContent();
    });
    if (text.trim()) {
      onSubmit(text.trim());
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
        <LexicalComposer initialConfig={editorConfig}>
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
