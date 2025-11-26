import { Metadata } from "next"
import { GunlukBurcYorumlari } from "@/components/tools/gunluk-burc-yorumlari"

export const metadata: Metadata = {
  title: "Günlük Burç Yorumları | Online Araçlar",
  description: "12 burç için günlük astroloji yorumları. Aşk, kariyer, para ve sağlık hakkında günlük burç falı.",
  keywords: ["günlük burç", "burç yorumu", "astroloji", "günlük fal", "burç falı", "zodyak"],
}

export default function GunlukBurcYorumlariPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Günlük Burç Yorumları
          </span>
        </h1>
        <p className="text-xl text-slate-600">Bugün yıldızlar sizin için ne söylüyor?</p>
      </div>
      <GunlukBurcYorumlari />
    </div>
  )
}
