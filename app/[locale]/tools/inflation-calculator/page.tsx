import { Metadata } from "next"
import { InflationCalculator } from "@/components/tools/inflation-calculator"

export const metadata: Metadata = {
  title: "Enflasyon Hesaplayıcı | Online Araçlar",
  description: "Enflasyon oranı ile gelecek değer ve satın alma gücü hesaplama.",
  keywords: ["enflasyon", "inflation", "satın alma gücü", "fiyat artışı"],
}

export default function InflationCalculatorPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Enflasyon Hesaplayıcı
          </span>
        </h1>
        <p className="text-xl text-slate-600">Paranızın gelecekteki değerini hesaplayın</p>
      </div>
      <InflationCalculator />
    </div>
  )
}
