import { Metadata } from "next"
import { SeverancePayCalculator } from "@/components/tools/severance-pay-calculator"
export const metadata: Metadata = { title: "Kıdem Tazminatı | Online Araçlar", keywords: ["kıdem", "severance", "tazminat"] }
export default function Page() { return (<div className="min-h-screen py-16 px-4"><div className="max-w-5xl mx-auto mb-12 text-center"><h1 className="text-5xl font-bold mb-6"><span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Kıdem Tazminatı</span></h1></div><SeverancePayCalculator /></div>) }
