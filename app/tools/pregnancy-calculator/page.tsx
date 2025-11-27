import { Metadata } from "next"
import { PregnancyCalculator } from "@/components/tools/pregnancy-calculator"

export const metadata: Metadata = {
  title: "Gebelik Haftası Hesaplama | Online Araçlar",
  description: "Tahmini doğum tarihi, gebelik haftası ve trimester bilgilerinizi hesaplayın.",
  keywords: ["gebelik", "pregnancy", "doğum", "birth", "hamilelik", "trimester"],
}

export default function PregnancyPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
            Gebelik Haftası Hesaplama
          </span>
        </h1>
        <p className="text-xl text-slate-600">Doğum tarihinizi hesaplayın</p>
      </div>
      <PregnancyCalculator />
    </div>
  )
}
