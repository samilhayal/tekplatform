"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Binary, Home, BookOpen, Lightbulb, AlertCircle, Info, RefreshCw } from "lucide-react"
import Link from "next/link"

const BaseConverter = () => {
  const [input, setInput] = useState("")
  const [fromBase, setFromBase] = useState("10")
  const [toBase, setToBase] = useState("2")
  const [result, setResult] = useState<any>(null)

  const bases = [
    { value: "2", label: "Binary (2)", prefix: "0b" },
    { value: "8", label: "Octal (8)", prefix: "0o" },
    { value: "10", label: "Decimal (10)", prefix: "" },
    { value: "16", label: "Hexadecimal (16)", prefix: "0x" },
  ]

  const convert = () => {
    try {
      if (!input.trim()) return
      
      const decimal = parseInt(input, parseInt(fromBase))
      if (isNaN(decimal)) {
        alert("Geçersiz giriş! Seçilen tabana uygun bir sayı girin.")
        return
      }

      const converted = decimal.toString(parseInt(toBase)).toUpperCase()
      
      // Tüm tabanlara dönüştür
      const allBases = {
        binary: decimal.toString(2),
        octal: decimal.toString(8),
        decimal: decimal.toString(10),
        hexadecimal: decimal.toString(16).toUpperCase()
      }

      // Binary gösterimi için bit analizi
      const binaryStr = decimal.toString(2)
      const bits = binaryStr.split('').map((bit, i) => ({
        bit,
        position: binaryStr.length - 1 - i,
        value: parseInt(bit) * Math.pow(2, binaryStr.length - 1 - i)
      }))

      setResult({
        input,
        fromBase: parseInt(fromBase),
        toBase: parseInt(toBase),
        decimal,
        converted,
        allBases,
        bits
      })
    } catch (e) {
      alert("Dönüştürme hatası!")
    }
  }

  const quickConversions = [
    { label: "255 → Binary", input: "255", from: "10", to: "2" },
    { label: "FF → Decimal", input: "FF", from: "16", to: "10" },
    { label: "1010 → Hex", input: "1010", from: "2", to: "16" },
    { label: "77 → Decimal", input: "77", from: "8", to: "10" }
  ]

  const getBaseLabel = (base: string) => bases.find(b => b.value === base)?.label || ""

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      <Link href="/" className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 font-medium transition-colors group">
        <Home className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
        <span>Ana Sayfaya Dön</span>
      </Link>

      <Card className="border-2 border-sky-100/50 shadow-xl">
        <CardContent className="pt-8 pb-8 px-6 sm:px-8">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 shadow-lg mb-4">
              <Binary className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent mb-2">
              Gelişmiş Taban Dönüştürücü
            </h2>
            <p className="text-slate-600">Sayı sistemleri arası dönüşüm ve görselleştirme</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block">Sayı</label>
              <Input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value.toUpperCase())}
                className="h-14 font-mono text-lg"
                placeholder="FF"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block">Kaynak Taban</label>
              <Select value={fromBase} onValueChange={setFromBase}>
                <SelectTrigger className="h-14">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {bases.map(base => (
                    <SelectItem key={base.value} value={base.value}>{base.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block">Hedef Taban</label>
              <Select value={toBase} onValueChange={setToBase}>
                <SelectTrigger className="h-14">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {bases.map(base => (
                    <SelectItem key={base.value} value={base.value}>{base.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-sm font-semibold text-slate-700 mb-3">Hızlı Dönüşümler</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {quickConversions.map((conv, i) => (
                <Button
                  key={i}
                  variant="outline"
                  onClick={() => {
                    setInput(conv.input)
                    setFromBase(conv.from)
                    setToBase(conv.to)
                  }}
                  className="h-12 border-2 border-sky-200 hover:bg-sky-50"
                >
                  {conv.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 mb-8">
            <Button onClick={convert} className="flex-1 h-14 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700">
              <Binary className="mr-2" /> Dönüştür
            </Button>
            <Button
              onClick={() => {
                const temp = fromBase
                setFromBase(toBase)
                setToBase(temp)
              }}
              variant="outline"
              className="h-14 border-2 border-sky-200 hover:bg-sky-50"
            >
              <RefreshCw className="h-5 w-5" />
            </Button>
          </div>

          {result && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Ana Sonuç */}
              <Card className="border-2 border-sky-100/50">
                <CardContent className="pt-6 pb-6">
                  <div className="text-center mb-6">
                    <p className="text-sm text-slate-600 mb-3">
                      {result.input} ({getBaseLabel(result.fromBase.toString())}) →
                    </p>
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-sky-50 to-blue-50 border-2 border-sky-200">
                      <p className="text-5xl font-bold text-sky-600 font-mono">{result.converted}</p>
                      <p className="text-sm text-slate-500 mt-2">({getBaseLabel(result.toBase.toString())})</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tüm Tabanlar Tablosu */}
              <Card className="border-2 border-blue-100/50">
                <CardContent className="pt-6 pb-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">Tüm Taban Sistemlerinde</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-5 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-slate-700">Binary (Tabanı 2)</span>
                        <span className="text-xs text-slate-500">0b</span>
                      </div>
                      <p className="text-2xl font-bold text-green-600 font-mono break-all">{result.allBases.binary}</p>
                    </div>
                    <div className="p-5 rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-slate-700">Octal (Tabanı 8)</span>
                        <span className="text-xs text-slate-500">0o</span>
                      </div>
                      <p className="text-2xl font-bold text-orange-600 font-mono">{result.allBases.octal}</p>
                    </div>
                    <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-slate-700">Decimal (Tabanı 10)</span>
                        <span className="text-xs text-slate-500">-</span>
                      </div>
                      <p className="text-2xl font-bold text-blue-600 font-mono">{result.allBases.decimal}</p>
                    </div>
                    <div className="p-5 rounded-xl bg-gradient-to-br from-purple-50 to-fuchsia-50 border border-purple-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-slate-700">Hexadecimal (Tabanı 16)</span>
                        <span className="text-xs text-slate-500">0x</span>
                      </div>
                      <p className="text-2xl font-bold text-purple-600 font-mono">{result.allBases.hexadecimal}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Binary Bit Analizi */}
              {result.bits && (
                <Card className="border-2 border-green-100/50">
                  <CardContent className="pt-6 pb-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Binary Bit Analizi</h3>
                    <div className="space-y-4">
                      {/* Bit visualization */}
                      <div className="flex gap-1 overflow-x-auto pb-2">
                        {result.bits.map((bit: any, i: number) => (
                          <div
                            key={i}
                            className={`flex-shrink-0 p-3 rounded-lg border-2 text-center min-w-[60px] ${
                              bit.bit === "1"
                                ? "bg-green-100 border-green-300"
                                : "bg-slate-100 border-slate-300"
                            }`}
                          >
                            <p className={`text-2xl font-bold ${bit.bit === "1" ? "text-green-600" : "text-slate-400"}`}>
                              {bit.bit}
                            </p>
                            <p className="text-xs text-slate-600 mt-1">2^{bit.position}</p>
                          </div>
                        ))}
                      </div>

                      {/* Bit breakdown table */}
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-slate-700 mb-2">Hesaplama Detayı:</p>
                        {result.bits.filter((b: any) => b.bit === "1").map((bit: any, i: number) => (
                          <div key={i} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                            <span className="text-sm text-slate-700">
                              <strong className="text-green-600">1</strong> × 2<sup>{bit.position}</sup>
                            </span>
                            <span className="font-bold text-green-600">= {bit.value}</span>
                          </div>
                        ))}
                        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg border-2 border-green-300">
                          <span className="text-sm font-bold text-slate-800">TOPLAM (Decimal)</span>
                          <span className="text-2xl font-bold text-green-600">= {result.decimal}</span>
                        </div>
                      </div>

                      {/* Quick formula */}
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-sm text-slate-700">
                          <strong>Formül:</strong> {result.allBases.binary} (binary) = {
                            result.bits
                              .filter((b: any) => b.bit === "1")
                              .map((b: any) => `2^${b.position}`)
                              .join(" + ")
                          } = <strong className="text-blue-600">{result.decimal}</strong>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Nasıl Kullanılır */}
      <Card className="border-2 border-sky-100/30 shadow-lg">
        <CardContent className="pt-6 pb-6 px-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-sky-50"><BookOpen className="h-6 w-6 text-sky-600" /></div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Nasıl Kullanılır?</h3>
              <ol className="space-y-3 text-slate-600">
                <li className="flex gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center text-sm font-semibold">1</span><span>Dönüştürmek istediğiniz sayıyı girin.</span></li>
                <li className="flex gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center text-sm font-semibold">2</span><span>Kaynak taban sistemini seçin (2, 8, 10, 16).</span></li>
                <li className="flex gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center text-sm font-semibold">3</span><span>Hedef taban sistemini seçin.</span></li>
                <li className="flex gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center text-sm font-semibold">4</span><span>Tüm tabanlardaki karşılıkları ve bit analizini görün.</span></li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Örnekler */}
      <Card className="border-2 border-sky-100/30 shadow-lg">
        <CardContent className="pt-6 pb-6 px-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-xl bg-sky-50"><Lightbulb className="h-6 w-6 text-sky-600" /></div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-800 mb-2">Örnek Kullanımlar</h3>
              <p className="text-slate-600">Farklı sayı sistemlerinin kullanım alanları</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-200">
              <h4 className="font-bold text-slate-800 mb-2">💻 Bilgisayar Belleği</h4>
              <p className="text-sm text-slate-600 mb-2">Binary: 11111111 = Decimal: 255</p>
              <p className="text-xs text-slate-500">8-bit maksimum değer</p>
            </div>
            <div className="p-5 rounded-xl bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-200">
              <h4 className="font-bold text-slate-800 mb-2">🎨 Renk Kodları</h4>
              <p className="text-sm text-slate-600 mb-2">Hex: #FF5733 = RGB: (255, 87, 51)</p>
              <p className="text-xs text-slate-500">Web tasarımında hexadecimal</p>
            </div>
            <div className="p-5 rounded-xl bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-200">
              <h4 className="font-bold text-slate-800 mb-2">🔐 Unix Permissions</h4>
              <p className="text-sm text-slate-600 mb-2">Octal: 755 = rwxr-xr-x</p>
              <p className="text-xs text-slate-500">Dosya izinleri</p>
            </div>
            <div className="p-5 rounded-xl bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-200">
              <h4 className="font-bold text-slate-800 mb-2">🌐 IP Adresleri</h4>
              <p className="text-sm text-slate-600 mb-2">192.168.1.1 = 0xC0A80101</p>
              <p className="text-xs text-slate-500">Ağ adresleme</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Önemli Bilgiler */}
      <Card className="border-2 border-sky-100/30 shadow-lg">
        <CardContent className="pt-6 pb-6 px-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-xl bg-rose-50"><AlertCircle className="h-6 w-6 text-rose-600" /></div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-800 mb-2">Önemli Bilgiler</h3>
              <p className="text-slate-600">Sayı sistemleri hakkında temel bilgiler</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-slate-50 border-l-4 border-sky-500">
              <h4 className="font-semibold text-slate-800 mb-2">🔢 Pozisyonel Notasyon</h4>
              <p className="text-sm text-slate-600">Her basamak sağdan sola taban^pozisyon değerine sahiptir. Örn: 123₁₀ = 1×10² + 2×10¹ + 3×10⁰</p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border-l-4 border-sky-500">
              <h4 className="font-semibold text-slate-800 mb-2">🎯 Hexadecimal Karakterler</h4>
              <p className="text-sm text-slate-600">Hex sistemde 0-9 rakamlar, A-F harfleri kullanılır: A=10, B=11, C=12, D=13, E=14, F=15</p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border-l-4 border-sky-500">
              <h4 className="font-semibold text-slate-800 mb-2">💾 Byte ve Bit</h4>
              <p className="text-sm text-slate-600">1 byte = 8 bit. 1 byte'lık binary: 00000000 - 11111111 (0-255 decimal)</p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border-l-4 border-sky-500">
              <h4 className="font-semibold text-slate-800 mb-2">🔄 İki'nin Tümleyeni</h4>
              <p className="text-sm text-slate-600">Negatif sayılar için two's complement kullanılır. Bu araç sadece pozitif tam sayıları dönüştürür.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* İlginç Bilgiler */}
      <Card className="border-2 border-sky-100/30 shadow-lg">
        <CardContent className="pt-6 pb-6 px-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-xl bg-blue-50"><Info className="h-6 w-6 text-blue-600" /></div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-800 mb-2">Bilmeniz İlginç Olabilecek Şeyler</h3>
              <p className="text-slate-600">Sayı sistemlerinin tarihi ve ilginç kullanımları</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2"><span className="text-2xl">🏛️</span>Babil Matematiği</h4>
              <p className="text-sm text-slate-600">Babilliler 60'lık (sexagesimal) taban kullanırdı! Bu yüzden 1 saat = 60 dakika, 1 dakika = 60 saniye.</p>
            </div>
            <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2"><span className="text-2xl">🖥️</span>Hexadecimal'in Kökeni</h4>
              <p className="text-sm text-slate-600">IBM 1960'larda hex'i popülerleştirdi. 4 bit = 1 hex digit olduğu için byte'ları göstermek çok pratik!</p>
            </div>
            <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2"><span className="text-2xl">👁️</span>Octal'in Kullanımı</h4>
              <p className="text-sm text-slate-600">Unix file permissions hala octal kullanır: chmod 755 = rwxr-xr-x. 3 bit grup = 1 octal digit!</p>
            </div>
            <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2"><span className="text-2xl">🎮</span>Oyun Geliştirme</h4>
              <p className="text-sm text-slate-600">Oyun engine'leri bitmask'ler için binary kullanır: 0b00001111 = ilk 4 flag aktif!</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export { BaseConverter }
