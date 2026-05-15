import { useEffect, useRef, useState } from "react";
import img from "../assets/Background+Border+Shadow.png";
import { IoCloseOutline } from "react-icons/io5";
import { pdfjsLib } from "../lib/pdf";
import { formatClockTime } from "../lib/time";

function PdfPageCanvas({
  pageNumber,
  zoom,
  rotation,
  pdfDocument,
  textEdits,
  comments,
  setActiveTextId,
  commentTarget,
  setCommentTarget,
  showCommentBox,
  setShowCommentBox,
  commentText,
  setCommentText,
  onTextEdit,
  onAddComment,
  clockTime,
}) {
  const canvasRef = useRef(null);
  const commentBoxRef = useRef(null);
  const commentTextareaRef = useRef(null);
  const textLayerRef = useRef(null);
  const [renderError, setRenderError] = useState("");
  const [textItems, setTextItems] = useState([]);
  const [pageSize, setPageSize] = useState({ width: 0, height: 0 });
  const normalizedRotation = ((rotation % 360) + 360) % 360;
  const isSideways = normalizedRotation % 180 !== 0;
  const shellSize = {
    width: isSideways ? pageSize.height : pageSize.width,
    height: isSideways ? pageSize.width : pageSize.height,
  };

  useEffect(() => {
    if (!pdfDocument || !canvasRef.current) {
      return undefined;
    }

    let renderTask = null;
    let isCancelled = false;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    setRenderError("");

    pdfDocument
      .getPage(pageNumber)
      .then((page) => {
        if (isCancelled) {
          return undefined;
        }

        const viewport = page.getViewport({ scale: 1.25 * zoom });
        const outputScale = window.devicePixelRatio || 1;

        canvas.width = Math.floor(viewport.width * outputScale);
        canvas.height = Math.floor(viewport.height * outputScale);
        canvas.style.width = `${viewport.width}px`;
        canvas.style.height = `${viewport.height}px`;
        setPageSize({ width: viewport.width, height: viewport.height });

        context.setTransform(outputScale, 0, 0, outputScale, 0, 0);
        context.clearRect(0, 0, viewport.width, viewport.height);

        renderTask = page.render({ canvasContext: context, viewport });
        return Promise.all([renderTask.promise, page.getTextContent()]).then(([, textContent]) => {
          if (isCancelled) {
            return;
          }

          setTextItems(
            textContent.items
              .map((item, index) => {
                const transform = pdfjsLib.Util.transform(viewport.transform, item.transform);
                const fontHeight = Math.hypot(transform[2], transform[3]);
                const width = Math.max(item.width * viewport.scale, 12);
                const height = Math.max(fontHeight, 8);
                const pdfFontSize = Math.max(Math.hypot(item.transform[2], item.transform[3]), Math.abs(item.transform[3]), 6);

                return {
                  id: `${pageNumber}-${index}`,
                  str: item.str,
                  pageNumber,
                  left: transform[4],
                  top: transform[5] - height,
                  width,
                  height,
                  fontSize: height,
                  fontFamily: item.fontName || "sans-serif",
                  pdfX: item.transform[4],
                  pdfY: item.transform[5],
                  pdfWidth: Math.max(item.width, 12),
                  pdfHeight: pdfFontSize,
                  pdfFontSize,
                };
              })
              .filter((item) => item.str.trim())
          );
        });
      })
      .catch((error) => {
        if (!isCancelled && error?.name !== "RenderingCancelledException") {
          setRenderError("Page render nahi ho paaya");
          setTextItems([]);
        }
      });

    return () => {
      isCancelled = true;

      if (renderTask) {
        renderTask.cancel();
      }
    };
  }, [pageNumber, pdfDocument, zoom]);

  const handlePost = () => {
    onAddComment(commentText, commentTarget);
    setCommentText("");
    setShowCommentBox(false);
    setCommentTarget(null);
  };

  const handleEditBlur = (item, event) => {
    setActiveTextId(null);
    onTextEdit(item, event.currentTarget.innerText);

    window.setTimeout(() => {
      const nextElement = document.activeElement;
      const isCommentFocus = commentBoxRef.current?.contains(nextElement);
      const isTextFocus = textLayerRef.current?.contains(nextElement);

      if (!isCommentFocus && !isTextFocus) {
        setShowCommentBox(false);
      }
    }, 0);
  };

  const openCommentBox = (item, selectionRect = null, selectedText = "") => {
    const popupWidth = 305;
    const targetLeft = selectionRect ? selectionRect.left : item.left + 2;
    const targetTop = selectionRect ? selectionRect.top + selectionRect.height : item.top + item.height;
    const left = Math.min(targetLeft, Math.max(pageSize.width - popupWidth - 12, 0));
    const top = Math.max(targetTop + 8, 0);

    setShowCommentBox(true);
    setCommentTarget({
      id: item.id,
      pageNumber: item.pageNumber,
      text: selectedText || textEdits[item.id]?.value || item.str,
      left,
      top,
      selectionRect,
      openedAt: clockTime,
    });
  };

  const captureTextSelection = (item, element) => {
    const selection = window.getSelection();

    if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
      return;
    }

    const selectedText = selection.toString().trim();

    if (!selectedText || !element.contains(selection.anchorNode) || !element.contains(selection.focusNode)) {
      return;
    }

    const range = selection.getRangeAt(0);
    const selectionBounds = range.getBoundingClientRect();
    const pageBounds = textLayerRef.current?.getBoundingClientRect();

    if (!pageBounds || selectionBounds.width === 0 || selectionBounds.height === 0) {
      return;
    }

    const selectionRect = {
      left: selectionBounds.left - pageBounds.left,
      top: selectionBounds.top - pageBounds.top,
      width: selectionBounds.width,
      height: selectionBounds.height,
    };

    setActiveTextId(item.id);
    openCommentBox(item, selectionRect, selectedText);
  };

  const handleMentionClick = () => {
    const textarea = commentTextareaRef.current;
    const mention = "@";

    if (!textarea) {
      setCommentText((value) => `${value}${mention}`);
      return;
    }

    const start = textarea.selectionStart ?? commentText.length;
    const end = textarea.selectionEnd ?? commentText.length;
    const nextValue = `${commentText.slice(0, start)}${mention}${commentText.slice(end)}`;
    const nextCursor = start + mention.length;

    setCommentText(nextValue);
    window.requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(nextCursor, nextCursor);
    });
  };

  return (
    <div
      className="flex items-center justify-center transition-[width,height] duration-300 ease-out"
      style={{ width: shellSize.width, height: shellSize.height }}
    >
      <div
        className="relative bg-white shadow transition-transform duration-300 ease-out"
        style={{
          width: pageSize.width,
          height: pageSize.height,
          transform: `rotate(${rotation}deg)`,
        }}
      >
        <canvas ref={canvasRef} className="block" aria-label={`PDF page ${pageNumber}`} />
        <div className="pointer-events-none absolute inset-0">
          {comments
            .filter((comment) => comment.pageNumber === pageNumber && comment.selectionRect)
            .map((comment) => (
              <span
                key={comment.id}
                className="absolute bg-[#FFE86A] mix-blend-multiply"
                style={{
                  left: comment.selectionRect.left,
                  top: comment.selectionRect.top,
                  width: comment.selectionRect.width,
                  height: comment.selectionRect.height,
                }}
              />
            ))}
          {commentTarget?.pageNumber === pageNumber && commentTarget.selectionRect && (
            <span
              className="absolute bg-[#FFE86A] mix-blend-multiply"
              style={{
                left: commentTarget.selectionRect.left,
                top: commentTarget.selectionRect.top,
                width: commentTarget.selectionRect.width,
                height: commentTarget.selectionRect.height,
              }}
            />
          )}
        </div>
        <div ref={textLayerRef} className="absolute inset-0">
          {textItems.map((item) => {
            const editedValue = textEdits[item.id];
            const displayValue = editedValue?.value || item.str;
            const editClassName = editedValue ? "bg-white text-[#111827]" : "text-transparent";

            return (
              <span
                key={item.id}
                contentEditable
                suppressContentEditableWarning
                spellCheck="false"
                role="textbox"
                tabIndex={0}
                className={`absolute block cursor-text whitespace-pre px-px outline-none selection:bg-[#FFE86A] selection:text-[#111827] ${editClassName}`}
                style={{
                  left: item.left,
                  top: item.top,
                  width: item.width,
                  minHeight: item.height,
                  fontSize: item.fontSize,
                  fontFamily: item.fontFamily,
                  lineHeight: `${item.height}px`,
                }}
                onFocus={(event) => {
                  if (editedValue?.value) {
                    event.currentTarget.innerText = editedValue.value;
                  }
                }}
                onBlur={(event) => handleEditBlur(item, event)}
                onMouseUp={(event) => captureTextSelection(item, event.currentTarget)}
                onKeyUp={(event) => captureTextSelection(item, event.currentTarget)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    event.currentTarget.blur();
                  }
                }}
              >
                {displayValue}
              </span>
            );
          })}
        </div>
        {showCommentBox && commentTarget?.pageNumber === pageNumber && (
          <div
            ref={commentBoxRef}
            className="absolute z-40 w-[305px] rounded-lg border border-[#909090] bg-white p-4 shadow-lg backdrop-blur-[1px]"
            style={{ left: commentTarget.left, top: commentTarget.top }}
          >
            <span className="absolute -top-[9px] left-10 h-4 w-4 rotate-45 border-l border-t border-[#909090] bg-white"></span>
            <div className="relative flex items-center justify-between">
              <div className="flex min-w-0 items-center gap-1">
                <span className="text-[12px] font-semibold leading-[24px] text-[#525252]">Krishna Kumar</span>
                <span className="text-[12px] font-normal leading-[24px] text-[#525252]">
                  {clockTime || commentTarget.openedAt ? formatClockTime(clockTime || commentTarget.openedAt) : "--:--"}
                </span>
              </div>
              <button
                className="text-[20px] font-normal leading-[24px] text-[#525252] cursor-pointer"
                onClick={() => {
                  setShowCommentBox(false);
                  setCommentTarget(null);
                  setCommentText("");
                }}
                aria-label="close comment box"
              >
                <IoCloseOutline />
              </button>
            </div>
            <div className="relative mt-3 flex h-[100px] flex-col rounded-lg border border-[#0F62FE] bg-transparent p-2">
              <textarea
                ref={commentTextareaRef}
                className="h-full w-full resize-none bg-transparent p-0 text-[12px] font-medium text-[#525252] outline-none placeholder:text-[#C6C6C6]"
                placeholder="Comment or Tag People using @"
                value={commentText}
                onChange={(event) => setCommentText(event.target.value)}
              ></textarea>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  className="text-[12px] font-semibold leading-[24px] text-[#525252] cursor-pointer"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={handleMentionClick}
                >
                  @
                </button>
                <div className="flex items-center gap-4">
                  <button
                    className="text-[12px] font-semibold leading-[24px] text-[#525252] cursor-pointer"
                    onClick={() => {
                      setShowCommentBox(false);
                      setCommentTarget(null);
                      setCommentText("");
                    }}
                  >
                    Cancel
                  </button>
                  <button className="text-[12px] font-semibold leading-[24px] text-[#0F62FE] cursor-pointer" onClick={handlePost}>Post</button>
                </div>
              </div>
            </div>
          </div>
        )}
        {renderError && (
          <div className="mt-3 bg-white px-4 py-3 text-sm text-red-600 shadow">
            {renderError}
          </div>
        )}
      </div>
    </div>
  );
}

