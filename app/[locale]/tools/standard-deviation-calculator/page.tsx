import { Metadata } from "next"
import { StandardDeviationCalculator } from "@/components/tools/standard-deviation-calculator"

export const metadata: Metadata = {
  title: "Standart Sapma Hesaplayıcı | Online Araçlar",
  description: "Veri kümesinin standart sapmasını, varyansını ve ortalamasını hesaplayın.",
  keywords: ["standart sapma", "standard deviation", "varyans", "variance", "istatistik"],
}

export default function StandardDeviationPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Standart Sapma Hesaplayıcı
          </span>
        </h1>
        <p className="text-xl text-slate-600">İstatistiksel analiz aracı</p>
      </div>
      <StandardDeviationCalculator />
    </div>
  )
}
