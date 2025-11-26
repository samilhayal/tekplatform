import { TemperatureConverter } from "@/components/tools/temperature-converter"

export const metadata = {
  title: "Sıcaklık Dönüştürücü | Online Tools Hub",
  description: "Celsius, Fahrenheit, Kelvin sıcaklık birimlerini kolayca dönüştürün. Hızlı ve doğru sıcaklık hesaplayıcı.",
}

export default function TemperatureConverterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <TemperatureConverter />
    </div>
  )
}
