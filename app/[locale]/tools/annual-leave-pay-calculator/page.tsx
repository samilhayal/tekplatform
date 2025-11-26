import { Metadata } from "next"
import { AnnualLeavePayCalculator } from "@/components/tools/annual-leave-pay-calculator"
export const metadata: Metadata = { title: "Yıllık İzin Ücreti | Online Araçlar", keywords: ["yıllık izin", "annual leave", "pay"] }
export default function Page() { return (<div className="min-h-screen py-16 px-4"><div className="max-w-5xl mx-auto mb-12 text-center"><h1 className="text-5xl font-bold mb-6"><span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Yıllık İzin Ücreti</span></h1></div><AnnualLeavePayCalculator /></div>) }
