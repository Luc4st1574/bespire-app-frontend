/* eslint-disable @next/next/no-img-element */
import { getInitials } from "@/utils/utils";
import { useState, useRef } from "react";

type User = {
  id: string;
  name: string;
  avatarUrl: string;
};

type Comment = {
  id: string;
  user: User;
  createdAt: string;
  text?: string;
  type: "comment" | "activity";
  activityText?: string;
};

export default function CommentsList({
  comments,
  className = "",
}: {
  comments: Comment[];
  className?: string;
}) {
  const [showActivity, setShowActivity] = useState(true);
  const commentsEndRef = useRef<HTMLDivElement>(null);

  const visibleComments = showActivity
    ? comments
    : comments.filter((c) => c.type === "comment");

  // Para View all comments: scroll al fondo
  const scrollToEnd = () => {
    commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={`flex flex-col gap-3 ${className} text-sm`}>
      <div className="flex items-center justify-between">
        <div className="text-base font-medium text-[#5E6B66]">Comments</div>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-1 cursor-pointer select-none text-sm text-[#5E6B66]">
            <input
              type="checkbox"
              checked={showActivity}
              onChange={(e) => setShowActivity(e.target.checked)}
              className="accent-[#758C5D] w-4 h-4"
            />
            Show Activity
          </label>
        </div>
      </div>
      <ul className="flex flex-col gap-3 py-3">
        {visibleComments.map((comment) => {
            const iconLetter = getInitials(comment.user.name);
           
          return comment.type === "activity" ? (
            <li key={comment.id} className="flex items-start gap-2 text-sm ">
              {comment.user.avatarUrl ? (
                <img
                  src={comment.user.avatarUrl}
                  alt={comment.user.name}
                  className="w-7 h-7 rounded-full mt-1"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-[#E0E0E0] flex items-center justify-center mt-1 font-semibold text-[#5E6B66]">
                  {iconLetter}
                </div>
              )}
              <div>
                <span className="font-semibold">{comment.user.name}</span>{" "}
                <span>{comment.activityText}</span>
                <div className="text-xs text-[#5E6B66] ">
                  {new Date(comment.createdAt).toLocaleString()}
                </div>
              </div>
            </li>
          ) : (
            <li key={comment.id} className="flex items-start gap-2">
               {comment.user.avatarUrl ? (
                <img
                  src={comment.user.avatarUrl}
                  alt={comment.user.name}
                  className="w-7 h-7 rounded-full mt-1"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-[#E0E0E0] flex items-center justify-center mt-1 font-semibold text-[#5E6B66]">
                  {iconLetter}
                </div>
              )}
              <div>
                <div className="font-semibold  text-sm">
                  {comment.user.name}
                </div>
                <div className="text-xs text-[#5E6B66]">
                  {new Date(comment.createdAt).toLocaleString()}
                </div>
                <div className="bg-[#F8F9F8] p-3 rounded-md mt-1 whitespace-pre-line"
                 dangerouslySetInnerHTML={{ __html: comment.text }}
                >
                </div>
              </div>
            </li>
          );
        })}
        <div ref={commentsEndRef} />
      </ul>
    </div>
  );
}
