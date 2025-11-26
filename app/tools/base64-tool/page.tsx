import { Metadata } from "next"
import { Base64Tool } from "@/components/tools/base64-tool"

export const metadata: Metadata = {
  title: "Base64 Kodlayıcı | Online Araçlar",
  description: "Metin ve dosya Base64 kodlama/kod çözme aracı. Hızlı ve güvenli encode/decode.",
  keywords: ["base64", "encode", "decode", "kodlama", "encryption"],
}

export default function Base64ToolPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
            Base64 Kodlayıcı
          </span>
        </h1>
        <p className="text-xl text-slate-600">Encode & Decode</p>
      </div>
      <Base64Tool />
    </div>
  )
}
