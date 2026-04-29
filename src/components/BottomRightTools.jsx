import React from "react";
import { BiCommentDetail, BiRotateLeft } from "react-icons/bi";
import { GrZoomIn, GrZoomOut } from "react-icons/gr";
import { IoSettingsOutline } from "react-icons/io5";
import { LuBookText } from "react-icons/lu";
import { TbFileSettings } from "react-icons/tb";
import DocumentInfo from "./DocumentInfo";
import Comments from "./Comments";

function BottomRightTools() {
  return (
    <>
    <DocumentInfo />
    <Comments />
      <div className="flex flex-col justify-between">
        <div className="flex flex-col">
          <button className="size-12 flex items-center justify-center cursor-pointer">
            <TbFileSettings strokeWidth={1.3} />
          </button>
          <button className="size-12 flex items-center justify-center cursor-pointer">
            <BiCommentDetail />
          </button>
          <button className="size-12 flex items-center justify-center cursor-pointer">
            <LuBookText />
          </button>
        </div>

        <div className="flex flex-col">
          <button className="size-12 flex items-center justify-center cursor-pointer">
            <input
              type="text"
              className="h-8 w-8 outline-none border border-gray-700 rounded-md text-center"
              value={1}
            />
          </button>
          <button className="size-12 flex items-center justify-center cursor-pointer">
            2
          </button>
          <button
            aria-label="zoom resert"
            className="size-12 flex items-center justify-center cursor-pointer"
          >
            <BiRotateLeft className="-rotate-45 inline-block" />
          </button>
          <button
            aria-label="zoom in"
            className="size-12 flex items-center justify-center cursor-pointer"
          >
            <GrZoomIn />
          </button>
          <button
            aria-label="zoom out"
            className="size-12 flex items-center justify-center cursor-pointer"
          >
            <GrZoomOut />
          </button>
          <button
            aria-label="settings"
            className="size-12 flex items-center justify-center cursor-pointer"
          >
            <IoSettingsOutline />
          </button>
        </div>
      </div>
    </>
  );
}

export default BottomRightTools;
