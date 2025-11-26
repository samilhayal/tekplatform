import { Metadata } from "next"
import { RatioCalculator } from "@/components/tools/ratio-calculator"

export const metadata: Metadata = {
  title: "Oran Hesaplayıcı | Online Araçlar",
  description: "İki değer arasındaki oranı basitleştirilmiş formda hesaplayın.",
  keywords: ["oran", "ratio", "proportion", "orantı"],
}

export default function RatioCalculatorPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
            Oran Hesaplayıcı
          </span>
        </h1>
        <p className="text-xl text-slate-600">Değerler arasındaki oranı bulun</p>
      </div>
      <RatioCalculator />
    </div>
  )
}
