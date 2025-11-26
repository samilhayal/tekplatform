"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Sunrise, Clock, MapPin, Star, Info, Flame, Droplet, Wind, Mountain, Home, Lightbulb, BookOpen, HelpCircle, Sparkles, Moon, Sun, Calendar } from "lucide-react"
import Link from "next/link"

// Türkiye şehirleri listesi (koordinatlarla birlikte)
const turkishCities = [
  { name: "Adana", lat: 37.0, lon: 35.32 },
  { name: "Adıyaman", lat: 37.76, lon: 38.28 },
  { name: "Afyonkarahisar", lat: 38.76, lon: 30.54 },
  { name: "Ağrı", lat: 39.72, lon: 43.05 },
  { name: "Aksaray", lat: 38.37, lon: 34.03 },
  { name: "Amasya", lat: 40.65, lon: 35.83 },
  { name: "Ankara", lat: 39.93, lon: 32.85 },
  { name: "Antalya", lat: 36.89, lon: 30.70 },
  { name: "Ardahan", lat: 41.11, lon: 42.70 },
  { name: "Artvin", lat: 41.18, lon: 41.82 },
  { name: "Aydın", lat: 37.85, lon: 27.84 },
  { name: "Balıkesir", lat: 39.65, lon: 27.88 },
  { name: "Bartın", lat: 41.58, lon: 32.46 },
  { name: "Batman", lat: 37.89, lon: 41.13 },
  { name: "Bayburt", lat: 40.26, lon: 40.23 },
  { name: "Bilecik", lat: 40.14, lon: 30.07 },
  { name: "Bingöl", lat: 39.06, lon: 40.77 },
  { name: "Bitlis", lat: 38.40, lon: 42.11 },
  { name: "Bolu", lat: 40.74, lon: 31.61 },
  { name: "Burdur", lat: 37.72, lon: 30.29 },
  { name: "Bursa", lat: 40.18, lon: 29.07 },
  { name: "Çanakkale", lat: 40.15, lon: 26.41 },
  { name: "Çankırı", lat: 40.60, lon: 33.62 },
  { name: "Çorum", lat: 40.55, lon: 34.95 },
  { name: "Denizli", lat: 37.77, lon: 29.09 },
  { name: "Diyarbakır", lat: 37.91, lon: 40.24 },
  { name: "Düzce", lat: 40.84, lon: 31.16 },
  { name: "Edirne", lat: 41.68, lon: 26.56 },
  { name: "Elazığ", lat: 38.68, lon: 39.22 },
  { name: "Erzincan", lat: 39.75, lon: 39.49 },
  { name: "Erzurum", lat: 39.90, lon: 41.27 },
  { name: "Eskişehir", lat: 39.78, lon: 30.52 },
  { name: "Gaziantep", lat: 37.07, lon: 37.38 },
  { name: "Giresun", lat: 40.91, lon: 38.39 },
  { name: "Gümüşhane", lat: 40.46, lon: 39.48 },
  { name: "Hakkari", lat: 37.57, lon: 43.74 },
  { name: "Hatay", lat: 36.20, lon: 36.16 },
  { name: "Iğdır", lat: 39.92, lon: 44.04 },
  { name: "Isparta", lat: 37.76, lon: 30.55 },
  { name: "İstanbul", lat: 41.01, lon: 28.97 },
  { name: "İzmir", lat: 38.42, lon: 27.14 },
  { name: "Kahramanmaraş", lat: 37.58, lon: 36.93 },
  { name: "Karabük", lat: 41.20, lon: 32.62 },
  { name: "Karaman", lat: 37.18, lon: 33.23 },
  { name: "Kars", lat: 40.59, lon: 43.10 },
  { name: "Kastamonu", lat: 41.38, lon: 33.78 },
  { name: "Kayseri", lat: 38.73, lon: 35.49 },
  { name: "Kilis", lat: 36.72, lon: 37.12 },
  { name: "Kırıkkale", lat: 39.85, lon: 33.53 },
  { name: "Kırklareli", lat: 41.73, lon: 27.22 },
  { name: "Kırşehir", lat: 39.15, lon: 34.17 },
  { name: "Kocaeli", lat: 40.85, lon: 29.88 },
  { name: "Konya", lat: 37.87, lon: 32.48 },
  { name: "Kütahya", lat: 39.42, lon: 29.98 },
  { name: "Malatya", lat: 38.36, lon: 38.31 },
  { name: "Manisa", lat: 38.62, lon: 27.43 },
  { name: "Mardin", lat: 37.32, lon: 40.73 },
  { name: "Mersin", lat: 36.81, lon: 34.64 },
  { name: "Muğla", lat: 37.22, lon: 28.37 },
  { name: "Muş", lat: 38.74, lon: 41.49 },
  { name: "Nevşehir", lat: 38.62, lon: 34.72 },
  { name: "Niğde", lat: 37.97, lon: 34.68 },
  { name: "Ordu", lat: 40.98, lon: 37.88 },
  { name: "Osmaniye", lat: 37.07, lon: 36.25 },
  { name: "Rize", lat: 41.02, lon: 40.52 },
  { name: "Sakarya", lat: 40.77, lon: 30.40 },
  { name: "Samsun", lat: 41.29, lon: 36.33 },
  { name: "Şanlıurfa", lat: 37.17, lon: 38.79 },
  { name: "Siirt", lat: 37.93, lon: 41.94 },
  { name: "Sinop", lat: 42.03, lon: 35.15 },
  { name: "Şırnak", lat: 37.52, lon: 42.45 },
  { name: "Sivas", lat: 39.75, lon: 37.02 },
  { name: "Tekirdağ", lat: 40.98, lon: 27.51 },
  { name: "Tokat", lat: 40.31, lon: 36.55 },
  { name: "Trabzon", lat: 41.00, lon: 39.72 },
  { name: "Tunceli", lat: 39.11, lon: 39.55 },
  { name: "Uşak", lat: 38.68, lon: 29.41 },
  { name: "Van", lat: 38.49, lon: 43.38 },
  { name: "Yalova", lat: 40.65, lon: 29.27 },
  { name: "Yozgat", lat: 39.82, lon: 34.81 },
  { name: "Zonguldak", lat: 41.45, lon: 31.79 }
]

