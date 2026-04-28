import React from "react";
import { GoPencil } from "react-icons/go";

function FileBar() {
  return (
    <div className="flex items-center justify-between py-1 px-4">
      <div className="flex items-center justify-between gap-3">
        <div>Extinguisher Purchase Invoice.pdf</div>
        <span className="h-5 w-px bg-[#8C8C8C]"></span>
        <div className="flex items-center gap-2">
          <span>Document type: Invoice</span>
          <button className="cursor-pointer">
            <GoPencil />
          </button>
        </div>
      </div>

      <div className="flex gap-3">
        <button className="py-2">Cancel</button>
        <button className="py-2 px-8 border border-[#0059FF]">Save changes</button>
        <button className="py-2 px-6 bg-[#000000] text-white cursor-pointer">Submit</button>
      </div>

    </div>
  );
}

export default FileBar;
