import { Metadata } from "next"
import { MarriageLeaveCalculator } from "@/components/tools/marriage-leave-calculator"
export const metadata: Metadata = { title: "Evlenme İzni | Online Araçlar", keywords: ["evlenme", "marriage", "leave"] }
export default function Page() { return (<div className="min-h-screen py-16 px-4"><div className="max-w-5xl mx-auto mb-12 text-center"><h1 className="text-5xl font-bold mb-6"><span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">Evlenme İzni</span></h1></div><MarriageLeaveCalculator /></div>) }
