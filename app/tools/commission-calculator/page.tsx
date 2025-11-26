import { Metadata } from "next"
import { CommissionCalculator } from "@/components/tools/commission-calculator"

export const metadata: Metadata = {
  title: "Komisyon Hesaplama | Online Araçlar",
  description: "Satış komisyonu hesaplama aracı. Farklı komisyon oranlarıyla kazancınızı hesaplayın.",
  keywords: ["komisyon", "commission", "satış", "kazanç", "oran"],
}

export default function CommissionCalculatorPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
            Komisyon Hesaplama
          </span>
        </h1>
        <p className="text-xl text-slate-600">Satış kazancınızı hesaplayın</p>
      </div>
      <CommissionCalculator />
    </div>
  )
}
