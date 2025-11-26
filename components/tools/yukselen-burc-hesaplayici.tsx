"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Sunrise, Clock, MapPin, Star, Info, Flame, Droplet, Wind, Mountain } from "lucide-react"

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

// Türk şehirleri ve enlemleri
const turkishCities = [
  { name: "İstanbul", lat: 41.01 },
  { name: "Ankara", lat: 39.93 },
  { name: "İzmir", lat: 38.42 },
  { name: "Bursa", lat: 40.19 },
  { name: "Antalya", lat: 36.89 },
  { name: "Adana", lat: 37.00 },
  { name: "Konya", lat: 37.87 },
  { name: "Gaziantep", lat: 37.07 },
  { name: "Mersin", lat: 36.80 },
  { name: "Diyarbakır", lat: 37.91 },
  { name: "Kayseri", lat: 38.73 },
  { name: "Eskişehir", lat: 39.78 },
  { name: "Samsun", lat: 41.29 },
  { name: "Trabzon", lat: 41.00 },
  { name: "Erzurum", lat: 39.90 },
  { name: "Van", lat: 38.49 },
  { name: "Malatya", lat: 38.35 },
  { name: "Sakarya", lat: 40.69 },
  { name: "Denizli", lat: 37.77 },
  { name: "Manisa", lat: 38.61 },
  { name: "Diğer", lat: 39.0 }
]

export function YukselenBurcHesaplayici() {
  const [birthDate, setBirthDate] = useState("")
  const [birthTime, setBirthTime] = useState("")
  const [birthCity, setBirthCity] = useState("")
  const [showResult, setShowResult] = useState(false)
  const [risingSign, setRisingSign] = useState<ZodiacSign | null>(null)

  const calculateRisingSign = () => {
    if (!birthDate || !birthTime || !birthCity) return

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
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Bilgi Kartı */}
      <Card className="border-2 border-amber-200 bg-amber-50/50">
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
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="birthDate">Doğum Tarihi</Label>
              <Input
                id="birthDate"
                type="date"
                value={birthDate}
                onChange={(e) => { setBirthDate(e.target.value); setShowResult(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="birthTime" className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Doğum Saati
              </Label>
              <Input
                id="birthTime"
                type="time"
                value={birthTime}
                onChange={(e) => { setBirthTime(e.target.value); setShowResult(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                Doğum Yeri
              </Label>
              <Select value={birthCity} onValueChange={(v) => { setBirthCity(v); setShowResult(false); }}>
                <SelectTrigger>
                  <SelectValue placeholder="Şehir seçin" />
                </SelectTrigger>
                <SelectContent>
                  {turkishCities.map(city => (
                    <SelectItem key={city.name} value={city.name}>{city.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={calculateRisingSign}
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
            disabled={!birthDate || !birthTime || !birthCity}
          >
            <Star className="h-4 w-4 mr-2" />
            Yükselen Burcumu Hesapla
          </Button>
        </CardContent>
      </Card>

      {/* Sonuç */}
      {showResult && risingSign && (
        <Card className="border-2 border-orange-200">
          <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50">
            <CardTitle className="text-center">
              <div className="flex items-center justify-center gap-4">
                <Sunrise className="h-8 w-8 text-orange-500" />
                <span className="text-2xl">Yükselen Burcunuz</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-center mb-6">
              <div className="text-7xl mb-4">{risingSign.symbol}</div>
              <div className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                {risingSign.name}
              </div>
              <div className="flex items-center justify-center gap-4 mt-4">
                <div className="flex items-center gap-2">
                  {getElementIcon(risingSign.element)}
                  <Badge variant="outline">{getElementName(risingSign.element)}</Badge>
                </div>
                <Badge className="bg-orange-500">Yönetici: {risingSign.ruling}</Badge>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl">
              <h3 className="font-bold text-lg mb-3 text-orange-700">
                {risingSign.name} Yükseleni Ne Anlama Gelir?
              </h3>
              <p className="text-slate-700 leading-relaxed">{risingSign.risingDescription}</p>
            </div>

            <div className="mt-6 p-4 bg-slate-50 rounded-lg text-sm text-slate-600">
              <p className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                <span>
                  Bu hesaplama tahmini bir sonuçtur. Kesin yükselen burç hesaplaması için 
                  profesyonel bir astroloji programı ve doğum saatinizin dakika cinsinden 
                  doğruluğu gereklidir.
                </span>
              </p>
            </div>
          </CardContent>
        </Card>
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
    </div>
  )
}
