import { Metadata } from "next"
import { PriceIndexCalculator } from "@/components/tools/price-index-calculator"

export const metadata: Metadata = {
  title: "Fiyat Endeksi Hesaplayıcı | Online Araçlar",
  description: "Ürün ve hizmet fiyat endeksi hesaplama aracı.",
  keywords: ["fiyat endeksi", "price index", "endeks", "fiyat"],
}

export default function PriceIndexCalculatorPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
            Fiyat Endeksi Hesaplayıcı
          </span>
        </h1>
        <p className="text-xl text-slate-600">Fiyat değişimlerini takip edin</p>
      </div>
      <PriceIndexCalculator />
    </div>
  )
}
