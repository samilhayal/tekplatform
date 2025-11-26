import { Metadata } from "next"
import { RetirementCalculator } from "@/components/tools/retirement-calculator"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Emekliliğe Kalan Süre Hesaplayıcı | Online Araçlar",
  description: "4A, 4B, 4C statülerine göre emekliliğe kalan süreyi hesaplayın. SGK emeklilik şartları, yaş ve prim günü hesaplama.",
  keywords: ["emeklilik hesaplama", "SGK emeklilik", "4A emeklilik", "4B emeklilik", "4C emeklilik", "prim günü", "emeklilik yaşı", "SSK", "Bağkur"]
}

export default function RetirementCalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-purple-200/20 to-blue-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-5xl">
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full mb-2">
                Çalışma & İş
              </span>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Emekliliğe Kalan Süre
              </h1>
            </div>
          </div>
          
          <p className="text-slate-600 text-lg max-w-3xl">
            4A (SSK), 4B (Bağkur) ve 4C (Emekli Sandığı) statülerine göre emekliliğe kalan süreyi hesaplayın. 
            Yaş ve prim günü şartlarınızı kontrol edin.
          </p>
        </div>

        {/* Main Tool */}
        <RetirementCalculator />

        {/* SEO Content */}
        <div className="mt-12 bg-white/80 backdrop-blur-sm rounded-2xl p-8 border-2 border-slate-200 shadow-lg">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Türkiye'de Emeklilik Sistemi</h2>
          <div className="prose prose-slate max-w-none">
            <h3 className="text-xl font-bold text-slate-800 mt-6 mb-3">4A (SSK) - İşçi, Memur</h3>
            <p className="text-slate-700 mb-3">
              En karmaşık emeklilik statüsüdür çünkü sigorta giriş tarihine göre 3 farklı sistem vardır:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-700 mb-4">
              <li><strong>08.09.1999 Öncesi:</strong> Yaş şartı yok, sadece 5000-5975 gün prim + 20/25 yıl</li>
              <li><strong>09.09.1999 - 30.04.2008:</strong> Kadın 58, Erkek 60 yaş + 7000 gün</li>
              <li><strong>01.05.2008 Sonrası:</strong> 65 yaş (kademeli) + 7200 gün</li>
            </ul>

            <h3 className="text-xl font-bold text-slate-800 mt-6 mb-3">4B (Bağkur) - Esnaf, Sanatkar</h3>
            <ul className="list-disc list-inside space-y-2 text-slate-700 mb-4">
              <li>Kadın: 58 yaş + 9000 gün</li>
              <li>Erkek: 60 yaş + 9000 gün</li>
              <li>Kısmi emeklilik: 5400 gün + 63-65 yaş arası</li>
            </ul>

            <h3 className="text-xl font-bold text-slate-800 mt-6 mb-3">4C (Emekli Sandığı) - Eski Kamu</h3>
            <ul className="list-disc list-inside space-y-2 text-slate-700 mb-4">
              <li>Kadın: 60 yaş + 9000 gün</li>
              <li>Erkek: 65 yaş + 9000 gün</li>
            </ul>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mt-6">
              <p className="text-amber-900 font-semibold mb-2">
                ⚠️ Önemli Uyarı
              </p>
              <p className="text-amber-800 text-sm">
                Bu hesaplama genel bilgilendirme amaçlıdır. Kesin emeklilik hesabınız için 
                SGK'ya başvurunuz. Kademeli geçiş dönemleri ve özel durumlar bu hesaplamada 
                basitleştirilmiştir.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
