/* eslint-disable @typescript-eslint/no-explicit-any */
import { useComments } from "@/hooks/useComments";
import CommentInputBar from "../../comments/CommentInputBar";
import CommentsList from "../../comments/CommentsList";
import AttachmentList from "../../for_mocks/AttachmentList";
import LinkCardList from "../../for_mocks/LinkCardList";
import React, { useEffect, useRef, useState } from "react";
import AttachmentsBlock from "../../inputs/AttachmentsBlock";
import LinksBlock from "../../form/LinksBlock";
import { showErrorToast } from "@/components/ui/toast";

export default function RequestTabDetails({
  request,
  isAtBottom = false,
  scrollToEnd,
}: {
  request: any;
  isAtBottom?: boolean;
  scrollToEnd?: () => void;
}) {
  // 1. Estado local para lista de comentarios (inicial con request.comments)
  const [comments, setComments] = useState(request.comments || []);

  // 2. Usa el hook para tener data viva desde backend
  const {
    comments: fetchedComments,
    loading,
    addComment,
  } = useComments(request.id);

  // 3. Cuando fetchedComments cambia (ej: después de crear un comment), actualiza la lista
  useEffect(() => {
    if (fetchedComments && fetchedComments.length > 0) {
      setComments(fetchedComments);
    }
  }, [fetchedComments]);

  // 4. Función para crear comentario
  const handleCommentSubmit = async (editorState, html, clear) => {
    console.log("Submitting comment... clearEditor", html);
    try {
      // Envía SOLO el html o el texto plano, depende de tu backend.
      await addComment(html);
      clear();
    } catch (e) {
      // Mostrar error, toast, etc.
      // No limpies el editor si hay error
      console.error(e);
      showErrorToast(e.message || "Error to add comment");
    }
  };

  return (
    <div>
      <div className="text-base px-6 flex flex-col gap-4 ">
        <section className="flex flex-col gap-2">
          <div className="text-base  font-medium text-[#5E6B66]">
            Description
          </div>
          <div className="border-1 border-[#C4CCC8] rounded-lg p-4">
            {request.details}
          </div>
        </section>
        {/* Links (Preview Only) */}

        <LinksBlock linkedToId={request.id} linkedToType="request" />

        {/* Subtasks  */}
        <section className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="font-medium text-[#5E6B66]">Subtasks</label>
            <button
              type="button"
              className="text-xs text-[#758C5D] mt-1 px-2 py-1 rounded border border-[#758C5D] hover:bg-[#F1F3EE]"
            >
              Add +
            </button>
          </div>
        </section>

        {/* Attachments (Placeholder) */}
        <AttachmentsBlock linkedToId={request.id} linkedToType="request" />

        <section>
          {/* Comments title y view all, sticky */}

          <CommentsList comments={comments} />
        </section>
      </div>

      {/* Sticky Comment Input */}
      <div
        className={
          "transition-all " +
          (!isAtBottom
            ? "sticky bottom-0 bg-white z-20 shadow-[0_-2px_12px_0px_rgba(0,0,0,0.03)]"
            : "")
        }
        style={{
          borderTop: !isAtBottom ? "1px solid #f2f4f3" : undefined,
        }}
      >
        <CommentInputBar
          onSubmit={handleCommentSubmit}
          userAvatar="/assets/avatars/avatar1.svg"
          scrollToEnd={scrollToEnd}
          commentCount={
            request.comments.filter((c) => c.type === "comment").length
          }
        />
      </div>
    </div>
  );
}
