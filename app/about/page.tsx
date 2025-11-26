import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Target, Users, Zap, Shield, Heart, Globe } from "lucide-react"

export const metadata: Metadata = {
  title: "Hakkımızda | Online Tools Hub",
  description: "Online Tools Hub hakkında bilgi edinin. Misyonumuz, vizyonumuz ve değerlerimiz.",
}

export default function AboutPage() {
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
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4 bg-gradient-to-r from-slate-900 to-indigo-900 bg-clip-text text-transparent">
            Hakkımızda
          </h1>
          <p className="text-lg sm:text-xl text-slate-600">
            Online Tools Hub ile tanışın
          </p>
        </div>

        <div className="prose prose-slate max-w-none space-y-8">
          {/* Mission */}
          <div className="bg-gradient-to-br from-white to-indigo-50 rounded-2xl p-8 border border-indigo-100 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 m-0">Misyonumuz</h2>
            </div>
            <p className="text-slate-700 leading-relaxed m-0">
              Online Tools Hub olarak misyonumuz, kullanıcılarımıza günlük hayatlarında ve profesyonel 
              çalışmalarında ihtiyaç duydukları tüm dijital araçları ücretsiz, hızlı ve kullanıcı dostu 
              bir şekilde sunmaktır. Karmaşık hesaplamaları basitleştirmek, zaman kazandırmak ve verimliliği 
              artırmak için buradayız.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-gradient-to-br from-white to-purple-50 rounded-2xl p-8 border border-purple-100 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 m-0">Vizyonumuz</h2>
            </div>
            <p className="text-slate-700 leading-relaxed m-0">
              Dünyanın en kapsamlı ve kullanıcı dostu online araçlar platformu olmak. Her ihtiyaç için 
              doğru aracı sunarak, insanların işlerini kolaylaştırmak ve zamanlarını daha değerli 
              şeyler için kullanmalarına yardımcı olmak istiyoruz.
            </p>
          </div>

          {/* Values */}
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Değerlerimiz</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                    <Users className="w-5 h-5 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 m-0">Kullanıcı Odaklılık</h3>
                </div>
                <p className="text-slate-600 m-0">
                  Kullanıcılarımızın ihtiyaçlarını her zaman önceliğimiz olarak görürüz. Basit, anlaşılır 
                  ve etkili çözümler sunarız.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 m-0">Hız & Performans</h3>
                </div>
                <p className="text-slate-600 m-0">
                  Modern teknolojiler kullanarak hızlı, güvenilir ve kesintisiz bir deneyim sunuyoruz.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 m-0">Gizlilik & Güvenlik</h3>
                </div>
                <p className="text-slate-600 m-0">
                  Tüm hesaplamalar tarayıcınızda yapılır. Verileriniz hiçbir zaman sunucularımıza gönderilmez.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-pink-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 m-0">Ücretsiz Erişim</h3>
                </div>
                <p className="text-slate-600 m-0">
                  Tüm araçlarımız tamamen ücretsizdir ve her zaman öyle kalacaktır. Herkes için erişilebilir 
                  olmalıyız.
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-6 text-white">Rakamlarla Biz</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">22+</div>
                <div className="text-indigo-100">Araç</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">6</div>
                <div className="text-indigo-100">Kategori</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">100%</div>
                <div className="text-indigo-100">Ücretsiz</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">∞</div>
                <div className="text-indigo-100">Kullanım</div>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="bg-gradient-to-br from-slate-50 to-indigo-50 rounded-2xl p-8 border border-slate-200 text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Bizimle İletişime Geçin</h2>
            <p className="text-slate-600 mb-6">
              Sorularınız, önerileriniz veya geri bildirimleriniz mi var? Size yardımcı olmaktan mutluluk duyarız!
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 hover:-translate-y-0.5"
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
