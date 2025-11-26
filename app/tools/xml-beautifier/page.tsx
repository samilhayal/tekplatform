import { Metadata } from "next"
import { XMLBeautifier } from "@/components/tools/xml-beautifier"

export const metadata: Metadata = {
  title: "XML Beautifier & Validator | Online Araçlar",
  description: "XML güzelleştirme, doğrulama ve minify aracı. XML verilerinizi kolayca formatlayın, hataları görün ve dışa aktarın.",
  keywords: ["xml", "beautifier", "formatter", "validator", "prettify", "minify", "xml düzenleme"],
}

export default function XMLBeautifierPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            XML Beautifier
          </span>
        </h1>
        <p className="text-xl text-slate-600">XML verilerinizi güzelleştirin, doğrulayın ve düzenleyin</p>
      </div>
      <XMLBeautifier />
    </div>
  )
}
