import { Metadata } from "next"
import { HTMLBeautifier } from "@/components/tools/html-beautifier"

export const metadata: Metadata = {
  title: "HTML Beautifier & Validator | Online Araçlar",
  description: "HTML güzelleştirme, doğrulama ve minify aracı. HTML verilerinizi kolayca formatlayın, hataları görün, önizleyin ve dışa aktarın.",
  keywords: ["html", "beautifier", "formatter", "validator", "prettify", "minify", "html düzenleme", "web geliştirme"],
}

export default function HTMLBeautifierPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
            HTML Beautifier
          </span>
        </h1>
        <p className="text-xl text-slate-600">HTML verilerinizi güzelleştirin, doğrulayın ve önizleyin</p>
      </div>
      <HTMLBeautifier />
    </div>
  )
}
