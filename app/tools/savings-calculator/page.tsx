import { Metadata } from "next"
import { SavingsCalculator } from "@/components/tools/savings-calculator"

export const metadata: Metadata = {
  title: "Tasarruf Hesaplama | Online Araçlar",
  description: "Düzenli tasarrufunuzun geleceğini hesaplayın. Bileşik faiz ile paranızın nasıl büyüyeceğini görün.",
  keywords: ["tasarruf hesaplama", "savings calculator", "bileşik faiz", "yatırım", "para biriktirme"],
}

export default function SavingsCalculatorPage() {
  return (
    <div className="min-h-screen relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-emerald-200 to-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-br from-green-200 to-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-gradient-to-br from-teal-200 to-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <div className="max-w-5xl mx-auto mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 border border-emerald-200 mb-6 animate-in fade-in slide-in-from-top duration-700">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-sm font-semibold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
            Geleceğinizi Planlayın
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-in fade-in slide-in-from-bottom duration-700 delay-100">
          <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 bg-clip-text text-transparent">
            Tasarruf Hesaplama
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom duration-700 delay-200">
          Düzenli tasarruf ve bileşik faiz gücü ile paranızın nasıl büyüyeceğini görün. Hedeflerinize ulaşın!
        </p>
      </div>

      {/* Main Tool */}
      <div className="animate-in fade-in slide-in-from-bottom duration-700 delay-300">
        <SavingsCalculator />
      </div>

      {/* How to Use Section */}
      <div className="max-w-5xl mx-auto mt-16 animate-in fade-in slide-in-from-bottom duration-700 delay-500">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8 text-center">
          Nasıl Kullanılır?
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="group p-6 rounded-2xl border-2 border-slate-100 hover:border-emerald-200 hover:shadow-lg transition-all duration-300 bg-white/50 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform">
                1
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Başlangıç Tutarını Girin</h3>
                <p className="text-slate-600">
                  Şu an elinizde olan veya başlangıçta yatıracağınız tutarı belirtin.
                </p>
                <div className="mt-3 p-3 bg-emerald-50 rounded-lg text-sm text-slate-700">
                  <span className="font-semibold text-emerald-700">Örnek:</span> 10,000 TL
                </div>
              </div>
            </div>
          </div>

          <div className="group p-6 rounded-2xl border-2 border-slate-100 hover:border-teal-200 hover:shadow-lg transition-all duration-300 bg-white/50 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-teal-500/30 group-hover:scale-110 transition-transform">
                2
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Aylık Katkı Belirleyin</h3>
                <p className="text-slate-600">
                  Her ay düzenli olarak ekleyeceğiniz tutarı girin.
                </p>
                <div className="mt-3 p-3 bg-teal-50 rounded-lg text-sm text-slate-700">
                  <span className="font-semibold text-teal-700">Örnek:</span> Aylık 1,000 TL
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
                <h3 className="text-lg font-bold text-slate-900 mb-2">Faiz ve Süre</h3>
                <p className="text-slate-600">
                  Yıllık faiz oranını ve kaç ay tasarruf edeceğinizi belirtin.
                </p>
                <div className="mt-3 p-3 bg-green-50 rounded-lg text-sm text-slate-700">
                  <span className="font-semibold text-green-700">Örnek:</span> %15 faiz, 12 ay
                </div>
              </div>
            </div>
          </div>

          <div className="group p-6 rounded-2xl border-2 border-slate-100 hover:border-emerald-200 hover:shadow-lg transition-all duration-300 bg-white/50 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform">
                4
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Büyümeyi İzleyin</h3>
                <p className="text-slate-600">
                  Toplam birikim, kazanılan faiz ve aylık büyüme grafiğini görün.
                </p>
                <div className="mt-3 p-3 bg-emerald-50 rounded-lg text-sm text-slate-700">
                  <span className="font-semibold text-emerald-700">Sonuç:</span> Detaylı büyüme analizi
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Savings Tips */}
      <div className="max-w-5xl mx-auto mt-16 animate-in fade-in slide-in-from-bottom duration-700 delay-700">
        <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-emerald-50 border-2 border-emerald-100 shadow-xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            💰 Tasarruf İpuçları
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-white/80 backdrop-blur-sm border-2 border-emerald-100 shadow-md">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="font-bold text-slate-900 mb-2">Hedef Belirleyin</h3>
              <p className="text-sm text-slate-600">
                Ev, araba, tatil gibi somut hedefler koymak motivasyonu artırır.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white/80 backdrop-blur-sm border-2 border-teal-100 shadow-md">
              <div className="text-3xl mb-3">📅</div>
              <h3 className="font-bold text-slate-900 mb-2">Otomatik Havale</h3>
              <p className="text-sm text-slate-600">
                Maaş gününde otomatik tasarruf havalesi kurarak disiplinli olun.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white/80 backdrop-blur-sm border-2 border-green-100 shadow-md">
              <div className="text-3xl mb-3">📈</div>
              <h3 className="font-bold text-slate-900 mb-2">Bileşik Faiz</h3>
              <p className="text-sm text-slate-600">
                Faizin üzerine faiz kazanarak paranız katlanarak büyür.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Example Scenarios */}
      <div className="max-w-5xl mx-auto mt-8">
        <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200">
          <h3 className="font-bold text-emerald-900 mb-4 text-center text-lg">
            📊 Örnek Senaryolar
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/80 border border-emerald-100">
              <h4 className="font-semibold text-slate-900 mb-2">🏡 Ev Peşinatı</h4>
              <p className="text-sm text-slate-600 mb-2">
                Başlangıç: 50,000 TL<br />
                Aylık: 2,500 TL<br />
                Faiz: %18 (yıllık)<br />
                Süre: 24 ay
              </p>
              <p className="text-sm font-bold text-emerald-700">
                → ~72,500 TL birikim
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/80 border border-teal-100">
              <h4 className="font-semibold text-slate-900 mb-2">🚗 Araba Alımı</h4>
              <p className="text-sm text-slate-600 mb-2">
                Başlangıç: 20,000 TL<br />
                Aylık: 3,000 TL<br />
                Faiz: %15 (yıllık)<br />
                Süre: 12 ay
              </p>
              <p className="text-sm font-bold text-teal-700">
                → ~59,100 TL birikim
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
