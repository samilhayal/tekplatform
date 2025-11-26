"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Code, Copy, Check, AlertCircle, Download, Upload, Trash2, Minimize2, Maximize2, FileJson, Home, Lightbulb, BookOpen, HelpCircle, Info, Braces } from "lucide-react"
import Link from "next/link"

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
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
      {/* Ana Sayfa Butonu */}
      <Link href="/">
        <Button variant="ghost" className="gap-2 hover:bg-blue-50">
          <Home className="h-4 w-4" />
          Ana Sayfa
        </Button>
      </Link>

      {/* Hero Section */}
      <div className="text-center mb-8">
        <div className="relative inline-block">
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-400 rounded-full blur-2xl opacity-20 animate-pulse" />
          <div className="relative bg-gradient-to-br from-blue-100 to-cyan-100 p-6 rounded-3xl">
            <FileJson className="h-16 w-16 text-blue-600 mx-auto mb-2" />
            <Braces className="h-8 w-8 text-cyan-500 absolute -top-2 -right-2 animate-bounce" />
            <Code className="h-6 w-6 text-blue-500 absolute -bottom-1 -left-1 animate-pulse" />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mt-6 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
          JSON Beautifier
        </h1>
        <p className="text-slate-600 mt-3 max-w-2xl mx-auto">
          JSON verilerinizi güzelleştirin, doğrulayın ve profesyonel formata dönüştürün
        </p>
        <div className="flex flex-wrap gap-2 justify-center mt-4">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            🎨 Güzelleştir
          </span>
          <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium">
            ✅ Doğrula
          </span>
          <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium">
            📦 Küçült
          </span>
        </div>
      </div>

      <Card className="border-2 border-blue-100/50 shadow-xl">
        <CardContent className="pt-8 pb-8 px-6 sm:px-8">

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

      {/* Eğitici Bölümler */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        {/* Nasıl Kullanılır? */}
        <Card className="border-2 border-blue-200 hover:border-blue-300 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <HelpCircle className="h-5 w-5" />
              Nasıl Kullanılır?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-sm font-bold shrink-0">1</span>
              <p className="text-slate-600">JSON verinizi sol panele yapıştırın veya dosya yükleyin</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-sm font-bold shrink-0">2</span>
              <p className="text-slate-600">Girinti boyutunu seçin (2, 4 veya 8 boşluk)</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-sm font-bold shrink-0">3</span>
              <p className="text-slate-600">&quot;Güzelleştir&quot;, &quot;Küçült&quot; veya &quot;Doğrula&quot; butonuna tıklayın</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-sm font-bold shrink-0">4</span>
              <p className="text-slate-600">Sonucu kopyalayın veya dosya olarak indirin</p>
            </div>
          </CardContent>
        </Card>

        {/* Örnek Kullanımlar */}
        <Card className="border-2 border-cyan-200 hover:border-cyan-300 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-cyan-700">
              <BookOpen className="h-5 w-5" />
              Örnek Kullanımlar
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-cyan-50 rounded-lg">
              <p className="font-medium text-cyan-800">🔧 API Geliştirme</p>
              <p className="text-sm text-cyan-600">API yanıtlarını okunabilir hale getirin ve hata ayıklayın</p>
            </div>
            <div className="p-3 bg-cyan-50 rounded-lg">
              <p className="font-medium text-cyan-800">📝 Konfigürasyon Dosyaları</p>
              <p className="text-sm text-cyan-600">package.json, tsconfig.json gibi dosyaları düzenleyin</p>
            </div>
            <div className="p-3 bg-cyan-50 rounded-lg">
              <p className="font-medium text-cyan-800">🗃️ Veri Aktarımı</p>
              <p className="text-sm text-cyan-600">NoSQL veritabanı verilerini formatlamak için kullanın</p>
            </div>
          </CardContent>
        </Card>

        {/* Önemli Bilgiler */}
        <Card className="border-2 border-teal-200 hover:border-teal-300 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-teal-700">
              <Info className="h-5 w-5" />
              Önemli Bilgiler
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-2">
              <span className="text-teal-600">⚡</span>
              <p className="text-slate-600 text-sm">JSON anahtarları mutlaka çift tırnak içinde olmalıdır</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-600">📋</span>
              <p className="text-slate-600 text-sm">Son elemandan sonra virgül (trailing comma) JSON&apos;da geçersizdir</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-600">🔢</span>
              <p className="text-slate-600 text-sm">Sayılar tırnak içinde yazılmamalıdır</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-600">✓</span>
              <p className="text-slate-600 text-sm">Boolean değerler küçük harfle yazılmalıdır (true, false)</p>
            </div>
          </CardContent>
        </Card>

        {/* İlginç Bilgiler */}
        <Card className="border-2 border-indigo-200 hover:border-indigo-300 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-indigo-700">
              <Lightbulb className="h-5 w-5" />
              İlginç Bilgiler
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-2">
              <span className="text-indigo-600">🌟</span>
              <p className="text-slate-600 text-sm">JSON, Douglas Crockford tarafından 2001&apos;de popülerleştirildi</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-indigo-600">📈</span>
              <p className="text-slate-600 text-sm">JSON, XML&apos;e göre %30-40 daha az yer kaplar</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-indigo-600">🌐</span>
              <p className="text-slate-600 text-sm">Dünya genelinde API&apos;lerin %90&apos;ından fazlası JSON kullanır</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-indigo-600">💡</span>
              <p className="text-slate-600 text-sm">JSON&apos;ın tam adı &quot;JavaScript Object Notation&quot;dur</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
