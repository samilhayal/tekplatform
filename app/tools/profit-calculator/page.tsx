import { Metadata } from "next"
import { ProfitCalculator } from "@/components/tools/profit-calculator"

export const metadata: Metadata = {
  title: "Kâr Hesaplama | Online Araçlar",
  description: "Gelir ve maliyet üzerinden net kâr, kâr marjı ve markup hesaplayın. İş planlaması için ideal.",
  keywords: ["kâr", "profit", "marj", "markup", "gelir"],
}

export default function ProfitCalculatorPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Kâr Hesaplama
          </span>
        </h1>
        <p className="text-xl text-slate-600">Kârlılığınızı ölçün</p>
      </div>
      <ProfitCalculator />
    </div>
  )
}
