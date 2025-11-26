import { Metadata } from "next"
import { PDFMerge } from "@/components/tools/pdf-merge"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "PDF Birleştirme Aracı | Online Araçlar",
  description: "Birden fazla PDF dosyasını tek bir PDF'de birleştirin. Ücretsiz, güvenli ve kolay kullanımlı online PDF birleştirme aracı. Dosyalarınız sunucuya gönderilmez.",
  keywords: ["pdf birleştirme", "pdf merge", "pdf combine", "pdf birleştir", "pdf dosya birleştir", "ücretsiz pdf birleştirme", "online pdf merge"]
}

export default function PDFMergePage() {
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-semibold rounded-full mb-2">
                PDF Araçları
              </span>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                PDF Birleştirme Aracı
              </h1>
            </div>
          </div>
          
          <p className="text-slate-600 text-lg max-w-3xl">
            Birden fazla PDF dosyasını tek bir PDF'de birleştirin. Dosya sırasını kolayca düzenleyin. 
            Tüm işlemler tarayıcınızda gerçekleşir, dosyalarınız güvende kalır.
          </p>
        </div>

        {/* Main Tool */}
        <PDFMerge />

        {/* Info Sections */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Özellikler */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-indigo-200 shadow-lg">
            <h2 className="text-2xl font-bold text-indigo-900 mb-4 flex items-center gap-2">
              <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Özellikler
            </h2>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 mt-1">✓</span>
                <span>Sınırsız PDF dosyası birleştirme</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 mt-1">✓</span>
                <span>Dosya sıralama özelliği</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 mt-1">✓</span>
                <span>Tarayıcıda çalışır (sunucuya gönderilmez)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 mt-1">✓</span>
                <span>Ücretsiz ve kayıt gerektirmez</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 mt-1">✓</span>
                <span>Hızlı ve kolay kullanım</span>
              </li>
            </ul>
          </div>

          {/* Kullanım Alanları */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-purple-200 shadow-lg">
            <h2 className="text-2xl font-bold text-purple-900 mb-4 flex items-center gap-2">
              <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Kullanım Alanları
            </h2>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">•</span>
                <span>Birden fazla faturayı tek PDF'de toplama</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">•</span>
                <span>Belgeleri kategorik olarak birleştirme</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">•</span>
                <span>E-kitap bölümlerini tek dosyada toplama</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">•</span>
                <span>Taranmış belgeleri birleştirme</span>
              </li>
            </ul>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-12 bg-white/80 backdrop-blur-sm rounded-2xl p-8 border-2 border-slate-200 shadow-lg">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">PDF Birleştirme Neden Önemli?</h2>
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700 mb-4">
              Günlük hayatta ve iş hayatında sıklıkla birden fazla PDF dosyasını tek bir dokümanda toplamak gerekir. 
              PDF birleştirme aracımız bu işlemi hızlı, güvenli ve kolay bir şekilde yapmanızı sağlar.
            </p>
            <p className="text-slate-700 mb-4">
              <strong>Neden Bu Aracı Kullanmalısınız?</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-700 mb-4">
              <li>Tamamen ücretsiz, kayıt gerektirmez</li>
              <li>Dosyalarınız sunucuya gönderilmez, gizliliğiniz korunur</li>
              <li>Sınırsız dosya boyutu ve sayısı</li>
              <li>Kolay sıralama özelliği ile dosya düzeni kontrolü</li>
              <li>Tüm işlemler tarayıcınızda anında gerçekleşir</li>
            </ul>
            <p className="text-slate-700">
              Online PDF birleştirme aracımız ile belgelerinizi düzenli tutun, zaman kazanın!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
