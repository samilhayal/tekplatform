"use client"

import { useState, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Check, AlertCircle, Download, Upload, Trash2, Minimize2, Maximize2, FileCode2, Eye, Code } from "lucide-react"

export function HTMLBeautifier() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState<{ message: string } | null>(null)
  const [copied, setCopied] = useState(false)
  const [indentSize, setIndentSize] = useState(2)
  const [viewMode, setViewMode] = useState<"code" | "preview">("code")

  const formatHTML = useCallback((html: string, indent: number): string => {
    // Simple HTML beautifier
    const tab = " ".repeat(indent)
    let result = ""
    let indentLevel = 0
    
    // Remove extra whitespace but preserve content
    html = html.replace(/>\s+</g, "><").trim()
    
    // Void elements (self-closing)
    const voidElements = new Set([
      "area", "base", "br", "col", "embed", "hr", "img", "input",
      "link", "meta", "param", "source", "track", "wbr"
    ])
    
    // Elements that should not be indented internally
    const inlineElements = new Set([
      "a", "abbr", "b", "bdo", "cite", "code", "dfn", "em", "i",
      "kbd", "label", "q", "s", "samp", "small", "span", "strong",
      "sub", "sup", "time", "u", "var"
    ])
    
    // Preserve content elements
    const preserveContent = new Set(["pre", "code", "textarea", "script", "style"])
    
    let i = 0
    let inPreserve = false
    let preserveTag = ""
    
    while (i < html.length) {
      // Check for tags
      if (html[i] === "<") {
        const tagEnd = html.indexOf(">", i)
        if (tagEnd === -1) break
        
        const fullTag = html.substring(i, tagEnd + 1)
        const tagMatch = fullTag.match(/<\/?([a-zA-Z][a-zA-Z0-9]*)/i)
        const tagName = tagMatch ? tagMatch[1].toLowerCase() : ""
        const isClosing = fullTag.startsWith("</")
        const isSelfClosing = fullTag.endsWith("/>") || voidElements.has(tagName)
        const isComment = fullTag.startsWith("<!--")
        const isDoctype = fullTag.startsWith("<!DOCTYPE") || fullTag.startsWith("<!doctype")
        
        // Handle preserve content tags
        if (preserveContent.has(tagName)) {
          if (isClosing) {
            inPreserve = false
            preserveTag = ""
          } else if (!isSelfClosing) {
            inPreserve = true
            preserveTag = tagName
          }
        }
        
        if (inPreserve && isClosing && tagName === preserveTag) {
          result += fullTag
          inPreserve = false
          preserveTag = ""
        } else if (inPreserve) {
          result += fullTag
        } else if (isComment || isDoctype) {
          result += "\n" + tab.repeat(indentLevel) + fullTag
        } else if (isClosing) {
          indentLevel = Math.max(0, indentLevel - 1)
          if (!inlineElements.has(tagName)) {
            result += "\n" + tab.repeat(indentLevel)
          }
          result += fullTag
        } else {
          if (!inlineElements.has(tagName) && result.length > 0) {
            result += "\n" + tab.repeat(indentLevel)
          } else if (result.length === 0) {
            // First tag, no newline
          }
          result += fullTag
          if (!isSelfClosing && !inlineElements.has(tagName)) {
            indentLevel++
          }
        }
        
        i = tagEnd + 1
      } else {
        // Text content
        let textEnd = html.indexOf("<", i)
        if (textEnd === -1) textEnd = html.length
        
        const text = html.substring(i, textEnd).trim()
        if (text) {
          if (inPreserve) {
            result += html.substring(i, textEnd)
          } else {
            result += text
          }
        }
        i = textEnd
      }
    }
    
    return result.trim()
  }, [])

  const beautify = useCallback(() => {
    if (!input.trim()) {
      setError({ message: "Lütfen HTML verisi girin" })
      setOutput("")
      return
    }
    try {
      const formatted = formatHTML(input, indentSize)
      setOutput(formatted)
      setError(null)
    } catch (err: any) {
      setError({ message: err.message || "HTML formatlanamadı" })
      setOutput("")
    }
  }, [input, indentSize, formatHTML])

  const minifyHTML = useCallback(() => {
    if (!input.trim()) {
      setError({ message: "Lütfen HTML verisi girin" })
      setOutput("")
      return
    }
    try {
      // Remove comments, extra whitespace
      let minified = input
        .replace(/<!--[\s\S]*?-->/g, "") // Remove comments
        .replace(/>\s+</g, "><") // Remove whitespace between tags
        .replace(/\s+/g, " ") // Collapse whitespace
        .trim()
      setOutput(minified)
      setError(null)
    } catch (err: any) {
      setError({ message: err.message })
      setOutput("")
    }
  }, [input])

  const validateHTML = useCallback(() => {
    if (!input.trim()) {
      setError({ message: "Lütfen HTML verisi girin" })
      return
    }
    
    const errors: string[] = []
    
    // Check for unclosed tags
    const openTags: string[] = []
    const voidElements = new Set([
      "area", "base", "br", "col", "embed", "hr", "img", "input",
      "link", "meta", "param", "source", "track", "wbr"
    ])
    
    const tagRegex = /<\/?([a-zA-Z][a-zA-Z0-9]*)[^>]*\/?>/gi
    let match
    
    while ((match = tagRegex.exec(input)) !== null) {
      const fullTag = match[0]
      const tagName = match[1].toLowerCase()
      const isClosing = fullTag.startsWith("</")
      const isSelfClosing = fullTag.endsWith("/>") || voidElements.has(tagName)
      
      if (isClosing) {
        const lastOpen = openTags.pop()
        if (lastOpen !== tagName) {
          if (lastOpen) {
            errors.push(`Eşleşmeyen etiket: <${lastOpen}> kapatılmamış, </${tagName}> bulundu`)
          } else {
            errors.push(`Fazla kapanış etiketi: </${tagName}>`)
          }
        }
      } else if (!isSelfClosing) {
        openTags.push(tagName)
      }
    }
    
    if (openTags.length > 0) {
      errors.push(`Kapatılmamış etiketler: ${openTags.map(t => `<${t}>`).join(", ")}`)
    }
    
    if (errors.length > 0) {
      setError({ message: errors.join("\n") })
      setOutput("")
    } else {
      setError(null)
      setOutput("✅ HTML geçerli! Tüm etiketler doğru şekilde kapatılmış.")
    }
  }, [input])

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [output])

  const downloadHTML = useCallback(() => {
    if (!output) return
    const blob = new Blob([output], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "formatted.html"
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

  const sampleHTML = `<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Örnek Sayfa</title>
</head>
<body>
<header>
<nav>
<ul>
<li><a href="#">Ana Sayfa</a></li>
<li><a href="#">Hakkında</a></li>
<li><a href="#">İletişim</a></li>
</ul>
</nav>
</header>
<main>
<article>
<h1>Merhaba Dünya</h1>
<p>Bu bir <strong>örnek</strong> paragraftır.</p>
</article>
</main>
<footer>
<p>&copy; 2024 Örnek Site</p>
</footer>
</body>
</html>`

  const loadSample = () => {
    setInput(sampleHTML)
    setError(null)
    setOutput("")
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <Card className="border-2 border-pink-100/50 shadow-xl">
        <CardContent className="pt-8 pb-8 px-6 sm:px-8">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 shadow-lg mb-4">
              <FileCode2 className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-2">
              HTML Beautifier
            </h2>
            <p className="text-slate-600">HTML verilerinizi düzenleyin, doğrulayın ve güzelleştirin</p>
          </div>

          {/* Toolbar */}
          <div className="flex flex-wrap gap-3 mb-6 p-4 bg-slate-50 rounded-xl">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-slate-600">Girinti:</label>
              <select
                value={indentSize}
                onChange={(e) => setIndentSize(Number(e.target.value))}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
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
                accept=".html,.htm"
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
              Örnek HTML
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
                <label className="text-sm font-semibold text-slate-700">HTML Girişi</label>
                <span className="text-xs text-slate-400">{input.length} karakter</span>
              </div>
              <textarea
                value={input}
                onChange={(e) => {
                  setInput(e.target.value)
                  setError(null)
                }}
                className={`w-full min-h-[400px] p-4 font-mono text-sm rounded-xl border-2 resize-y focus:ring-2 focus:ring-pink-500 focus:border-pink-500 ${
                  error ? "border-red-300 bg-red-50/30" : "border-slate-200 bg-white"
                }`}
                placeholder="<div><p>Örnek HTML</p></div>"
                spellCheck={false}
              />
              <div className="grid grid-cols-3 gap-3">
                <Button onClick={beautify} className="h-12 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700">
                  <Maximize2 className="mr-2 h-4 w-4" />
                  Güzelleştir
                </Button>
                <Button onClick={minifyHTML} variant="outline" className="h-12">
                  <Minimize2 className="mr-2 h-4 w-4" />
                  Küçült
                </Button>
                <Button onClick={validateHTML} variant="outline" className="h-12">
                  <Check className="mr-2 h-4 w-4" />
                  Doğrula
                </Button>
              </div>
            </div>

            {/* Output Panel */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-semibold text-slate-700">Çıktı</label>
                  <div className="flex border border-slate-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode("code")}
                      className={`px-3 py-1 text-xs font-medium transition-colors ${
                        viewMode === "code" ? "bg-pink-100 text-pink-700" : "bg-white text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <Code className="h-3 w-3 inline mr-1" />
                      Kod
                    </button>
                    <button
                      onClick={() => setViewMode("preview")}
                      className={`px-3 py-1 text-xs font-medium transition-colors ${
                        viewMode === "preview" ? "bg-pink-100 text-pink-700" : "bg-white text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <Eye className="h-3 w-3 inline mr-1" />
                      Önizleme
                    </button>
                  </div>
                </div>
                <div className="flex gap-2">
                  {output && !error && (
                    <>
                      <Button onClick={downloadHTML} variant="ghost" size="sm" className="gap-2">
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
                      <p className="font-semibold text-red-800 mb-1">HTML Hatası</p>
                      <p className="text-sm text-red-600 font-mono whitespace-pre-wrap">{error.message}</p>
                    </div>
                  </div>
                </div>
              ) : viewMode === "code" ? (
                <textarea
                  value={output}
                  readOnly
                  className="w-full min-h-[400px] p-4 font-mono text-sm rounded-xl border-2 border-slate-200 bg-slate-50 resize-y"
                  placeholder="Formatlanmış HTML burada görünecek..."
                />
              ) : (
                <div className="min-h-[400px] p-4 rounded-xl border-2 border-slate-200 bg-white overflow-auto">
                  <iframe
                    srcDoc={output || "<p style='color:#999;text-align:center;padding:20px;'>Önizleme için HTML güzelleştirin</p>"}
                    className="w-full h-[380px] border-0"
                    title="HTML Preview"
                    sandbox="allow-same-origin"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Features Info */}
          <div className="mt-8 grid sm:grid-cols-3 gap-4">
            <div className="p-4 bg-pink-50 rounded-xl">
              <h3 className="font-semibold text-pink-800 mb-1">🎨 Güzelleştir</h3>
              <p className="text-sm text-pink-600">HTML'i okunabilir formata dönüştür</p>
            </div>
            <div className="p-4 bg-green-50 rounded-xl">
              <h3 className="font-semibold text-green-800 mb-1">✅ Doğrula</h3>
              <p className="text-sm text-green-600">Etiket hatalarını bul</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-xl">
              <h3 className="font-semibold text-purple-800 mb-1">👁️ Önizle</h3>
              <p className="text-sm text-purple-600">Canlı HTML önizlemesi</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