function InvoiceCanvas({
  currentPage,
  pageCount,
  zoom,
  rotation,
  onAddComment,
  pdfDocument,
  isPdfLoading,
  pdfError,
  textEdits,
  comments,
  onTextEdit,
  onPageInView,
}) {
  const scrollRef = useRef(null);
  const pageRefs = useRef({});
  const visiblePageRef = useRef(currentPage);
  const previousViewRef = useRef({ currentPage, zoom, rotation });
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [clockTime, setClockTime] = useState(0);
  const [, setActiveTextId] = useState(null);
  const [commentTarget, setCommentTarget] = useState(null);
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setClockTime(Date.now());
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  const centerPageInView = (pageElement, behavior = "smooth") => {
    pageElement.scrollIntoView({ behavior, block: "center", inline: "center" });
  };

  useEffect(() => {
    const pageElement = pageRefs.current[currentPage];
    const previousView = previousViewRef.current;
    const didViewChange = previousView.zoom !== zoom || previousView.rotation !== rotation;
    const didPageChange = visiblePageRef.current !== currentPage;

    previousViewRef.current = { currentPage, zoom, rotation };

    if (!pageElement || (!didPageChange && !didViewChange)) {
      return undefined;
    }

    visiblePageRef.current = currentPage;
    const animationFrameId = window.requestAnimationFrame(() => {
      centerPageInView(pageElement);
    });

    const timeoutId = window.setTimeout(() => {
      centerPageInView(pageElement);
    }, 320);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.clearTimeout(timeoutId);
    };
  }, [currentPage, zoom, rotation]);

  const handleScroll = () => {
    const scrollElement = scrollRef.current;

    if (!scrollElement) {
      return;
    }

    const containerTop = scrollElement.getBoundingClientRect().top;
    let nearestPage = visiblePageRef.current;
    let nearestDistance = Number.POSITIVE_INFINITY;

    pages.forEach((page) => {
      const pageElement = pageRefs.current[page];

      if (!pageElement) {
        return;
      }

      const distance = Math.abs(pageElement.getBoundingClientRect().top - containerTop - 24);

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestPage = page;
      }
    });

    if (nearestPage !== visiblePageRef.current) {
      visiblePageRef.current = nearestPage;
      onPageInView(nearestPage);
    }
  };

  return (
    <div className="w-full bg-[#EBEBEB] h-[calc(100dvh-98px)] overflow-hidden">
      <div ref={scrollRef} className="h-full overflow-auto w-full scroll-smooth" onScroll={handleScroll}>
        <div className="relative mx-auto w-fit min-w-max space-y-10 px-10 py-10">
          {isPdfLoading && (
            <div className="min-h-[520px] w-[680px] bg-white flex items-center justify-center text-sm text-[#6B6B6B] shadow">
              PDF loading...
            </div>
          )}

          {!isPdfLoading && pdfDocument && pages.map((page) => (
            <div
              key={page}
              ref={(element) => {
                if (element) {
                  pageRefs.current[page] = element;
                } else {
                  delete pageRefs.current[page];
                }
              }}
              data-page-number={page}
              className="flex justify-center scroll-mt-10 transition-[width,height] duration-300 ease-out"
            >
              <PdfPageCanvas
                pageNumber={page}
                zoom={zoom}
                rotation={rotation}
                pdfDocument={pdfDocument}
                textEdits={textEdits}
                comments={comments}
                setActiveTextId={setActiveTextId}
                commentTarget={commentTarget}
                setCommentTarget={setCommentTarget}
                showCommentBox={showCommentBox}
                setShowCommentBox={setShowCommentBox}
                commentText={commentText}
                setCommentText={setCommentText}
                onTextEdit={onTextEdit}
                onAddComment={onAddComment}
                clockTime={clockTime}
              />
            </div>
          ))}

          {!isPdfLoading && !pdfDocument && pages.map((page) => (
            <div
              key={page}
              ref={(element) => {
                if (element) {
                  pageRefs.current[page] = element;
                } else {
                  delete pageRefs.current[page];
                }
              }}
              className="flex justify-center scroll-mt-10"
              style={{
                width: rotation % 180 === 0 ? 680 * zoom : 880 * zoom,
                height: rotation % 180 === 0 ? 880 * zoom : 680 * zoom,
              }}
            >
              <img
                src={img}
                alt={`Invoice page ${page}`}
                className="h-[880px] w-[680px] origin-center object-cover shadow transition-transform duration-300 ease-out"
                style={{ transform: `scale(${zoom}) rotate(${rotation}deg)` }}
              />
            </div>
          ))}

          {pdfError && (
            <div className="mt-3 bg-white px-4 py-3 text-sm text-red-600 shadow">
              {pdfError}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default InvoiceCanvas;
