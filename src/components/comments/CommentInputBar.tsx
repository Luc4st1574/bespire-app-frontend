import { useState, useRef } from "react";
import CommentEditor, { CommentEditorRef } from "../editor/CommentEditor";
import { EditorState } from "lexical";
export default function CommentInputBar({
    onSubmit,
    userAvatar,
    scrollToEnd,
    commentCount = 0,
}: {
    onSubmit: (payload: EditorState, html: string, clear: (v: boolean) => void) => void;
    userAvatar: string;
    scrollToEnd?: () => void;
    commentCount?: number;
}) {

    const handleCommentSubmit = (editorState: EditorState, html: string, clear: () => void) => {
        onSubmit(editorState, html, clear);
    };

    return (
        <div className="px-6 py-4 bg-white  sticky bottom-0 z-20">
            <div className="flex items-center justify-between pb-1">
                <div className="text-base font-medium text-[#5E6B66]"></div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={scrollToEnd}
                        className="text-base text-black underline underline-offset-2 cursor-pointer"
                    >
                        View all comments
                    </button>
                    <span className="text-sm text-black font-medium bg-[#E2E6E4] w-5 h-5 flex items-center justify-center rounded-full">
                        {commentCount}
                    </span>
                    <img
                        src="/assets/icons/expand.svg"
                        alt="expand icon"
                        className="cursor-pointer"
                    />
                </div>
            </div>
            <div className="flex items-start gap-2">
                <img
                    src={userAvatar}
                    alt="Your avatar"
                    className="w-8 h-8 rounded-full "
                />

                <div className="flex-1">
                    <CommentEditor onSubmit={handleCommentSubmit}  />
                </div>
            </div>
        </div>
    );
}
