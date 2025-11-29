"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { 
  Home, 
  Calculator, 
  TrendingDown, 
  RefreshCw, 
  DollarSign,
  Calendar,
  Percent,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Info,
  BookOpen,
  Lightbulb,
  Scale,
  Building2,
  Car,
  CreditCard,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Download,
  BarChart3,
  FileText,
  TrendingUp
} from "lucide-react"

// Kredi türleri ve varsayılan değerleri
const KREDI_TURLERI = {
  konut: {
    label: "Konut Kredisi",
    icon: Building2,
    erkenKapamaCezasi: 0, // %0
    bsmvOrani: 0.05, // %5
    kkdfOrani: 0.15, // %15
    aciklama: "Konut kredilerinde erken kapama cezası alınmaz"
  },
  ihtiyac: {
    label: "İhtiyaç Kredisi",
    icon: CreditCard,
    erkenKapamaCezasi: 0.01, // %1
    bsmvOrani: 0.10, // %10
    kkdfOrani: 0.15, // %15
    aciklama: "İhtiyaç kredilerinde max %1 erken kapama cezası uygulanabilir"
  },
  tasit: {
    label: "Taşıt Kredisi",
    icon: Car,
    erkenKapamaCezasi: 0.01, // %1
    bsmvOrani: 0.10, // %10
    kkdfOrani: 0.15, // %15
    aciklama: "Taşıt kredilerinde max %1 erken kapama cezası uygulanabilir"
  },
  ticari: {
    label: "Ticari Kredi",
    icon: Briefcase,
    erkenKapamaCezasi: 0.02, // %2
    bsmvOrani: 0.05, // %5
    kkdfOrani: 0, // Ticari kredilerde KKDF yok
    aciklama: "Ticari kredilerde %2'ye kadar erken kapama cezası uygulanabilir"
  }
}

// Amortizasyon tablosu satırı tipi
interface AmortizasyonSatiri {
  ay: number
  taksit: number
  faiz: number
  faizBsmv: number
  faizKkdf: number
  faizNet: number
  anapara: number
  kalanAnapara: number
  toplamOdenen: number
}

// Hesaplama sonuçları tipi
interface HesaplamaSonuclari {
  mevcutPlan: {
    aylikTaksit: number
    toplamOdeme: number
    toplamFaiz: number
    toplamBsmv: number
    toplamKkdf: number
    amortizasyon: AmortizasyonSatiri[]
    odenenTaksitler: number
    odenenToplam: number
    kalanTaksitler: number
    kalanToplam: number
  } | null
  erkenKapama: {
    erkenKapamaAyi: number
    kalanAnapara: number
    cezaOrani: number
    cezaTutari: number
    toplamOdeme: number
    simdiyeKadarOdenen: number
    genelToplamMaliyet: number
    kurtarilanFaiz: number
    netTasarruf: number
  } | null
  kismiOdeme: {
    kismiOdemeTutari: number
    yeniKalanAnapara: number
    vadeKisaltma: {
      yeniVade: number
      kisaltilmisAy: number
      aylikTaksit: number
      toplamFaiz: number
      toplamOdeme: number
      tasarruf: number
      amortizasyon: AmortizasyonSatiri[]
    } | null
    taksitDusurme: {
      yeniTaksit: number
      eskiTaksit: number
      taksitFarki: number
      toplamFaiz: number
      toplamOdeme: number
      tasarruf: number
      amortizasyon: AmortizasyonSatiri[]
    } | null
  } | null
  refinansman: {
    eskiFaizOrani: number
    yeniFaizOrani: number
    kalanAnapara: number
    yeniVade: number
    yeniTaksit: number
    eskiTaksit: number
    yeniToplamOdeme: number
    yeniToplamFaiz: number
    eskiKalanOdeme: number
    eskiKalanFaiz: number
    fark: number
    faizTasarrufu: number
    avantajliMi: boolean
    avantajliOlduguAy: number
    amortizasyon: AmortizasyonSatiri[]
  } | null
  enAvantajli: {
    yontem: string
    tasarruf: number
    aciklama: string
    detay: string
  } | null
}

