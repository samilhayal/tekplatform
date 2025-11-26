import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Shield, Lock, Eye, Database, Cookie, Mail } from "lucide-react"

export const metadata: Metadata = {
  title: "Gizlilik Politikası | Online Tools Hub",
  description: "Online Tools Hub gizlilik politikası. Verilerinizin nasıl korunduğunu öğrenin.",
}

export default function PrivacyPage() {
  return (
    <div className="w-full">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link 
          href="/" 
          className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-6 text-sm sm:text-base group"
        >
          <ArrowLeft className="h-4 w-4 mr-2 flex-shrink-0 group-hover:-translate-x-1 transition-transform" />
          Ana Sayfaya Dön
        </Link>

        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200">
            <Shield className="w-4 h-4 text-green-600" />
            <span className="text-sm font-semibold text-green-700">Son Güncelleme: 22 Kasım 2025</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4 bg-gradient-to-r from-slate-900 to-green-900 bg-clip-text text-transparent">
            Gizlilik Politikası
          </h1>
          <p className="text-lg sm:text-xl text-slate-600">
            Gizliliğiniz bizim için önemlidir
          </p>
        </div>

        <div className="prose prose-slate max-w-none space-y-8">
          {/* Introduction */}
          <div className="bg-gradient-to-br from-white to-green-50 rounded-2xl p-8 border border-green-100 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <Lock className="w-6 h-6 text-green-600" />
              Giriş
            </h2>
            <p className="text-slate-700 leading-relaxed m-0">
              Online Tools Hub olarak, kullanıcılarımızın gizliliğini en üst düzeyde korumayı taahhüt ediyoruz. 
              Bu gizlilik politikası, web sitemizi ziyaret ettiğinizde ve hizmetlerimizi kullandığınızda 
              bilgilerinizin nasıl toplandığını, kullanıldığını ve korunduğunu açıklar.
            </p>
          </div>

          {/* Data Collection */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <Database className="w-6 h-6 text-indigo-600" />
              Toplanan Bilgiler
            </h2>
            
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm mb-4">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">1. Otomatik Olarak Toplanan Bilgiler</h3>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2" />
                  <span><strong>Tarayıcı Bilgileri:</strong> Tarayıcı türü, sürümü ve dil tercihleri</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2" />
                  <span><strong>Cihaz Bilgileri:</strong> İşletim sistemi, ekran çözünürlüğü</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2" />
                  <span><strong>Kullanım Verileri:</strong> Ziyaret edilen sayfalar, kullanılan araçlar</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">2. Yerel Depolama (LocalStorage)</h3>
              <p className="text-slate-700 mb-3">
                Bazı araçlarımız (örneğin: Focus Timer, Percentage Calculator) kullanıcı tercihlerini ve 
                geçmiş hesaplamaları kaydetmek için tarayıcınızın yerel depolama alanını kullanır.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900 m-0">
                  <strong>Önemli:</strong> Bu veriler yalnızca kendi cihazınızda saklanır ve asla sunucularımıza gönderilmez.
                </p>
              </div>
            </div>
          </div>

          {/* How We Use Data */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <Eye className="w-6 h-6 text-purple-600" />
              Bilgilerin Kullanımı
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
                <h4 className="font-semibold text-slate-900 mb-2">Hizmet İyileştirme</h4>
                <p className="text-sm text-slate-700 m-0">
                  Kullanıcı deneyimini geliştirmek ve araçlarımızı optimize etmek için anonim kullanım istatistikleri topluyoruz.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                <h4 className="font-semibold text-slate-900 mb-2">Güvenlik</h4>
                <p className="text-sm text-slate-700 m-0">
                  Kötüye kullanımı önlemek ve hizmetimizin güvenliğini sağlamak için gerekli güvenlik önlemlerini alıyoruz.
                </p>
              </div>
            </div>
          </div>

          {/* Cookies */}
          <div className="bg-gradient-to-br from-white to-amber-50 rounded-2xl p-8 border border-amber-100 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <Cookie className="w-6 h-6 text-amber-600" />
              Çerezler (Cookies)
            </h2>
            <p className="text-slate-700 mb-4">
              Web sitemiz, kullanıcı deneyimini iyileştirmek için minimal düzeyde çerez kullanmaktadır:
            </p>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2" />
                <span><strong>Temel Çerezler:</strong> Site işlevselliği için gerekli</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2" />
                <span><strong>Tercih Çerezleri:</strong> Dil ve tema tercihleri (isteğe bağlı)</span>
              </li>
            </ul>
          </div>

          {/* Third Parties */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Üçüncü Taraf Hizmetler</h2>
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <p className="text-slate-700 mb-4">
                Şu anda herhangi bir üçüncü taraf analitik veya izleme hizmeti kullanmamaktayız. 
                Gelecekte böyle bir hizmet kullanılacaksa, bu politika güncellenecek ve kullanıcılarımız bilgilendirilecektir.
              </p>
            </div>
          </div>

          {/* User Rights */}
          <div className="bg-gradient-to-br from-slate-50 to-indigo-50 rounded-2xl p-8 border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Kullanıcı Hakları</h2>
            <p className="text-slate-700 mb-4">Kullanıcılarımız aşağıdaki haklara sahiptir:</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                  ✓
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Erişim Hakkı</h4>
                  <p className="text-sm text-slate-600 m-0">Hangi verilerinizin toplandığını öğrenme</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                  ✓
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Silme Hakkı</h4>
                  <p className="text-sm text-slate-600 m-0">Yerel verilerinizi istediğiniz zaman silme</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-3 text-white flex items-center gap-3">
              <Mail className="w-6 h-6" />
              İletişim
            </h2>
            <p className="mb-4 text-indigo-100">
              Gizlilik politikamız hakkında sorularınız varsa, lütfen bizimle iletişime geçin:
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              İletişim Formu
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
