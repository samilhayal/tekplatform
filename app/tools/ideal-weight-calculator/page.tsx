import { Metadata } from "next"
import { IdealWeightCalculator } from "@/components/tools/ideal-weight-calculator"

export const metadata: Metadata = {
  title: "İdeal Kilo Hesaplama | Online Araçlar",
  description: "4 farklı formül ile ideal kilonuzu hesaplayın. Robinson, Miller, Devine ve Hamwi formülleri.",
  keywords: ["ideal kilo", "ideal weight", "hedef kilo", "sağlıklı kilo"],
}

export default function IdealWeightCalculatorPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
            İdeal Kilo Hesaplama
          </span>
        </h1>
        <p className="text-xl text-slate-600">Bilimsel formüllerle hedef kilonuzu belirleyin</p>
      </div>
      <IdealWeightCalculator />
    </div>
  )
}
