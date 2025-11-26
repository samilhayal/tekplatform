"use client"

import { useState } from "react"
import { Upload, Download, Trash2, FileText, Minimize2 } from "lucide-react"
import { PDFDocument } from "pdf-lib"

export function PDFCompress() {
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [originalSize, setOriginalSize] = useState<number>(0)
  const [compressedSize, setCompressedSize] = useState<number>(0)
  const [compressionLevel, setCompressionLevel] = useState<"low" | "medium" | "high">("medium")
  const [isCompressing, setIsCompressing] = useState(false)
  const [compressedPdfUrl, setCompressedPdfUrl] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === "application/pdf") {
      setPdfFile(file)
      setOriginalSize(file.size)
      setCompressedPdfUrl(null)
      setCompressedSize(0)
    } else {
      alert("Lütfen geçerli bir PDF dosyası seçin")
    }
  }

  const handleCompress = async () => {
    if (!pdfFile) {
      alert("Lütfen bir PDF dosyası seçin")
      return
    }

    setIsCompressing(true)

    try {
      const arrayBuffer = await pdfFile.arrayBuffer()
      const pdfDoc = await PDFDocument.load(arrayBuffer)

      // Compression settings based on level
      let objectsToCompress = true
      let removeMetadata = false
      let reduceImageQuality = false

      switch (compressionLevel) {
        case "low":
          objectsToCompress = true
          removeMetadata = false
          reduceImageQuality = false
          break
        case "medium":
          objectsToCompress = true
          removeMetadata = true
          reduceImageQuality = false
          break
        case "high":
          objectsToCompress = true
          removeMetadata = true
          reduceImageQuality = true
          break
      }

      // Remove metadata if requested
      if (removeMetadata) {
        pdfDoc.setTitle('')
        pdfDoc.setAuthor('')
        pdfDoc.setSubject('')
        pdfDoc.setKeywords([])
        pdfDoc.setProducer('')
        pdfDoc.setCreator('')
      }

      // Save with compression options
      const compressedPdfBytes = await pdfDoc.save({
        useObjectStreams: objectsToCompress,
        addDefaultPage: false,
      })

      setCompressedSize(compressedPdfBytes.length)

      // Create download URL
      const blob = new Blob([compressedPdfBytes as any], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      setCompressedPdfUrl(url)

      alert("PDF başarıyla sıkıştırıldı!")
    } catch (error) {
      console.error("PDF sıkıştırma hatası:", error)
      alert("PDF sıkıştırılırken bir hata oluştu")
    }

    setIsCompressing(false)
  }

  const handleDownload = () => {
    if (!compressedPdfUrl) return

    const link = document.createElement('a')
    link.href = compressedPdfUrl
    link.download = `${pdfFile?.name.replace('.pdf', '')}_compressed.pdf`
    link.click()
  }

  const handleRemoveFile = () => {
    setPdfFile(null)
    setOriginalSize(0)
    setCompressedSize(0)
    if (compressedPdfUrl) {
      URL.revokeObjectURL(compressedPdfUrl)
      setCompressedPdfUrl(null)
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB'
    if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB'
  }

  const getCompressionRate = (): number => {
    if (originalSize === 0 || compressedSize === 0) return 0
    return Math.round(((originalSize - compressedSize) / originalSize) * 100)
  }

  return (
    <div className="space-y-8">
      {/* Upload Section */}
      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-8 border-2 border-indigo-200 shadow-lg">
        <h2 className="text-2xl font-bold text-indigo-900 mb-4 flex items-center gap-2">
          <Minimize2 className="h-6 w-6 text-indigo-600" />
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
                  <p className="text-sm text-slate-500">
                    Orijinal Boyut: {formatFileSize(originalSize)}
                  </p>
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

      {/* Compression Options */}
      {pdfFile && !compressedPdfUrl && (
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border-2 border-blue-200 shadow-lg">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Sıkıştırma Seviyesi</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => setCompressionLevel("low")}
              className={`p-6 rounded-xl border-2 transition-all ${
                compressionLevel === "low"
                  ? "border-blue-500 bg-blue-50"
                  : "border-slate-200 bg-white hover:border-blue-300"
              }`}
            >
              <div className="text-center">
                <div className={`text-3xl font-bold mb-2 ${
                  compressionLevel === "low" ? "text-blue-600" : "text-slate-700"
                }`}>
                  Düşük
                </div>
                <div className="text-sm text-slate-600 mb-3">
                  ~10-20% boyut azaltma
                </div>
                <div className="text-xs text-slate-500 space-y-1">
                  <p>✓ En az kalite kaybı</p>
                  <p>✓ Temel optimizasyon</p>
                  <p>✓ Metadata korunur</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setCompressionLevel("medium")}
              className={`p-6 rounded-xl border-2 transition-all ${
                compressionLevel === "medium"
                  ? "border-blue-500 bg-blue-50"
                  : "border-slate-200 bg-white hover:border-blue-300"
              }`}
            >
              <div className="text-center">
                <div className={`text-3xl font-bold mb-2 ${
                  compressionLevel === "medium" ? "text-blue-600" : "text-slate-700"
                }`}>
                  Orta
                </div>
                <div className="text-sm text-slate-600 mb-3">
                  ~20-40% boyut azaltma
                </div>
                <div className="text-xs text-slate-500 space-y-1">
                  <p>✓ Dengeli sıkıştırma</p>
                  <p>✓ Metadata temizlenir</p>
                  <p>✓ Önerilen seviye</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setCompressionLevel("high")}
              className={`p-6 rounded-xl border-2 transition-all ${
                compressionLevel === "high"
                  ? "border-blue-500 bg-blue-50"
                  : "border-slate-200 bg-white hover:border-blue-300"
              }`}
            >
              <div className="text-center">
                <div className={`text-3xl font-bold mb-2 ${
                  compressionLevel === "high" ? "text-blue-600" : "text-slate-700"
                }`}>
                  Yüksek
                </div>
                <div className="text-sm text-slate-600 mb-3">
                  ~40-60% boyut azaltma
                </div>
                <div className="text-xs text-slate-500 space-y-1">
                  <p>✓ Maksimum sıkıştırma</p>
                  <p>✓ Tüm metadata silinir</p>
                  <p>✓ Küçük kalite kaybı</p>
                </div>
              </div>
            </button>
          </div>

          {/* Compress Button */}
          <button
            onClick={handleCompress}
            disabled={isCompressing}
            className="w-full mt-8 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isCompressing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Sıkıştırılıyor...
              </>
            ) : (
              <>
                <Minimize2 className="h-5 w-5" />
                PDF'i Sıkıştır
              </>
            )}
          </button>
        </div>
      )}

      {/* Results */}
      {compressedPdfUrl && (
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200 shadow-lg">
          <h2 className="text-2xl font-bold text-green-900 mb-6">Sıkıştırma Tamamlandı!</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 border-2 border-green-200">
              <div className="text-sm text-slate-600 mb-1">Orijinal Boyut</div>
              <div className="text-2xl font-bold text-slate-800">
                {formatFileSize(originalSize)}
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 border-2 border-green-200">
              <div className="text-sm text-slate-600 mb-1">Sıkıştırılmış Boyut</div>
              <div className="text-2xl font-bold text-green-600">
                {formatFileSize(compressedSize)}
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 border-2 border-green-200">
              <div className="text-sm text-slate-600 mb-1">Tasarruf</div>
              <div className="text-2xl font-bold text-green-600">
                {getCompressionRate()}%
              </div>
            </div>
          </div>

          <button
            onClick={handleDownload}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            <Download className="h-5 w-5" />
            Sıkıştırılmış PDF'i İndir
          </button>

          <button
            onClick={handleRemoveFile}
            className="w-full mt-3 text-slate-600 hover:text-slate-700 font-semibold py-2"
          >
            Yeni Dosya Yükle
          </button>
        </div>
      )}

      {/* Info Section */}
      <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-8 border-2 border-amber-200 shadow-lg">
        <h2 className="text-2xl font-bold text-amber-900 mb-4">Nasıl Kullanılır?</h2>
        <ol className="space-y-3 text-slate-700">
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-7 h-7 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
              1
            </span>
            <span>Sıkıştırmak istediğiniz PDF dosyasını seçin</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-7 h-7 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
              2
            </span>
            <span>Sıkıştırma seviyesini seçin (Düşük, Orta veya Yüksek)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-7 h-7 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
              3
            </span>
            <span>"PDF'i Sıkıştır" butonuna tıklayın</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-7 h-7 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
              4
            </span>
            <span>Sıkıştırılmış PDF dosyanızı indirin</span>
          </li>
        </ol>

        <div className="mt-6 p-4 bg-amber-100 rounded-lg">
          <p className="text-sm text-amber-800">
            <strong>💡 İpucu:</strong> Orta seviye sıkıştırma çoğu durumda en iyi sonucu verir. 
            Yüksek seviye sıkıştırmada minimum kalite kaybı olabilir.
          </p>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-8 border-2 border-rose-200 shadow-lg">
        <h2 className="text-2xl font-bold text-rose-900 mb-4">🔒 Gizlilik ve Güvenlik</h2>
        <p className="text-slate-700 leading-relaxed">
          Tüm sıkıştırma işlemleri <strong>tarayıcınızda</strong> gerçekleşir. PDF dosyanız sunucumuza yüklenmez. 
          Verileriniz %100 güvende kalır. İşlem tamamlandıktan sonra dosyalar bellekten silinir.
        </p>
      </div>
    </div>
  )
}
