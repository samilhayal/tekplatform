import { Metadata } from "next"
import { TimezoneConverter } from "@/components/tools/timezone-converter-new"

export const metadata: Metadata = {
  title: "Saat Dilimi Dönüştürücü | Online Tools Hub",
  description: "Dünyanın farklı şehirlerindeki güncel saati anlık olarak görüntüleyin ve karşılaştırın.",
}

export default function TimezoneConverterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <TimezoneConverter />
    </div>
  )
}
