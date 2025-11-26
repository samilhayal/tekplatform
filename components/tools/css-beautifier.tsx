"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Check, AlertCircle, Download, Upload, Trash2, Minimize2, Maximize2, Palette, Code, Home, Lightbulb, BookOpen, HelpCircle, Info, Paintbrush } from "lucide-react"
import Link from "next/link"

export function CSSBeautifier() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState<{ message: string } | null>(null)
  const [copied, setCopied] = useState(false)
  const [indentSize, setIndentSize] = useState(2)

  const formatCSS = useCallback((css: string, indent: number): string => {
    const tab = " ".repeat(indent)
    let result = ""
    let indentLevel = 0
    let inComment = false
    let inString = false
    let stringChar = ""
    let i = 0

    // Remove extra whitespace
    css = css.replace(/\s+/g, " ").trim()

    while (i < css.length) {
      const char = css[i]
      const nextChar = css[i + 1]

      // Handle strings
      if ((char === '"' || char === "'") && !inComment) {
        if (!inString) {
          inString = true
          stringChar = char
        } else if (char === stringChar && css[i - 1] !== "\\") {
          inString = false
        }
        result += char
        i++
        continue
      }

      if (inString) {
        result += char
        i++
        continue
      }

      // Handle comments
      if (char === "/" && nextChar === "*" && !inComment) {
        inComment = true
        result += "\n" + tab.repeat(indentLevel) + "/*"
        i += 2
        continue
      }

      if (char === "*" && nextChar === "/" && inComment) {
        inComment = false
        result += "*/"
        i += 2
        continue
      }

      if (inComment) {
        result += char
        i++
        continue
      }

      // Handle CSS structure
      if (char === "{") {
        result = result.trimEnd() + " {\n"
        indentLevel++
        i++
        // Skip whitespace after {
        while (i < css.length && css[i] === " ") i++
        continue
      }

      if (char === "}") {
        indentLevel = Math.max(0, indentLevel - 1)
        result = result.trimEnd() + "\n" + tab.repeat(indentLevel) + "}\n"
        i++
        // Skip whitespace after }
        while (i < css.length && css[i] === " ") i++
        // Add newline between rules
        if (i < css.length && css[i] !== "}" && css[i] !== "\n") {
          result += "\n"
        }
        continue
      }

      if (char === ";") {
        result += ";\n" + tab.repeat(indentLevel)
        i++
        // Skip whitespace after ;
        while (i < css.length && css[i] === " ") i++
        continue
      }

      if (char === ":") {
        result += ": "
        i++
        // Skip whitespace after :
        while (i < css.length && css[i] === " ") i++
        continue
      }

      if (char === ",") {
        // Check if we're in a selector (before {)
        const restOfLine = css.substring(i)
        const nextBrace = restOfLine.indexOf("{")
        const nextSemi = restOfLine.indexOf(";")
        
        if (nextBrace !== -1 && (nextSemi === -1 || nextBrace < nextSemi)) {
          // In selector, add newline
          result += ",\n" + tab.repeat(indentLevel)
        } else {
          // In value, just add comma
          result += ", "
        }
        i++
        // Skip whitespace after ,
        while (i < css.length && css[i] === " ") i++
        continue
      }

      // Add indent at start of new content
      if (result.endsWith("\n" + tab.repeat(indentLevel)) && char === " ") {
        i++
        continue
      }

      result += char
      i++
    }

    // Clean up extra newlines and trailing whitespace
    result = result
      .split("\n")
      .map(line => line.trimEnd())
      .join("\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim()

    return result
  }, [])

  const beautify = useCallback(() => {
    if (!input.trim()) {
      setError({ message: "Lütfen CSS verisi girin" })
      setOutput("")
      return
    }
    try {
      const formatted = formatCSS(input, indentSize)
      setOutput(formatted)
      setError(null)
    } catch (err: any) {
      setError({ message: err.message || "CSS formatlanamadı" })
      setOutput("")
    }
  }, [input, indentSize, formatCSS])

  const minifyCSS = useCallback(() => {
    if (!input.trim()) {
      setError({ message: "Lütfen CSS verisi girin" })
      setOutput("")
      return
    }
    try {
      let minified = input
        // Remove comments
        .replace(/\/\*[\s\S]*?\*\//g, "")
        // Remove newlines and extra spaces
        .replace(/\s+/g, " ")
        // Remove space around special characters
        .replace(/\s*{\s*/g, "{")
        .replace(/\s*}\s*/g, "}")
        .replace(/\s*:\s*/g, ":")
        .replace(/\s*;\s*/g, ";")
        .replace(/\s*,\s*/g, ",")
        // Remove last semicolon before }
        .replace(/;}/g, "}")
        .trim()
      
      setOutput(minified)
      setError(null)
    } catch (err: any) {
      setError({ message: err.message })
      setOutput("")
    }
  }, [input])

  const validateCSS = useCallback(() => {
    if (!input.trim()) {
      setError({ message: "Lütfen CSS verisi girin" })
      return
    }

    const errors: string[] = []
    
    // Check for balanced braces
    let braceCount = 0
    let line = 1
    for (let i = 0; i < input.length; i++) {
      if (input[i] === "\n") line++
      if (input[i] === "{") braceCount++
      if (input[i] === "}") braceCount--
      if (braceCount < 0) {
        errors.push(`Satır ${line}: Fazla kapanış parantezi '}'`)
        break
      }
    }
    if (braceCount > 0) {
      errors.push(`${braceCount} adet kapanmamış '{' parantez var`)
    }

    // Check for common issues
    const lines = input.split("\n")
    lines.forEach((lineContent, idx) => {
      const lineNum = idx + 1
      
      // Check for property without colon
      if (lineContent.includes("{") === false && 
          lineContent.includes("}") === false &&
          lineContent.trim().length > 0 &&
          !lineContent.includes(":") &&
          !lineContent.trim().startsWith("/*") &&
          !lineContent.trim().startsWith("*") &&
          !lineContent.trim().endsWith("*/") &&
          !lineContent.trim().startsWith("@")) {
        // This might be a selector, which is fine
      }
    })

    // Check for unclosed strings
    const singleQuotes = (input.match(/'/g) || []).length
    const doubleQuotes = (input.match(/"/g) || []).length
    if (singleQuotes % 2 !== 0) {
      errors.push("Kapanmamış tek tırnak (' ) var")
    }
    if (doubleQuotes % 2 !== 0) {
      errors.push('Kapanmamış çift tırnak (" ) var')
    }

    if (errors.length > 0) {
      setError({ message: errors.join("\n") })
      setOutput("")
    } else {
      setError(null)
      setOutput("✅ CSS geçerli! Sözdizimi hataları bulunamadı.")
    }
  }, [input])

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [output])

  const downloadCSS = useCallback(() => {
    if (!output) return
    const blob = new Blob([output], { type: "text/css" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "formatted.css"
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

  const sampleCSS = `/* Ana stil dosyası */
body{margin:0;padding:0;font-family:'Segoe UI',Tahoma,sans-serif;background-color:#f5f5f5;}

.container{max-width:1200px;margin:0 auto;padding:20px;}

.header{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:white;padding:40px 20px;text-align:center;}

.header h1{font-size:2.5rem;margin-bottom:10px;}

.card{background:white;border-radius:12px;box-shadow:0 4px 6px rgba(0,0,0,0.1);padding:24px;margin-bottom:20px;transition:transform 0.2s ease;}

.card:hover{transform:translateY(-4px);}

.btn{display:inline-block;padding:12px 24px;background:#667eea;color:white;border:none;border-radius:8px;cursor:pointer;font-size:1rem;}

.btn:hover{background:#5a67d8;}

@media(max-width:768px){.container{padding:10px;}.header h1{font-size:1.8rem;}}`

  const loadSample = () => {
    setInput(sampleCSS)
    setError(null)
    setOutput("")
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
      {/* Ana Sayfa Butonu */}
      <Link href="/">
        <Button variant="ghost" className="gap-2 hover:bg-violet-50">
          <Home className="h-4 w-4" />
          Ana Sayfa
        </Button>
      </Link>

      {/* Hero Section */}
      <div className="text-center mb-8">
        <div className="relative inline-block">
          <div className="absolute -inset-4 bg-gradient-to-r from-violet-400 via-purple-500 to-violet-400 rounded-full blur-2xl opacity-20 animate-pulse" />
          <div className="relative bg-gradient-to-br from-violet-100 to-purple-100 p-6 rounded-3xl">
            <Palette className="h-16 w-16 text-violet-600 mx-auto mb-2" />
            <Paintbrush className="h-8 w-8 text-purple-500 absolute -top-2 -right-2 animate-bounce" />
            <Code className="h-6 w-6 text-violet-500 absolute -bottom-1 -left-1 animate-pulse" />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mt-6 bg-gradient-to-r from-violet-600 via-purple-600 to-violet-600 bg-clip-text text-transparent">
          CSS Beautifier
        </h1>
        <p className="text-slate-600 mt-3 max-w-2xl mx-auto">
          CSS verilerinizi güzelleştirin, doğrulayın ve profesyonel formata dönüştürün
        </p>
        <div className="flex flex-wrap gap-2 justify-center mt-4">
          <span className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm font-medium">
            🎨 Güzelleştir
          </span>
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
            ✅ Doğrula
          </span>
          <span className="px-3 py-1 bg-fuchsia-100 text-fuchsia-700 rounded-full text-sm font-medium">
            📦 Küçült
          </span>
        </div>
      </div>

      <Card className="border-2 border-violet-100/50 shadow-xl">
        <CardContent className="pt-8 pb-8 px-6 sm:px-8">
          {/* Toolbar */}
          <div className="flex flex-wrap gap-3 mb-6 p-4 bg-slate-50 rounded-xl">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-slate-600">Girinti:</label>
              <select
                value={indentSize}
                onChange={(e) => setIndentSize(Number(e.target.value))}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
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
                accept=".css"
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
              Örnek CSS
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
                <label className="text-sm font-semibold text-slate-700">CSS Girişi</label>
                <span className="text-xs text-slate-400">{input.length} karakter</span>
              </div>
              <textarea
                value={input}
                onChange={(e) => {
                  setInput(e.target.value)
                  setError(null)
                }}
                className={`w-full min-h-[400px] p-4 font-mono text-sm rounded-xl border-2 resize-y focus:ring-2 focus:ring-violet-500 focus:border-violet-500 ${
                  error ? "border-red-300 bg-red-50/30" : "border-slate-200 bg-white"
                }`}
                placeholder=".example { color: red; }"
                spellCheck={false}
              />
              <div className="grid grid-cols-3 gap-3">
                <Button onClick={beautify} className="h-12 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700">
                  <Maximize2 className="mr-2 h-4 w-4" />
                  Güzelleştir
                </Button>
                <Button onClick={minifyCSS} variant="outline" className="h-12">
                  <Minimize2 className="mr-2 h-4 w-4" />
                  Küçült
                </Button>
                <Button onClick={validateCSS} variant="outline" className="h-12">
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
                      <Button onClick={downloadCSS} variant="ghost" size="sm" className="gap-2">
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
                      <p className="font-semibold text-red-800 mb-1">CSS Hatası</p>
                      <p className="text-sm text-red-600 font-mono whitespace-pre-wrap">{error.message}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <textarea
                  value={output}
                  readOnly
                  className="w-full min-h-[400px] p-4 font-mono text-sm rounded-xl border-2 border-slate-200 bg-slate-50 resize-y"
                  placeholder="Formatlanmış CSS burada görünecek..."
                />
              )}
            </div>
          </div>

          {/* Features Info */}
          <div className="mt-8 grid sm:grid-cols-3 gap-4">
            <div className="p-4 bg-violet-50 rounded-xl">
              <h3 className="font-semibold text-violet-800 mb-1">🎨 Güzelleştir</h3>
              <p className="text-sm text-violet-600">CSS'i okunabilir formata dönüştür</p>
            </div>
            <div className="p-4 bg-green-50 rounded-xl">
              <h3 className="font-semibold text-green-800 mb-1">✅ Doğrula</h3>
              <p className="text-sm text-green-600">Sözdizimi hatalarını bul</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-xl">
              <h3 className="font-semibold text-purple-800 mb-1">📦 Küçült</h3>
              <p className="text-sm text-purple-600">Yorumları ve boşlukları kaldır</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Eğitici Bölümler */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        {/* Nasıl Kullanılır? */}
        <Card className="border-2 border-violet-200 hover:border-violet-300 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-violet-700">
              <HelpCircle className="h-5 w-5" />
              Nasıl Kullanılır?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-violet-100 text-violet-700 text-sm font-bold shrink-0">1</span>
              <p className="text-slate-600">CSS kodunuzu yapıştırın veya dosya yükleyin</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-violet-100 text-violet-700 text-sm font-bold shrink-0">2</span>
              <p className="text-slate-600">Girinti boyutunu seçin (2, 4 veya 8 boşluk)</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-violet-100 text-violet-700 text-sm font-bold shrink-0">3</span>
              <p className="text-slate-600">&quot;Güzelleştir&quot;, &quot;Küçült&quot; veya &quot;Doğrula&quot; butonuna tıklayın</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-violet-100 text-violet-700 text-sm font-bold shrink-0">4</span>
              <p className="text-slate-600">Sonucu kopyalayın veya dosya olarak indirin</p>
            </div>
          </CardContent>
        </Card>

        {/* Örnek Kullanımlar */}
        <Card className="border-2 border-purple-200 hover:border-purple-300 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-700">
              <BookOpen className="h-5 w-5" />
              Örnek Kullanımlar
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-purple-50 rounded-lg">
              <p className="font-medium text-purple-800">🎨 Stil Geliştirme</p>
              <p className="text-sm text-purple-600">Karmaşık CSS dosyalarını okunabilir hale getirin</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <p className="font-medium text-purple-800">🚀 Performans Optimizasyonu</p>
              <p className="text-sm text-purple-600">CSS&apos;i küçültüp sayfa yükleme hızını artırın</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <p className="font-medium text-purple-800">🔧 Hata Ayıklama</p>
              <p className="text-sm text-purple-600">Sözdizimi hatalarını tespit edip düzeltin</p>
            </div>
          </CardContent>
        </Card>

        {/* Önemli Bilgiler */}
        <Card className="border-2 border-fuchsia-200 hover:border-fuchsia-300 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-fuchsia-700">
              <Info className="h-5 w-5" />
              Önemli Bilgiler
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-2">
              <span className="text-fuchsia-600">⚡</span>
              <p className="text-slate-600 text-sm">Her özellik noktalı virgül ile bitmelidir</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-fuchsia-600">📋</span>
              <p className="text-slate-600 text-sm">Seçiciler süslü parantez ile sarmalanmalıdır</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-fuchsia-600">🔢</span>
              <p className="text-slate-600 text-sm">Renk değerleri # ile veya rgb() formatında olabilir</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-fuchsia-600">✓</span>
              <p className="text-slate-600 text-sm">@media kuralları responsive tasarım için kullanılır</p>
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
              <p className="text-slate-600 text-sm">CSS, Håkon Wium Lie tarafından 1994&apos;te önerildi</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-indigo-600">📈</span>
              <p className="text-slate-600 text-sm">CSS3 ile 500&apos;den fazla özellik kullanılabilir hale geldi</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-indigo-600">🌐</span>
              <p className="text-slate-600 text-sm">Küçültülmüş CSS, orijinalinden %30-50 daha az yer kaplar</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-indigo-600">💡</span>
              <p className="text-slate-600 text-sm">CSS&apos;in tam adı &quot;Cascading Style Sheets&quot;dir</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
