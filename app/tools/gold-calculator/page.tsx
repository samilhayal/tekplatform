import { Metadata } from "next"
import { GoldSilverCalculator } from "@/components/tools/gold-silver-calculator"

export const metadata: Metadata = {
  title: "Altın ve Gümüş Hesaplama | Güncel Altın Fiyatları | Online Araçlar",
  description: "Güncel altın ve gümüş fiyatları ile hesaplama yapın. ONS, Gram, Çeyrek, Yarım, Tam, Cumhuriyet, Ata, Reşat altın ve gümüş fiyatlarını alış-satış olarak görüntüleyin.",
  keywords: ["altın hesaplama", "altın fiyatları", "gümüş fiyatları", "gram altın", "çeyrek altın", "yarım altın", "tam altın", "cumhuriyet altını", "ata altını", "reşat altını", "22 ayar bilezik", "ons altın", "altın alış", "altın satış"],
}

export default function GoldCalculatorPage() {
  return (
    <div className="min-h-screen relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-yellow-200 to-amber-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-br from-orange-200 to-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-gradient-to-br from-amber-200 to-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-gray-200 to-slate-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
      </div>

      {/* Header */}
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-100 to-amber-100 border border-yellow-200 mb-6 animate-in fade-in slide-in-from-top duration-700">
          <div className="h-2 w-2 rounded-full bg-yellow-500 animate-pulse"></div>
          <span className="text-sm font-semibold bg-gradient-to-r from-yellow-700 to-amber-700 bg-clip-text text-transparent">
            Anlık Altın & Gümüş Fiyatları
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-in fade-in slide-in-from-bottom duration-700 delay-100">
          <span className="bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 bg-clip-text text-transparent">
            Altın & Gümüş Hesaplama
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom duration-700 delay-200">
          ONS, Gram, Çeyrek, Yarım, Tam, Cumhuriyet, Ata, Reşat altınları ve gümüş fiyatlarını alış-satış olarak görüntüleyin ve hesaplayın.
        </p>
      </div>

      {/* Main Tool */}
      <div className="animate-in fade-in slide-in-from-bottom duration-700 delay-300">
        <GoldSilverCalculator />
      </div>

      {/* How to Use Section */}
      <div className="max-w-6xl mx-auto mt-16 animate-in fade-in slide-in-from-bottom duration-700 delay-500">
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
                <h3 className="text-lg font-bold text-slate-900 mb-2">Güncel Fiyatları Görüntüleyin</h3>
                <p className="text-slate-600">
                  "Güncel Fiyatlar" sekmesinde tüm altın ve gümüş türlerinin alış-satış fiyatlarını görün.
                </p>
                <div className="mt-3 p-3 bg-yellow-50 rounded-lg text-sm text-slate-700">
                  <span className="font-semibold text-yellow-700">İpucu:</span> Kartlara tıklayarak hızlıca hesaplama yapabilirsiniz
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
                <h3 className="text-lg font-bold text-slate-900 mb-2">Altın/Gümüş Türünü Seçin</h3>
                <p className="text-slate-600">
                  ONS, Gram (24/22/18/14 Ayar), Çeyrek, Yarım, Tam, Cumhuriyet, Ata, Reşat altını veya Gümüş seçin.
                </p>
                <div className="mt-3 p-3 bg-amber-50 rounded-lg text-sm text-slate-700">
                  <span className="font-semibold text-amber-700">Örnek:</span> 24 Ayar Gram Altın (en saf altın, %99.9 saflık)
                </div>
              </div>
            </div>
          </div>

          <div className="group p-6 rounded-2xl border-2 border-slate-100 hover:border-green-200 hover:shadow-lg transition-all duration-300 bg-white/50 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-green-500/30 group-hover:scale-110 transition-transform">
                3
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Alış veya Satış Seçin</h3>
                <p className="text-slate-600">
                  Altın almak için "Alış Fiyatı", satmak için "Satış Fiyatı" seçin. Her iki fiyatı da görebilirsiniz.
                </p>
                <div className="mt-3 p-3 bg-green-50 rounded-lg text-sm text-slate-700">
                  <span className="font-semibold text-green-700">Bilgi:</span> Alış-satış farkı (spread) size gösterilir
                </div>
              </div>
            </div>
          </div>

          <div className="group p-6 rounded-2xl border-2 border-slate-100 hover:border-orange-200 hover:shadow-lg transition-all duration-300 bg-white/50 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-orange-500/30 group-hover:scale-110 transition-transform">
                4
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Miktarı Girin ve Hesaplayın</h3>
                <p className="text-slate-600">
                  Kaç gram veya adet hesaplamak istediğinizi girin, toplam değer anında hesaplanır.
                </p>
                <div className="mt-3 p-3 bg-orange-50 rounded-lg text-sm text-slate-700">
                  <span className="font-semibold text-orange-700">Örnek:</span> 5 adet Çeyrek Altın = ~46,000 TL
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gold Types Info */}
      <div className="max-w-6xl mx-auto mt-16 animate-in fade-in slide-in-from-bottom duration-700 delay-700">
        <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-yellow-50 border-2 border-yellow-100 shadow-xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            ✨ Altın ve Gümüş Türleri Hakkında
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-white/80 backdrop-blur-sm border-2 border-blue-100 shadow-md">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🌍</span>
                <h3 className="font-bold text-slate-900 text-sm">ONS Altın</h3>
              </div>
              <p className="text-xs text-slate-600">
                Uluslararası piyasalarda işlem gören altın birimi. 31.1 gram ağırlığındadır.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/80 backdrop-blur-sm border-2 border-yellow-100 shadow-md">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🥇</span>
                <h3 className="font-bold text-slate-900 text-sm">24 Ayar Gram</h3>
              </div>
              <p className="text-xs text-slate-600">
                %99.9 saflıkta en saf altın. Yatırım amaçlı en çok tercih edilen türdür.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/80 backdrop-blur-sm border-2 border-amber-100 shadow-md">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">💍</span>
                <h3 className="font-bold text-slate-900 text-sm">22 Ayar Bilezik</h3>
              </div>
              <p className="text-xs text-slate-600">
                %91.6 saflıkta, bilezik ve takı yapımında kullanılır. Daha dayanıklıdır.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/80 backdrop-blur-sm border-2 border-orange-100 shadow-md">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">✨</span>
                <h3 className="font-bold text-slate-900 text-sm">18 Ayar Altın</h3>
              </div>
              <p className="text-xs text-slate-600">
                %75 saflıkta, mücevher yapımında yaygın. Daha ekonomik seçenektir.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/80 backdrop-blur-sm border-2 border-yellow-100 shadow-md">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🪙</span>
                <h3 className="font-bold text-slate-900 text-sm">Çeyrek Altın</h3>
              </div>
              <p className="text-xs text-slate-600">
                1.75 gram ağırlığında. Hediye ve küçük yatırım için popülerdir.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/80 backdrop-blur-sm border-2 border-amber-100 shadow-md">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">💰</span>
                <h3 className="font-bold text-slate-900 text-sm">Yarım Altın</h3>
              </div>
              <p className="text-xs text-slate-600">
                3.5 gram ağırlığında. Orta seviye yatırım için idealdir.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/80 backdrop-blur-sm border-2 border-orange-100 shadow-md">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">👑</span>
                <h3 className="font-bold text-slate-900 text-sm">Tam Altın</h3>
              </div>
              <p className="text-xs text-slate-600">
                7 gram ağırlığında. En değerli ziynet altın türüdür.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/80 backdrop-blur-sm border-2 border-yellow-100 shadow-md">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🏛️</span>
                <h3 className="font-bold text-slate-900 text-sm">Cumhuriyet Altını</h3>
              </div>
              <p className="text-xs text-slate-600">
                22 ayar, resmi basımlı altın. Koleksiyon ve yatırım değeri taşır.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/80 backdrop-blur-sm border-2 border-amber-100 shadow-md">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🎖️</span>
                <h3 className="font-bold text-slate-900 text-sm">Ata Altını</h3>
              </div>
              <p className="text-xs text-slate-600">
                Atatürk portreli özel basım altın. Koleksiyon değeri yüksektir.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/80 backdrop-blur-sm border-2 border-orange-100 shadow-md">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">�</span>
                <h3 className="font-bold text-slate-900 text-sm">Reşat Altını</h3>
              </div>
              <p className="text-xs text-slate-600">
                Osmanlı döneminden kalma tarihi altın. Koleksiyon değeri en yüksek türdür.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/80 backdrop-blur-sm border-2 border-purple-100 shadow-md">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">�</span>
                <h3 className="font-bold text-slate-900 text-sm">14 Ayar Altın</h3>
              </div>
              <p className="text-xs text-slate-600">
                %58.5 saflıkta. En ekonomik altın türü, günlük takı için uygundur.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/80 backdrop-blur-sm border-2 border-gray-200 shadow-md">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🥈</span>
                <h3 className="font-bold text-slate-900 text-sm">Gümüş</h3>
              </div>
              <p className="text-xs text-slate-600">
                Değerli metal. Altına göre daha ekonomik yatırım alternatifidir.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="max-w-6xl mx-auto mt-8">
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
