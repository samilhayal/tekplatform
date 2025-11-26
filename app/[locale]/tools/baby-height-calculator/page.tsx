import { Metadata } from "next"
import { BabyHeightCalculator } from "@/components/tools/baby-height-calculator"

export const metadata: Metadata = {
  title: "Bebek Boyu Hesaplayıcı | Online Araçlar",
  description: "Yaş ve cinsiyete göre ideal bebek boy aralıklarını hesaplayın.",
  keywords: ["bebek", "baby", "boy", "height", "uzunluk", "gelişim"],
}

export default function BabyHeightPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Bebek Boyu Hesaplayıcı
          </span>
        </h1>
        <p className="text-xl text-slate-600">Bebeğinizin sağlıklı gelişimini takip edin</p>
      </div>
      <BabyHeightCalculator />
    </div>
  )
}
