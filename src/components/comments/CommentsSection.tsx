// components/modals/RequestDetails/CommentsSection.tsx
import { useRef, useState } from "react";
import CommentsList, { Comment } from "./CommentsList";
import CommentInputBar from "./CommentInputBar";

export default function CommentsSection({
  comments,
  userAvatar,
}: {
  comments: Comment[];
  userAvatar: string;
}) {
  const commentsListRef = useRef<{ scrollToEnd: () => void }>(null);
  const [showActivity, setShowActivity] = useState(true);

  // Mock submit: agrega comentario (solo front)
  // Puedes adaptar para enviar al backend
  // const [allComments, setAllComments] = useState(comments);

  return (
    <div className="flex flex-col h-[440px] bg-white rounded-b-lg">
      <CommentsList
        comments={comments}
        commentsCount={comments.length}
        showActivity={showActivity}
        setShowActivity={setShowActivity}
        ref={commentsListRef}
        onViewAll={() => {
          commentsListRef.current?.scrollToEnd();
        }}
      />
      <CommentInputBar
        userAvatar={userAvatar}
        onSubmit={(text) => {
          // Aquí puedes llamar tu mutación, mock: alerta
          alert(`Comentario enviado: ${text}`);
          setTimeout(() => commentsListRef.current?.scrollToEnd(), 250);
        }}
      />
    </div>
  );
}
