import { Metadata } from "next"
import { ZakatCalculator } from "@/components/tools/zakat-calculator"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Zekat Hesaplama Aracı | Online Araçlar",
  description: "İslami yükümlülük olan zekât miktarını hesaplayın. Varlıklar, borçlar ve nisap eşiği ile detaylı zekat hesaplaması yapın.",
  keywords: ["zekat hesaplama", "zekat calculator", "nisap", "zekat oranı", "İslami finans", "zekat nedir", "altın nisap", "gümüş nisap"]
}

export default function ZakatCalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-emerald-200/20 to-teal-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-green-200/20 to-cyan-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium mb-6 group transition-all hover:gap-3"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            Ana Sayfaya Dön
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-lg shadow-emerald-500/50">
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-sm font-semibold rounded-full mb-2">
                İslami Finans
              </span>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 bg-clip-text text-transparent">
                Zekat Hesaplama Aracı
              </h1>
            </div>
          </div>
          
          <p className="text-slate-600 text-lg max-w-3xl">
            İslami yükümlülük olan zekât miktarını kolayca hesaplayın. Varlıklarınızı, borçlarınızı ve nisap eşiğini 
            dikkate alarak detaylı zekat hesaplaması yapın.
          </p>
        </div>

        {/* Main Tool */}
        <ZakatCalculator />

        {/* SEO Content */}
        <div className="mt-12 bg-white/80 backdrop-blur-sm rounded-2xl p-8 border-2 border-slate-200 shadow-lg">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Zekat Hesaplama Nasıl Yapılır?</h2>
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700 mb-4">
              Zekat, İslam'ın beş şartından biri olan ve belirli şartları taşıyan müslümanların 
              mallarından fakir ve muhtaçlara vermekle yükümlü oldukları belli miktardaki paradır.
            </p>
            
            <h3 className="text-xl font-bold text-slate-800 mt-6 mb-3">Zekat Şartları:</h3>
            <ul className="list-disc list-inside space-y-2 text-slate-700 mb-4">
              <li>Müslüman olmak</li>
              <li>Hür (özgür) olmak</li>
              <li>Akıl baliğ olmak</li>
              <li>Nisap miktarına sahip olmak</li>
              <li>Malın üzerinden bir yıl (kameri) geçmiş olmak</li>
            </ul>

            <h3 className="text-xl font-bold text-slate-800 mt-6 mb-3">Nisap Nedir?</h3>
            <p className="text-slate-700 mb-4">
              Nisap, zekat vermek için gerekli olan asgari mal varlığı miktarıdır:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-700 mb-4">
              <li><strong>Altın:</strong> 85 gram (yaklaşık 20 miskal)</li>
              <li><strong>Gümüş:</strong> 595 gram (yaklaşık 200 dirhem)</li>
            </ul>

            <h3 className="text-xl font-bold text-slate-800 mt-6 mb-3">Zekat Oranı:</h3>
            <p className="text-slate-700 mb-4">
              Genel zekat oranı <strong>%2.5</strong> (kırkta bir) olarak uygulanır. 
              Bu oran nakit, altın, gümüş, ticaret malları ve benzer varlıklar için geçerlidir.
            </p>

            <p className="text-sm text-slate-600 bg-slate-100 p-4 rounded-lg mt-6">
              <strong>Önemli Not:</strong> Bu araç genel bilgilendirme amaçlıdır. 
              Zekat ile ilgili detaylı bilgi ve özel durumlar için mutlaka din görevlilerine 
              veya İslami finans uzmanlarına danışınız.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
