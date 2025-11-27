import { Metadata } from "next"
import { CalorieCalculator } from "@/components/tools/calorie-calculator"

export const metadata: Metadata = {
  title: "Günlük Kalori İhtiyacı Hesaplama | Online Araçlar",
  description: "Günlük kalori ihtiyacınızı hesaplayın. Yaş, kilo, boy ve aktivite seviyesine göre özelleştirilmiş sonuçlar.",
  keywords: ["kalori hesaplama", "calorie calculator", "günlük kalori", "diyet", "fitness"],
}

export default function CalorieCalculatorPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
            Günlük Kalori İhtiyacı Hesaplama
          </span>
        </h1>
        <p className="text-xl text-slate-600">Sağlıklı yaşam için günlük kalori ihtiyacınızı öğrenin</p>
      </div>
      <CalorieCalculator />
    </div>
  )
}
