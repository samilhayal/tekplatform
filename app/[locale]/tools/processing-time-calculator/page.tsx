import { Metadata } from "next"
import { ProcessingTimeCalculator } from "@/components/tools/processing-time-calculator"
export const metadata: Metadata = { title: "İşlem Süresi | Online Araçlar", keywords: ["işlem", "processing", "time"] }
export default function Page() { return (<div className="min-h-screen py-16 px-4"><div className="max-w-5xl mx-auto mb-12 text-center"><h1 className="text-5xl font-bold mb-6"><span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">İşlem Süresi</span></h1></div><ProcessingTimeCalculator /></div>) }
