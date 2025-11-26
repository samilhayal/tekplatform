"use client"

import { useState, useCallback, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Check, AlertCircle, Download, Upload, Trash2, Table, FileSpreadsheet, Eye, Code, Home, Lightbulb, BookOpen, HelpCircle, Info } from "lucide-react"
import Link from "next/link"

interface CSVData {
  headers: string[]
  rows: string[][]
}

export function CSVBeautifier() {
  const [input, setInput] = useState("")
  const [error, setError] = useState<{ message: string; row?: number } | null>(null)
  const [copied, setCopied] = useState(false)
  const [delimiter, setDelimiter] = useState(",")
  const [viewMode, setViewMode] = useState<"table" | "text">("table")
  const [hasHeader, setHasHeader] = useState(true)

  const parseCSV = useCallback((csvString: string): { data: CSVData | null; error: string | null; errorRow?: number } => {
    if (!csvString.trim()) {
      return { data: null, error: "Lütfen CSV verisi girin" }
    }

    const lines = csvString.trim().split(/\r?\n/)
    if (lines.length === 0) {
      return { data: null, error: "Boş CSV verisi" }
    }

    const parseRow = (line: string): string[] => {
      const result: string[] = []
      let current = ""
      let inQuotes = false

      for (let i = 0; i < line.length; i++) {
        const char = line[i]
        const nextChar = line[i + 1]

        if (inQuotes) {
          if (char === '"' && nextChar === '"') {
            current += '"'
            i++
          } else if (char === '"') {
            inQuotes = false
          } else {
            current += char
          }
        } else {
          if (char === '"') {
            inQuotes = true
          } else if (char === delimiter) {
            result.push(current.trim())
            current = ""
          } else {
            current += char
          }
        }
      }
      result.push(current.trim())
      return result
    }

    try {
      const parsedRows = lines.map((line, index) => {
        try {
          return parseRow(line)
        } catch {
          throw new Error(`Satır ${index + 1} ayrıştırılamadı`)
        }
      })

      // Check for consistent column count
      const columnCounts = parsedRows.map(row => row.length)
      const maxColumns = Math.max(...columnCounts)
      const inconsistentRows = parsedRows
        .map((row, idx) => ({ idx: idx + 1, count: row.length }))
        .filter(r => r.count !== maxColumns)

      if (inconsistentRows.length > 0 && parsedRows.length > 1) {
        // Normalize rows by padding with empty strings
        parsedRows.forEach(row => {
          while (row.length < maxColumns) {
            row.push("")
          }
        })
      }

      const headers = hasHeader ? parsedRows[0] : parsedRows[0].map((_, i) => `Sütun ${i + 1}`)
      const rows = hasHeader ? parsedRows.slice(1) : parsedRows

      return { data: { headers, rows }, error: null }
    } catch (err: any) {
      return { data: null, error: err.message }
    }
  }, [delimiter, hasHeader])

  const parsedData = useMemo(() => {
    if (!input.trim()) return null
    const result = parseCSV(input)
    if (result.error) {
      setError({ message: result.error, row: result.errorRow })
      return null
    }
    setError(null)
    return result.data
  }, [input, parseCSV])

  const formatCSV = useCallback((data: CSVData): string => {
    const escapeCell = (cell: string): string => {
      if (cell.includes(delimiter) || cell.includes('"') || cell.includes('\n')) {
        return `"${cell.replace(/"/g, '""')}"`
      }
      return cell
    }

    const headerLine = data.headers.map(escapeCell).join(delimiter)
    const dataLines = data.rows.map(row => row.map(escapeCell).join(delimiter))
    
    return [headerLine, ...dataLines].join('\n')
  }, [delimiter])

  const getFormattedOutput = useCallback(() => {
    if (!parsedData) return ""
    return formatCSV(parsedData)
  }, [parsedData, formatCSV])

  const copyToClipboard = useCallback(() => {
    const output = getFormattedOutput()
    if (!output) return
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [getFormattedOutput])

  const downloadCSV = useCallback(() => {
    const output = getFormattedOutput()
    if (!output) return
    const blob = new Blob([output], { type: "text/csv;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "formatted.csv"
    a.click()
    URL.revokeObjectURL(url)
  }, [getFormattedOutput])

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      setInput(content)
      setError(null)
    }
    reader.readAsText(file)
    e.target.value = ""
  }, [])

  const clearAll = useCallback(() => {
    setInput("")
    setError(null)
  }, [])

  const sampleCSV = `İsim,Yaş,Şehir,Meslek
Ahmet Yılmaz,30,İstanbul,Yazılımcı
Zeynep Kaya,25,Ankara,Tasarımcı
Mehmet Demir,35,İzmir,Mühendis
Ayşe Çelik,28,Bursa,Öğretmen`

  const loadSample = () => {
    setInput(sampleCSV)
    setError(null)
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
      {/* Ana Sayfa Butonu */}
      <Link href="/">
        <Button variant="ghost" className="gap-2 hover:bg-green-50">
          <Home className="h-4 w-4" />
          Ana Sayfa
        </Button>
      </Link>

      {/* Hero Section */}
      <div className="text-center mb-8">
        <div className="relative inline-block">
          <div className="absolute -inset-4 bg-gradient-to-r from-green-400 via-emerald-500 to-green-400 rounded-full blur-2xl opacity-20 animate-pulse" />
          <div className="relative bg-gradient-to-br from-green-100 to-emerald-100 p-6 rounded-3xl">
            <FileSpreadsheet className="h-16 w-16 text-green-600 mx-auto mb-2" />
            <Table className="h-8 w-8 text-emerald-500 absolute -top-2 -right-2 animate-bounce" />
            <Eye className="h-6 w-6 text-green-500 absolute -bottom-1 -left-1 animate-pulse" />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mt-6 bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 bg-clip-text text-transparent">
          CSV Beautifier
        </h1>
        <p className="text-slate-600 mt-3 max-w-2xl mx-auto">
          CSV verilerinizi görüntüleyin, düzenleyin ve profesyonel formata dönüştürün
        </p>
        <div className="flex flex-wrap gap-2 justify-center mt-4">
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
            📊 Tablo Görünümü
          </span>
          <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
            🔍 Otomatik Algılama
          </span>
          <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium">
            💾 Dışa Aktar
          </span>
        </div>
      </div>

      <Card className="border-2 border-green-100/50 shadow-xl">
        <CardContent className="pt-8 pb-8 px-6 sm:px-8">

          {/* Toolbar */}
          <div className="flex flex-wrap gap-3 mb-6 p-4 bg-slate-50 rounded-xl">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-slate-600">Ayırıcı:</label>
              <select
                value={delimiter}
                onChange={(e) => setDelimiter(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value=",">Virgül (,)</option>
                <option value=";">Noktalı virgül (;)</option>
                <option value="\t">Tab</option>
                <option value="|">Dikey çizgi (|)</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasHeader}
                  onChange={(e) => setHasHeader(e.target.checked)}
                  className="rounded border-slate-300 text-green-600 focus:ring-green-500"
                />
                Başlık satırı var
              </label>
            </div>
            <div className="flex-1" />
            <label className="cursor-pointer">
              <input
                type="file"
                accept=".csv,.txt"
                onChange={handleFileUpload}
                className="hidden"
              />
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                <Upload className="h-4 w-4" />
                Dosya Yükle
              </span>
            </label>
            <Button variant="outline" size="sm" onClick={loadSample} className="gap-2">
              <Table className="h-4 w-4" />
              Örnek CSV
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
                <label className="text-sm font-semibold text-slate-700">CSV Girişi</label>
                <span className="text-xs text-slate-400">{input.length} karakter</span>
              </div>
              <textarea
                value={input}
                onChange={(e) => {
                  setInput(e.target.value)
                  setError(null)
                }}
                className={`w-full min-h-[400px] p-4 font-mono text-sm rounded-xl border-2 resize-y focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                  error ? "border-red-300 bg-red-50/30" : "border-slate-200 bg-white"
                }`}
                placeholder="İsim,Yaş,Şehir
Ahmet,30,İstanbul
Zeynep,25,Ankara"
                spellCheck={false}
              />
              {parsedData && (
                <div className="flex items-center gap-4 text-sm text-slate-600">
                  <span>📊 {parsedData.headers.length} sütun</span>
                  <span>📝 {parsedData.rows.length} satır</span>
                </div>
              )}
            </div>

            {/* Output Panel */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-semibold text-slate-700">Çıktı</label>
                  <div className="flex border border-slate-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode("table")}
                      className={`px-3 py-1 text-xs font-medium transition-colors ${
                        viewMode === "table" ? "bg-green-100 text-green-700" : "bg-white text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <Eye className="h-3 w-3 inline mr-1" />
                      Tablo
                    </button>
                    <button
                      onClick={() => setViewMode("text")}
                      className={`px-3 py-1 text-xs font-medium transition-colors ${
                        viewMode === "text" ? "bg-green-100 text-green-700" : "bg-white text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <Code className="h-3 w-3 inline mr-1" />
                      Metin
                    </button>
                  </div>
                </div>
                <div className="flex gap-2">
                  {parsedData && (
                    <>
                      <Button onClick={downloadCSV} variant="ghost" size="sm" className="gap-2">
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
                      <p className="font-semibold text-red-800 mb-1">Geçersiz CSV</p>
                      <p className="text-sm text-red-600">{error.message}</p>
                      {error.row && (
                        <p className="text-sm text-red-500 mt-2">📍 Hata konumu: Satır {error.row}</p>
                      )}
                    </div>
                  </div>
                </div>
              ) : parsedData ? (
                viewMode === "table" ? (
                  <div className="min-h-[400px] rounded-xl border-2 border-slate-200 bg-white overflow-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-100 sticky top-0">
                        <tr>
                          <th className="px-3 py-2 text-left text-xs font-bold text-slate-500 border-b">#</th>
                          {parsedData.headers.map((header, i) => (
                            <th key={i} className="px-3 py-2 text-left font-semibold text-slate-700 border-b whitespace-nowrap">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {parsedData.rows.map((row, rowIdx) => (
                          <tr key={rowIdx} className="hover:bg-slate-50">
                            <td className="px-3 py-2 text-xs text-slate-400 border-b">{rowIdx + 1}</td>
                            {row.map((cell, cellIdx) => (
                              <td key={cellIdx} className="px-3 py-2 border-b text-slate-600 whitespace-nowrap">
                                {cell || <span className="text-slate-300 italic">boş</span>}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <textarea
                    value={getFormattedOutput()}
                    readOnly
                    className="w-full min-h-[400px] p-4 font-mono text-sm rounded-xl border-2 border-slate-200 bg-slate-50 resize-y"
                  />
                )
              ) : (
                <div className="min-h-[400px] flex items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50">
                  <p className="text-slate-400">CSV verisi girin veya dosya yükleyin</p>
                </div>
              )}
            </div>
          </div>

          {/* Features Info */}
          <div className="mt-8 grid sm:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-xl">
              <h3 className="font-semibold text-green-800 mb-1">📊 Tablo Görünümü</h3>
              <p className="text-sm text-green-600">CSV'yi tablo formatında görüntüle</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-xl">
              <h3 className="font-semibold text-blue-800 mb-1">🔍 Otomatik Algılama</h3>
              <p className="text-sm text-blue-600">Farklı ayırıcıları destekler</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-xl">
              <h3 className="font-semibold text-purple-800 mb-1">💾 Dışa Aktar</h3>
              <p className="text-sm text-purple-600">CSV dosyası olarak indir</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Eğitici Bölümler */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        {/* Nasıl Kullanılır? */}
        <Card className="border-2 border-green-200 hover:border-green-300 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <HelpCircle className="h-5 w-5" />
              Nasıl Kullanılır?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-700 text-sm font-bold shrink-0">1</span>
              <p className="text-slate-600">CSV verinizi yapıştırın veya dosya yükleyin</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-700 text-sm font-bold shrink-0">2</span>
              <p className="text-slate-600">Ayırıcı karakteri seçin (virgül, noktalı virgül, tab)</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-700 text-sm font-bold shrink-0">3</span>
              <p className="text-slate-600">Başlık satırı varsa işaretleyin</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-700 text-sm font-bold shrink-0">4</span>
              <p className="text-slate-600">Tablo veya metin görünümünde inceleyin ve indirin</p>
            </div>
          </CardContent>
        </Card>

        {/* Örnek Kullanımlar */}
        <Card className="border-2 border-emerald-200 hover:border-emerald-300 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald-700">
              <BookOpen className="h-5 w-5" />
              Örnek Kullanımlar
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-emerald-50 rounded-lg">
              <p className="font-medium text-emerald-800">📊 Excel Dışa Aktarma</p>
              <p className="text-sm text-emerald-600">Excel&apos;den kopyalanan verileri düzenleyip görüntüleyin</p>
            </div>
            <div className="p-3 bg-emerald-50 rounded-lg">
              <p className="font-medium text-emerald-800">🗃️ Veritabanı Dışa Aktarma</p>
              <p className="text-sm text-emerald-600">SQL veritabanından export edilen CSV&apos;leri inceleyin</p>
            </div>
            <div className="p-3 bg-emerald-50 rounded-lg">
              <p className="font-medium text-emerald-800">📈 Veri Analizi</p>
              <p className="text-sm text-emerald-600">Ham verileri tablo formatında görüntüleyip analiz edin</p>
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
              <p className="text-slate-600 text-sm">Virgül içeren hücreler çift tırnak içinde olmalıdır</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-600">📋</span>
              <p className="text-slate-600 text-sm">İlk satır genellikle başlık olarak kullanılır</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-600">🔢</span>
              <p className="text-slate-600 text-sm">Tüm satırlar aynı sayıda sütun içermelidir</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-600">✓</span>
              <p className="text-slate-600 text-sm">UTF-8 kodlaması Türkçe karakterleri destekler</p>
            </div>
          </CardContent>
        </Card>

        {/* İlginç Bilgiler */}
        <Card className="border-2 border-cyan-200 hover:border-cyan-300 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-cyan-700">
              <Lightbulb className="h-5 w-5" />
              İlginç Bilgiler
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-2">
              <span className="text-cyan-600">🌟</span>
              <p className="text-slate-600 text-sm">CSV, 1972&apos;den beri kullanılan en eski veri formatlarından biridir</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-cyan-600">📈</span>
              <p className="text-slate-600 text-sm">Excel, Google Sheets ve çoğu veritabanı CSV&apos;yi destekler</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-cyan-600">🌐</span>
              <p className="text-slate-600 text-sm">API veri aktarımlarında JSON&apos;dan sonra en çok CSV kullanılır</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-cyan-600">💡</span>
              <p className="text-slate-600 text-sm">CSV&apos;nin tam adı &quot;Comma-Separated Values&quot;dır</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
