import { WeightConverter } from "@/components/tools/weight-converter"

export const metadata = {
  title: "Ağırlık Dönüştürücü | Online Tools Hub",
  description: "Kilogram, gram, pound, ons ve diğer ağırlık birimlerini kolayca dönüştürün. Hızlı ve doğru ağırlık hesaplayıcı.",
}

export default function WeightConverterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <WeightConverter />
    </div>
  )
}
