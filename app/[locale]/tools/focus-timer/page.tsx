import { Metadata } from "next"
import { FocusTimer } from "@/components/tools/focus-timer"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Odaklanma Zamanlayıcı & Pomodoro Timer | Online Tools Hub",
  description: "Pomodoro tekniği ile verimliliğinizi artırın. Circular progress bar, istatistikler ve bildirimlerle tam özellikli timer.",
}

export default function FocusTimerPage() {
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
            Odaklanma Zamanlayıcı & Pomodoro Timer
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl">
            Pomodoro tekniği ile çalışma seanslarınızı düzenleyin. İstatistiklerinizi takip edin, 
            bildirimler alın ve verimliliğinizi artırın.
          </p>
        </div>

        <FocusTimer />

        <div className="mt-8 sm:mt-12 prose prose-slate max-w-none prose-sm sm:prose-base">
          <h2 className="text-xl sm:text-2xl font-bold">Pomodoro Tekniği Nedir?</h2>
          <p className="text-sm sm:text-base">
            Pomodoro Tekniği, 1980'lerin sonlarında Francesco Cirillo tarafından geliştirilen 
            bir zaman yönetimi metodudur. Teknik, işi kısa, odaklanılmış aralıklara (geleneksel 
            olarak 25 dakika) bölerek ve bu aralıkları kısa molalarla ayırarak verimliliği artırmayı amaçlar.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold">Nasıl Kullanılır?</h2>
          <ol className="text-sm sm:text-base">
            <li>Yapılacak bir görev seçin</li>
            <li>Zamanlayıcıyı 25 dakikaya ayarlayın</li>
            <li>Süre dolana kadar göreve odaklanın</li>
            <li>Süre dolduğunda 5 dakika mola verin</li>
            <li>4 pomodoro sonrasında 15-30 dakika uzun mola yapın</li>
          </ol>

          <h2 className="text-xl sm:text-2xl font-bold">Özellikler</h2>
          <ul className="text-sm sm:text-base">
            <li><strong>Circular Progress:</strong> Görsel olarak kalan süreyi takip edin</li>
            <li><strong>Hazır Presetler:</strong> 25dk odaklanma, 5dk kısa mola, 15dk uzun mola</li>
            <li><strong>Özel Süreler:</strong> Kendi sürenizi belirleyin</li>
            <li><strong>İstatistikler:</strong> Günlük, haftalık ve aylık odaklanma sürelerinizi görün</li>
            <li><strong>Bildirimler:</strong> Süre dolduğunda tarayıcı bildirimi alın</li>
            <li><strong>Seans Geçmişi:</strong> Tamamlanan tüm seanslarınızı görüntüleyin</li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-bold">İpuçları</h2>
          <ul className="text-sm sm:text-base">
            <li>Pomodoro sırasında dikkat dağıtıcı unsurları minimize edin</li>
            <li>Molaları atlamayın - beyin için dinlenme önemlidir</li>
            <li>Günlük hedef belirleyin (örn: 8 pomodoro)</li>
            <li>Mola sırasında ekrandan uzaklaşın ve hareket edin</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
