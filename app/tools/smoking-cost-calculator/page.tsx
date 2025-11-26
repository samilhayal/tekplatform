import { Metadata } from "next"
import { SmokingCostCalculator } from "@/components/tools/smoking-cost-calculator"

export const metadata: Metadata = {
  title: "Sigara Maliyeti Hesaplayıcı | Online Araçlar",
  description: "Yıllık sigara harcamanızı ve sigarayı bırakmanın sağlık faydalarını hesaplayın.",
  keywords: ["sigara", "smoking", "maliyet", "cost", "sağlık", "health"],
}

export default function SmokingCostPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent">
            Sigara Maliyeti Hesaplayıcı
          </span>
        </h1>
        <p className="text-xl text-slate-600">Sağlığınız ve bütçeniz için</p>
      </div>
      <SmokingCostCalculator />
    </div>
  )
}
