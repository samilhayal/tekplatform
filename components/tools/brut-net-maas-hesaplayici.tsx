"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { 
  Calculator, TrendingDown, PieChart, Download, DollarSign, Percent,
  Home, Lightbulb, BookOpen, AlertCircle, Sparkles, TrendingUp,
  Users, Building, Wallet, CreditCard, ArrowRight, Info, HelpCircle,
  FileText, CheckCircle, Star, Zap
} from "lucide-react"
import Link from "next/link"

// 2025 Türkiye Vergi Dilimleri
const vergiDilimleri2025 = [
  { min: 0, max: 110000, oran: 15 },
  { min: 110000, max: 230000, oran: 20 },
  { min: 230000, max: 580000, oran: 27 },
  { min: 580000, max: 3000000, oran: 35 },
  { min: 3000000, max: Infinity, oran: 40 }
]

// SGK İşçi Payı Oranları
const sgkOranlari = {
  isci: {
    sgk: 14, // SGK işçi payı %14
    issizlik: 1, // İşsizlik sigortası işçi payı %1
    toplam: 15
  },
  isveren: {
    sgk: 20.5, // SGK işveren payı %20.5
    issizlik: 2, // İşsizlik sigortası işveren payı %2
    toplam: 22.5
  }
}

// Asgari Geçim İndirimi Oranları (2025)
const agiOranlari = {
  bekar: 0.05,
  evliEsCalismiyor: 0.10,
  evliEsCalisiyor: 0.05,
  cocuk1: 0.05,
  cocuk2: 0.05,
  cocuk3: 0.05
}

type CalcMode = 'brutToNet' | 'netToBrut'
type Period = 'monthly' | 'yearly' | 'hourly'
type MedeniDurum = 'bekar' | 'evliEsCalismiyor' | 'evliEsCalisiyor'

interface SalaryBreakdown {
  brutMaas: number
  sgkIsciPayi: number
  issizlikIsciPayi: number
  gelirVergisiMatrahi: number
  gelirVergisi: number
  agiTutari: number
  damgaVergisi: number
  netMaas: number
  sgkIsverenPayi: number
  issizlikIsverenPayi: number
  toplamMaliyet: number
  kesintiler: {
    sgk: number
    issizlik: number
    gelirVergisi: number
    damgaVergisi: number
    toplam: number
  }
}

