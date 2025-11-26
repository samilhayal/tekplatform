import { Metadata } from "next"
import { JSONBeautifier } from "@/components/tools/json-beautifier"

export const metadata: Metadata = {
  title: "JSON Beautifier & Validator | Online Araçlar",
  description: "JSON güzelleştirme, doğrulama, minify ve düzenleme aracı. JSON verilerinizi kolayca formatlayın, hataları görün ve dışa aktarın.",
  keywords: ["json", "beautifier", "formatter", "validator", "prettify", "minify", "json düzenleme"],
}

export default function JSONBeautifierPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            JSON Beautifier
          </span>
        </h1>
        <p className="text-xl text-slate-600">JSON verilerinizi güzelleştirin, doğrulayın ve düzenleyin</p>
      </div>
      <JSONBeautifier />
    </div>
  )
}
