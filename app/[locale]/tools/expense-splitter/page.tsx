import { Metadata } from "next"
import { ExpenseSplitter } from "@/components/tools/expense-splitter"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Harcama Paylaşım Hesaplayıcı | Online Araçlar",
  description: "Grup harcamalarını adil bir şekilde paylaştırın. Etkinlik, seyahat veya ortak yaşam alanlarında kim kime ne kadar borçlu hesaplayın. Ücretsiz harcama bölme aracı.",
  keywords: ["harcama paylaşımı", "expense splitter", "grup harcama", "borç hesaplama", "masraf bölme", "tatil harcaması", "ortak hesap", "kim kime borçlu", "harcama hesaplayıcı", "splitwise alternatif"]
}

export default function ExpenseSplitterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Animated Background Decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-indigo-200/20 to-pink-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-6 group transition-all hover:gap-3"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            Ana Sayfaya Dön
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg shadow-blue-500/50">
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full mb-2">
                Harcama Yönetimi
              </span>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Harcama Paylaşım Hesaplayıcı
              </h1>
            </div>
          </div>
          
          <p className="text-slate-600 text-lg max-w-3xl">
            Grup etkinliklerinde, seyahatlerde veya ortak yaşam alanlarında yapılan harcamaları adil bir şekilde paylaştırın. 
            Kim kime ne kadar borçlu otomatik olarak hesaplanır.
          </p>
        </div>

        {/* Main Tool */}
        <ExpenseSplitter />

        {/* Info Sections */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nasıl Kullanılır */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-blue-200 shadow-lg">
            <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Nasıl Kullanılır?
            </h2>
            <ol className="space-y-3 text-slate-700">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                <span>Yeni bir grup oluşturun ve para birimini seçin</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                <span>Katılımcıları ekleyin (opsiyonel e-posta ile)</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                <span>Yapılan masrafları ekleyin (kim ödedi, ne kadar)</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                <span>Sistem otomatik olarak borç/alacak hesabını gösterir</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
                <span>Raporu indirin ve paylaşın</span>
              </li>
            </ol>
          </div>

          {/* Özellikler */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-purple-200 shadow-lg">
            <h2 className="text-2xl font-bold text-purple-900 mb-4 flex items-center gap-2">
              <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Özellikler
            </h2>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">✓</span>
                <span>Sınırsız grup ve katılımcı ekleme</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">✓</span>
                <span>Otomatik borç/alacak hesaplama</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">✓</span>
                <span>Özelleştirilebilir masraf bölme</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">✓</span>
                <span>Ödeme optimizasyonu (en az işlem)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">✓</span>
                <span>Çoklu para birimi desteği</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">✓</span>
                <span>Otomatik kaydetme (localStorage)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">✓</span>
                <span>Rapor indirme özelliği</span>
              </li>
            </ul>
          </div>

          {/* Örnek Kullanımlar */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-green-200 shadow-lg">
            <h2 className="text-2xl font-bold text-green-900 mb-4 flex items-center gap-2">
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Örnek Kullanım Senaryoları
            </h2>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span><strong>Tatil:</strong> Arkadaşlarınızla gidilen tatilde tüm masrafları takip edin</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span><strong>Ev Arkadaşları:</strong> Ortak ev masraflarını (kira, market, faturalar) paylaştırın</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span><strong>Düğün/Etkinlik:</strong> Grup etkinliklerinde masrafları organize edin</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span><strong>İş Seyahati:</strong> Ekip seyahatlerinde harcamaları takip edin</span>
              </li>
            </ul>
          </div>

          {/* Önemli Bilgiler */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-amber-200 shadow-lg">
            <h2 className="text-2xl font-bold text-amber-900 mb-4 flex items-center gap-2">
              <svg className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Önemli Bilgiler
            </h2>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-1">💡</span>
                <span>Verileriniz tarayıcınızda saklanır, sunucuya gönderilmez</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-1">💡</span>
                <span>Birden fazla grup oluşturabilir ve aralarda geçiş yapabilirsiniz</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-1">💡</span>
                <span>Masraf paylaşımında belirli kişileri seçebilirsiniz</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-1">💡</span>
                <span>Ödeme optimizasyonu en az transfer sayısını hesaplar</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-1">💡</span>
                <span>Tüm hesaplamalar gerçek zamanlı olarak güncellenir</span>
              </li>
            </ul>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-12 bg-white/80 backdrop-blur-sm rounded-2xl p-8 border-2 border-slate-200 shadow-lg">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Harcama Paylaşımı Neden Önemli?</h2>
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700 mb-4">
              Grup etkinliklerinde en büyük sorunlardan biri, harcamaların adil bir şekilde paylaştırılmasıdır. 
              Harcama Paylaşım Hesaplayıcı, bu süreci otomatikleştirerek hem zaman kazandırır hem de olası anlaşmazlıkları önler.
            </p>
            <p className="text-slate-700 mb-4">
              <strong>Neden Harcama Paylaşım Aracı Kullanmalısınız?</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-700 mb-4">
              <li>Manuel hesaplama hatalarını önler</li>
              <li>Tüm harcamaları merkezi bir yerde takip eder</li>
              <li>Kim kime ne kadar borçlu otomatik hesaplanır</li>
              <li>En az sayıda işlemle borçların kapatılmasını sağlar</li>
              <li>Kayıt tutarak geçmiş harcamaları görüntüleyebilirsiniz</li>
            </ul>
            <p className="text-slate-700">
              Splitwise benzeri özellikler sunan ücretsiz aracımız ile grup harcamalarınızı kolayca yönetin!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
