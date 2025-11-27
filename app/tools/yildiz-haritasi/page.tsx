import { Metadata } from "next"
import { YildizHaritasi } from "@/components/tools/yildiz-haritasi"

export const metadata: Metadata = {
  title: "Yıldız Haritası Oluşturma | Online Araçlar",
  description: "Doğum tarihi, saati ve yerine göre kişisel natal chart oluşturun. Güneş, Ay, yükselen burç ve gezegen konumları.",
  keywords: ["yıldız haritası", "natal chart", "astroloji", "doğum haritası", "gezegen konumları", "burç analizi"],
}

export default function YildizHaritasiPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
            Yıldız Haritası Oluşturma
          </span>
        </h1>
        <p className="text-xl text-slate-600">Kişisel natal chart'ınızı keşfedin</p>
      </div>
      <YildizHaritasi />
    </div>
  )
}
