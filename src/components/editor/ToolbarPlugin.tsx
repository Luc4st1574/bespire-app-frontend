// app/components/editor/ToolbarPlugin.tsx
"use client";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND,
  TextNode,
  $isTextNode,
  INSERT_TEXT_COMMAND,
} from "lexical";
import { useCallback, useEffect, useRef, useState } from "react";
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";

import BoldIcon from "@/components/editor/icons/bold.svg";
import ItalicIcon from "@/components/editor/icons/italic.svg";
import UnderlineIcon from "@/components/editor/icons/underline.svg";
import LinkIcon from "@/components/editor/icons/link.svg";
import PaperclipIcon from "@/components/editor/icons/attach-outline.svg";
import AtIcon from "@/components/editor/icons/at.svg";
import SmileIcon from "@/components/editor/icons/face-smile.svg";



// (La función getSelectedNode se mantiene igual que antes)
function getSelectedNode(selection: any) {
  const anchor = selection.anchor;
  const focus = selection.focus;
  const anchorNode = selection.anchor.getNode();
  const focusNode = selection.focus.getNode();
  if (anchorNode === focusNode) {
    return anchorNode;
  }
  const isBackward = selection.isBackward();
  if (isBackward) {
    return $isTextNode(focusNode) ? focusNode : focus.getNode();
  } else {
    return $isTextNode(anchorNode) ? anchorNode : anchor.getNode();
  }
}

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);

  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isLink, setIsLink] = useState(false);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      setIsLink($isLinkNode(parent) || $isLinkNode(node));
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateToolbar();
          return false;
        },
        1
      )
    );
  }, [editor, updateToolbar]);

  const insertLink = useCallback(() => {
    if (!isLink) {
      const url = prompt("Enter the URL:");
      if (url) {
        editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
      }
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [editor, isLink]);

  const handleAttachment = () => {
    alert("Lógica para adjuntar un archivo no implementada.");
  };

  const insertEmoji = () => {
    editor.dispatchCommand(INSERT_TEXT_COMMAND, "😊");
  };

  return (
    <div className="toolbar" ref={toolbarRef}>
      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
        className={"toolbar-item " + (isBold ? "active" : "")}
        aria-label="Format Bold"
      >
       <BoldIcon />
      </button>
      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
        className={"toolbar-item " + (isItalic ? "active" : "")}
        aria-label="Format Italic"
      >
        <ItalicIcon />
      </button>
      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}
        className={"toolbar-item " + (isUnderline ? "active" : "")}
        aria-label="Format Underline"
      >
        <UnderlineIcon />
      </button>
      <button
        onClick={insertLink}
        className={"toolbar-item " + (isLink ? "active" : "")}
        aria-label="Insert Link"
      >
        <LinkIcon />
      </button>
      <button
        onClick={handleAttachment}
        className="toolbar-item"
        aria-label="Attach File"
      >
        <PaperclipIcon />
      </button>
       <button
        onClick={() => alert("Escribe '@' para probar las menciones.")}
        className="toolbar-item"
        aria-label="Mention"
      >
        <AtIcon />
      </button>
      <button
        onClick={insertEmoji}
        className="toolbar-item"
        aria-label="Insert Emoji"
      >
        <SmileIcon />
      </button>
    </div>
  );
}