import { Metadata } from "next"
import { CSSGradientGenerator } from "@/components/tools/css-gradient-generator"

export const metadata: Metadata = {
  title: "CSS Gradient Oluşturucu | Online Araçlar",
  description: "Linear ve radial CSS gradient oluşturucu. Hazır paletler ve özelleştirilebilir renkler.",
  keywords: ["css", "gradient", "linear", "radial", "color", "design"],
}

export default function CSSGradientGeneratorPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            CSS Gradient Oluşturucu
          </span>
        </h1>
        <p className="text-xl text-slate-600">Muhteşem gradient tasarımları</p>
      </div>
      <CSSGradientGenerator />
    </div>
  )
}
