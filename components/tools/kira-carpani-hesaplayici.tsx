"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  ReferenceLine
} from 'recharts'
import { 
  Home,
  Building2,
  Landmark,
  Warehouse,
  MapPin,
  Calculator,
  TrendingUp,
  TrendingDown,
  Clock,
  Percent,
  DollarSign,
  PiggyBank,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Info,
  Calendar,
  Banknote,
  ArrowRight,
  Target,
  Wallet,
  CreditCard,
  BarChart3,
  CircleDollarSign,
  TableIcon,
  ChevronDown,
  ChevronUp,
  Coins,
  Scale,
  Lightbulb,
  BookOpen,
  HelpCircle,
  Star,
  Printer,
  FileText,
  Download
} from "lucide-react"

// Gayrimenkul tipleri
type GayrimenkulTipi = 'konut' | 'arsa' | 'isyeri' | 'depo'

const gayrimenkulTipleri: { value: GayrimenkulTipi; label: string; icon: any; kiralabilir: boolean }[] = [
  { value: 'konut', label: 'Konut', icon: Home, kiralabilir: true },
  { value: 'arsa', label: 'Arsa', icon: MapPin, kiralabilir: false },
  { value: 'isyeri', label: 'İş Yeri', icon: Building2, kiralabilir: true },
  { value: 'depo', label: 'Depo', icon: Warehouse, kiralabilir: true }
]

// Yıllık projeksiyon verisi
interface YillikProjeksiyon {
  yil: number
  gayrimenkulDegeri: number
  degerArtisi: number
  yillikKiraGeliri: number
  yillikGiderler: number
  netKiraGeliri: number
  kumulatifKiraGeliri: number
  // Kredi varsa
  yillikTaksitOdemesi?: number
  netNakitAkisi?: number
  kalanKrediBorcu?: number
}

// Sonuç tipi
interface HesaplamaSonuclari {
  // Temel
  yillikBrutKira: number
  kiraCarpaniAy: number
  kiraCarpaniYil: number
  yillikGider: number
  yillikNetKira: number
  yillikNetKiraGetirisi: number
  geriDonusSuresi: number
  
  // Değer artışı dahil
  nYilSonraFiyat: number
  toplamKiraGeliri: number
  toplamNominalGetiri: number
  ortalamaYillikGetiri: number
  cagr: number
  
  // Reel getiri
  reelGetiri: number
  
  // Kredi kullanıyorsa
  ozSermaye: number
  aylikNetNakitAkisi: number
  yillikNetNakitAkisi: number
  cashOnCash: number
  toplamKrediOdemesi: number
  toplamFaizOdemesi: number
  
  // Yıllık projeksiyon tablosu
  yillikProjeksiyonlar: YillikProjeksiyon[]
  
  // Özet metrikleri
  toplamYatirim: number
  toplamGetiri: number
  netKar: number
  karMarji: number
  
  // Değerlendirmeler
  kiraCarpaniDegerlendirme: 'kisa' | 'orta' | 'uzun'
  getiriDegerlendirme: 'zayif' | 'orta' | 'iyi' | 'cok-iyi'
}

