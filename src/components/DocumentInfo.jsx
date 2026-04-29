import React from "react";
import { IoCloseOutline } from "react-icons/io5";

function DocumentInfo() {
  return (
    <div className="fixed w-full h-full flex justify-end top-0 right-0 pt-12 z-50 hidden">
      <div className="h-full bg-white max-w-[300px] shrink-0 w-full">
        <div className="p-4 flex items-center justify-between border-b border-[#E0E0E0]">
          <div className="font-semibold">Document Info</div>
          <button className="cursor-pointer" aria-label="close">
            <IoCloseOutline />
          </button>
        </div>

        <div className="p-4">
          <div className="py-3 border-b border-[#E0E0E0] space-y-1">
            <div className="text-xs text-[#6B6B6B]">Document Name</div>
            <div className="text-[#212121] text-sm">Extinguisher Purchase Invoice.pdf</div>
          </div>
          <div className="py-3 border-b border-[#E0E0E0] space-y-1">
            <div className="text-xs text-[#6B6B6B]">Document Type</div>
            <div className="text-[#212121] text-sm">Invoice</div>
          </div>
          <div className="py-3 border-b border-[#E0E0E0] space-y-1">
            <div className="text-xs text-[#6B6B6B]">Document ID</div>
            <div className="text-[#212121] text-sm">1020394</div>
          </div>
          <div className="py-3 border-b border-[#E0E0E0] space-y-1">
            <div className="text-xs text-[#6B6B6B]">Invoice Date</div>
            <div className="text-[#212121] text-sm">05-27-2020</div>
          </div>
          <div className="py-3 border-b border-[#E0E0E0] space-y-1">
            <div className="text-xs text-[#6B6B6B]">Due Date</div>
            <div className="text-[#212121] text-sm">Whenever</div>
          </div>
          <div className="py-3 border-b border-[#E0E0E0] space-y-1">
            <div className="text-xs text-[#6B6B6B]">PO No</div>
            <div className="text-[#212121] text-sm">2039475</div>
          </div>
          <div className="py-3 border-b border-[#E0E0E0] space-y-1">
            <div className="text-xs text-[#6B6B6B]">Account No</div>
            <div className="text-[#212121] text-sm">B-4059403</div>
          </div>
          <div className="py-3 border-b border-[#E0E0E0] space-y-1">
            <div className="text-xs text-[#6B6B6B]">Status</div>
            <div className="text-[#212121] text-sm">Pending Review</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocumentInfo;
