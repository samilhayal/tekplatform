import { Metadata } from "next"
import { PDFSplit } from "@/components/tools/pdf-split"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "PDF Bölme Aracı | Online Araçlar",
  description: "PDF dosyalarını sayfa aralığı, özel sayfalar veya belirli aralıklarla bölün. Ücretsiz, güvenli ve kolay kullanımlı online PDF bölme aracı.",
  keywords: ["pdf bölme", "pdf split", "pdf ayır", "pdf sayfa çıkar", "pdf böl", "ücretsiz pdf bölme", "online pdf split"]
}

export default function PDFSplitPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-indigo-200/20 to-pink-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
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
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg shadow-blue-500/50">
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
              </svg>
            </div>
            <div>
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full mb-2">
                PDF Araçları
              </span>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                PDF Bölme Aracı
              </h1>
            </div>
          </div>
          
          <p className="text-slate-600 text-lg max-w-3xl">
            PDF dosyalarınızı sayfa aralığı, özel sayfalar veya belirli aralıklarla bölün. 
            Tüm işlemler tarayıcınızda gerçekleşir, dosyalarınız güvende kalır.
          </p>
        </div>

        {/* Main Tool */}
        <PDFSplit />

        {/* Info Sections */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bölme Modları */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-blue-200 shadow-lg">
            <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Bölme Modları
            </h2>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">✓</span>
                <span><strong>Sayfa Aralığı:</strong> 5-15 gibi belirli aralık</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">✓</span>
                <span><strong>Özel Sayfalar:</strong> 1, 3, 5, 7 gibi seçili sayfalar</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">✓</span>
                <span><strong>Aralıklarla Böl:</strong> Her 2 sayfada bir dosya</span>
              </li>
            </ul>
          </div>

          {/* Kullanım Alanları */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-purple-200 shadow-lg">
            <h2 className="text-2xl font-bold text-purple-900 mb-4 flex items-center gap-2">
              <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Kullanım Alanları
            </h2>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">•</span>
                <span>E-kitaptan belirli bölümleri ayırma</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">•</span>
                <span>Belgenin sadece ilgili sayfalarını çıkarma</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">•</span>
                <span>Büyük PDF'i küçük parçalara ayırma</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">•</span>
                <span>Her öğrenci için ayrı sınav sayfası oluşturma</span>
              </li>
            </ul>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-12 bg-white/80 backdrop-blur-sm rounded-2xl p-8 border-2 border-slate-200 shadow-lg">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">PDF Bölme Neden Gerekli?</h2>
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700 mb-4">
              Büyük PDF dosyalarından ihtiyacınız olan sayfaları çıkarmak, belgeleri organize etmek veya 
              dosya boyutunu küçültmek için PDF bölme işlemi oldukça kullanışlıdır.
            </p>
            <p className="text-slate-700 mb-4">
              <strong>Bu Aracın Avantajları:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-700 mb-4">
              <li>3 farklı bölme modu (aralık, özel sayfalar, aralıklarla)</li>
              <li>Sınırsız kullanım, ücretsiz</li>
              <li>Dosyalarınız sunucuya gönderilmez</li>
              <li>Hızlı işlem süresi</li>
              <li>Kullanımı kolay arayüz</li>
            </ul>
            <p className="text-slate-700">
              Online PDF bölme aracımız ile belgelerinizi istediğiniz şekilde ayırın!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
