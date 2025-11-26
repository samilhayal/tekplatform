import { Metadata } from "next"
import { AyBurcuHesaplayici } from "@/components/tools/ay-burcu-hesaplayici"

export const metadata: Metadata = {
  title: "Ay Burcu Hesaplayıcı | Online Araçlar",
  description: "Doğum tarihi, saati ve yerine göre Ay burcunuzu hesaplayın. Duygusal karakterinizi ve ihtiyaçlarınızı keşfedin.",
  keywords: ["ay burcu", "moon sign", "astroloji", "duygusal karakter", "ay fazı", "burç hesaplama"],
}

export default function AyBurcuHesaplayiciPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            Ay Burcu Hesaplayıcı
          </span>
        </h1>
        <p className="text-xl text-slate-600">Duygusal iç dünyanızı keşfedin</p>
      </div>
      <AyBurcuHesaplayici />
    </div>
  )
}
