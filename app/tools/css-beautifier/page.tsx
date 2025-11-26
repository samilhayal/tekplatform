import { Metadata } from "next"
import { CSSBeautifier } from "@/components/tools/css-beautifier"

export const metadata: Metadata = {
  title: "CSS Beautifier & Validator | Online Araçlar",
  description: "CSS güzelleştirme, doğrulama ve minify aracı. CSS verilerinizi kolayca formatlayın, hataları görün ve dışa aktarın.",
  keywords: ["css", "beautifier", "formatter", "validator", "prettify", "minify", "css düzenleme", "web geliştirme"],
}

export default function CSSBeautifierPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
            CSS Beautifier
          </span>
        </h1>
        <p className="text-xl text-slate-600">CSS verilerinizi güzelleştirin, doğrulayın ve düzenleyin</p>
      </div>
      <CSSBeautifier />
    </div>
  )
}
