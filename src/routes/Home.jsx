import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ToolBar from '../components/ToolBar'
import FileBar from '../components/FileBar'
import InvoiceCanvas from '../components/InvoiceCanvas'
import BottomRightTools from '../components/BottomRightTools'
import SideBarThumbnails from '../components/SideBarThumbnails'
import { pdfjsLib } from '../lib/pdf'
import { normalizePdfText } from '../lib/pdfText'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

const INITIAL_NOW = new Date('2026-05-02T01:07:00+05:30').getTime()

function Home() {
  const fileInputRef = useRef(null)
  const [pageCount, setPageCount] = useState(2)
  const pages = useMemo(() => Array.from({ length: pageCount }, (_, index) => index + 1), [pageCount])
  const [fileName, setFileName] = useState('Extinguisher Purchase Invoice.pdf')
  const [savedFileName, setSavedFileName] = useState('Extinguisher Purchase Invoice.pdf')
  const [documentType, setDocumentType] = useState('Invoice')
  const [currentPage, setCurrentPage] = useState(1)
  const [showThumbnails, setShowThumbnails] = useState(true)
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [pdfData, setPdfData] = useState(null)
  const [pdfDocument, setPdfDocument] = useState(null)
  const [isPdfLoading, setIsPdfLoading] = useState(false)
  const [pdfError, setPdfError] = useState('')
  const [textEdits, setTextEdits] = useState({})
  const [, setUndoStack] = useState([])
  const [, setRedoStack] = useState([])
  const [activePanel, setActivePanel] = useState(null)
  const [statusMessage, setStatusMessage] = useState('')
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'Dr. B Ramesh',
      initials: 'BR',
      createdAt: INITIAL_NOW - 2 * 60 * 60 * 1000,
      text: 'Please verify the quantity for SKU LB39282WED. It seems lower than usual.',
    },
    {
      id: 2,
      author: 'Krishna Kumar',
      initials: 'KK',
      createdAt: INITIAL_NOW - 56 * 60 * 1000,
      text: 'Vendor GST details match the purchase order.',
    },
  ])
  const hasDocumentNameEdit = fileName.trim() !== savedFileName
  const isVariationModeActive = Object.keys(textEdits).length > 0
  const showFileActions = hasDocumentNameEdit || isVariationModeActive
  const [notes, setNotes] = useState([
    {
      id: 1,
      text: 'Follow up with vendor on shipping terms for next quarter.',
      createdAt: INITIAL_NOW - 31 * 60 * 1000,
    },
    {
      id: 2,
      text: 'Confirm extinguisher count before final approval.',
      createdAt: INITIAL_NOW - 16 * 60 * 1000,
    },
  ])

  const showStatus = useCallback((message) => {
    setStatusMessage(message)
    window.setTimeout(() => setStatusMessage(''), 2200)
  }, [])

  useEffect(() => {
    if (!pdfData) {
      return undefined
    }

    let isCancelled = false
    const loadingTask = pdfjsLib.getDocument({ data: Uint8Array.from(pdfData) })

    loadingTask.promise
      .then((document) => {
        if (isCancelled) {
          document.destroy()
          return
        }

        setPdfDocument(document)
        setPageCount(document.numPages)
        setCurrentPage(1)
        setTextEdits({})
        setUndoStack([])
        setRedoStack([])
        showStatus('PDF loaded')
      })
      .catch(() => {
        if (isCancelled) {
          return
        }

        setPdfDocument(null)
        setPdfError('PDF load nahi ho paaya')
        showStatus('PDF load nahi ho paaya')
      })
      .finally(() => {
        if (!isCancelled) {
          setIsPdfLoading(false)
        }
      })

    return () => {
      isCancelled = true
      loadingTask.destroy()
    }
  }, [pdfData, showStatus])

  const goToPage = (page) => {
    const nextPage = Math.min(Math.max(Number(page) || 1, 1), pages.length)
    setCurrentPage(nextPage)
  }

  const goToNextPage = () => {
    setCurrentPage((page) => (page === pages.length ? 1 : page + 1))
  }

  const addComment = (text, target) => {
    const cleanText = text.trim()

    if (!cleanText) {
      return
    }

    setComments((items) => [
      {
        id: Date.now(),
        author: 'Krishna Kumar',
        initials: 'KK',
        createdAt: Date.now(),
        text: cleanText,
        selectedText: target?.text || '',
        pageNumber: target?.pageNumber,
        textId: target?.id,
        selectionRect: target?.selectionRect,
      },
      ...items,
    ])
    showStatus('Comment posted')
  }

  const addNote = (text) => {
    const cleanText = text.trim()

    if (!cleanText) {
      return
    }

    setNotes((items) => [
      {
        id: Date.now(),
        text: cleanText,
        createdAt: Date.now(),
      },
      ...items,
    ])
    showStatus('Note added')
  }

  const handleFileSelect = async (file) => {
    setFileName(file.name)
    setSavedFileName(file.name)

    if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
      const buffer = await file.arrayBuffer()
      const bytes = new Uint8Array(buffer)
      setPdfDocument(null)
      setPdfError('')
      setIsPdfLoading(true)
      setUndoStack([])
      setRedoStack([])
      setPdfData(bytes)
      return
    }

    setPdfData(null)
    setPdfDocument(null)
    setPdfError('')
    setIsPdfLoading(false)
    setTextEdits({})
    setUndoStack([])
    setRedoStack([])
    setPageCount(2)
    setCurrentPage(1)
    showStatus('Only PDF files render with PDF.js')
  }

  const handleFileInputChange = (event) => {
    const file = event.target.files?.[0]

    if (file) {
      handleFileSelect(file)
    }

    event.target.value = ''
  }

  const handleSavePdf = async () => {
    const edits = Object.values(textEdits)
    const cleanFileName = fileName.trim()

    if (hasDocumentNameEdit && !edits.length) {
      setFileName(cleanFileName)
      setSavedFileName(cleanFileName)
      showStatus('Changes saved')
      return
    }

    if (!pdfData || !edits.length) {
      showStatus('No PDF text edits to save')
      return
    }

    try {
      const document = await PDFDocument.load(Uint8Array.from(pdfData))
      const font = await document.embedFont(StandardFonts.Helvetica)

      edits.forEach((edit) => {
        const page = document.getPage(edit.pageNumber - 1)
        const fontSize = Math.max(edit.fontSize || 10, 6)
        const value = normalizePdfText(edit.value)
        page.drawRectangle({
          x: edit.x - 1,
          y: edit.y - fontSize * 0.25,
          width: Math.max(edit.width + 4, 20),
          height: fontSize * 1.25,
          color: rgb(1, 1, 1),
        })

        page.drawText(value, {
          x: edit.x,
          y: edit.y,
          size: fontSize,
          font,
          color: rgb(0, 0, 0),
          maxWidth: Math.max(edit.width + 80, 120),
        })
      })

      const bytes = await document.save()

      setPdfDocument(null)
      setPdfError('')
      setIsPdfLoading(true)
      setPdfData(bytes)
      setTextEdits({})
      setUndoStack([])
      setRedoStack([])
      setFileName(cleanFileName)
      setSavedFileName(cleanFileName)
      showStatus('Changes saved')
    } catch (error) {
      console.error('PDF save failed', error)
      showStatus('PDF save nahi ho paaya')
    }
  }

  const handleTextEdit = (item, value) => {
    const nextItems = { ...textEdits }
    const cleanValue = value.trim()

    if (!cleanValue || cleanValue === item.str) {
      delete nextItems[item.id]
    } else {
      nextItems[item.id] = {
        value: cleanValue,
        originalValue: item.str,
        pageNumber: item.pageNumber,
        x: item.pdfX,
        y: item.pdfY,
        width: item.pdfWidth,
        height: item.pdfHeight,
        fontSize: item.pdfFontSize,
      }
    }

    if (JSON.stringify(nextItems) === JSON.stringify(textEdits)) {
      return
    }

    setUndoStack((items) => [textEdits, ...items])
    setRedoStack([])
    setTextEdits(nextItems)
  }

  return (
    <div className='overflow-hidden bg-white text-[#212121]'>
      <input
        ref={fileInputRef}
        type='file'
        accept='.pdf,image/*'
        className='hidden'
        onChange={handleFileInputChange}
      />
      <FileBar
        fileName={fileName}
        onFileNameChange={setFileName}
        documentType={documentType}
        onDocumentTypeChange={setDocumentType}
        showActions={showFileActions}
        onCancel={() => {
          setFileName(savedFileName)
          setTextEdits({})
          setUndoStack([])
          setRedoStack([])
          showStatus('Changes cancelled')
        }}
        onSave={handleSavePdf}
        onSubmit={() => showStatus('Document submitted')}
      />
      <ToolBar
        onFileSelect={() => fileInputRef.current?.click()}
        onToggleThumbnails={() => setShowThumbnails((value) => !value)}
        onRotateLeft={() => setRotation((value) => value - 90)}
        onRotateRight={() => setRotation((value) => value + 90)}
        onReset={() => {
          setZoom(1)
          setRotation(0)
          setCurrentPage(1)
          showStatus('View reset')
        }}
        onNextPage={goToNextPage}
      />
      <div className='flex h-full'>
        {showThumbnails && (
          <SideBarThumbnails
            pages={pages}
            currentPage={currentPage}
            onSelectPage={goToPage}
            pdfDocument={pdfDocument}
          />
        )}
        <InvoiceCanvas
          currentPage={currentPage}
          pageCount={pageCount}
          zoom={zoom}
          rotation={rotation}
          onAddComment={addComment}
          pdfDocument={pdfDocument}
          isPdfLoading={isPdfLoading}
          pdfError={pdfError}
          textEdits={textEdits}
          comments={comments}
          onTextEdit={handleTextEdit}
          onPageInView={setCurrentPage}
        />
        <BottomRightTools
          activePanel={activePanel}
          setActivePanel={setActivePanel}
          currentPage={currentPage}
          totalPages={pageCount}
          onPageChange={goToPage}
          onZoomIn={() => setZoom((value) => Math.min(value + 0.1, 1.8))}
          onZoomOut={() => setZoom((value) => Math.max(value - 0.1, 0.6))}
          onResetZoom={() => setZoom(1)}
          comments={comments}
          notes={notes}
          onAddNote={addNote}
          document={{
            fileName,
            documentType,
            documentId: '1020394',
            invoiceDate: '05-27-2020',
            dueDate: 'Whenever',
            poNo: '2039475',
            accountNo: 'B-4059403',
            status: 'Pending Review',
          }}
        />
      </div>
      {statusMessage && (
        <div className='fixed bottom-4 left-1/2 z-[70] -translate-x-1/2 bg-[#212121] px-4 py-2 text-sm font-medium text-white shadow-lg'>
          {statusMessage}
        </div>
      )}
    </div>
  )
}

export default Home
