// CommentEditor.tsx (Versión Simplificada)
"use client";

import {
  LexicalComposer,
  type InitialConfigType,
} from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import ToolbarPlugin from "./ToolbarPlugin";
import { editorTheme } from "./theme";
import { editorNodes } from "./nodes";
import { useState } from "react";
import { $getRoot, EditorState } from "lexical";
import SubmitButtonPlugin from "./SubmitButtonPlugin";
// El SubmitButtonPlugin será modificado a continuación

const editorConfig: InitialConfigType = {
  namespace: "CommentEditor",
  theme: editorTheme,
  onError(error: Error) {
    throw error;
  },
  nodes: editorNodes,
};

// Modificamos el tipo de la prop onSubmit
type Props = {
  onSubmit: (
    payload: EditorState,
    html: string,
    // La función clear ya no es opcional y es parte del callback
    clear: () => void
  ) => void | Promise<void>;
};

// Eliminamos clearTrigger de los props
export default function CommentEditor({ onSubmit }: Props) {
  const [isEditorEmpty, setIsEditorEmpty] = useState(true);

  const onChange = (editorState: EditorState) => {
    editorState.read(() => {
      const root = $getRoot();
      const children = root.getChildren();
      // Una comprobación más robusta para el estado vacío
      if (children.length > 1) {
        setIsEditorEmpty(false);
        return;
      }
      const firstChild = children[0];
      setIsEditorEmpty(firstChild ? root.getTextContent() === "" : true);
    });
  };

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="comment-editor-container">
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<div className="editor-placeholder">Write a comment..</div>}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <LinkPlugin />
          <OnChangePlugin onChange={onChange} />
          {/* Ya no necesitamos ClearOnTriggerPlugin */}
        </div>
        <div className="comment-toolbar-wrapper">
          <ToolbarPlugin />
          <SubmitButtonPlugin
            isEditorEmpty={isEditorEmpty}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </LexicalComposer>
  );
}