export function BrutNetMaasHesaplayici() {
  const [calcMode, setCalcMode] = useState<CalcMode>('brutToNet')
  const [period, setPeriod] = useState<Period>('monthly')
  const [brutMaas, setBrutMaas] = useState<string>('')
  const [netMaas, setNetMaas] = useState<string>('')
  const [medeniDurum, setMedeniDurum] = useState<MedeniDurum>('bekar')
  const [cocukSayisi, setCocukSayisi] = useState<number>(0)
  const [result, setResult] = useState<SalaryBreakdown | null>(null)

  // Gelir Vergisi Hesaplama
  const hesaplaGelirVergisi = (matrah: number): number => {
    let vergi = 0
    let kalanMatrah = matrah

    for (const dilim of vergiDilimleri2025) {
      if (kalanMatrah <= 0) break

      const dilimTutari = Math.min(
        kalanMatrah,
        dilim.max === Infinity ? kalanMatrah : dilim.max - dilim.min
      )

      vergi += (dilimTutari * dilim.oran) / 100
      kalanMatrah -= dilimTutari
    }

    return vergi
  }

  // AGI (Asgari Geçim İndirimi) Hesaplama
  const hesaplaAGI = (gelirVergisi: number): number => {
    let agiOrani = 0

    // Medeni durum
    if (medeniDurum === 'bekar') {
      agiOrani += agiOranlari.bekar
    } else if (medeniDurum === 'evliEsCalismiyor') {
      agiOrani += agiOranlari.evliEsCalismiyor
    } else {
      agiOrani += agiOranlari.evliEsCalisiyor
    }

    // Çocuk sayısı
    const cocukOranlari = [
      agiOranlari.cocuk1,
      agiOranlari.cocuk2,
      agiOranlari.cocuk3
    ]
    for (let i = 0; i < Math.min(cocukSayisi, 3); i++) {
      agiOrani += cocukOranlari[i]
    }

    // AGI toplam yüzde 50'yi geçemez
    agiOrani = Math.min(agiOrani, 0.50)

    return gelirVergisi * agiOrani
  }

  // Brüt'ten Net'e Hesaplama
  const hesaplaBrutToNet = (brut: number): SalaryBreakdown => {
    // 1. SGK İşçi Payı
    const sgkIsciPayi = (brut * sgkOranlari.isci.sgk) / 100
    const issizlikIsciPayi = (brut * sgkOranlari.isci.issizlik) / 100

    // 2. Gelir Vergisi Matrahı
    const gelirVergisiMatrahi = brut - sgkIsciPayi - issizlikIsciPayi

    // 3. Gelir Vergisi
    const gelirVergisi = hesaplaGelirVergisi(gelirVergisiMatrahi)

    // 4. AGI (Asgari Geçim İndirimi)
    const agiTutari = hesaplaAGI(gelirVergisi)

    // 5. Damga Vergisi
    const damgaVergisi = (brut * 0.759) / 100

    // 6. Net Maaş
    const netMaas = brut - sgkIsciPayi - issizlikIsciPayi - (gelirVergisi - agiTutari) - damgaVergisi

    // İşveren Maliyetleri
    const sgkIsverenPayi = (brut * sgkOranlari.isveren.sgk) / 100
    const issizlikIsverenPayi = (brut * sgkOranlari.isveren.issizlik) / 100
    const toplamMaliyet = brut + sgkIsverenPayi + issizlikIsverenPayi

    return {
      brutMaas: brut,
      sgkIsciPayi,
      issizlikIsciPayi,
      gelirVergisiMatrahi,
      gelirVergisi,
      agiTutari,
      damgaVergisi,
      netMaas,
      sgkIsverenPayi,
      issizlikIsverenPayi,
      toplamMaliyet,
      kesintiler: {
        sgk: sgkIsciPayi,
        issizlik: issizlikIsciPayi,
        gelirVergisi: gelirVergisi - agiTutari,
        damgaVergisi,
        toplam: sgkIsciPayi + issizlikIsciPayi + (gelirVergisi - agiTutari) + damgaVergisi
      }
    }
  }

  // Net'ten Brüt'e Hesaplama (Iteratif Yaklaşım)
  const hesaplaNetToBrut = (net: number): SalaryBreakdown => {
    let brutTahmin = net * 1.4 // Başlangıç tahmini
    let iteration = 0
    const maxIterations = 100
    const tolerance = 0.01

    while (iteration < maxIterations) {
      const sonuc = hesaplaBrutToNet(brutTahmin)
      const fark = net - sonuc.netMaas

      if (Math.abs(fark) < tolerance) {
        return sonuc
      }

      // Newton-Raphson benzeri yaklaşım
      brutTahmin += fark * 0.5
      iteration++
    }

    return hesaplaBrutToNet(brutTahmin)
  }

  const handleCalculate = () => {
    const inputValue = calcMode === 'brutToNet' ? parseFloat(brutMaas) : parseFloat(netMaas)
    
    if (isNaN(inputValue) || inputValue <= 0) {
      alert('Lütfen geçerli bir maaş tutarı girin')
      return
    }

    // Periyoda göre aylık maaşa çevir
    let aylikMaas = inputValue
    if (period === 'yearly') {
      aylikMaas = inputValue / 12
    } else if (period === 'hourly') {
      aylikMaas = inputValue * 225 // 225 saat/ay ortalama
    }

    const sonuc = calcMode === 'brutToNet' 
      ? hesaplaBrutToNet(aylikMaas)
      : hesaplaNetToBrut(aylikMaas)

    setResult(sonuc)
  }

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 2
    }).format(value)
  }

  const formatPeriod = (value: number): string => {
    if (period === 'monthly') return formatCurrency(value)
    if (period === 'yearly') return formatCurrency(value * 12)
    if (period === 'hourly') return formatCurrency(value / 225)
    return formatCurrency(value)
  }

  const exportToPDF = () => {
    if (!result) return
    alert('PDF dışa aktarma özelliği yakında eklenecek!')
  }

  const exportToExcel = () => {
    if (!result) return
    
    // CSV formatında export (Excel ile açılabilir)
    const csvContent = `Maaş Hesaplama Detayları\n\n` +
      `Brüt Maaş,${result.brutMaas.toFixed(2)}\n` +
      `SGK İşçi Payı (${sgkOranlari.isci.sgk}%),${result.sgkIsciPayi.toFixed(2)}\n` +
      `İşsizlik İşçi Payı (${sgkOranlari.isci.issizlik}%),${result.issizlikIsciPayi.toFixed(2)}\n` +
      `Gelir Vergisi Matrahı,${result.gelirVergisiMatrahi.toFixed(2)}\n` +
      `Gelir Vergisi,${result.gelirVergisi.toFixed(2)}\n` +
      `AGI İndirimi,${result.agiTutari.toFixed(2)}\n` +
      `Damga Vergisi,${result.damgaVergisi.toFixed(2)}\n` +
      `Net Maaş,${result.netMaas.toFixed(2)}\n\n` +
      `İşveren Maliyetleri\n` +
      `SGK İşveren Payı (${sgkOranlari.isveren.sgk}%),${result.sgkIsverenPayi.toFixed(2)}\n` +
      `İşsizlik İşveren Payı (${sgkOranlari.isveren.issizlik}%),${result.issizlikIsverenPayi.toFixed(2)}\n` +
      `Toplam Maliyet,${result.toplamMaliyet.toFixed(2)}\n`

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'maas-hesaplama.csv'
    link.click()
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-6 sm:p-8 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
        
        {/* Ana Sayfa Butonu */}
        <Link 
          href="/"
          className="absolute top-4 right-4 flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-3 py-2 rounded-lg transition-all duration-300 text-sm font-medium"
        >
          <Home className="h-4 w-4" />
          Ana Sayfa
        </Link>
        
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
            <Calculator className="h-12 w-12 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-2xl sm:text-3xl font-bold">Brüt-Net Maaş Hesaplayıcı</h1>
              <Badge className="bg-yellow-400 text-yellow-900 hover:bg-yellow-500">2025</Badge>
            </div>
            <p className="text-blue-100 text-sm sm:text-base max-w-2xl">
              Türkiye vergi mevzuatına göre güncel maaş hesaplaması. SGK primleri, gelir vergisi, 
              AGI ve damga vergisi dahil tüm kesintileri otomatik hesaplayın.
            </p>
          </div>
        </div>

        {/* Hızlı Bilgi Kartları */}
        <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
            <Wallet className="h-5 w-5 mx-auto mb-1 text-yellow-300" />
            <div className="text-xs text-blue-200">Asgari Ücret</div>
            <div className="text-sm font-bold">₺22.104</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
            <Percent className="h-5 w-5 mx-auto mb-1 text-green-300" />
            <div className="text-xs text-blue-200">SGK İşçi</div>
            <div className="text-sm font-bold">%15</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
            <TrendingUp className="h-5 w-5 mx-auto mb-1 text-orange-300" />
            <div className="text-xs text-blue-200">Min Vergi</div>
            <div className="text-sm font-bold">%15</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
            <Building className="h-5 w-5 mx-auto mb-1 text-purple-300" />
            <div className="text-xs text-blue-200">SGK İşveren</div>
            <div className="text-sm font-bold">%22.5</div>
          </div>
        </div>
      </div>

      {/* Hesaplama Kartı */}
      <Card className="border-2 border-blue-100 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-6 w-6 text-blue-600" />
            Brüt-Net Maaş Hesaplayıcı
          </CardTitle>
          <CardDescription>
            Türkiye vergi mevzuatına göre 2025 yılı maaş hesaplaması
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Hesaplama Modu */}
          <div>
            <Label>Hesaplama Türü</Label>
            <Select value={calcMode} onValueChange={(v) => setCalcMode(v as CalcMode)}>
              <SelectTrigger className="bg-slate-50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="brutToNet">Brüt → Net Hesaplama</SelectItem>
                <SelectItem value="netToBrut">Net → Brüt Hesaplama</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Periyot Seçimi */}
          <div>
            <Label>Hesaplama Periyodu</Label>
            <Select value={period} onValueChange={(v) => setPeriod(v as Period)}>
              <SelectTrigger className="bg-slate-50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Aylık</SelectItem>
                <SelectItem value="yearly">Yıllık</SelectItem>
                <SelectItem value="hourly">Saatlik</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Maaş Girişi */}
          {calcMode === 'brutToNet' ? (
            <div>
              <Label>Brüt Maaş (₺)</Label>
              <Input
                type="number"
                value={brutMaas}
                onChange={(e) => setBrutMaas(e.target.value)}
                placeholder="Örn: 50000"
                className="text-lg bg-slate-50"
              />
            </div>
          ) : (
            <div>
              <Label>Net Maaş (₺)</Label>
              <Input
                type="number"
                value={netMaas}
                onChange={(e) => setNetMaas(e.target.value)}
                placeholder="Örn: 35000"
                className="text-lg bg-slate-50"
              />
            </div>
          )}

          {/* Medeni Durum */}
          <div>
            <Label>Medeni Durum (AGI için)</Label>
            <Select value={medeniDurum} onValueChange={(v) => setMedeniDurum(v as MedeniDurum)}>
              <SelectTrigger className="bg-slate-50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bekar">Bekar</SelectItem>
                <SelectItem value="evliEsCalismiyor">Evli - Eş Çalışmıyor</SelectItem>
                <SelectItem value="evliEsCalisiyor">Evli - Eş Çalışıyor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Çocuk Sayısı */}
          <div>
            <Label>Çocuk Sayısı (AGI için, max 3)</Label>
            <Select value={cocukSayisi.toString()} onValueChange={(v) => setCocukSayisi(parseInt(v))}>
              <SelectTrigger className="bg-slate-50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[0, 1, 2, 3, 4, 5].map((n) => (
                  <SelectItem key={n} value={n.toString()}>{n}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleCalculate} className="w-full" size="lg">
            <Calculator className="mr-2 h-5 w-5" />
            Hesapla
          </Button>
        </CardContent>
      </Card>

      {/* Sonuç Kartları */}
      {result && (
        <>
          {/* Özet Kartlar */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Brüt Maaş</p>
                    <p className="text-2xl font-bold text-blue-700">{formatPeriod(result.brutMaas)}</p>
                  </div>
                  <DollarSign className="h-10 w-10 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Net Maaş</p>
                    <p className="text-2xl font-bold text-green-700">{formatPeriod(result.netMaas)}</p>
                  </div>
                  <DollarSign className="h-10 w-10 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-red-50 to-red-100">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Toplam Kesinti</p>
                    <p className="text-2xl font-bold text-red-700">{formatPeriod(result.kesintiler.toplam)}</p>
                  </div>
                  <TrendingDown className="h-10 w-10 text-red-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detaylı Sonuçlar */}
          <Tabs defaultValue="breakdown" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="breakdown">Detay</TabsTrigger>
              <TabsTrigger value="chart">Grafik</TabsTrigger>
              <TabsTrigger value="employer">İşveren Maliyeti</TabsTrigger>
            </TabsList>

            {/* Detay Sekmesi */}
            <TabsContent value="breakdown">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Hesaplama Detayları</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between p-3 bg-slate-50 rounded">
                      <span className="font-medium">Brüt Maaş</span>
                      <span className="font-bold text-blue-600">{formatCurrency(result.brutMaas)}</span>
                    </div>

                    <div className="border-l-4 border-red-400 pl-4 space-y-2">
                      <h4 className="font-semibold text-red-700 mb-2">Kesintiler</h4>
                      
                      <div className="flex justify-between text-sm">
                        <span>SGK İşçi Payı (%{sgkOranlari.isci.sgk})</span>
                        <span className="text-red-600">-{formatCurrency(result.sgkIsciPayi)}</span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span>İşsizlik Sigortası İşçi (%{sgkOranlari.isci.issizlik})</span>
                        <span className="text-red-600">-{formatCurrency(result.issizlikIsciPayi)}</span>
                      </div>

                      <div className="flex justify-between text-sm bg-slate-100 p-2 rounded">
                        <span className="font-medium">Gelir Vergisi Matrahı</span>
                        <span>{formatCurrency(result.gelirVergisiMatrahi)}</span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span>Gelir Vergisi</span>
                        <span className="text-red-600">-{formatCurrency(result.gelirVergisi)}</span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-green-700">AGI İndirimi</span>
                        <span className="text-green-600">+{formatCurrency(result.agiTutari)}</span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span>Damga Vergisi (%0.759)</span>
                        <span className="text-red-600">-{formatCurrency(result.damgaVergisi)}</span>
                      </div>

                      <div className="flex justify-between font-semibold text-sm pt-2 border-t">
                        <span>Toplam Kesinti</span>
                        <span className="text-red-600">-{formatCurrency(result.kesintiler.toplam)}</span>
                      </div>
                    </div>

                    <div className="flex justify-between p-4 bg-green-50 rounded-lg border-2 border-green-200">
                      <span className="font-bold text-lg">Net Maaş</span>
                      <span className="font-bold text-2xl text-green-700">{formatCurrency(result.netMaas)}</span>
                    </div>
                  </div>

                  {/* Export Buttons */}
                  <div className="grid grid-cols-2 gap-3 pt-4">
                    <Button variant="outline" onClick={exportToPDF}>
                      <Download className="mr-2 h-4 w-4" />
                      PDF İndir
                    </Button>
                    <Button variant="outline" onClick={exportToExcel}>
                      <Download className="mr-2 h-4 w-4" />
                      Excel İndir
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Grafik Sekmesi */}
            <TabsContent value="chart">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Görselleştirme
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Basit Bar Chart */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2 text-sm">
                        <span>SGK İşçi Payı</span>
                        <span className="font-semibold">{formatCurrency(result.sgkIsciPayi)}</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-6">
                        <div
                          className="bg-blue-500 h-6 rounded-full flex items-center justify-end px-2"
                          style={{ width: `${(result.sgkIsciPayi / result.brutMaas) * 100}%` }}
                        >
                          <span className="text-white text-xs font-bold">
                            {((result.sgkIsciPayi / result.brutMaas) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2 text-sm">
                        <span>İşsizlik Sigortası</span>
                        <span className="font-semibold">{formatCurrency(result.issizlikIsciPayi)}</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-6">
                        <div
                          className="bg-purple-500 h-6 rounded-full flex items-center justify-end px-2"
                          style={{ width: `${(result.issizlikIsciPayi / result.brutMaas) * 100}%` }}
                        >
                          <span className="text-white text-xs font-bold">
                            {((result.issizlikIsciPayi / result.brutMaas) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2 text-sm">
                        <span>Gelir Vergisi (AGI Sonrası)</span>
                        <span className="font-semibold">
                          {formatCurrency(result.gelirVergisi - result.agiTutari)}
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-6">
                        <div
                          className="bg-orange-500 h-6 rounded-full flex items-center justify-end px-2"
                          style={{ width: `${((result.gelirVergisi - result.agiTutari) / result.brutMaas) * 100}%` }}
                        >
                          <span className="text-white text-xs font-bold">
                            {(((result.gelirVergisi - result.agiTutari) / result.brutMaas) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2 text-sm">
                        <span>Damga Vergisi</span>
                        <span className="font-semibold">{formatCurrency(result.damgaVergisi)}</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-6">
                        <div
                          className="bg-red-500 h-6 rounded-full flex items-center justify-end px-2"
                          style={{ width: `${(result.damgaVergisi / result.brutMaas) * 100}%` }}
                        >
                          <span className="text-white text-xs font-bold">
                            {((result.damgaVergisi / result.brutMaas) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2 text-sm">
                        <span className="font-bold">Net Maaş</span>
                        <span className="font-bold text-green-600">{formatCurrency(result.netMaas)}</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-8">
                        <div
                          className="bg-green-500 h-8 rounded-full flex items-center justify-end px-3"
                          style={{ width: `${(result.netMaas / result.brutMaas) * 100}%` }}
                        >
                          <span className="text-white text-sm font-bold">
                            {((result.netMaas / result.brutMaas) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Özet İstatistik */}
                  <div className="mt-6 p-4 bg-slate-100 rounded-lg">
                    <h4 className="font-semibold mb-2">Özet</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-slate-600">Toplam Kesinti Oranı:</span>
                        <p className="font-bold text-red-600">
                          {((result.kesintiler.toplam / result.brutMaas) * 100).toFixed(2)}%
                        </p>
                      </div>
                      <div>
                        <span className="text-slate-600">Net Oran:</span>
                        <p className="font-bold text-green-600">
                          {((result.netMaas / result.brutMaas) * 100).toFixed(2)}%
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* İşveren Maliyeti */}
            <TabsContent value="employer">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">İşveren Maliyeti</CardTitle>
                  <CardDescription>
                    İşverenin bir çalışan için ödediği toplam maliyet
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between p-3 bg-slate-50 rounded">
                      <span className="font-medium">Brüt Maaş</span>
                      <span className="font-bold">{formatCurrency(result.brutMaas)}</span>
                    </div>

                    <div className="border-l-4 border-amber-400 pl-4 space-y-2">
                      <h4 className="font-semibold text-amber-700 mb-2">İşveren Primleri</h4>
                      
                      <div className="flex justify-between text-sm">
                        <span>SGK İşveren Payı (%{sgkOranlari.isveren.sgk})</span>
                        <span className="text-amber-600">+{formatCurrency(result.sgkIsverenPayi)}</span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span>İşsizlik Sigortası İşveren (%{sgkOranlari.isveren.issizlik})</span>
                        <span className="text-amber-600">+{formatCurrency(result.issizlikIsverenPayi)}</span>
                      </div>
                    </div>

                    <div className="flex justify-between p-4 bg-amber-50 rounded-lg border-2 border-amber-200">
                      <span className="font-bold text-lg">Toplam Maliyet</span>
                      <span className="font-bold text-2xl text-amber-700">
                        {formatCurrency(result.toplamMaliyet)}
                      </span>
                    </div>
                  </div>

                  {/* Maliyet Analizi */}
                  <div className="mt-6 p-4 bg-slate-100 rounded-lg">
                    <h4 className="font-semibold mb-3">Maliyet Dağılımı</h4>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Çalışana Ödenen (Net)</span>
                        <span className="font-semibold text-green-600">
                          {((result.netMaas / result.toplamMaliyet) * 100).toFixed(1)}%
                        </span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span>Vergi ve Kesintiler</span>
                        <span className="font-semibold text-red-600">
                          {((result.kesintiler.toplam / result.toplamMaliyet) * 100).toFixed(1)}%
                        </span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span>İşveren Primleri</span>
                        <span className="font-semibold text-amber-600">
                          {(((result.sgkIsverenPayi + result.issizlikIsverenPayi) / result.toplamMaliyet) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t">
                      <p className="text-sm text-slate-600">
                        💡 İşveren, çalışana {formatCurrency(result.netMaas)} net maaş ödemek için 
                        toplam <span className="font-bold text-amber-700">{formatCurrency(result.toplamMaliyet)}</span> harcamaktadır.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Vergi Dilim Bilgisi */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Percent className="h-5 w-5" />
                2025 Gelir Vergisi Dilimleri
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Gelir Aralığı (Yıllık)</th>
                      <th className="text-right p-2">Vergi Oranı</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vergiDilimleri2025.map((dilim, idx) => (
                      <tr key={idx} className="border-b hover:bg-slate-50">
                        <td className="p-2">
                          {formatCurrency(dilim.min)} - {dilim.max === Infinity ? '∞' : formatCurrency(dilim.max)}
                        </td>
                        <td className="text-right p-2 font-semibold">%{dilim.oran}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Eğitici Bölümler */}
      <div className="grid gap-6 mt-8">
        {/* Nasıl Kullanılır */}
        <Card className="border-2 border-green-100">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
            <CardTitle className="flex items-center gap-2 text-green-800">
              <HelpCircle className="h-5 w-5" />
              Nasıl Kullanılır?
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl">
                <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                <div>
                  <h4 className="font-semibold text-green-800">Hesaplama Türü</h4>
                  <p className="text-sm text-green-700 mt-1">Brüt'ten Net'e veya Net'ten Brüt'e hesaplama seçin</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl">
                <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                <div>
                  <h4 className="font-semibold text-green-800">Maaş Girişi</h4>
                  <p className="text-sm text-green-700 mt-1">Aylık, yıllık veya saatlik maaş tutarını girin</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl">
                <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                <div>
                  <h4 className="font-semibold text-green-800">AGI Bilgileri</h4>
                  <p className="text-sm text-green-700 mt-1">Medeni durum ve çocuk sayısını belirtin</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl">
                <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">4</div>
                <div>
                  <h4 className="font-semibold text-green-800">Hesapla</h4>
                  <p className="text-sm text-green-700 mt-1">Detaylı sonuçları ve grafikleri inceleyin</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Örnek Kullanımlar */}
        <Card className="border-2 border-blue-100">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <BookOpen className="h-5 w-5" />
              Örnek Hesaplamalar
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-blue-600" />
                  <h4 className="font-semibold text-blue-800">Asgari Ücretli</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-700">Brüt Maaş:</span>
                    <span className="font-bold">₺22.104</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Net Maaş:</span>
                    <span className="font-bold text-green-600">~₺17.002</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Kesinti:</span>
                    <span className="font-bold text-red-600">~%23</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-center gap-2 mb-3">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                  <h4 className="font-semibold text-blue-800">Orta Gelir</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-700">Brüt Maaş:</span>
                    <span className="font-bold">₺50.000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Net Maaş:</span>
                    <span className="font-bold text-green-600">~₺37.500</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Kesinti:</span>
                    <span className="font-bold text-red-600">~%25</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-center gap-2 mb-3">
                  <Star className="h-5 w-5 text-blue-600" />
                  <h4 className="font-semibold text-blue-800">Yüksek Gelir</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-700">Brüt Maaş:</span>
                    <span className="font-bold">₺100.000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Net Maaş:</span>
                    <span className="font-bold text-green-600">~₺71.000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Kesinti:</span>
                    <span className="font-bold text-red-600">~%29</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-blue-100 rounded-lg">
              <p className="text-sm text-blue-800 flex items-start gap-2">
                <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                Bu değerler bekar ve çocuksuz bir çalışan için yaklaşık değerlerdir. AGI durumuna göre farklılık gösterebilir.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Önemli Bilgiler */}
        <Card className="border-2 border-amber-100">
          <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50">
            <CardTitle className="flex items-center gap-2 text-amber-800">
              <AlertCircle className="h-5 w-5" />
              Önemli Bilgiler
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-amber-800">SGK Primleri</h4>
                    <p className="text-sm text-amber-700">İşçi payı %15 (SGK %14 + İşsizlik %1), işveren payı %22.5</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-amber-800">Gelir Vergisi</h4>
                    <p className="text-sm text-amber-700">Kümülatif matrah üzerinden %15-%40 arası artan oranlı vergi</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-amber-800">Damga Vergisi</h4>
                    <p className="text-sm text-amber-700">Brüt maaş üzerinden binde 7.59 (%0.759) oranında</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-amber-800">AGI (Asgari Geçim İndirimi)</h4>
                    <p className="text-sm text-amber-700">Medeni durum ve çocuk sayısına göre vergi indirimi sağlar</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-amber-800">SGK Tavan</h4>
                    <p className="text-sm text-amber-700">2025 yılı için SGK tavan ücreti aylık ₺265.248</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-amber-800">Yıl İçi Değişim</h4>
                    <p className="text-sm text-amber-700">Kümülatif matrah arttıkça vergi dilimi yükselebilir</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* İlginç Bilgiler */}
        <Card className="border-2 border-purple-100">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
            <CardTitle className="flex items-center gap-2 text-purple-800">
              <Sparkles className="h-5 w-5" />
              Bilmeniz İlginç Olabilecek Şeyler
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                <Zap className="h-8 w-8 text-purple-500 mb-3" />
                <h4 className="font-semibold text-purple-800 mb-2">Vergi Dilimi Sıçraması</h4>
                <p className="text-sm text-purple-700">
                  Yıl içinde kümülatif matrah arttıkça vergi dilimi değişir. Ocak'ta %15 olan vergi, 
                  Aralık'ta %35'e çıkabilir!
                </p>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                <TrendingUp className="h-8 w-8 text-purple-500 mb-3" />
                <h4 className="font-semibold text-purple-800 mb-2">İşveren Maliyeti</h4>
                <p className="text-sm text-purple-700">
                  Çalışana ödenen net maaş, işverenin toplam maliyetinin yaklaşık %50-60'ını oluşturur. 
                  Geri kalan vergi ve primlerdir.
                </p>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                <Wallet className="h-8 w-8 text-purple-500 mb-3" />
                <h4 className="font-semibold text-purple-800 mb-2">AGI Avantajı</h4>
                <p className="text-sm text-purple-700">
                  Evli ve 3 çocuklu bir çalışan, bekara göre aylık yüzlerce TL daha fazla AGI alabilir!
                </p>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                <Building className="h-8 w-8 text-purple-500 mb-3" />
                <h4 className="font-semibold text-purple-800 mb-2">5510 Sayılı Kanun</h4>
                <p className="text-sm text-purple-700">
                  SGK primleri 5510 sayılı Sosyal Sigortalar ve Genel Sağlık Sigortası Kanunu'na göre belirlenir.
                </p>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                <FileText className="h-8 w-8 text-purple-500 mb-3" />
                <h4 className="font-semibold text-purple-800 mb-2">Bordro Detayları</h4>
                <p className="text-sm text-purple-700">
                  Her ay işverenler, çalışanların maaş bordrolarını hazırlayıp SGK'ya APHB 
                  (Aylık Prim ve Hizmet Belgesi) vermelidir.
                </p>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                <Users className="h-8 w-8 text-purple-500 mb-3" />
                <h4 className="font-semibold text-purple-800 mb-2">Emeklilik Primi</h4>
                <p className="text-sm text-purple-700">
                  SGK primlerinin bir kısmı emeklilik için birikir. Ne kadar yüksek prim öderseniz, 
                  emekli maaşınız o kadar yüksek olur.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sıkça Sorulan Sorular */}
        <Card className="border-2 border-slate-200">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100">
            <CardTitle className="flex items-center gap-2 text-slate-800">
              <Lightbulb className="h-5 w-5" />
              Sıkça Sorulan Sorular
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-xl">
                <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-blue-500" />
                  Brüt maaş ile net maaş arasındaki fark nedir?
                </h4>
                <p className="text-sm text-slate-600 pl-6">
                  Brüt maaş, kesintiler yapılmadan önceki toplam maaştır. Net maaş ise SGK primleri, 
                  gelir vergisi ve damga vergisi kesildikten sonra elinize geçen tutardır.
                </p>
              </div>
              
              <div className="p-4 bg-slate-50 rounded-xl">
                <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-blue-500" />
                  AGI nedir ve nasıl hesaplanır?
                </h4>
                <p className="text-sm text-slate-600 pl-6">
                  AGI (Asgari Geçim İndirimi), medeni durum ve çocuk sayısına göre gelir vergisinden 
                  yapılan indirimdir. Bekar için %5, evli eş çalışmıyorsa %10 oranında indirim sağlar.
                </p>
              </div>
              
              <div className="p-4 bg-slate-50 rounded-xl">
                <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-blue-500" />
                  Yıl içinde neden vergi kesintim artıyor?
                </h4>
                <p className="text-sm text-slate-600 pl-6">
                  Türkiye'de gelir vergisi kümülatif (birikimli) matrah üzerinden hesaplanır. Yıl başından 
                  itibaren toplam geliriniz arttıkça, daha yüksek vergi dilimlerine girersiniz.
                </p>
              </div>
              
              <div className="p-4 bg-slate-50 rounded-xl">
                <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-blue-500" />
                  İşveren benim için ne kadar ödüyor?
                </h4>
                <p className="text-sm text-slate-600 pl-6">
                  İşveren, brüt maaşınızın yaklaşık %22.5'u kadar ek SGK primi öder. Örneğin brüt maaşınız 
                  50.000 TL ise, işverenin toplam maliyeti yaklaşık 61.000 TL'dir.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
