import { Metadata } from "next"
import { BMICalculator } from "@/components/tools/bmi-calculator"

export const metadata: Metadata = {
  title: "BMI Hesaplama | Online Araçlar",
  description: "Vücut kitle indeksinizi (BMI) hesaplayın ve sağlık durumunuzu öğrenin. Ücretsiz BMI hesaplayıcı ile ideal kilonuzu belirleyin.",
  keywords: ["bmi hesaplama", "vücut kitle indeksi", "ideal kilo", "kilo hesaplama", "sağlık", "fitness", "bmi calculator"],
}

export default function BMICalculatorPage() {
  return (
    <div className="min-h-screen relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-pink-200 to-rose-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-br from-purple-200 to-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-gradient-to-br from-rose-200 to-red-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <div className="max-w-5xl mx-auto mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-100 to-rose-100 border border-pink-200 mb-6 animate-in fade-in slide-in-from-top duration-700">
          <div className="h-2 w-2 rounded-full bg-pink-500 animate-pulse"></div>
          <span className="text-sm font-semibold bg-gradient-to-r from-pink-700 to-rose-700 bg-clip-text text-transparent">
            Sağlığınızı Kontrol Edin
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-in fade-in slide-in-from-bottom duration-700 delay-100">
          <span className="bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 bg-clip-text text-transparent">
            BMI Hesaplama
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom duration-700 delay-200">
          Vücut kitle indeksinizi hesaplayarak sağlık durumunuz hakkında bilgi edinin. Metrik ve imperial birim desteği.
        </p>
      </div>

      {/* Main Tool */}
      <div className="animate-in fade-in slide-in-from-bottom duration-700 delay-300">
        <BMICalculator />
      </div>

      {/* How to Use Section */}
      <div className="max-w-5xl mx-auto mt-16 animate-in fade-in slide-in-from-bottom duration-700 delay-500">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8 text-center">
          Nasıl Kullanılır?
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="group p-6 rounded-2xl border-2 border-slate-100 hover:border-pink-200 hover:shadow-lg transition-all duration-300 bg-white/50 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-pink-500/30 group-hover:scale-110 transition-transform">
                1
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Ölçü Birimi Seçin</h3>
                <p className="text-slate-600">
                  Metrik (cm/kg) veya Imperial (inç/lbs) sistemini seçin.
                </p>
                <div className="mt-3 p-3 bg-pink-50 rounded-lg text-sm text-slate-700">
                  <span className="font-semibold text-pink-700">Metrik:</span> Santimetre ve kilogram
                </div>
              </div>
            </div>
          </div>

          <div className="group p-6 rounded-2xl border-2 border-slate-100 hover:border-rose-200 hover:shadow-lg transition-all duration-300 bg-white/50 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-rose-500/30 group-hover:scale-110 transition-transform">
                2
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Boy ve Kilo Girin</h3>
                <p className="text-slate-600">
                  Mevcut boyunuzu ve kilonuzu ilgili alanlara yazın.
                </p>
                <div className="mt-3 p-3 bg-rose-50 rounded-lg text-sm text-slate-700">
                  <span className="font-semibold text-rose-700">Örnek:</span> 175 cm, 70 kg
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
                <h3 className="text-lg font-bold text-slate-900 mb-2">BMI'nizi Hesaplayın</h3>
                <p className="text-slate-600">
                  "Hesapla" butonuna tıklayın ve sonucu görün. BMI değeriniz ve kategoriniz gösterilir.
                </p>
                <div className="mt-3 p-3 bg-purple-50 rounded-lg text-sm text-slate-700">
                  <span className="font-semibold text-purple-700">Sonuç:</span> BMI değeri ve sağlık kategorisi
                </div>
              </div>
            </div>
          </div>

          <div className="group p-6 rounded-2xl border-2 border-slate-100 hover:border-pink-200 hover:shadow-lg transition-all duration-300 bg-white/50 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-pink-500/30 group-hover:scale-110 transition-transform">
                4
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Önerileri İnceleyin</h3>
                <p className="text-slate-600">
                  Kategorinize özel sağlık önerileri ve tavsiyeler alın.
                </p>
                <div className="mt-3 p-3 bg-pink-50 rounded-lg text-sm text-slate-700">
                  <span className="font-semibold text-pink-700">Bonus:</span> Kişiselleştirilmiş sağlık tavsiyeleri
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BMI Info Section */}
      <div className="max-w-5xl mx-auto mt-16 animate-in fade-in slide-in-from-bottom duration-700 delay-700">
        <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-pink-50 border-2 border-pink-100 shadow-xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            ✨ BMI Kategorileri Nedir?
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            <div className="p-5 rounded-xl bg-white/80 backdrop-blur-sm border-2 border-blue-100 shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white font-bold">
                  📉
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Zayıf</h3>
                  <p className="text-sm text-blue-700 font-semibold">BMI &lt; 18.5</p>
                </div>
              </div>
              <p className="text-sm text-slate-600">
                Kilo almanız sağlığınız için faydalı olabilir. Dengeli beslenme ve düzenli egzersiz programı oluşturun.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white/80 backdrop-blur-sm border-2 border-green-100 shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold">
                  ✅
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Normal</h3>
                  <p className="text-sm text-green-700 font-semibold">BMI 18.5 - 24.9</p>
                </div>
              </div>
              <p className="text-sm text-slate-600">
                Sağlıklı kilo aralığındasınız! Bu kilonuzu korumak için sağlıklı yaşam tarzınızı sürdürün.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white/80 backdrop-blur-sm border-2 border-yellow-100 shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center text-white font-bold">
                  ⚠️
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Fazla Kilolu</h3>
                  <p className="text-sm text-yellow-700 font-semibold">BMI 25 - 29.9</p>
                </div>
              </div>
              <p className="text-sm text-slate-600">
                Sağlıklı kilo verme hedefleri belirleyin. Kalori açığı ve düzenli egzersiz ile ideal kiloya ulaşabilirsiniz.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white/80 backdrop-blur-sm border-2 border-red-100 shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center text-white font-bold">
                  🏥
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Obez</h3>
                  <p className="text-sm text-red-700 font-semibold">BMI ≥ 30</p>
                </div>
              </div>
              <p className="text-sm text-slate-600">
                Sağlık riskleri nedeniyle bir uzmanla görüşmeniz önerilir. Profesyonel destek ile hedeflerinize ulaşabilirsiniz.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-gradient-to-r from-pink-50 to-rose-50 border-2 border-pink-200">
            <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-xl">📊</span>
              BMI Formülü
            </h3>
            <div className="space-y-2 text-sm text-slate-700">
              <p className="font-mono bg-white/80 p-3 rounded-lg border border-pink-100">
                BMI = Kilo (kg) / [Boy (m)]²
              </p>
              <p className="font-mono bg-white/80 p-3 rounded-lg border border-pink-100">
                BMI = [Kilo (lbs) / Boy (inç)²] × 703
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Health Tips */}
      <div className="max-w-5xl mx-auto mt-8">
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
            <div className="text-3xl mb-3">🥗</div>
            <h3 className="font-bold text-slate-900 mb-2">Dengeli Beslenme</h3>
            <p className="text-sm text-slate-600">
              Sağlıklı kilo için protein, karbonhidrat ve yağ dengesine dikkat edin.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200">
            <div className="text-3xl mb-3">🏃</div>
            <h3 className="font-bold text-slate-900 mb-2">Düzenli Egzersiz</h3>
            <p className="text-sm text-slate-600">
              Haftada en az 150 dakika orta tempolu egzersiz yapın.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200">
            <div className="text-3xl mb-3">💤</div>
            <h3 className="font-bold text-slate-900 mb-2">Kaliteli Uyku</h3>
            <p className="text-sm text-slate-600">
              Günde 7-9 saat kaliteli uyku metabolizmanızı düzenler.
            </p>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="max-w-5xl mx-auto mt-8">
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-sm text-slate-700 text-center">
          <p>
            <strong>⚠️ Önemli Not:</strong> BMI genel bir göstergedir ve kas kütlesi, kemik yoğunluğu gibi faktörleri dikkate almaz. 
            Kesin sağlık değerlendirmesi için bir doktor veya diyetisyene danışın.
          </p>
        </div>
      </div>
    </div>
  )
}
