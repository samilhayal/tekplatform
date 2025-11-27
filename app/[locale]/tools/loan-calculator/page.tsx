import { Metadata } from "next"
import { LoanCalculator } from "@/components/tools/loan-calculator"
import { ToolPageHeader } from "@/components/tool-page-header"

export const metadata: Metadata = {
  title: "Kredi Hesaplama | Online Araçlar",
  description: "Konut, taşıt ve ihtiyaç kredisi hesaplama. Aylık ödeme, toplam maliyet ve ödeme planını hesaplayın.",
  keywords: ["kredi hesaplama", "loan calculator", "aylık ödeme", "kredi faizi", "konut kredisi", "taşıt kredisi", "ihtiyaç kredisi"],
}

export default function LoanCalculatorPage() {
  return (
    <div className="min-h-screen relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-200 to-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-br from-cyan-200 to-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-gradient-to-br from-indigo-200 to-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header with Social Share */}
      <ToolPageHeader
        badge="Akıllı Kredi Planlaması"
        title="Kredi Hesaplama"
        description="Konut, taşıt, ihtiyaç ve işletme kredisi hesaplamaları. Aylık ödeme, toplam maliyet ve detaylı ödeme planı."
        badgeColors={{
          bg: 'from-blue-100 to-indigo-100',
          border: 'border-blue-200',
          dot: 'bg-blue-500',
          text: 'from-blue-700 to-indigo-700'
        }}
        titleGradient="from-blue-600 via-indigo-600 to-purple-600"
      />

      {/* Main Tool */}
      <div className="animate-in fade-in slide-in-from-bottom duration-700 delay-300">
        <LoanCalculator />
      </div>

      {/* How to Use Section */}
      <div className="max-w-5xl mx-auto mt-16 animate-in fade-in slide-in-from-bottom duration-700 delay-500">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8 text-center">
          Nasıl Kullanılır?
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="group p-6 rounded-2xl border-2 border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 bg-white/50 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
                1
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Kredi Türünü Seçin</h3>
                <p className="text-slate-600">
                  Konut, taşıt, ihtiyaç veya işletme kredisi seçeneklerinden birini seçin.
                </p>
                <div className="mt-3 p-3 bg-blue-50 rounded-lg text-sm text-slate-700">
                  <span className="font-semibold text-blue-700">Örnek:</span> Konut Kredisi 🏠
                </div>
              </div>
            </div>
          </div>

          <div className="group p-6 rounded-2xl border-2 border-slate-100 hover:border-indigo-200 hover:shadow-lg transition-all duration-300 bg-white/50 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform">
                2
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Kredi Bilgilerini Girin</h3>
                <p className="text-slate-600">
                  Kredi tutarı, aylık faiz oranı ve vade (ay) bilgilerini doldurun.
                </p>
                <div className="mt-3 p-3 bg-indigo-50 rounded-lg text-sm text-slate-700">
                  <span className="font-semibold text-indigo-700">Örnek:</span> 100,000 TL - %2.5 - 12 ay
                </div>
              </div>
            </div>
          </div>

          <div className="group p-6 rounded-2xl border-2 border-slate-100 hover:border-purple-200 hover:shadow-lg transition-all duration-300 bg-white/50 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform">
                3
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Sonuçları Görüntüleyin</h3>
                <p className="text-slate-600">
                  Aylık ödeme, toplam ödeme ve toplam faiz miktarını anında görün.
                </p>
                <div className="mt-3 p-3 bg-purple-50 rounded-lg text-sm text-slate-700">
                  <span className="font-semibold text-purple-700">Sonuç:</span> Aylık 8,841 TL
                </div>
              </div>
            </div>
          </div>

          <div className="group p-6 rounded-2xl border-2 border-slate-100 hover:border-cyan-200 hover:shadow-lg transition-all duration-300 bg-white/50 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-cyan-500/30 group-hover:scale-110 transition-transform">
                4
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Ödeme Planını İnceleyin</h3>
                <p className="text-slate-600">
                  Detaylı ödeme planı ile her ay ne kadar anapara ve faiz ödeyeceğinizi görün.
                </p>
                <div className="mt-3 p-3 bg-cyan-50 rounded-lg text-sm text-slate-700">
                  <span className="font-semibold text-cyan-700">Özellik:</span> Ay-ay detaylı tablo
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Loan Types Info */}
      <div className="max-w-5xl mx-auto mt-16 animate-in fade-in slide-in-from-bottom duration-700 delay-700">
        <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50 border-2 border-blue-100 shadow-xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            💳 Kredi Türleri
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-white/80 backdrop-blur-sm border-2 border-blue-100 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl shadow-lg">
                  🏠
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Konut Kredisi</h3>
                  <p className="text-sm text-blue-700">Ev alımı için</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 mb-3">
                Ev satın almak için kullanılan uzun vadeli krediler. Genellikle düşük faiz oranlarına sahiptir.
              </p>
              <div className="flex items-center gap-2 text-xs text-blue-700">
                <span className="font-semibold">Tipik Vade:</span>
                <span>60-240 ay</span>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-white/80 backdrop-blur-sm border-2 border-green-100 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-2xl shadow-lg">
                  🚗
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Taşıt Kredisi</h3>
                  <p className="text-sm text-green-700">Araç alımı için</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 mb-3">
                Yeni veya ikinci el araç alımında kullanılan krediler. Orta vadeli ve uygun faizli olabilir.
              </p>
              <div className="flex items-center gap-2 text-xs text-green-700">
                <span className="font-semibold">Tipik Vade:</span>
                <span>12-60 ay</span>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-white/80 backdrop-blur-sm border-2 border-purple-100 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white text-2xl shadow-lg">
                  💳
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">İhtiyaç Kredisi</h3>
                  <p className="text-sm text-purple-700">Genel harcamalar için</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 mb-3">
                Kişisel ihtiyaçlar için kullanılan esnek krediler. Hızlı onay süreci ve çeşitli vade seçenekleri.
              </p>
              <div className="flex items-center gap-2 text-xs text-purple-700">
                <span className="font-semibold">Tipik Vade:</span>
                <span>3-36 ay</span>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-white/80 backdrop-blur-sm border-2 border-orange-100 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white text-2xl shadow-lg">
                  💼
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">İşletme Kredisi</h3>
                  <p className="text-sm text-orange-700">Ticari kullanım için</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 mb-3">
                İşletmelerin yatırım ve işletme sermayesi ihtiyaçları için kullanılan krediler.
              </p>
              <div className="flex items-center gap-2 text-xs text-orange-700">
                <span className="font-semibold">Tipik Vade:</span>
                <span>12-120 ay</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Important Notes */}
      <div className="max-w-5xl mx-auto mt-8">
        <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200">
          <h3 className="font-bold text-blue-900 mb-4 text-center text-lg">
            💡 Önemli Bilgiler
          </h3>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-xl bg-white/80 border border-blue-100">
              <div className="flex items-start gap-2">
                <span className="text-xl flex-shrink-0">📊</span>
                <div>
                  <p className="font-semibold text-slate-900 mb-1">Faiz Oranı</p>
                  <p className="text-slate-600">Aylık faiz oranını girin. Yıllık faiz oranınız varsa 12'ye bölün.</p>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white/80 border border-blue-100">
              <div className="flex items-start gap-2">
                <span className="text-xl flex-shrink-0">📅</span>
                <div>
                  <p className="font-semibold text-slate-900 mb-1">Vade</p>
                  <p className="text-slate-600">Krediyi kaç ayda geri ödeyeceğinizi belirtin.</p>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white/80 border border-blue-100">
              <div className="flex items-start gap-2">
                <span className="text-xl flex-shrink-0">💰</span>
                <div>
                  <p className="font-semibold text-slate-900 mb-1">Erken Ödeme</p>
                  <p className="text-slate-600">Erken ödeme yaparak toplam faiz maliyetini düşürebilirsiniz.</p>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white/80 border border-blue-100">
              <div className="flex items-start gap-2">
                <span className="text-xl flex-shrink-0">📋</span>
                <div>
                  <p className="font-semibold text-slate-900 mb-1">Ödeme Planı</p>
                  <p className="text-slate-600">Detaylı tablo ile her ayın anapara ve faiz dağılımını görün.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="max-w-5xl mx-auto mt-8">
        <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl text-sm text-slate-700 text-center">
          <p>
            <strong>⚠️ Önemli Not:</strong> Bu hesaplama bilgilendirme amaçlıdır. 
            Kesin kredi koşulları için banka veya finans kuruluşuna başvurun. Ek masraflar (dosya, sigorta vb.) hesaplamaya dahil değildir.
          </p>
        </div>
      </div>
    </div>
  )
}
