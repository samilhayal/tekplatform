"use client"

import { useState, useMemo, useEffect, useCallback } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { 
  Baby,
  Calculator,
  Ruler,
  Scale,
  Activity,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertCircle,
  CheckCircle2,
  Info,
  BookOpen,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  Calendar,
  User,
  Heart,
  Brain,
  RotateCcw,
  Home,
  Sparkles,
  Printer,
  FileText,
  Save,
  Trash2,
  Plus,
  History,
  LineChart as LineChartIcon
} from "lucide-react"
import {
  hesaplaPersentil,
  persentilEgriVerisi,
  yasHesapla,
  persentilDegerler,
  PersentilSonuc
} from "@/lib/who-growth-data"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceDot,
  Area,
  ComposedChart,
  Scatter
} from "recharts"

// LocalStorage key
const STORAGE_KEY = 'bebek-gelisim-verileri'

// Öneri türleri
interface Oneri {
  tip: 'basarili' | 'uyari' | 'bilgi';
  baslik: string;
  aciklama: string;
}

// Gelişim geçmişi - geliştirilmiş
interface GelisimKaydi {
  id: string;
  tarih: string;
  olcumTarihi: string; // Ölçüm yapılan tarih (YYYY-MM-DD)
  yasAy: number;
  yasGun?: number;
  boy?: number;
  kilo?: number;
  basCevresi?: number;
  boyPersentil?: number;
  kiloPersentil?: number;
  basPersentil?: number;
}

// Kayıtlı veriler
interface KayitliVeriler {
  cinsiyet: 'erkek' | 'kiz';
  bebekAdi: string;
  dogumGun: string;
  dogumAy: string;
  dogumYil: string;
  boy: string;
  kilo: string;
  basCevresi: string;
  gelisimGecmisi: GelisimKaydi[];
}

