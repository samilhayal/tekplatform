"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Code, Copy, Check, AlertCircle } from "lucide-react"

export function JSONFormatter() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(input)
      const formatted = JSON.stringify(parsed, null, 2)
      setOutput(formatted)
      setError("")
    } catch (err: any) {
      setError(err.message)
      setOutput("")
    }
  }

  const minifyJSON = () => {
    try {
      const parsed = JSON.parse(input)
      const minified = JSON.stringify(parsed)
      setOutput(minified)
      setError("")
    } catch (err: any) {
      setError(err.message)
      setOutput("")
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Card className="border-2 border-blue-100/50 shadow-xl">
        <CardContent className="pt-8 pb-8 px-6 sm:px-8">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 shadow-lg mb-4">
              <Code className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
              JSON Formatter
            </h2>
            <p className="text-slate-600">JSON güzelleştirme, doğrulama ve minify</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <label className="text-sm font-semibold text-slate-700 block">JSON Girişi</label>
              <Textarea value={input} onChange={(e) => setInput(e.target.value)}
                className="min-h-96 font-mono text-sm" placeholder='{"name": "Ahmet", "age": 30}' />
              <div className="flex gap-3">
                <Button onClick={formatJSON} className="flex-1 h-12 bg-gradient-to-r from-blue-500 to-cyan-600">
                  <Code className="mr-2 h-4 w-4" /> Güzelleştir
                </Button>
                <Button onClick={minifyJSON} variant="outline" className="flex-1 h-12">
                  Minify
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-slate-700">Çıktı</label>
                {output && (
                  <Button onClick={copyToClipboard} variant="ghost" size="sm">
                    {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                    <span className="ml-2">{copied ? "Kopyalandı" : "Kopyala"}</span>
                  </Button>
                )}
              </div>
              {error ? (
                <div className="p-4 rounded-xl bg-red-50 border-2 border-red-200">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-red-800 mb-1">Geçersiz JSON</p>
                      <p className="text-sm text-red-600">{error}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <Textarea value={output} readOnly className="min-h-96 font-mono text-sm bg-slate-50" 
                  placeholder="Formatlanmış JSON burada görünecek..." />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
