import { Metadata } from "next"
import { TapuHarciHesaplama } from "@/components/tools/tapu-harci-hesaplama"

export const metadata: Metadata = {
  title: "Tapu Harcı Hesaplama 2024 | Online Araçlar",
  description: "Gayrimenkul alım-satım işlemlerinde ödenmesi gereken tapu harcını hesaplayın. Güncel 2024 tapu harcı oranları ile konut, arsa ve ticari emlak için hesaplama.",
  keywords: ["tapu harcı", "tapu harcı hesaplama", "emlak vergisi", "gayrimenkul", "konut alım satım", "2024 tapu harcı oranları"],
}

export default function TapuHarciPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Tapu Harcı Hesaplama
          </span>
        </h1>
        <p className="text-xl text-slate-600">Gayrimenkul alım-satım işlemlerinde tapu harcını hesaplayın</p>
      </div>
      <TapuHarciHesaplama />
    </div>
  )
}