interface ZodiacSign {
  id: string
  name: string
  symbol: string
  element: "fire" | "earth" | "air" | "water"
  ruling: string
  risingDescription: string
}

const zodiacSigns: ZodiacSign[] = [
  { 
    id: "aries", 
    name: "Koç", 
    symbol: "♈", 
    element: "fire", 
    ruling: "Mars",
    risingDescription: "Koç yükseleni olan kişiler enerjik, cesur ve doğrudan görünürler. İlk izlenimleri güçlü ve dinamiktir. Fiziksel olarak atletik bir yapıya sahip olabilirler ve keskin yüz hatları dikkat çeker."
  },
  { 
    id: "taurus", 
    name: "Boğa", 
    symbol: "♉", 
    element: "earth", 
    ruling: "Venüs",
    risingDescription: "Boğa yükseleni olan kişiler sakin, güvenilir ve çekici görünürler. Dünyevi zevklere düşkündürler ve rahat bir aura yayarlar. Genellikle güzel boyunları ve gür saçları ile bilinirler."
  },
  { 
    id: "gemini", 
    name: "İkizler", 
    symbol: "♊", 
    element: "air", 
    ruling: "Merkür",
    risingDescription: "İkizler yükseleni olan kişiler meraklı, konuşkan ve hareketli görünürler. Sosyal ortamlarda rahat ederler ve iletişim becerileri ile öne çıkarlar. Genç ve dinamik bir imaj çizerler."
  },
  { 
    id: "cancer", 
    name: "Yengeç", 
    symbol: "♋", 
    element: "water", 
    ruling: "Ay",
    risingDescription: "Yengeç yükseleni olan kişiler şefkatli, koruyucu ve biraz çekingen görünürler. İlk başta savunmacı olabilirler ama yakından tanıdıklarına çok sıcaktırlar. Yumuşak ve yuvarlak yüz hatları olabilir."
  },
  { 
    id: "leo", 
    name: "Aslan", 
    symbol: "♌", 
    element: "fire", 
    ruling: "Güneş",
    risingDescription: "Aslan yükseleni olan kişiler gösterişli, kendinden emin ve karizmatik görünürler. Doğal bir varlık hissi yayarlar ve dikkat çekmeyi severler. Gür saçlar ve canlı gözler karakteristiktir."
  },
  { 
    id: "virgo", 
    name: "Başak", 
    symbol: "♍", 
    element: "earth", 
    ruling: "Merkür",
    risingDescription: "Başak yükseleni olan kişiler düzenli, temiz ve mütevazı görünürler. Detaylara dikkat ederler ve pratik bir yaklaşım sergilerler. İnce ve zarif bir fiziksel yapıya sahip olabilirler."
  },
  { 
    id: "libra", 
    name: "Terazi", 
    symbol: "♎", 
    element: "air", 
    ruling: "Venüs",
    risingDescription: "Terazi yükseleni olan kişiler zarif, diplomatik ve çekici görünürler. Uyumlu ve nazik tavırlarıyla herkesi etkilerler. Simetrik yüz hatları ve hoş bir gülümseme karakteristiktir."
  },
  { 
    id: "scorpio", 
    name: "Akrep", 
    symbol: "♏", 
    element: "water", 
    ruling: "Plüton",
    risingDescription: "Akrep yükseleni olan kişiler yoğun, gizemli ve manyetik görünürler. Derin bakışları ve güçlü varlıkları ile dikkat çekerler. Keskin ve penetran gözler karakteristiktir."
  },
  { 
    id: "sagittarius", 
    name: "Yay", 
    symbol: "♐", 
    element: "fire", 
    ruling: "Jüpiter",
    risingDescription: "Yay yükseleni olan kişiler neşeli, iyimser ve maceraperest görünürler. Enerjik ve atletik bir yapıya sahiptirler. Geniş gülümsemeleri ve canlı mimikleri ile bilinirler."
  },
  { 
    id: "capricorn", 
    name: "Oğlak", 
    symbol: "♑", 
    element: "earth", 
    ruling: "Satürn",
    risingDescription: "Oğlak yükseleni olan kişiler ciddi, profesyonel ve kararlı görünürler. Yaşlarına göre olgun bir imaj çizerler. Keskin kemik yapısı ve kararlı bir duruş karakteristiktir."
  },
  { 
    id: "aquarius", 
    name: "Kova", 
    symbol: "♒", 
    element: "air", 
    ruling: "Uranüs",
    risingDescription: "Kova yükseleni olan kişiler özgün, entelektüel ve mesafeli görünürler. Benzersiz tarz ve alışılmadık görünüşleriyle öne çıkarlar. Yaratıcı ve farklı bir aura yayarlar."
  },
  { 
    id: "pisces", 
    name: "Balık", 
    symbol: "♓", 
    element: "water", 
    ruling: "Neptün",
    risingDescription: "Balık yükseleni olan kişiler hayalperest, hassas ve gizemli görünürler. Romantik ve mistik bir aura yayarlar. Büyük, dalgın gözler ve yumuşak ifade karakteristiktir."
  }
]

