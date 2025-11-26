import { Metadata } from "next"
import { AnagramGenerator } from "@/components/tools/anagram-generator"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Anagram Oluşturucu | Online Araçlar",
  description: "Kelimelerin farklı kombinasyonlarını ve anagramlarını oluşturun.",
  keywords: ["anagram", "kelime", "kombinasyon", "word", "generator"],
}

export default function AnagramGeneratorPage() {
  return (
    <div className="min-h-screen py-16 px-4 relative">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-br from-pink-200/20 to-indigo-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-5xl mx-auto relative">
        {/* Home Button */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-xl bg-white/80 backdrop-blur-sm border-2 border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300 hover:scale-105 transition-all shadow-sm hover:shadow-md font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Ana Sayfaya Dön
        </Link>

        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200">
            <div className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
            <span className="text-sm font-semibold text-purple-700">Kelime Oyunları</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Anagram Oluşturucu
            </span>
          </h1>
          <p className="text-xl text-slate-600">
            Kelimelerin farklı kombinasyonlarını keşfedin
          </p>
        </div>
        
        <AnagramGenerator />
      </div>
    </div>
  )
}