export function BebekGelisimHesaplayici() {
  // Form state
  const [cinsiyet, setCinsiyet] = useState<'erkek' | 'kiz'>('erkek')
  const [bebekAdi, setBebekAdi] = useState<string>('')
  const [yasGirisTipi, setYasGirisTipi] = useState<'dogumTarihi' | 'manuel'>('dogumTarihi')
  // Doğum tarihi: gün/ay/yıl ayrı
  const [dogumGun, setDogumGun] = useState<string>('')
  const [dogumAy, setDogumAy] = useState<string>('')
  const [dogumYil, setDogumYil] = useState<string>('')
  const [yasAy, setYasAy] = useState<string>('')
  const [yasGun, setYasGun] = useState<string>('')
  const [boy, setBoy] = useState<string>('')
  const [kilo, setKilo] = useState<string>('')
  const [basCevresi, setBasCevresi] = useState<string>('')
  const [dataYuklendi, setDataYuklendi] = useState(false)
  
  // Sonuçlar
  const [sonuclar, setSonuclar] = useState<{
    boy: PersentilSonuc | null;
    kilo: PersentilSonuc | null;
    basCevresi: PersentilSonuc | null;
    yasAy: number;
  } | null>(null)
  
  // Gelişim geçmişi
  const [gelisimGecmisi, setGelisimGecmisi] = useState<GelisimKaydi[]>([])
  const [gecmisAcik, setGecmisAcik] = useState(false)
  
  // Aktif grafik
  const [aktifGrafik, setAktifGrafik] = useState<'boy' | 'kilo' | 'basCevresi'>('boy')

  // LocalStorage'dan verileri yükle
  useEffect(() => {
    try {
      const kayitliVeri = localStorage.getItem(STORAGE_KEY)
      if (kayitliVeri) {
        const veriler: KayitliVeriler = JSON.parse(kayitliVeri)
        setCinsiyet(veriler.cinsiyet || 'erkek')
        setBebekAdi(veriler.bebekAdi || '')
        setDogumGun(veriler.dogumGun || '')
        setDogumAy(veriler.dogumAy || '')
        setDogumYil(veriler.dogumYil || '')
        setBoy(veriler.boy || '')
        setKilo(veriler.kilo || '')
        setBasCevresi(veriler.basCevresi || '')
        setGelisimGecmisi(veriler.gelisimGecmisi || [])
      }
    } catch (e) {
      console.error('LocalStorage okuma hatası:', e)
    }
    setDataYuklendi(true)
  }, [])

  // Verileri localStorage'a kaydet
  const verileriKaydet = useCallback(() => {
    if (!dataYuklendi) return
    try {
      const veriler: KayitliVeriler = {
        cinsiyet,
        bebekAdi,
        dogumGun,
        dogumAy,
        dogumYil,
        boy,
        kilo,
        basCevresi,
        gelisimGecmisi
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(veriler))
    } catch (e) {
      console.error('LocalStorage kayıt hatası:', e)
    }
  }, [cinsiyet, bebekAdi, dogumGun, dogumAy, dogumYil, boy, kilo, basCevresi, gelisimGecmisi, dataYuklendi])

  // Her değişiklikte otomatik kaydet
  useEffect(() => {
    verileriKaydet()
  }, [verileriKaydet])

  // Tüm verileri temizle
  const tumVerileriTemizle = () => {
    if (window.confirm('Tüm kayıtlı verileri silmek istediğinize emin misiniz?')) {
      localStorage.removeItem(STORAGE_KEY)
      setCinsiyet('erkek')
      setBebekAdi('')
      setDogumGun('')
      setDogumAy('')
      setDogumYil('')
      setBoy('')
      setKilo('')
      setBasCevresi('')
      setGelisimGecmisi([])
      setSonuclar(null)
    }
  }

  // Mevcut ölçümü geçmişe kaydet
  const olcumKaydet = () => {
    if (!hesaplananYas) {
      alert('Lütfen önce doğum tarihini girin.')
      return
    }
    
    if (!boy && !kilo && !basCevresi) {
      alert('Lütfen en az bir ölçüm değeri girin.')
      return
    }

    const bugun = new Date().toISOString().split('T')[0]
    
    // Aynı tarihte kayıt var mı kontrol et
    const mevcutKayit = gelisimGecmisi.find(k => k.olcumTarihi === bugun)
    if (mevcutKayit) {
      if (!window.confirm('Bugün için zaten bir kayıt var. Üzerine yazmak ister misiniz?')) {
        return
      }
      // Mevcut kaydı sil
      setGelisimGecmisi(prev => prev.filter(k => k.olcumTarihi !== bugun))
    }

    const yeniKayit: GelisimKaydi = {
      id: Date.now().toString(),
      tarih: new Date().toLocaleDateString('tr-TR'),
      olcumTarihi: bugun,
      yasAy: hesaplananYas.toplamAy,
      yasGun: hesaplananYas.gun,
      boy: boy ? parseFloat(boy) : undefined,
      kilo: kilo ? parseFloat(kilo) : undefined,
      basCevresi: basCevresi ? parseFloat(basCevresi) : undefined,
      boyPersentil: sonuclar?.boy?.persentil,
      kiloPersentil: sonuclar?.kilo?.persentil,
      basPersentil: sonuclar?.basCevresi?.persentil
    }

    setGelisimGecmisi(prev => [...prev, yeniKayit].sort((a, b) => 
      new Date(a.olcumTarihi).getTime() - new Date(b.olcumTarihi).getTime()
    ))
    
    alert('Ölçüm başarıyla kaydedildi!')
  }

  // Ölçüm kaydını sil
  const olcumSil = (id: string) => {
    if (window.confirm('Bu ölçümü silmek istediğinize emin misiniz?')) {
      setGelisimGecmisi(prev => prev.filter(k => k.id !== id))
    }
  }

  // Gelişim grafiği verisi
  const gelisimGrafikVerisi = useMemo(() => {
    if (gelisimGecmisi.length === 0) return null
    
    return gelisimGecmisi.map(kayit => ({
      tarih: kayit.tarih,
      olcumTarihi: kayit.olcumTarihi,
      yasAy: kayit.yasAy.toFixed(1),
      boy: kayit.boy,
      kilo: kayit.kilo,
      basCevresi: kayit.basCevresi,
      boyPersentil: kayit.boyPersentil,
      kiloPersentil: kayit.kiloPersentil,
      basPersentil: kayit.basPersentil
    }))
  }, [gelisimGecmisi])

  // Gün seçenekleri (1-31)
  const gunSecenekleri = Array.from({ length: 31 }, (_, i) => i + 1)
  
  // Ay seçenekleri
  const aySecenekleri = [
    { value: '1', label: 'Ocak' },
    { value: '2', label: 'Şubat' },
    { value: '3', label: 'Mart' },
    { value: '4', label: 'Nisan' },
    { value: '5', label: 'Mayıs' },
    { value: '6', label: 'Haziran' },
    { value: '7', label: 'Temmuz' },
    { value: '8', label: 'Ağustos' },
    { value: '9', label: 'Eylül' },
    { value: '10', label: 'Ekim' },
    { value: '11', label: 'Kasım' },
    { value: '12', label: 'Aralık' }
  ]
  
  // Yıl seçenekleri (son 6 yıl)
  const buYil = new Date().getFullYear()
  const yilSecenekleri = Array.from({ length: 6 }, (_, i) => buYil - i)

  // Yaş hesaplama
  const hesaplananYas = useMemo(() => {
    if (yasGirisTipi === 'dogumTarihi' && dogumGun && dogumAy && dogumYil) {
      const tarih = new Date(parseInt(dogumYil), parseInt(dogumAy) - 1, parseInt(dogumGun))
      if (!isNaN(tarih.getTime())) {
        return yasHesapla(tarih)
      }
    } else if (yasGirisTipi === 'manuel') {
      const ay = parseInt(yasAy) || 0
      const gun = parseInt(yasGun) || 0
      return {
        yil: Math.floor(ay / 12),
        ay: ay % 12,
        gun,
        toplamAy: ay + (gun / 30)
      }
    }
    return null
  }, [yasGirisTipi, dogumGun, dogumAy, dogumYil, yasAy, yasGun])

  // Hesaplama fonksiyonu
  const hesapla = () => {
    if (!hesaplananYas) return

    const ayOlarak = hesaplananYas.toplamAy

    // Yaş kontrolü (0-60 ay)
    if (ayOlarak < 0 || ayOlarak > 60) {
      alert('Bu hesaplayıcı 0-5 yaş arası bebekler için tasarlanmıştır.')
      return
    }

    const boySonuc = boy ? hesaplaPersentil('boy', cinsiyet, ayOlarak, parseFloat(boy)) : null
    const kiloSonuc = kilo ? hesaplaPersentil('kilo', cinsiyet, ayOlarak, parseFloat(kilo)) : null
    const basCevresiSonuc = basCevresi ? hesaplaPersentil('basCevresi', cinsiyet, ayOlarak, parseFloat(basCevresi)) : null

    setSonuclar({
      boy: boySonuc,
      kilo: kiloSonuc,
      basCevresi: basCevresiSonuc,
      yasAy: ayOlarak
    })
  }

  // Önerileri oluştur
  const oneriler = useMemo((): Oneri[] => {
    if (!sonuclar) return []

    const onerileri: Oneri[] = []

    // Boy önerileri
    if (sonuclar.boy) {
      if (sonuclar.boy.kategori === 'normal') {
        onerileri.push({
          tip: 'basarili',
          baslik: 'Boy Gelişimi Normal',
          aciklama: `Bebeğinizin boyu yaşına göre normal aralıkta. %${sonuclar.boy.persentil.toFixed(1)} persentilde.`
        })
      } else if (sonuclar.boy.kategori === 'dusuk' || sonuclar.boy.kategori === 'cok-dusuk') {
        onerileri.push({
          tip: 'uyari',
          baslik: 'Boy Takibi Önerilir',
          aciklama: 'Bebeğinizin boyu normalin altında görünüyor. Düzenli takip ve beslenme değerlendirmesi önerilir.'
        })
      } else if (sonuclar.boy.kategori === 'yuksek' || sonuclar.boy.kategori === 'cok-yuksek') {
        onerileri.push({
          tip: 'bilgi',
          baslik: 'Boy Ortalamanın Üstünde',
          aciklama: 'Bebeğinizin boyu yaşıtlarının çoğundan uzun. Genetik faktörler etkili olabilir.'
        })
      }
    }

    // Kilo önerileri
    if (sonuclar.kilo) {
      if (sonuclar.kilo.kategori === 'normal') {
        onerileri.push({
          tip: 'basarili',
          baslik: 'Kilo Gelişimi Normal',
          aciklama: `Bebeğinizin kilosu yaşına göre ideal aralıkta. %${sonuclar.kilo.persentil.toFixed(1)} persentilde.`
        })
      } else if (sonuclar.kilo.kategori === 'dusuk' || sonuclar.kilo.kategori === 'cok-dusuk') {
        onerileri.push({
          tip: 'uyari',
          baslik: 'Kilo Takibi Önerilir',
          aciklama: 'Bebeğinizin kilosu normalin altında. Beslenme düzeni ve kalori alımı değerlendirilmeli.'
        })
      } else if (sonuclar.kilo.kategori === 'yuksek' || sonuclar.kilo.kategori === 'cok-yuksek') {
        onerileri.push({
          tip: 'bilgi',
          baslik: 'Kilo Ortalamanın Üstünde',
          aciklama: 'Bebeğinizin kilosu yüksek görünüyor. Beslenme alışkanlıkları değerlendirilebilir.'
        })
      }
    }

    // Baş çevresi önerileri
    if (sonuclar.basCevresi) {
      if (sonuclar.basCevresi.kategori === 'normal') {
        onerileri.push({
          tip: 'basarili',
          baslik: 'Baş Çevresi Normal',
          aciklama: `Bebeğinizin baş çevresi normal sınırlarda. %${sonuclar.basCevresi.persentil.toFixed(1)} persentilde.`
        })
      } else if (sonuclar.basCevresi.kategori === 'cok-dusuk') {
        onerileri.push({
          tip: 'uyari',
          baslik: 'Baş Çevresi Düşük',
          aciklama: 'Baş çevresi persentili düşük (mikrosefali riski). Pediatrik değerlendirme önerilir.'
        })
      } else if (sonuclar.basCevresi.kategori === 'cok-yuksek') {
        onerileri.push({
          tip: 'uyari',
          baslik: 'Baş Çevresi Yüksek',
          aciklama: 'Baş çevresi persentili yüksek (makrosefali). Bazı bebeklerde normal olabilir, takip önerilir.'
        })
      } else if (sonuclar.basCevresi.kategori === 'yuksek') {
        onerileri.push({
          tip: 'bilgi',
          baslik: 'Baş Çevresi Ortalamanın Üstünde',
          aciklama: 'Bebeğinizin baş çevresi ortalamanın üstünde. Bu genellikle hızlı beyin gelişimini gösterir.'
        })
      }
    }

    // Genel öneri
    if (onerileri.length === 0) {
      onerileri.push({
        tip: 'bilgi',
        baslik: 'Ölçüm Girin',
        aciklama: 'Boy, kilo veya baş çevresi değerlerini girerek persentil hesaplayın.'
      })
    }

    return onerileri
  }, [sonuclar])

  // Grafik verileri
  const grafikVerileri = useMemo(() => {
    if (!sonuclar) return null

    const olcumTipi = aktifGrafik
    const persentil3 = persentilEgriVerisi(olcumTipi, cinsiyet, 3)
    const persentil15 = persentilEgriVerisi(olcumTipi, cinsiyet, 15)
    const persentil50 = persentilEgriVerisi(olcumTipi, cinsiyet, 50)
    const persentil85 = persentilEgriVerisi(olcumTipi, cinsiyet, 85)
    const persentil97 = persentilEgriVerisi(olcumTipi, cinsiyet, 97)

    // Bebeğin değeri
    const bebekDegeri = 
      olcumTipi === 'boy' ? sonuclar.boy?.deger :
      olcumTipi === 'kilo' ? sonuclar.kilo?.deger :
      sonuclar.basCevresi?.deger

    // Verileri birleştir
    const birlesik = persentil50.map((item, index) => {
      const veri: any = {
        ay: item.ay,
        p3: persentil3[index]?.deger,
        p15: persentil15[index]?.deger,
        p50: persentil50[index]?.deger,
        p85: persentil85[index]?.deger,
        p97: persentil97[index]?.deger
      }
      // Bebeğin yaşına denk gelen noktayı işaretle
      if (Math.round(sonuclar.yasAy) === item.ay && bebekDegeri) {
        veri.bebek = bebekDegeri
      }
      return veri
    })

    return birlesik
  }, [aktifGrafik, cinsiyet, sonuclar])
  
  // Bebeğin grafikteki değeri
  const bebekGrafikNoktasi = useMemo(() => {
    if (!sonuclar) return null
    
    const bebekDegeri = 
      aktifGrafik === 'boy' ? sonuclar.boy?.deger :
      aktifGrafik === 'kilo' ? sonuclar.kilo?.deger :
      sonuclar.basCevresi?.deger
    
    if (!bebekDegeri) return null
    
    return [{
      ay: Math.round(sonuclar.yasAy),
      bebek: bebekDegeri
    }]
  }, [sonuclar, aktifGrafik])

  // Persentil rengi
  const getPersentilRenk = (kategori: string) => {
    switch (kategori) {
      case 'cok-dusuk': return 'bg-red-100 text-red-700 border-red-300'
      case 'dusuk': return 'bg-orange-100 text-orange-700 border-orange-300'
      case 'normal': return 'bg-green-100 text-green-700 border-green-300'
      case 'yuksek': return 'bg-blue-100 text-blue-700 border-blue-300'
      case 'cok-yuksek': return 'bg-purple-100 text-purple-700 border-purple-300'
      default: return 'bg-slate-100 text-slate-700 border-slate-300'
    }
  }

  // Persentil ikonu
  const getPersentilIcon = (kategori: string) => {
    switch (kategori) {
      case 'cok-dusuk': 
      case 'dusuk': 
        return <TrendingDown className="h-4 w-4" />
      case 'normal': 
        return <Minus className="h-4 w-4" />
      case 'yuksek': 
      case 'cok-yuksek': 
        return <TrendingUp className="h-4 w-4" />
      default: 
        return <Minus className="h-4 w-4" />
    }
  }

  // Grafik başlığı
  const grafikBasligi = {
    boy: 'Boy (cm)',
    kilo: 'Kilo (kg)',
    basCevresi: 'Baş Çevresi (cm)'
  }

  // Rapor yazdırma fonksiyonu
  const raporYazdir = () => {
    if (!sonuclar) return
    
    const printWindow = window.open('', '_blank')
    if (!printWindow) return
    
    const yasStr = hesaplananYas ? 
      `${hesaplananYas.yil > 0 ? hesaplananYas.yil + ' yıl ' : ''}${hesaplananYas.ay} ay ${hesaplananYas.gun} gün` : ''
    
    // Gelişim geçmişi HTML'i
    const gelisimGecmisiHTML = gelisimGecmisi.length > 0 ? `
      <h2>📈 Gelişim Geçmişi (${gelisimGecmisi.length} kayıt)</h2>
      <table class="history-table">
        <thead>
          <tr>
            <th>Tarih</th>
            <th>Yaş</th>
            <th>Boy (cm)</th>
            <th>Kilo (kg)</th>
            <th>Baş Ç. (cm)</th>
          </tr>
        </thead>
        <tbody>
          ${gelisimGecmisi.map(k => `
            <tr>
              <td>${k.tarih}</td>
              <td>${k.yasAy.toFixed(1)} ay</td>
              <td>${k.boy ? `${k.boy} <span class="persentil-small">${k.boyPersentil ? `(%${k.boyPersentil.toFixed(0)})` : ''}</span>` : '-'}</td>
              <td>${k.kilo ? `${k.kilo} <span class="persentil-small">${k.kiloPersentil ? `(%${k.kiloPersentil.toFixed(0)})` : ''}</span>` : '-'}</td>
              <td>${k.basCevresi ? `${k.basCevresi} <span class="persentil-small">${k.basPersentil ? `(%${k.basPersentil.toFixed(0)})` : ''}</span>` : '-'}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      
      ${gelisimGecmisi.length >= 2 ? `
      <div class="chart-info">
        <h3>📊 Gelişim Özeti</h3>
        <div class="summary-grid">
          ${(() => {
            const ilk = gelisimGecmisi[0]
            const son = gelisimGecmisi[gelisimGecmisi.length - 1]
            const boyFark = ilk.boy && son.boy ? (son.boy - ilk.boy).toFixed(1) : null
            const kiloFark = ilk.kilo && son.kilo ? (son.kilo - ilk.kilo).toFixed(1) : null
            const basFark = ilk.basCevresi && son.basCevresi ? (son.basCevresi - ilk.basCevresi).toFixed(1) : null
            const yasAyFark = (son.yasAy - ilk.yasAy).toFixed(1)
            
            return `
              <div class="summary-item">
                <span>Takip Süresi:</span>
                <strong>${yasAyFark} ay</strong>
              </div>
              ${boyFark ? `<div class="summary-item"><span>Boy Artışı:</span><strong>+${boyFark} cm</strong></div>` : ''}
              ${kiloFark ? `<div class="summary-item"><span>Kilo Artışı:</span><strong>+${kiloFark} kg</strong></div>` : ''}
              ${basFark ? `<div class="summary-item"><span>Baş Çevresi Artışı:</span><strong>+${basFark} cm</strong></div>` : ''}
            `
          })()}
        </div>
      </div>
      ` : ''}
    ` : ''
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Bebek Gelişim Raporu - KolayHesapla.org</title>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; color: #1e293b; }
          h1 { color: #ec4899; border-bottom: 3px solid #ec4899; padding-bottom: 10px; text-align: center; }
          h2 { color: #db2777; margin-top: 30px; }
          h3 { color: #9333ea; margin-top: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .logo { font-size: 24px; font-weight: bold; color: #ec4899; }
          .date { color: #64748b; font-size: 14px; margin-top: 5px; }
          .baby-info { background: linear-gradient(135deg, #fdf2f8, #fce7f3); padding: 20px; border-radius: 15px; margin: 20px 0; text-align: center; }
          .baby-name { font-size: 28px; font-weight: bold; color: #be185d; margin-bottom: 10px; }
          .baby-details { color: #9d174d; font-size: 16px; }
          .section { background: #f8fafc; padding: 20px; border-radius: 10px; margin: 15px 0; border-left: 4px solid #ec4899; }
          .metric { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e2e8f0; }
          .metric:last-child { border-bottom: none; }
          .metric-label { color: #64748b; font-size: 14px; }
          .metric-value { font-weight: bold; color: #1e293b; font-size: 16px; }
          .persentil { display: inline-block; padding: 4px 12px; border-radius: 20px; font-weight: bold; margin-left: 10px; }
          .persentil.normal { background: #dcfce7; color: #166534; }
          .persentil.dusuk { background: #fef3c7; color: #92400e; }
          .persentil.yuksek { background: #dbeafe; color: #1e40af; }
          .persentil.uyari { background: #fee2e2; color: #991b1b; }
          .persentil-small { color: #64748b; font-size: 11px; }
          .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin: 20px 0; }
          .card { background: white; padding: 20px; border-radius: 12px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
          .card-icon { font-size: 24px; margin-bottom: 8px; }
          .card-title { font-size: 12px; color: #64748b; margin-bottom: 5px; }
          .card-value { font-size: 24px; font-weight: bold; }
          .card-value.boy { color: #7c3aed; }
          .card-value.kilo { color: #059669; }
          .card-value.bas { color: #0891b2; }
          .history-table { width: 100%; border-collapse: collapse; margin: 15px 0; font-size: 13px; }
          .history-table th, .history-table td { padding: 10px; text-align: center; border: 1px solid #e2e8f0; }
          .history-table th { background: linear-gradient(135deg, #f3e8ff, #fce7f3); color: #7c3aed; font-weight: 600; }
          .history-table tr:nth-child(even) { background: #faf5ff; }
          .chart-info { background: linear-gradient(135deg, #f3e8ff, #fce7f3); padding: 20px; border-radius: 12px; margin-top: 20px; }
          .summary-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-top: 15px; }
          .summary-item { background: white; padding: 10px 15px; border-radius: 8px; display: flex; justify-content: space-between; }
          .summary-item span { color: #64748b; }
          .summary-item strong { color: #059669; }
          .footer { margin-top: 40px; text-align: center; color: #94a3b8; font-size: 12px; border-top: 1px solid #e2e8f0; padding-top: 20px; }
          .note { background: #fffbeb; border: 1px solid #fbbf24; padding: 15px; border-radius: 8px; margin-top: 20px; font-size: 13px; color: #92400e; }
          @media print { body { padding: 20px; } }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">👶 KolayHesapla.org</div>
          <h1>Bebek Gelişim Takip Raporu</h1>
          <div class="date">Rapor Tarihi: ${new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
        </div>
        
        <div class="baby-info">
          <div class="baby-name">${bebekAdi || 'Bebek'} ${cinsiyet === 'erkek' ? '👦' : '👧'}</div>
          <div class="baby-details">
            <strong>Yaş:</strong> ${yasStr} &nbsp;&nbsp;|&nbsp;&nbsp;
            <strong>Cinsiyet:</strong> ${cinsiyet === 'erkek' ? 'Erkek' : 'Kız'}
            ${dogumGun && dogumAy && dogumYil ? `&nbsp;&nbsp;|&nbsp;&nbsp;<strong>Doğum:</strong> ${dogumGun}/${dogumAy}/${dogumYil}` : ''}
          </div>
        </div>
        
        <h2>📋 Güncel Ölçümler</h2>
        <div class="grid">
          ${sonuclar.boy ? `
          <div class="card">
            <div class="card-icon">📏</div>
            <div class="card-title">BOY</div>
            <div class="card-value boy">${sonuclar.boy.deger} cm</div>
            <div class="persentil ${sonuclar.boy.kategori === 'normal' ? 'normal' : sonuclar.boy.kategori.includes('dusuk') ? 'dusuk' : 'yuksek'}">
              %${sonuclar.boy.persentil.toFixed(1)}
            </div>
          </div>
          ` : ''}
          ${sonuclar.kilo ? `
          <div class="card">
            <div class="card-icon">⚖️</div>
            <div class="card-title">KİLO</div>
            <div class="card-value kilo">${sonuclar.kilo.deger} kg</div>
            <div class="persentil ${sonuclar.kilo.kategori === 'normal' ? 'normal' : sonuclar.kilo.kategori.includes('dusuk') ? 'dusuk' : 'yuksek'}">
              %${sonuclar.kilo.persentil.toFixed(1)}
            </div>
          </div>
          ` : ''}
          ${sonuclar.basCevresi ? `
          <div class="card">
            <div class="card-icon">🧠</div>
            <div class="card-title">BAŞ ÇEVRESİ</div>
            <div class="card-value bas">${sonuclar.basCevresi.deger} cm</div>
            <div class="persentil ${sonuclar.basCevresi.kategori === 'normal' ? 'normal' : sonuclar.basCevresi.kategori.includes('dusuk') ? 'uyari' : 'yuksek'}">
              %${sonuclar.basCevresi.persentil.toFixed(1)}
            </div>
          </div>
          ` : ''}
        </div>
        
        <h2>📊 Detaylı Analiz</h2>
        <div class="section">
          ${sonuclar.boy ? `
          <div class="metric">
            <span class="metric-label">Boy Persentili:</span>
            <span class="metric-value">%${sonuclar.boy.persentil.toFixed(1)} - ${sonuclar.boy.kategoriLabel}</span>
          </div>
          <div class="metric">
            <span class="metric-label">Boy Z-Score:</span>
            <span class="metric-value">${sonuclar.boy.zScore.toFixed(2)}</span>
          </div>
          ` : ''}
          ${sonuclar.kilo ? `
          <div class="metric">
            <span class="metric-label">Kilo Persentili:</span>
            <span class="metric-value">%${sonuclar.kilo.persentil.toFixed(1)} - ${sonuclar.kilo.kategoriLabel}</span>
          </div>
          <div class="metric">
            <span class="metric-label">Kilo Z-Score:</span>
            <span class="metric-value">${sonuclar.kilo.zScore.toFixed(2)}</span>
          </div>
          ` : ''}
          ${sonuclar.basCevresi ? `
          <div class="metric">
            <span class="metric-label">Baş Çevresi Persentili:</span>
            <span class="metric-value">%${sonuclar.basCevresi.persentil.toFixed(1)} - ${sonuclar.basCevresi.kategoriLabel}</span>
          </div>
          <div class="metric">
            <span class="metric-label">Baş Çevresi Z-Score:</span>
            <span class="metric-value">${sonuclar.basCevresi.zScore.toFixed(2)}</span>
          </div>
          ` : ''}
        </div>
        
        ${gelisimGecmisiHTML}
        
        <div class="note">
          <strong>⚠️ Önemli Not:</strong> Bu rapor bilgilendirme amaçlıdır ve tıbbi tavsiye niteliği taşımaz. 
          Bebeğinizin sağlık durumu hakkında mutlaka bir pediatri uzmanına danışınız. 
          Persentil değerleri WHO (Dünya Sağlık Örgütü) büyüme standartlarına göre hesaplanmıştır.
        </div>
        
        <div class="footer">
          <p>Bu rapor KolayHesapla.org tarafından oluşturulmuştur.</p>
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
    <div className="space-y-6" id="bebek-raporu">
      {/* Ana Hesaplama Kartı */}
      <Card className="border-0 shadow-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-br from-pink-500 via-rose-500 to-fuchsia-500 text-white p-6 relative overflow-hidden">
          {/* Dekoratif arka plan */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
          </div>
          <div className="relative z-10">
            {/* Üst kısım: Sol üstte Ana Sayfa, sağda diğer butonlar */}
            <div className="flex items-center justify-between mb-4">
              <Link href="/">
                <Button variant="outline" size="sm" className="bg-white/10 border-white/30 text-white hover:bg-white/20 gap-2">
                  <Home className="h-4 w-4" />
                  Ana Sayfa
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                onClick={tumVerileriTemizle}
                title="Tüm verileri sil"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            {/* Başlık */}
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Baby className="h-8 w-8" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold">Bebek Gelişim Takip</CardTitle>
                <p className="text-pink-100 text-sm mt-1 flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  WHO büyüme standartlarına göre persentil hesaplama
                </p>
              </div>
            </div>
            {/* Kayıt durumu göstergesi */}
            <div className="mt-4 flex items-center gap-2 text-xs text-pink-200">
              <Save className="h-3 w-3" />
              Verileriniz otomatik olarak kaydediliyor
              {gelisimGecmisi.length > 0 && (
                <span className="ml-2 bg-white/20 px-2 py-0.5 rounded-full">
                  {gelisimGecmisi.length} kayıtlı ölçüm
                </span>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-6 bg-gradient-to-b from-pink-50/50 to-white">
          {/* Bebek Adı ve Cinsiyet Seçimi */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-pink-500" />
                Bebek Adı (Opsiyonel)
              </Label>
              <Input
                type="text"
                placeholder="Bebeğinizin adı"
                value={bebekAdi}
                onChange={(e) => setBebekAdi(e.target.value)}
                className="border-2 border-pink-200 focus:border-pink-400"
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <User className="h-4 w-4 text-pink-500" />
                Bebek Cinsiyeti
              </Label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={cinsiyet === 'erkek' ? 'default' : 'outline'}
                  onClick={() => setCinsiyet('erkek')}
                  className={cinsiyet === 'erkek' ? 'bg-blue-500 hover:bg-blue-600' : ''}
                >
                  👦 Erkek
                </Button>
                <Button
                  type="button"
                  variant={cinsiyet === 'kiz' ? 'default' : 'outline'}
                  onClick={() => setCinsiyet('kiz')}
                  className={cinsiyet === 'kiz' ? 'bg-pink-500 hover:bg-pink-600' : ''}
                >
                  👧 Kız
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-pink-500" />
                Yaş Giriş Tipi
              </Label>
              <Select value={yasGirisTipi} onValueChange={(v) => setYasGirisTipi(v as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Yaş giriş tipini seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dogumTarihi">Doğum Tarihi</SelectItem>
                  <SelectItem value="manuel">Manuel (Ay + Gün)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Yaş Girişi */}
          {yasGirisTipi === 'dogumTarihi' ? (
            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-pink-500" />
                Doğum Tarihi
              </Label>
              <div className="grid grid-cols-3 gap-3">
                {/* Gün */}
                <div className="space-y-1">
                  <Label className="text-xs text-slate-500">Gün</Label>
                  <Select value={dogumGun} onValueChange={setDogumGun}>
                    <SelectTrigger>
                      <SelectValue placeholder="Gün" />
                    </SelectTrigger>
                    <SelectContent>
                      {gunSecenekleri.map(gun => (
                        <SelectItem key={gun} value={gun.toString()}>
                          {gun}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {/* Ay */}
                <div className="space-y-1">
                  <Label className="text-xs text-slate-500">Ay</Label>
                  <Select value={dogumAy} onValueChange={setDogumAy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Ay" />
                    </SelectTrigger>
                    <SelectContent>
                      {aySecenekleri.map(ay => (
                        <SelectItem key={ay.value} value={ay.value}>
                          {ay.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {/* Yıl */}
                <div className="space-y-1">
                  <Label className="text-xs text-slate-500">Yıl</Label>
                  <Select value={dogumYil} onValueChange={setDogumYil}>
                    <SelectTrigger>
                      <SelectValue placeholder="Yıl" />
                    </SelectTrigger>
                    <SelectContent>
                      {yilSecenekleri.map(yil => (
                        <SelectItem key={yil} value={yil.toString()}>
                          {yil}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {hesaplananYas && (
                <div className="p-3 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl border border-pink-200">
                  <p className="text-sm text-slate-700 flex items-center gap-2">
                    <Baby className="h-4 w-4 text-pink-500" />
                    <span className="font-semibold">{hesaplananYas.yil} yıl {hesaplananYas.ay} ay {hesaplananYas.gun} gün</span>
                    <span className="text-pink-600 font-bold ml-auto">
                      ({hesaplananYas.toplamAy.toFixed(1)} ay)
                    </span>
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Yaş (Ay)</Label>
                <Input
                  type="number"
                  min="0"
                  max="60"
                  value={yasAy}
                  onChange={(e) => setYasAy(e.target.value)}
                  placeholder="0-60"
                />
              </div>
              <div className="space-y-2">
                <Label>Ek Gün (Opsiyonel)</Label>
                <Input
                  type="number"
                  min="0"
                  max="30"
                  value={yasGun}
                  onChange={(e) => setYasGun(e.target.value)}
                  placeholder="0-30"
                />
              </div>
            </div>
          )}

          {/* Ölçümler */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Ruler className="h-4 w-4 text-blue-500" />
                Boy (cm)
              </Label>
              <Input
                type="number"
                step="0.1"
                min="30"
                max="130"
                value={boy}
                onChange={(e) => setBoy(e.target.value)}
                placeholder="örn: 75.5"
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Scale className="h-4 w-4 text-green-500" />
                Kilo (kg)
              </Label>
              <Input
                type="number"
                step="0.01"
                min="1"
                max="30"
                value={kilo}
                onChange={(e) => setKilo(e.target.value)}
                placeholder="örn: 9.5"
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Brain className="h-4 w-4 text-purple-500" />
                Baş Çevresi (cm)
              </Label>
              <Input
                type="number"
                step="0.1"
                min="25"
                max="60"
                value={basCevresi}
                onChange={(e) => setBasCevresi(e.target.value)}
                placeholder="örn: 45.2"
              />
            </div>
          </div>

          {/* Hesapla ve Kaydet Butonları */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={hesapla} 
              className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
              disabled={!hesaplananYas || (!boy && !kilo && !basCevresi)}
            >
              <Calculator className="mr-2 h-5 w-5" />
              Persentil Hesapla
            </Button>
            <Button 
              onClick={() => {
                if (!sonuclar) {
                  hesapla()
                }
                setTimeout(() => olcumKaydet(), 100)
              }}
              variant="outline"
              className="flex-1 border-2 border-emerald-400 text-emerald-600 hover:bg-emerald-50 gap-2"
              disabled={!hesaplananYas || (!boy && !kilo && !basCevresi)}
            >
              <Plus className="h-5 w-5" />
              Ölçümü Kaydet
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Gelişim Geçmişi Kartı */}
      {gelisimGecmisi.length > 0 && (
        <Card className="border-2 border-purple-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100 cursor-pointer" onClick={() => setGecmisAcik(!gecmisAcik)}>
            <CardTitle className="flex items-center justify-between text-purple-800">
              <div className="flex items-center gap-2">
                <History className="h-5 w-5" />
                Gelişim Geçmişi ({gelisimGecmisi.length} kayıt)
              </div>
              {gecmisAcik ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </CardTitle>
          </CardHeader>
          {gecmisAcik && (
            <CardContent className="pt-4">
              <div className="space-y-3">
                {gelisimGecmisi.map((kayit) => (
                  <div key={kayit.id} className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200 flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-purple-500" />
                        <span className="font-semibold text-purple-700">{kayit.tarih}</span>
                        <Badge variant="outline" className="text-xs">
                          {kayit.yasAy.toFixed(1)} ay
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm">
                        {kayit.boy && (
                          <span className="flex items-center gap-1">
                            <Ruler className="h-3 w-3 text-violet-500" />
                            Boy: <strong>{kayit.boy} cm</strong>
                            {kayit.boyPersentil && <span className="text-violet-500">(%{kayit.boyPersentil.toFixed(0)})</span>}
                          </span>
                        )}
                        {kayit.kilo && (
                          <span className="flex items-center gap-1">
                            <Scale className="h-3 w-3 text-emerald-500" />
                            Kilo: <strong>{kayit.kilo} kg</strong>
                            {kayit.kiloPersentil && <span className="text-emerald-500">(%{kayit.kiloPersentil.toFixed(0)})</span>}
                          </span>
                        )}
                        {kayit.basCevresi && (
                          <span className="flex items-center gap-1">
                            <Brain className="h-3 w-3 text-cyan-500" />
                            Baş: <strong>{kayit.basCevresi} cm</strong>
                            {kayit.basPersentil && <span className="text-cyan-500">(%{kayit.basPersentil.toFixed(0)})</span>}
                          </span>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => olcumSil(kayit.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              {/* Gelişim Grafiği */}
              {gelisimGecmisi.length >= 2 && (
                <div className="mt-6 space-y-4">
                  <h4 className="font-semibold text-purple-800 flex items-center gap-2">
                    <LineChartIcon className="h-5 w-5" />
                    Gelişim Grafiği
                  </h4>
                  
                  {/* Grafik Seçimi */}
                  <div className="flex gap-2 flex-wrap">
                    <Button
                      variant={aktifGrafik === 'boy' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setAktifGrafik('boy')}
                      className={aktifGrafik === 'boy' ? 'bg-violet-500' : ''}
                    >
                      📏 Boy
                    </Button>
                    <Button
                      variant={aktifGrafik === 'kilo' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setAktifGrafik('kilo')}
                      className={aktifGrafik === 'kilo' ? 'bg-emerald-500' : ''}
                    >
                      ⚖️ Kilo
                    </Button>
                    <Button
                      variant={aktifGrafik === 'basCevresi' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setAktifGrafik('basCevresi')}
                      className={aktifGrafik === 'basCevresi' ? 'bg-cyan-500' : ''}
                    >
                      🧠 Baş Çevresi
                    </Button>
                  </div>

                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={gelisimGrafikVerisi || []}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis 
                          dataKey="tarih" 
                          tick={{ fontSize: 11 }}
                          angle={-45}
                          textAnchor="end"
                          height={60}
                        />
                        <YAxis 
                          tick={{ fontSize: 11 }}
                          domain={['auto', 'auto']}
                          label={{ 
                            value: aktifGrafik === 'boy' ? 'cm' : aktifGrafik === 'kilo' ? 'kg' : 'cm',
                            angle: -90,
                            position: 'insideLeft'
                          }}
                        />
                        <Tooltip 
                          formatter={(value: number, name: string) => [
                            aktifGrafik === 'kilo' ? `${value} kg` : `${value} cm`,
                            name === 'boy' ? 'Boy' : name === 'kilo' ? 'Kilo' : 'Baş Çevresi'
                          ]}
                          labelFormatter={(label) => `Tarih: ${label}`}
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey={aktifGrafik}
                          name={aktifGrafik === 'boy' ? 'Boy (cm)' : aktifGrafik === 'kilo' ? 'Kilo (kg)' : 'Baş Çevresi (cm)'}
                          stroke={aktifGrafik === 'boy' ? '#8b5cf6' : aktifGrafik === 'kilo' ? '#10b981' : '#06b6d4'}
                          strokeWidth={3}
                          dot={{ r: 6, fill: aktifGrafik === 'boy' ? '#8b5cf6' : aktifGrafik === 'kilo' ? '#10b981' : '#06b6d4' }}
                          activeDot={{ r: 8 }}
                          connectNulls
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </CardContent>
          )}
        </Card>
      )}

      {/* Sonuçlar */}
      {sonuclar && (
        <>
          {/* Buton Alanı */}
          <div className="flex justify-center gap-3 flex-wrap">
            <Button
              onClick={() => {
                setSonuclar(null)
                setBoy('')
                setKilo('')
                setBasCevresi('')
              }}
              variant="outline"
              className="gap-2 border-2 border-pink-300 text-pink-600 hover:bg-pink-50 rounded-xl px-6"
            >
              <RotateCcw className="h-4 w-4" />
              Yeni Hesaplama
            </Button>
            <Button
              onClick={raporYazdir}
              className="gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl px-6 shadow-lg"
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
                Ana Sayfa
              </Button>
            </Link>
          </div>

          {/* Persentil Kartları */}
          <div className="grid md:grid-cols-3 gap-4">
            {/* Boy Sonucu */}
            {sonuclar.boy && (
              <Card className={`border-2 ${getPersentilRenk(sonuclar.boy.kategori)}`}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Ruler className="h-5 w-5" />
                      <span className="font-semibold">Boy</span>
                    </div>
                    <Badge variant="outline" className={getPersentilRenk(sonuclar.boy.kategori)}>
                      {sonuclar.boy.kategoriLabel}
                    </Badge>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold">
                      %{sonuclar.boy.persentil.toFixed(1)}
                    </div>
                    <p className="text-sm text-slate-500 mt-1">persentil</p>
                    <div className="mt-3 p-2 bg-white/50 rounded-lg">
                      <p className="text-xs text-slate-600">Z-score: {sonuclar.boy.zScore}</p>
                      <p className="text-sm font-medium">{sonuclar.boy.deger} cm</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Kilo Sonucu */}
            {sonuclar.kilo && (
              <Card className={`border-2 ${getPersentilRenk(sonuclar.kilo.kategori)}`}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Scale className="h-5 w-5" />
                      <span className="font-semibold">Kilo</span>
                    </div>
                    <Badge variant="outline" className={getPersentilRenk(sonuclar.kilo.kategori)}>
                      {sonuclar.kilo.kategoriLabel}
                    </Badge>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold">
                      %{sonuclar.kilo.persentil.toFixed(1)}
                    </div>
                    <p className="text-sm text-slate-500 mt-1">persentil</p>
                    <div className="mt-3 p-2 bg-white/50 rounded-lg">
                      <p className="text-xs text-slate-600">Z-score: {sonuclar.kilo.zScore}</p>
                      <p className="text-sm font-medium">{sonuclar.kilo.deger} kg</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Baş Çevresi Sonucu */}
            {sonuclar.basCevresi && (
              <Card className={`border-2 ${getPersentilRenk(sonuclar.basCevresi.kategori)}`}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Brain className="h-5 w-5" />
                      <span className="font-semibold">Baş Çevresi</span>
                    </div>
                    <Badge variant="outline" className={getPersentilRenk(sonuclar.basCevresi.kategori)}>
                      {sonuclar.basCevresi.kategoriLabel}
                    </Badge>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold">
                      %{sonuclar.basCevresi.persentil.toFixed(1)}
                    </div>
                    <p className="text-sm text-slate-500 mt-1">persentil</p>
                    <div className="mt-3 p-2 bg-white/50 rounded-lg">
                      <p className="text-xs text-slate-600">Z-score: {sonuclar.basCevresi.zScore}</p>
                      <p className="text-sm font-medium">{sonuclar.basCevresi.deger} cm</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Öneriler */}
          <Card className="border-2 border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Heart className="h-5 w-5 text-pink-500" />
                Değerlendirme ve Öneriler
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {oneriler.map((oneri, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-xl flex items-start gap-3 ${
                      oneri.tip === 'basarili' ? 'bg-green-50 border border-green-200' :
                      oneri.tip === 'uyari' ? 'bg-amber-50 border border-amber-200' :
                      'bg-blue-50 border border-blue-200'
                    }`}
                  >
                    {oneri.tip === 'basarili' ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                    ) : oneri.tip === 'uyari' ? (
                      <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
                    ) : (
                      <Info className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
                    )}
                    <div>
                      <p className={`font-semibold ${
                        oneri.tip === 'basarili' ? 'text-green-800' :
                        oneri.tip === 'uyari' ? 'text-amber-800' :
                        'text-blue-800'
                      }`}>
                        {oneri.baslik}
                      </p>
                      <p className={`text-sm mt-1 ${
                        oneri.tip === 'basarili' ? 'text-green-700' :
                        oneri.tip === 'uyari' ? 'text-amber-700' :
                        'text-blue-700'
                      }`}>
                        {oneri.aciklama}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Persentil Grafiği */}
          <Card className="border-2 border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Activity className="h-5 w-5 text-purple-500" />
                WHO Büyüme Eğrileri
              </CardTitle>
              <div className="flex gap-2 mt-3">
                <Button
                  size="sm"
                  variant={aktifGrafik === 'boy' ? 'default' : 'outline'}
                  onClick={() => setAktifGrafik('boy')}
                  className={aktifGrafik === 'boy' ? 'bg-blue-500' : ''}
                >
                  <Ruler className="h-4 w-4 mr-1" /> Boy
                </Button>
                <Button
                  size="sm"
                  variant={aktifGrafik === 'kilo' ? 'default' : 'outline'}
                  onClick={() => setAktifGrafik('kilo')}
                  className={aktifGrafik === 'kilo' ? 'bg-green-500' : ''}
                >
                  <Scale className="h-4 w-4 mr-1" /> Kilo
                </Button>
                <Button
                  size="sm"
                  variant={aktifGrafik === 'basCevresi' ? 'default' : 'outline'}
                  onClick={() => setAktifGrafik('basCevresi')}
                  className={aktifGrafik === 'basCevresi' ? 'bg-purple-500' : ''}
                >
                  <Brain className="h-4 w-4 mr-1" /> Baş Çevresi
                </Button>
              </div>
              
              {/* Bebek bilgi kartı */}
              {bebekGrafikNoktasi && bebekGrafikNoktasi[0] && (
                <div className="mt-4 p-3 bg-gradient-to-r from-pink-100 to-rose-100 rounded-xl border-2 border-pink-300 flex items-center gap-3">
                  <div className="p-2 bg-pink-500 rounded-full">
                    <Baby className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-pink-800">
                      {cinsiyet === 'erkek' ? '👶 Bebeğiniz' : '👶 Bebeğiniz'} • {bebekGrafikNoktasi[0].ay} aylık
                    </p>
                    <p className="text-lg font-bold text-pink-600">
                      {aktifGrafik === 'boy' ? `${bebekGrafikNoktasi[0].bebek} cm boy` :
                       aktifGrafik === 'kilo' ? `${bebekGrafikNoktasi[0].bebek} kg kilo` :
                       `${bebekGrafikNoktasi[0].bebek} cm baş çevresi`}
                    </p>
                  </div>
                  <div className="ml-auto">
                    <Sparkles className="h-6 w-6 text-pink-500" />
                  </div>
                </div>
              )}
            </CardHeader>
            <CardContent>
              {grafikVerileri && (
                <div className="h-[450px] relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={grafikVerileri} margin={{ top: 30, right: 40, left: 20, bottom: 30 }}>
                      <defs>
                        <linearGradient id="normalZone" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#22c55e" stopOpacity={0.3}/>
                          <stop offset="100%" stopColor="#22c55e" stopOpacity={0.05}/>
                        </linearGradient>
                        <linearGradient id="bebekGlow" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#ec4899" stopOpacity={1}/>
                          <stop offset="100%" stopColor="#f472b6" stopOpacity={0.8}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis 
                        dataKey="ay" 
                        label={{ value: 'Yaş (ay)', position: 'bottom', offset: 5, style: { fontWeight: 'bold' } }}
                        tick={{ fontSize: 11 }}
                        tickLine={{ stroke: '#94a3b8' }}
                      />
                      <YAxis 
                        label={{ value: grafikBasligi[aktifGrafik], angle: -90, position: 'insideLeft', style: { fontWeight: 'bold' } }}
                        tick={{ fontSize: 11 }}
                        tickLine={{ stroke: '#94a3b8' }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          borderRadius: '12px', 
                          border: '2px solid #e2e8f0',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                          padding: '12px'
                        }}
                        formatter={(value: number, name: string) => [
                          `${value} ${aktifGrafik === 'kilo' ? 'kg' : 'cm'}`,
                          name === 'p3' ? '🔴 %3 Persentil' : 
                          name === 'p15' ? '🟠 %15 Persentil' : 
                          name === 'p50' ? '🟢 %50 (Ortalama)' : 
                          name === 'p85' ? '🔵 %85 Persentil' : 
                          name === 'p97' ? '🟣 %97 Persentil' :
                          name === 'bebek' ? '⭐ Bebeğiniz' : name
                        ]}
                        labelFormatter={(label) => `${label} aylık`}
                      />
                      <Legend 
                        wrapperStyle={{ paddingTop: '20px' }}
                        formatter={(value) => 
                          value === 'p3' ? '%3' : 
                          value === 'p15' ? '%15' : 
                          value === 'p50' ? '%50 (Ortalama)' : 
                          value === 'p85' ? '%85' : 
                          value === 'p97' ? '%97' :
                          value === 'bebek' ? '⭐ Bebeğiniz' : value
                        }
                      />
                      
                      {/* Persentil eğrileri - alttan üste */}
                      <Area type="monotone" dataKey="p3" stroke="#ef4444" fill="#fee2e2" fillOpacity={0.2} strokeWidth={1.5} name="p3" />
                      <Area type="monotone" dataKey="p15" stroke="#f97316" fill="#ffedd5" fillOpacity={0.2} strokeWidth={1.5} name="p15" />
                      <Area type="monotone" dataKey="p50" stroke="#22c55e" fill="url(#normalZone)" strokeWidth={3} name="p50" />
                      <Area type="monotone" dataKey="p85" stroke="#3b82f6" fill="#dbeafe" fillOpacity={0.2} strokeWidth={1.5} name="p85" />
                      <Area type="monotone" dataKey="p97" stroke="#9333ea" fill="#f3e8ff" fillOpacity={0.2} strokeWidth={1.5} name="p97" />
                      
                      {/* Bebeğin konumu - büyük parlak nokta */}
                      {bebekGrafikNoktasi && bebekGrafikNoktasi[0] && (
                        <>
                          <Scatter
                            data={bebekGrafikNoktasi}
                            dataKey="bebek"
                            fill="#ec4899"
                            name="bebek"
                          >
                            {bebekGrafikNoktasi.map((entry, index) => (
                              <circle
                                key={`bebek-${index}`}
                                cx={0}
                                cy={0}
                                r={12}
                                fill="url(#bebekGlow)"
                                stroke="#fff"
                                strokeWidth={3}
                                style={{
                                  filter: 'drop-shadow(0 0 8px #ec4899)',
                                }}
                              />
                            ))}
                          </Scatter>
                          <ReferenceLine
                            x={bebekGrafikNoktasi[0].ay}
                            stroke="#ec4899"
                            strokeWidth={2}
                            strokeDasharray="8 4"
                          />
                          <ReferenceLine
                            y={bebekGrafikNoktasi[0].bebek}
                            stroke="#ec4899"
                            strokeWidth={2}
                            strokeDasharray="8 4"
                          />
                        </>
                      )}
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              )}
              
              {/* Grafik açıklama */}
              <div className="mt-4 p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl border border-slate-200">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-slate-500 mt-0.5" />
                  <div className="text-sm text-slate-600">
                    <p className="font-semibold text-slate-700 mb-1">Grafik Nasıl Okunur?</p>
                    <ul className="space-y-1 list-disc list-inside">
                      <li><span className="text-green-600 font-medium">Yeşil çizgi (%50)</span>: Ortalama değer</li>
                      <li><span className="text-pink-600 font-medium">⭐ Pembe nokta</span>: Bebeğinizin değeri</li>
                      <li>%15-85 arası: Normal büyüme aralığı</li>
                      <li>Kesikli çizgiler bebeğinizin konumunu gösterir</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Bilgi Kartları */}
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
                  <li>Bebeğinizin cinsiyetini seçin</li>
                  <li>Doğum tarihi veya yaşı girin (ay olarak)</li>
                  <li>Boy, kilo ve/veya baş çevresi ölçümlerini girin</li>
                  <li>"Persentil Hesapla" butonuna tıklayın</li>
                  <li>Sonuçları ve grafikleri inceleyin</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Persentil Nedir */}
        <Card className="border-2 border-purple-100">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Info className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold mb-3">Persentil Nedir?</h3>
                <p className="text-sm text-slate-600 mb-2">
                  Persentil, bebeğinizin aynı yaş ve cinsiyetteki 100 bebek arasında nerede olduğunu gösterir.
                </p>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• <strong>%50:</strong> Ortalama (100 bebeğin ortası)</li>
                  <li>• <strong>%25:</strong> 100 bebekten 25'i daha küçük</li>
                  <li>• <strong>%75:</strong> 100 bebekten 75'i daha küçük</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Örnek Kullanım */}
      <Card className="border-2 border-emerald-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-emerald-600" />
            Örnek Kullanım
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-emerald-50 rounded-xl">
              <h4 className="font-semibold text-emerald-800 mb-2">👶 12 Aylık Erkek Bebek</h4>
              <div className="text-sm text-emerald-700 space-y-1">
                <p>• Boy: 76 cm → %55 persentil (Normal)</p>
                <p>• Kilo: 10.2 kg → %60 persentil (Normal)</p>
                <p>• Baş çevresi: 46.5 cm → %70 persentil (Normal)</p>
              </div>
              <p className="text-xs text-emerald-600 mt-2 italic">
                ✓ Tüm değerler normal aralıkta, sağlıklı gelişim gösteriyor.
              </p>
            </div>
            <div className="p-4 bg-pink-50 rounded-xl">
              <h4 className="font-semibold text-pink-800 mb-2">👧 18 Aylık Kız Bebek</h4>
              <div className="text-sm text-pink-700 space-y-1">
                <p>• Boy: 82 cm → %65 persentil (Normal)</p>
                <p>• Kilo: 9.5 kg → %25 persentil (Normal)</p>
                <p>• Baş çevresi: 46 cm → %45 persentil (Normal)</p>
              </div>
              <p className="text-xs text-pink-600 mt-2 italic">
                ✓ Kilo persentili düşük tarafta ama hâlâ normal sınırlarda.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* İlginç Bilgiler */}
      <Card className="border-2 border-amber-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-amber-600" />
            Bilmeniz İlginç Olabilecek Şeyler
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg">
              <span className="text-2xl">🧒</span>
              <div>
                <p className="text-sm text-amber-800">
                  <strong>İlk 2 yıl kritik:</strong> Bebekler hayatlarının ilk 2 yılında en hızlı büyür. 
                  İlk yılda boy yaklaşık %50, kilo ise 3 kat artar!
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <span className="text-2xl">🧠</span>
              <div>
                <p className="text-sm text-blue-800">
                  <strong>Beyin gelişimi:</strong> Doğumdaki beyin yaklaşık 350 gram iken, 
                  1 yaşında 1 kg'a ulaşır. Baş çevresi bu gelişimin önemli göstergesidir.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <span className="text-2xl">🌍</span>
              <div>
                <p className="text-sm text-green-800">
                  <strong>WHO standartları:</strong> Kullandığımız veriler 6 ülkeden 
                  (Brezilya, Gana, Hindistan, Norveç, Umman, ABD) 8.500 bebeğin takibiyle oluşturuldu.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
              <span className="text-2xl">📊</span>
              <div>
                <p className="text-sm text-purple-800">
                  <strong>Genetik faktör:</strong> Anne-babanın boyu çocuğun gelişimini etkiler. 
                  Düşük persentil her zaman sorun değildir; aile geçmişi önemlidir.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Önemli Uyarı */}
      <div className="p-4 rounded-xl bg-rose-50 border border-rose-200">
        <p className="text-sm text-rose-800">
          <strong>⚠️ Önemli Not:</strong> Bu hesaplayıcı genel bilgi amaçlıdır ve tıbbi tavsiye yerine geçmez. 
          Bebeğinizin gelişimi hakkında endişeleriniz varsa mutlaka bir pediatrist veya aile hekimine danışın. 
          Tek bir ölçümden ziyade, zaman içindeki büyüme eğilimi daha önemlidir.
        </p>
      </div>
    </div>
  )
}
