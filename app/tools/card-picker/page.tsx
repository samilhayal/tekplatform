import { Metadata } from "next"
import { CardPicker } from "@/components/tools/card-picker"

export const metadata: Metadata = {
  title: "3D Kart Çekme - İskambil Destesi | Online Tools Hub",
  description: "52 kartlık iskambil destesinden 3D animasyonlu kart çekin. Özel kombinasyonlar, detaylı istatistikler ve eğlenceli ses efektleri ile şansınızı deneyin.",
  keywords: ["kart çekme", "iskambil", "card draw", "playing cards", "rastgele kart", "şans oyunu", "poker", "blackjack"],
}

export default function CardPickerPage() {
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
            <li className="text-foreground font-medium">Kart Çekme</li>
          </ol>
        </nav>

        {/* Title */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-600 to-slate-800 bg-clip-text text-transparent mb-2 sm:mb-3">
            3D Kart Çekme
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            52 kartlık iskambil destesinden şansınızı deneyin! Gerçekçi 3D çevirme animasyonları,
            özel kombinasyonlar ve detaylı istatistiklerle eğlenceli kart deneyimi.
          </p>
        </div>

        {/* Tool Component */}
        <CardPicker />

        {/* SEO Content */}
        <div className="mt-8 sm:mt-12 prose prose-sm sm:prose-base max-w-4xl mx-auto text-slate-600 px-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4">İskambil Kartları Hakkında</h2>
          <p className="text-sm sm:text-base">
            İskambil kartları, dünya genelinde en yaygın kullanılan oyun kartlarıdır.
            Standart bir deste 52 karttan oluşur ve 4 farklı simge içerir: Maça (♠), Kupa (♥), 
            Karo (♦) ve Sinek (♣). Her simgede As'tan Papaz'a kadar 13 kart bulunur.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 mt-6">Özellikler</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm sm:text-base">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-slate-700">🎴 3D Animasyon</h3>
              <p>Gerçekçi kart çevirme ve çekme animasyonları</p>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-slate-700">🎰 Özel Kombolar</h3>
              <p>Blackjack, Çift, Flush, Sıralı ve daha fazlası</p>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-slate-700">🎨 6 Kart Deseni</h3>
              <p>Klasik, Kraliyet, Casino, Zümrüt, Altın, Gece</p>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-slate-700">📊 Detaylı İstatistikler</h3>
              <p>Simge dağılımı, As ve Asil kart sayıları</p>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 mt-6">Kart Simgeleri</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm sm:text-base">
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <span className="text-4xl">♠</span>
              <p className="font-medium mt-2">Maça</p>
              <p className="text-xs text-slate-500">Siyah</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <span className="text-4xl text-red-600">♥</span>
              <p className="font-medium mt-2">Kupa</p>
              <p className="text-xs text-slate-500">Kırmızı</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <span className="text-4xl text-red-600">♦</span>
              <p className="font-medium mt-2">Karo</p>
              <p className="text-xs text-slate-500">Kırmızı</p>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <span className="text-4xl">♣</span>
              <p className="font-medium mt-2">Sinek</p>
              <p className="text-xs text-slate-500">Siyah</p>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 mt-6">Kullanım Alanları</h2>
          <ul className="list-disc list-inside space-y-1 text-sm sm:text-base">
            <li>Rastgele kart çekme oyunları</li>
            <li>Fal ve kehanet uygulamaları</li>
            <li>Kart oyunları için test</li>
            <li>Eğitim ve öğrenme amaçlı</li>
            <li>Şans ve talih denemeleri</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
