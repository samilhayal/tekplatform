import { Metadata } from "next"
import { BodyFatCalculator } from "@/components/tools/body-fat-calculator"

export const metadata: Metadata = {
  title: "Vücut Yağ Oranı Hesaplayıcı | Online Araçlar",
  description: "Vücut yağ yüzdenizi ve kompozisyonunuzu hesaplayın.",
  keywords: ["vücut yağ", "body fat", "percentage", "oran", "kompozisyon"],
}

export default function BodyFatPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Vücut Yağ Oranı Hesaplayıcı
          </span>
        </h1>
        <p className="text-xl text-slate-600">Vücut kompozisyonunuzu analiz edin</p>
      </div>
      <BodyFatCalculator />
    </div>
  )
}
