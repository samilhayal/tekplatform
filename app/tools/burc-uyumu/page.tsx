import { Metadata } from "next"
import { BurcUyumu } from "@/components/tools/burc-uyumu"

export const metadata: Metadata = {
  title: "Burç Uyumu Hesaplama | Online Araçlar",
  description: "İki burç arasındaki aşk, dostluk ve iş uyumunu hesaplayın. Detaylı burç uyumu analizi ve yorum.",
  keywords: ["burç uyumu", "astroloji", "zodyak uyumu", "aşk uyumu", "burç eşleşmesi", "burç analizi"],
}

export default function BurcUyumuPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Burç Uyumu Hesaplama
          </span>
        </h1>
        <p className="text-xl text-slate-600">İki burç arasındaki uyumu keşfedin</p>
      </div>
      <BurcUyumu />
    </div>
  )
}
