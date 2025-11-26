import { Metadata } from "next"
import { GayrimenkulGelirVergisi } from "@/components/tools/gayrimenkul-gelir-vergisi"

export const metadata: Metadata = {
  title: "Gayrimenkul Gelir Vergisi Hesaplama 2024 | Online Araçlar",
  description: "Gayrimenkul satışından doğan gelir vergisini hesaplayın. 5 yıl istisnası, enflasyon düzeltmesi ve artan oranlı vergi dilimleri ile hesaplama.",
  keywords: ["gayrimenkul gelir vergisi", "emlak satış vergisi", "konut satış vergisi", "değer artış kazancı", "5 yıl istisnası"],
}

export default function GayrimenkulGelirVergisiPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
            Gayrimenkul Gelir Vergisi
          </span>
        </h1>
        <p className="text-xl text-slate-600">Gayrimenkul satışından doğan gelir vergisini hesaplayın</p>
      </div>
      <GayrimenkulGelirVergisi />
    </div>
  )
}
