import { Metadata } from "next"
import { CaseConverter } from "@/components/tools/case-converter"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Metin Dönüştürücü (Case Converter) | Online Araçlar",
  description: "Metinleri büyük harf, küçük harf, title case ve diğer formatlara dönüştürün.",
  keywords: ["case converter", "büyük harf", "küçük harf", "title case", "metin dönüştürücü"],
}

export default function CaseConverterPage() {
  return (
    <div className="min-h-screen py-16 px-4 relative">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-5xl mx-auto relative">
        {/* Home Button */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-xl bg-white/80 backdrop-blur-sm border-2 border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:border-indigo-300 hover:scale-105 transition-all shadow-sm hover:shadow-md font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Ana Sayfaya Dön
        </Link>

        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 border border-indigo-200">
            <div className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
            <span className="text-sm font-semibold text-indigo-700">Metin Dönüştürücü</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Case Converter
            </span>
          </h1>
          <p className="text-xl text-slate-600">
            Metinlerinizi kolayca farklı formatlara dönüştürün
          </p>
        </div>
        
        <CaseConverter />
      </div>
    </div>
  )
}
