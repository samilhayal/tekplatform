import { Metadata } from "next"
import { PeriodCalculator } from "@/components/tools/period-calculator"

export const metadata: Metadata = {
  title: "Adet Günü Hesaplayıcı | Online Araçlar",
  description: "Adet döngüsü takibi, sonraki adet tarihi ve ovülasyon hesaplama.",
  keywords: ["adet", "period", "menstruation", "döngü", "cycle", "ovülasyon"],
}

export default function PeriodPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
            Adet Günü Hesaplayıcı
          </span>
        </h1>
        <p className="text-xl text-slate-600">Döngünüzü takip edin</p>
      </div>
      <PeriodCalculator />
    </div>
  )
}
