import { FiFileText } from "react-icons/fi";
import { IoIosList } from "react-icons/io";
import { PiArrowArcRightLight } from "react-icons/pi";

function ToolBar({
  onFileSelect,
  onToggleThumbnails,
  onRotateLeft,
  onRotateRight,
  onReset,
  onNextPage,
}) {
  return (
    <div className="bg-[#F5F5F5] border-b border-[#E0E0E0]">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="border-r border-[#E0E0E0]">
            <button
              className="w-[80px] h-12 inline-flex items-center justify-center cursor-pointer text-[#6B6B6B] hover:text-[#3b3b3b]"
              aria-label="file select"
              onClick={onFileSelect}
            >
              <FiFileText />
            </button>
            <button
              className="w-[80px] h-12 inline-flex items-center justify-center cursor-pointer text-[#6B6B6B] hover:text-[#3b3b3b]"
              aria-label="hide side bar thumbnails"
              onClick={onToggleThumbnails}
            >
              <IoIosList />
            </button>
          </div>
          <div className="flex items-center">
            <button
              className="size-8 flex items-center justify-center cursor-pointer text-[#6B6B6B] hover:text-[#3b3b3b]"
              aria-label="rotate left"
              onClick={onRotateLeft}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.75 7C1.75 8.03835 2.05791 9.05339 2.63478 9.91674C3.21166 10.7801 4.0316 11.453 4.99091 11.8504C5.95022 12.2477 7.00582 12.3517 8.02422 12.1491C9.04262 11.9466 9.97808 11.4465 10.7123 10.7123C11.4465 9.97808 11.9466 9.04262 12.1491 8.02422C12.3517 7.00582 12.2477 5.95022 11.8504 4.99091C11.453 4.0316 10.7801 3.21166 9.91674 2.63478C9.05339 2.05791 8.03835 1.75 7 1.75C5.53231 1.75552 4.12357 2.32821 3.06833 3.34833L1.75 4.66667"
                  stroke="currentColor"
                  strokeWidth="1.16667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1.75 1.75V4.66667H4.66667"
                  stroke="currentColor"
                  strokeWidth="1.16667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              className="size-8 flex items-center justify-center cursor-pointer text-[#6B6B6B] hover:text-[#3b3b3b]"
              aria-label="rotate right"
              onClick={onRotateRight}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.25 7C12.25 8.03835 11.9421 9.05339 11.3652 9.91674C10.7883 10.7801 9.9684 11.453 9.00909 11.8504C8.04978 12.2477 6.99418 12.3517 5.97578 12.1491C4.95738 11.9466 4.02192 11.4465 3.28769 10.7123C2.55347 9.97808 2.05345 9.04262 1.85088 8.02422C1.64831 7.00582 1.75227 5.95022 2.14963 4.99091C2.54699 4.0316 3.2199 3.21166 4.08326 2.63478C4.94662 2.05791 5.96165 1.75 7 1.75C8.47 1.75 9.87584 2.33333 10.9317 3.34833L12.25 4.66667"
                  stroke="currentColor"
                  strokeWidth="1.16667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.25 1.75V4.66667H9.33337"
                  stroke="currentColor"
                  strokeWidth="1.16667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              className="size-8 flex items-center justify-center cursor-pointer text-[#6B6B6B] hover:text-[#3b3b3b]"
              aria-label="reset changes"
              onClick={onReset}
            >
              <PiArrowArcRightLight strokeWidth={3} />
            </button>
          </div>
        </div>

        <div>
          <button
            className="size-8 flex items-center justify-center cursor-pointer text-[#6B6B6B] hover:text-[#3b3b3b]"
            aria-label="next page"
            onClick={onNextPage}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.91663 2.33398L8.74996 7.00065L2.91663 11.6673V2.33398Z"
                stroke="currentColor"
                stroke-width="1.16667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11.0834 2.91602V11.0827"
                stroke="currentColor"
                stroke-width="1.16667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ToolBar;
