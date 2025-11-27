import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Mail, MessageSquare, Send, MapPin, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "İletişim | Tüm Araçlar",
  description: "Bizimle iletişime geçin. Sorularınız, önerileriniz veya geri bildirimleriniz için buradayız.",
}

export default function ContactPage() {
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
            İletişim
          </h1>
          <p className="text-lg sm:text-xl text-slate-600">
            Size nasıl yardımcı olabiliriz?
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100 text-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">E-posta</h3>
            <a href="mailto:info@tumaraclar.net" className="text-indigo-600 hover:text-indigo-700 text-sm">
              info@tumaraclar.net
            </a>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100 text-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Yanıt Süresi</h3>
            <p className="text-slate-600 text-sm">24-48 saat içinde</p>
          </div>

          <div className="bg-gradient-to-br from-pink-50 to-indigo-50 rounded-xl p-6 border border-pink-100 text-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-600 to-indigo-600 flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Konum</h3>
            <p className="text-slate-600 text-sm">Türkiye</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Bize Mesaj Gönderin</h2>
          </div>

          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-slate-900 mb-2">
                  Adınız Soyadınız
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                  placeholder="Ahmet Yılmaz"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-2">
                  E-posta Adresiniz
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                  placeholder="ornek@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-semibold text-slate-900 mb-2">
                Konu
              </label>
              <input
                type="text"
                id="subject"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                placeholder="Mesajınızın konusu"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-slate-900 mb-2">
                Mesajınız
              </label>
              <textarea
                id="message"
                rows={6}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all resize-none"
                placeholder="Mesajınızı buraya yazın..."
              />
            </div>

            <button
              type="submit"
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 hover:-translate-y-0.5"
            >
              <Send className="w-5 h-5" />
              Mesajı Gönder
            </button>
          </form>
        </div>

        <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Sık Sorulan Sorular</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-slate-900 mb-2">Araçlar gerçekten ücretsiz mi?</h4>
              <p className="text-slate-600 text-sm">
                Evet! Tüm araçlarımız tamamen ücretsizdir ve her zaman öyle kalacaktır. Kayıt veya ödeme gerektirmez.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-2">Verilerim güvende mi?</h4>
              <p className="text-slate-600 text-sm">
                Tüm hesaplamalar tarayıcınızda yapılır. Hiçbir veri sunucularımıza gönderilmez veya saklanmaz.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-2">Yeni araç önerisinde bulunabilir miyim?</h4>
              <p className="text-slate-600 text-sm">
                Kesinlikle! Önerilerinizi duymaktan mutluluk duyarız. Yukarıdaki formu kullanarak bize ulaşabilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
