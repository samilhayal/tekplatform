import { Metadata } from "next"
import { GoldCalculator } from "@/components/tools/gold-calculator"
import { ToolPageHeader } from "@/components/tool-page-header"

export const metadata: Metadata = {
  title: "Altın Hesaplama | Online Araçlar",
  description: "Güncel altın fiyatlarıyla hesaplama yapın. Gram, çeyrek, yarım ve tam altın fiyatlarını öğrenin.",
  keywords: ["altın hesaplama", "altın fiyatları", "gram altın", "çeyrek altın", "yarım altın", "tam altın", "24 ayar", "22 ayar", "18 ayar"],
}

export default function GoldCalculatorPage() {
  return (
    <div className="min-h-screen relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-yellow-200 to-amber-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-br from-orange-200 to-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-gradient-to-br from-amber-200 to-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header with Social Share */}
      <ToolPageHeader
        badge="Anlık Altın Fiyatları"
        title="Altın Hesaplama"
        description="Güncel altın fiyatlarını öğrenin ve yatırımınızın değerini hesaplayın. 24, 22, 18 ayar altın ve cumhuriyet altınları."
        badgeColors={{
          bg: 'from-yellow-100 to-amber-100',
          border: 'border-yellow-200',
          dot: 'bg-yellow-500',
          text: 'from-yellow-700 to-amber-700'
        }}
        titleGradient="from-yellow-600 via-amber-600 to-orange-600"
      />

      {/* Main Tool */}
      <div className="animate-in fade-in slide-in-from-bottom duration-700 delay-300">
        <GoldCalculator />
      </div>

      {/* How to Use Section */}
      <div className="max-w-5xl mx-auto mt-16 animate-in fade-in slide-in-from-bottom duration-700 delay-500">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8 text-center">
          Nasıl Kullanılır?
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="group p-6 rounded-2xl border-2 border-slate-100 hover:border-yellow-200 hover:shadow-lg transition-all duration-300 bg-white/50 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-yellow-500/30 group-hover:scale-110 transition-transform">
                1
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Altın Türünü Seçin</h3>
                <p className="text-slate-600">
                  Hesaplamak istediğiniz altın türünü seçin: Gram altın (24/22/18 ayar) veya cumhuriyet altını (çeyrek/yarım/tam).
                </p>
                <div className="mt-3 p-3 bg-yellow-50 rounded-lg text-sm text-slate-700">
                  <span className="font-semibold text-yellow-700">Örnek:</span> 24 Ayar Altın (en saf altın, %99.9 saflık)
                </div>
              </div>
            </div>
          </div>

          <div className="group p-6 rounded-2xl border-2 border-slate-100 hover:border-amber-200 hover:shadow-lg transition-all duration-300 bg-white/50 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-transform">
                2
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Miktarı Girin</h3>
                <p className="text-slate-600">
                  Kaç gram veya kaç adet altınınız olduğunu girin. Toplam değer otomatik hesaplanır.
                </p>
                <div className="mt-3 p-3 bg-amber-50 rounded-lg text-sm text-slate-700">
                  <span className="font-semibold text-amber-700">Örnek:</span> 10 gram 24 ayar altın = ~21,000 TL
                </div>
              </div>
            </div>
          </div>

          <div className="group p-6 rounded-2xl border-2 border-slate-100 hover:border-orange-200 hover:shadow-lg transition-all duration-300 bg-white/50 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-orange-500/30 group-hover:scale-110 transition-transform">
                3
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Anlık Değeri Görün</h3>
                <p className="text-slate-600">
                  Güncel piyasa fiyatlarına göre altınınızın anlık değerini öğrenin ve sonucu kopyalayın.
                </p>
                <div className="mt-3 p-3 bg-orange-50 rounded-lg text-sm text-slate-700">
                  <span className="font-semibold text-orange-700">İpucu:</span> Fiyatlar sürekli güncellenir
                </div>
              </div>
            </div>
          </div>

          <div className="group p-6 rounded-2xl border-2 border-slate-100 hover:border-yellow-200 hover:shadow-lg transition-all duration-300 bg-white/50 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-yellow-500/30 group-hover:scale-110 transition-transform">
                4
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Tüm Fiyatları Karşılaştırın</h3>
                <p className="text-slate-600">
                  Sayfanın altında tüm altın türlerinin güncel fiyatlarını görebilir ve karşılaştırabilirsiniz.
                </p>
                <div className="mt-3 p-3 bg-yellow-50 rounded-lg text-sm text-slate-700">
                  <span className="font-semibold text-yellow-700">Özellik:</span> Her kart tıklanabilir
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gold Types Info */}
      <div className="max-w-5xl mx-auto mt-16 animate-in fade-in slide-in-from-bottom duration-700 delay-700">
        <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-yellow-50 border-2 border-yellow-100 shadow-xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            ✨ Altın Türleri Hakkında
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-white/80 backdrop-blur-sm border-2 border-yellow-100 shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">🥇</span>
                <h3 className="font-bold text-slate-900">24 Ayar Altın</h3>
              </div>
              <p className="text-sm text-slate-600 mb-2">
                En saf altın türüdür. %99.9 saflıkta olup yatırım amaçlı tercih edilir.
              </p>
              <div className="flex items-center gap-2 text-xs text-yellow-700 font-semibold">
                <div className="h-2 w-full bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></div>
                <span>%99.9</span>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white/80 backdrop-blur-sm border-2 border-amber-100 shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">🥈</span>
                <h3 className="font-bold text-slate-900">22 Ayar Altın</h3>
              </div>
              <p className="text-sm text-slate-600 mb-2">
                %91.6 saflıkta olup daha dayanıklıdır. Cumhuriyet altınları bu ayardadır.
              </p>
              <div className="flex items-center gap-2 text-xs text-amber-700 font-semibold">
                <div className="h-2 w-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full" style={{ width: '91.6%' }}></div>
                <span>%91.6</span>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white/80 backdrop-blur-sm border-2 border-orange-100 shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">🥉</span>
                <h3 className="font-bold text-slate-900">18 Ayar Altın</h3>
              </div>
              <p className="text-sm text-slate-600 mb-2">
                %75 saflıkta olup mücevher yapımında kullanılır. Daha ekonomiktir.
              </p>
              <div className="flex items-center gap-2 text-xs text-orange-700 font-semibold">
                <div className="h-2 w-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full" style={{ width: '75%' }}></div>
                <span>%75.0</span>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white/80 backdrop-blur-sm border-2 border-yellow-100 shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">💰</span>
                <h3 className="font-bold text-slate-900">Çeyrek Altın</h3>
              </div>
              <p className="text-sm text-slate-600">
                1.75 gram ağırlığında cumhuriyet altını. Yatırım ve hediye amaçlı kullanılır.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white/80 backdrop-blur-sm border-2 border-amber-100 shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">💎</span>
                <h3 className="font-bold text-slate-900">Yarım Altın</h3>
              </div>
              <p className="text-sm text-slate-600">
                3.5 gram ağırlığında cumhuriyet altını. Orta seviye yatırım için idealdir.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white/80 backdrop-blur-sm border-2 border-orange-100 shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">👑</span>
                <h3 className="font-bold text-slate-900">Tam Altın</h3>
              </div>
              <p className="text-sm text-slate-600">
                7 gram ağırlığında cumhuriyet altını. En değerli fiziksel altın türüdür.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="max-w-5xl mx-auto mt-8">
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-slate-700 text-center">
          <p>
            <strong>⚠️ Önemli Not:</strong> Bu hesaplama aracı bilgilendirme amaçlıdır. 
            Alım-satım işlemlerinde kuyumcu ve bankalardan güncel fiyat teyidi almanızı öneririz.
          </p>
        </div>
      </div>
    </div>
  )
}
