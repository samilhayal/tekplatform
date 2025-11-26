import { Metadata } from "next"
import { ImageToPDF } from "@/components/tools/image-to-pdf"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Image to PDF Dönüştürücü | Online Araçlar",
  description: "Görüntülerinizi PDF formatına dönüştürün. Birden fazla resmi tek PDF'de birleştirin. Ücretsiz, güvenli ve kolay kullanımlı online Image to PDF dönüştürücü.",
  keywords: ["image to pdf", "resim pdf", "jpg to pdf", "png to pdf", "görsel pdf", "fotoğraf pdf", "ücretsiz image to pdf"]
}

export default function ImageToPDFPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-indigo-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-blue-200/20 to-pink-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium mb-6 group transition-all hover:gap-3"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            Ana Sayfaya Dön
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg shadow-indigo-500/50">
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-semibold rounded-full mb-2">
                PDF Araçları
              </span>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Image to PDF Dönüştürücü
              </h1>
            </div>
          </div>
          
          <p className="text-slate-600 text-lg max-w-3xl">
            Birden fazla görüntüyü tek bir PDF dosyasında birleştirin. PNG, JPEG formatları desteklenir. 
            Görüntü sıralamasını kolayca düzenleyin.
          </p>
        </div>

        {/* Main Tool */}
        <ImageToPDF />

        {/* Info Sections */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Kullanım Alanları */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-indigo-200 shadow-lg">
            <h2 className="text-2xl font-bold text-indigo-900 mb-4 flex items-center gap-2">
              <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Kullanım Alanları
            </h2>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 mt-1">•</span>
                <span>Taranmış belgeleri PDF'e dönüştürme</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 mt-1">•</span>
                <span>Fotoğraf albümü oluşturma</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 mt-1">•</span>
                <span>Ekran görüntülerini belge haline getirme</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 mt-1">•</span>
                <span>Grafik ve çizimleri PDF olarak kaydetme</span>
              </li>
            </ul>
          </div>

          {/* Avantajlar */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-purple-200 shadow-lg">
            <h2 className="text-2xl font-bold text-purple-900 mb-4 flex items-center gap-2">
              <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Avantajlar
            </h2>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">✓</span>
                <span>Birden fazla görseli tek PDF'de toplama</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">✓</span>
                <span>Görüntü kalitesi korunur</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">✓</span>
                <span>Dosya paylaşımı kolaylaşır</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">✓</span>
                <span>Otomatik sayfa boyutlandırma</span>
              </li>
            </ul>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-12 bg-white/80 backdrop-blur-sm rounded-2xl p-8 border-2 border-slate-200 shadow-lg">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Görüntüleri PDF'e Dönüştürme</h2>
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700 mb-4">
              Birden fazla görüntüyü tek bir PDF dosyasında birleştirmek, belge organizasyonu ve paylaşımı için 
              oldukça kullanışlıdır. Image to PDF dönüştürücümüz bu işlemi kolaylaştırır.
            </p>
            <p className="text-slate-700 mb-4">
              <strong>Neden Görüntüleri PDF'e Dönüştürmelisiniz?</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-700 mb-4">
              <li>Tek dosyada birden fazla sayfa taşıyabilirsiniz</li>
              <li>PDF formatı evrensel olarak kabul görür</li>
              <li>Yazdırma ve paylaşım daha kolaydır</li>
              <li>Görüntü sırasını istediğiniz gibi düzenleyebilirsiniz</li>
            </ul>
            <p className="text-slate-700">
              Online Image to PDF dönüştürücümüz ile görüntülerinizi profesyonel PDF belgelerine çevirin!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