export function YukselenBurcHesaplayici() {
  const [birthDay, setBirthDay] = useState("")
  const [birthMonth, setBirthMonth] = useState("")
  const [birthYear, setBirthYear] = useState("")
  const [birthHour, setBirthHour] = useState("")
  const [birthMinute, setBirthMinute] = useState("")
  const [birthCity, setBirthCity] = useState("")
  const [citySearch, setCitySearch] = useState("")
  const [showResult, setShowResult] = useState(false)
  const [risingSign, setRisingSign] = useState<ZodiacSign | null>(null)

  // Yıllar (1920-2025)
  const years = Array.from({ length: 106 }, (_, i) => 2025 - i)
  // Aylar
  const monthsList = [
    { value: '01', label: 'Ocak' },
    { value: '02', label: 'Şubat' },
    { value: '03', label: 'Mart' },
    { value: '04', label: 'Nisan' },
    { value: '05', label: 'Mayıs' },
    { value: '06', label: 'Haziran' },
    { value: '07', label: 'Temmuz' },
    { value: '08', label: 'Ağustos' },
    { value: '09', label: 'Eylül' },
    { value: '10', label: 'Ekim' },
    { value: '11', label: 'Kasım' },
    { value: '12', label: 'Aralık' }
  ]
  // Günler
  const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'))
  // Saatler (00-23)
  const hoursList = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'))
  // Dakikalar (00-59)
  const minutesList = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'))

  // Şehir arama filtresi
  const filteredCities = turkishCities.filter(city =>
    city.name.toLowerCase().includes(citySearch.toLowerCase())
  )

  const calculateRisingSign = () => {
    if (!birthDay || !birthMonth || !birthYear || !birthHour || !birthMinute || !birthCity) return
    
    const birthDate = `${birthYear}-${birthMonth}-${birthDay}`
    const birthTime = `${birthHour}:${birthMinute}`

    // Doğum saati ve tarihinden basit yükselen hesaplama
    // Not: Gerçek astrolojik hesaplama çok daha karmaşıktır
    const [hours, minutes] = birthTime.split(":").map(Number)
    const date = new Date(birthDate)
    const month = date.getMonth() // 0-11
    const day = date.getDate()

    // Güneş burcunu bul (basitleştirilmiş)
    let sunSignIndex = 0
    const zodiacDates = [
      { month: 2, day: 21 }, // Koç
      { month: 3, day: 20 }, // Boğa
      { month: 4, day: 21 }, // İkizler
      { month: 5, day: 21 }, // Yengeç
      { month: 6, day: 23 }, // Aslan
      { month: 7, day: 23 }, // Başak
      { month: 8, day: 23 }, // Terazi
      { month: 9, day: 23 }, // Akrep
      { month: 10, day: 22 }, // Yay
      { month: 11, day: 22 }, // Oğlak
      { month: 0, day: 20 }, // Kova
      { month: 1, day: 19 }, // Balık
    ]

    for (let i = 0; i < 12; i++) {
      const current = zodiacDates[i]
      const next = zodiacDates[(i + 1) % 12]
      
      if (month === current.month && day >= current.day) {
        sunSignIndex = i
        break
      }
      if (month === next.month && day < next.day) {
        sunSignIndex = i
        break
      }
    }

    // Yükselen burç hesaplama (basitleştirilmiş formül)
    // Her 2 saatte bir yükselen burç değişir
    const totalMinutes = hours * 60 + minutes
    const risingOffset = Math.floor(totalMinutes / 120) // Her 2 saat için 1 burç

    // Gün doğumu zamanını şehre göre ayarla (basit)
    const cityData = turkishCities.find(c => c.name === birthCity)
    const latOffset = cityData ? Math.floor((41 - cityData.lat) / 3) : 0

    const risingIndex = (sunSignIndex + risingOffset + latOffset + 12) % 12
    setRisingSign(zodiacSigns[risingIndex])
    setShowResult(true)
  }

  const getElementIcon = (element: string) => {
    switch(element) {
      case "fire": return <Flame className="h-5 w-5 text-red-500" />
      case "water": return <Droplet className="h-5 w-5 text-blue-500" />
      case "air": return <Wind className="h-5 w-5 text-cyan-500" />
      case "earth": return <Mountain className="h-5 w-5 text-amber-700" />
    }
  }

  const getElementName = (element: string) => {
    const names: Record<string, string> = { fire: "Ateş", water: "Su", air: "Hava", earth: "Toprak" }
    return names[element] || element
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Ana Sayfaya Dön Butonu */}
      <div className="flex justify-start">
        <Link href="/">
          <Button variant="outline" className="gap-2">
            <Home className="h-4 w-4" />
            Ana Sayfaya Dön
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Sunrise className="h-20 w-20 text-orange-500 animate-pulse" />
              <Sparkles className="h-8 w-8 text-amber-500 absolute -top-2 -right-2 animate-bounce" />
            </div>
          </div>
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent">
            Yükselen Burç Hesaplayıcı
          </CardTitle>
          <CardDescription className="text-lg mt-2">
            Doğum tarihi, saati ve yerinize göre yükselen burcunuzu keşfedin
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Bilgi Kartı */}
      <Card className="border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg text-amber-700">
            <Info className="h-5 w-5" />
            Yükselen Burç Nedir?
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-amber-800">
          <p>
            Yükselen burç (Ascendant), doğduğunuz an doğu ufkunda yükselen burçtur. 
            Güneş burcunuz iç dünyanızı, yükselen burcunuz ise dış dünyanıza nasıl göründüğünüzü temsil eder. 
            Kesin hesaplama için doğum saatiniz ve yeriniz gereklidir.
          </p>
        </CardContent>
      </Card>

      {/* Hesaplama Formu */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sunrise className="h-5 w-5 text-orange-500" />
            Yükselen Burç Hesapla
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Doğum Tarihi */}
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Doğum Tarihi (Gün/Ay/Yıl)
              </Label>
              <div className="grid grid-cols-3 gap-2">
                <Select value={birthDay} onValueChange={(v) => { setBirthDay(v); setShowResult(false); }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Gün" />
                  </SelectTrigger>
                  <SelectContent>
                    {days.map((d) => (
                      <SelectItem key={d} value={d}>{d}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={birthMonth} onValueChange={(v) => { setBirthMonth(v); setShowResult(false); }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Ay" />
                  </SelectTrigger>
                  <SelectContent>
                    {monthsList.map((m) => (
                      <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={birthYear} onValueChange={(v) => { setBirthYear(v); setShowResult(false); }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Yıl" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[200px]">
                    {years.map((y) => (
                      <SelectItem key={y} value={String(y)}>{y}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Doğum Saati */}
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Doğum Saati (24 saat)
              </Label>
              <div className="grid grid-cols-2 gap-2">
                <Select value={birthHour} onValueChange={(v) => { setBirthHour(v); setShowResult(false); }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Saat" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[200px]">
                    {hoursList.map((h) => (
                      <SelectItem key={h} value={h}>{h}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={birthMinute} onValueChange={(v) => { setBirthMinute(v); setShowResult(false); }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Dakika" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[200px]">
                    {minutesList.map((m) => (
                      <SelectItem key={m} value={m}>{m}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Doğum Yeri */}
            <div className="space-y-2 md:col-span-2">
              <Label className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                Doğum Yeri
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <Input
                  placeholder="Şehir ara..."
                  value={citySearch}
                  onChange={(e) => setCitySearch(e.target.value)}
                  className="text-base"
                />
                <Select 
                  value={birthCity} 
                  onValueChange={(v) => { 
                    setBirthCity(v); 
                    setShowResult(false);
                    setCitySearch(v);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Şehir seçin" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    {filteredCities.length > 0 ? (
                      filteredCities.map(city => (
                        <SelectItem key={city.name} value={city.name}>
                          {city.name}
                        </SelectItem>
                      ))
                    ) : (
                      <div className="p-2 text-sm text-muted-foreground text-center">
                        Şehir bulunamadı
                      </div>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Button 
            onClick={calculateRisingSign}
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
            disabled={!birthDay || !birthMonth || !birthYear || !birthHour || !birthMinute || !birthCity}
          >
            <Star className="h-4 w-4 mr-2" />
            Yükselen Burcumu Hesapla
          </Button>
        </CardContent>
      </Card>

      {/* Sonuç */}
      {showResult && risingSign && (
        <>
          <Card className="border-2 border-orange-200 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 text-white">
              <CardTitle className="text-center">
                <div className="flex items-center justify-center gap-4">
                  <Sunrise className="h-10 w-10" />
                  <span className="text-3xl font-bold">Yükselen Burcunuz</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-8">
              {/* Ana Gösterim - SVG ile */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
                {/* Sol: SVG Daire Grafik */}
                <div className="relative">
                  <svg width="240" height="240" viewBox="0 0 240 240" className="transform -rotate-90">
                    <circle
                      cx="120"
                      cy="120"
                      r="100"
                      fill="none"
                      stroke="#fef3c7"
                      strokeWidth="20"
                    />
                    <circle
                      cx="120"
                      cy="120"
                      r="100"
                      fill="none"
                      stroke="url(#sunriseGradient)"
                      strokeWidth="20"
                      strokeDasharray="628"
                      strokeDashoffset="0"
                      className="animate-pulse"
                    />
                    <defs>
                      <linearGradient id="sunriseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f97316" />
                        <stop offset="50%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#eab308" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-8xl mb-2">{risingSign.symbol}</div>
                    </div>
                  </div>
                </div>

                {/* Sağ: Bilgiler */}
                <div className="text-center md:text-left space-y-4">
                  <div>
                    <div className="text-5xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent mb-2">
                      {risingSign.name}
                    </div>
                    <div className="text-muted-foreground text-lg">Ascendant / Rising Sign</div>
                  </div>
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    <div className="flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full">
                      {getElementIcon(risingSign.element)}
                      <span className="font-semibold text-orange-700">{getElementName(risingSign.element)}</span>
                    </div>
                    <Badge className="bg-amber-500 text-white px-4 py-2 text-base">
                      Yönetici: {risingSign.ruling}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Sparkles className="h-4 w-4" />
                    <span>Dış kişiliğinizi ve ilk izlenimlerinizi temsil eder</span>
                  </div>
                </div>
              </div>

              {/* Açıklama */}
              <div className="p-6 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 rounded-2xl border-2 border-orange-200 mb-6">
                <h3 className="font-bold text-xl mb-4 text-orange-700 flex items-center gap-2">
                  <Sun className="h-6 w-6" />
                  {risingSign.name} Yükseleni Ne Anlama Gelir?
                </h3>
                <p className="text-slate-700 leading-relaxed text-lg">{risingSign.risingDescription}</p>
              </div>

              {/* Özellikler Barları */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-red-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-red-700">Enerji Seviyesi</span>
                    <span className="text-sm text-red-600">
                      {risingSign.element === "fire" ? "Çok Yüksek" : 
                       risingSign.element === "air" ? "Yüksek" :
                       risingSign.element === "earth" ? "Dengeli" : "Sakin"}
                    </span>
                  </div>
                  <div className="w-full bg-red-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-red-500 to-orange-500 h-3 rounded-full transition-all duration-1000"
                      style={{width: risingSign.element === "fire" ? "90%" : 
                                     risingSign.element === "air" ? "75%" :
                                     risingSign.element === "earth" ? "60%" : "45%"}}
                    />
                  </div>
                </div>
                <div className="p-4 bg-blue-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-blue-700">Sosyallik</span>
                    <span className="text-sm text-blue-600">
                      {risingSign.element === "air" ? "Çok Yüksek" : 
                       risingSign.element === "fire" ? "Yüksek" :
                       risingSign.element === "water" ? "Orta" : "Seçici"}
                    </span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all duration-1000"
                      style={{width: risingSign.element === "air" ? "95%" : 
                                     risingSign.element === "fire" ? "80%" :
                                     risingSign.element === "water" ? "55%" : "40%"}}
                    />
                  </div>
                </div>
                <div className="p-4 bg-green-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-green-700">Pratiklik</span>
                    <span className="text-sm text-green-600">
                      {risingSign.element === "earth" ? "Çok Yüksek" : 
                       risingSign.element === "water" ? "Orta" :
                       risingSign.element === "air" ? "Orta" : "Düşük"}
                    </span>
                  </div>
                  <div className="w-full bg-green-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-1000"
                      style={{width: risingSign.element === "earth" ? "95%" : 
                                     risingSign.element === "water" ? "60%" :
                                     risingSign.element === "air" ? "50%" : "35%"}}
                    />
                  </div>
                </div>
                <div className="p-4 bg-purple-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-purple-700">Duygusallık</span>
                    <span className="text-sm text-purple-600">
                      {risingSign.element === "water" ? "Çok Yüksek" : 
                       risingSign.element === "earth" ? "Düşük" :
                       risingSign.element === "air" ? "Orta" : "Yüksek"}
                    </span>
                  </div>
                  <div className="w-full bg-purple-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-1000"
                      style={{width: risingSign.element === "water" ? "90%" : 
                                     risingSign.element === "earth" ? "30%" :
                                     risingSign.element === "air" ? "50%" : "75%"}}
                    />
                  </div>
                </div>
              </div>

              {/* Uyarı */}
              <div className="p-4 bg-slate-50 rounded-lg text-sm text-slate-600 border border-slate-200">
                <p className="flex items-start gap-2">
                  <Info className="h-5 w-5 flex-shrink-0 mt-0.5 text-slate-500" />
                  <span>
                    <strong>Not:</strong> Bu hesaplama basitleştirilmiş bir formül kullanmaktadır. 
                    Kesin yükselen burç hesaplaması için doğum saatinizin dakika cinsinden doğruluğu 
                    ve profesyonel bir astroloji programı gereklidir. Yükselen burç yaklaşık her 2 saatte bir değişir.
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Tüm Yükselen Burçlar */}
      <Card>
        <CardHeader>
          <CardTitle>Yükselen Burçlar ve Özellikleri</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {zodiacSigns.map(sign => (
              <div 
                key={sign.id}
                className="p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{sign.symbol}</span>
                  <div>
                    <span className="font-bold text-lg">{sign.name}</span>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      {getElementIcon(sign.element)}
                      <span>{getElementName(sign.element)}</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-slate-600 line-clamp-2">{sign.risingDescription}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Nasıl Kullanılır */}
      <Card className="border-2 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-blue-500" />
            Nasıl Kullanılır?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-3">
            <Badge className="bg-blue-500">1</Badge>
            <p className="text-slate-700">Doğum tarihinizi seçin (Gün/Ay/Yıl formatında)</p>
          </div>
          <div className="flex gap-3">
            <Badge className="bg-blue-500">2</Badge>
            <p className="text-slate-700">Doğum saatinizi girin (24 saat formatında, örn: 14:30)</p>
          </div>
          <div className="flex gap-3">
            <Badge className="bg-blue-500">3</Badge>
            <p className="text-slate-700">Arama kutusuna şehir adı yazın veya listeden doğum yerinizi seçin</p>
          </div>
          <div className="flex gap-3">
            <Badge className="bg-blue-500">4</Badge>
            <p className="text-slate-700">"Yükselen Burcumu Hesapla" butonuna tıklayın</p>
          </div>
          <div className="flex gap-3">
            <Badge className="bg-blue-500">5</Badge>
            <p className="text-slate-700">Sonuçta yükselen burcunuzu ve özelliklerini görüntüleyin</p>
          </div>
        </CardContent>
      </Card>

      {/* Örnek Kullanımlar */}
      <Card className="border-2 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-green-500" />
            Örnek Kullanımlar
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-orange-50 rounded-lg">
            <h4 className="font-semibold text-orange-700 mb-2">🌅 İlk İzlenim Analizi</h4>
            <p className="text-slate-600">Yükselen burcunuz, başkalarının sizi ilk gördüklerinde nasıl algıladıklarını gösterir. İş görüşmeleri ve yeni tanışmalarda kendinizi daha iyi tanımanıza yardımcı olur.</p>
          </div>
          <div className="p-4 bg-amber-50 rounded-lg">
            <h4 className="font-semibold text-amber-700 mb-2">💫 Tam Doğum Haritası</h4>
            <p className="text-slate-600">Güneş burcu, Ay burcu ve Yükselen burç kombinasyonunuz kişiliğinizin üç temel taşıdır. Profesyonel bir astroloji okuması için bu üçlüyü bilmek önemlidir.</p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg">
            <h4 className="font-semibold text-yellow-700 mb-2">🎭 Kişilik Farkındalığı</h4>
            <p className="text-slate-600">İç dünyamız (Güneş burcu) ile dış görünüşümüz (Yükselen burç) farklı olabilir. Bu farkı anlamak kendimizi daha iyi ifade etmemize yardımcı olur.</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-semibold text-green-700 mb-2">👥 İlişki Dinamikleri</h4>
            <p className="text-slate-600">Partnerinizin yükselen burcunu bilmek, onun davranışlarını ve tepkilerini daha iyi anlamanızı sağlar. İlişki uyumunu artırır.</p>
          </div>
        </CardContent>
      </Card>

      {/* Önemli Bilgiler */}
      <Card className="border-2 border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-6 w-6 text-orange-500" />
            Önemli Bilgiler
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <Star className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <p className="text-slate-700">
              <strong>Doğum Saati Hassasiyeti:</strong> Yükselen burç yaklaşık her 2 saatte bir değişir. Dakika cinsinden doğru doğum saati çok önemlidir.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <Star className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <p className="text-slate-700">
              <strong>Coğrafi Konum:</strong> Doğum yeri koordinatları yükselen burç hesaplamasında kritik rol oynar. Farklı şehirler farklı sonuçlar verebilir.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <Star className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <p className="text-slate-700">
              <strong>Basitleştirilmiş Hesaplama:</strong> Bu araç eğitim amaçlı basitleştirilmiş formül kullanır. Profesyonel sonuç için astroloji uzmanına danışın.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <Star className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <p className="text-slate-700">
              <strong>12 Ev Sistemi:</strong> Yükselen burç aynı zamanda 1. Ev'in başlangıcını belirler ve tüm ev sistemini etkiler.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <Star className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <p className="text-slate-700">
              <strong>Fiziksel Görünüm:</strong> Yükselen burç fiziksel özelliklerinizi ve vücut yapınızı da etkileyebilir.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* İlginç Bilgiler */}
      <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-purple-500" />
            Bilmeniz İlginç Olabilecek Şeyler
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h4 className="font-semibold text-purple-700 mb-2 flex items-center gap-2">
              <Sunrise className="h-5 w-5" />
              Ascendant Kelimesi
            </h4>
            <p className="text-slate-600">
              İngilizce "Ascendant" kelimesi Latince "yükselen" anlamına gelir. Doğu ufkunda yükselen noktayı ifade eder.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h4 className="font-semibold text-blue-700 mb-2 flex items-center gap-2">
              <Clock className="h-5 w-5" />
              2 Saatlik Değişim
            </h4>
            <p className="text-slate-600">
              Yükselen burç her 2 saatte bir değiştiği için aynı gün doğan iki kişi farklı yükselen burçlara sahip olabilir. Bu yüzden doğum saati çok önemlidir.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h4 className="font-semibold text-green-700 mb-2 flex items-center gap-2">
              <Sun className="h-5 w-5" />
              Güneş = İç, Yükselen = Dış
            </h4>
            <p className="text-slate-600">
              Güneş burcunuz kim olduğunuzu (iç dünyanız), Yükselen burcunuz nasıl göründüğünüzü (dış dünyanız) temsil eder. İkisi farklıysa çelişkili hissedebilirsiniz.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h4 className="font-semibold text-orange-700 mb-2 flex items-center gap-2">
              <Moon className="h-5 w-5" />
              Üçlü Kombinasyon
            </h4>
            <p className="text-slate-600">
              "Büyük Üçlü" olarak bilinen Güneş, Ay ve Yükselen burç kombinasyonu her insanı benzersiz kılar. 12³ = 1,728 farklı kombinasyon vardır!
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h4 className="font-semibold text-pink-700 mb-2 flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Ünlülerin Yükselen Burçları
            </h4>
            <p className="text-slate-600">
              Birçok ünlü kişi yükselen burcunun enerjisini kariyerinde kullanır. Örneğin Aslan yükseleni olan kişiler genellikle sahne performanslarında parlak olurlar.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
