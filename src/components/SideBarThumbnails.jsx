import { useEffect, useRef, useState } from 'react'
import img from '../assets/Background+Border+Shadow.png'

function PdfThumbnail({ pdfDocument, page }) {
  const canvasRef = useRef(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (!pdfDocument || !canvasRef.current) {
      return undefined
    }

    let renderTask = null
    let isCancelled = false
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    setFailed(false)

    pdfDocument
      .getPage(page)
      .then((pdfPage) => {
        if (isCancelled) {
          return undefined
        }

        const baseViewport = pdfPage.getViewport({ scale: 1 })
        const scale = 124 / baseViewport.width
        const viewport = pdfPage.getViewport({ scale })
        const outputScale = window.devicePixelRatio || 1

        canvas.width = Math.floor(viewport.width * outputScale)
        canvas.height = Math.floor(viewport.height * outputScale)
        canvas.style.width = `${viewport.width}px`
        canvas.style.height = `${viewport.height}px`
        context.setTransform(outputScale, 0, 0, outputScale, 0, 0)
        context.clearRect(0, 0, viewport.width, viewport.height)

        renderTask = pdfPage.render({ canvasContext: context, viewport })
        return renderTask.promise
      })
      .catch((error) => {
        if (!isCancelled && error?.name !== 'RenderingCancelledException') {
          setFailed(true)
        }
      })

    return () => {
      isCancelled = true

      if (renderTask) {
        renderTask.cancel()
      }
    }
  }, [page, pdfDocument])

  if (failed) {
    return <div className='text-xs text-[#6B6B6B]'>Preview failed</div>
  }

  return <canvas ref={canvasRef} aria-label={`PDF thumbnail ${page}`} />
}

function SideBarThumbnails({ pages, currentPage, onSelectPage, pdfDocument }) {
  return (
    <div className='bg-[#F5F5F5] w-[160px] shrink-0 p-4 h-[calc(100dvh-98px)] overflow-hidden'>
      <div className='h-full overflow-auto space-y-3'>
        {pages.map((page) => (
          <button
            key={page}
            className='w-full inline-flex flex-col items-center justify-center border-none outline-none cursor-pointer'
            onClick={() => onSelectPage(page)}
            aria-label={`page ${page}`}
          >
            <div className={`flex items-center justify-center border-2 min-h-[160px] w-full bg-white ${currentPage === page ? 'border-blue-600' : 'border-transparent'}`}>
              {pdfDocument ? (
                <PdfThumbnail pdfDocument={pdfDocument} page={page} />
              ) : (
                <img src={img} alt='' className='w-full h-full object-cover' />
              )}
            </div>
            <div className='text-sm text-gray-500'>{page}</div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default SideBarThumbnails
