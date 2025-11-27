import { Metadata } from "next"
import { WheelSpinner } from "@/components/tools/wheel-spinner"

export const metadata: Metadata = {
  title: "Çarkı Çevirme - Şans Çarkı | Online Tools Hub",
  description: "Kendi seçeneklerinizi ekleyerek 3D çarkıfelek çevirin. Renkli animasyonlar, ses efektleri, hazır listeler ve istatistiklerle eğlenceli karar verme aracı.",
  keywords: ["çarkıfelek", "wheel of fortune", "şans çarkı", "karar verme", "rastgele seçim", "çekiliş", "3D çark"],
}

export default function WheelSpinnerPage() {
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
            <li className="text-foreground font-medium">Çarkıfelek</li>
          </ol>
        </nav>

        {/* Title */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent mb-2 sm:mb-3">
            3D Çarkıfelek
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Kendi seçeneklerinizi ekleyin ve şansınızı deneyin! Renkli 3D animasyonlar,
            ses efektleri ve kutlama animasyonları ile eğlenceli karar verme aracı.
          </p>
        </div>

        {/* Tool Component */}
        <WheelSpinner />

        {/* SEO Content */}
        <div className="mt-8 sm:mt-12 prose prose-sm sm:prose-base max-w-4xl mx-auto text-slate-600 px-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4">Çarkıfelek Nedir?</h2>
          <p className="text-sm sm:text-base">
            Çarkıfelek, karar verme süreçlerini eğlenceli hale getiren interaktif bir araçtır.
            Birden fazla seçenek arasından rastgele seçim yapmanız gerektiğinde, bu araç size
            adil ve tarafsız bir sonuç sunar.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 mt-6">Özellikler</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm sm:text-base">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-slate-700">🎨 8 Renk Teması</h3>
              <p>Gökkuşağı, Okyanus, Orman, Gün Batımı, Şeker, Neon, Pastel ve Altın temaları</p>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-slate-700">📋 Hazır Listeler</h3>
              <p>Evet/Hayır, günler, sayılar, yemek, film türleri ve daha fazlası</p>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-slate-700">⚡ 3 Hız Seçeneği</h3>
              <p>Yavaş, normal ve hızlı döndürme seçenekleri</p>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-slate-700">📊 İstatistikler</h3>
              <p>Geçmiş sonuçlar, en çok gelenler ve toplam çevirme sayısı</p>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 mt-6">Kullanım Alanları</h2>
          <ul className="list-disc list-inside space-y-1 text-sm sm:text-base">
            <li>Akşam yemeği seçimi</li>
            <li>Film veya dizi seçimi</li>
            <li>Çekiliş ve hediye dağıtımı</li>
            <li>Oyun ve eğlence aktiviteleri</li>
            <li>Doğruluk mu Cesaret mi oyunu</li>
            <li>Takım veya grup seçimi</li>
            <li>Günlük aktivite planlaması</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
