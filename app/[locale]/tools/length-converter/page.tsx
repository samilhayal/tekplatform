import { LengthConverter } from "@/components/tools/length-converter"

export const metadata = {
  title: "Uzunluk Dönüştürücü | Online Tools Hub",
  description: "Metre, kilometre, mil, feet, inch ve diğer uzunluk birimlerini kolayca dönüştürün. Hızlı ve doğru uzunluk hesaplayıcı.",
}

export default function LengthConverterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <LengthConverter />
    </div>
  )
}
