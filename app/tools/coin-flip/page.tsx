import { Metadata } from "next"
import { CoinFlip } from "@/components/tools/coin-flip"

export const metadata: Metadata = {
  title: "3D Yazı Tura - Para Atma | Online Tools Hub",
  description: "6 farklı para birimi ile 3D animasyonlu yazı tura atın. Tahmin modu, seri takibi ve detaylı istatistiklerle klasik şans oyunu deneyimi.",
  keywords: ["yazı tura", "coin flip", "para atma", "heads tails", "şans", "karar verme", "rastgele"],
}

export default function CoinFlipPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Breadcrumb */}
        <nav className="mb-4 sm:mb-6 text-xs sm:text-sm text-muted-foreground">
          <ol className="flex items-center space-x-2">
            <li><a href="/" className="hover:text-foreground">Ana Sayfa</a></li>
            <li>/</li>
            <li><a href="/#tools" className="hover:text-foreground">Araçlar</a></li>
            <li>/</li>
            <li className="text-foreground font-medium">Yazı Tura</li>
          </ol>
        </nav>

        {/* Title */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-600 via-yellow-500 to-orange-500 bg-clip-text text-transparent mb-2 sm:mb-3">
            3D Yazı Tura
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            6 farklı para birimi ile gerçekçi 3D yazı tura deneyimi! Tahmin modu,
            seri takibi ve detaylı istatistiklerle klasik şans oyunu.
          </p>
        </div>

        {/* Tool Component */}
        <CoinFlip />

        {/* SEO Content */}
        <div className="mt-8 sm:mt-12 prose prose-sm sm:prose-base max-w-4xl mx-auto text-slate-600 px-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4">Yazı Tura Nedir?</h2>
          <p className="text-sm sm:text-base">
            Yazı tura, en basit ve en eski şans oyunlarından biridir. Bir madeni paranın havaya atılıp 
            hangi yüzünün üste geleceğinin belirlenmesi prensibine dayanır. İki olası sonucu olan 
            (%50 yazı, %50 tura) bu oyun, binlerce yıldır karar verme aracı olarak kullanılmaktadır.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 mt-6">Özellikler</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm sm:text-base">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-slate-700">🪙 6 Para Birimi</h3>
              <p>TL, USD, EUR, GBP, JPY ve Bitcoin ile yazı tura atın</p>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-slate-700">🎯 Tahmin Modu</h3>
              <p>Atış öncesi tahmininizi yapın ve doğru tahmin sayınızı takip edin</p>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-slate-700">🔥 Seri Takibi</h3>
              <p>Üst üste aynı sonuç gelince özel başarımlar kazanın</p>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-slate-700">📊 Detaylı İstatistikler</h3>
              <p>Görsel oran çubuğu, geçmiş sonuçlar ve yüzdelik dağılım</p>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 mt-6">Para Birimleri</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm sm:text-base">
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <span className="text-3xl">🇹🇷</span>
              <p className="font-medium mt-2">Türk Lirası</p>
              <p className="text-xs text-slate-500">Yazı / Tura</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <span className="text-3xl">🇺🇸</span>
              <p className="font-medium mt-2">Amerikan Doları</p>
              <p className="text-xs text-slate-500">Heads / Tails</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <span className="text-3xl">🇪🇺</span>
              <p className="font-medium mt-2">Euro</p>
              <p className="text-xs text-slate-500">Kopf / Zahl</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <span className="text-3xl">🇬🇧</span>
              <p className="font-medium mt-2">İngiliz Sterlini</p>
              <p className="text-xs text-slate-500">Heads / Tails</p>
            </div>
            <div className="text-center p-4 bg-rose-50 rounded-lg">
              <span className="text-3xl">🇯🇵</span>
              <p className="font-medium mt-2">Japon Yeni</p>
              <p className="text-xs text-slate-500">表 / 裏</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <span className="text-3xl">🪙</span>
              <p className="font-medium mt-2">Bitcoin</p>
              <p className="text-xs text-slate-500">Bit / Coin</p>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 mt-6">Özel Başarımlar</h2>
          <ul className="list-disc list-inside space-y-1 text-sm sm:text-base">
            <li><strong>Hat-trick! 🎯</strong> - 3 kez üst üste aynı sonuç</li>
            <li><strong>Süper Seri! 🔥</strong> - 5 kez üst üste aynı sonuç</li>
            <li><strong>İNANILMAZ! 💫</strong> - 7 kez üst üste aynı sonuç</li>
            <li><strong>Mükemmel Denge! ⚖️</strong> - 10+ atışta tam %50-%50 dağılım</li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 mt-6">Tarihçe</h2>
          <p className="text-sm sm:text-base">
            Yazı tura oyununun kökenleri Antik Roma'ya kadar uzanır. Romalılar buna "Navia aut Caput" 
            (Gemi ya da Baş) derlerdi, çünkü dönemin paralarının bir yüzünde gemi, diğer yüzünde 
            imparatorun başı bulunurdu. Günümüzde futbol maçlarında, kriket oyunlarında ve birçok 
            spor dalında taraf seçimi için kullanılmaktadır.
          </p>
        </div>
      </div>
    </main>
  )
}
