import { Metadata } from "next"
import { MaternityLeaveCalculator } from "@/components/tools/maternity-leave-calculator"
export const metadata: Metadata = { title: "Doğum İzni | Online Araçlar", keywords: ["doğum", "maternity", "leave"] }
export default function Page() { return (<div className="min-h-screen py-16 px-4"><div className="max-w-5xl mx-auto mb-12 text-center"><h1 className="text-5xl font-bold mb-6"><span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">Doğum İzni</span></h1></div><MaternityLeaveCalculator /></div>) }
