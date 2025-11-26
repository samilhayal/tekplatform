import { Metadata } from "next"
import { RandomizerTool } from "@/components/tools/randomizer"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Rastgele Araçlar - Zar, Yazı Tura, Kart, Çarkıfelek | Online Tools Hub",
  description: "3D animasyonlarla eğlenceli rastgele araçlar. Zar atın, yazı tura yapın, kart çekin veya çarkıfelek çevirin.",
}

export default function RandomizerPage() {
  return (
    <div className="w-full">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link 
          href="/" 
          className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-4 sm:mb-6 text-sm sm:text-base"
        >
          <ArrowLeft className="h-4 w-4 mr-2 flex-shrink-0" />
          Ana Sayfaya Dön
        </Link>

        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">
            Rastgele Araçlar
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl">
            3D CSS animasyonlarıyla eğlenceli rastgele araçlar. Oyun için zar atın, 
            karar vermek için yazı tura yapın, kart çekin veya çarkıfelek çevirin.
          </p>
        </div>

        <RandomizerTool />

        <div className="mt-8 sm:mt-12 prose prose-slate max-w-none prose-sm sm:prose-base">
          <h2 className="text-xl sm:text-2xl font-bold">Kullanılabilir Araçlar</h2>
          
          <h3 className="text-lg sm:text-xl font-semibold">🎲 Zar</h3>
          <p className="text-sm sm:text-base">
            Klasik 6 yüzlü zar. Masa oyunları, karar verme veya şans oyunları için kullanın. 
            3D animasyonla gerçekçi zar atma deneyimi.
          </p>

          <h3 className="text-lg sm:text-xl font-semibold">🪙 Yazı Tura</h3>
          <p className="text-sm sm:text-base">
            İki seçenek arasında karar vermek için klasik yazı tura. TRY, USD veya EUR 
            para birimlerinden birini seçebilirsiniz. Gerçekçi dönme animasyonu.
          </p>

          <h3 className="text-lg sm:text-xl font-semibold">🃏 Kart Çekme</h3>
          <p className="text-sm sm:text-base">
            Standart 52 kartlık desteden rastgele kart çekin. Tüm değerler (A-K) ve 
            semboller (Maça, Kupa, Karo, Sinek) mevcuttur. 3D animasyonla kart çekme efekti.
          </p>

          <h3 className="text-lg sm:text-xl font-semibold">🎡 Çarkıfelek</h3>
          <p className="text-sm sm:text-base">
            Kendi seçeneklerinizi ekleyebileceğiniz özelleştirilebilir çarkıfelek. 
            Yarışma kazananı seçmek, görev dağıtmak veya karar vermek için idealdir. 
            Sınırsız seçenek ekleyebilirsiniz.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold">Kullanım Alanları</h2>
          <ul className="text-sm sm:text-base">
            <li>Masa oyunları için zar atma</li>
            <li>İki seçenek arasında karar verme</li>
            <li>Kart oyunları için rastgele kart seçimi</li>
            <li>Yarışma kazananı belirleme</li>
            <li>Görev veya sorumluluk dağıtımı</li>
            <li>Rastgele sıralama oluşturma</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
