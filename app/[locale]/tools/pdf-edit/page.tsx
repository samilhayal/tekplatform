import { Metadata } from "next"
import { PDFEdit } from "@/components/tools/pdf-edit"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "PDF Düzenleme Aracı | Online Araçlar",
  description: "PDF dosyalarınıza metin, şekil ve açıklama ekleyin. Basit ve kullanışlı online PDF düzenleme aracı. Ücretsiz ve güvenli.",
  keywords: ["pdf düzenleme", "pdf edit", "pdf metin ekleme", "pdf annotation", "ücretsiz pdf düzenleyici", "online pdf editor"]
}

export default function PDFEditPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div>
              <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-sm font-semibold rounded-full mb-2">
                PDF Araçları
              </span>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
                PDF Düzenleme Aracı
              </h1>
            </div>
          </div>
          
          <p className="text-slate-600 text-lg max-w-3xl">
            PDF dosyalarınıza metin, dikdörtgen ve daire şekilleri ekleyin. Renk ve boyut ayarları yapın. 
            Basit ve kullanışlı online PDF düzenleme aracı.
          </p>
        </div>

        {/* Main Tool */}
        <PDFEdit />

        {/* Info Sections */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Özellikler */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-purple-200 shadow-lg">
            <h2 className="text-2xl font-bold text-purple-900 mb-4 flex items-center gap-2">
              <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Mevcut Özellikler
            </h2>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">✓</span>
                <span>Metin ekleme (özelleştirilebilir boyut ve renk)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">✓</span>
                <span>Dikdörtgen şekil çizme</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">✓</span>
                <span>Daire şekil çizme</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">✓</span>
                <span>Renk seçimi</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">✓</span>
                <span>Sayfa sayfa düzenleme</span>
              </li>
            </ul>
          </div>

          {/* Kullanım Alanları */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-pink-200 shadow-lg">
            <h2 className="text-2xl font-bold text-pink-900 mb-4 flex items-center gap-2">
              <svg className="h-6 w-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Kullanım Alanları
            </h2>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-pink-600 mt-1">•</span>
                <span>Belgelere not ve açıklama ekleme</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-600 mt-1">•</span>
                <span>Önemli kısımları vurgulama</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-600 mt-1">•</span>
                <span>İmza veya tarih ekleme</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-600 mt-1">•</span>
                <span>Şekiller ile dikkat çekme</span>
              </li>
            </ul>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-12 bg-white/80 backdrop-blur-sm rounded-2xl p-8 border-2 border-slate-200 shadow-lg">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Online PDF Düzenleme</h2>
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700 mb-4">
              PDF düzenleme aracımız ile belgelerinize hızlıca metin ve şekil ekleyebilirsiniz. 
              Basit arayüzü sayesinde herkes kolayca kullanabilir.
            </p>
            <p className="text-slate-700 mb-4">
              <strong>Özellikler:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-700 mb-4">
              <li>Metin ekleme ve özelleştirme</li>
              <li>Dikdörtgen ve daire şekilleri</li>
              <li>Renk ve boyut ayarları</li>
              <li>Sayfa sayfa düzenleme</li>
              <li>Tarayıcıda çalışır (güvenli)</li>
            </ul>
            <p className="text-slate-700 text-sm">
              <strong>Not:</strong> Bu araç temel PDF düzenleme özellikleri sunar. 
              Gelişmiş özellikler için profesyonel PDF editörleri kullanabilirsiniz.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
