import React from "react";
import { IoCloseOutline } from "react-icons/io5";

function Comments() {
  return (
    <div className="fixed w-full h-full flex justify-end top-0 right-0 pt-12 z-50">
      <div className="h-full bg-white max-w-[300px] shrink-0 w-full">
        <div className="p-4 flex items-center justify-between border-b border-[#E0E0E0]">
          <div className="font-semibold">Document Info</div>
          <button className="cursor-pointer" aria-label="close">
            <IoCloseOutline />
          </button>
        </div>

        <div className="">
          <div className="flex gap-3 p-4 border-b border-[#E0E0E0]">
            <div className="text-[10px] size-8 bg-[#EDEDED] rounded-full shrink-0 flex items-center justify-center text-[#212121] font-normal">
              BR
            </div>

            <div>
              <div className="flex justify-between">
                <div className="text-xs font-semibold text-[#212121]">
                  Dr. B Ramesh
                </div>
                <div className="text-[10px] text-[#6B6B6B] font-medium">
                  2 hours ago
                </div>
              </div>
              <p className="text-xs text-[#6B6B6B] font-medium leading-[22px] mt-1">
                Please verify the quantity for SKU LB39282WED. It seems lower
                than usual.
              </p>
            </div>
          </div>
          <div className="flex gap-3 p-4">
            <div className="text-[10px] size-8 bg-[#EDEDED] rounded-full shrink-0 flex items-center justify-center text-[#212121] font-normal">
              BR
            </div>

            <div>
              <div className="flex justify-between">
                <div className="text-xs font-semibold text-[#212121]">
                  Dr. B Ramesh
                </div>
                <div className="text-[10px] text-[#6B6B6B] font-medium">
                  2 hours ago
                </div>
              </div>
              <p className="text-xs text-[#6B6B6B] font-medium leading-[22px] mt-1">
                Please verify the quantity for SKU LB39282WED. It seems lower
                than usual.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comments;
