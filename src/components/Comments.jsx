import { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { getRelativeTime } from "../lib/time";

function Comments({ isOpen, onClose, comments }) {
  const [now, setNow] = useState(0);
  const latestCommentTime = Math.max(0, ...comments.map((comment) => comment.createdAt));
  const currentTime = now || latestCommentTime;

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setNow(Date.now());
    }, 0);
    const intervalId = window.setInterval(() => {
      setNow(Date.now());
    }, 5000);

    return () => {
      window.clearTimeout(timeoutId);
      window.clearInterval(intervalId);
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed w-full h-full justify-end top-0 right-0 pt-12 z-50 bg-black/20 ${isOpen ? "flex" : "hidden"}`}
      onClick={onClose}
    >
      <div className="h-full bg-white max-w-[300px] shrink-0 w-full" onClick={(event) => event.stopPropagation()}>
        <div className="p-4 flex items-center justify-between border-b border-[#E0E0E0]">
          <div className="font-semibold">Comments <span>({comments.length})</span></div>
          <button className="cursor-pointer" aria-label="close" onClick={onClose}>
            <IoCloseOutline />
          </button>
        </div>

        <div className="h-[calc(100%-57px)] overflow-auto">
          {comments.map((comment, index) => (
            <div key={comment.id} className={`flex gap-3 p-4 ${index !== comments.length - 1 ? "border-b border-[#E0E0E0]" : ""}`}>
              <div className="text-[10px] size-8 bg-[#EDEDED] rounded-full shrink-0 flex items-center justify-center text-[#212121] font-normal">
                {comment.initials}
              </div>

              <div className="min-w-0">
                <div className="flex justify-between gap-2">
                  <div className="text-xs font-semibold text-[#212121]">
                    {comment.author}
                  </div>
                  <div className="shrink-0 text-[10px] text-[#6B6B6B] font-medium">
                    {getRelativeTime(comment.createdAt, currentTime)}
                  </div>
                </div>
                <p className="text-xs text-[#6B6B6B] font-medium leading-[22px] mt-1">
                  {comment.text}
                </p>
                {comment.selectedText && (
                  <div className="mt-2 border-l-2 border-[#0F62FE] bg-[#F5F8FF] px-2 py-1 text-[10px] leading-[16px] text-[#525252]">
                    Page {comment.pageNumber}: {comment.selectedText}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Comments;
