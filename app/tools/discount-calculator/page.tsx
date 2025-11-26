import { Metadata } from "next"
import { DiscountCalculator } from "@/components/tools/discount-calculator"

export const metadata: Metadata = {
  title: "İndirim Hesaplama | Online Araçlar",
  description: "İndirimli fiyatı anında hesaplayın. Kampanya ve indirim oranlarını kolayca değerlendirin.",
  keywords: ["indirim hesaplama", "discount calculator", "kampanya", "fiyat hesaplama", "alışveriş"],
}

export default function DiscountCalculatorPage() {
  return (
    <div className="min-h-screen relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-orange-200 to-red-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-br from-pink-200 to-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-gradient-to-br from-red-200 to-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <div className="max-w-5xl mx-auto mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-100 to-red-100 border border-orange-200 mb-6 animate-in fade-in slide-in-from-top duration-700">
          <div className="h-2 w-2 rounded-full bg-orange-500 animate-pulse"></div>
          <span className="text-sm font-semibold bg-gradient-to-r from-orange-700 to-red-700 bg-clip-text text-transparent">
            Akıllı Alışveriş
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-in fade-in slide-in-from-bottom duration-700 delay-100">
          <span className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
            İndirim Hesaplama
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom duration-700 delay-200">
          Kampanya ve indirim fiyatlarını hızlıca hesaplayın. Gerçek tasarrufunuzu öğrenin!
        </p>
      </div>

      {/* Main Tool */}
      <div className="animate-in fade-in slide-in-from-bottom duration-700 delay-300">
        <DiscountCalculator />
      </div>

      {/* Shopping Tips */}
      <div className="max-w-5xl mx-auto mt-16 animate-in fade-in slide-in-from-bottom duration-700 delay-500">
        <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-orange-50 border-2 border-orange-100 shadow-xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            🛍️ Akıllı Alışveriş İpuçları
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-white/80 backdrop-blur-sm border-2 border-orange-100 shadow-md">
              <div className="text-3xl mb-3">🔍</div>
              <h3 className="font-bold text-slate-900 mb-2">Fiyat Karşılaştırın</h3>
              <p className="text-sm text-slate-600">
                Farklı mağazalardaki indirim oranlarını karşılaştırarak en iyi fırsatı bulun.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white/80 backdrop-blur-sm border-2 border-red-100 shadow-md">
              <div className="text-3xl mb-3">📅</div>
              <h3 className="font-bold text-slate-900 mb-2">Dönemsel Kampanyalar</h3>
              <p className="text-sm text-slate-600">
                Black Friday, Cuma indirimleri gibi özel günlerde büyük tasarruf yapabilirsiniz.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white/80 backdrop-blur-sm border-2 border-pink-100 shadow-md">
              <div className="text-3xl mb-3">💳</div>
              <h3 className="font-bold text-slate-900 mb-2">Kredi Kartı Avantajları</h3>
              <p className="text-sm text-slate-600">
                Banka kampanyaları ve ekstra indirimlerle daha fazla tasarruf edin.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Example Scenarios */}
      <div className="max-w-5xl mx-auto mt-8">
        <div className="p-6 rounded-2xl bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200">
          <h3 className="font-bold text-orange-900 mb-4 text-center text-lg">
            📊 Örnek İndirim Senaryoları
          </h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white/80 border border-orange-100">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">👕</span>
                <h4 className="font-semibold text-slate-900">Giyim</h4>
              </div>
              <p className="text-sm text-slate-600 mb-2">
                500 TL gömlek<br />
                %30 indirim
              </p>
              <p className="text-sm font-bold text-orange-700">
                → 350 TL (150 TL tasarruf)
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/80 border border-red-100">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">📱</span>
                <h4 className="font-semibold text-slate-900">Elektronik</h4>
              </div>
              <p className="text-sm text-slate-600 mb-2">
                20,000 TL telefon<br />
                %15 indirim
              </p>
              <p className="text-sm font-bold text-red-700">
                → 17,000 TL (3,000 TL tasarruf)
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/80 border border-pink-100">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🛋️</span>
                <h4 className="font-semibold text-slate-900">Mobilya</h4>
              </div>
              <p className="text-sm text-slate-600 mb-2">
                8,000 TL koltuk<br />
                %40 indirim
              </p>
              <p className="text-sm font-bold text-pink-700">
                → 4,800 TL (3,200 TL tasarruf)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
