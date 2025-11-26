import { Metadata } from "next"
import { BusinessDaysCalculator } from "@/components/tools/business-days-calculator"

export const metadata: Metadata = {
  title: "İş Günü Hesaplayıcı | Online Araçlar",
  description: "Hafta sonları hariç iş günü sayısı hesaplama.",
  keywords: ["iş günü", "business days", "working days"],
}

export default function Page() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold mb-6"><span className="bg-gradient-to-r from-slate-600 to-gray-600 bg-clip-text text-transparent">İş Günü Hesaplayıcı</span></h1>
      </div>
      <BusinessDaysCalculator />
    </div>
  )
}
