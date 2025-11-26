"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Binary, Copy, Check, Upload, Download } from "lucide-react"

export function Base64Tool() {
  const [text, setText] = useState("")
  const [base64, setBase64] = useState("")
  const [copied, setCopied] = useState(false)
  const [tab, setTab] = useState("encode")

  const encode = () => {
    try {
      const encoded = btoa(unescape(encodeURIComponent(text)))
      setBase64(encoded)
    } catch (err) {
      alert("Kodlama hatası!")
    }
  }

  const decode = () => {
    try {
      const decoded = decodeURIComponent(escape(atob(base64)))
      setText(decoded)
    } catch (err) {
      alert("Geçersiz Base64!")
    }
  }

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        setBase64(result.split(',')[1])
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Card className="border-2 border-purple-100/50 shadow-xl">
        <CardContent className="pt-8 pb-8 px-6 sm:px-8">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-fuchsia-600 shadow-lg mb-4">
              <Binary className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent mb-2">
              Base64 Kodlayıcı
            </h2>
            <p className="text-slate-600">Metin ve dosya kodlama/kod çözme</p>
          </div>

          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="encode">Kodla (Encode)</TabsTrigger>
              <TabsTrigger value="decode">Çöz (Decode)</TabsTrigger>
            </TabsList>

            <TabsContent value="encode" className="space-y-6">
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-2 block">Metin</label>
                <Textarea value={text} onChange={(e) => setText(e.target.value)}
                  className="min-h-48 font-mono" placeholder="Kodlanacak metni girin..." />
              </div>
              
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-2 block">Dosya Yükle</label>
                <Input type="file" onChange={handleFileUpload} className="h-14" />
              </div>

              <Button onClick={encode} className="w-full h-14 bg-gradient-to-r from-purple-500 to-fuchsia-600">
                <Binary className="mr-2" /> Kodla
              </Button>

              {base64 && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-semibold text-slate-700">Base64 Çıktı</label>
                    <Button onClick={() => copyToClipboard(base64)} variant="ghost" size="sm">
                      {copied ? <Check className="h-4 w-4 text-green-600 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                      {copied ? "Kopyalandı" : "Kopyala"}
                    </Button>
                  </div>
                  <Textarea value={base64} readOnly className="min-h-48 font-mono text-sm bg-purple-50" />
                </div>
              )}
            </TabsContent>

            <TabsContent value="decode" className="space-y-6">
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-2 block">Base64 Kodu</label>
                <Textarea value={base64} onChange={(e) => setBase64(e.target.value)}
                  className="min-h-48 font-mono" placeholder="Base64 kodunu girin..." />
              </div>

              <Button onClick={decode} className="w-full h-14 bg-gradient-to-r from-purple-500 to-fuchsia-600">
                <Binary className="mr-2" /> Çöz
              </Button>

              {text && tab === "decode" && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-semibold text-slate-700">Çözülmüş Metin</label>
                    <Button onClick={() => copyToClipboard(text)} variant="ghost" size="sm">
                      {copied ? <Check className="h-4 w-4 text-green-600 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                      {copied ? "Kopyalandı" : "Kopyala"}
                    </Button>
                  </div>
                  <Textarea value={text} readOnly className="min-h-48 font-mono text-sm bg-purple-50" />
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
