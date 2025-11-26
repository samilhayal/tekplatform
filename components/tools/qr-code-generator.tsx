"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { QrCode, Download, Wifi, User, Link as LinkIcon } from "lucide-react"
import QRCodeLib from "qrcode"

export function QRCodeGenerator() {
  const [tab, setTab] = useState("url")
  const [qrCode, setQrCode] = useState("")

  // URL
  const [url, setUrl] = useState("")

  // Text
  const [text, setText] = useState("")

  // WiFi
  const [ssid, setSsid] = useState("")
  const [password, setPassword] = useState("")
  const [encryption, setEncryption] = useState("WPA")

  // vCard
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")

  const generateQR = async (data: string) => {
    try {
      const qr = await QRCodeLib.toDataURL(data, { width: 400, margin: 2 })
      setQrCode(qr)
    } catch (err) {
      console.error(err)
    }
  }

  const generateURLQR = () => {
    if (url) generateQR(url)
  }

  const generateTextQR = () => {
    if (text) generateQR(text)
  }

  const generateWiFiQR = () => {
    if (ssid) {
      const wifiString = `WIFI:T:${encryption};S:${ssid};P:${password};;`
      generateQR(wifiString)
    }
  }

  const generateVCardQR = () => {
    const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nTEL:${phone}\nEMAIL:${email}\nORG:${company}\nEND:VCARD`
    generateQR(vcard)
  }

  const downloadQR = () => {
    if (qrCode) {
      const link = document.createElement("a")
      link.href = qrCode
      link.download = "qrcode.png"
      link.click()
    }
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      <Card className="border-2 border-slate-100/50 shadow-xl">
        <CardContent className="pt-8 pb-8 px-6 sm:px-8">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 shadow-lg mb-4">
              <QrCode className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent mb-2">
              QR Kod Oluşturucu
            </h2>
            <p className="text-slate-600">URL, metin, WiFi ve vCard QR kodları</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <Tabs value={tab} onValueChange={setTab}>
                <TabsList className="grid w-full grid-cols-4 mb-6">
                  <TabsTrigger value="url"><LinkIcon className="h-4 w-4" /></TabsTrigger>
                  <TabsTrigger value="text">Metin</TabsTrigger>
                  <TabsTrigger value="wifi"><Wifi className="h-4 w-4" /></TabsTrigger>
                  <TabsTrigger value="vcard"><User className="h-4 w-4" /></TabsTrigger>
                </TabsList>

                <TabsContent value="url" className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-slate-700 mb-2 block">URL Adresi</label>
                    <Input value={url} onChange={(e) => setUrl(e.target.value)} className="h-14" placeholder="https://example.com" />
                  </div>
                  <Button onClick={generateURLQR} className="w-full h-14 bg-gradient-to-r from-slate-700 to-slate-900">
                    <QrCode className="mr-2" /> QR Kod Oluştur
                  </Button>
                </TabsContent>

                <TabsContent value="text" className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-slate-700 mb-2 block">Metin</label>
                    <Textarea value={text} onChange={(e) => setText(e.target.value)} className="min-h-32" placeholder="QR koda dönüştürmek istediğiniz metni girin..." />
                  </div>
                  <Button onClick={generateTextQR} className="w-full h-14 bg-gradient-to-r from-slate-700 to-slate-900">
                    <QrCode className="mr-2" /> QR Kod Oluştur
                  </Button>
                </TabsContent>

                <TabsContent value="wifi" className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-slate-700 mb-2 block">Ağ Adı (SSID)</label>
                    <Input value={ssid} onChange={(e) => setSsid(e.target.value)} className="h-14" placeholder="MyWiFi" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-700 mb-2 block">Şifre</label>
                    <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="h-14" placeholder="********" />
                  </div>
                  <Button onClick={generateWiFiQR} className="w-full h-14 bg-gradient-to-r from-slate-700 to-slate-900">
                    <Wifi className="mr-2" /> WiFi QR Oluştur
                  </Button>
                </TabsContent>

                <TabsContent value="vcard" className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-slate-700 mb-2 block">Ad Soyad</label>
                    <Input value={name} onChange={(e) => setName(e.target.value)} className="h-14" placeholder="Ahmet Yılmaz" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-700 mb-2 block">Telefon</label>
                    <Input value={phone} onChange={(e) => setPhone(e.target.value)} className="h-14" placeholder="+90 555 123 4567" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-700 mb-2 block">E-posta</label>
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="h-14" placeholder="ahmet@example.com" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-700 mb-2 block">Şirket</label>
                    <Input value={company} onChange={(e) => setCompany(e.target.value)} className="h-14" placeholder="ABC Ltd." />
                  </div>
                  <Button onClick={generateVCardQR} className="w-full h-14 bg-gradient-to-r from-slate-700 to-slate-900">
                    <User className="mr-2" /> vCard QR Oluştur
                  </Button>
                </TabsContent>
              </Tabs>
            </div>

            <div className="flex flex-col items-center justify-center">
              {qrCode ? (
                <div className="space-y-4 animate-in fade-in">
                  <div className="p-6 bg-white rounded-2xl border-2 border-slate-200 shadow-lg">
                    <img src={qrCode} alt="QR Code" className="w-full max-w-sm mx-auto" />
                  </div>
                  <Button onClick={downloadQR} variant="outline" className="w-full h-14">
                    <Download className="mr-2" /> QR Kodu İndir
                  </Button>
                </div>
              ) : (
                <div className="text-center p-12 border-2 border-dashed border-slate-200 rounded-2xl">
                  <QrCode className="h-16 w-16 mx-auto text-slate-300 mb-4" />
                  <p className="text-slate-400">QR kodunuz burada görünecek</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
