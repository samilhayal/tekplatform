import { Metadata } from "next"
import { RandomNumberGenerator } from "@/components/tools/random-number-generator"

export const metadata: Metadata = {
  title: "Rastgele Sayı Üretici | Online Araçlar",
  description: "Belirli aralıkta rastgele sayılar oluşturun.",
  keywords: ["rastgele sayı", "random number", "generator", "üretici"],
}

export default function RandomNumberGeneratorPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
            Rastgele Sayı Üretici
          </span>
        </h1>
        <p className="text-xl text-slate-600">İstediğiniz aralıkta sayılar</p>
      </div>
      <RandomNumberGenerator />
    </div>
  )
}
