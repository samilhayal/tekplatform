import { Metadata } from "next"
import { CurrencyConverter } from "@/components/tools/currency-converter"

export const metadata: Metadata = {
  title: "Güncel Döviz Kurları | Online Araçlar",
  description: "Güncel kurlarla döviz dönüşümü yapın. USD, EUR, GBP, TRY ve tüm dünya para birimlerini gerçek zamanlı olarak çevirin.",
  keywords: ["döviz kurları", "currency converter", "para birimi", "dolar", "euro", "sterlin", "kur dönüştürme"],
}

export default function CurrencyConverterPage() {
  return (
    <div className="min-h-screen relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-green-200 to-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-br from-blue-200 to-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-gradient-to-br from-emerald-200 to-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <div className="max-w-5xl mx-auto mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200 mb-6 animate-in fade-in slide-in-from-top duration-700">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-sm font-semibold bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent">
            Gerçek Zamanlı Kur Verileri
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-in fade-in slide-in-from-bottom duration-700 delay-100">
          <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-cyan-600 bg-clip-text text-transparent">
            Güncel Döviz Kurları
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom duration-700 delay-200">
          150+ para birimi arasında anlık dönüşüm yapın. Güncel kurlarla hızlı ve doğru sonuçlar alın.
        </p>
      </div>

      {/* Main Tool */}
      <div className="animate-in fade-in slide-in-from-bottom duration-700 delay-300">
        <CurrencyConverter />
      </div>

      {/* How to Use Section */}
      <div className="max-w-5xl mx-auto mt-16 animate-in fade-in slide-in-from-bottom duration-700 delay-500">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8 text-center">
          Nasıl Kullanılır?
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="group p-6 rounded-2xl border-2 border-slate-100 hover:border-green-200 hover:shadow-lg transition-all duration-300 bg-white/50 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-green-500/30 group-hover:scale-110 transition-transform">
                1
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Para Birimlerini Seçin</h3>
                <p className="text-slate-600">
                  Çevirmek istediğiniz ve sonuç alacağınız para birimlerini açılır menülerden seçin.
                </p>
                <div className="mt-3 p-3 bg-green-50 rounded-lg text-sm text-slate-700">
                  <span className="font-semibold text-green-700">Örnek:</span> USD (ABD Doları) → TRY (Türk Lirası)
                </div>
              </div>
            </div>
          </div>

          <div className="group p-6 rounded-2xl border-2 border-slate-100 hover:border-emerald-200 hover:shadow-lg transition-all duration-300 bg-white/50 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform">
                2
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Miktarı Girin</h3>
                <p className="text-slate-600">
                  Dönüştürmek istediğiniz miktarı ilk kutucuğa yazın. Sonuç otomatik hesaplanır.
                </p>
                <div className="mt-3 p-3 bg-emerald-50 rounded-lg text-sm text-slate-700">
                  <span className="font-semibold text-emerald-700">Örnek:</span> 100 USD = ~3,200 TRY
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
                <h3 className="text-lg font-bold text-slate-900 mb-2">Anlık Sonuç Görün</h3>
                <p className="text-slate-600">
                  Dönüştürülen miktar ve güncel kur bilgisi anında ekranınızda görünür.
                </p>
                <div className="mt-3 p-3 bg-blue-50 rounded-lg text-sm text-slate-700">
                  <span className="font-semibold text-blue-700">İpucu:</span> Sonucu kopyalayabilir veya para birimlerini yer değiştirebilirsiniz
                </div>
              </div>
            </div>
          </div>

          <div className="group p-6 rounded-2xl border-2 border-slate-100 hover:border-teal-200 hover:shadow-lg transition-all duration-300 bg-white/50 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-teal-500/30 group-hover:scale-110 transition-transform">
                4
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Popüler Kurları İnceleyin</h3>
                <p className="text-slate-600">
                  Sayfanın altında popüler döviz kurlarını tek tıkla görebilir ve seçebilirsiniz.
                </p>
                <div className="mt-3 p-3 bg-teal-50 rounded-lg text-sm text-slate-700">
                  <span className="font-semibold text-teal-700">Özellik:</span> Kurları yenilemek için butona tıklayın
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-5xl mx-auto mt-16 animate-in fade-in slide-in-from-bottom duration-700 delay-700">
        <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-green-50 border-2 border-green-100 shadow-xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            ✨ Özellikler
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-green-100">
              <span className="text-2xl">🌍</span>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">150+ Para Birimi</h3>
                <p className="text-sm text-slate-600">Tüm dünya para birimlerini destekliyoruz</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-green-100">
              <span className="text-2xl">⚡</span>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Gerçek Zamanlı</h3>
                <p className="text-sm text-slate-600">Güncel kurlarla anlık dönüşüm</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-green-100">
              <span className="text-2xl">🔄</span>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Hızlı Değişim</h3>
                <p className="text-sm text-slate-600">Para birimlerini tek tıkla değiştirin</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-green-100">
              <span className="text-2xl">📊</span>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Popüler Kurlar</h3>
                <p className="text-sm text-slate-600">En çok kullanılan kurları görün</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-green-100">
              <span className="text-2xl">📋</span>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Kolay Kopyalama</h3>
                <p className="text-sm text-slate-600">Sonuçları tek tıkla kopyalayın</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-green-100">
              <span className="text-2xl">🎯</span>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Doğru Hesaplama</h3>
                <p className="text-sm text-slate-600">4 ondalık hassasiyetle sonuçlar</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
