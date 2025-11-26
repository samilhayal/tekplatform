import { RaiseCalculator } from "@/components/tools/raise-calculator"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Zam Hesaplama | Online Tools Hub",
  description: "Maaş zammınızı hesaplayın. Yüzdelik zam oranına göre yeni maaşınızı, aylık ve yıllık artışı öğrenin.",
}

export default function RaiseCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <RaiseCalculator />
    </div>
  )
}
