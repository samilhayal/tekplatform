import { Metadata } from "next"
import { YukselenBurcHesaplayici } from "@/components/tools/yukselen-burc-hesaplayici"

export const metadata: Metadata = {
  title: "Yükselen Burç Hesaplama | Online Araçlar",
  description: "Doğum tarihi, saati ve yerine göre yükselen burcunuzu hesaplayın. Ascendant burç nedir öğrenin.",
  keywords: ["yükselen burç", "ascendant", "astroloji", "doğum haritası", "burç hesaplama"],
}

export default function YukselenBurcHesaplayiciPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
            Yükselen Burç Hesaplayıcı
          </span>
        </h1>
        <p className="text-xl text-slate-600">Doğum bilgilerinize göre yükselen burcunuzu öğrenin</p>
      </div>
      <YukselenBurcHesaplayici />
    </div>
  )
}
