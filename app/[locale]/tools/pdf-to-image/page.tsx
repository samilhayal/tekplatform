import { Metadata } from "next"
import { PDFToImage } from "@/components/tools/pdf-to-image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "PDF to Image Dönüştürücü | Online Araçlar",
  description: "PDF dosyalarınızı PNG veya JPEG formatında görüntülere dönüştürün. Ücretsiz, güvenli ve kolay kullanımlı online PDF to Image dönüştürücü.",
  keywords: ["pdf to image", "pdf png", "pdf jpeg", "pdf görsel", "pdf dönüştür", "pdf to jpg", "ücretsiz pdf dönüştürücü"]
}

export default function PDFToImagePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium mb-6 group transition-all hover:gap-3"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            Ana Sayfaya Dön
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg shadow-purple-500/50">
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-sm font-semibold rounded-full mb-2">
                PDF Araçları
              </span>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
                PDF to Image Dönüştürücü
              </h1>
            </div>
          </div>
          
          <p className="text-slate-600 text-lg max-w-3xl">
            PDF dosyalarınızın her sayfasını PNG veya JPEG formatında görüntülere dönüştürün. 
            Kalite ayarları ile dosya boyutunu optimize edin.
          </p>
        </div>

        {/* Main Tool */}
        <PDFToImage />

        {/* SEO Content */}
        <div className="mt-12 bg-white/80 backdrop-blur-sm rounded-2xl p-8 border-2 border-slate-200 shadow-lg">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">PDF'i Görüntüye Dönüştürme</h2>
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700 mb-4">
              PDF dosyalarınızı PNG veya JPEG formatında görüntülere dönüştürmek, paylaşım ve sunum için 
              oldukça kullanışlıdır. Her PDF sayfası ayrı bir görüntü dosyası olarak kaydedilir.
            </p>
            <p className="text-slate-700 mb-4">
              <strong>Hangi Formatı Seçmelisiniz?</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-700 mb-4">
              <li><strong>PNG:</strong> Yüksek kalite, şeffaflık desteği, daha büyük dosya boyutu</li>
              <li><strong>JPEG:</strong> Küçük dosya boyutu, web için optimize, şeffaflık yok</li>
            </ul>
            <p className="text-slate-700">
              Online PDF to Image dönüştürücümüz ile belgelerinizi görüntü formatına çevirin!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
