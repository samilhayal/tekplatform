import { Metadata } from "next"
import { ChangeRateCalculator } from "@/components/tools/change-rate-calculator"

export const metadata: Metadata = {
  title: "Değişim Oranı Hesaplayıcı | Online Araçlar",
  description: "Eski ve yeni değer arasındaki artış/azalış oranını hesaplayın. Yüzde değişim hesaplama.",
  keywords: ["değişim oranı", "change rate", "artış", "azalış", "yüzde"],
}

export default function ChangeRateCalculatorPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Değişim Oranı Hesaplayıcı
          </span>
        </h1>
        <p className="text-xl text-slate-600">Artış ve azalış oranlarını kolayca hesaplayın</p>
      </div>
      <ChangeRateCalculator />
    </div>
  )
}
