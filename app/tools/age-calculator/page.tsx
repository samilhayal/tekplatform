import { Metadata } from "next"
import { AgeCalculator } from "@/components/tools/age-calculator"

export const metadata: Metadata = {
  title: "Yaş Hesaplama | Online Araçlar",
  description: "Doğum tarihinize göre tam yaşınızı, burcunuzu, hangi kuşağa ait olduğunuzu ve daha fazlasını öğrenin. Detaylı yaş hesaplama aracı.",
  keywords: ["yaş hesaplama", "age calculator", "doğum tarihi", "burç", "kuşak", "yaş öğrenme"],
}

export default function AgeCalculatorPage() {
  return (
    <div className="min-h-screen relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-purple-200 to-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-br from-blue-200 to-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-gradient-to-br from-indigo-200 to-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <div className="max-w-5xl mx-auto mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 border border-purple-200 mb-6 animate-in fade-in slide-in-from-top duration-700">
          <div className="h-2 w-2 rounded-full bg-purple-500 animate-pulse"></div>
          <span className="text-sm font-semibold bg-gradient-to-r from-purple-700 to-indigo-700 bg-clip-text text-transparent">
            Detaylı Yaş Analizi
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-in fade-in slide-in-from-bottom duration-700 delay-100">
          <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
            Yaş Hesaplama
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom duration-700 delay-200">
          Doğum tarihinizi girin, tam yaşınızı, burcunuzu, kuşağınızı ve ilginç istatistikleri keşfedin.
        </p>
      </div>

      {/* Main Tool */}
      <div className="animate-in fade-in slide-in-from-bottom duration-700 delay-300">
        <AgeCalculator />
      </div>

      {/* How to Use Section */}
      <div className="max-w-5xl mx-auto mt-16 animate-in fade-in slide-in-from-bottom duration-700 delay-500">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8 text-center">
          Nasıl Kullanılır?
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="group p-6 rounded-2xl border-2 border-slate-100 hover:border-purple-200 hover:shadow-lg transition-all duration-300 bg-white/50 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform">
                1
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Doğum Tarihinizi Girin</h3>
                <p className="text-slate-600">
                  Takvim seçiciden doğum tarihinizi seçin veya manuel olarak girin.
                </p>
                <div className="mt-3 p-3 bg-purple-50 rounded-lg text-sm text-slate-700">
                  <span className="font-semibold text-purple-700">Örnek:</span> 15 Mart 1990
                </div>
              </div>
            </div>
          </div>

          <div className="group p-6 rounded-2xl border-2 border-slate-100 hover:border-indigo-200 hover:shadow-lg transition-all duration-300 bg-white/50 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform">
                2
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Yaşınızı Hesaplayın</h3>
                <p className="text-slate-600">
                  "Hesapla" butonuna tıklayın. Yıl, ay ve gün cinsinden tam yaşınız gösterilir.
                </p>
                <div className="mt-3 p-3 bg-indigo-50 rounded-lg text-sm text-slate-700">
                  <span className="font-semibold text-indigo-700">Sonuç:</span> 33 yıl, 10 ay, 15 gün
                </div>
              </div>
            </div>
          </div>

          <div className="group p-6 rounded-2xl border-2 border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 bg-white/50 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
                3
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Burç ve Kuşak Bilgisi</h3>
                <p className="text-slate-600">
                  Batı ve Çin burcunuzu, hangi kuşağa ait olduğunuzu öğrenin.
                </p>
                <div className="mt-3 p-3 bg-blue-50 rounded-lg text-sm text-slate-700">
                  <span className="font-semibold text-blue-700">Bonus:</span> Balık burcu, Y Kuşağı
                </div>
              </div>
            </div>
          </div>

          <div className="group p-6 rounded-2xl border-2 border-slate-100 hover:border-purple-200 hover:shadow-lg transition-all duration-300 bg-white/50 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform">
                4
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">İlginç İstatistikler</h3>
                <p className="text-slate-600">
                  Yaşadığınız toplam gün, saat ve doğum gününüze kalan süreyi görün.
                </p>
                <div className="mt-3 p-3 bg-purple-50 rounded-lg text-sm text-slate-700">
                  <span className="font-semibold text-purple-700">Örnek:</span> 12,000+ gün yaşadınız
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Zodiac Info Section */}
      <div className="max-w-5xl mx-auto mt-16 animate-in fade-in slide-in-from-bottom duration-700 delay-700">
        <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-purple-50 border-2 border-purple-100 shadow-xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            ⭐ Burç ve Kuşak Bilgileri
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-white/80 backdrop-blur-sm border-2 border-purple-100 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-2xl shadow-lg">
                  ♈
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Batı Burçları</h3>
                  <p className="text-sm text-purple-700">12 Astroloji Burcu</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 mb-3">
                Doğum tarihinize göre size ait olan burcu gösteriyoruz. 12 burç vardır:
              </p>
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                {['♈ Koç', '♉ Boğa', '♊ İkizler', '♋ Yengeç', '♌ Aslan', '♍ Başak', '♎ Terazi', '♏ Akrep', '♐ Yay', '♑ Oğlak', '♒ Kova', '♓ Balık'].map((sign) => (
                  <div key={sign} className="p-2 rounded-lg bg-purple-50 border border-purple-100">
                    <div className="font-semibold text-purple-700">{sign}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-xl bg-white/80 backdrop-blur-sm border-2 border-red-100 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center text-white text-2xl shadow-lg">
                  🐉
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Çin Burçları</h3>
                  <p className="text-sm text-red-700">12 Yıllık Döngü</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 mb-3">
                Doğum yılınıza göre Çin burcu hesaplanır. 12 hayvanlı döngü:
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                {['Fare 🐭', 'Öküz 🐂', 'Kaplan 🐅', 'Tavşan 🐰', 'Ejderha 🐉', 'Yılan 🐍', 'At 🐴', 'Koyun 🐑', 'Maymun 🐵', 'Horoz 🐓', 'Köpek 🐕', 'Domuz 🐖'].map((animal) => (
                  <span key={animal} className="px-3 py-2 rounded-lg bg-red-50 border border-red-100 font-semibold text-red-700">
                    {animal}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-xl bg-white/80 backdrop-blur-sm border-2 border-blue-100 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white text-2xl shadow-lg">
                  👥
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Kuşaklar</h3>
                  <p className="text-sm text-blue-700">Jenerasyon Analizi</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="p-2 rounded-lg bg-blue-50 border border-blue-100">
                  <strong className="text-blue-700">Alpha:</strong> 2013+ (Dijital yerliler)
                </div>
                <div className="p-2 rounded-lg bg-blue-50 border border-blue-100">
                  <strong className="text-blue-700">Z Kuşağı:</strong> 1997-2012 (Teknoloji ile büyüdü)
                </div>
                <div className="p-2 rounded-lg bg-blue-50 border border-blue-100">
                  <strong className="text-blue-700">Y Kuşağı:</strong> 1981-1996 (Millennials)
                </div>
                <div className="p-2 rounded-lg bg-blue-50 border border-blue-100">
                  <strong className="text-blue-700">X Kuşağı:</strong> 1965-1980 (Geçiş dönemi)
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-white/80 backdrop-blur-sm border-2 border-indigo-100 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl shadow-lg">
                  🎂
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">İlginç Bilgiler</h3>
                  <p className="text-sm text-indigo-700">Hakkınızda</p>
                </div>
              </div>
              <div className="space-y-2 text-sm text-slate-700">
                <p className="flex items-center gap-2">
                  <span>⏰</span>
                  <span>Yaşadığınız toplam saat sayısı</span>
                </p>
                <p className="flex items-center gap-2">
                  <span>💓</span>
                  <span>Kalbinizin attığı tahmini sayı</span>
                </p>
                <p className="flex items-center gap-2">
                  <span>🌍</span>
                  <span>Dünya'nın güneş turları</span>
                </p>
                <p className="flex items-center gap-2">
                  <span>🎉</span>
                  <span>Doğum gününüze kalan gün</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fun Section */}
      <div className="max-w-5xl mx-auto mt-8">
        <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-100 to-indigo-100 border-2 border-purple-200">
          <h3 className="font-bold text-purple-900 mb-4 text-center text-lg">
            🎉 Bilmeniz İlginç Olabilecek Şeyler
          </h3>
          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            <div className="p-4 rounded-xl bg-white/80 border border-purple-100 text-center">
              <div className="text-2xl mb-2">🌟</div>
              <p className="font-semibold text-slate-900 mb-1">Benzersizsiniz</p>
              <p className="text-slate-600">Her doğum tarihi özeldir ve size özgü bir hikaye anlatır</p>
            </div>
            <div className="p-4 rounded-xl bg-white/80 border border-indigo-100 text-center">
              <div className="text-2xl mb-2">🎂</div>
              <p className="font-semibold text-slate-900 mb-1">Doğum Günü</p>
              <p className="text-slate-600">Doğum gününüz yaklaşırken sayacı takip edin</p>
            </div>
            <div className="p-4 rounded-xl bg-white/80 border border-purple-100 text-center">
              <div className="text-2xl mb-2">📅</div>
              <p className="font-semibold text-slate-900 mb-1">Zaman Farkındalığı</p>
              <p className="text-slate-600">Yaşadığınız her günün değerini bilin</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
