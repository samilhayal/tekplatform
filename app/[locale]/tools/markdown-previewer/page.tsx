import { Metadata } from "next"
import { MarkdownPreviewer } from "@/components/tools/markdown-previewer"

export const metadata: Metadata = {
  title: "Markdown Önizleyici | Online Araçlar",
  description: "Canlı markdown düzenleyici ve önizleme aracı. Markdown'ınızı gerçek zamanlı görün.",
  keywords: ["markdown", "preview", "editor", "önizleme", "md"],
}

export default function MarkdownPreviewerPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-slate-600 to-slate-800 bg-clip-text text-transparent">
            Markdown Önizleyici
          </span>
        </h1>
        <p className="text-xl text-slate-600">Canlı markdown düzenleme</p>
      </div>
      <MarkdownPreviewer />
    </div>
  )
}
