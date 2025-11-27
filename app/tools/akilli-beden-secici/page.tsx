import { Metadata } from "next"
import { AkillBedenSecici } from "@/components/tools/akilli-beden-secici"

export const metadata: Metadata = {
  title: "Akıllı Beden Ölçü Seçici | Online Araçlar",
  description: "Vücut ölçülerinize göre farklı markalarda hangi beden giymeli olduğunuzu öğrenin. Zara, H&M, Mavi, LC Waikiki ve daha fazla marka için beden karşılaştırması.",
  keywords: ["beden hesaplama", "beden seçici", "giysi bedeni", "marka beden tablosu", "Zara beden", "H&M beden", "beden ölçü tablosu"],
}

export default function AkillBedenSeciciPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Akıllı Beden Ölçü Seçici
          </span>
        </h1>
        <p className="text-xl text-slate-600">Vücut ölçülerinize göre hangi bedenin size uyduğunu öğrenin</p>
      </div>
      <AkillBedenSecici />
    </div>
  )
}
