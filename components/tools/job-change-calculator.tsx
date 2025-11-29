"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { 
  Briefcase, 
  Calculator, 
  ArrowRight, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Calendar,
  Users,
  AlertCircle,
  CheckCircle,
  Info,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  RefreshCw,
  Home,
  Building2,
  Wallet,
  Clock,
  FileText,
  HelpCircle,
  Lightbulb,
  BookOpen
} from "lucide-react"
import Link from "next/link"

// Aylar
const AYLAR = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
]

interface VergiDilimi {
  limit: number | null
  oran: number
  aciklama: string
}

interface CikisTuru {
  id: string
  label: string
  kidemHakki: boolean
  ihbarHakki: boolean
}

interface Settings {
  yil: number
  vergiDilimleri: VergiDilimi[]
  sgkIsciOrani: number
  issizlikIsciOrani: number
  damgaVergisiOrani: number
  kidemTavani: number
  asgariUcretBrut: number
  asgariUcretNet: number
  ihbarSureleri: { yilAraligi: string; sure: number }[]
  cikisTurleri: CikisTuru[]
}

interface AylikMaas {
  ay: number
  ayAdi: string
  brut: number
  sgk: number
  issizlik: number
  vergiyeEsas: number
  kumulatifMatrah: number
  gelirVergisi: number
  damgaVergisi: number
  net: number
  vergiDilimi: string
}

interface CikisOzeti {
  izinBrut: number
  izinNet: number
  kidemBrut: number
  kidemNet: number
  ihbarBrut: number
  ihbarNet: number
  toplamNet: number
}

