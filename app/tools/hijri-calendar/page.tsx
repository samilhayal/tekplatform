import { Metadata } from "next"
import { HijriCalendar } from "@/components/tools/hijri-calendar"
export const metadata: Metadata = { title: "Hicri Takvim | Online Araçlar", description: "Miladi-Hicri tarih dönüşümü", keywords: ["hicri", "hijri", "miladi"] }
export default function Page() { return (<div className="min-h-screen py-16 px-4"><div className="max-w-5xl mx-auto mb-12 text-center"><h1 className="text-5xl font-bold mb-6"><span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Hicri Takvim</span></h1></div><HijriCalendar /></div>) }
