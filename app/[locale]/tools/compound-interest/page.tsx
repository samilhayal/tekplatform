import { Metadata } from "next"
import { CompoundInterestCalculator } from "@/components/tools/compound-interest-calculator"

export const metadata: Metadata = {
  title: "Bileşik Faiz Hesaplayıcı | Online Araçlar",
  description: "Bileşik faiz hesaplama ve yatırım getiri analizi. Farklı bileşik dönemler ile hesaplama.",
  keywords: ["bileşik faiz", "compound interest", "yatırım", "getiri"],
}

export default function CompoundInterestPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
            Bileşik Faiz Hesaplayıcı
          </span>
        </h1>
        <p className="text-xl text-slate-600">Yatırımınızın getirisini hesaplayın</p>
      </div>
      <CompoundInterestCalculator />
    </div>
  )
}