export function JobChangeCalculator() {
  // Settings
  const [settings, setSettings] = useState<Settings | null>(null)
  const [loading, setLoading] = useState(true)

  // Form state
  const [matrahHesaplamaYontemi, setMatrahHesaplamaYontemi] = useState<'otomatik' | 'manuel'>('otomatik')
  
  // Eski iş yeri
  const [eskiBrutMaas, setEskiBrutMaas] = useState<number>(50000)
  const [eskiCalismaSuresiAy, setEskiCalismaSuresiAy] = useState<number>(6)
  const [toplamKidemYili, setToplamKidemYili] = useState<number>(3)
  const [kullanilamayanIzin, setKullanilamayanIzin] = useState<number>(10)
  const [cikisTuru, setCikisTuru] = useState<string>('isveren-fesih')
  const [ihbarSuresiHafta, setIhbarSuresiHafta] = useState<number>(0)
  const [manuelKumulatifMatrah, setManuelKumulatifMatrah] = useState<number>(0)

  // Yeni iş yeri
  const [yeniBrutMaas, setYeniBrutMaas] = useState<number>(65000)
  const [yeniIseBaslamaAyi, setYeniIseBaslamaAyi] = useState<number>(new Date().getMonth() + 1)

  // Results
  const [cikisOzeti, setCikisOzeti] = useState<CikisOzeti | null>(null)
  const [yeniIsMaaslar, setYeniIsMaaslar] = useState<AylikMaas[]>([])
  const [hesaplandi, setHesaplandi] = useState(false)
  const [copied, setCopied] = useState(false)

  // Expanded sections
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    nasilKullanilir: false,
    ornekler: false,
    onemliHaklar: false,
    ilgincBilgiler: false
  })

  // Load settings
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await fetch('/api/admin/job-change-settings')
        const data = await response.json()
        if (data.success) {
          setSettings(data.settings)
        }
      } catch (error) {
        console.error('Error loading settings:', error)
      } finally {
        setLoading(false)
      }
    }
    loadSettings()
  }, [])

  // Gelir vergisi hesaplama (kümülatif matrah bazlı)
  const hesaplaGelirVergisi = useCallback((kumulatifMatrah: number): number => {
    if (!settings) return 0
    
    let toplam = 0
    let kalanMatrah = kumulatifMatrah
    let oncekiLimit = 0

    for (const dilim of settings.vergiDilimleri) {
      const dilimLimit = dilim.limit ?? Infinity
      const dilimMatrahi = Math.min(kalanMatrah, dilimLimit - oncekiLimit)
      
      if (dilimMatrahi <= 0) break
      
      toplam += dilimMatrahi * dilim.oran
      kalanMatrah -= dilimMatrahi
      oncekiLimit = dilimLimit
    }

    return toplam
  }, [settings])

  // Vergi dilimi bul
  const bulVergiDilimi = useCallback((kumulatifMatrah: number): string => {
    if (!settings) return ''
    
    for (const dilim of settings.vergiDilimleri) {
      if (dilim.limit === null || kumulatifMatrah <= dilim.limit) {
        return `%${(dilim.oran * 100).toFixed(0)}`
      }
    }
    return `%${(settings.vergiDilimleri[settings.vergiDilimleri.length - 1].oran * 100).toFixed(0)}`
  }, [settings])

  // İhbar süresi hesapla (otomatik)
  const hesaplaIhbarSuresi = useCallback((kidemYili: number): number => {
    if (kidemYili < 0.5) return 2
    if (kidemYili < 1.5) return 4
    if (kidemYili < 3) return 6
    return 8
  }, [])

  // Çıkış türünden hakları al
  const getCikisTuruHaklari = useCallback((id: string): { kidemHakki: boolean; ihbarHakki: boolean } => {
    if (!settings) return { kidemHakki: false, ihbarHakki: false }
    const tur = settings.cikisTurleri.find(t => t.id === id)
    return tur || { kidemHakki: false, ihbarHakki: false }
  }, [settings])

  // Ana hesaplama fonksiyonu
  const hesapla = useCallback(() => {
    if (!settings) return

    // Kümülatif matrah hesapla
    let baslangicKumulatif = 0
    if (matrahHesaplamaYontemi === 'otomatik') {
      const sgkKesinti = eskiBrutMaas * settings.sgkIsciOrani
      const issizlikKesinti = eskiBrutMaas * settings.issizlikIsciOrani
      const aylikVergiyeEsas = eskiBrutMaas - sgkKesinti - issizlikKesinti
      baslangicKumulatif = aylikVergiyeEsas * eskiCalismaSuresiAy
    } else {
      baslangicKumulatif = manuelKumulatifMatrah
    }

    // Çıkış türü hakları
    const haklar = getCikisTuruHaklari(cikisTuru)

    // === ESKİ İŞTEN ÇIKIŞ HESAPLAMALARI ===

    // 1. Kullanılmayan izin ücreti
    const gunlukBrut = eskiBrutMaas / 30
    const izinBrut = gunlukBrut * kullanilamayanIzin
    const izinSgk = izinBrut * settings.sgkIsciOrani
    const izinIssizlik = izinBrut * settings.issizlikIsciOrani
    const izinVergiyeEsas = izinBrut - izinSgk - izinIssizlik
    const izinGelirVergisi = izinVergiyeEsas * 0.15 // İzin ücreti ayrı vergilendirilir
    const izinDamga = izinBrut * settings.damgaVergisiOrani
    const izinNet = izinBrut - izinSgk - izinIssizlik - izinGelirVergisi - izinDamga

    // 2. Kıdem tazminatı
    let kidemBrut = 0
    let kidemNet = 0
    if (haklar.kidemHakki) {
      const kidemMatrah = Math.min(eskiBrutMaas, settings.kidemTavani)
      kidemBrut = kidemMatrah * toplamKidemYili
      // Kıdem tazminatından sadece damga vergisi kesilir
      kidemNet = kidemBrut * (1 - settings.damgaVergisiOrani)
    }

    // 3. İhbar tazminatı
    let ihbarBrut = 0
    let ihbarNet = 0
    if (haklar.ihbarHakki && ihbarSuresiHafta > 0) {
      // İhbar süresi hafta olarak girilir, aylık maaşa çeviriyoruz
      const ihbarAy = ihbarSuresiHafta / 4
      ihbarBrut = eskiBrutMaas * ihbarAy
      const ihbarSgk = ihbarBrut * settings.sgkIsciOrani
      const ihbarIssizlik = ihbarBrut * settings.issizlikIsciOrani
      const ihbarVergiyeEsas = ihbarBrut - ihbarSgk - ihbarIssizlik
      const ihbarGelirVergisi = ihbarVergiyeEsas * 0.15
      const ihbarDamga = ihbarBrut * settings.damgaVergisiOrani
      ihbarNet = ihbarBrut - ihbarSgk - ihbarIssizlik - ihbarGelirVergisi - ihbarDamga
    }

    const toplamCikisNet = izinNet + kidemNet + ihbarNet

    setCikisOzeti({
      izinBrut,
      izinNet,
      kidemBrut,
      kidemNet,
      ihbarBrut,
      ihbarNet,
      toplamNet: toplamCikisNet
    })

    // === YENİ İŞTE MAAŞ SİMÜLASYONU ===
    const maaslar: AylikMaas[] = []
    let kumulatifMatrah = baslangicKumulatif

    for (let ay = yeniIseBaslamaAyi; ay <= 12; ay++) {
      const brut = yeniBrutMaas
      const sgk = brut * settings.sgkIsciOrani
      const issizlik = brut * settings.issizlikIsciOrani
      const vergiyeEsas = brut - sgk - issizlik

      // Önceki kümülatif matrah için toplam vergi
      const oncekiToplamVergi = hesaplaGelirVergisi(kumulatifMatrah)
      
      // Yeni kümülatif matrah için toplam vergi
      const yeniKumulatif = kumulatifMatrah + vergiyeEsas
      const yeniToplamVergi = hesaplaGelirVergisi(yeniKumulatif)
      
      // Bu ayki gelir vergisi = fark
      const gelirVergisi = yeniToplamVergi - oncekiToplamVergi
      const damgaVergisi = brut * settings.damgaVergisiOrani
      const net = brut - sgk - issizlik - gelirVergisi - damgaVergisi

      const vergiDilimi = bulVergiDilimi(yeniKumulatif)

      maaslar.push({
        ay,
        ayAdi: AYLAR[ay - 1],
        brut,
        sgk,
        issizlik,
        vergiyeEsas,
        kumulatifMatrah: yeniKumulatif,
        gelirVergisi,
        damgaVergisi,
        net,
        vergiDilimi
      })

      kumulatifMatrah = yeniKumulatif
    }

    setYeniIsMaaslar(maaslar)
    setHesaplandi(true)
  }, [
    settings, 
    matrahHesaplamaYontemi, 
    eskiBrutMaas, 
    eskiCalismaSuresiAy, 
    toplamKidemYili, 
    kullanilamayanIzin, 
    cikisTuru, 
    ihbarSuresiHafta, 
    manuelKumulatifMatrah, 
    yeniBrutMaas, 
    yeniIseBaslamaAyi,
    getCikisTuruHaklari,
    hesaplaGelirVergisi,
    bulVergiDilimi
  ])

  // Para formatla
  const formatPara = (tutar: number): string => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 2
    }).format(tutar)
  }

  // Sonuçları kopyala
  const copyResults = () => {
    if (!cikisOzeti || yeniIsMaaslar.length === 0) return

    const yeniIsToplamNet = yeniIsMaaslar.reduce((sum, m) => sum + m.net, 0)
    const toplamKazanc = cikisOzeti.toplamNet + yeniIsToplamNet

    let text = `İŞ DEĞİŞİKLİĞİ HESAPLAMA SONUÇLARI\n`
    text += `${'='.repeat(50)}\n\n`
    text += `ESKİ İŞTEN ÇIKIŞ ÖZETİ\n`
    text += `- Kullanılmayan İzin: ${formatPara(cikisOzeti.izinNet)}\n`
    text += `- Kıdem Tazminatı: ${formatPara(cikisOzeti.kidemNet)}\n`
    text += `- İhbar Tazminatı: ${formatPara(cikisOzeti.ihbarNet)}\n`
    text += `- TOPLAM: ${formatPara(cikisOzeti.toplamNet)}\n\n`
    text += `YENİ İŞTE YIL SONU NET KAZANÇ: ${formatPara(yeniIsToplamNet)}\n`
    text += `TOPLAM YILLIK NET KAZANÇ: ${formatPara(toplamKazanc)}\n`

    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Section toggle
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <RefreshCw className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    )
  }

  if (!settings) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-6 text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-700">Hesaplama parametreleri yüklenemedi.</p>
        </CardContent>
      </Card>
    )
  }

  const haklar = getCikisTuruHaklari(cikisTuru)
  const otomatikIhbar = hesaplaIhbarSuresi(toplamKidemYili)

  // Sonuç hesaplamaları
  const yeniIsToplamNet = yeniIsMaaslar.reduce((sum, m) => sum + m.net, 0)
  const ortalamaAylikNet = yeniIsMaaslar.length > 0 ? yeniIsToplamNet / yeniIsMaaslar.length : 0
  const toplamYillikKazanc = (cikisOzeti?.toplamNet || 0) + yeniIsToplamNet

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Ana Sayfa Butonu */}
      <Link href="/">
        <Button variant="outline" className="group hover:border-indigo-400 hover:bg-indigo-50 transition-all">
          <Home className="h-4 w-4 mr-2 group-hover:text-indigo-600" />
          Ana Sayfaya Dön
        </Button>
      </Link>

      {/* Başlık */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30 mb-4">
          <Briefcase className="h-10 w-10" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900">İş Değişikliği Maaş ve Tazminat Hesaplama</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          İş değişikliği sonrası net maaşınızın nasıl değişeceğini, kümülatif vergi matrahının etkisini, 
          kıdem-ihbar tazminatı ve yıllık izin ücretini hesaplayın.
        </p>
      </div>

      {/* Kümülatif Matrah Hesaplama Yöntemi */}
      <Card className="border-2 border-indigo-100">
        <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calculator className="h-5 w-5 text-indigo-600" />
            Kümülatif Matrah Hesaplama Yöntemi
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-4">
            <button
              onClick={() => setMatrahHesaplamaYontemi('otomatik')}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                matrahHesaplamaYontemi === 'otomatik'
                  ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200'
                  : 'border-slate-200 hover:border-indigo-200'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  matrahHesaplamaYontemi === 'otomatik' ? 'border-indigo-500 bg-indigo-500' : 'border-slate-300'
                }`}>
                  {matrahHesaplamaYontemi === 'otomatik' && <Check className="h-3 w-3 text-white" />}
                </div>
                <span className="font-semibold text-slate-900">Otomatik Hesapla</span>
              </div>
              <p className="text-sm text-slate-600 ml-8">
                Brüt maaş ve çalışma süresi üzerinden kümülatif vergi matrahını otomatik hesaplar.
              </p>
            </button>

            <button
              onClick={() => setMatrahHesaplamaYontemi('manuel')}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                matrahHesaplamaYontemi === 'manuel'
                  ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200'
                  : 'border-slate-200 hover:border-indigo-200'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  matrahHesaplamaYontemi === 'manuel' ? 'border-indigo-500 bg-indigo-500' : 'border-slate-300'
                }`}>
                  {matrahHesaplamaYontemi === 'manuel' && <Check className="h-3 w-3 text-white" />}
                </div>
                <span className="font-semibold text-slate-900">Kendim Gireceğim</span>
              </div>
              <p className="text-sm text-slate-600 ml-8">
                Elimde bordro var, kümülatif vergi matrahını bordromdan gireceğim.
              </p>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Eski İş Yeri Bilgileri */}
      <Card className="border-2 border-orange-100">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Building2 className="h-5 w-5 text-orange-600" />
            Eski İş Yeri Bilgileri
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-slate-500" />
                Eski Brüt Maaş (TL)
              </Label>
              <Input
                type="number"
                value={eskiBrutMaas}
                onChange={(e) => setEskiBrutMaas(parseFloat(e.target.value) || 0)}
                className="h-12 text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-slate-500" />
                Bu Yıl Çalışma Süresi (Ay)
              </Label>
              <Input
                type="number"
                min="0"
                max="12"
                value={eskiCalismaSuresiAy}
                onChange={(e) => setEskiCalismaSuresiAy(parseInt(e.target.value) || 0)}
                className="h-12 text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-slate-500" />
                Toplam Kıdem Süresi (Yıl)
              </Label>
              <Input
                type="number"
                step="0.5"
                min="0"
                value={toplamKidemYili}
                onChange={(e) => setToplamKidemYili(parseFloat(e.target.value) || 0)}
                className="h-12 text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-slate-500" />
                Kullanılmayan İzin (Gün)
              </Label>
              <Input
                type="number"
                min="0"
                value={kullanilamayanIzin}
                onChange={(e) => setKullanilamayanIzin(parseInt(e.target.value) || 0)}
                className="h-12 text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-slate-500" />
                Çıkış Türü
              </Label>
              <select
                value={cikisTuru}
                onChange={(e) => setCikisTuru(e.target.value)}
                className="w-full h-12 px-3 rounded-md border border-slate-200 bg-white focus:border-indigo-300 focus:ring-1 focus:ring-indigo-300"
              >
                {settings.cikisTurleri.map(tur => (
                  <option key={tur.id} value={tur.id}>{tur.label}</option>
                ))}
              </select>
            </div>

            {haklar.ihbarHakki && (
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-slate-500" />
                  İhbar Süresi (Hafta)
                  <Badge variant="secondary" className="ml-2">Önerilen: {otomatikIhbar}</Badge>
                </Label>
                <Input
                  type="number"
                  min="0"
                  max="8"
                  value={ihbarSuresiHafta}
                  onChange={(e) => setIhbarSuresiHafta(parseInt(e.target.value) || 0)}
                  className="h-12 text-lg"
                  placeholder={`Önerilen: ${otomatikIhbar} hafta`}
                />
              </div>
            )}
          </div>

          {/* Haklar Özeti */}
          <div className="p-4 bg-slate-50 rounded-lg">
            <div className="flex flex-wrap gap-3">
              <Badge variant={haklar.kidemHakki ? "default" : "secondary"} className={haklar.kidemHakki ? "bg-green-100 text-green-700" : ""}>
                {haklar.kidemHakki ? <CheckCircle className="h-3 w-3 mr-1" /> : <AlertCircle className="h-3 w-3 mr-1" />}
                Kıdem Tazminatı: {haklar.kidemHakki ? 'Hak Var' : 'Hak Yok'}
              </Badge>
              <Badge variant={haklar.ihbarHakki ? "default" : "secondary"} className={haklar.ihbarHakki ? "bg-green-100 text-green-700" : ""}>
                {haklar.ihbarHakki ? <CheckCircle className="h-3 w-3 mr-1" /> : <AlertCircle className="h-3 w-3 mr-1" />}
                İhbar Tazminatı: {haklar.ihbarHakki ? 'Hak Var' : 'Hak Yok'}
              </Badge>
            </div>
          </div>

          {/* Manuel matrah girişi */}
          {matrahHesaplamaYontemi === 'manuel' && (
            <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
              <Label className="flex items-center gap-2 mb-2">
                <Calculator className="h-4 w-4 text-indigo-600" />
                Kümülatif Vergi Matrahı (TL)
              </Label>
              <Input
                type="number"
                value={manuelKumulatifMatrah}
                onChange={(e) => setManuelKumulatifMatrah(parseFloat(e.target.value) || 0)}
                className="h-12 text-lg"
                placeholder="Bordronuzdaki kümülatif vergi matrahını girin"
              />
              <p className="text-sm text-indigo-600 mt-2">
                💡 Bu bilgiyi maaş bordronuzun "Kümülatif Vergi Matrahı" veya "G.V. Matrahı (Kümülatif)" satırında bulabilirsiniz.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Yeni İş Yeri Bilgileri */}
      <Card className="border-2 border-green-100">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Building2 className="h-5 w-5 text-green-600" />
            Yeni İş Yeri Bilgileri
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-slate-500" />
                Yeni Brüt Maaş (TL)
              </Label>
              <Input
                type="number"
                value={yeniBrutMaas}
                onChange={(e) => setYeniBrutMaas(parseFloat(e.target.value) || 0)}
                className="h-12 text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-slate-500" />
                Yeni İşe Başlama Ayı
              </Label>
              <select
                value={yeniIseBaslamaAyi}
                onChange={(e) => setYeniIseBaslamaAyi(parseInt(e.target.value))}
                className="w-full h-12 px-3 rounded-md border border-slate-200 bg-white focus:border-green-300 focus:ring-1 focus:ring-green-300"
              >
                {AYLAR.map((ay, index) => (
                  <option key={index} value={index + 1}>{ay}</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hesapla Butonu */}
      <div className="flex justify-center">
        <Button
          onClick={hesapla}
          size="lg"
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 px-12 py-6 text-lg shadow-lg shadow-indigo-500/30"
        >
          <Calculator className="h-5 w-5 mr-2" />
          Hesapla
        </Button>
      </div>

      {/* Sonuçlar */}
      {hesaplandi && cikisOzeti && (
        <>
          {/* Eski İşten Çıkış Özeti */}
          <Card className="border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-red-50">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-lg">
                  <Wallet className="h-5 w-5 text-orange-600" />
                  Eski İşten Çıkış Özeti
                </div>
                <Button variant="outline" size="sm" onClick={copyResults}>
                  {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                  {copied ? 'Kopyalandı' : 'Kopyala'}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-white rounded-lg border border-orange-200">
                  <p className="text-sm text-slate-600 mb-1">Kullanılmayan İzin</p>
                  <p className="text-xs text-slate-400 mb-2">Brüt: {formatPara(cikisOzeti.izinBrut)}</p>
                  <p className="text-xl font-bold text-orange-600">{formatPara(cikisOzeti.izinNet)}</p>
                </div>
                <div className="p-4 bg-white rounded-lg border border-orange-200">
                  <p className="text-sm text-slate-600 mb-1">Kıdem Tazminatı</p>
                  <p className="text-xs text-slate-400 mb-2">Brüt: {formatPara(cikisOzeti.kidemBrut)}</p>
                  <p className="text-xl font-bold text-orange-600">{formatPara(cikisOzeti.kidemNet)}</p>
                </div>
                <div className="p-4 bg-white rounded-lg border border-orange-200">
                  <p className="text-sm text-slate-600 mb-1">İhbar Tazminatı</p>
                  <p className="text-xs text-slate-400 mb-2">Brüt: {formatPara(cikisOzeti.ihbarBrut)}</p>
                  <p className="text-xl font-bold text-orange-600">{formatPara(cikisOzeti.ihbarNet)}</p>
                </div>
                <div className="p-4 bg-orange-100 rounded-lg border-2 border-orange-300">
                  <p className="text-sm text-orange-700 mb-1 font-medium">Toplam Net Çıkış</p>
                  <p className="text-2xl font-bold text-orange-700">{formatPara(cikisOzeti.toplamNet)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Yeni İşte Maaş Simülasyonu */}
          <Card className="border-2 border-green-200">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Yeni İşte Net Maaş Simülasyonu (Ay Ay)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left p-3 font-semibold text-slate-700">Ay</th>
                      <th className="text-right p-3 font-semibold text-slate-700">Brüt</th>
                      <th className="text-right p-3 font-semibold text-slate-700">SGK</th>
                      <th className="text-right p-3 font-semibold text-slate-700">Vergiye Esas</th>
                      <th className="text-right p-3 font-semibold text-slate-700">Kümülatif Matrah</th>
                      <th className="text-right p-3 font-semibold text-slate-700">Gelir Vergisi</th>
                      <th className="text-right p-3 font-semibold text-slate-700">Damga</th>
                      <th className="text-right p-3 font-semibold text-slate-700 bg-green-50">Net Maaş</th>
                      <th className="text-center p-3 font-semibold text-slate-700">Dilim</th>
                    </tr>
                  </thead>
                  <tbody>
                    {yeniIsMaaslar.map((maas, index) => (
                      <tr key={maas.ay} className={`border-b border-slate-100 ${index % 2 === 0 ? 'bg-slate-50/50' : ''}`}>
                        <td className="p-3 font-medium">{maas.ayAdi}</td>
                        <td className="p-3 text-right">{formatPara(maas.brut)}</td>
                        <td className="p-3 text-right text-red-600">-{formatPara(maas.sgk + maas.issizlik)}</td>
                        <td className="p-3 text-right">{formatPara(maas.vergiyeEsas)}</td>
                        <td className="p-3 text-right text-slate-500">{formatPara(maas.kumulatifMatrah)}</td>
                        <td className="p-3 text-right text-red-600">-{formatPara(maas.gelirVergisi)}</td>
                        <td className="p-3 text-right text-red-600">-{formatPara(maas.damgaVergisi)}</td>
                        <td className="p-3 text-right font-bold text-green-600 bg-green-50">{formatPara(maas.net)}</td>
                        <td className="p-3 text-center">
                          <Badge variant="secondary">{maas.vergiDilimi}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-green-100 font-bold">
                      <td className="p-3" colSpan={7}>Yıl Sonu Toplam</td>
                      <td className="p-3 text-right text-green-700 text-lg">{formatPara(yeniIsToplamNet)}</td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-green-700 mb-1">Ortalama Aylık Net Maaş</p>
                  <p className="text-2xl font-bold text-green-700">{formatPara(ortalamaAylikNet)}</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-green-700 mb-1">Yıl Sonuna Kadar Toplam Net</p>
                  <p className="text-2xl font-bold text-green-700">{formatPara(yeniIsToplamNet)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Genel Kıyaslama */}
          <Card className="border-2 border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5 text-indigo-600" />
                Genel Kıyaslama ve Sonuç
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 bg-white rounded-xl border-2 border-orange-200 text-center">
                  <Wallet className="h-8 w-8 text-orange-500 mx-auto mb-3" />
                  <p className="text-sm text-slate-600 mb-2">Eski İşten Çıkışta</p>
                  <p className="text-2xl font-bold text-orange-600">{formatPara(cikisOzeti.toplamNet)}</p>
                </div>

                <div className="p-6 bg-white rounded-xl border-2 border-green-200 text-center">
                  <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-3" />
                  <p className="text-sm text-slate-600 mb-2">Yeni İşte Yıl Sonuna Kadar</p>
                  <p className="text-2xl font-bold text-green-600">{formatPara(yeniIsToplamNet)}</p>
                </div>

                <div className="p-6 bg-indigo-100 rounded-xl border-2 border-indigo-300 text-center">
                  <Calculator className="h-8 w-8 text-indigo-600 mx-auto mb-3" />
                  <p className="text-sm text-indigo-700 mb-2">Toplam Yıllık Net Kazanç</p>
                  <p className="text-3xl font-bold text-indigo-700">{formatPara(toplamYillikKazanc)}</p>
                </div>
              </div>

              {/* Net Etki */}
              <div className={`mt-6 p-6 rounded-xl text-center ${
                yeniBrutMaas > eskiBrutMaas 
                  ? 'bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-300' 
                  : 'bg-gradient-to-r from-amber-100 to-orange-100 border-2 border-amber-300'
              }`}>
                <div className="flex items-center justify-center gap-3 mb-3">
                  {yeniBrutMaas > eskiBrutMaas ? (
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  ) : (
                    <TrendingDown className="h-8 w-8 text-amber-600" />
                  )}
                  <span className="text-lg font-semibold text-slate-700">İş Değişikliğinin Net Etkisi</span>
                </div>
                <p className={`text-xl ${yeniBrutMaas > eskiBrutMaas ? 'text-green-700' : 'text-amber-700'}`}>
                  {yeniBrutMaas > eskiBrutMaas 
                    ? `Bu değişiklikle brüt maaşınız %${(((yeniBrutMaas - eskiBrutMaas) / eskiBrutMaas) * 100).toFixed(1)} artacak.`
                    : `Dikkat: Yeni brüt maaşınız eski maaşınızdan düşük.`
                  }
                </p>
                <p className="text-sm text-slate-600 mt-2">
                  Kümülatif vergi matrahı nedeniyle ilk aylarda net maaşınız beklediğinizden düşük olabilir.
                </p>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Bilgi Bölümleri */}
      <div className="space-y-4">
        {/* Nasıl Kullanılır */}
        <Card className="border border-slate-200">
          <CardHeader 
            className="cursor-pointer hover:bg-slate-50 transition-colors"
            onClick={() => toggleSection('nasilKullanilir')}
          >
            <CardTitle className="flex items-center justify-between text-base">
              <div className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-blue-500" />
                Nasıl Kullanılır?
              </div>
              {expandedSections.nasilKullanilir ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </CardTitle>
          </CardHeader>
          {expandedSections.nasilKullanilir && (
            <CardContent className="pt-0">
              <ol className="list-decimal list-inside space-y-2 text-slate-600">
                <li>Kümülatif matrah hesaplama yönteminizi seçin (otomatik veya manuel).</li>
                <li>Eski iş yerinizin bilgilerini girin: brüt maaş, çalışma süresi, kıdem yılı, izin günleri.</li>
                <li>Çıkış türünüzü seçin. Bu, kıdem ve ihbar haklarınızı belirler.</li>
                <li>Yeni iş yerinizin brüt maaşını ve başlama ayını girin.</li>
                <li>"Hesapla" butonuna tıklayın ve detaylı sonuçları görün.</li>
              </ol>
            </CardContent>
          )}
        </Card>

        {/* Örnek Kullanımlar */}
        <Card className="border border-slate-200">
          <CardHeader 
            className="cursor-pointer hover:bg-slate-50 transition-colors"
            onClick={() => toggleSection('ornekler')}
          >
            <CardTitle className="flex items-center justify-between text-base">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-green-500" />
                Örnek Kullanımlar
              </div>
              {expandedSections.ornekler ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </CardTitle>
          </CardHeader>
          {expandedSections.ornekler && (
            <CardContent className="pt-0 space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-700 mb-2">Örnek 1: İşveren Tarafından Fesih</h4>
                <p className="text-sm text-slate-600">
                  3 yıldır çalışan, 50.000 TL brüt maaşlı bir çalışan işveren tarafından çıkarılıyor. 
                  15 gün kullanılmayan izni var. Yeni işte 65.000 TL brüt maaş alacak.
                  Kıdem + ihbar + izin hakları hesaplanır.
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-700 mb-2">Örnek 2: İstifa</h4>
                <p className="text-sm text-slate-600">
                  Kendi isteğiyle ayrılan çalışan kıdem ve ihbar tazminatı alamaz, 
                  sadece kullanılmayan izin ücreti ödenir. Ancak yeni işte kümülatif 
                  vergi matrahı sıfırdan başlar.
                </p>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Önemli Bilgiler */}
        <Card className="border border-slate-200">
          <CardHeader 
            className="cursor-pointer hover:bg-slate-50 transition-colors"
            onClick={() => toggleSection('onemliHaklar')}
          >
            <CardTitle className="flex items-center justify-between text-base">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-amber-500" />
                Önemli Bilgiler
              </div>
              {expandedSections.onemliHaklar ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </CardTitle>
          </CardHeader>
          {expandedSections.onemliHaklar && (
            <CardContent className="pt-0">
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">•</span>
                  <span><strong>Kümülatif Vergi Matrahı:</strong> Yıl içinde yeni işe başladığınızda, eski işinizdeki kümülatif matrah yeni işe aktarılır. Bu nedenle vergi diliminiz yüksek kalabilir.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">•</span>
                  <span><strong>Kıdem Tazminatı Tavanı:</strong> 2025 için {formatPara(settings.kidemTavani)}. Brüt maaşınız bunun üzerindeyse tavan uygulanır.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">•</span>
                  <span><strong>İhbar Süresi:</strong> Çalışma süresine göre 2-8 hafta arasında değişir.</span>
                </li>
              </ul>
            </CardContent>
          )}
        </Card>

        {/* İlginç Bilgiler */}
        <Card className="border border-slate-200">
          <CardHeader 
            className="cursor-pointer hover:bg-slate-50 transition-colors"
            onClick={() => toggleSection('ilgincBilgiler')}
          >
            <CardTitle className="flex items-center justify-between text-base">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-purple-500" />
                Bilmeniz İlginç Olabilecek Şeyler
              </div>
              {expandedSections.ilgincBilgiler ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </CardTitle>
          </CardHeader>
          {expandedSections.ilgincBilgiler && (
            <CardContent className="pt-0">
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500">💡</span>
                  <span>Yılın başında iş değiştirmek, vergi avantajı sağlayabilir çünkü kümülatif matrahınız düşük olur.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500">💡</span>
                  <span>Evlilik nedeniyle işten ayrılan kadın çalışanlar kıdem tazminatı alabilir.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500">💡</span>
                  <span>Kıdem tazminatından sadece damga vergisi kesilir, gelir vergisi kesilmez.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500">💡</span>
                  <span>İkale (karşılıklı anlaşma) ile ayrılırsanız kıdem tazminatı alabilirsiniz ama ihbar alamazsınız.</span>
                </li>
              </ul>
            </CardContent>
          )}
        </Card>
      </div>

      {/* Uyarı Notu */}
      <Card className="border-2 border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <AlertCircle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-amber-800 mb-2">⚠️ Önemli Not</h3>
              <p className="text-sm text-amber-700">
                Bu hesaplama aracı, genel bilgiler sağlamak amacıyla tasarlanmıştır ve bireysel durumlara göre 
                değişiklik gösterebilir. Kesin hesaplamalar için bir mali müşavir veya insan kaynakları uzmanına 
                danışmanız önerilir. Hukuki tavsiye niteliği taşımaz.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
