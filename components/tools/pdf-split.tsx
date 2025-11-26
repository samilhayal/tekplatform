"use client"

import { useState } from "react"
import { Upload, Download, Trash2, FileText, Scissors } from "lucide-react"
import { PDFDocument } from "pdf-lib"

export function PDFSplit() {
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [totalPages, setTotalPages] = useState<number>(0)
  const [splitMode, setSplitMode] = useState<"range" | "pages" | "interval">("range")
  const [rangeStart, setRangeStart] = useState<string>("1")
  const [rangeEnd, setRangeEnd] = useState<string>("")
  const [specificPages, setSpecificPages] = useState<string>("")
  const [intervalSize, setIntervalSize] = useState<string>("1")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === "application/pdf") {
      setPdfFile(file)
      
      // Load PDF to count pages
      const arrayBuffer = await file.arrayBuffer()
      const pdf = await PDFDocument.load(arrayBuffer)
      const pageCount = pdf.getPageCount()
      setTotalPages(pageCount)
      setRangeEnd(pageCount.toString())
    } else {
      alert("Lütfen geçerli bir PDF dosyası seçin")
    }
  }

  const handleSplit = async () => {
    if (!pdfFile) {
      alert("Lütfen bir PDF dosyası seçin")
      return
    }

    setIsProcessing(true)

    try {
      const arrayBuffer = await pdfFile.arrayBuffer()
      const pdfDoc = await PDFDocument.load(arrayBuffer)

      let pagesToExtract: number[] = []

      if (splitMode === "range") {
        const start = parseInt(rangeStart) - 1
        const end = parseInt(rangeEnd)
        if (isNaN(start) || isNaN(end) || start < 0 || end > totalPages || start >= end) {
          alert("Geçersiz sayfa aralığı")
          setIsProcessing(false)
          return
        }
        pagesToExtract = Array.from({ length: end - start }, (_, i) => i + start)
      } else if (splitMode === "pages") {
        const pages = specificPages.split(",").map(p => parseInt(p.trim()) - 1)
        if (pages.some(p => isNaN(p) || p < 0 || p >= totalPages)) {
          alert("Geçersiz sayfa numaraları")
          setIsProcessing(false)
          return
        }
        pagesToExtract = pages
      } else if (splitMode === "interval") {
        const interval = parseInt(intervalSize)
        if (isNaN(interval) || interval <= 0) {
          alert("Geçersiz aralık değeri")
          setIsProcessing(false)
          return
        }

        // Split into multiple files by interval
        for (let i = 0; i < totalPages; i += interval) {
          const newPdf = await PDFDocument.create()
          const endPage = Math.min(i + interval, totalPages)
          const pages = await newPdf.copyPages(pdfDoc, Array.from({ length: endPage - i }, (_, idx) => i + idx))
          pages.forEach(page => newPdf.addPage(page))

          const pdfBytes = await newPdf.save()
          const blob = new Blob([pdfBytes as any], { type: "application/pdf" })
          const url = URL.createObjectURL(blob)
          const link = document.createElement("a")
          link.href = url
          link.download = `${pdfFile.name.replace(".pdf", "")}_part_${Math.floor(i / interval) + 1}.pdf`
          link.click()
          URL.revokeObjectURL(url)
        }

        setIsProcessing(false)
        alert("PDF başarıyla bölündü!")
        return
      }

      // For range and specific pages mode
      const newPdf = await PDFDocument.create()
      const copiedPages = await newPdf.copyPages(pdfDoc, pagesToExtract)
      copiedPages.forEach(page => newPdf.addPage(page))

      const pdfBytes = await newPdf.save()
      const blob = new Blob([pdfBytes as any], { type: "application/pdf" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `${pdfFile.name.replace(".pdf", "")}_split.pdf`
      link.click()
      URL.revokeObjectURL(url)

      alert("PDF başarıyla bölündü!")
    } catch (error) {
      console.error("PDF bölme hatası:", error)
      alert("PDF bölünürken bir hata oluştu")
    }

    setIsProcessing(false)
  }

  const handleRemoveFile = () => {
    setPdfFile(null)
    setTotalPages(0)
    setRangeStart("1")
    setRangeEnd("")
    setSpecificPages("")
  }

  return (
    <div className="space-y-8">
      {/* Upload Section */}
      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-8 border-2 border-indigo-200 shadow-lg">
        <h2 className="text-2xl font-bold text-indigo-900 mb-4 flex items-center gap-2">
          <Scissors className="h-6 w-6 text-indigo-600" />
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
              <button
                onClick={handleRemoveFile}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Split Options */}
      {pdfFile && (
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border-2 border-blue-200 shadow-lg">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Bölme Seçenekleri</h2>
          
          <div className="space-y-4">
            {/* Mode Selection */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                onClick={() => setSplitMode("range")}
                className={`p-4 rounded-xl border-2 transition-all ${
                  splitMode === "range"
                    ? "border-blue-500 bg-blue-50 text-blue-900"
                    : "border-slate-200 bg-white text-slate-600 hover:border-blue-300"
                }`}
              >
                <div className="font-semibold">Sayfa Aralığı</div>
                <div className="text-sm">Belirli aralık seç</div>
              </button>
              <button
                onClick={() => setSplitMode("pages")}
                className={`p-4 rounded-xl border-2 transition-all ${
                  splitMode === "pages"
                    ? "border-blue-500 bg-blue-50 text-blue-900"
                    : "border-slate-200 bg-white text-slate-600 hover:border-blue-300"
                }`}
              >
                <div className="font-semibold">Özel Sayfalar</div>
                <div className="text-sm">Sayfaları seç</div>
              </button>
              <button
                onClick={() => setSplitMode("interval")}
                className={`p-4 rounded-xl border-2 transition-all ${
                  splitMode === "interval"
                    ? "border-blue-500 bg-blue-50 text-blue-900"
                    : "border-slate-200 bg-white text-slate-600 hover:border-blue-300"
                }`}
              >
                <div className="font-semibold">Aralıklarla Böl</div>
                <div className="text-sm">Her N sayfada bir</div>
              </button>
            </div>

            {/* Range Mode */}
            {splitMode === "range" && (
              <div className="bg-white rounded-xl p-6 border-2 border-blue-200">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Sayfa Aralığı (1 - {totalPages})
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    min="1"
                    max={totalPages}
                    value={rangeStart}
                    onChange={(e) => setRangeStart(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none"
                    placeholder="Başlangıç"
                  />
                  <span className="text-slate-500 font-bold">-</span>
                  <input
                    type="number"
                    min="1"
                    max={totalPages}
                    value={rangeEnd}
                    onChange={(e) => setRangeEnd(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none"
                    placeholder="Bitiş"
                  />
                </div>
              </div>
            )}

            {/* Specific Pages Mode */}
            {splitMode === "pages" && (
              <div className="bg-white rounded-xl p-6 border-2 border-blue-200">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Sayfa Numaraları (virgülle ayırın)
                </label>
                <input
                  type="text"
                  value={specificPages}
                  onChange={(e) => setSpecificPages(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none"
                  placeholder="Örnek: 1, 3, 5, 7"
                />
                <p className="text-sm text-slate-500 mt-2">
                  Örnek: 1, 3, 5 veya 2, 4, 6-10
                </p>
              </div>
            )}

            {/* Interval Mode */}
            {splitMode === "interval" && (
              <div className="bg-white rounded-xl p-6 border-2 border-blue-200">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Her kaç sayfada bir bölünsün?
                </label>
                <input
                  type="number"
                  min="1"
                  max={totalPages}
                  value={intervalSize}
                  onChange={(e) => setIntervalSize(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none"
                  placeholder="Sayfa sayısı"
                />
                <p className="text-sm text-slate-500 mt-2">
                  Örnek: 2 yazarsanız her 2 sayfada bir yeni dosya oluşturulur
                </p>
              </div>
            )}
          </div>

          {/* Split Button */}
          <button
            onClick={handleSplit}
            disabled={isProcessing}
            className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                İşleniyor...
              </>
            ) : (
              <>
                <Download className="h-5 w-5" />
                PDF'i Böl ve İndir
              </>
            )}
          </button>
        </div>
      )}

      {/* Info Section */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200 shadow-lg">
        <h2 className="text-2xl font-bold text-green-900 mb-4">Nasıl Kullanılır?</h2>
        <ol className="space-y-3 text-slate-700">
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-7 h-7 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
              1
            </span>
            <span>PDF dosyanızı seçin</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-7 h-7 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
              2
            </span>
            <span>Bölme modunu seçin (Aralık, Özel Sayfalar veya Aralıklarla)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-7 h-7 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
              3
            </span>
            <span>İstediğiniz sayfa numaralarını veya aralığı girin</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-7 h-7 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
              4
            </span>
            <span>"PDF'i Böl ve İndir" butonuna tıklayın</span>
          </li>
        </ol>
      </div>

      {/* Privacy Notice */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border-2 border-amber-200 shadow-lg">
        <h2 className="text-2xl font-bold text-amber-900 mb-4">🔒 Gizlilik ve Güvenlik</h2>
        <p className="text-slate-700 leading-relaxed">
          Tüm işlemler <strong>tarayıcınızda</strong> gerçekleşir. PDF dosyalarınız sunucumuza yüklenmez. 
          Verileriniz %100 güvende kalır. İşlem tamamlandıktan sonra dosyalar bellekten silinir.
        </p>
      </div>
    </div>
  )
}
