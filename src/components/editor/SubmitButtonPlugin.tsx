// SubmitButtonPlugin.tsx (o dentro de CommentEditor.tsx)
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot, CLEAR_EDITOR_COMMAND, EditorState } from "lexical";
import { $generateHtmlFromNodes } from "@lexical/html";
import { useCallback } from "react";

export default function SubmitButtonPlugin({
  isEditorEmpty,
  onSubmit,
}: {
  isEditorEmpty: boolean;
  onSubmit: (editorState: EditorState, html: string, clear: () => void) => void;
}) {
  const [editor] = useLexicalComposerContext();


  const handleClearEditor = useCallback(() => {
        editor.update(() => {
            const root = $getRoot();
            root.clear();
        })
        editor.focus();
  }, [editor])
  
  const handleSubmit = () => {
    editor.update(() => {
      const editorState = editor.getEditorState();
      // Generamos el HTML antes de que el padre decida limpiar
      const html = $generateHtmlFromNodes(editor, null);

      
      // La pasamos como tercer argumento
      onSubmit(editorState, html, handleClearEditor);
    });
  };

  return (
    <button
      className="comment-submit-button"
      onClick={handleSubmit}
      disabled={isEditorEmpty}
      type="button"
    >
      Comment
    </button>
  );
}
