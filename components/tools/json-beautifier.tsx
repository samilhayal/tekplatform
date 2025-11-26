"use client"

import { useState, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Code, Copy, Check, AlertCircle, Download, Upload, Trash2, Minimize2, Maximize2, FileJson } from "lucide-react"

export function JSONBeautifier() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState<{ message: string; line?: number; column?: number } | null>(null)
  const [copied, setCopied] = useState(false)
  const [indentSize, setIndentSize] = useState(2)

  const parseJSONError = (err: Error) => {
    const match = err.message.match(/at position (\d+)/)
    if (match) {
      const position = parseInt(match[1])
      const lines = input.substring(0, position).split('\n')
      return {
        message: err.message,
        line: lines.length,
        column: lines[lines.length - 1].length + 1
      }
    }
    return { message: err.message }
  }

  const formatJSON = useCallback(() => {
    if (!input.trim()) {
      setError({ message: "Lütfen JSON verisi girin" })
      setOutput("")
      return
    }
    try {
      const parsed = JSON.parse(input)
      const formatted = JSON.stringify(parsed, null, indentSize)
      setOutput(formatted)
      setError(null)
    } catch (err: any) {
      setError(parseJSONError(err))
      setOutput("")
    }
  }, [input, indentSize])

  const minifyJSON = useCallback(() => {
    if (!input.trim()) {
      setError({ message: "Lütfen JSON verisi girin" })
      setOutput("")
      return
    }
    try {
      const parsed = JSON.parse(input)
      const minified = JSON.stringify(parsed)
      setOutput(minified)
      setError(null)
    } catch (err: any) {
      setError(parseJSONError(err))
      setOutput("")
    }
  }, [input])

  const validateJSON = useCallback(() => {
    if (!input.trim()) {
      setError({ message: "Lütfen JSON verisi girin" })
      return
    }
    try {
      JSON.parse(input)
      setError(null)
      setOutput("✅ JSON geçerli!")
    } catch (err: any) {
      setError(parseJSONError(err))
      setOutput("")
    }
  }, [input])

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [output])

  const downloadJSON = useCallback(() => {
    if (!output) return
    const blob = new Blob([output], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "formatted.json"
    a.click()
    URL.revokeObjectURL(url)
  }, [output])

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      setInput(content)
      setError(null)
      setOutput("")
    }
    reader.readAsText(file)
    e.target.value = ""
  }, [])

  const clearAll = useCallback(() => {
    setInput("")
    setOutput("")
    setError(null)
  }, [])

  const sampleJSON = `{
  "name": "Ahmet Yılmaz",
  "age": 30,
  "email": "ahmet@example.com",
  "isActive": true,
  "address": {
    "city": "İstanbul",
    "country": "Türkiye"
  },
  "hobbies": ["programlama", "okuma", "yüzme"]
}`

  const loadSample = () => {
    setInput(sampleJSON)
    setError(null)
    setOutput("")
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <Card className="border-2 border-blue-100/50 shadow-xl">
        <CardContent className="pt-8 pb-8 px-6 sm:px-8">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 shadow-lg mb-4">
              <FileJson className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
              JSON Beautifier
            </h2>
            <p className="text-slate-600">JSON verilerinizi düzenleyin, doğrulayın ve güzelleştirin</p>
          </div>

          {/* Toolbar */}
          <div className="flex flex-wrap gap-3 mb-6 p-4 bg-slate-50 rounded-xl">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-slate-600">Girinti:</label>
              <select
                value={indentSize}
                onChange={(e) => setIndentSize(Number(e.target.value))}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={2}>2 boşluk</option>
                <option value={4}>4 boşluk</option>
                <option value={8}>8 boşluk</option>
              </select>
            </div>
            <div className="flex-1" />
            <label className="cursor-pointer">
              <input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
              />
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                <Upload className="h-4 w-4" />
                Dosya Yükle
              </span>
            </label>
            <Button variant="outline" size="sm" onClick={loadSample} className="gap-2">
              <Code className="h-4 w-4" />
              Örnek JSON
            </Button>
            <Button variant="outline" size="sm" onClick={clearAll} className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50">
              <Trash2 className="h-4 w-4" />
              Temizle
            </Button>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Input Panel */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-slate-700">JSON Girişi</label>
                <span className="text-xs text-slate-400">{input.length} karakter</span>
              </div>
              <div className="relative">
                <textarea
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value)
                    setError(null)
                  }}
                  className={`w-full min-h-[400px] p-4 font-mono text-sm rounded-xl border-2 resize-y focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    error ? "border-red-300 bg-red-50/30" : "border-slate-200 bg-white"
                  }`}
                  placeholder='{"name": "Ahmet", "age": 30}'
                  spellCheck={false}
                />
                {error && error.line && (
                  <div className="absolute top-2 right-2 px-2 py-1 bg-red-100 text-red-700 text-xs rounded-md">
                    Satır: {error.line}, Sütun: {error.column}
                  </div>
                )}
              </div>
              <div className="grid grid-cols-3 gap-3">
                <Button onClick={formatJSON} className="h-12 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700">
                  <Maximize2 className="mr-2 h-4 w-4" />
                  Güzelleştir
                </Button>
                <Button onClick={minifyJSON} variant="outline" className="h-12">
                  <Minimize2 className="mr-2 h-4 w-4" />
                  Küçült
                </Button>
                <Button onClick={validateJSON} variant="outline" className="h-12">
                  <Check className="mr-2 h-4 w-4" />
                  Doğrula
                </Button>
              </div>
            </div>

            {/* Output Panel */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-slate-700">Çıktı</label>
                <div className="flex gap-2">
                  {output && !error && (
                    <>
                      <Button onClick={downloadJSON} variant="ghost" size="sm" className="gap-2">
                        <Download className="h-4 w-4" />
                        İndir
                      </Button>
                      <Button onClick={copyToClipboard} variant="ghost" size="sm" className="gap-2">
                        {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                        {copied ? "Kopyalandı" : "Kopyala"}
                      </Button>
                    </>
                  )}
                </div>
              </div>
              {error ? (
                <div className="min-h-[400px] p-4 rounded-xl bg-red-50 border-2 border-red-200">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-red-800 mb-1">Geçersiz JSON</p>
                      <p className="text-sm text-red-600 font-mono">{error.message}</p>
                      {error.line && (
                        <p className="text-sm text-red-500 mt-2">
                          📍 Hata konumu: Satır {error.line}, Sütun {error.column}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <textarea
                  value={output}
                  readOnly
                  className="w-full min-h-[400px] p-4 font-mono text-sm rounded-xl border-2 border-slate-200 bg-slate-50 resize-y"
                  placeholder="Formatlanmış JSON burada görünecek..."
                />
              )}
            </div>
          </div>

          {/* Features Info */}
          <div className="mt-8 grid sm:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-xl">
              <h3 className="font-semibold text-blue-800 mb-1">🎨 Güzelleştir</h3>
              <p className="text-sm text-blue-600">JSON'u okunabilir formata dönüştür</p>
            </div>
            <div className="p-4 bg-green-50 rounded-xl">
              <h3 className="font-semibold text-green-800 mb-1">✅ Doğrula</h3>
              <p className="text-sm text-green-600">JSON sözdizimi hatalarını bul</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-xl">
              <h3 className="font-semibold text-purple-800 mb-1">📦 Küçült</h3>
              <p className="text-sm text-purple-600">Boşlukları kaldır, boyutu azalt</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
