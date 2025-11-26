import { Metadata } from "next"
import { AnnualLeaveCalculator } from "@/components/tools/annual-leave-calculator"
export const metadata: Metadata = { title: "Yıllık İzin | Online Araçlar", keywords: ["yıllık izin", "annual leave", "vacation"] }
export default function Page() { return (<div className="min-h-screen py-16 px-4"><div className="max-w-5xl mx-auto mb-12 text-center"><h1 className="text-5xl font-bold mb-6"><span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Yıllık İzin</span></h1></div><AnnualLeaveCalculator /></div>) }
