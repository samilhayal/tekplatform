import { Metadata } from "next"
import { JSONFormatter } from "@/components/tools/json-formatter"

export const metadata: Metadata = {
  title: "JSON Formatter & Validator | Online Araçlar",
  description: "JSON güzelleştirme, doğrulama ve minify aracı. JSON verilerinizi kolayca formatla.",
  keywords: ["json", "formatter", "validator", "prettify", "minify"],
}

export default function JSONFormatterPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            JSON Formatter
          </span>
        </h1>
        <p className="text-xl text-slate-600">JSON verilerinizi düzenleyin</p>
      </div>
      <JSONFormatter />
    </div>
  )
}
