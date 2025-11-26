import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, FileText, AlertCircle, CheckCircle, XCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Kullanım Koşulları | Online Tools Hub",
  description: "Online Tools Hub kullanım koşulları ve şartları.",
}

export default function TermsPage() {
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
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-200">
            <FileText className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">Son Güncelleme: 22 Kasım 2025</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4 bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent">
            Kullanım Koşulları
          </h1>
          <p className="text-lg sm:text-xl text-slate-600">
            Online Tools Hub hizmetlerini kullanırken geçerli olan şartlar
          </p>
        </div>

        <div className="prose prose-slate max-w-none space-y-8">
          {/* Acceptance */}
          <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-8 border border-blue-100 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-blue-600" />
              Koşulların Kabulü
            </h2>
            <p className="text-slate-700 leading-relaxed m-0">
              Online Tools Hub web sitesine erişerek ve hizmetlerimizi kullanarak, bu kullanım koşullarını 
              okuduğunuzu, anladığınızı ve kabul ettiğinizi beyan edersiniz. Bu koşulları kabul etmiyorsanız, 
              lütfen sitemizi kullanmayın.
            </p>
          </div>

          {/* Service Description */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Hizmet Açıklaması</h2>
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <p className="text-slate-700 mb-4">
                Online Tools Hub, kullanıcılarına çeşitli ücretsiz online araçlar sunar:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-slate-700">Finans ve matematik araçları</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-slate-700">Birim dönüştürücüler</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-slate-700">Metin işleme araçları</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-slate-700">Verimlilik ve tasarım araçları</span>
                </div>
              </div>
            </div>
          </div>

          {/* Acceptable Use */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Kabul Edilebilir Kullanım</h2>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100 mb-4">
              <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                İzin Verilen Kullanımlar
              </h3>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-2" />
                  <span>Kişisel ve ticari amaçlarla araçları kullanma</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-2" />
                  <span>Hesaplama sonuçlarını kaydetme ve paylaşma</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-2" />
                  <span>Araçları sınırsız sayıda kullanma</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6 border border-red-100">
              <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-600" />
                Yasaklanan Kullanımlar
              </h3>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-2" />
                  <span>Hizmeti kötüye kullanma veya aşırı yükleme</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-2" />
                  <span>Otomatik botlar veya scraper'lar kullanma</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-2" />
                  <span>Güvenlik önlemlerini aşmaya çalışma</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-2" />
                  <span>Yasa dışı amaçlarla kullanma</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-amber-600" />
              Sorumluluk Reddi
            </h2>
            <div className="space-y-3 text-slate-700">
              <p>
                <strong>Doğruluk:</strong> Araçlarımız mümkün olan en doğru sonuçları vermek için tasarlanmıştır, 
                ancak sonuçların %100 doğru olacağını garanti edemeyiz. Kritik hesaplamalar için sonuçları 
                kontrol etmenizi öneririz.
              </p>
              <p>
                <strong>Uygunluk:</strong> Araçlarımız belirli bir amaç için uygunluğu garanti edilmeden 
                "olduğu gibi" sağlanmaktadır.
              </p>
              <p>
                <strong>Sorumluluk:</strong> Hizmetlerimizin kullanımından kaynaklanan herhangi bir zarar 
                veya kayıptan sorumlu değiliz.
              </p>
            </div>
          </div>

          {/* Intellectual Property */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Fikri Mülkiyet</h2>
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <p className="text-slate-700 mb-4">
                Online Tools Hub'daki tüm içerik, tasarım, kod ve markalar bizim fikri mülkiyetimizdir ve 
                telif hakkı yasalarıyla korunmaktadır.
              </p>
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                <p className="text-sm text-indigo-900 m-0">
                  <strong>Not:</strong> Araçlardan elde edilen sonuçlar size aittir ve bunları istediğiniz 
                  gibi kullanabilirsiniz.
                </p>
              </div>
            </div>
          </div>

          {/* Changes */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Değişiklikler</h2>
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <p className="text-slate-700">
                Bu kullanım koşullarını istediğimiz zaman değiştirme hakkını saklı tutarız. Önemli değişiklikler 
                olduğunda, bu sayfada güncelleme tarihi değiştirilecektir. Hizmeti kullanmaya devam ederek, 
                güncellenmiş koşulları kabul etmiş olursunuz.
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-3 text-white">Sorularınız mı Var?</h2>
            <p className="mb-4 text-indigo-100">
              Kullanım koşullarımız hakkında herhangi bir sorunuz varsa, lütfen bizimle iletişime geçin.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              İletişim
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
