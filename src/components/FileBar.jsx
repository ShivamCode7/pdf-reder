import { useState } from "react";
import { GoPencil } from "react-icons/go";

function FileBar({
  fileName,
  onFileNameChange,
  documentType,
  onDocumentTypeChange,
  showActions,
  onCancel,
  onSave,
  onSubmit,
}) {
  const [isEditingFileName, setIsEditingFileName] = useState(false);
  const [isEditingType, setIsEditingType] = useState(false);

  return (
    <div className="flex items-center justify-between py-1 px-4 h-[50px]">
      <div className="flex items-center justify-between gap-3">
        <div className="flex max-w-[380px] items-center gap-2">
          {isEditingFileName ? (
            <input
              className="h-8 w-[300px] border border-[#BDBDBD] px-2 outline-none"
              value={fileName}
              autoFocus
              onChange={(event) => onFileNameChange(event.target.value)}
              onBlur={() => setIsEditingFileName(false)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  setIsEditingFileName(false);
                }
              }}
            />
          ) : (
            <div className="max-w-[340px] truncate text-left" title={fileName}>
              {fileName}
            </div>
          )}
          <button
            aria-label="edit document name"
            className="cursor-pointer"
            onClick={() => setIsEditingFileName(true)}
          >
            <GoPencil />
          </button>
        </div>
        <span className="h-5 w-px bg-[#8C8C8C]"></span>
        <div className="flex items-center gap-2">
          <span>Document type:</span>
          {isEditingType ? (
            <input
              className="h-8 w-[130px] border border-[#BDBDBD] px-2 outline-none"
              value={documentType}
              autoFocus
              onChange={(event) => onDocumentTypeChange(event.target.value)}
              onBlur={() => setIsEditingType(false)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  setIsEditingType(false);
                }
              }}
            />
          ) : (
            <span>{documentType}</span>
          )}
          <button
            aria-label="edit document type"
            className="cursor-pointer"
            onClick={() => setIsEditingType(true)}
          >
            <GoPencil />
          </button>
        </div>
      </div>

      {showActions && (
        <div className="flex gap-3">
          <button aria-label="cancel pdf" className="py-2 cursor-pointer" onClick={onCancel}>Cancel</button>
          <button aria-label="save changes" className="py-2 px-8 border border-[#0059FF] cursor-pointer" onClick={onSave}>Save changes</button>
          <button aria-label="submit pdf" className="py-2 px-6 bg-[#000000] text-white cursor-pointer" onClick={onSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
}

export default FileBar;
