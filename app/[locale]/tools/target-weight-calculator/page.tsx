import { Metadata } from "next"
import { TargetWeightCalculator } from "@/components/tools/target-weight-calculator"

export const metadata: Metadata = {
  title: "Hedef Kilo Hesaplayıcı | Online Araçlar",
  description: "Kilo verme veya alma planları oluşturun, günlük kalori ihtiyacınızı hesaplayın.",
  keywords: ["hedef kilo", "target weight", "diyet", "diet", "kilo verme", "kalori"],
}

export default function TargetWeightPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            Hedef Kilo Hesaplayıcı
          </span>
        </h1>
        <p className="text-xl text-slate-600">Kilo hedeflerinize ulaşın</p>
      </div>
      <TargetWeightCalculator />
    </div>
  )
}
