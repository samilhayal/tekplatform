import { Metadata } from "next"
import { BurcOzellikleri } from "@/components/tools/burc-ozellikleri"

export const metadata: Metadata = {
  title: "Burç Özellikleri | Online Araçlar",
  description: "12 burç hakkında detaylı bilgi. Karakter özellikleri, uyumlu burçlar, kariyer, sağlık ve şans bilgileri.",
  keywords: ["burç özellikleri", "astroloji", "zodyak", "burç karakteri", "burç analizi"],
}

export default function BurcOzellikleriPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            Burç Özellikleri
          </span>
        </h1>
        <p className="text-xl text-slate-600">12 burcun tüm detaylarını keşfedin</p>
      </div>
      <BurcOzellikleri />
    </div>
  )
}
