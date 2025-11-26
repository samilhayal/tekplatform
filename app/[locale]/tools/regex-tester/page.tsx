import { Metadata } from "next"
import { RegexTester } from "@/components/tools/regex-tester"

export const metadata: Metadata = {
  title: "Regex Test Aracı | Online Araçlar",
  description: "Regular expression test ve doğrulama. Örnek patternler ile kolay kullanım.",
  keywords: ["regex", "regular expression", "pattern", "test", "validation"],
}

export default function RegexTesterPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
            Regex Test Aracı
          </span>
        </h1>
        <p className="text-xl text-slate-600">Regular expression tester</p>
      </div>
      <RegexTester />
    </div>
  )
}
