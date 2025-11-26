import { Metadata } from "next"
import { PercentageCalculator } from "@/components/tools/percentage-calculator"
import Link from "next/link"
import { ArrowLeft, Percent } from "lucide-react"

export const metadata: Metadata = {
  title: "Yüzde Hesaplayıcı & Finans Araçları | Online Tools Hub",
  description: "Kapsamlı yüzde hesaplama, değişim oranı, basit ve bileşik faiz hesaplayıcı. Sonuçları PDF ve Excel olarak indirin.",
}

export default function PercentageCalculatorPage() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-200/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-6 sm:mb-8 text-sm sm:text-base font-medium group transition-all hover:gap-3"
        >
          <ArrowLeft className="h-4 w-4 flex-shrink-0 group-hover:-translate-x-1 transition-transform" />
          Ana Sayfaya Dön
        </Link>

        <div className="mb-8 sm:mb-12 text-center">
          <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 border border-indigo-200 mb-4">
            <Percent className="h-4 w-4 text-indigo-600 mr-2" />
            <span className="text-sm font-semibold text-indigo-900">Finans & Matematik Aracı</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent">
              Yüzde Hesaplayıcı
            </span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Profesyonel yüzde hesaplamaları yapın. Artış, azalış ve oran hesaplamalarını kolayca gerçekleştirin.
          </p>
        </div>

        <PercentageCalculator />

        <div className="mt-12 sm:mt-16">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* How to Use Card */}
            <div className="group relative overflow-hidden rounded-2xl border-2 border-indigo-100 bg-gradient-to-br from-white to-indigo-50/30 p-6 shadow-lg hover:shadow-xl transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-200/40 to-purple-200/40 rounded-full blur-2xl"></div>
              <div className="relative">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">1</span>
                  Nasıl Kullanılır?
                </h2>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs font-bold mt-0.5">✓</span>
                    <span>Sayı ve yüzde değerlerini girin</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs font-bold mt-0.5">✓</span>
                    <span>Yapmak istediğiniz işlemi seçin</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs font-bold mt-0.5">✓</span>
                    <span>Sonuç anında hesaplanır ve kopyalanabilir</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Examples Card */}
            <div className="group relative overflow-hidden rounded-2xl border-2 border-purple-100 bg-gradient-to-br from-white to-purple-50/30 p-6 shadow-lg hover:shadow-xl transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-200/40 to-pink-200/40 rounded-full blur-2xl"></div>
              <div className="relative">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white text-sm font-bold">💡</span>
                  Örnek Kullanımlar
                </h2>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="p-2 bg-white/60 rounded-lg"><strong>İndirim:</strong> 500₺'nin %20'si = 100₺</li>
                  <li className="p-2 bg-white/60 rounded-lg"><strong>Artış:</strong> 1000₺'ye %15 artış = 1150₺</li>
                  <li className="p-2 bg-white/60 rounded-lg"><strong>Oran:</strong> 50, 200'ün %25'idir</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="prose prose-slate max-w-none prose-sm sm:prose-base">
            <div className="bg-gradient-to-r from-slate-50 to-indigo-50 rounded-2xl p-6 sm:p-8 border border-slate-200">
              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-3">Yüzde Hesaplama İşlemleri</h3>
              
              <div className="grid sm:grid-cols-2 gap-4 text-sm sm:text-base">
                <div>
                  <h4 className="font-semibold text-indigo-900 mb-2">%'si Kaçtır</h4>
                  <p className="text-slate-700">Bir sayının belirli yüzdesini hesaplar. Örneğin, 200'ün %15'i = 30</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-purple-900 mb-2">Yüzde Kaçıdır</h4>
                  <p className="text-slate-700">Bir sayının diğerine oranını yüzde olarak bulur. Örneğin, 50, 200'ün %25'idir</p>
                </div>

                <div>
                  <h4 className="font-semibold text-green-900 mb-2">% Artış</h4>
                  <p className="text-slate-700">Bir sayıya yüzde ekleyerek yeni değeri bulur. Örneğin, 100'e %20 artış = 120</p>
                </div>

                <div>
                  <h4 className="font-semibold text-red-900 mb-2">% Azalış</h4>
                  <p className="text-slate-700">Bir sayıdan yüzde çıkararak yeni değeri bulur. Örneğin, 100'den %20 azalış = 80</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-white rounded-xl border border-indigo-200">
                <h4 className="font-semibold text-slate-900 mb-2 text-sm sm:text-base">💼 Kullanım Alanları</h4>
                <p className="text-slate-700 text-sm">
                  İndirim hesaplamaları, KDV hesaplama, kar-zarar analizi, büyüme oranları, 
                  vergi hesaplamaları ve daha birçok finansal işlem için kullanabilirsiniz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
