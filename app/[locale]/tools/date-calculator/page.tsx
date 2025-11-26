import { Metadata } from "next"
import { DateCalculator } from "@/components/tools/date-calculator"

export const metadata: Metadata = {
  title: "Tarih Hesaplayıcı | Online Araçlar",
  description: "Tarihler arası gün, hafta, ay farkı hesaplama ve tarihe gün ekleme.",
  keywords: ["tarih", "date", "hesaplama", "calculator", "gün", "fark"],
}

export default function DateCalculatorPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
            Tarih Hesaplayıcı
          </span>
        </h1>
        <p className="text-xl text-slate-600">Tarih hesaplamaları</p>
      </div>
      <DateCalculator />
    </div>
  )
}
