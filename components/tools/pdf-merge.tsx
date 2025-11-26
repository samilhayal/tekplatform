"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, Trash2, Download, ArrowUp, ArrowDown, FilePlus } from "lucide-react"
import { PDFDocument } from "pdf-lib"

interface PDFFile {
  id: string
  name: string
  file: File
  size: string
}

export function PDFMerge() {
  const [pdfFiles, setPdfFiles] = useState<PDFFile[]>([])
  const [merging, setMerging] = useState(false)

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    const newFiles: PDFFile[] = Array.from(files).map((file, index) => ({
      id: `${Date.now()}-${index}`,
      name: file.name,
      file: file,
      size: formatFileSize(file.size)
    }))

    setPdfFiles(prev => [...prev, ...newFiles])
  }

  const removeFile = (id: string) => {
    setPdfFiles(prev => prev.filter(f => f.id !== id))
  }

  const moveUp = (index: number) => {
    if (index === 0) return
    const newFiles = [...pdfFiles]
    const temp = newFiles[index]
    newFiles[index] = newFiles[index - 1]
    newFiles[index - 1] = temp
    setPdfFiles(newFiles)
  }

  const moveDown = (index: number) => {
    if (index === pdfFiles.length - 1) return
    const newFiles = [...pdfFiles]
    const temp = newFiles[index]
    newFiles[index] = newFiles[index + 1]
    newFiles[index + 1] = temp
    setPdfFiles(newFiles)
  }

  const mergePDFs = async () => {
    if (pdfFiles.length < 2) {
      alert('Lütfen en az 2 PDF dosyası yükleyin')
      return
    }

    setMerging(true)

    try {
      const mergedPdf = await PDFDocument.create()

      for (const pdfFile of pdfFiles) {
        const arrayBuffer = await pdfFile.file.arrayBuffer()
        const pdf = await PDFDocument.load(arrayBuffer)
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
        copiedPages.forEach((page) => {
          mergedPdf.addPage(page)
        })
      }

      const mergedPdfBytes = await mergedPdf.save()
      const blob = new Blob([mergedPdfBytes as any], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = `birlestirilmis-pdf-${Date.now()}.pdf`
      link.click()

      URL.revokeObjectURL(url)
      alert('PDF başarıyla birleştirildi!')
    } catch (error) {
      console.error('PDF birleştirme hatası:', error)
      alert('PDF birleştirme sırasında bir hata oluştu')
    } finally {
      setMerging(false)
    }
  }

  return (
    <div className="w-full space-y-6">
      {/* Upload Area */}
      <Card className="border-2 border-indigo-200">
        <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
          <CardTitle className="flex items-center gap-2">
            <FilePlus className="h-6 w-6 text-indigo-600" />
            PDF Dosyaları Yükle
          </CardTitle>
          <CardDescription>Birleştirmek istediğiniz PDF dosyalarını seçin</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="border-2 border-dashed border-indigo-300 rounded-xl p-8 text-center hover:border-indigo-500 transition-colors">
            <input
              type="file"
              accept="application/pdf"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              id="pdf-upload"
            />
            <label htmlFor="pdf-upload" className="cursor-pointer">
              <Upload className="h-16 w-16 mx-auto text-indigo-400 mb-4" />
              <p className="text-lg font-semibold text-slate-700 mb-2">
                PDF Dosyalarını Sürükleyin veya Tıklayın
              </p>
              <p className="text-sm text-slate-500">
                Birden fazla PDF dosyası seçebilirsiniz
              </p>
            </label>
          </div>
        </CardContent>
      </Card>

      {/* File List */}
      {pdfFiles.length > 0 && (
        <Card className="border-2 border-blue-200">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                Yüklenen Dosyalar ({pdfFiles.length})
              </span>
              <Button
                onClick={() => setPdfFiles([])}
                variant="outline"
                size="sm"
                className="text-red-600 border-red-300 hover:bg-red-50"
              >
                Tümünü Temizle
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-3">
            {pdfFiles.map((file, index) => (
              <div
                key={file.id}
                className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-blue-900 truncate">{file.name}</p>
                  <p className="text-sm text-blue-600">{file.size}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => moveUp(index)}
                    disabled={index === 0}
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:bg-blue-100"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => moveDown(index)}
                    disabled={index === pdfFiles.length - 1}
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:bg-blue-100"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => removeFile(file.id)}
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Merge Button */}
      {pdfFiles.length >= 2 && (
        <Card className="border-2 border-green-200">
          <CardContent className="pt-6">
            <Button
              onClick={mergePDFs}
              disabled={merging}
              className="w-full h-14 text-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              {merging ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Birleştiriliyor...
                </>
              ) : (
                <>
                  <Download className="h-5 w-5 mr-2" />
                  PDF Dosyalarını Birleştir
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Info */}
      <Card className="border-2 border-amber-200">
        <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50">
          <CardTitle className="text-lg">💡 Nasıl Kullanılır?</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <ol className="space-y-2 text-slate-700">
            <li className="flex gap-2">
              <span className="font-bold text-amber-600">1.</span>
              <span>En az 2 PDF dosyası yükleyin</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-amber-600">2.</span>
              <span>Ok tuşları ile dosya sırasını düzenleyin</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-amber-600">3.</span>
              <span>"PDF Dosyalarını Birleştir" butonuna tıklayın</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-amber-600">4.</span>
              <span>Birleştirilmiş PDF otomatik olarak indirilecek</span>
            </li>
          </ol>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>🔒 Gizlilik:</strong> Tüm işlemler tarayıcınızda gerçekleşir. Dosyalarınız sunucuya gönderilmez.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
