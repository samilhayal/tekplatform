"use client"

import { useState } from "react"
import { Upload, Download, Trash2, ArrowUp, ArrowDown, Image as ImageIcon } from "lucide-react"
import { PDFDocument } from "pdf-lib"

interface ImageFile {
  file: File
  preview: string
  name: string
  size: number
}

export function ImageToPDF() {
  const [images, setImages] = useState<ImageFile[]>([])
  const [isConverting, setIsConverting] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const imageFiles = files.filter(file => file.type.startsWith('image/'))

    if (imageFiles.length === 0) {
      alert("Lütfen geçerli görüntü dosyaları seçin")
      return
    }

    const newImages = imageFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
      size: file.size
    }))

    setImages(prev => [...prev, ...newImages])
  }

  const removeImage = (index: number) => {
    setImages(prev => {
      URL.revokeObjectURL(prev[index].preview)
      return prev.filter((_, i) => i !== index)
    })
  }

  const moveImageUp = (index: number) => {
    if (index === 0) return
    setImages(prev => {
      const newImages = [...prev]
      ;[newImages[index - 1], newImages[index]] = [newImages[index], newImages[index - 1]]
      return newImages
    })
  }

  const moveImageDown = (index: number) => {
    if (index === images.length - 1) return
    setImages(prev => {
      const newImages = [...prev]
      ;[newImages[index], newImages[index + 1]] = [newImages[index + 1], newImages[index]]
      return newImages
    })
  }

  const convertToPDF = async () => {
    if (images.length === 0) {
      alert("Lütfen en az bir görüntü ekleyin")
      return
    }

    setIsConverting(true)

    try {
      const pdfDoc = await PDFDocument.create()

      for (const imageFile of images) {
        const arrayBuffer = await imageFile.file.arrayBuffer()
        let image

        if (imageFile.file.type === 'image/png') {
          image = await pdfDoc.embedPng(arrayBuffer)
        } else if (imageFile.file.type === 'image/jpeg' || imageFile.file.type === 'image/jpg') {
          image = await pdfDoc.embedJpg(arrayBuffer)
        } else {
          console.warn(`Desteklenmeyen format: ${imageFile.file.type}`)
          continue
        }

        const page = pdfDoc.addPage()
        const { width: pageWidth, height: pageHeight } = page.getSize()
        
        // Calculate dimensions to fit image on page while maintaining aspect ratio
        const imageAspectRatio = image.width / image.height
        const pageAspectRatio = pageWidth / pageHeight

        let width, height, x, y

        if (imageAspectRatio > pageAspectRatio) {
          // Image is wider than page
          width = pageWidth * 0.9
          height = width / imageAspectRatio
          x = pageWidth * 0.05
          y = (pageHeight - height) / 2
        } else {
          // Image is taller than page
          height = pageHeight * 0.9
          width = height * imageAspectRatio
          x = (pageWidth - width) / 2
          y = pageHeight * 0.05
        }

        page.drawImage(image, {
          x,
          y,
          width,
          height,
        })
      }

      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `images_to_pdf_${Date.now()}.pdf`
      link.click()
      URL.revokeObjectURL(url)

      alert("PDF başarıyla oluşturuldu!")
    } catch (error) {
      console.error("PDF oluşturma hatası:", error)
      alert("PDF oluşturulurken bir hata oluştu")
    }

    setIsConverting(false)
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB'
    if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB'
  }

  return (
    <div className="space-y-8">
      {/* Upload Section */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 border-2 border-indigo-200 shadow-lg">
        <h2 className="text-2xl font-bold text-indigo-900 mb-4 flex items-center gap-2">
          <ImageIcon className="h-6 w-6 text-indigo-600" />
          Görüntü Dosyaları Seçin
        </h2>
        
        <div className="border-2 border-dashed border-indigo-300 rounded-xl p-8 text-center hover:border-indigo-400 transition-colors">
          <Upload className="h-12 w-12 text-indigo-400 mx-auto mb-4" />
          <label className="cursor-pointer">
            <span className="text-indigo-600 font-semibold hover:text-indigo-700">
              Görüntü dosyaları seçmek için tıklayın
            </span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          <p className="text-slate-500 text-sm mt-2">
            PNG, JPEG, JPG formatları desteklenir
          </p>
          <p className="text-slate-500 text-sm">
            Birden fazla dosya seçebilirsiniz
          </p>
        </div>
      </div>

      {/* Images List */}
      {images.length > 0 && (
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-200 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-blue-900">
              Seçili Görseller ({images.length})
            </h2>
            <button
              onClick={() => {
                images.forEach(img => URL.revokeObjectURL(img.preview))
                setImages([])
              }}
              className="text-red-600 hover:text-red-700 font-semibold flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Tümünü Temizle
            </button>
          </div>

          <div className="space-y-3">
            {images.map((image, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 border-2 border-blue-200 flex items-center gap-4"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-700 font-bold rounded-lg flex items-center justify-center">
                  {index + 1}
                </div>
                
                <img
                  src={image.preview}
                  alt={image.name}
                  className="w-16 h-16 object-cover rounded-lg border border-slate-200"
                />

                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800 truncate">{image.name}</p>
                  <p className="text-sm text-slate-500">{formatFileSize(image.size)}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => moveImageUp(index)}
                    disabled={index === 0}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Yukarı taşı"
                  >
                    <ArrowUp className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => moveImageDown(index)}
                    disabled={index === images.length - 1}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Aşağı taşı"
                  >
                    <ArrowDown className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => removeImage(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Kaldır"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Convert Button */}
          <button
            onClick={convertToPDF}
            disabled={isConverting}
            className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isConverting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Dönüştürülüyor...
              </>
            ) : (
              <>
                <Download className="h-5 w-5" />
                PDF Oluştur ve İndir
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
            <span>Bir veya birden fazla görüntü dosyası seçin (PNG, JPEG, JPG)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-7 h-7 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
              2
            </span>
            <span>Görüntülerin sırasını ok tuşları ile düzenleyin</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-7 h-7 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
              3
            </span>
            <span>İstemediğiniz görselleri kaldırın</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-7 h-7 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
              4
            </span>
            <span>"PDF Oluştur ve İndir" butonuna tıklayın</span>
          </li>
        </ol>
      </div>

      {/* Features */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border-2 border-amber-200 shadow-lg">
        <h2 className="text-2xl font-bold text-amber-900 mb-4">Özellikler</h2>
        <ul className="space-y-2 text-slate-700">
          <li className="flex items-start gap-2">
            <span className="text-amber-600 mt-1">✓</span>
            <span>Sınırsız görüntü ekleme</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-600 mt-1">✓</span>
            <span>Görüntü sıralama özelliği</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-600 mt-1">✓</span>
            <span>Otomatik boyutlandırma (en-boy oranı korunur)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-600 mt-1">✓</span>
            <span>PNG ve JPEG formatları desteklenir</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-600 mt-1">✓</span>
            <span>Her görüntü ayrı sayfa olur</span>
          </li>
        </ul>
      </div>

      {/* Privacy Notice */}
      <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-8 border-2 border-rose-200 shadow-lg">
        <h2 className="text-2xl font-bold text-rose-900 mb-4">🔒 Gizlilik ve Güvenlik</h2>
        <p className="text-slate-700 leading-relaxed">
          Tüm işlemler <strong>tarayıcınızda</strong> gerçekleşir. Görüntüleriniz sunucumuza yüklenmez. 
          Verileriniz %100 güvende kalır. İşlem tamamlandıktan sonra dosyalar bellekten silinir.
        </p>
      </div>
    </div>
  )
}
