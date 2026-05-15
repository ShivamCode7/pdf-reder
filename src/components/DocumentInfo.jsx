import { IoCloseOutline } from "react-icons/io5";

function DocumentInfo({ isOpen, onClose, document }) {
  const rows = [
    ["Document Name", document.fileName],
    ["Document Type", document.documentType],
    ["Document ID", document.documentId],
    ["Invoice Date", document.invoiceDate],
    ["Due Date", document.dueDate],
    ["PO No", document.poNo],
    ["Account No", document.accountNo],
    ["Status", document.status],
  ];

  return (
    <div
      className={`fixed w-full h-full justify-end top-0 right-0 pt-12 z-50 bg-black/20 ${isOpen ? "flex" : "hidden"}`}
      onClick={onClose}
    >
      <div className="h-full bg-white max-w-[300px] shrink-0 w-full" onClick={(event) => event.stopPropagation()}>
        <div className="p-4 flex items-center justify-between border-b border-[#E0E0E0]">
          <div className="font-semibold">Document Info</div>
          <button className="cursor-pointer" aria-label="close" onClick={onClose}>
            <IoCloseOutline />
          </button>
        </div>

        <div className="p-4">
          {rows.map(([label, value]) => (
            <div key={label} className="py-3 border-b border-[#E0E0E0] space-y-1">
              <div className="text-xs text-[#6B6B6B]">{label}</div>
              <div className="text-[#212121] text-sm break-words">{value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DocumentInfo;
