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
  Sparkles
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

// Öneri türleri
interface Oneri {
  tip: 'basarili' | 'uyari' | 'bilgi';
  baslik: string;
  aciklama: string;
}

// Gelişim geçmişi
interface GelisimKaydi {
  tarih: string;
  yasAy: number;
  boy?: number;
  kilo?: number;
  basCevresi?: number;
}

export function BebekGelisimHesaplayici() {
  // Form state
  const [cinsiyet, setCinsiyet] = useState<'erkek' | 'kiz'>('erkek')
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

  return (
    <div className="space-y-6">
      {/* Ana Hesaplama Kartı */}
      <Card className="border-2 border-pink-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <Baby className="h-6 w-6" />
            Bebek Gelişim Hesaplayıcı
          </CardTitle>
          <p className="text-pink-100 text-sm mt-1">
            WHO büyüme standartlarına göre boy, kilo ve baş çevresi persentil hesaplama
          </p>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          {/* Cinsiyet Seçimi */}
          <div className="grid md:grid-cols-2 gap-4">
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

          {/* Hesapla Butonu */}
          <Button 
            onClick={hesapla} 
            className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
            disabled={!hesaplananYas || (!boy && !kilo && !basCevresi)}
          >
            <Calculator className="mr-2 h-5 w-5" />
            Persentil Hesapla
          </Button>
        </CardContent>
      </Card>

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
                setDogumGun('')
                setDogumAy('')
                setDogumYil('')
                setYasAy('')
                setYasGun('')
              }}
              variant="outline"
              className="gap-2 border-2 border-pink-300 text-pink-600 hover:bg-pink-50"
            >
              <RotateCcw className="h-4 w-4" />
              Yeni Hesaplama Yap
            </Button>
            <Link href="/">
              <Button
                variant="outline"
                className="gap-2 border-2 border-slate-300 text-slate-600 hover:bg-slate-50"
              >
                <Home className="h-4 w-4" />
                Ana Sayfaya Dön
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
