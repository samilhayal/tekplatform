"use client"

import { useState, useRef } from "react"
import { Upload, Download, Trash2, FileText, Type, Image as ImageIcon, Square, Circle, MousePointer } from "lucide-react"
import { PDFDocument, rgb, StandardFonts } from "pdf-lib"

type Tool = "select" | "text" | "rectangle" | "circle" | "image"

interface Annotation {
  id: string
  type: Tool
  x: number
  y: number
  width?: number
  height?: number
  text?: string
  fontSize?: number
  color?: string
  imageData?: string
}

export function PDFEdit() {
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [pdfDoc, setPdfDoc] = useState<PDFDocument | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [totalPages, setTotalPages] = useState<number>(0)
  const [activeTool, setActiveTool] = useState<Tool>("select")
  const [annotations, setAnnotations] = useState<Annotation[]>([])
  const [textInput, setTextInput] = useState<string>("")
  const [fontSize, setFontSize] = useState<number>(14)
  const [color, setColor] = useState<string>("#000000")
  const [isSaving, setIsSaving] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === "application/pdf") {
      setPdfFile(file)
      
      try {
        const arrayBuffer = await file.arrayBuffer()
        const pdf = await PDFDocument.load(arrayBuffer)
        setPdfDoc(pdf)
        setTotalPages(pdf.getPageCount())
        setCurrentPage(0)
        setAnnotations([])
        
        // Render first page
        renderPage(pdf, 0)
      } catch (error) {
        console.error("PDF yükleme hatası:", error)
        alert("PDF yüklenirken bir hata oluştu")
      }
    } else {
      alert("Lütfen geçerli bir PDF dosyası seçin")
    }
  }

  const renderPage = async (pdf: PDFDocument, pageIndex: number) => {
    if (!canvasRef.current) return

    const page = pdf.getPage(pageIndex)
    const { width, height } = page.getSize()
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    if (!ctx) return

    // Set canvas size
    canvas.width = width
    canvas.height = height

    // Draw white background
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, width, height)

    // Draw placeholder text
    ctx.fillStyle = '#333'
    ctx.font = '16px Arial'
    ctx.fillText(`Sayfa ${pageIndex + 1} / ${totalPages}`, 20, 30)
    ctx.fillText('PDF içeriği burada görünecek', 20, 60)
    ctx.fillText('(Gerçek PDF.js render için ek kütüphane gerekir)', 20, 90)

    // Draw annotations
    annotations.forEach(annotation => {
      if (annotation.type === 'text' && annotation.text) {
        ctx.fillStyle = annotation.color || '#000000'
        ctx.font = `${annotation.fontSize || 14}px Arial`
        ctx.fillText(annotation.text, annotation.x, annotation.y)
      } else if (annotation.type === 'rectangle') {
        ctx.strokeStyle = annotation.color || '#000000'
        ctx.strokeRect(annotation.x, annotation.y, annotation.width || 100, annotation.height || 100)
      } else if (annotation.type === 'circle') {
        ctx.strokeStyle = annotation.color || '#000000'
        ctx.beginPath()
        ctx.arc(annotation.x, annotation.y, annotation.width || 50, 0, 2 * Math.PI)
        ctx.stroke()
      }
    })
  }

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || activeTool === "select") return

    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const newAnnotation: Annotation = {
      id: Date.now().toString(),
      type: activeTool,
      x,
      y,
      color,
      fontSize
    }

    if (activeTool === "text") {
      if (!textInput) {
        alert("Lütfen metin girin")
        return
      }
      newAnnotation.text = textInput
    } else if (activeTool === "rectangle") {
      newAnnotation.width = 100
      newAnnotation.height = 100
    } else if (activeTool === "circle") {
      newAnnotation.width = 50
    }

    setAnnotations([...annotations, newAnnotation])
    
    // Re-render with new annotation
    if (pdfDoc) {
      renderPage(pdfDoc, currentPage)
    }
  }

  const handleSave = async () => {
    if (!pdfDoc) {
      alert("PDF dosyası yüklenmedi")
      return
    }

    setIsSaving(true)

    try {
      // Create a copy of the PDF
      const pdfCopy = await PDFDocument.load(await pdfDoc.save())
      const page = pdfCopy.getPage(currentPage)
      const { height } = page.getSize()

      // Add annotations to PDF
      for (const annotation of annotations) {
        if (annotation.type === 'text' && annotation.text) {
          const font = await pdfCopy.embedFont(StandardFonts.Helvetica)
          const colorRgb = hexToRgb(annotation.color || '#000000')
          
          page.drawText(annotation.text, {
            x: annotation.x,
            y: height - annotation.y, // PDF coordinates are from bottom
            size: annotation.fontSize || 14,
            font,
            color: rgb(colorRgb.r / 255, colorRgb.g / 255, colorRgb.b / 255)
          })
        } else if (annotation.type === 'rectangle') {
          const colorRgb = hexToRgb(annotation.color || '#000000')
          
          page.drawRectangle({
            x: annotation.x,
            y: height - annotation.y - (annotation.height || 100),
            width: annotation.width || 100,
            height: annotation.height || 100,
            borderColor: rgb(colorRgb.r / 255, colorRgb.g / 255, colorRgb.b / 255),
            borderWidth: 2
          })
        } else if (annotation.type === 'circle') {
          const colorRgb = hexToRgb(annotation.color || '#000000')
          const radius = annotation.width || 50
          
          page.drawCircle({
            x: annotation.x,
            y: height - annotation.y,
            size: radius,
            borderColor: rgb(colorRgb.r / 255, colorRgb.g / 255, colorRgb.b / 255),
            borderWidth: 2
          })
        }
      }

      const pdfBytes = await pdfCopy.save()
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${pdfFile?.name.replace('.pdf', '')}_edited.pdf`
      link.click()
      URL.revokeObjectURL(url)

      alert("PDF başarıyla kaydedildi!")
    } catch (error) {
      console.error("PDF kaydetme hatası:", error)
      alert("PDF kaydedilirken bir hata oluştu")
    }

    setIsSaving(false)
  }

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 }
  }

  const changePage = (delta: number) => {
    const newPage = currentPage + delta
    if (newPage >= 0 && newPage < totalPages && pdfDoc) {
      setCurrentPage(newPage)
      setAnnotations([]) // Clear annotations when changing page
      renderPage(pdfDoc, newPage)
    }
  }

  return (
    <div className="space-y-8">
      {/* Upload Section */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 border-2 border-indigo-200 shadow-lg">
        <h2 className="text-2xl font-bold text-indigo-900 mb-4 flex items-center gap-2">
          <FileText className="h-6 w-6 text-indigo-600" />
          PDF Dosyası Seçin
        </h2>
        
        {!pdfFile ? (
          <div className="border-2 border-dashed border-indigo-300 rounded-xl p-8 text-center hover:border-indigo-400 transition-colors">
            <Upload className="h-12 w-12 text-indigo-400 mx-auto mb-4" />
            <label className="cursor-pointer">
              <span className="text-indigo-600 font-semibold hover:text-indigo-700">
                PDF dosyası seçmek için tıklayın
              </span>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            <p className="text-slate-500 text-sm mt-2">
              veya dosyayı sürükleyip bırakın
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl p-4 border-2 border-indigo-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="h-8 w-8 text-indigo-600" />
                <div>
                  <p className="font-semibold text-slate-800">{pdfFile.name}</p>
                  <p className="text-sm text-slate-500">{totalPages} sayfa</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Editor */}
      {pdfDoc && (
        <>
          {/* Toolbar */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-200 shadow-lg">
            <h2 className="text-xl font-bold text-blue-900 mb-4">Düzenleme Araçları</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
              <button
                onClick={() => setActiveTool("select")}
                className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                  activeTool === "select"
                    ? "border-blue-500 bg-blue-50 text-blue-900"
                    : "border-slate-200 bg-white text-slate-600 hover:border-blue-300"
                }`}
              >
                <MousePointer className="h-6 w-6" />
                <span className="text-sm font-semibold">Seç</span>
              </button>

              <button
                onClick={() => setActiveTool("text")}
                className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                  activeTool === "text"
                    ? "border-blue-500 bg-blue-50 text-blue-900"
                    : "border-slate-200 bg-white text-slate-600 hover:border-blue-300"
                }`}
              >
                <Type className="h-6 w-6" />
                <span className="text-sm font-semibold">Metin</span>
              </button>

              <button
                onClick={() => setActiveTool("rectangle")}
                className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                  activeTool === "rectangle"
                    ? "border-blue-500 bg-blue-50 text-blue-900"
                    : "border-slate-200 bg-white text-slate-600 hover:border-blue-300"
                }`}
              >
                <Square className="h-6 w-6" />
                <span className="text-sm font-semibold">Dikdörtgen</span>
              </button>

              <button
                onClick={() => setActiveTool("circle")}
                className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                  activeTool === "circle"
                    ? "border-blue-500 bg-blue-50 text-blue-900"
                    : "border-slate-200 bg-white text-slate-600 hover:border-blue-300"
                }`}
              >
                <Circle className="h-6 w-6" />
                <span className="text-sm font-semibold">Daire</span>
              </button>

              <button
                disabled
                className="p-4 rounded-xl border-2 border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed flex flex-col items-center gap-2"
              >
                <ImageIcon className="h-6 w-6" />
                <span className="text-sm font-semibold">Resim</span>
              </button>
            </div>

            {/* Tool Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {activeTool === "text" && (
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Metin İçeriği
                  </label>
                  <input
                    type="text"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none"
                    placeholder="Eklenecek metni yazın..."
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Renk
                </label>
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-full h-10 rounded-lg border-2 border-slate-200 cursor-pointer"
                />
              </div>

              {activeTool === "text" && (
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Font Boyutu
                  </label>
                  <input
                    type="number"
                    min="8"
                    max="72"
                    value={fontSize}
                    onChange={(e) => setFontSize(parseInt(e.target.value))}
                    className="w-full px-4 py-2 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Canvas */}
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 border-2 border-slate-200 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-900">
                Sayfa {currentPage + 1} / {totalPages}
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => changePage(-1)}
                  disabled={currentPage === 0}
                  className="px-4 py-2 bg-white rounded-lg border-2 border-slate-300 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                >
                  ← Önceki
                </button>
                <button
                  onClick={() => changePage(1)}
                  disabled={currentPage === totalPages - 1}
                  className="px-4 py-2 bg-white rounded-lg border-2 border-slate-300 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                >
                  Sonraki →
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border-2 border-slate-300 overflow-auto">
              <canvas
                ref={canvasRef}
                onClick={handleCanvasClick}
                className="border border-slate-200 cursor-crosshair max-w-full"
              />
            </div>

            <div className="mt-4 flex gap-3">
              <button
                onClick={handleSave}
                disabled={isSaving || annotations.length === 0}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Kaydediliyor...
                  </>
                ) : (
                  <>
                    <Download className="h-5 w-5" />
                    PDF'i Kaydet
                  </>
                )}
              </button>

              <button
                onClick={() => setAnnotations([])}
                disabled={annotations.length === 0}
                className="px-6 py-3 bg-red-100 hover:bg-red-200 text-red-700 font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Trash2 className="h-5 w-5" />
                Temizle
              </button>
            </div>
          </div>
        </>
      )}

      {/* Info Section */}
      <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-8 border-2 border-amber-200 shadow-lg">
        <h2 className="text-2xl font-bold text-amber-900 mb-4">Nasıl Kullanılır?</h2>
        <ol className="space-y-3 text-slate-700">
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-7 h-7 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
              1
            </span>
            <span>Düzenlemek istediğiniz PDF dosyasını yükleyin</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-7 h-7 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
              2
            </span>
            <span>Düzenleme aracını seçin (Metin, Dikdörtgen, Daire)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-7 h-7 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
              3
            </span>
            <span>Renk ve boyut ayarlarını yapın</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-7 h-7 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
              4
            </span>
            <span>PDF üzerinde eklemek istediğiniz yere tıklayın</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-7 h-7 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
              5
            </span>
            <span>"PDF'i Kaydet" butonuna tıklayın</span>
          </li>
        </ol>

        <div className="mt-6 p-4 bg-amber-100 rounded-lg">
          <p className="text-sm text-amber-800">
            <strong>⚠️ Not:</strong> Bu araç temel PDF düzenleme özellikleri sunar. 
            Gelişmiş özellikler için PDF.js kütüphanesi entegrasyonu yapılabilir.
          </p>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-8 border-2 border-rose-200 shadow-lg">
        <h2 className="text-2xl font-bold text-rose-900 mb-4">🔒 Gizlilik ve Güvenlik</h2>
        <p className="text-slate-700 leading-relaxed">
          Tüm düzenleme işlemleri <strong>tarayıcınızda</strong> gerçekleşir. PDF dosyanız sunucumuza yüklenmez. 
          Verileriniz %100 güvende kalır.
        </p>
      </div>
    </div>
  )
}
