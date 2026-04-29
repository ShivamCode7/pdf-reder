import React from "react";
import img from "../assets/Background+Border+Shadow.png";

function InvoiceCanvas() {
  return (
    <div className="w-full bg-[#EBEBEB] h-[calc(100dvh-147px)] overflow-hidden flex items-center justify-center">
      <div className="h-full overflow-auto w-full">
        <div className="w-fit mx-auto space-y-4 content-center py-6">
          <div className="max-w-[680px]">
            <img src={img} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="max-w-[680px]">
            <img src={img} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoiceCanvas;
