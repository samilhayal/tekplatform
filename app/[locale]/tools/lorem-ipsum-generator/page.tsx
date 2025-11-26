import { Metadata } from "next"
import { LoremIpsumGenerator } from "@/components/tools/lorem-ipsum-generator"

export const metadata: Metadata = {
  title: "Lorem Ipsum Generator | Online Araçlar",
  description: "Lorem ipsum placeholder metin oluşturucu. Paragraf ve kelime bazlı üretim.",
  keywords: ["lorem ipsum", "placeholder", "text", "generator", "metin"],
}

export default function LoremIpsumGeneratorPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            Lorem Ipsum Generator
          </span>
        </h1>
        <p className="text-xl text-slate-600">Placeholder metin oluşturun</p>
      </div>
      <LoremIpsumGenerator />
    </div>
  )
}
