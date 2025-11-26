import { Metadata } from "next"
import { ColorPaletteGenerator } from "@/components/tools/color-palette-generator"

export const metadata: Metadata = {
  title: "Renk Paleti Oluşturucu | Online Araçlar",
  description: "HEX, RGB, HSL renk paleti oluşturucu. Monochromatic, analogous ve complementary renkler.",
  keywords: ["renk", "color", "palette", "hex", "rgb", "hsl", "design"],
}

export default function ColorPaletteGeneratorPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
            Renk Paleti Oluşturucu
          </span>
        </h1>
        <p className="text-xl text-slate-600">Muhteşem renk kombinasyonları</p>
      </div>
      <ColorPaletteGenerator />
    </div>
  )
}
