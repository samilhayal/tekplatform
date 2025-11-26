import { Metadata } from "next"
import { SimpleInterestCalculator } from "@/components/tools/simple-interest-calculator"

export const metadata: Metadata = {
  title: "Basit Faiz Hesaplayıcı | Online Araçlar",
  description: "Anapara, faiz oranı ve süreye göre basit faiz hesaplama. Toplam geri ödeme ve aylık taksit hesaplama.",
  keywords: ["basit faiz", "simple interest", "faiz", "kredi", "borç"],
}

export default function SimpleInterestPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Basit Faiz Hesaplayıcı
          </span>
        </h1>
        <p className="text-xl text-slate-600">Faiz ve geri ödeme planınızı hesaplayın</p>
      </div>
      <SimpleInterestCalculator />
    </div>
  )
}
