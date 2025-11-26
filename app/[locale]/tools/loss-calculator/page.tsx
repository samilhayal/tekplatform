import { Metadata } from "next"
import { LossCalculator } from "@/components/tools/loss-calculator"

export const metadata: Metadata = {
  title: "Zarar Hesaplama | Online Araçlar",
  description: "Zarar miktarı, zarar oranı ve başabaş noktası hesaplama. Yatırım kayıplarınızı analiz edin.",
  keywords: ["zarar", "loss", "başabaş", "break-even", "kayıp"],
}

export default function LossCalculatorPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            Zarar Hesaplama
          </span>
        </h1>
        <p className="text-xl text-slate-600">Kayıplarınızı değerlendirin</p>
      </div>
      <LossCalculator />
    </div>
  )
}
