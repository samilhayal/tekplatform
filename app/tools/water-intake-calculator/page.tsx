import { Metadata } from "next"
import { WaterIntakeCalculator } from "@/components/tools/water-intake-calculator"

export const metadata: Metadata = {
  title: "Su İhtiyacı Hesaplama | Online Araçlar",
  description: "Günlük su içme ihtiyacınızı hesaplayın. Kilo ve aktivite seviyenize göre özel sonuçlar.",
  keywords: ["su ihtiyacı", "water intake", "günlük su", "hidrasyon", "sağlık"],
}

export default function WaterIntakeCalculatorPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
            Su İhtiyacı Hesaplama
          </span>
        </h1>
        <p className="text-xl text-slate-600">Sağlıklı kalın, yeterince su için!</p>
      </div>
      <WaterIntakeCalculator />
    </div>
  )
}
