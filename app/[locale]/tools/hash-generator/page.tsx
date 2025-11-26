import { Metadata } from "next"
import { HashGenerator } from "@/components/tools/hash-generator"

export const metadata: Metadata = {
  title: "Hash Oluşturucu | Online Araçlar",
  description: "MD5, SHA-1 ve SHA-256 hash hesaplama aracı. Güvenli hash oluşturma.",
  keywords: ["hash", "md5", "sha1", "sha256", "encryption", "crypto"],
}

export default function HashGeneratorPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Hash Oluşturucu
          </span>
        </h1>
        <p className="text-xl text-slate-600">MD5, SHA-1, SHA-256</p>
      </div>
      <HashGenerator />
    </div>
  )
}
