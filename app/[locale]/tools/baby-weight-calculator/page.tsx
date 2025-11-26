import { Metadata } from "next"
import { BabyWeightCalculator } from "@/components/tools/baby-weight-calculator"

export const metadata: Metadata = {
  title: "Bebek Kilosu Hesaplayıcı | Online Araçlar",
  description: "Yaş ve cinsiyete göre ideal bebek kilo aralıklarını hesaplayın.",
  keywords: ["bebek", "baby", "kilo", "weight", "gelişim", "ideal"],
}

export default function BabyWeightPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Bebek Kilosu Hesaplayıcı
          </span>
        </h1>
        <p className="text-xl text-slate-600">Bebeğinizin sağlıklı gelişimini takip edin</p>
      </div>
      <BabyWeightCalculator />
    </div>
  )
}
