import { Metadata } from "next"
import { YksCalculator } from "@/components/tools/yks-calculator"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "YKS Net Hesaplama (TYT-AYT) | Online Araçlar",
  description: "YKS sınavı için TYT ve AYT net hesaplama. Sayısal, Eşit Ağırlık ve Sözel alanlara göre doğru, yanlış ve boş hesaplama.",
  keywords: ["YKS net hesaplama", "TYT net", "AYT net", "üniversite sınavı", "sayısal net", "eşit ağırlık", "sözel net", "ÖSYM"]
}

export default function YksCalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium mb-6 group transition-all hover:gap-3"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            Ana Sayfaya Dön
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg shadow-purple-500/50">
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <div>
              <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-sm font-semibold rounded-full mb-2">
                Eğitim & Sınav
              </span>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
                YKS Net Hesaplama
              </h1>
            </div>
          </div>
          
          <p className="text-slate-600 text-lg max-w-3xl">
            YKS (Yükseköğretim Kurumları Sınavı) TYT ve AYT netlerinizi hesaplayın. 
            Sayısal, Eşit Ağırlık ve Sözel alanlara göre ayrıntılı net hesaplama.
          </p>
        </div>

        <YksCalculator />

        <div className="mt-12 bg-white/80 backdrop-blur-sm rounded-2xl p-8 border-2 border-slate-200 shadow-lg">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">YKS Hakkında</h2>
          <div className="prose prose-slate max-w-none">
            <h3 className="text-xl font-bold text-slate-800">TYT (Temel Yeterlilik Testi)</h3>
            <p className="text-slate-700 mb-3">
              120 soru, tüm adaylar girer. Türkçe 40, Matematik 40, Fen 20, Sosyal 20 soru.
            </p>

            <h3 className="text-xl font-bold text-slate-800 mt-6">AYT (Alan Yeterlilik Testi)</h3>
            <p className="text-slate-700 mb-3">
              80 soru, bölüme göre farklı testler:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-700">
              <li><strong>Sayısal:</strong> Matematik 40 + Fizik 14 + Kimya 13 + Biyoloji 13</li>
              <li><strong>Eşit Ağırlık:</strong> Matematik 40 + Edebiyat-Sosyal 1 (40)</li>
              <li><strong>Sözel:</strong> Edebiyat-Sosyal 1 (40) + Sosyal 2 (40)</li>
            </ul>

            <div className="bg-amber-50 p-4 rounded-lg mt-6">
              <p className="font-mono text-amber-900">Net = Doğru - (Yanlış / 4)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
