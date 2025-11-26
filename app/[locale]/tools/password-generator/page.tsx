import { Metadata } from "next"
import { PasswordGenerator } from "@/components/tools/password-generator"

export const metadata: Metadata = {
  title: "Şifre Oluşturucu | Online Araçlar",
  description: "Güvenli ve güçlü rastgele şifre oluşturucu. Özelleştirilebilir uzunluk ve karakter seçenekleri.",
  keywords: ["şifre", "password", "generator", "güvenlik", "security"],
}

export default function PasswordGeneratorPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Güvenli Şifre Oluşturucu
          </span>
        </h1>
        <p className="text-xl text-slate-600">Hesaplarınız için güçlü şifreler</p>
      </div>
      <PasswordGenerator />
    </div>
  )
}
