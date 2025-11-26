"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Code, Copy, Check, AlertCircle, Download, Upload, Trash2, Minimize2, Maximize2, FileCode, Home, Lightbulb, BookOpen, HelpCircle, Info, Tags } from "lucide-react"
import Link from "next/link"

export function XMLBeautifier() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState<{ message: string; line?: number } | null>(null)
  const [copied, setCopied] = useState(false)
  const [indentSize, setIndentSize] = useState(2)

  const parseXML = (xmlString: string): { doc: Document | null; error: string | null } => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(xmlString, "application/xml")
    const parseError = doc.querySelector("parsererror")
    if (parseError) {
      return { doc: null, error: parseError.textContent || "XML ayrıştırma hatası" }
    }
    return { doc, error: null }
  }

  const formatXML = (node: Node, level: number = 0): string => {
    const indent = " ".repeat(indentSize * level)
    let result = ""

    if (node.nodeType === Node.DOCUMENT_NODE) {
      const doc = node as Document
      // Add XML declaration
      result += `<?xml version="1.0" encoding="UTF-8"?>\n`
      for (const child of Array.from(doc.childNodes)) {
        result += formatXML(child, 0)
      }
      return result
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element
      const tagName = element.tagName
      const attrs = Array.from(element.attributes)
        .map(attr => `${attr.name}="${attr.value}"`)
        .join(" ")

      const hasChildren = element.childNodes.length > 0
      const hasOnlyText = element.childNodes.length === 1 && element.childNodes[0].nodeType === Node.TEXT_NODE

      if (hasOnlyText) {
        const text = element.textContent?.trim() || ""
        if (attrs) {
          result += `${indent}<${tagName} ${attrs}>${text}</${tagName}>\n`
        } else {
          result += `${indent}<${tagName}>${text}</${tagName}>\n`
        }
      } else if (hasChildren) {
        if (attrs) {
          result += `${indent}<${tagName} ${attrs}>\n`
        } else {
          result += `${indent}<${tagName}>\n`
        }
        for (const child of Array.from(element.childNodes)) {
          if (child.nodeType === Node.TEXT_NODE) {
            const text = child.textContent?.trim()
            if (text) {
              result += `${" ".repeat(indentSize * (level + 1))}${text}\n`
            }
          } else {
            result += formatXML(child, level + 1)
          }
        }
        result += `${indent}</${tagName}>\n`
      } else {
        if (attrs) {
          result += `${indent}<${tagName} ${attrs} />\n`
        } else {
          result += `${indent}<${tagName} />\n`
        }
      }
    } else if (node.nodeType === Node.COMMENT_NODE) {
      result += `${indent}<!--${node.textContent}-->\n`
    } else if (node.nodeType === Node.CDATA_SECTION_NODE) {
      result += `${indent}<![CDATA[${node.textContent}]]>\n`
    }

    return result
  }

  const beautify = useCallback(() => {
    if (!input.trim()) {
      setError({ message: "Lütfen XML verisi girin" })
      setOutput("")
      return
    }
    const { doc, error: parseError } = parseXML(input)
    if (parseError || !doc) {
      setError({ message: parseError || "XML ayrıştırılamadı" })
      setOutput("")
      return
    }
    try {
      const formatted = formatXML(doc)
      setOutput(formatted.trim())
      setError(null)
    } catch (err: any) {
      setError({ message: err.message })
      setOutput("")
    }
  }, [input, indentSize])

  const minifyXML = useCallback(() => {
    if (!input.trim()) {
      setError({ message: "Lütfen XML verisi girin" })
      setOutput("")
      return
    }
    const { doc, error: parseError } = parseXML(input)
    if (parseError || !doc) {
      setError({ message: parseError || "XML ayrıştırılamadı" })
      setOutput("")
      return
    }
    try {
      const serializer = new XMLSerializer()
      const xmlString = serializer.serializeToString(doc)
      const minified = xmlString.replace(/>\s+</g, "><").trim()
      setOutput(minified)
      setError(null)
    } catch (err: any) {
      setError({ message: err.message })
      setOutput("")
    }
  }, [input])

  const validateXML = useCallback(() => {
    if (!input.trim()) {
      setError({ message: "Lütfen XML verisi girin" })
      return
    }
    const { error: parseError } = parseXML(input)
    if (parseError) {
      setError({ message: parseError })
      setOutput("")
    } else {
      setError(null)
      setOutput("✅ XML geçerli!")
    }
  }, [input])

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [output])

  const downloadXML = useCallback(() => {
    if (!output) return
    const blob = new Blob([output], { type: "application/xml" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "formatted.xml"
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

  const sampleXML = `<?xml version="1.0" encoding="UTF-8"?>
<bookstore>
  <book category="programlama">
    <title lang="tr">TypeScript Başlangıç</title>
    <author>Ali Yılmaz</author>
    <year>2024</year>
    <price>49.99</price>
  </book>
  <book category="web">
    <title lang="tr">React ile Modern Web</title>
    <author>Zeynep Kaya</author>
    <year>2024</year>
    <price>59.99</price>
  </book>
</bookstore>`

  const loadSample = () => {
    setInput(sampleXML)
    setError(null)
    setOutput("")
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
      {/* Ana Sayfa Butonu */}
      <Link href="/">
        <Button variant="ghost" className="gap-2 hover:bg-orange-50">
          <Home className="h-4 w-4" />
          Ana Sayfa
        </Button>
      </Link>

      {/* Hero Section */}
      <div className="text-center mb-8">
        <div className="relative inline-block">
          <div className="absolute -inset-4 bg-gradient-to-r from-orange-400 via-red-500 to-orange-400 rounded-full blur-2xl opacity-20 animate-pulse" />
          <div className="relative bg-gradient-to-br from-orange-100 to-red-100 p-6 rounded-3xl">
            <FileCode className="h-16 w-16 text-orange-600 mx-auto mb-2" />
            <Tags className="h-8 w-8 text-red-500 absolute -top-2 -right-2 animate-bounce" />
            <Code className="h-6 w-6 text-orange-500 absolute -bottom-1 -left-1 animate-pulse" />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mt-6 bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 bg-clip-text text-transparent">
          XML Beautifier
        </h1>
        <p className="text-slate-600 mt-3 max-w-2xl mx-auto">
          XML verilerinizi güzelleştirin, doğrulayın ve profesyonel formata dönüştürün
        </p>
        <div className="flex flex-wrap gap-2 justify-center mt-4">
          <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
            🎨 Güzelleştir
          </span>
          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
            ✅ Doğrula
          </span>
          <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
            📦 Küçült
          </span>
        </div>
      </div>

      <Card className="border-2 border-orange-100/50 shadow-xl">
        <CardContent className="pt-8 pb-8 px-6 sm:px-8">
          {/* Toolbar */}
          <div className="flex flex-wrap gap-3 mb-6 p-4 bg-slate-50 rounded-xl">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-slate-600">Girinti:</label>
              <select
                value={indentSize}
                onChange={(e) => setIndentSize(Number(e.target.value))}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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
                accept=".xml"
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
              Örnek XML
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
                <label className="text-sm font-semibold text-slate-700">XML Girişi</label>
                <span className="text-xs text-slate-400">{input.length} karakter</span>
              </div>
              <div className="relative">
                <textarea
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value)
                    setError(null)
                  }}
                  className={`w-full min-h-[400px] p-4 font-mono text-sm rounded-xl border-2 resize-y focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                    error ? "border-red-300 bg-red-50/30" : "border-slate-200 bg-white"
                  }`}
                  placeholder='<root><item>Örnek</item></root>'
                  spellCheck={false}
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <Button onClick={beautify} className="h-12 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700">
                  <Maximize2 className="mr-2 h-4 w-4" />
                  Güzelleştir
                </Button>
                <Button onClick={minifyXML} variant="outline" className="h-12">
                  <Minimize2 className="mr-2 h-4 w-4" />
                  Küçült
                </Button>
                <Button onClick={validateXML} variant="outline" className="h-12">
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
                      <Button onClick={downloadXML} variant="ghost" size="sm" className="gap-2">
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
                      <p className="font-semibold text-red-800 mb-1">Geçersiz XML</p>
                      <p className="text-sm text-red-600 font-mono whitespace-pre-wrap">{error.message}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <textarea
                  value={output}
                  readOnly
                  className="w-full min-h-[400px] p-4 font-mono text-sm rounded-xl border-2 border-slate-200 bg-slate-50 resize-y"
                  placeholder="Formatlanmış XML burada görünecek..."
                />
              )}
            </div>
          </div>

          {/* Features Info */}
          <div className="mt-8 grid sm:grid-cols-3 gap-4">
            <div className="p-4 bg-orange-50 rounded-xl">
              <h3 className="font-semibold text-orange-800 mb-1">🎨 Güzelleştir</h3>
              <p className="text-sm text-orange-600">XML'i okunabilir formata dönüştür</p>
            </div>
            <div className="p-4 bg-green-50 rounded-xl">
              <h3 className="font-semibold text-green-800 mb-1">✅ Doğrula</h3>
              <p className="text-sm text-green-600">XML sözdizimi hatalarını bul</p>
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
        <Card className="border-2 border-orange-200 hover:border-orange-300 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-700">
              <HelpCircle className="h-5 w-5" />
              Nasıl Kullanılır?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 text-orange-700 text-sm font-bold shrink-0">1</span>
              <p className="text-slate-600">XML verinizi sol panele yapıştırın veya dosya yükleyin</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 text-orange-700 text-sm font-bold shrink-0">2</span>
              <p className="text-slate-600">Girinti boyutunu seçin (2, 4 veya 8 boşluk)</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 text-orange-700 text-sm font-bold shrink-0">3</span>
              <p className="text-slate-600">&quot;Güzelleştir&quot;, &quot;Küçült&quot; veya &quot;Doğrula&quot; butonuna tıklayın</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 text-orange-700 text-sm font-bold shrink-0">4</span>
              <p className="text-slate-600">Sonucu kopyalayın veya dosya olarak indirin</p>
            </div>
          </CardContent>
        </Card>

        {/* Örnek Kullanımlar */}
        <Card className="border-2 border-red-200 hover:border-red-300 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-700">
              <BookOpen className="h-5 w-5" />
              Örnek Kullanımlar
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-red-50 rounded-lg">
              <p className="font-medium text-red-800">📄 SOAP Web Servisleri</p>
              <p className="text-sm text-red-600">SOAP API yanıtlarını okunabilir hale getirin</p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <p className="font-medium text-red-800">⚙️ Konfigürasyon Dosyaları</p>
              <p className="text-sm text-red-600">web.xml, pom.xml gibi yapılandırma dosyalarını düzenleyin</p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <p className="font-medium text-red-800">🔄 Veri Dönüşümü</p>
              <p className="text-sm text-red-600">RSS feed, SVG ve diğer XML formatlarını işleyin</p>
            </div>
          </CardContent>
        </Card>

        {/* Önemli Bilgiler */}
        <Card className="border-2 border-amber-200 hover:border-amber-300 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-700">
              <Info className="h-5 w-5" />
              Önemli Bilgiler
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-2">
              <span className="text-amber-600">⚡</span>
              <p className="text-slate-600 text-sm">Her açılan etiket mutlaka kapatılmalıdır</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-amber-600">📋</span>
              <p className="text-slate-600 text-sm">XML büyük/küçük harf duyarlıdır</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-amber-600">🔢</span>
              <p className="text-slate-600 text-sm">Özel karakterler (&lt;, &gt;, &amp;) escape edilmelidir</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-amber-600">✓</span>
              <p className="text-slate-600 text-sm">Attribute değerleri çift veya tek tırnak içinde olmalıdır</p>
            </div>
          </CardContent>
        </Card>

        {/* İlginç Bilgiler */}
        <Card className="border-2 border-rose-200 hover:border-rose-300 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-rose-700">
              <Lightbulb className="h-5 w-5" />
              İlginç Bilgiler
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-2">
              <span className="text-rose-600">🌟</span>
              <p className="text-slate-600 text-sm">XML, 1998&apos;de W3C tarafından standartlaştırıldı</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-rose-600">📈</span>
              <p className="text-slate-600 text-sm">HTML5 ve XHTML, XML&apos;in türevleridir</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-rose-600">🌐</span>
              <p className="text-slate-600 text-sm">Microsoft Office dosyaları (docx, xlsx) aslında sıkıştırılmış XML&apos;dir</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-rose-600">💡</span>
              <p className="text-slate-600 text-sm">XML&apos;in tam adı &quot;Extensible Markup Language&quot;dır</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
