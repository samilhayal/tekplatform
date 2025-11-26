import { Metadata } from "next"
import { BaseConverter } from "@/components/tools/base-converter"

export const metadata: Metadata = {
  title: "Taban Dönüştürücü | Online Araçlar",
  description: "Binary, octal, decimal ve hexadecimal arasında sayı tabanı dönüşümü yapın.",
  keywords: ["taban dönüştürücü", "base converter", "binary", "hexadecimal", "octal"],
}

export default function BaseConverterPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
            Taban Dönüştürücü
          </span>
        </h1>
        <p className="text-xl text-slate-600">Sayı tabanları arası çevirici</p>
      </div>
      <BaseConverter />
    </div>
  )
}
