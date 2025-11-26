import { Metadata } from "next"
import { QRCodeGenerator } from "@/components/tools/qr-code-generator"

export const metadata: Metadata = {
  title: "QR Kod Oluşturucu | Online Araçlar",
  description: "URL, metin, WiFi şifresi ve vCard için ücretsiz QR kod oluşturun. İndirilebilir QR kodları.",
  keywords: ["qr kod", "qr code", "generator", "wifi", "vcard", "url"],
}

export default function QRCodeGeneratorPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
            QR Kod Oluşturucu
          </span>
        </h1>
        <p className="text-xl text-slate-600">Ücretsiz ve hızlı QR kod oluşturun</p>
      </div>
      <QRCodeGenerator />
    </div>
  )
}
