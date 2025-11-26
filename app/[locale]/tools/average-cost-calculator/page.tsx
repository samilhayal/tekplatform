import { Metadata } from "next"
import { AverageCostCalculator } from "@/components/tools/average-cost-calculator"

export const metadata: Metadata = {
  title: "Ortalama Maliyet Hesaplayıcı | Online Araçlar",
  description: "Ürün ve hizmet ortalama maliyet hesaplama aracı.",
  keywords: ["ortalama maliyet", "average cost", "birim maliyet"],
}

export default function AverageCostCalculatorPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Ortalama Maliyet Hesaplayıcı
          </span>
        </h1>
        <p className="text-xl text-slate-600">Birim maliyetinizi hesaplayın</p>
      </div>
      <AverageCostCalculator />
    </div>
  )
}