export function KiraCarpaniHesaplayici() {
  // Form state
  const [gayrimenkulTipi, setGayrimenkulTipi] = useState<GayrimenkulTipi>('konut')
  const [satinAlmaFiyati, setSatinAlmaFiyati] = useState<string>('')
  const [aylikKira, setAylikKira] = useState<string>('')
  const [aylikGiderler, setAylikGiderler] = useState<string>('')
  const [yillikGiderOrani, setYillikGiderOrani] = useState<string>('1')
  const [yillikDegerArtisi, setYillikDegerArtisi] = useState<string>('20')
  const [yillikEnflasyon, setYillikEnflasyon] = useState<string>('40')
  const [yatirimSuresi, setYatirimSuresi] = useState<string>('5')
  const [yillikKiraArtisi, setYillikKiraArtisi] = useState<string>('25')
  
  // Kredi state
  const [krediKullaniyorum, setKrediKullaniyorum] = useState<boolean>(false)
  const [krediTutari, setKrediTutari] = useState<string>('')
  const [aylikTaksit, setAylikTaksit] = useState<string>('')
  
  // Sonuçlar
  const [sonuclar, setSonuclar] = useState<HesaplamaSonuclari | null>(null)
  
  // Aktif tab
  const [aktifTab, setAktifTab] = useState<string>('giris')

  // Seçilen gayrimenkul tipi kiralanabilir mi?
  const kiralabilir = gayrimenkulTipleri.find(t => t.value === gayrimenkulTipi)?.kiralabilir ?? true

  // Para formatı
  const formatPara = (deger: number): string => {
    return new Intl.NumberFormat('tr-TR', { 
      style: 'currency', 
      currency: 'TRY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(deger)
  }

  // Yüzde formatı
  const formatYuzde = (deger: number): string => {
    return `%${deger.toFixed(2)}`
  }

  // Hesaplama fonksiyonu
  const hesapla = () => {
    const F = parseFloat(satinAlmaFiyati) || 0 // Satın alma fiyatı
    const K_ay = parseFloat(aylikKira) || 0 // Aylık kira
    const G_ay = parseFloat(aylikGiderler) || 0 // Aylık giderler
    const g_yillik = (parseFloat(yillikGiderOrani) || 0) / 100 // Yıllık gider oranı
    const d = (parseFloat(yillikDegerArtisi) || 0) / 100 // Değer artışı
    const enf = (parseFloat(yillikEnflasyon) || 0) / 100 // Enflasyon
    const n = parseInt(yatirimSuresi) || 5 // Yatırım süresi
    const kiraArtis = (parseFloat(yillikKiraArtisi) || 0) / 100 // Kira artışı
    
    // Kredi bilgileri
    const K = krediKullaniyorum ? (parseFloat(krediTutari) || 0) : 0
    const T = krediKullaniyorum ? (parseFloat(aylikTaksit) || 0) : 0
    
    // A. Basit Göstergeler
    const yillikBrutKira = K_ay * 12
    const kiraCarpaniAy = K_ay > 0 ? F / K_ay : 0
    const kiraCarpaniYil = kiraCarpaniAy / 12
    
    // Yıllık gider
    const yillikGider = (G_ay * 12) + (F * g_yillik)
    
    // Yıllık net kira
    const yillikNetKira = yillikBrutKira - yillikGider
    
    // Yıllık net kira getirisi (%)
    const yillikNetKiraGetirisi = F > 0 ? (yillikNetKira / F) * 100 : 0
    
    // B. Geri Dönüş Süresi
    const geriDonusSuresi = yillikNetKira > 0 ? F / yillikNetKira : 0
    
    // C. Değer Artışı Dahil Toplam Getiri
    // n yıl sonraki tahmini satış fiyatı
    const nYilSonraFiyat = F * Math.pow(1 + d, n)
    
    // n yıl boyunca toplam kira geliri (kira artışı dahil)
    let toplamKiraGeliri = 0
    let yillikKira = yillikNetKira
    for (let i = 0; i < n; i++) {
      toplamKiraGeliri += yillikKira
      yillikKira *= (1 + kiraArtis)
    }
    
    // Toplam nominal getiri
    const toplamNominalGetiri = (nYilSonraFiyat - F) + toplamKiraGeliri
    
    // Ortalama yıllık getiri oranı
    const ortalamaYillikGetiri = F > 0 && n > 0 ? (toplamNominalGetiri / F) / n * 100 : 0
    
    // CAGR (Bileşik Yıllık Getiri Oranı)
    const toplamDeger = nYilSonraFiyat + toplamKiraGeliri
    const cagr = F > 0 && n > 0 ? (Math.pow(toplamDeger / F, 1 / n) - 1) * 100 : 0
    
    // D. Enflasyon sonrası reel getiri
    const r_nom = cagr / 100
    const reelGetiri = ((1 + r_nom) / (1 + enf) - 1) * 100
    
    // E. Kredi Kullanılıyorsa
    const ozSermaye = F - K
    const aylikNetNakitAkisi = K_ay - T - G_ay
    const yillikNetNakitAkisi = aylikNetNakitAkisi * 12
    const cashOnCash = ozSermaye > 0 ? (yillikNetNakitAkisi / ozSermaye) * 100 : 0
    
    // Toplam kredi ödemesi ve faiz hesabı
    const toplamKrediOdemesi = T * 12 * n
    const toplamFaizOdemesi = toplamKrediOdemesi - K
    
    // F. Yıllık Projeksiyon Tablosu Oluştur
    const yillikProjeksiyonlar: YillikProjeksiyon[] = []
    let mevcutDeger = F
    let mevcutKira = yillikNetKira
    let kumulatifKira = 0
    let kalanKredi = K
    
    for (let yil = 1; yil <= n; yil++) {
      const oncekiDeger = mevcutDeger
      mevcutDeger = F * Math.pow(1 + d, yil)
      const degerArtisi = mevcutDeger - oncekiDeger
      
      const yillikKiraGeliri = K_ay > 0 ? K_ay * 12 * Math.pow(1 + kiraArtis, yil - 1) : 0
      const yillikGiderlerHesap = (G_ay * 12) + (mevcutDeger * g_yillik)
      const netKira = yillikKiraGeliri - yillikGiderlerHesap
      kumulatifKira += netKira
      
      const projeksiyon: YillikProjeksiyon = {
        yil,
        gayrimenkulDegeri: mevcutDeger,
        degerArtisi,
        yillikKiraGeliri,
        yillikGiderler: yillikGiderlerHesap,
        netKiraGeliri: netKira,
        kumulatifKiraGeliri: kumulatifKira
      }
      
      // Kredi varsa ek bilgiler
      if (krediKullaniyorum && K > 0) {
        const yillikTaksit = T * 12
        projeksiyon.yillikTaksitOdemesi = yillikTaksit
        projeksiyon.netNakitAkisi = netKira - yillikTaksit
        // Basit amortisman (gerçek hesap için faiz oranı gerekir)
        const yillikAnaPara = K / n
        kalanKredi = Math.max(0, kalanKredi - yillikAnaPara)
        projeksiyon.kalanKrediBorcu = kalanKredi
      }
      
      yillikProjeksiyonlar.push(projeksiyon)
    }
    
    // G. Özet Metrikleri
    const toplamYatirim = krediKullaniyorum ? ozSermaye : F
    const toplamGetiri = toplamNominalGetiri
    const netKar = toplamGetiri - (krediKullaniyorum ? toplamFaizOdemesi : 0)
    const karMarji = toplamYatirim > 0 ? (netKar / toplamYatirim) * 100 : 0
    
    // Değerlendirmeler
    let kiraCarpaniDegerlendirme: 'kisa' | 'orta' | 'uzun'
    if (kiraCarpaniYil <= 12) {
      kiraCarpaniDegerlendirme = 'kisa'
    } else if (kiraCarpaniYil <= 20) {
      kiraCarpaniDegerlendirme = 'orta'
    } else {
      kiraCarpaniDegerlendirme = 'uzun'
    }
    
    let getiriDegerlendirme: 'zayif' | 'orta' | 'iyi' | 'cok-iyi'
    if (yillikNetKiraGetirisi < 3) {
      getiriDegerlendirme = 'zayif'
    } else if (yillikNetKiraGetirisi < 5) {
      getiriDegerlendirme = 'orta'
    } else if (yillikNetKiraGetirisi < 7) {
      getiriDegerlendirme = 'iyi'
    } else {
      getiriDegerlendirme = 'cok-iyi'
    }
    
    setSonuclar({
      yillikBrutKira,
      kiraCarpaniAy,
      kiraCarpaniYil,
      yillikGider,
      yillikNetKira,
      yillikNetKiraGetirisi,
      geriDonusSuresi,
      nYilSonraFiyat,
      toplamKiraGeliri,
      toplamNominalGetiri,
      ortalamaYillikGetiri,
      cagr,
      reelGetiri,
      ozSermaye,
      aylikNetNakitAkisi,
      yillikNetNakitAkisi,
      cashOnCash,
      toplamKrediOdemesi,
      toplamFaizOdemesi,
      yillikProjeksiyonlar,
      toplamYatirim,
      toplamGetiri,
      netKar,
      karMarji,
      kiraCarpaniDegerlendirme,
      getiriDegerlendirme
    })
    
    setAktifTab('sonuc')
  }

  // Sıfırla
  const sifirla = () => {
    setSatinAlmaFiyati('')
    setAylikKira('')
    setAylikGiderler('')
    setYillikGiderOrani('1')
    setYillikDegerArtisi('20')
    setYillikEnflasyon('40')
    setYatirimSuresi('5')
    setYillikKiraArtisi('25')
    setKrediKullaniyorum(false)
    setKrediTutari('')
    setAylikTaksit('')
    setSonuclar(null)
    setAktifTab('giris')
  }

  // Değerlendirme renkleri
  const getDegerlendirmeRenk = (tip: string) => {
    switch (tip) {
      case 'kisa':
      case 'cok-iyi':
        return 'bg-green-100 text-green-700 border-green-300'
      case 'orta':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300'
      case 'uzun':
      case 'zayif':
        return 'bg-red-100 text-red-700 border-red-300'
      case 'iyi':
        return 'bg-blue-100 text-blue-700 border-blue-300'
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300'
    }
  }

  const getDegerlendirmeLabel = (tip: string) => {
    switch (tip) {
      case 'kisa': return 'Kısa Geri Dönüş'
      case 'orta': return 'Orta Geri Dönüş'
      case 'uzun': return 'Uzun Geri Dönüş'
      case 'zayif': return 'Zayıf'
      case 'iyi': return 'İyi'
      case 'cok-iyi': return 'Çok İyi'
      default: return 'Orta'
    }
  }

  // Rapor yazdırma fonksiyonu
  const raporYazdir = () => {
    const printContent = document.getElementById('yatirim-raporu')
    if (!printContent) return
    
    const printWindow = window.open('', '_blank')
    if (!printWindow) return
    
    const selectedTip = gayrimenkulTipleri.find(t => t.value === gayrimenkulTipi)
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Yatırım Analiz Raporu - KolayHesapla.org</title>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; color: #1e293b; }
          h1 { color: #059669; border-bottom: 3px solid #059669; padding-bottom: 10px; }
          h2 { color: #0f766e; margin-top: 30px; }
          .header { text-align: center; margin-bottom: 30px; }
          .logo { font-size: 24px; font-weight: bold; color: #059669; }
          .date { color: #64748b; font-size: 14px; margin-top: 5px; }
          .section { background: #f8fafc; padding: 20px; border-radius: 10px; margin: 15px 0; border-left: 4px solid #059669; }
          .metric { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e2e8f0; }
          .metric:last-child { border-bottom: none; }
          .metric-label { color: #64748b; }
          .metric-value { font-weight: bold; color: #1e293b; }
          .highlight { background: linear-gradient(135deg, #ecfdf5, #d1fae5); padding: 15px; border-radius: 8px; margin: 10px 0; }
          .good { color: #059669; }
          .bad { color: #dc2626; }
          .table { width: 100%; border-collapse: collapse; margin: 15px 0; }
          .table th, .table td { padding: 10px; text-align: right; border: 1px solid #e2e8f0; }
          .table th { background: #f1f5f9; font-weight: 600; }
          .table td:first-child, .table th:first-child { text-align: left; }
          .footer { margin-top: 40px; text-align: center; color: #94a3b8; font-size: 12px; border-top: 1px solid #e2e8f0; padding-top: 20px; }
          @media print { body { padding: 20px; } }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">🏠 KolayHesapla.org</div>
          <h1>Konut ve Arsa Yatırım Analiz Raporu</h1>
          <div class="date">Rapor Tarihi: ${new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
        </div>
        
        <h2>📋 Gayrimenkul Bilgileri</h2>
        <div class="section">
          <div class="metric"><span class="metric-label">Gayrimenkul Tipi:</span><span class="metric-value">${selectedTip?.label || 'Konut'}</span></div>
          <div class="metric"><span class="metric-label">Satın Alma Fiyatı:</span><span class="metric-value">${formatPara(parseFloat(satinAlmaFiyati) || 0)}</span></div>
          ${kiralabilir ? `<div class="metric"><span class="metric-label">Aylık Kira Geliri:</span><span class="metric-value">${formatPara(parseFloat(aylikKira) || 0)}</span></div>` : ''}
          <div class="metric"><span class="metric-label">Beklenen Yıllık Değer Artışı:</span><span class="metric-value">%${yillikDegerArtisi}</span></div>
          <div class="metric"><span class="metric-label">Yatırım Süresi:</span><span class="metric-value">${yatirimSuresi} Yıl</span></div>
        </div>
        
        ${sonuclar ? `
        <h2>📊 Temel Göstergeler</h2>
        <div class="section">
          ${kiralabilir ? `
          <div class="metric"><span class="metric-label">Kira Çarpanı:</span><span class="metric-value">${sonuclar.kiraCarpaniAy.toFixed(0)} Ay (${sonuclar.kiraCarpaniYil.toFixed(1)} Yıl)</span></div>
          <div class="metric"><span class="metric-label">Geri Dönüş Süresi:</span><span class="metric-value">${sonuclar.geriDonusSuresi.toFixed(1)} Yıl</span></div>
          <div class="metric"><span class="metric-label">Yıllık Net Kira Getirisi:</span><span class="metric-value ${sonuclar.yillikNetKiraGetirisi >= 5 ? 'good' : ''}">${formatYuzde(sonuclar.yillikNetKiraGetirisi)}</span></div>
          ` : ''}
          <div class="metric"><span class="metric-label">CAGR (Bileşik Yıllık Getiri):</span><span class="metric-value ${sonuclar.cagr >= 10 ? 'good' : ''}">${formatYuzde(sonuclar.cagr)}</span></div>
          <div class="metric"><span class="metric-label">Reel Getiri (Enflasyon Sonrası):</span><span class="metric-value ${sonuclar.reelGetiri >= 0 ? 'good' : 'bad'}">${formatYuzde(sonuclar.reelGetiri)}</span></div>
        </div>
        
        <h2>💰 Yatırım Özeti (${yatirimSuresi} Yıl)</h2>
        <div class="highlight">
          <div class="metric"><span class="metric-label">Toplam Yatırım:</span><span class="metric-value">${formatPara(sonuclar.toplamYatirim)}</span></div>
          <div class="metric"><span class="metric-label">Beklenen Son Değer:</span><span class="metric-value">${formatPara(sonuclar.nYilSonraFiyat)}</span></div>
          ${kiralabilir ? `<div class="metric"><span class="metric-label">Toplam Kira Geliri:</span><span class="metric-value">${formatPara(sonuclar.toplamKiraGeliri)}</span></div>` : ''}
          <div class="metric"><span class="metric-label">Toplam Getiri:</span><span class="metric-value class="good">${formatPara(sonuclar.toplamGetiri)}</span></div>
          <div class="metric"><span class="metric-label">Net Kar:</span><span class="metric-value ${sonuclar.netKar >= 0 ? 'good' : 'bad'}">${formatPara(sonuclar.netKar)}</span></div>
        </div>
        
        ${krediKullaniyorum ? `
        <h2>🏦 Kredi Bilgileri</h2>
        <div class="section">
          <div class="metric"><span class="metric-label">Kredi Tutarı:</span><span class="metric-value">${formatPara(parseFloat(krediTutari) || 0)}</span></div>
          <div class="metric"><span class="metric-label">Aylık Taksit:</span><span class="metric-value">${formatPara(parseFloat(aylikTaksit) || 0)}</span></div>
          <div class="metric"><span class="metric-label">Toplam Kredi Ödemesi:</span><span class="metric-value">${formatPara(sonuclar.toplamKrediOdemesi)}</span></div>
          <div class="metric"><span class="metric-label">Toplam Faiz:</span><span class="metric-value class="bad">${formatPara(sonuclar.toplamFaizOdemesi)}</span></div>
          <div class="metric"><span class="metric-label">Cash-on-Cash Getiri:</span><span class="metric-value">${formatYuzde(sonuclar.cashOnCash)}</span></div>
        </div>
        ` : ''}
        
        <h2>📈 Yıllık Projeksiyon</h2>
        <table class="table">
          <tr>
            <th>Yıl</th>
            <th>Gayrimenkul Değeri</th>
            <th>Değer Artışı</th>
            ${kiralabilir ? '<th>Kira Geliri</th><th>Net Kira</th>' : ''}
            <th>Kümülatif Kira</th>
          </tr>
          ${sonuclar.yillikProjeksiyonlar.map(p => `
            <tr>
              <td>${p.yil}. Yıl</td>
              <td>${formatPara(p.gayrimenkulDegeri)}</td>
              <td>+${formatPara(p.degerArtisi)}</td>
              ${kiralabilir ? `<td>${formatPara(p.yillikKiraGeliri)}</td><td>${formatPara(p.netKiraGeliri)}</td>` : ''}
              <td>${formatPara(p.kumulatifKiraGeliri)}</td>
            </tr>
          `).join('')}
        </table>
        ` : ''}
        
        <div class="footer">
          <p>Bu rapor KolayHesapla.org tarafından oluşturulmuştur.</p>
          <p>Hesaplamalar tahmini değerlerdir ve gerçek sonuçlardan farklılık gösterebilir.</p>
          <p>© ${new Date().getFullYear()} KolayHesapla.org - Tüm hakları saklıdır.</p>
        </div>
      </body>
      </html>
    `)
    
    printWindow.document.close()
    printWindow.focus()
    setTimeout(() => {
      printWindow.print()
    }, 500)
  }

  return (
    <div className="space-y-6" id="yatirim-raporu">
      {/* Ana Kart */}
      <Card className="border-0 shadow-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-br from-emerald-600 via-teal-500 to-cyan-500 text-white p-6 relative overflow-hidden">
          {/* Dekoratif arka plan deseni */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
          </div>
          <div className="relative z-10">
            {/* Üst kısım - Ana Sayfa butonu sol üstte */}
            <div className="flex items-center justify-start mb-4">
              <Link href="/">
                <Button variant="outline" size="sm" className="bg-white/10 border-white/30 text-white hover:bg-white/20 gap-2">
                  <Home className="h-4 w-4" />
                  Ana Sayfaya Dön
                </Button>
              </Link>
            </div>
            {/* Başlık kısmı */}
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Building2 className="h-8 w-8" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold">Konut ve Arsa Yatırım Getirisi</CardTitle>
                <p className="text-emerald-100 text-sm mt-1 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Geri Dönüş Süresi Hesaplama
                </p>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6 bg-gradient-to-b from-slate-50 to-white">
          <Tabs value={aktifTab} onValueChange={setAktifTab}>
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-slate-100 p-1 rounded-xl">
              <TabsTrigger value="giris" className="gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md transition-all">
                <Calculator className="h-4 w-4" />
                Bilgi Girişi
              </TabsTrigger>
              <TabsTrigger value="sonuc" className="gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md transition-all" disabled={!sonuclar}>
                <BarChart3 className="h-4 w-4" />
                Sonuçlar
              </TabsTrigger>
            </TabsList>

            {/* Giriş Sekmesi */}
            <TabsContent value="giris" className="space-y-6">
              {/* Gayrimenkul Tipi Seçimi */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-base font-semibold">
                  <Building2 className="h-5 w-5 text-emerald-600" />
                  Gayrimenkul Tipi
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {gayrimenkulTipleri.map((tip) => {
                    const Icon = tip.icon
                    return (
                      <Button
                        key={tip.value}
                        type="button"
                        variant={gayrimenkulTipi === tip.value ? 'default' : 'outline'}
                        onClick={() => setGayrimenkulTipi(tip.value)}
                        className={`h-auto py-3 flex flex-col gap-1 ${
                          gayrimenkulTipi === tip.value 
                            ? 'bg-emerald-500 hover:bg-emerald-600' 
                            : 'hover:border-emerald-300'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="text-sm">{tip.label}</span>
                      </Button>
                    )
                  })}
                </div>
              </div>

              {/* Temel Bilgiler */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-emerald-600" />
                    Satın Alma Fiyatı (TL)
                  </Label>
                  <Input
                    type="number"
                    value={satinAlmaFiyati}
                    onChange={(e) => setSatinAlmaFiyati(e.target.value)}
                    placeholder="örn: 3000000"
                  />
                </div>

                {kiralabilir && (
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Banknote className="h-4 w-4 text-emerald-600" />
                      Aylık Kira (TL)
                    </Label>
                    <Input
                      type="number"
                      value={aylikKira}
                      onChange={(e) => setAylikKira(e.target.value)}
                      placeholder="örn: 15000"
                    />
                  </div>
                )}
              </div>

              {/* Giderler */}
              {kiralabilir && (
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Wallet className="h-4 w-4 text-orange-500" />
                      Aylık Giderler (Aidat, vs.) (TL)
                    </Label>
                    <Input
                      type="number"
                      value={aylikGiderler}
                      onChange={(e) => setAylikGiderler(e.target.value)}
                      placeholder="örn: 1500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Percent className="h-4 w-4 text-orange-500" />
                      Yıllık Diğer Gider Oranı (%)
                    </Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={yillikGiderOrani}
                      onChange={(e) => setYillikGiderOrani(e.target.value)}
                      placeholder="örn: 1"
                    />
                    <p className="text-xs text-slate-500">Emlak vergisi, bakım vs.</p>
                  </div>
                </div>
              )}

              {/* Değer Artışı & Enflasyon */}
              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-4 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Değer Artışı & Projeksiyon
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm">Yıllık Değer Artışı (%)</Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={yillikDegerArtisi}
                      onChange={(e) => setYillikDegerArtisi(e.target.value)}
                      placeholder="örn: 20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Yıllık Enflasyon (%)</Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={yillikEnflasyon}
                      onChange={(e) => setYillikEnflasyon(e.target.value)}
                      placeholder="örn: 40"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Yatırım Süresi (Yıl)</Label>
                    <Input
                      type="number"
                      value={yatirimSuresi}
                      onChange={(e) => setYatirimSuresi(e.target.value)}
                      placeholder="örn: 5"
                    />
                  </div>
                  {kiralabilir && (
                    <div className="space-y-2">
                      <Label className="text-sm">Yıllık Kira Artışı (%)</Label>
                      <Input
                        type="number"
                        step="0.1"
                        value={yillikKiraArtisi}
                        onChange={(e) => setYillikKiraArtisi(e.target.value)}
                        placeholder="örn: 25"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Kredi Bölümü */}
              <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-purple-800 flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Kredi Kullanımı
                  </h3>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="kredi-switch" className="text-sm text-purple-700">
                      Kredi kullanıyorum
                    </Label>
                    <Switch
                      id="kredi-switch"
                      checked={krediKullaniyorum}
                      onCheckedChange={setKrediKullaniyorum}
                    />
                  </div>
                </div>
                
                {krediKullaniyorum && (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm">Kredi Tutarı (TL)</Label>
                      <Input
                        type="number"
                        value={krediTutari}
                        onChange={(e) => setKrediTutari(e.target.value)}
                        placeholder="örn: 2000000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Aylık Taksit (TL)</Label>
                      <Input
                        type="number"
                        value={aylikTaksit}
                        onChange={(e) => setAylikTaksit(e.target.value)}
                        placeholder="örn: 45000"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Butonlar */}
              <div className="flex gap-3">
                <Button 
                  onClick={hesapla} 
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
                  disabled={!satinAlmaFiyati || (kiralabilir && !aylikKira)}
                >
                  <Calculator className="mr-2 h-5 w-5" />
                  Hesapla
                </Button>
                <Button variant="outline" onClick={sifirla} className="gap-2">
                  <RotateCcw className="h-4 w-4" />
                  Sıfırla
                </Button>
              </div>
            </TabsContent>

            {/* Sonuç Sekmesi */}
            <TabsContent value="sonuc" className="space-y-6">
              {sonuclar && (
                <>
                  {/* Özet Kartı */}
                  <Card className="border-2 border-emerald-300 bg-gradient-to-br from-emerald-50 to-teal-50">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2 text-emerald-800">
                        <Target className="h-5 w-5" />
                        {gayrimenkulTipi === 'konut' ? 'Konut' : 
                         gayrimenkulTipi === 'arsa' ? 'Arsa' :
                         gayrimenkulTipi === 'isyeri' ? 'İş Yeri' : 'Depo'} Yatırımının Özeti
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {kiralabilir && (
                        <>
                          {/* Kira Çarpanı */}
                          <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                            <div className="flex items-center gap-2">
                              <Clock className="h-5 w-5 text-blue-500" />
                              <span className="font-medium">Kira Çarpanı</span>
                            </div>
                            <div className="text-right">
                              <p className="text-xl font-bold text-blue-600">
                                {sonuclar.kiraCarpaniAy.toFixed(0)} ay
                              </p>
                              <p className="text-sm text-slate-500">
                                (~{sonuclar.kiraCarpaniYil.toFixed(1)} yıl)
                              </p>
                            </div>
                            <Badge className={getDegerlendirmeRenk(sonuclar.kiraCarpaniDegerlendirme)}>
                              {getDegerlendirmeLabel(sonuclar.kiraCarpaniDegerlendirme)}
                            </Badge>
                          </div>

                          {/* Yıllık Net Kira Getirisi */}
                          <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                            <div className="flex items-center gap-2">
                              <Percent className="h-5 w-5 text-green-500" />
                              <span className="font-medium">Yıllık Net Kira Getirisi</span>
                            </div>
                            <div className="text-right">
                              <p className="text-xl font-bold text-green-600">
                                {formatYuzde(sonuclar.yillikNetKiraGetirisi)}
                              </p>
                              <p className="text-sm text-slate-500">
                                {formatPara(sonuclar.yillikNetKira)}/yıl
                              </p>
                            </div>
                            <Badge className={getDegerlendirmeRenk(sonuclar.getiriDegerlendirme)}>
                              {getDegerlendirmeLabel(sonuclar.getiriDegerlendirme)}
                            </Badge>
                          </div>

                          {/* Geri Dönüş Süresi */}
                          <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-5 w-5 text-purple-500" />
                              <span className="font-medium">Geri Dönüş Süresi</span>
                            </div>
                            <p className="text-xl font-bold text-purple-600">
                              {sonuclar.geriDonusSuresi.toFixed(1)} yıl
                            </p>
                          </div>
                        </>
                      )}

                      {/* Değer Artışı Dahil Getiri */}
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-5 w-5 text-indigo-500" />
                          <span className="font-medium">{yatirimSuresi} Yıl Sonra Toplam Getiri</span>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-indigo-600">
                            {formatPara(sonuclar.toplamNominalGetiri)}
                          </p>
                          <p className="text-sm text-slate-500">
                            CAGR: {formatYuzde(sonuclar.cagr)}
                          </p>
                        </div>
                      </div>

                      {/* Reel Getiri */}
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                        <div className="flex items-center gap-2">
                          <BarChart3 className="h-5 w-5 text-orange-500" />
                          <span className="font-medium">Enflasyon Sonrası Reel Getiri</span>
                        </div>
                        <p className={`text-xl font-bold ${sonuclar.reelGetiri >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {formatYuzde(sonuclar.reelGetiri)}
                          <span className="text-sm text-slate-500 font-normal ml-1">/yıl</span>
                        </p>
                      </div>

                      {/* Kredi Kullanıyorsa */}
                      {krediKullaniyorum && (
                        <div className="p-4 bg-purple-100 rounded-lg border border-purple-300">
                          <h4 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
                            <CreditCard className="h-4 w-4" />
                            Kredi ile Yatırım Analizi
                          </h4>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-purple-600">Öz Sermaye</p>
                              <p className="text-lg font-bold text-purple-800">
                                {formatPara(sonuclar.ozSermaye)}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-purple-600">Aylık Net Nakit Akışı</p>
                              <p className={`text-lg font-bold ${sonuclar.aylikNetNakitAkisi >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                                {formatPara(sonuclar.aylikNetNakitAkisi)}
                              </p>
                            </div>
                            <div className="md:col-span-2">
                              <p className="text-sm text-purple-600">Öz Sermaye Getirisi (Cash-on-Cash)</p>
                              <p className={`text-2xl font-bold ${sonuclar.cashOnCash >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                                {formatYuzde(sonuclar.cashOnCash)}
                                <span className="text-sm font-normal ml-1">/yıl</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Detay Kartları */}
                  <div className="grid md:grid-cols-3 gap-4">
                    {kiralabilir && (
                      <Card className="border-blue-200">
                        <CardContent className="pt-6 text-center">
                          <Banknote className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                          <p className="text-sm text-slate-500">Yıllık Brüt Kira</p>
                          <p className="text-2xl font-bold text-blue-600">
                            {formatPara(sonuclar.yillikBrutKira)}
                          </p>
                        </CardContent>
                      </Card>
                    )}
                    
                    <Card className="border-orange-200">
                      <CardContent className="pt-6 text-center">
                        <Wallet className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                        <p className="text-sm text-slate-500">Yıllık Giderler</p>
                        <p className="text-2xl font-bold text-orange-600">
                          {formatPara(sonuclar.yillikGider)}
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-emerald-200">
                      <CardContent className="pt-6 text-center">
                        <CircleDollarSign className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
                        <p className="text-sm text-slate-500">{yatirimSuresi} Yıl Sonra Değer</p>
                        <p className="text-2xl font-bold text-emerald-600">
                          {formatPara(sonuclar.nYilSonraFiyat)}
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Yorum Kutusu */}
                  <Card className="border-slate-200 bg-slate-50">
                    <CardContent className="pt-6">
                      <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                        <Info className="h-5 w-5 text-slate-600" />
                        Değerlendirme
                      </h4>
                      <div className="space-y-2 text-sm text-slate-700">
                        {kiralabilir && (
                          <>
                            <p className="flex items-start gap-2">
                              <span className="text-blue-500">•</span>
                              Bu yatırım kira çarpanı açısından{' '}
                              <strong>
                                {sonuclar.kiraCarpaniDegerlendirme === 'kisa' ? 'kısa' :
                                 sonuclar.kiraCarpaniDegerlendirme === 'orta' ? 'orta' : 'uzun'}
                              </strong>{' '}
                              geri dönüşlü görünüyor.
                            </p>
                            <p className="flex items-start gap-2">
                              <span className="text-green-500">•</span>
                              Yıllık net kira getiriniz Türkiye ortalamasına kıyasla{' '}
                              <strong>
                                {sonuclar.getiriDegerlendirme === 'zayif' ? 'zayıf' :
                                 sonuclar.getiriDegerlendirme === 'orta' ? 'orta' :
                                 sonuclar.getiriDegerlendirme === 'iyi' ? 'iyi' : 'çok iyi'}
                              </strong>{' '}
                              seviyede.
                            </p>
                          </>
                        )}
                        <p className="flex items-start gap-2">
                          <span className="text-purple-500">•</span>
                          {yatirimSuresi} yıl sonraki beklenen toplam getiri, enflasyon sonrası{' '}
                          <strong className={sonuclar.reelGetiri >= 0 ? 'text-green-700' : 'text-red-700'}>
                            {sonuclar.reelGetiri >= 10 ? 'çok iyi' :
                             sonuclar.reelGetiri >= 5 ? 'iyi' :
                             sonuclar.reelGetiri >= 0 ? 'makul' : 'negatif'}
                          </strong>{' '}
                          görünüyor.
                        </p>
                        {krediKullaniyorum && (
                          <p className="flex items-start gap-2">
                            <span className="text-pink-500">•</span>
                            Kredi kullanarak yaptığınız bu yatırımda, öz sermayeniz üzerinden yıllık yaklaşık{' '}
                            <strong className={sonuclar.cashOnCash >= 0 ? 'text-green-700' : 'text-red-700'}>
                              {formatYuzde(sonuclar.cashOnCash)}
                            </strong>{' '}
                            getiri elde ediyorsunuz.
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Yatırım Özeti Kartı */}
                  <Card className="border-2 border-indigo-200">
                    <CardHeader className="bg-gradient-to-r from-indigo-100 to-purple-100">
                      <CardTitle className="flex items-center gap-2 text-indigo-800 text-lg">
                        <Scale className="h-5 w-5" />
                        Yatırım Özeti ({yatirimSuresi} Yıl)
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 text-center">
                          <p className="text-xs text-blue-600 mb-1">Toplam Yatırım</p>
                          <p className="text-lg font-bold text-blue-800">
                            {formatPara(sonuclar.toplamYatirim)}
                          </p>
                          {krediKullaniyorum && (
                            <p className="text-xs text-blue-500 mt-1">Öz sermaye</p>
                          )}
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg border border-green-200 text-center">
                          <p className="text-xs text-green-600 mb-1">Toplam Getiri</p>
                          <p className="text-lg font-bold text-green-800">
                            {formatPara(sonuclar.toplamGetiri)}
                          </p>
                          <p className="text-xs text-green-500 mt-1">Değer artışı + Kira</p>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-lg border border-purple-200 text-center">
                          <p className="text-xs text-purple-600 mb-1">Net Kar</p>
                          <p className={`text-lg font-bold ${sonuclar.netKar >= 0 ? 'text-purple-800' : 'text-red-600'}`}>
                            {formatPara(sonuclar.netKar)}
                          </p>
                          {krediKullaniyorum && (
                            <p className="text-xs text-purple-500 mt-1">Faiz düşülmüş</p>
                          )}
                        </div>
                        <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-center">
                          <p className="text-xs text-amber-600 mb-1">Kar Marjı</p>
                          <p className={`text-lg font-bold ${sonuclar.karMarji >= 0 ? 'text-amber-800' : 'text-red-600'}`}>
                            {formatYuzde(sonuclar.karMarji)}
                          </p>
                          <p className="text-xs text-amber-500 mt-1">{yatirimSuresi} yıl toplam</p>
                        </div>
                      </div>
                      
                      {/* Kredi Özeti */}
                      {krediKullaniyorum && sonuclar.toplamKrediOdemesi > 0 && (
                        <div className="mt-4 p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg border border-pink-200">
                          <h4 className="text-sm font-semibold text-pink-800 mb-3 flex items-center gap-2">
                            <CreditCard className="h-4 w-4" />
                            Kredi Detayları ({yatirimSuresi} Yıl)
                          </h4>
                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                              <p className="text-xs text-pink-600">Toplam Kredi Ödemesi</p>
                              <p className="font-bold text-pink-800">{formatPara(sonuclar.toplamKrediOdemesi)}</p>
                            </div>
                            <div>
                              <p className="text-xs text-pink-600">Toplam Faiz Ödemesi</p>
                              <p className="font-bold text-red-600">{formatPara(sonuclar.toplamFaizOdemesi)}</p>
                            </div>
                            <div>
                              <p className="text-xs text-pink-600">Ana Para</p>
                              <p className="font-bold text-pink-800">{formatPara(parseFloat(krediTutari) || 0)}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Yıllık Projeksiyon Tablosu */}
                  <Card className="border-2 border-slate-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-slate-800 text-lg">
                        <TableIcon className="h-5 w-5" />
                        Yıllık Projeksiyon Tablosu
                      </CardTitle>
                      <p className="text-sm text-slate-500">
                        {yatirimSuresi} yıllık detaylı gelir-gider analizi
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-slate-50">
                              <TableHead className="font-bold">Yıl</TableHead>
                              <TableHead className="text-right font-bold">Gayrimenkul Değeri</TableHead>
                              <TableHead className="text-right font-bold">Değer Artışı</TableHead>
                              {kiralabilir && (
                                <>
                                  <TableHead className="text-right font-bold">Kira Geliri</TableHead>
                                  <TableHead className="text-right font-bold">Giderler</TableHead>
                                  <TableHead className="text-right font-bold">Net Kira</TableHead>
                                </>
                              )}
                              {krediKullaniyorum && (
                                <>
                                  <TableHead className="text-right font-bold">Taksit Ödemesi</TableHead>
                                  <TableHead className="text-right font-bold">Net Nakit Akışı</TableHead>
                                </>
                              )}
                              <TableHead className="text-right font-bold">Kümülatif Kira</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {sonuclar.yillikProjeksiyonlar.map((proj) => (
                              <TableRow key={proj.yil} className={proj.yil % 2 === 0 ? 'bg-slate-50/50' : ''}>
                                <TableCell className="font-medium">{proj.yil}. Yıl</TableCell>
                                <TableCell className="text-right">{formatPara(proj.gayrimenkulDegeri)}</TableCell>
                                <TableCell className="text-right text-green-600">+{formatPara(proj.degerArtisi)}</TableCell>
                                {kiralabilir && (
                                  <>
                                    <TableCell className="text-right">{formatPara(proj.yillikKiraGeliri)}</TableCell>
                                    <TableCell className="text-right text-red-600">-{formatPara(proj.yillikGiderler)}</TableCell>
                                    <TableCell className="text-right text-blue-600">{formatPara(proj.netKiraGeliri)}</TableCell>
                                  </>
                                )}
                                {krediKullaniyorum && (
                                  <>
                                    <TableCell className="text-right text-orange-600">-{formatPara(proj.yillikTaksitOdemesi || 0)}</TableCell>
                                    <TableCell className={`text-right font-medium ${(proj.netNakitAkisi || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                      {formatPara(proj.netNakitAkisi || 0)}
                                    </TableCell>
                                  </>
                                )}
                                <TableCell className="text-right font-medium text-purple-600">{formatPara(proj.kumulatifKiraGeliri)}</TableCell>
                              </TableRow>
                            ))}
                            {/* Toplam Satırı */}
                            <TableRow className="bg-emerald-50 font-bold border-t-2">
                              <TableCell>TOPLAM</TableCell>
                              <TableCell className="text-right">{formatPara(sonuclar.nYilSonraFiyat)}</TableCell>
                              <TableCell className="text-right text-green-700">
                                +{formatPara(sonuclar.nYilSonraFiyat - parseFloat(satinAlmaFiyati))}
                              </TableCell>
                              {kiralabilir && (
                                <>
                                  <TableCell className="text-right">
                                    {formatPara(sonuclar.yillikProjeksiyonlar.reduce((sum, p) => sum + p.yillikKiraGeliri, 0))}
                                  </TableCell>
                                  <TableCell className="text-right text-red-700">
                                    -{formatPara(sonuclar.yillikProjeksiyonlar.reduce((sum, p) => sum + p.yillikGiderler, 0))}
                                  </TableCell>
                                  <TableCell className="text-right text-blue-700">{formatPara(sonuclar.toplamKiraGeliri)}</TableCell>
                                </>
                              )}
                              {krediKullaniyorum && (
                                <>
                                  <TableCell className="text-right text-orange-700">-{formatPara(sonuclar.toplamKrediOdemesi)}</TableCell>
                                  <TableCell className={`text-right ${sonuclar.toplamKiraGeliri - sonuclar.toplamKrediOdemesi >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                                    {formatPara(sonuclar.toplamKiraGeliri - sonuclar.toplamKrediOdemesi)}
                                  </TableCell>
                                </>
                              )}
                              <TableCell className="text-right text-purple-700">{formatPara(sonuclar.toplamKiraGeliri)}</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                      
                      {/* Tablo Açıklama */}
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-xs text-blue-700 flex items-center gap-2">
                          <Info className="h-4 w-4" />
                          <span>
                            Değerler tahminidir. Gerçek sonuçlar piyasa koşullarına, ekonomik faktörlere ve 
                            gayrimenkul özelliklerine göre değişebilir.
                          </span>
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Karşılaştırma Tablosu */}
                  <Card className="border-2 border-amber-200">
                    <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50">
                      <CardTitle className="flex items-center gap-2 text-amber-800 text-lg">
                        <Coins className="h-5 w-5" />
                        Alternatif Yatırım Karşılaştırması
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-amber-50">
                              <TableHead className="font-bold">Yatırım Türü</TableHead>
                              <TableHead className="text-right font-bold">Yıllık Getiri</TableHead>
                              <TableHead className="text-right font-bold">{yatirimSuresi} Yıl Sonra</TableHead>
                              <TableHead className="text-right font-bold">Toplam Getiri</TableHead>
                              <TableHead className="text-center font-bold">Değerlendirme</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {/* Bu Yatırım */}
                            <TableRow className="bg-emerald-50">
                              <TableCell className="font-bold text-emerald-700">
                                🏠 Bu Gayrimenkul
                              </TableCell>
                              <TableCell className="text-right font-bold text-emerald-700">
                                {formatYuzde(sonuclar.cagr)}
                              </TableCell>
                              <TableCell className="text-right font-bold text-emerald-700">
                                {formatPara(sonuclar.nYilSonraFiyat + sonuclar.toplamKiraGeliri)}
                              </TableCell>
                              <TableCell className="text-right font-bold text-emerald-700">
                                {formatPara(sonuclar.toplamNominalGetiri)}
                              </TableCell>
                              <TableCell className="text-center">
                                <Badge className={
                                  sonuclar.reelGetiri >= 10 ? 'bg-green-500' :
                                  sonuclar.reelGetiri >= 5 ? 'bg-blue-500' :
                                  sonuclar.reelGetiri >= 0 ? 'bg-yellow-500' : 'bg-red-500'
                                }>
                                  {sonuclar.reelGetiri >= 10 ? 'Çok İyi' :
                                   sonuclar.reelGetiri >= 5 ? 'İyi' :
                                   sonuclar.reelGetiri >= 0 ? 'Orta' : 'Düşük'}
                                </Badge>
                              </TableCell>
                            </TableRow>
                            {/* Mevduat */}
                            {(() => {
                              const mevduatFaizi = 0.45 // %45
                              const mevduatSonDeger = parseFloat(satinAlmaFiyati) * Math.pow(1 + mevduatFaizi, parseInt(yatirimSuresi))
                              const mevduatGetiri = mevduatSonDeger - parseFloat(satinAlmaFiyati)
                              const mevduatReel = ((1 + mevduatFaizi) / (1 + parseFloat(yillikEnflasyon)/100) - 1) * 100
                              return (
                                <TableRow>
                                  <TableCell className="font-medium">💰 Vadeli Mevduat (%45)</TableCell>
                                  <TableCell className="text-right">%45.00</TableCell>
                                  <TableCell className="text-right">{formatPara(mevduatSonDeger)}</TableCell>
                                  <TableCell className="text-right">{formatPara(mevduatGetiri)}</TableCell>
                                  <TableCell className="text-center">
                                    <Badge className={mevduatReel >= 0 ? 'bg-blue-500' : 'bg-red-500'}>
                                      {mevduatReel >= 0 ? 'Orta' : 'Düşük'}
                                    </Badge>
                                  </TableCell>
                                </TableRow>
                              )
                            })()}
                            {/* Altın */}
                            {(() => {
                              const altinGetiri = 0.35 // %35 varsayım
                              const altinSonDeger = parseFloat(satinAlmaFiyati) * Math.pow(1 + altinGetiri, parseInt(yatirimSuresi))
                              const altinKar = altinSonDeger - parseFloat(satinAlmaFiyati)
                              return (
                                <TableRow>
                                  <TableCell className="font-medium">🥇 Altın (~%35)</TableCell>
                                  <TableCell className="text-right">~%35.00</TableCell>
                                  <TableCell className="text-right">{formatPara(altinSonDeger)}</TableCell>
                                  <TableCell className="text-right">{formatPara(altinKar)}</TableCell>
                                  <TableCell className="text-center">
                                    <Badge className="bg-yellow-500">Orta</Badge>
                                  </TableCell>
                                </TableRow>
                              )
                            })()}
                            {/* Enflasyon */}
                            {(() => {
                              const enfDeger = parseFloat(satinAlmaFiyati) * Math.pow(1 + parseFloat(yillikEnflasyon)/100, parseInt(yatirimSuresi))
                              return (
                                <TableRow className="bg-red-50">
                                  <TableCell className="font-medium text-red-600">📉 Enflasyon Etkisi</TableCell>
                                  <TableCell className="text-right text-red-600">%{yillikEnflasyon}</TableCell>
                                  <TableCell className="text-right text-red-600">{formatPara(enfDeger)}</TableCell>
                                  <TableCell className="text-right text-red-600">
                                    Paranın değer kaybı
                                  </TableCell>
                                  <TableCell className="text-center">
                                    <Badge className="bg-red-500">Referans</Badge>
                                  </TableCell>
                                </TableRow>
                              )
                            })()}
                          </TableBody>
                        </Table>
                      </div>
                      <p className="text-xs text-amber-700 mt-3">
                        * Karşılaştırma amaçlıdır. Gerçek getiriler farklılık gösterebilir.
                      </p>
                    </CardContent>
                  </Card>

                  {/* Grafikler */}
                  <Card className="border-2 border-violet-200">
                    <CardHeader className="bg-gradient-to-r from-violet-50 to-purple-50">
                      <CardTitle className="flex items-center gap-2 text-violet-800 text-lg">
                        <BarChart3 className="h-5 w-5" />
                        Yatırım Grafikleri
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4 space-y-6">
                      {/* Değer & Kira Grafiği */}
                      <div>
                        <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-emerald-500" />
                          Gayrimenkul Değeri ve Kümülatif Kira Geliri
                        </h4>
                        <div className="h-[300px] w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={sonuclar.yillikProjeksiyonlar}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                              <XAxis 
                                dataKey="yil" 
                                tickFormatter={(v) => `${v}. Yıl`}
                                tick={{ fontSize: 12 }}
                              />
                              <YAxis 
                                tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`}
                                tick={{ fontSize: 12 }}
                              />
                              <Tooltip 
                                formatter={(value: number, name: string) => [
                                  formatPara(value),
                                  name === 'gayrimenkulDegeri' ? 'Gayrimenkul Değeri' : 'Kümülatif Kira'
                                ]}
                                labelFormatter={(label) => `${label}. Yıl`}
                              />
                              <Legend 
                                formatter={(value) => value === 'gayrimenkulDegeri' ? 'Gayrimenkul Değeri' : 'Kümülatif Kira Geliri'}
                              />
                              <Area 
                                type="monotone" 
                                dataKey="gayrimenkulDegeri" 
                                fill="#10b981" 
                                fillOpacity={0.2}
                                stroke="#10b981"
                                strokeWidth={2}
                              />
                              <Line 
                                type="monotone" 
                                dataKey="kumulatifKiraGeliri" 
                                stroke="#8b5cf6" 
                                strokeWidth={3}
                                dot={{ r: 4 }}
                              />
                            </ComposedChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* Yıllık Getiri Grafiği */}
                      <div>
                        <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                          <Coins className="h-4 w-4 text-blue-500" />
                          Yıllık Kira Geliri ve Giderler
                        </h4>
                        <div className="h-[250px] w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={sonuclar.yillikProjeksiyonlar}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                              <XAxis 
                                dataKey="yil" 
                                tickFormatter={(v) => `${v}. Yıl`}
                                tick={{ fontSize: 12 }}
                              />
                              <YAxis 
                                tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
                                tick={{ fontSize: 12 }}
                              />
                              <Tooltip 
                                formatter={(value: number, name: string) => [
                                  formatPara(value),
                                  name === 'yillikKiraGeliri' ? 'Brüt Kira' : 
                                  name === 'netKiraGeliri' ? 'Net Kira' : 'Giderler'
                                ]}
                                labelFormatter={(label) => `${label}. Yıl`}
                              />
                              <Legend 
                                formatter={(value) => 
                                  value === 'yillikKiraGeliri' ? 'Brüt Kira Geliri' : 
                                  value === 'netKiraGeliri' ? 'Net Kira Geliri' : 'Giderler'
                                }
                              />
                              <Bar dataKey="yillikKiraGeliri" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                              <Bar dataKey="netKiraGeliri" fill="#10b981" radius={[4, 4, 0, 0]} />
                              <Bar dataKey="yillikGiderler" fill="#ef4444" radius={[4, 4, 0, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* Yatırım Karşılaştırma Grafiği */}
                      <div>
                        <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                          <Scale className="h-4 w-4 text-amber-500" />
                          Yatırım Alternatifi Karşılaştırması
                        </h4>
                        <div className="h-[250px] w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={(() => {
                              const F = parseFloat(satinAlmaFiyati)
                              const d = parseFloat(yillikDegerArtisi) / 100
                              const enf = parseFloat(yillikEnflasyon) / 100
                              const mevduatFaizi = 0.45
                              const altinGetiri = 0.35
                              
                              return Array.from({ length: parseInt(yatirimSuresi) + 1 }, (_, i) => ({
                                yil: i,
                                gayrimenkul: i === 0 ? F : sonuclar.yillikProjeksiyonlar[i-1]?.gayrimenkulDegeri + sonuclar.yillikProjeksiyonlar[i-1]?.kumulatifKiraGeliri || F,
                                mevduat: F * Math.pow(1 + mevduatFaizi, i),
                                altin: F * Math.pow(1 + altinGetiri, i),
                                enflasyon: F * Math.pow(1 + enf, i)
                              }))
                            })()}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                              <XAxis 
                                dataKey="yil" 
                                tickFormatter={(v) => v === 0 ? 'Başlangıç' : `${v}. Yıl`}
                                tick={{ fontSize: 12 }}
                              />
                              <YAxis 
                                tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`}
                                tick={{ fontSize: 12 }}
                              />
                              <Tooltip 
                                formatter={(value: number, name: string) => [
                                  formatPara(value),
                                  name === 'gayrimenkul' ? 'Gayrimenkul' : 
                                  name === 'mevduat' ? 'Vadeli Mevduat' : 
                                  name === 'altin' ? 'Altın' : 'Enflasyon'
                                ]}
                                labelFormatter={(label) => label === 0 ? 'Başlangıç' : `${label}. Yıl`}
                              />
                              <Legend 
                                formatter={(value) => 
                                  value === 'gayrimenkul' ? '🏠 Gayrimenkul' : 
                                  value === 'mevduat' ? '💰 Vadeli Mevduat' : 
                                  value === 'altin' ? '🥇 Altın' : '📉 Enflasyon'
                                }
                              />
                              <Line type="monotone" dataKey="gayrimenkul" stroke="#10b981" strokeWidth={3} dot={{ r: 3 }} />
                              <Line type="monotone" dataKey="mevduat" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
                              <Line type="monotone" dataKey="altin" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} />
                              <Line type="monotone" dataKey="enflasyon" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Bilgi Kartları Grid */}
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Nasıl Kullanılır */}
                    <Card className="border-2 border-blue-200">
                      <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 pb-2">
                        <CardTitle className="flex items-center gap-2 text-blue-800 text-base">
                          <HelpCircle className="h-5 w-5" />
                          Nasıl Kullanılır?
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-3">
                        <ol className="text-sm text-slate-700 space-y-2 list-decimal list-inside">
                          <li>Gayrimenkul tipini seçin (Konut, Arsa, İş Yeri, Depo)</li>
                          <li>Satın alma fiyatını ve aylık kira bedelini girin</li>
                          <li>Yıllık gider oranını ve beklenen değer artışını belirleyin</li>
                          <li>Enflasyon oranını girerek reel getiri hesaplayın</li>
                          <li>Kredi kullanıyorsanız detayları ekleyin</li>
                          <li>&quot;Hesapla&quot; butonuna tıklayarak sonuçları görüntüleyin</li>
                        </ol>
                      </CardContent>
                    </Card>

                    {/* Örnek Kullanımlar */}
                    <Card className="border-2 border-green-200">
                      <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 pb-2">
                        <CardTitle className="flex items-center gap-2 text-green-800 text-base">
                          <BookOpen className="h-5 w-5" />
                          Örnek Kullanımlar
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-3">
                        <div className="text-sm text-slate-700 space-y-3">
                          <div className="p-2 bg-green-50 rounded border border-green-100">
                            <p className="font-medium text-green-800">🏠 Konut Yatırımı</p>
                            <p className="text-xs mt-1">5M TL konut, 15K aylık kira → 27.7 yıl kira çarpanı</p>
                          </div>
                          <div className="p-2 bg-blue-50 rounded border border-blue-100">
                            <p className="font-medium text-blue-800">🏪 İş Yeri</p>
                            <p className="text-xs mt-1">3M TL dükkan, 25K kira → 10 yıl kira çarpanı (daha iyi)</p>
                          </div>
                          <div className="p-2 bg-amber-50 rounded border border-amber-100">
                            <p className="font-medium text-amber-800">🗺️ Arsa</p>
                            <p className="text-xs mt-1">1M TL arsa, %30 değer artışı → sadece değer artışı analizi</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Önemli Bilgiler */}
                    <Card className="border-2 border-amber-200">
                      <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50 pb-2">
                        <CardTitle className="flex items-center gap-2 text-amber-800 text-base">
                          <AlertCircle className="h-5 w-5" />
                          Önemli Bilgiler
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-3">
                        <ul className="text-sm text-slate-700 space-y-2">
                          <li className="flex items-start gap-2">
                            <span className="text-amber-500 mt-0.5">⚠️</span>
                            <span><strong>Kira Çarpanı 15 yılın altı</strong> genellikle iyi bir yatırım olarak kabul edilir</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-amber-500 mt-0.5">⚠️</span>
                            <span><strong>Reel getiri</strong> enflasyondan arındırılmış gerçek kazancınızı gösterir</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-amber-500 mt-0.5">⚠️</span>
                            <span><strong>Giderler</strong> (aidat, sigorta, bakım, vergiler) kârınızı doğrudan etkiler</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-amber-500 mt-0.5">⚠️</span>
                            <span><strong>Kredi faizi</strong> yüksekse, kira geliri taksiti karşılamayabilir</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    {/* İlginç Bilgiler */}
                    <Card className="border-2 border-purple-200">
                      <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 pb-2">
                        <CardTitle className="flex items-center gap-2 text-purple-800 text-base">
                          <Lightbulb className="h-5 w-5" />
                          İlginç Bilgiler
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-3">
                        <ul className="text-sm text-slate-700 space-y-2">
                          <li className="flex items-start gap-2">
                            <span className="text-purple-500 mt-0.5">💡</span>
                            <span>Türkiye&apos;de ortalama kira çarpanı büyükşehirlerde 20-30 yıl arasında</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-purple-500 mt-0.5">💡</span>
                            <span>İstanbul&apos;un merkez ilçelerinde bu oran 35+ yıla çıkabiliyor</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-purple-500 mt-0.5">💡</span>
                            <span>İş yerleri genellikle konutlardan daha düşük kira çarpanına sahip</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-purple-500 mt-0.5">💡</span>
                            <span>Dünya genelinde sağlıklı kira çarpanı 12-16 yıl olarak kabul edilir</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Kira Çarpanı Değerlendirme Tablosu */}
                  <Card className="border-2 border-slate-200">
                    <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50">
                      <CardTitle className="flex items-center gap-2 text-slate-800 text-base">
                        <Star className="h-5 w-5" />
                        Kira Çarpanı Değerlendirme Rehberi
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200 text-center">
                          <div className="text-2xl font-bold text-green-700 mb-1">0-15 Yıl</div>
                          <Badge className="bg-green-500 mb-2">Çok İyi</Badge>
                          <p className="text-xs text-green-700">Hızlı geri dönüş, yüksek kira getirisi</p>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200 text-center">
                          <div className="text-2xl font-bold text-blue-700 mb-1">15-25 Yıl</div>
                          <Badge className="bg-blue-500 mb-2">Orta</Badge>
                          <p className="text-xs text-blue-700">Makul geri dönüş, değer artışı önemli</p>
                        </div>
                        <div className="p-4 bg-amber-50 rounded-lg border-2 border-amber-200 text-center">
                          <div className="text-2xl font-bold text-amber-700 mb-1">25+ Yıl</div>
                          <Badge className="bg-amber-500 mb-2">Uzun Vadeli</Badge>
                          <p className="text-xs text-amber-700">Değer artışına odaklanın</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Butonlar */}
                  <div className="flex justify-center gap-3 flex-wrap pt-4">
                    <Button
                      onClick={() => setAktifTab('giris')}
                      variant="outline"
                      className="gap-2 border-2 border-emerald-300 text-emerald-600 hover:bg-emerald-50 rounded-xl px-6"
                    >
                      <RotateCcw className="h-4 w-4" />
                      Değerleri Düzenle
                    </Button>
                    <Button
                      onClick={raporYazdir}
                      className="gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-xl px-6 shadow-lg"
                    >
                      <Printer className="h-4 w-4" />
                      Rapor Yazdır
                    </Button>
                    <Link href="/">
                      <Button
                        variant="outline"
                        className="gap-2 border-2 border-slate-300 text-slate-600 hover:bg-slate-50 rounded-xl px-6"
                      >
                        <Home className="h-4 w-4" />
                        Ana Sayfaya Dön
                      </Button>
                    </Link>
                  </div>
                </>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
