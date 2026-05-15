import { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { LuPlus } from "react-icons/lu";
import { getRelativeTime } from "../lib/time";

function Notes({ isOpen, onClose, notes, onAddNote }) {
  const [noteText, setNoteText] = useState("");
  const [now, setNow] = useState(0);
  const latestNoteTime = Math.max(0, ...notes.map((note) => note.createdAt));
  const currentTime = now || latestNoteTime;

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

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddNote(noteText);
    setNoteText("");
  };

  return (
    <div
      className={`fixed w-full h-full justify-end top-0 right-0 pt-12 z-50 bg-black/20 ${isOpen ? "flex" : "hidden"}`}
      onClick={onClose}
    >
      <div className="h-full bg-white max-w-[300px] shrink-0 w-full" onClick={(event) => event.stopPropagation()}>
        <div className="p-4 flex items-center justify-between border-b border-[#E0E0E0]">
          <div className="font-semibold">
            Notes <span>({notes.length})</span>
          </div>
          <button className="cursor-pointer" aria-label="close" onClick={onClose}>
            <IoCloseOutline />
          </button>
        </div>

        <div>
          <form className="p-4 space-y-3" onSubmit={handleSubmit}>
            <textarea
              className="min-h-[77px] w-full border border-[#E0E0E0] outline-none resize-none px-2 py-1 text-sm"
              placeholder="Write a note..."
              value={noteText}
              onChange={(event) => setNoteText(event.target.value)}
            ></textarea>
            <button
              type="submit"
              className="py-2 px-4 bg-[#0059FF] flex items-center gap-2 cursor-pointer text-white text-sm border-none outline-none"
            >
              <LuPlus /> Add Note
            </button>
          </form>

          <div className="h-[calc(100dvh-225px)] overflow-auto">
            {notes.map((note, index) => (
              <div key={note.id} className={`p-4 space-y-2 ${index !== notes.length - 1 ? "border-b border-[#E0E0E0]" : ""}`}>
                <div className="font-medium text-xs text-[#212121] leading-[22px]">{note.text}</div>
                <div className="text-xs font-medium leading-[16px] text-[#6B6B6B]">{getRelativeTime(note.createdAt, currentTime)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notes;
