import { Metadata } from "next"
import { UsernameGenerator } from "@/components/tools/username-generator"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Username Generator | Online Araçlar",
  description: "Yaratıcı ve benzersiz kullanıcı adları oluşturun.",
  keywords: ["username", "kullanıcı adı", "generator", "oluşturucu", "rastgele"],
}

export default function UsernameGeneratorPage() {
  return (
    <div className="min-h-screen py-16 px-4 relative">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-green-200/30 to-emerald-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-br from-emerald-200/20 to-teal-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-5xl mx-auto relative">
        {/* Home Button */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-xl bg-white/80 backdrop-blur-sm border-2 border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300 hover:scale-105 transition-all shadow-sm hover:shadow-md font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Ana Sayfaya Dön
        </Link>

        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200">
            <div className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
            <span className="text-sm font-semibold text-green-700">Kullanıcı Adı Oluşturucu</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Username Generator
            </span>
          </h1>
          <p className="text-xl text-slate-600">
            Benzersiz ve yaratıcı kullanıcı adları oluşturun
          </p>
        </div>
        
        <UsernameGenerator />
      </div>
    </div>
  )
}
