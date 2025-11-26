import { Metadata } from "next"
import { TimeDifferenceCalculator } from "@/components/tools/time-difference-calculator"
export const metadata: Metadata = { title: "Saat Farkı | Online Araçlar", keywords: ["saat", "time", "difference"] }
export default function Page() { return (<div className="min-h-screen py-16 px-4"><div className="max-w-5xl mx-auto mb-12 text-center"><h1 className="text-5xl font-bold mb-6"><span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">Saat Farkı</span></h1></div><TimeDifferenceCalculator /></div>) }
