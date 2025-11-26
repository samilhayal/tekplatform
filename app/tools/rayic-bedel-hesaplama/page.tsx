import { Metadata } from "next"
import { RayicBedelHesaplama } from "@/components/tools/rayic-bedel-hesaplama"

export const metadata: Metadata = {
  title: "Rayiç Bedel Hesaplama 2024 | Online Araçlar",
  description: "Gayrimenkulünüzün bulunduğu konuma göre rayiç bedelini öğrenin. İl, ilçe ve mahalle bazında güncel 2024 rayiç bedel sorgulaması.",
  keywords: ["rayiç bedel", "rayiç bedel hesaplama", "emlak rayiç", "gayrimenkul değeri", "tapu rayiç", "2024 rayiç bedel"],
}

export default function RayicBedelPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            Rayiç Bedel Hesaplama
          </span>
        </h1>
        <p className="text-xl text-slate-600">Gayrimenkulünüzün bulunduğu konuma göre rayiç bedelini öğrenin</p>
      </div>
      <RayicBedelHesaplama />
    </div>
  )
}
