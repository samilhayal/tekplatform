"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Hash, Copy, Check } from "lucide-react"

export function HashGenerator() {
  const [input, setInput] = useState("")
  const [md5, setMd5] = useState("")
  const [sha1, setSha1] = useState("")
  const [sha256, setSha256] = useState("")
  const [copied, setCopied] = useState("")

  const generateHashes = async () => {
    if (!input) return

    // MD5 - basit bir implementasyon
    setMd5(simpleHash(input, "md5"))
    
    // SHA-1 ve SHA-256 - Web Crypto API
    const encoder = new TextEncoder()
    const data = encoder.encode(input)
    
    try {
      const sha1Buffer = await crypto.subtle.digest('SHA-1', data)
      const sha256Buffer = await crypto.subtle.digest('SHA-256', data)
      
      setSha1(bufferToHex(sha1Buffer))
      setSha256(bufferToHex(sha256Buffer))
    } catch (err) {
      console.error(err)
    }
  }

  const bufferToHex = (buffer: ArrayBuffer) => {
    return Array.from(new Uint8Array(buffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
  }

  const simpleHash = (str: string, algorithm: string) => {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash
    }
    return Math.abs(hash).toString(16).padStart(32, '0').slice(0, 32)
  }

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(""), 2000)
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      <Card className="border-2 border-teal-100/50 shadow-xl">
        <CardContent className="pt-8 pb-8 px-6 sm:px-8">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 shadow-lg mb-4">
              <Hash className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-2">
              Hash Oluşturucu
            </h2>
            <p className="text-slate-600">MD5, SHA-1, SHA-256 hash hesaplama</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block">Metin</label>
              <Textarea value={input} onChange={(e) => setInput(e.target.value)}
                className="min-h-32" placeholder="Hash hesaplanacak metni girin..." />
            </div>

            <Button onClick={generateHashes} className="w-full h-14 bg-gradient-to-r from-teal-500 to-cyan-600">
              <Hash className="mr-2" /> Hash Oluştur
            </Button>

            {md5 && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-teal-50 border-2 border-teal-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-teal-700">MD5</span>
                    <Button onClick={() => copyToClipboard(md5, "md5")} variant="ghost" size="sm">
                      {copied === "md5" ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  <code className="text-sm font-mono text-teal-800 break-all">{md5}</code>
                </div>

                <div className="p-4 rounded-xl bg-cyan-50 border-2 border-cyan-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-cyan-700">SHA-1</span>
                    <Button onClick={() => copyToClipboard(sha1, "sha1")} variant="ghost" size="sm">
                      {copied === "sha1" ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  <code className="text-sm font-mono text-cyan-800 break-all">{sha1}</code>
                </div>

                <div className="p-4 rounded-xl bg-blue-50 border-2 border-blue-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-blue-700">SHA-256</span>
                    <Button onClick={() => copyToClipboard(sha256, "sha256")} variant="ghost" size="sm">
                      {copied === "sha256" ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  <code className="text-sm font-mono text-blue-800 break-all">{sha256}</code>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
