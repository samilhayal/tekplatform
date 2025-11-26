import { Metadata } from "next"
import { CSVBeautifier } from "@/components/tools/csv-beautifier"

export const metadata: Metadata = {
  title: "CSV Beautifier & Viewer | Online Araçlar",
  description: "CSV güzelleştirme, görüntüleme ve düzenleme aracı. CSV verilerinizi tablo formatında görüntüleyin, hataları görün ve dışa aktarın.",
  keywords: ["csv", "beautifier", "viewer", "formatter", "tablo", "excel", "csv düzenleme"],
}

export default function CSVBeautifierPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            CSV Beautifier
          </span>
        </h1>
        <p className="text-xl text-slate-600">CSV verilerinizi görüntüleyin, düzenleyin ve dışa aktarın</p>
      </div>
      <CSVBeautifier />
    </div>
  )
}
