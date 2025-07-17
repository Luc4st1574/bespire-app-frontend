// app/components/editor/Editor.tsx
"use client";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import type { EditorState } from "lexical";

import { editorTheme } from "./theme";
import { editorNodes } from "./nodes";
import ToolbarPlugin from "./ToolbarPlugin";

function Placeholder() {
  return <div className="editor-placeholder">Escribe algo...</div>;
}

const editorConfig = {
  namespace: "MyEditor",
  theme: editorTheme,
  onError(error: Error) {
    throw error;
  },
  nodes: editorNodes,
};

export default function Editor() {
  const onChange = (editorState: EditorState) => {
    // Puedes usar esto para guardar el estado del editor en tu base de datos
    // const editorStateJSON = JSON.stringify(editorState);
    // console.log(editorStateJSON);
  };

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        <ToolbarPlugin />
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <LinkPlugin />
          <OnChangePlugin onChange={onChange} />
        </div>
      </div>
    </LexicalComposer>
  );
}