export function KrediYenidenYapilandirma() {
  // Form state
  const [krediTuru, setKrediTuru] = useState<keyof typeof KREDI_TURLERI>("ihtiyac")
  const [krediTutari, setKrediTutari] = useState<string>("")
  const [aylikFaizOrani, setAylikFaizOrani] = useState<string>("")
  const [toplamVade, setToplamVade] = useState<string>("")
  const [kalanVade, setKalanVade] = useState<string>("")
  const [odenenAySayisi, setOdenenAySayisi] = useState<string>("")
  const [kalanAnaparaManuell, setKalanAnaparaManuell] = useState<string>("")
  const [kullanilanGiris, setKullanilanGiris] = useState<"kalanVade" | "odenenAy">("kalanVade")
  
  // Erken kapama/kısmi ödeme
  const [erkenKapamaAyi, setErkenKapamaAyi] = useState<string>("")
  const [erkenOdemeTutari, setErkenOdemeTutari] = useState<string>("")
  const [odemeTipi, setOdemeTipi] = useState<"tam" | "kismi">("tam")
  const [kismiOdemeYontemi, setKismiOdemeYontemi] = useState<"vadeKisalt" | "taksitDusur">("vadeKisalt")
  
  // Refinansman
  const [yeniFaizOrani, setYeniFaizOrani] = useState<string>("")
  const [yeniVade, setYeniVade] = useState<string>("")
  
  // Özel ayarlar
  const [manuelCeza, setManuelCeza] = useState<boolean>(false)
  const [erkenKapamaCezasi, setErkenKapamaCezasi] = useState<string>("")
  const [vergiFonDahil, setVergiFonDahil] = useState<boolean>(true)
  
  // Sonuçlar
  const [sonuclar, setSonuclar] = useState<HesaplamaSonuclari | null>(null)
  const [aktifSekme, setAktifSekme] = useState<string>("giris")
  const [amortizasyonAcik, setAmortizasyonAcik] = useState<boolean>(false)

  // Kalan vade veya ödenen ay değiştiğinde diğerini otomatik hesapla
  const handleKalanVadeChange = (value: string) => {
    setKalanVade(value)
    setKullanilanGiris("kalanVade")
    if (value && toplamVade) {
      const toplam = parseInt(toplamVade)
      const kalan = parseInt(value)
      if (!isNaN(toplam) && !isNaN(kalan) && kalan <= toplam) {
        setOdenenAySayisi((toplam - kalan).toString())
      }
    }
  }

  const handleOdenenAyChange = (value: string) => {
    setOdenenAySayisi(value)
    setKullanilanGiris("odenenAy")
    if (value && toplamVade) {
      const toplam = parseInt(toplamVade)
      const odenen = parseInt(value)
      if (!isNaN(toplam) && !isNaN(odenen) && odenen < toplam) {
        setKalanVade((toplam - odenen).toString())
      }
    }
  }

  // Kredi türü değiştiğinde erken kapama cezasını güncelle
  const handleKrediTuruChange = (value: keyof typeof KREDI_TURLERI) => {
    setKrediTuru(value)
    if (!manuelCeza) {
      setErkenKapamaCezasi((KREDI_TURLERI[value].erkenKapamaCezasi * 100).toString())
    }
  }

  // Sayı formatlama
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value)
  }

  const formatNumber = (value: number, decimals: number = 2): string => {
    return new Intl.NumberFormat('tr-TR', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(value)
  }

  // ============================================
  // HESAPLAMA FONKSİYONLARI
  // ============================================

  // Vergi ve fon hesaplama
  const hesaplaVergiFon = (faiz: number, krediTipi: keyof typeof KREDI_TURLERI) => {
    const bsmvOrani = KREDI_TURLERI[krediTipi].bsmvOrani
    const kkdfOrani = KREDI_TURLERI[krediTipi].kkdfOrani
    const bsmv = faiz * bsmvOrani
    const kkdf = faiz * kkdfOrani
    return { bsmv, kkdf, toplam: bsmv + kkdf }
  }

  // Aylık taksit hesaplama (Annüite formülü)
  const hesaplaAylikTaksit = (anapara: number, aylikFaiz: number, vade: number): number => {
    if (aylikFaiz === 0) return anapara / vade
    if (vade <= 0) return 0
    const payda = Math.pow(1 + aylikFaiz, vade) - 1
    if (payda === 0) return anapara / vade
    const pay = aylikFaiz * Math.pow(1 + aylikFaiz, vade)
    return anapara * (pay / payda)
  }

  // Yeni vade hesaplama (aynı taksitle kalan anapara için)
  const hesaplaYeniVade = (kalanAnapara: number, taksit: number, aylikFaiz: number): number => {
    if (aylikFaiz === 0) return Math.ceil(kalanAnapara / taksit)
    const payda = taksit - kalanAnapara * aylikFaiz
    if (payda <= 0) return 0
    const yeniVade = Math.log(taksit / payda) / Math.log(1 + aylikFaiz)
    return Math.ceil(yeniVade)
  }

  // Amortizasyon tablosu oluşturma (BSMV/KKDF dahil)
  const olusturAmortizasyonTablosu = (
    anapara: number, 
    aylikFaiz: number, 
    vade: number,
    vergiFonDahilMi: boolean = true,
    krediTipi: keyof typeof KREDI_TURLERI = krediTuru
  ): AmortizasyonSatiri[] => {
    const tablo: AmortizasyonSatiri[] = []
    if (vade <= 0 || anapara <= 0) return tablo
    
    const taksit = hesaplaAylikTaksit(anapara, aylikFaiz, vade)
    let kalan = anapara
    let toplamOdenen = 0

    for (let ay = 1; ay <= vade; ay++) {
      const faizNet = kalan * aylikFaiz
      const { bsmv, kkdf } = vergiFonDahilMi ? hesaplaVergiFon(faizNet, krediTipi) : { bsmv: 0, kkdf: 0 }
      const faizToplam = faizNet + bsmv + kkdf
      const anaparaOdemesi = taksit - faizNet // Taksit hesabında vergi yok
      kalan = Math.max(0, kalan - anaparaOdemesi)
      toplamOdenen += taksit

      tablo.push({
        ay,
        taksit,
        faiz: faizToplam,
        faizBsmv: bsmv,
        faizKkdf: kkdf,
        faizNet,
        anapara: anaparaOdemesi,
        kalanAnapara: kalan,
        toplamOdenen
      })
    }

    return tablo
  }

  // Ana hesaplama fonksiyonu
  const hesapla = () => {
    // Girdileri al ve doğrula
    const P = parseFloat(krediTutari.replace(/\./g, '').replace(',', '.')) || 0
    const r = (parseFloat(aylikFaizOrani.replace(',', '.')) || 0) / 100
    const N = parseInt(toplamVade) || 0
    const odenenAy = parseInt(odenenAySayisi) || 0
    const k = parseInt(erkenKapamaAyi) || odenenAy || 0
    const E = parseFloat(erkenOdemeTutari.replace(/\./g, '').replace(',', '.')) || 0
    const r2 = (parseFloat(yeniFaizOrani.replace(',', '.')) || 0) / 100
    const N2 = parseInt(yeniVade) || (N - k)
    const c = manuelCeza 
      ? (parseFloat(erkenKapamaCezasi.replace(',', '.')) || 0) / 100
      : KREDI_TURLERI[krediTuru].erkenKapamaCezasi

    // Validasyon
    if (P <= 0 || r <= 0 || N <= 0) {
      alert("Lütfen geçerli kredi bilgileri girin (Kredi tutarı, faiz oranı ve vade)")
      return
    }

    // =====================
    // 1. STANDART PLAN HESAPLAMA
    // =====================
    const amortizasyon = olusturAmortizasyonTablosu(P, r, N, vergiFonDahil)
    const aylikTaksit = hesaplaAylikTaksit(P, r, N)
    const toplamOdeme = aylikTaksit * N
    const toplamFaiz = amortizasyon.reduce((sum, row) => sum + row.faizNet, 0)
    const toplamBsmv = amortizasyon.reduce((sum, row) => sum + row.faizBsmv, 0)
    const toplamKkdf = amortizasyon.reduce((sum, row) => sum + row.faizKkdf, 0)
    
    // Ödenen ve kalan hesaplama
    const odenenTaksitler = Math.min(odenenAy, N)
    const odenenToplam = odenenTaksitler > 0 ? amortizasyon[odenenTaksitler - 1]?.toplamOdenen || 0 : 0
    const kalanTaksitler = N - odenenTaksitler
    const kalanToplam = toplamOdeme - odenenToplam

    const mevcutPlan = {
      aylikTaksit,
      toplamOdeme,
      toplamFaiz,
      toplamBsmv,
      toplamKkdf,
      amortizasyon,
      odenenTaksitler,
      odenenToplam,
      kalanTaksitler,
      kalanToplam
    }

    // =====================
    // 2. ERKEN KAPAMA HESAPLAMA
    // =====================
    let erkenKapama = null
    if (k > 0 && k <= N) {
      const kalanAnapara = k > 0 && k <= amortizasyon.length 
        ? amortizasyon[k - 1]?.kalanAnapara || 0 
        : P
      const cezaTutari = kalanAnapara * c
      const erkenKapamaOdeme = kalanAnapara + cezaTutari
      const simdiyeKadarOdenen = k > 0 ? amortizasyon[k - 1]?.toplamOdenen || 0 : 0
      
      // k. aydan sonra normalde ödenecek faiz
      let normaldeKalanFaiz = 0
      for (let i = k; i < N; i++) {
        normaldeKalanFaiz += amortizasyon[i]?.faizNet || 0
      }
      
      const kurtarilanFaiz = normaldeKalanFaiz
      const netTasarruf = kurtarilanFaiz - cezaTutari
      const genelToplamMaliyet = simdiyeKadarOdenen + erkenKapamaOdeme

      erkenKapama = {
        erkenKapamaAyi: k,
        kalanAnapara,
        cezaOrani: c * 100,
        cezaTutari,
        toplamOdeme: erkenKapamaOdeme,
        simdiyeKadarOdenen,
        genelToplamMaliyet,
        kurtarilanFaiz,
        netTasarruf
      }
    }

    // =====================
    // 3. KISMİ ERKEN ÖDEME HESAPLAMA
    // =====================
    let kismiOdeme = null
    if (k > 0 && k < N && E > 0 && odemeTipi === "kismi") {
      const eskiKalanAnapara = k > 0 && k <= amortizasyon.length 
        ? amortizasyon[k - 1]?.kalanAnapara || 0 
        : P
      const yeniKalanAnapara = Math.max(0, eskiKalanAnapara - E)
      const kalanVadeHesap = N - k

      // Normalde kalan faiz ve ödeme
      let normaldeKalanFaiz = 0
      let normaldeKalanOdeme = 0
      for (let i = k; i < N; i++) {
        normaldeKalanFaiz += amortizasyon[i]?.faizNet || 0
        normaldeKalanOdeme += amortizasyon[i]?.taksit || 0
      }

      // 3.1 Vade Kısaltma (Taksit aynı kalır)
      let vadeKisaltma = null
      if (yeniKalanAnapara > 0) {
        const yeniVadeHesap = hesaplaYeniVade(yeniKalanAnapara, aylikTaksit, r)
        
        if (yeniVadeHesap > 0) {
          const kisaltilmisAy = kalanVadeHesap - yeniVadeHesap
          const yeniAmortizasyon = olusturAmortizasyonTablosu(yeniKalanAnapara, r, yeniVadeHesap, vergiFonDahil)
          const yeniToplamFaiz = yeniAmortizasyon.reduce((sum, row) => sum + row.faizNet, 0)
          const yeniToplamOdeme = yeniAmortizasyon.reduce((sum, row) => sum + row.taksit, 0)
          const tasarruf = normaldeKalanFaiz - yeniToplamFaiz

          vadeKisaltma = {
            yeniVade: yeniVadeHesap,
            kisaltilmisAy,
            aylikTaksit,
            toplamFaiz: yeniToplamFaiz,
            toplamOdeme: yeniToplamOdeme + E, // Kısmi ödeme dahil
            tasarruf,
            amortizasyon: yeniAmortizasyon
          }
        }
      }

      // 3.2 Taksit Düşürme (Vade aynı kalır)
      let taksitDusurme = null
      if (yeniKalanAnapara > 0 && kalanVadeHesap > 0) {
        const yeniTaksit = hesaplaAylikTaksit(yeniKalanAnapara, r, kalanVadeHesap)
        const taksitFarki = aylikTaksit - yeniTaksit
        
        const yeniAmortizasyon = olusturAmortizasyonTablosu(yeniKalanAnapara, r, kalanVadeHesap, vergiFonDahil)
        const yeniToplamFaiz = yeniAmortizasyon.reduce((sum, row) => sum + row.faizNet, 0)
        const yeniToplamOdeme = yeniAmortizasyon.reduce((sum, row) => sum + row.taksit, 0)
        const tasarruf = normaldeKalanFaiz - yeniToplamFaiz

        taksitDusurme = {
          yeniTaksit,
          eskiTaksit: aylikTaksit,
          taksitFarki,
          toplamFaiz: yeniToplamFaiz,
          toplamOdeme: yeniToplamOdeme + E, // Kısmi ödeme dahil
          tasarruf,
          amortizasyon: yeniAmortizasyon
        }
      }

      kismiOdeme = { 
        kismiOdemeTutari: E,
        yeniKalanAnapara,
        vadeKisaltma, 
        taksitDusurme 
      }
    }

    // =====================
    // 4. REFİNANSMAN (YENİDEN YAPILANDIRMA) HESAPLAMA
    // =====================
    let refinansman = null
    if (k > 0 && k <= N && r2 > 0) {
      const kalanAnapara = k > 0 && k <= amortizasyon.length 
        ? amortizasyon[k - 1]?.kalanAnapara || 0 
        : P
      const refinansmanVade = N2 > 0 ? N2 : (N - k)
      
      if (refinansmanVade > 0 && kalanAnapara > 0) {
        const yeniTaksit = hesaplaAylikTaksit(kalanAnapara, r2, refinansmanVade)
        const yeniAmortizasyon = olusturAmortizasyonTablosu(kalanAnapara, r2, refinansmanVade, vergiFonDahil)
        const yeniToplamOdeme = yeniTaksit * refinansmanVade
        const yeniToplamFaiz = yeniAmortizasyon.reduce((sum, row) => sum + row.faizNet, 0)
        
        // Eski planda kalan toplam ödeme ve faiz
        let eskiKalanOdeme = 0
        let eskiKalanFaiz = 0
        for (let i = k; i < N; i++) {
          eskiKalanOdeme += amortizasyon[i]?.taksit || 0
          eskiKalanFaiz += amortizasyon[i]?.faizNet || 0
        }
        
        const fark = eskiKalanOdeme - yeniToplamOdeme
        const faizTasarrufu = eskiKalanFaiz - yeniToplamFaiz
        
        // Kaçıncı aydan sonra avantajlı olduğunu hesapla
        let avantajliOlduguAy = 0
        if (fark > 0) {
          // Kümülatif tasarruf sıfırı geçtiği ay
          let kumulatifFark = 0
          const eskiTaksit = aylikTaksit
          for (let ay = 1; ay <= refinansmanVade; ay++) {
            kumulatifFark += (eskiTaksit - yeniTaksit)
            if (kumulatifFark > 0 && avantajliOlduguAy === 0) {
              avantajliOlduguAy = ay
              break
            }
          }
        }

        refinansman = {
          eskiFaizOrani: r * 100,
          yeniFaizOrani: r2 * 100,
          kalanAnapara,
          yeniVade: refinansmanVade,
          yeniTaksit,
          eskiTaksit: aylikTaksit,
          yeniToplamOdeme,
          yeniToplamFaiz,
          eskiKalanOdeme,
          eskiKalanFaiz,
          fark,
          faizTasarrufu,
          avantajliMi: fark > 0,
          avantajliOlduguAy,
          amortizasyon: yeniAmortizasyon
        }
      }
    }

    // =====================
    // 5. EN AVANTAJLI YÖNTEMİ BELİRLE
    // =====================
    const secenekler: { yontem: string; tasarruf: number; aciklama: string; detay: string }[] = []
    
    // Mevcut durumda devam seçeneği
    secenekler.push({
      yontem: "Mevcut Plan ile Devam",
      tasarruf: 0,
      aciklama: "Kredinizi mevcut koşullarla ödemeye devam edin.",
      detay: `Kalan ${kalanTaksitler} taksit, toplam ${formatCurrency(kalanToplam)} ödeme`
    })
    
    if (erkenKapama && erkenKapama.netTasarruf > 0) {
      secenekler.push({
        yontem: "Tam Erken Kapama",
        tasarruf: erkenKapama.netTasarruf,
        aciklama: `Kredinizi ${k}. ayda tamamen kapatarak ${formatCurrency(erkenKapama.netTasarruf)} tasarruf edebilirsiniz.`,
        detay: `Ödenecek: ${formatCurrency(erkenKapama.toplamOdeme)} (Anapara: ${formatCurrency(erkenKapama.kalanAnapara)}, Ceza: ${formatCurrency(erkenKapama.cezaTutari)})`
      })
    }

    if (kismiOdeme?.vadeKisaltma && kismiOdeme.vadeKisaltma.tasarruf > 0) {
      secenekler.push({
        yontem: "Kısmi Ödeme + Vade Kısaltma",
        tasarruf: kismiOdeme.vadeKisaltma.tasarruf,
        aciklama: `${formatCurrency(E)} kısmi ödeme ile vadenizi ${kismiOdeme.vadeKisaltma.kisaltilmisAy} ay kısaltarak ${formatCurrency(kismiOdeme.vadeKisaltma.tasarruf)} tasarruf edebilirsiniz.`,
        detay: `Yeni vade: ${kismiOdeme.vadeKisaltma.yeniVade} ay, Aynı taksit: ${formatCurrency(aylikTaksit)}`
      })
    }

    if (kismiOdeme?.taksitDusurme && kismiOdeme.taksitDusurme.tasarruf > 0) {
      secenekler.push({
        yontem: "Kısmi Ödeme + Taksit Düşürme",
        tasarruf: kismiOdeme.taksitDusurme.tasarruf,
        aciklama: `${formatCurrency(E)} kısmi ödeme ile taksidinizi ${formatCurrency(kismiOdeme.taksitDusurme.taksitFarki)} düşürerek ${formatCurrency(kismiOdeme.taksitDusurme.tasarruf)} tasarruf edebilirsiniz.`,
        detay: `Yeni taksit: ${formatCurrency(kismiOdeme.taksitDusurme.yeniTaksit)}, Aynı vade: ${N - k} ay`
      })
    }

    if (refinansman && refinansman.fark > 0) {
      secenekler.push({
        yontem: "Yeniden Yapılandırma (Refinansman)",
        tasarruf: refinansman.fark,
        aciklama: `Faiz oranını %${refinansman.eskiFaizOrani.toFixed(2)}'den %${refinansman.yeniFaizOrani.toFixed(2)}'ye düşürerek ${formatCurrency(refinansman.fark)} tasarruf edebilirsiniz.`,
        detay: `Yeni taksit: ${formatCurrency(refinansman.yeniTaksit)}, ${refinansman.avantajliOlduguAy > 0 ? `${refinansman.avantajliOlduguAy}. aydan itibaren avantajlı` : 'Hemen avantajlı'}`
      })
    }

    // En yüksek tasarrufu bul
    const enAvantajli = secenekler.length > 1 
      ? secenekler.filter(s => s.tasarruf > 0).reduce((max, item) => item.tasarruf > max.tasarruf ? item : max, secenekler[1])
      : null

    setSonuclar({
      mevcutPlan,
      erkenKapama,
      kismiOdeme,
      refinansman,
      enAvantajli
    })

    setAktifSekme("sonuc")
  }

  // Formu temizle
  const temizle = () => {
    setKrediTutari("")
    setAylikFaizOrani("")
    setToplamVade("")
    setKalanVade("")
    setOdenenAySayisi("")
    setKalanAnaparaManuell("")
    setErkenKapamaAyi("")
    setErkenOdemeTutari("")
    setYeniFaizOrani("")
    setYeniVade("")
    setSonuclar(null)
    setAktifSekme("giris")
  }

  const KrediTuruIcon = KREDI_TURLERI[krediTuru].icon

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
      {/* Ana Sayfa Butonu */}
      <Link href="/">
        <Button variant="outline" className="group flex items-center gap-2 hover:gap-3 transition-all hover:border-blue-300">
          <Home className="h-4 w-4 text-blue-600 group-hover:-translate-x-1 transition-transform" />
          Ana Sayfaya Dön
        </Button>
      </Link>

      {/* Başlık Kartı */}
      <Card className="border-2 border-blue-100 shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 text-white">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
              <RefreshCw className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Kredi Yeniden Yapılandırma & Erken Kapama</h1>
              <p className="text-blue-100 mt-1">Kredinizi analiz edin, en avantajlı ödeme planını bulun</p>
            </div>
          </div>
        </div>

        <CardContent className="p-6">
          <Tabs value={aktifSekme} onValueChange={setAktifSekme} className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-6">
              <TabsTrigger value="giris" className="flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                <span className="hidden sm:inline">Kredi Bilgileri</span>
                <span className="sm:hidden">Bilgiler</span>
              </TabsTrigger>
              <TabsTrigger value="islemler" className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                <span className="hidden sm:inline">İşlem Seçenekleri</span>
                <span className="sm:hidden">İşlemler</span>
              </TabsTrigger>
              <TabsTrigger value="sonuc" className="flex items-center gap-2" disabled={!sonuclar}>
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Sonuçlar</span>
                <span className="sm:hidden">Sonuç</span>
              </TabsTrigger>
              <TabsTrigger value="karsilastirma" className="flex items-center gap-2" disabled={!sonuclar}>
                <Scale className="h-4 w-4" />
                <span className="hidden sm:inline">Karşılaştırma</span>
                <span className="sm:hidden">Karşılaştır</span>
              </TabsTrigger>
            </TabsList>

            {/* Sekme 1: Kredi Bilgileri */}
            <TabsContent value="giris" className="space-y-6">
              {/* Kredi Türü Seçimi */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {(Object.entries(KREDI_TURLERI) as [keyof typeof KREDI_TURLERI, typeof KREDI_TURLERI[keyof typeof KREDI_TURLERI]][]).map(([key, value]) => {
                  const Icon = value.icon
                  return (
                    <button
                      key={key}
                      onClick={() => handleKrediTuruChange(key)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        krediTuru === key
                          ? "border-blue-500 bg-blue-50 shadow-lg"
                          : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
                      }`}
                    >
                      <Icon className={`h-6 w-6 mx-auto mb-2 ${krediTuru === key ? "text-blue-600" : "text-slate-500"}`} />
                      <p className={`text-sm font-medium ${krediTuru === key ? "text-blue-700" : "text-slate-600"}`}>
                        {value.label}
                      </p>
                    </button>
                  )
                })}
              </div>

              {/* Temel Bilgiler */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-blue-600" />
                    Kredi Detayları
                  </h3>
                  
                  <div>
                    <Label htmlFor="krediTutari">Kredi Tutarı (₺)</Label>
                    <Input
                      id="krediTutari"
                      type="text"
                      value={krediTutari}
                      onChange={(e) => setKrediTutari(e.target.value)}
                      placeholder="100.000"
                      className="h-12 text-lg"
                    />
                  </div>

                  <div>
                    <Label htmlFor="aylikFaiz">Aylık Faiz Oranı (%)</Label>
                    <Input
                      id="aylikFaiz"
                      type="text"
                      value={aylikFaizOrani}
                      onChange={(e) => setAylikFaizOrani(e.target.value)}
                      placeholder="2.5"
                      className="h-12 text-lg"
                    />
                  </div>

                  <div>
                    <Label htmlFor="toplamVade">Toplam Vade (Ay)</Label>
                    <Input
                      id="toplamVade"
                      type="number"
                      value={toplamVade}
                      onChange={(e) => setToplamVade(e.target.value)}
                      placeholder="36"
                      className="h-12 text-lg"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    Mevcut Durum
                  </h3>

                  <div>
                    <Label htmlFor="kalanVade">
                      Kalan Vade (Ay)
                      {kullanilanGiris === "kalanVade" && <span className="text-blue-600 ml-1">●</span>}
                    </Label>
                    <Input
                      id="kalanVade"
                      type="number"
                      value={kalanVade}
                      onChange={(e) => handleKalanVadeChange(e.target.value)}
                      placeholder="24"
                      className="h-12 text-lg"
                    />
                  </div>

                  <div>
                    <Label htmlFor="odenenAy">
                      Ödenen Taksit Sayısı
                      {kullanilanGiris === "odenenAy" && <span className="text-blue-600 ml-1">●</span>}
                    </Label>
                    <Input
                      id="odenenAy"
                      type="number"
                      value={odenenAySayisi}
                      onChange={(e) => handleOdenenAyChange(e.target.value)}
                      placeholder="12"
                      className="h-12 text-lg"
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      İki alandan birini doldurun, diğeri otomatik hesaplanır
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="kalanAnapara">Kalan Anapara (Opsiyonel)</Label>
                    <Input
                      id="kalanAnapara"
                      type="text"
                      value={kalanAnaparaManuell}
                      onChange={(e) => setKalanAnaparaManuell(e.target.value)}
                      placeholder="Boş bırakılırsa hesaplanır"
                      className="h-12"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={temizle}>
                  Temizle
                </Button>
                <Button 
                  onClick={() => setAktifSekme("islemler")}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  Devam Et
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>

            {/* Sekme 2: İşlem Seçenekleri */}
            <TabsContent value="islemler" className="space-y-6">
              {/* İşlem Türü */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-2 border-orange-100">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TrendingDown className="h-5 w-5 text-orange-600" />
                      Erken Kapama / Kısmi Ödeme
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>İşlem Türü</Label>
                      <Select value={odemeTipi} onValueChange={(v: "tam" | "kismi") => setOdemeTipi(v)}>
                        <SelectTrigger className="h-12">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tam">Tam Erken Kapama</SelectItem>
                          <SelectItem value="kismi">Kısmi Erken Ödeme</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Erken Kapama/Ödeme Yapılacak Ay</Label>
                      <Input
                        type="number"
                        value={erkenKapamaAyi}
                        onChange={(e) => setErkenKapamaAyi(e.target.value)}
                        placeholder="Örn: 12"
                        className="h-12"
                      />
                    </div>

                    {odemeTipi === "kismi" && (
                      <>
                        <div>
                          <Label>Kısmi Ödeme Tutarı (₺)</Label>
                          <Input
                            type="text"
                            value={erkenOdemeTutari}
                            onChange={(e) => setErkenOdemeTutari(e.target.value)}
                            placeholder="20.000"
                            className="h-12"
                          />
                        </div>

                        <div>
                          <Label>Kısmi Ödeme Yöntemi</Label>
                          <Select value={kismiOdemeYontemi} onValueChange={(v: "vadeKisalt" | "taksitDusur") => setKismiOdemeYontemi(v)}>
                            <SelectTrigger className="h-12">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="vadeKisalt">Vade Kısaltma (Taksit Aynı)</SelectItem>
                              <SelectItem value="taksitDusur">Taksit Düşürme (Vade Aynı)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </>
                    )}

                    <div className="pt-2 border-t">
                      <div className="flex items-center justify-between mb-3">
                        <Label>Erken Kapama Cezası (%)</Label>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-500">Manuel</span>
                          <Switch checked={manuelCeza} onCheckedChange={setManuelCeza} />
                        </div>
                      </div>
                      <Input
                        type="text"
                        value={manuelCeza ? erkenKapamaCezasi : (KREDI_TURLERI[krediTuru].erkenKapamaCezasi * 100).toString()}
                        onChange={(e) => setErkenKapamaCezasi(e.target.value)}
                        disabled={!manuelCeza}
                        className="h-12"
                      />
                      <p className="text-xs text-slate-500 mt-1">
                        {KREDI_TURLERI[krediTuru].aciklama}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-green-100">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <RefreshCw className="h-5 w-5 text-green-600" />
                      Yeniden Yapılandırma (Refinansman)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Yeni Aylık Faiz Oranı (%)</Label>
                      <Input
                        type="text"
                        value={yeniFaizOrani}
                        onChange={(e) => setYeniFaizOrani(e.target.value)}
                        placeholder="1.8"
                        className="h-12"
                      />
                      <p className="text-xs text-slate-500 mt-1">
                        Bankanın teklif ettiği yeni faiz oranı
                      </p>
                    </div>

                    <div>
                      <Label>Yeni Vade (Ay) - Opsiyonel</Label>
                      <Input
                        type="number"
                        value={yeniVade}
                        onChange={(e) => setYeniVade(e.target.value)}
                        placeholder="Boş bırakılırsa kalan vade kullanılır"
                        className="h-12"
                      />
                    </div>

                    <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                      <h4 className="font-medium text-green-800 mb-2 flex items-center gap-2">
                        <Info className="h-4 w-4" />
                        Refinansman Nedir?
                      </h4>
                      <p className="text-sm text-green-700">
                        Mevcut kredinizi daha düşük faiz oranıyla yeni bir krediye çevirme işlemidir. 
                        Faiz oranları düştüğünde avantajlı olabilir.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-between gap-3">
                <Button variant="outline" onClick={() => setAktifSekme("giris")}>
                  Geri
                </Button>
                <Button 
                  onClick={hesapla}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                >
                  <Calculator className="mr-2 h-4 w-4" />
                  Hesapla
                </Button>
              </div>
            </TabsContent>

            {/* Sekme 3: Sonuçlar */}
            <TabsContent value="sonuc" className="space-y-6">
              {sonuclar ? (
                <>
                  {/* Mevcut Plan Özeti */}
                  {sonuclar.mevcutPlan && (
                    <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2 text-blue-800">
                          <BarChart3 className="h-5 w-5" />
                          Mevcut Kredi Planı
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="p-4 bg-white rounded-xl border border-blue-100">
                            <p className="text-xs text-slate-500 mb-1">Aylık Taksit</p>
                            <p className="text-xl font-bold text-blue-700">{formatCurrency(sonuclar.mevcutPlan.aylikTaksit)}</p>
                          </div>
                          <div className="p-4 bg-white rounded-xl border border-blue-100">
                            <p className="text-xs text-slate-500 mb-1">Toplam Ödeme</p>
                            <p className="text-xl font-bold text-slate-800">{formatCurrency(sonuclar.mevcutPlan.toplamOdeme)}</p>
                          </div>
                          <div className="p-4 bg-white rounded-xl border border-blue-100">
                            <p className="text-xs text-slate-500 mb-1">Toplam Faiz</p>
                            <p className="text-xl font-bold text-orange-600">{formatCurrency(sonuclar.mevcutPlan.toplamFaiz)}</p>
                          </div>
                          <div className="p-4 bg-white rounded-xl border border-blue-100">
                            <p className="text-xs text-slate-500 mb-1">Kalan Ödeme</p>
                            <p className="text-xl font-bold text-purple-600">{formatCurrency(sonuclar.mevcutPlan.kalanToplam)}</p>
                          </div>
                        </div>
                        
                        {/* Ödeme Durumu */}
                        <div className="mt-4 p-4 bg-white rounded-xl border border-blue-100">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-slate-600">Ödeme İlerlemesi</span>
                            <span className="text-sm font-medium text-blue-600">
                              {sonuclar.mevcutPlan.odenenTaksitler} / {sonuclar.mevcutPlan.amortizasyon.length} taksit
                            </span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-3">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full transition-all"
                              style={{ width: `${(sonuclar.mevcutPlan.odenenTaksitler / sonuclar.mevcutPlan.amortizasyon.length) * 100}%` }}
                            />
                          </div>
                          <div className="flex justify-between mt-2 text-xs text-slate-500">
                            <span>Ödenen: {formatCurrency(sonuclar.mevcutPlan.odenenToplam)}</span>
                            <span>Kalan: {sonuclar.mevcutPlan.kalanTaksitler} taksit</span>
                          </div>
                        </div>

                        {/* Amortizasyon Tablosu Toggle */}
                        <Button
                          variant="ghost"
                          className="w-full mt-4 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          onClick={() => setAmortizasyonAcik(!amortizasyonAcik)}
                        >
                          {amortizasyonAcik ? <ChevronUp className="mr-2 h-4 w-4" /> : <ChevronDown className="mr-2 h-4 w-4" />}
                          {amortizasyonAcik ? "Amortizasyon Tablosunu Gizle" : "Amortizasyon Tablosunu Göster"}
                        </Button>

                        {amortizasyonAcik && (
                          <div className="mt-4 overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="bg-blue-100 text-blue-800">
                                  <th className="p-2 text-left rounded-tl-lg">Ay</th>
                                  <th className="p-2 text-right">Taksit</th>
                                  <th className="p-2 text-right">Anapara</th>
                                  <th className="p-2 text-right">Faiz</th>
                                  <th className="p-2 text-right rounded-tr-lg">Kalan Anapara</th>
                                </tr>
                              </thead>
                              <tbody>
                                {sonuclar.mevcutPlan.amortizasyon.slice(0, 12).map((row, idx) => (
                                  <tr key={row.ay} className={`border-b border-slate-100 ${idx < sonuclar.mevcutPlan!.odenenTaksitler ? 'bg-green-50' : ''}`}>
                                    <td className="p-2 font-medium">{row.ay}</td>
                                    <td className="p-2 text-right">{formatCurrency(row.taksit)}</td>
                                    <td className="p-2 text-right">{formatCurrency(row.anapara)}</td>
                                    <td className="p-2 text-right text-orange-600">{formatCurrency(row.faizNet)}</td>
                                    <td className="p-2 text-right">{formatCurrency(row.kalanAnapara)}</td>
                                  </tr>
                                ))}
                                {sonuclar.mevcutPlan.amortizasyon.length > 12 && (
                                  <tr className="bg-slate-50">
                                    <td colSpan={5} className="p-2 text-center text-slate-500">
                                      ... ve {sonuclar.mevcutPlan.amortizasyon.length - 12} satır daha
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}

                  {/* Erken Kapama Sonuçları */}
                  {sonuclar.erkenKapama && (
                    <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2 text-orange-800">
                          <TrendingDown className="h-5 w-5" />
                          Tam Erken Kapama Sonuçları
                          <span className="ml-auto text-sm font-normal bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                            {sonuclar.erkenKapama.erkenKapamaAyi}. ayda
                          </span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          <div className="p-4 bg-white rounded-xl border border-orange-100">
                            <p className="text-xs text-slate-500 mb-1">Kalan Anapara</p>
                            <p className="text-xl font-bold text-slate-800">{formatCurrency(sonuclar.erkenKapama.kalanAnapara)}</p>
                          </div>
                          <div className="p-4 bg-white rounded-xl border border-orange-100">
                            <p className="text-xs text-slate-500 mb-1">Erken Kapama Cezası (%{sonuclar.erkenKapama.cezaOrani})</p>
                            <p className="text-xl font-bold text-red-600">{formatCurrency(sonuclar.erkenKapama.cezaTutari)}</p>
                          </div>
                          <div className="p-4 bg-white rounded-xl border border-orange-100">
                            <p className="text-xs text-slate-500 mb-1">Bankaya Ödenecek</p>
                            <p className="text-xl font-bold text-orange-700">{formatCurrency(sonuclar.erkenKapama.toplamOdeme)}</p>
                          </div>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-4">
                          <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                            <p className="text-xs text-green-600 mb-1">Kurtarılan Faiz</p>
                            <p className="text-2xl font-bold text-green-700">{formatCurrency(sonuclar.erkenKapama.kurtarilanFaiz)}</p>
                          </div>
                          <div className={`p-4 rounded-xl border ${sonuclar.erkenKapama.netTasarruf > 0 ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
                            <p className={`text-xs mb-1 ${sonuclar.erkenKapama.netTasarruf > 0 ? 'text-emerald-600' : 'text-red-600'}`}>Net Tasarruf</p>
                            <p className={`text-2xl font-bold ${sonuclar.erkenKapama.netTasarruf > 0 ? 'text-emerald-700' : 'text-red-700'}`}>
                              {formatCurrency(sonuclar.erkenKapama.netTasarruf)}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 p-4 bg-white rounded-xl border border-orange-100">
                          <p className="text-sm text-slate-600">
                            <strong>Genel Maliyet:</strong> Şimdiye kadar ödenen ({formatCurrency(sonuclar.erkenKapama.simdiyeKadarOdenen)}) + 
                            Erken kapama tutarı ({formatCurrency(sonuclar.erkenKapama.toplamOdeme)}) = 
                            <span className="font-bold text-slate-800 ml-1">{formatCurrency(sonuclar.erkenKapama.genelToplamMaliyet)}</span>
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Kısmi Ödeme Sonuçları */}
                  {sonuclar.kismiOdeme && (sonuclar.kismiOdeme.vadeKisaltma || sonuclar.kismiOdeme.taksitDusurme) && (
                    <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2 text-purple-800">
                          <Percent className="h-5 w-5" />
                          Kısmi Erken Ödeme Sonuçları
                          <span className="ml-auto text-sm font-normal bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                            {formatCurrency(sonuclar.kismiOdeme.kismiOdemeTutari)} ödeme
                          </span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="p-4 bg-white rounded-xl border border-purple-100">
                          <p className="text-sm text-slate-600 mb-2">
                            Kısmi ödeme sonrası yeni kalan anapara: <span className="font-bold">{formatCurrency(sonuclar.kismiOdeme.yeniKalanAnapara)}</span>
                          </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          {/* Vade Kısaltma */}
                          {sonuclar.kismiOdeme.vadeKisaltma && (
                            <div className="p-4 bg-white rounded-xl border-2 border-purple-200">
                              <h4 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                Vade Kısaltma
                              </h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-slate-600">Yeni Vade:</span>
                                  <span className="font-medium">{sonuclar.kismiOdeme.vadeKisaltma.yeniVade} ay</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-600">Kısaltılan:</span>
                                  <span className="font-medium text-green-600">-{sonuclar.kismiOdeme.vadeKisaltma.kisaltilmisAy} ay</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-600">Aynı Taksit:</span>
                                  <span className="font-medium">{formatCurrency(sonuclar.kismiOdeme.vadeKisaltma.aylikTaksit)}</span>
                                </div>
                                <div className="pt-2 border-t mt-2">
                                  <div className="flex justify-between">
                                    <span className="text-slate-600">Tasarruf:</span>
                                    <span className="font-bold text-green-600">{formatCurrency(sonuclar.kismiOdeme.vadeKisaltma.tasarruf)}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Taksit Düşürme */}
                          {sonuclar.kismiOdeme.taksitDusurme && (
                            <div className="p-4 bg-white rounded-xl border-2 border-pink-200">
                              <h4 className="font-semibold text-pink-800 mb-3 flex items-center gap-2">
                                <TrendingDown className="h-4 w-4" />
                                Taksit Düşürme
                              </h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-slate-600">Eski Taksit:</span>
                                  <span className="font-medium">{formatCurrency(sonuclar.kismiOdeme.taksitDusurme.eskiTaksit)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-600">Yeni Taksit:</span>
                                  <span className="font-medium text-green-600">{formatCurrency(sonuclar.kismiOdeme.taksitDusurme.yeniTaksit)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-600">Taksit Farkı:</span>
                                  <span className="font-medium text-green-600">-{formatCurrency(sonuclar.kismiOdeme.taksitDusurme.taksitFarki)}</span>
                                </div>
                                <div className="pt-2 border-t mt-2">
                                  <div className="flex justify-between">
                                    <span className="text-slate-600">Tasarruf:</span>
                                    <span className="font-bold text-green-600">{formatCurrency(sonuclar.kismiOdeme.taksitDusurme.tasarruf)}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Refinansman Sonuçları */}
                  {sonuclar.refinansman && (
                    <Card className={`border-2 ${sonuclar.refinansman.avantajliMi ? 'border-green-200 bg-gradient-to-br from-green-50 to-emerald-50' : 'border-red-200 bg-gradient-to-br from-red-50 to-orange-50'}`}>
                      <CardHeader className="pb-3">
                        <CardTitle className={`text-lg flex items-center gap-2 ${sonuclar.refinansman.avantajliMi ? 'text-green-800' : 'text-red-800'}`}>
                          <RefreshCw className="h-5 w-5" />
                          Yeniden Yapılandırma Sonuçları
                          <span className={`ml-auto text-sm font-normal px-2 py-1 rounded-full ${sonuclar.refinansman.avantajliMi ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {sonuclar.refinansman.avantajliMi ? '✓ Avantajlı' : '✗ Dezavantajlı'}
                          </span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="p-4 bg-white rounded-xl border border-slate-200">
                            <p className="text-xs text-slate-500 mb-1">Eski Faiz</p>
                            <p className="text-lg font-bold text-slate-600">%{sonuclar.refinansman.eskiFaizOrani.toFixed(2)}</p>
                          </div>
                          <div className="p-4 bg-white rounded-xl border border-green-200">
                            <p className="text-xs text-slate-500 mb-1">Yeni Faiz</p>
                            <p className="text-lg font-bold text-green-600">%{sonuclar.refinansman.yeniFaizOrani.toFixed(2)}</p>
                          </div>
                          <div className="p-4 bg-white rounded-xl border border-slate-200">
                            <p className="text-xs text-slate-500 mb-1">Eski Taksit</p>
                            <p className="text-lg font-bold text-slate-600">{formatCurrency(sonuclar.refinansman.eskiTaksit)}</p>
                          </div>
                          <div className="p-4 bg-white rounded-xl border border-green-200">
                            <p className="text-xs text-slate-500 mb-1">Yeni Taksit</p>
                            <p className="text-lg font-bold text-green-600">{formatCurrency(sonuclar.refinansman.yeniTaksit)}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 bg-white rounded-xl border border-slate-200">
                            <p className="text-xs text-slate-500 mb-1">Eski Planda Kalan Ödeme</p>
                            <p className="text-xl font-bold text-slate-700">{formatCurrency(sonuclar.refinansman.eskiKalanOdeme)}</p>
                          </div>
                          <div className="p-4 bg-white rounded-xl border border-green-200">
                            <p className="text-xs text-slate-500 mb-1">Yeni Plan Toplam Ödeme</p>
                            <p className="text-xl font-bold text-green-700">{formatCurrency(sonuclar.refinansman.yeniToplamOdeme)}</p>
                          </div>
                        </div>

                        <div className={`mt-4 p-4 rounded-xl border-2 ${sonuclar.refinansman.avantajliMi ? 'bg-emerald-50 border-emerald-300' : 'bg-red-50 border-red-300'}`}>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className={`text-sm ${sonuclar.refinansman.avantajliMi ? 'text-emerald-600' : 'text-red-600'}`}>
                                {sonuclar.refinansman.avantajliMi ? 'Toplam Tasarruf' : 'Toplam Zarar'}
                              </p>
                              <p className={`text-3xl font-bold ${sonuclar.refinansman.avantajliMi ? 'text-emerald-700' : 'text-red-700'}`}>
                                {formatCurrency(Math.abs(sonuclar.refinansman.fark))}
                              </p>
                            </div>
                            {sonuclar.refinansman.avantajliMi && sonuclar.refinansman.avantajliOlduguAy > 0 && (
                              <div className="text-right">
                                <p className="text-sm text-emerald-600">Avantajlı Olduğu Ay</p>
                                <p className="text-2xl font-bold text-emerald-700">{sonuclar.refinansman.avantajliOlduguAy}. ay</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <div className="flex justify-between gap-3">
                    <Button variant="outline" onClick={() => setAktifSekme("islemler")}>
                      Geri
                    </Button>
                    <Button 
                      onClick={() => setAktifSekme("karsilastirma")}
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                    >
                      Karşılaştırmayı Gör
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <Calculator className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-slate-400 mb-2">Henüz Hesaplama Yapılmadı</h3>
                  <p className="text-slate-400 mb-6">Kredi bilgilerinizi girin ve hesaplama yapın</p>
                  <Button onClick={() => setAktifSekme("giris")} variant="outline">
                    Bilgi Girişine Git
                  </Button>
                </div>
              )}
            </TabsContent>

            {/* Sekme 4: Karşılaştırma */}
            <TabsContent value="karsilastirma" className="space-y-6">
              {sonuclar?.enAvantajli ? (
                <div className="space-y-6">
                  {/* Karşılaştırma Tablosu */}
                  <Card className="border-2 border-purple-200 overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4">
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Scale className="h-5 w-5" />
                        Senaryo Karşılaştırması
                      </h3>
                    </div>
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-slate-50 border-b">
                              <th className="text-left p-4 font-semibold">Senaryo</th>
                              <th className="text-right p-4 font-semibold">Toplam Ödeme</th>
                              <th className="text-right p-4 font-semibold">Toplam Faiz</th>
                              <th className="text-right p-4 font-semibold">Kalan Vade</th>
                              <th className="text-right p-4 font-semibold">Aylık Taksit</th>
                              <th className="text-right p-4 font-semibold">Fark</th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* Mevcut Plan */}
                            {sonuclar.mevcutPlan && (
                              <tr className="border-b hover:bg-slate-50">
                                <td className="p-4">
                                  <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-slate-400"></div>
                                    <span className="font-medium">Mevcut Plan</span>
                                  </div>
                                </td>
                                <td className="text-right p-4 font-mono">{formatCurrency(sonuclar.mevcutPlan.toplamOdeme)}</td>
                                <td className="text-right p-4 font-mono">{formatCurrency(sonuclar.mevcutPlan.toplamFaiz)}</td>
                                <td className="text-right p-4">{sonuclar.mevcutPlan.kalanTaksitler} ay</td>
                                <td className="text-right p-4 font-mono">{formatCurrency(sonuclar.mevcutPlan.aylikTaksit)}</td>
                                <td className="text-right p-4 text-slate-400">-</td>
                              </tr>
                            )}
                            
                            {/* Erken Kapama */}
                            {sonuclar.erkenKapama && (
                              <tr className={`border-b hover:bg-slate-50 ${sonuclar.enAvantajli.yontem === 'erken-kapama' ? 'bg-green-50' : ''}`}>
                                <td className="p-4">
                                  <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                                    <span className="font-medium">Erken Kapama</span>
                                    {sonuclar.enAvantajli.yontem === 'erken-kapama' && (
                                      <Badge variant="outline" className="text-green-600 border-green-300 text-xs">En İyi</Badge>
                                    )}
                                  </div>
                                </td>
                                <td className="text-right p-4 font-mono">{formatCurrency(sonuclar.erkenKapama.genelToplamMaliyet)}</td>
                                <td className="text-right p-4 font-mono">{formatCurrency(sonuclar.erkenKapama.kurtarilanFaiz)}</td>
                                <td className="text-right p-4">{sonuclar.erkenKapama.erkenKapamaAyi} ay</td>
                                <td className="text-right p-4 text-slate-400">-</td>
                                <td className={`text-right p-4 font-bold ${sonuclar.erkenKapama.netTasarruf > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  {sonuclar.erkenKapama.netTasarruf > 0 ? '+' : ''}{formatCurrency(sonuclar.erkenKapama.netTasarruf)}
                                </td>
                              </tr>
                            )}
                            
                            {/* Kısmi Ödeme - Vade Kısaltma */}
                            {sonuclar.kismiOdeme?.vadeKisaltma && (
                              <tr className={`border-b hover:bg-slate-50 ${sonuclar.enAvantajli.yontem === 'kismi-vade' ? 'bg-green-50' : ''}`}>
                                <td className="p-4">
                                  <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                    <span className="font-medium">Kısmi Ödeme (Vade Kısalt)</span>
                                    {sonuclar.enAvantajli.yontem === 'kismi-vade' && (
                                      <Badge variant="outline" className="text-green-600 border-green-300 text-xs">En İyi</Badge>
                                    )}
                                  </div>
                                </td>
                                <td className="text-right p-4 font-mono">{formatCurrency(sonuclar.kismiOdeme.vadeKisaltma.toplamOdeme)}</td>
                                <td className="text-right p-4 font-mono">{formatCurrency(sonuclar.kismiOdeme.vadeKisaltma.toplamFaiz)}</td>
                                <td className="text-right p-4">{sonuclar.kismiOdeme.vadeKisaltma.yeniVade} ay</td>
                                <td className="text-right p-4 font-mono">{formatCurrency(sonuclar.kismiOdeme.vadeKisaltma.aylikTaksit)}</td>
                                <td className={`text-right p-4 font-bold ${sonuclar.kismiOdeme.vadeKisaltma.tasarruf > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  {sonuclar.kismiOdeme.vadeKisaltma.tasarruf > 0 ? '+' : ''}{formatCurrency(sonuclar.kismiOdeme.vadeKisaltma.tasarruf)}
                                </td>
                              </tr>
                            )}
                            
                            {/* Kısmi Ödeme - Taksit Düşürme */}
                            {sonuclar.kismiOdeme?.taksitDusurme && (
                              <tr className={`border-b hover:bg-slate-50 ${sonuclar.enAvantajli.yontem === 'kismi-taksit' ? 'bg-green-50' : ''}`}>
                                <td className="p-4">
                                  <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                                    <span className="font-medium">Kısmi Ödeme (Taksit Düşür)</span>
                                    {sonuclar.enAvantajli.yontem === 'kismi-taksit' && (
                                      <Badge variant="outline" className="text-green-600 border-green-300 text-xs">En İyi</Badge>
                                    )}
                                  </div>
                                </td>
                                <td className="text-right p-4 font-mono">{formatCurrency(sonuclar.kismiOdeme.taksitDusurme.toplamOdeme)}</td>
                                <td className="text-right p-4 font-mono">{formatCurrency(sonuclar.kismiOdeme.taksitDusurme.toplamFaiz)}</td>
                                <td className="text-right p-4">{sonuclar.mevcutPlan?.kalanTaksitler || kalanVade} ay</td>
                                <td className="text-right p-4 font-mono">{formatCurrency(sonuclar.kismiOdeme.taksitDusurme.yeniTaksit)}</td>
                                <td className={`text-right p-4 font-bold ${sonuclar.kismiOdeme.taksitDusurme.tasarruf > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  {sonuclar.kismiOdeme.taksitDusurme.tasarruf > 0 ? '+' : ''}{formatCurrency(sonuclar.kismiOdeme.taksitDusurme.tasarruf)}
                                </td>
                              </tr>
                            )}
                            
                            {/* Refinansman */}
                            {sonuclar.refinansman && (
                              <tr className={`hover:bg-slate-50 ${sonuclar.enAvantajli.yontem === 'refinansman' ? 'bg-green-50' : ''}`}>
                                <td className="p-4">
                                  <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                                    <span className="font-medium">Refinansman (%{sonuclar.refinansman.yeniFaizOrani.toFixed(2)})</span>
                                    {sonuclar.enAvantajli.yontem === 'refinansman' && (
                                      <Badge variant="outline" className="text-green-600 border-green-300 text-xs">En İyi</Badge>
                                    )}
                                  </div>
                                </td>
                                <td className="text-right p-4 font-mono">{formatCurrency(sonuclar.refinansman.yeniToplamOdeme)}</td>
                                <td className="text-right p-4 font-mono">{formatCurrency(sonuclar.refinansman.yeniToplamOdeme - sonuclar.refinansman.kalanAnapara)}</td>
                                <td className="text-right p-4">{sonuclar.refinansman.yeniVade} ay</td>
                                <td className="text-right p-4 font-mono">{formatCurrency(sonuclar.refinansman.yeniTaksit)}</td>
                                <td className={`text-right p-4 font-bold ${sonuclar.refinansman.fark > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  {sonuclar.refinansman.fark > 0 ? '+' : ''}{formatCurrency(sonuclar.refinansman.fark)}
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>

                  {/* En Avantajlı Özet Kartı */}
                  <Card className="border-2 border-green-300 bg-gradient-to-br from-green-50 to-emerald-50">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-green-500 rounded-full">
                          <TrendingUp className="h-8 w-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-green-800">En Avantajlı: {sonuclar.enAvantajli.aciklama}</h3>
                          <p className="text-green-600">Toplam tasarruf: {formatCurrency(sonuclar.enAvantajli.tasarruf)}</p>
                        </div>
                      </div>
                      
                      <div className="grid sm:grid-cols-3 gap-4 mt-6">
                        <div className="p-4 bg-white rounded-xl border border-green-200">
                          <p className="text-xs text-slate-500 mb-1">Yöntem</p>
                          <p className="text-lg font-bold text-slate-800">{sonuclar.enAvantajli.aciklama}</p>
                        </div>
                        <div className="p-4 bg-white rounded-xl border border-green-200">
                          <p className="text-xs text-slate-500 mb-1">Net Tasarruf</p>
                          <p className="text-lg font-bold text-green-600">{formatCurrency(sonuclar.enAvantajli.tasarruf)}</p>
                        </div>
                        <div className="p-4 bg-white rounded-xl border border-green-200">
                          <p className="text-xs text-slate-500 mb-1">Tasarruf Oranı</p>
                          <p className="text-lg font-bold text-green-600">
                            %{sonuclar.mevcutPlan ? ((sonuclar.enAvantajli.tasarruf / sonuclar.mevcutPlan.toplamOdeme) * 100).toFixed(2) : '0.00'}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Görsel Karşılaştırma Grafiği */}
                  <Card className="border-2 border-slate-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-purple-600" />
                        Toplam Ödeme Karşılaştırması
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {sonuclar.mevcutPlan && (
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Mevcut Plan</span>
                              <span className="font-mono">{formatCurrency(sonuclar.mevcutPlan.toplamOdeme)}</span>
                            </div>
                            <div className="h-6 bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-slate-400 rounded-full" style={{ width: '100%' }}></div>
                            </div>
                          </div>
                        )}
                        
                        {sonuclar.erkenKapama && (
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Erken Kapama</span>
                              <span className="font-mono">{formatCurrency(sonuclar.erkenKapama.toplamOdeme)}</span>
                            </div>
                            <div className="h-6 bg-slate-100 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-orange-500 rounded-full" 
                                style={{ width: `${sonuclar.mevcutPlan ? (sonuclar.erkenKapama.toplamOdeme / sonuclar.mevcutPlan.toplamOdeme * 100) : 100}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                        
                        {sonuclar.kismiOdeme?.vadeKisaltma && (
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Kısmi Ödeme (Vade Kısalt)</span>
                              <span className="font-mono">{formatCurrency(sonuclar.kismiOdeme.vadeKisaltma.toplamOdeme)}</span>
                            </div>
                            <div className="h-6 bg-slate-100 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-blue-500 rounded-full" 
                                style={{ width: `${sonuclar.mevcutPlan ? (sonuclar.kismiOdeme.vadeKisaltma.toplamOdeme / sonuclar.mevcutPlan.toplamOdeme * 100) : 100}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                        
                        {sonuclar.kismiOdeme?.taksitDusurme && (
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Kısmi Ödeme (Taksit Düşür)</span>
                              <span className="font-mono">{formatCurrency(sonuclar.kismiOdeme.taksitDusurme.toplamOdeme)}</span>
                            </div>
                            <div className="h-6 bg-slate-100 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-cyan-500 rounded-full" 
                                style={{ width: `${sonuclar.mevcutPlan ? (sonuclar.kismiOdeme.taksitDusurme.toplamOdeme / sonuclar.mevcutPlan.toplamOdeme * 100) : 100}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                        
                        {sonuclar.refinansman && (
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Refinansman</span>
                              <span className="font-mono">{formatCurrency(sonuclar.refinansman.yeniToplamOdeme)}</span>
                            </div>
                            <div className="h-6 bg-slate-100 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-purple-500 rounded-full" 
                                style={{ width: `${sonuclar.mevcutPlan ? (sonuclar.refinansman.yeniToplamOdeme / sonuclar.mevcutPlan.toplamOdeme * 100) : 100}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-slate-200">
                        <p className="text-xs text-slate-500 text-center">
                          Bar uzunluğu mevcut plana göre oranlanmıştır. Kısa bar = daha az ödeme = daha avantajlı
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Navigation */}
                  <div className="flex justify-between gap-3">
                    <Button variant="outline" onClick={() => setAktifSekme("sonuc")}>
                      <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                      Geri
                    </Button>
                    <Button 
                      onClick={() => window.print()}
                      variant="outline"
                      className="border-purple-200 text-purple-700 hover:bg-purple-50"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Yazdır / PDF
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Scale className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-slate-400 mb-2">Henüz Karşılaştırma Yapılmadı</h3>
                  <p className="text-slate-400 mb-6">Önce hesaplama yapın</p>
                  <Button onClick={() => setAktifSekme("giris")} variant="outline">
                    Bilgi Girişine Git
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Detaylı Bilgi Kartları */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Nasıl Kullanılır */}
        <Card className="border-2 border-blue-100">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BookOpen className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold mb-3">Nasıl Kullanılır?</h3>
                <ol className="text-sm text-slate-600 space-y-2 list-decimal list-inside">
                  <li><strong>Kredi Türü:</strong> Konut, ihtiyaç, taşıt veya ticari kredi seçin</li>
                  <li><strong>Temel Bilgiler:</strong> Kredi tutarı, faiz oranı ve vade bilgilerini girin</li>
                  <li><strong>Mevcut Durum:</strong> Kaç ay ödeme yaptığınızı belirtin</li>
                  <li><strong>İşlem Seçin:</strong> Erken kapama, kısmi ödeme veya refinansman</li>
                  <li><strong>Hesapla:</strong> Tüm senaryoları karşılaştırın</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* İpuçları */}
        <Card className="border-2 border-indigo-100">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Lightbulb className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-bold mb-3">Önemli İpuçları</h3>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span><strong>Konut kredisi:</strong> Erken kapama cezası yasal olarak alınamaz</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">✓</span>
                    <span><strong>Vade kısaltma:</strong> Toplam faiz ödemesini minimize eder</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500">✓</span>
                    <span><strong>Taksit düşürme:</strong> Aylık nakit akışını rahatlatır</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500">✓</span>
                    <span><strong>Refinansman:</strong> Faiz düşüşlerinde avantajlı olabilir</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Örnek Kullanım Senaryoları */}
      <Card className="border-2 border-emerald-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-emerald-600" />
            Örnek Kullanım Senaryoları
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-emerald-50 rounded-xl">
              <h4 className="font-semibold text-emerald-800 mb-2">📦 Miras veya İkramiye</h4>
              <p className="text-sm text-emerald-700">
                Beklenmedik bir gelir elde ettiniz. Erken kapama mı yoksa kısmi ödeme mi daha mantıklı? 
                Her iki senaryoyu karşılaştırın.
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-xl">
              <h4 className="font-semibold text-blue-800 mb-2">📉 Faiz Düşüşü</h4>
              <p className="text-sm text-blue-700">
                Piyasada faizler düştü. Mevcut kredinizi kapatıp yeni faizle refinansman mı yapmalısınız? 
                Hesaplayıcı tam bunu gösteriyor.
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-xl">
              <h4 className="font-semibold text-purple-800 mb-2">💰 Bütçe Rahatlatma</h4>
              <p className="text-sm text-purple-700">
                Aylık ödemeler ağır geliyor. Birikimle kısmi ödeme yapıp taksitleri düşürmek mümkün. 
                Ne kadar rahatlayacağınızı görün.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* BSMV ve KKDF Bilgisi */}
      <Card className="border-2 border-amber-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5 text-amber-600" />
            BSMV ve KKDF Nedir?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-amber-800 mb-2">BSMV (Banka ve Sigorta Muameleleri Vergisi)</h4>
              <p className="text-sm text-slate-600 mb-2">
                Bankaların aldığı faiz gelirleri üzerinden devlete ödenen vergidir. Bu vergi faiz tutarına eklenir.
              </p>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Konut ve ticari kredi: <strong>%5</strong></li>
                <li>• İhtiyaç ve taşıt kredisi: <strong>%10</strong></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-amber-800 mb-2">KKDF (Kaynak Kullanımını Destekleme Fonu)</h4>
              <p className="text-sm text-slate-600 mb-2">
                Tüketici kredilerinde faiz üzerinden alınan ek fondur. Tasarrufları teşvik etmek amacıyla uygulanır.
              </p>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Konut kredisi: <strong>%15</strong></li>
                <li>• İhtiyaç ve taşıt kredisi: <strong>%15</strong></li>
                <li>• Ticari kredi: <strong>%0</strong> (uygulanmaz)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* İlginç Bilgiler */}
      <Card className="border-2 border-purple-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-purple-600" />
            İlginç Bilgiler
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
              <span className="text-2xl">💡</span>
              <div>
                <p className="text-sm text-purple-800">
                  <strong>Bilmekte fayda var:</strong> Türkiye'de konut kredilerinde 6502 sayılı TKHK gereği 
                  erken kapama cezası alınması yasaktır. Sadece dosya masrafı talep edilebilir.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-indigo-50 rounded-lg">
              <span className="text-2xl">📊</span>
              <div>
                <p className="text-sm text-indigo-800">
                  <strong>İstatistik:</strong> Ortalama bir konut kredisinde toplam geri ödemenin 
                  yaklaşık %40-60'ı faiz olarak ödenir. Erken kapama bu oranı önemli ölçüde düşürür.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-cyan-50 rounded-lg">
              <span className="text-2xl">🎯</span>
              <div>
                <p className="text-sm text-cyan-800">
                  <strong>Stratejik ipucu:</strong> Kredinin ilk yarısında yapılan erken ödemeler, 
                  ikinci yarıda yapılanlara göre çok daha fazla faiz tasarrufu sağlar.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-teal-50 rounded-lg">
              <span className="text-2xl">🔄</span>
              <div>
                <p className="text-sm text-teal-800">
                  <strong>Refinansman ipucu:</strong> Yeni faiz oranının mevcut oranın en az %1-2 puan 
                  altında olması gerekir ki masraflar çıkarıldıktan sonra avantajlı olsun.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Uyarı Notu */}
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
        <p className="text-sm text-amber-800">
          <strong>Not:</strong> Bu hesaplama aracı, genel bilgiler sağlamak amacıyla tasarlanmıştır ve bireysel durumlara göre değişiklik gösterebilir. Kesin hesaplamalar için bir mali müşavir veya finans uzmanına danışmanız önerilir. Hukuki tavsiye niteliği taşımaz.
        </p>
      </div>
    </div>
  )
}
