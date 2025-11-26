import { Metadata } from "next"
import { PDFCompress } from "@/components/tools/pdf-compress"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "PDF Sıkıştırma Aracı | Online Araçlar",
  description: "PDF dosyalarınızı boyutlarını küçülterek sıkıştırın. 3 farklı sıkıştırma seviyesi. Ücretsiz, güvenli ve kolay kullanımlı online PDF sıkıştırma aracı.",
  keywords: ["pdf sıkıştırma", "pdf compress", "pdf boyut küçültme", "pdf optimize", "ücretsiz pdf sıkıştırma", "online pdf compress", "pdf reducer"]
}

export default function PDFCompressPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-indigo-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-6 group transition-all hover:gap-3"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            Ana Sayfaya Dön
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg shadow-blue-500/50">
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full mb-2">
                PDF Araçları
              </span>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                PDF Sıkıştırma Aracı
              </h1>
            </div>
          </div>
          
          <p className="text-slate-600 text-lg max-w-3xl">
            PDF dosyalarınızın boyutunu küçültün. 3 farklı sıkıştırma seviyesi ile optimal sonuç alın. 
            Tüm işlemler tarayıcınızda gerçekleşir, dosyalarınız güvende kalır.
          </p>
        </div>

        {/* Main Tool */}
        <PDFCompress />

        {/* Info Sections */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sıkıştırma Seviyeleri */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-blue-200 shadow-lg">
            <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Sıkıştırma Seviyeleri
            </h2>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span><strong>Düşük:</strong> ~10-20% boyut azaltma, en az kalite kaybı</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span><strong>Orta:</strong> ~20-40% boyut azaltma, dengeli (önerilen)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span><strong>Yüksek:</strong> ~40-60% boyut azaltma, maksimum sıkıştırma</span>
              </li>
            </ul>
          </div>

          {/* Kullanım Alanları */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-indigo-200 shadow-lg">
            <h2 className="text-2xl font-bold text-indigo-900 mb-4 flex items-center gap-2">
              <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Kullanım Alanları
            </h2>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 mt-1">•</span>
                <span>E-posta ekleri için boyut küçültme</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 mt-1">•</span>
                <span>Web sitesi için PDF optimizasyonu</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 mt-1">•</span>
                <span>Depolama alanı tasarrufu</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 mt-1">•</span>
                <span>Hızlı dosya paylaşımı</span>
              </li>
            </ul>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-12 bg-white/80 backdrop-blur-sm rounded-2xl p-8 border-2 border-slate-200 shadow-lg">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">PDF Sıkıştırma Neden Önemli?</h2>
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700 mb-4">
              Büyük boyutlu PDF dosyaları e-posta ile gönderilemez, web sitelerinde yavaş yüklenir ve 
              depolama alanı kaplar. PDF sıkıştırma ile bu sorunları çözebilirsiniz.
            </p>
            <p className="text-slate-700 mb-4">
              <strong>Bu Aracın Avantajları:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-700 mb-4">
              <li>3 farklı sıkıştırma seviyesi</li>
              <li>Minimum kalite kaybı</li>
              <li>Hızlı işlem süresi</li>
              <li>Dosyalarınız sunucuya gönderilmez</li>
              <li>Sınırsız kullanım</li>
            </ul>
            <p className="text-slate-700">
              Online PDF sıkıştırma aracımız ile dosya boyutlarınızı optimize edin!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
