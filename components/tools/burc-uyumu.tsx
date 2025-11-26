"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Heart, Star, Users, Flame, Droplet, Wind, Mountain } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ZodiacSign {
  id: string
  name: string
  symbol: string
  dates: string
  element: "fire" | "earth" | "air" | "water"
  ruling: string
}

const zodiacSigns: ZodiacSign[] = [
  { id: "aries", name: "Koç", symbol: "♈", dates: "21 Mart - 19 Nisan", element: "fire", ruling: "Mars" },
  { id: "taurus", name: "Boğa", symbol: "♉", dates: "20 Nisan - 20 Mayıs", element: "earth", ruling: "Venüs" },
  { id: "gemini", name: "İkizler", symbol: "♊", dates: "21 Mayıs - 20 Haziran", element: "air", ruling: "Merkür" },
  { id: "cancer", name: "Yengeç", symbol: "♋", dates: "21 Haziran - 22 Temmuz", element: "water", ruling: "Ay" },
  { id: "leo", name: "Aslan", symbol: "♌", dates: "23 Temmuz - 22 Ağustos", element: "fire", ruling: "Güneş" },
  { id: "virgo", name: "Başak", symbol: "♍", dates: "23 Ağustos - 22 Eylül", element: "earth", ruling: "Merkür" },
  { id: "libra", name: "Terazi", symbol: "♎", dates: "23 Eylül - 22 Ekim", element: "air", ruling: "Venüs" },
  { id: "scorpio", name: "Akrep", symbol: "♏", dates: "23 Ekim - 21 Kasım", element: "water", ruling: "Plüton" },
  { id: "sagittarius", name: "Yay", symbol: "♐", dates: "22 Kasım - 21 Aralık", element: "fire", ruling: "Jüpiter" },
  { id: "capricorn", name: "Oğlak", symbol: "♑", dates: "22 Aralık - 19 Ocak", element: "earth", ruling: "Satürn" },
  { id: "aquarius", name: "Kova", symbol: "♒", dates: "20 Ocak - 18 Şubat", element: "air", ruling: "Uranüs" },
  { id: "pisces", name: "Balık", symbol: "♓", dates: "19 Şubat - 20 Mart", element: "water", ruling: "Neptün" }
]

// Uyum matrisi (0-100 arası puan)
const compatibilityMatrix: Record<string, Record<string, number>> = {
  aries: { aries: 75, taurus: 45, gemini: 85, cancer: 40, leo: 95, virgo: 50, libra: 70, scorpio: 55, sagittarius: 95, capricorn: 45, aquarius: 80, pisces: 55 },
  taurus: { aries: 45, taurus: 80, gemini: 55, cancer: 90, leo: 60, virgo: 95, libra: 70, scorpio: 85, sagittarius: 40, capricorn: 95, aquarius: 45, pisces: 85 },
  gemini: { aries: 85, taurus: 55, gemini: 75, cancer: 50, leo: 90, virgo: 65, libra: 95, scorpio: 45, sagittarius: 80, capricorn: 50, aquarius: 95, pisces: 55 },
  cancer: { aries: 40, taurus: 90, gemini: 50, cancer: 80, leo: 60, virgo: 85, libra: 45, scorpio: 95, sagittarius: 40, capricorn: 75, aquarius: 45, pisces: 95 },
  leo: { aries: 95, taurus: 60, gemini: 90, cancer: 60, leo: 80, virgo: 55, libra: 85, scorpio: 65, sagittarius: 95, capricorn: 50, aquarius: 75, pisces: 50 },
  virgo: { aries: 50, taurus: 95, gemini: 65, cancer: 85, leo: 55, virgo: 80, libra: 60, scorpio: 90, sagittarius: 45, capricorn: 95, aquarius: 50, pisces: 75 },
  libra: { aries: 70, taurus: 70, gemini: 95, cancer: 45, leo: 85, virgo: 60, libra: 75, scorpio: 60, sagittarius: 85, capricorn: 55, aquarius: 95, pisces: 60 },
  scorpio: { aries: 55, taurus: 85, gemini: 45, cancer: 95, leo: 65, virgo: 90, libra: 60, scorpio: 80, sagittarius: 55, capricorn: 85, aquarius: 50, pisces: 95 },
  sagittarius: { aries: 95, taurus: 40, gemini: 80, cancer: 40, leo: 95, virgo: 45, libra: 85, scorpio: 55, sagittarius: 80, capricorn: 50, aquarius: 90, pisces: 50 },
  capricorn: { aries: 45, taurus: 95, gemini: 50, cancer: 75, leo: 50, virgo: 95, libra: 55, scorpio: 85, sagittarius: 50, capricorn: 80, aquarius: 60, pisces: 80 },
  aquarius: { aries: 80, taurus: 45, gemini: 95, cancer: 45, leo: 75, virgo: 50, libra: 95, scorpio: 50, sagittarius: 90, capricorn: 60, aquarius: 80, pisces: 55 },
  pisces: { aries: 55, taurus: 85, gemini: 55, cancer: 95, leo: 50, virgo: 75, libra: 60, scorpio: 95, sagittarius: 50, capricorn: 80, aquarius: 55, pisces: 80 }
}

// Detaylı uyum yorumları
const compatibilityDescriptions: Record<string, Record<string, { love: string, friendship: string, work: string }>> = {
  aries: {
    leo: {
      love: "Ateşli ve tutkulu bir çift! İkiniz de liderlik özelliklerinizle birbirinizi tamamlarsınız.",
      friendship: "Macera dolu ve eğlenceli bir dostluk. Birbirinizi motive edersiniz.",
      work: "Güçlü bir iş ortaklığı. Rekabet yerine işbirliği yaparsanız başarı garantidir."
    },
    sagittarius: {
      love: "Özgürlüğe düşkün iki burç! Birbirinize alan tanıyarak harika bir ilişki kurabilirsiniz.",
      friendship: "Seyahat ve keşif dolu bir arkadaşlık. Her zaman yeni planlarınız olur.",
      work: "Yaratıcı projeler için mükemmel ortaklar. Vizyonlarınız uyumlu."
    }
  },
  // Diğer kombinasyonlar için genel yorum kullanılır
}

export function BurcUyumu() {
  const [sign1, setSign1] = useState<string>("")
  const [sign2, setSign2] = useState<string>("")
  const [showResult, setShowResult] = useState(false)

  const getCompatibility = () => {
    if (!sign1 || !sign2) return null
    const score = compatibilityMatrix[sign1]?.[sign2] || 50
    const zodiac1 = zodiacSigns.find(z => z.id === sign1)
    const zodiac2 = zodiacSigns.find(z => z.id === sign2)
    return { score, zodiac1, zodiac2 }
  }

  const getScoreLabel = (score: number) => {
    if (score >= 90) return { text: "Mükemmel Uyum", color: "bg-green-500", emoji: "💕" }
    if (score >= 75) return { text: "Çok İyi Uyum", color: "bg-emerald-500", emoji: "💚" }
    if (score >= 60) return { text: "İyi Uyum", color: "bg-blue-500", emoji: "💙" }
    if (score >= 45) return { text: "Orta Uyum", color: "bg-yellow-500", emoji: "💛" }
    return { text: "Zorlu Uyum", color: "bg-orange-500", emoji: "🧡" }
  }

  const getElementIcon = (element: string) => {
    switch(element) {
      case "fire": return <Flame className="h-4 w-4 text-red-500" />
      case "water": return <Droplet className="h-4 w-4 text-blue-500" />
      case "air": return <Wind className="h-4 w-4 text-cyan-500" />
      case "earth": return <Mountain className="h-4 w-4 text-amber-700" />
    }
  }

  const getElementName = (element: string) => {
    const names: Record<string, string> = {
      fire: "Ateş",
      water: "Su",
      air: "Hava",
      earth: "Toprak"
    }
    return names[element] || element
  }

  const getGeneralCompatibilityText = (score: number, zodiac1?: ZodiacSign, zodiac2?: ZodiacSign) => {
    if (!zodiac1 || !zodiac2) return ""

    // Element uyumu kontrolü
    const sameElement = zodiac1.element === zodiac2.element
    const compatibleElements = (
      (zodiac1.element === "fire" && zodiac2.element === "air") ||
      (zodiac1.element === "air" && zodiac2.element === "fire") ||
      (zodiac1.element === "earth" && zodiac2.element === "water") ||
      (zodiac1.element === "water" && zodiac2.element === "earth")
    )

    if (score >= 90) {
      return `${zodiac1.name} ve ${zodiac2.name} burçları arasında olağanüstü bir uyum var! ${sameElement ? "Aynı elemente sahip olmanız size doğal bir anlayış kazandırıyor." : compatibleElements ? "Elementleriniz birbirini besliyor ve güçlendiriyor." : "Farklı elementlerinize rağmen birbirinizi tamamlıyorsunuz."}`
    }
    if (score >= 75) {
      return `${zodiac1.name} ve ${zodiac2.name} arasında güçlü bir bağ kurulabilir. Birbirinizin farklılıklarına saygı gösterdiğinizde harika bir ilişki mümkün.`
    }
    if (score >= 60) {
      return `${zodiac1.name} ve ${zodiac2.name} birlikte iyi anlaşabilir. Bazı konularda uzlaşma gerekebilir ama dengeli bir ilişki kurabilirsiniz.`
    }
    if (score >= 45) {
      return `${zodiac1.name} ve ${zodiac2.name} arasında bazı zorluklar olabilir. Ancak karşılıklı anlayış ve sabırla üstesinden gelebilirsiniz.`
    }
    return `${zodiac1.name} ve ${zodiac2.name} zıt özelliklere sahip. Bu, büyüme fırsatı sunabilir ama çaba gerektirir.`
  }

  const result = getCompatibility()

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Burç Seçimi */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-pink-500" />
            Burç Uyumu Hesapla
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Birinci Burç</Label>
              <Select value={sign1} onValueChange={(v) => { setSign1(v); setShowResult(false); }}>
                <SelectTrigger className="text-lg">
                  <SelectValue placeholder="Burç seçin" />
                </SelectTrigger>
                <SelectContent>
                  {zodiacSigns.map(sign => (
                    <SelectItem key={sign.id} value={sign.id}>
                      <span className="flex items-center gap-2">
                        <span className="text-xl">{sign.symbol}</span>
                        <span>{sign.name}</span>
                        <span className="text-sm text-muted-foreground">({sign.dates})</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>İkinci Burç</Label>
              <Select value={sign2} onValueChange={(v) => { setSign2(v); setShowResult(false); }}>
                <SelectTrigger className="text-lg">
                  <SelectValue placeholder="Burç seçin" />
                </SelectTrigger>
                <SelectContent>
                  {zodiacSigns.map(sign => (
                    <SelectItem key={sign.id} value={sign.id}>
                      <span className="flex items-center gap-2">
                        <span className="text-xl">{sign.symbol}</span>
                        <span>{sign.name}</span>
                        <span className="text-sm text-muted-foreground">({sign.dates})</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={() => setShowResult(true)}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
            disabled={!sign1 || !sign2}
          >
            <Star className="h-4 w-4 mr-2" />
            Uyumu Hesapla
          </Button>
        </CardContent>
      </Card>

      {/* Sonuçlar */}
      {showResult && result && (
        <Card className="border-2 border-pink-200">
          <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50">
            <CardTitle className="text-center">
              <div className="flex items-center justify-center gap-4 text-4xl mb-4">
                <span>{result.zodiac1?.symbol}</span>
                <Heart className="h-8 w-8 text-pink-500 fill-pink-500 animate-pulse" />
                <span>{result.zodiac2?.symbol}</span>
              </div>
              <div className="text-2xl">
                {result.zodiac1?.name} & {result.zodiac2?.name}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            {/* Skor */}
            <div className="text-center">
              <div className="relative inline-block">
                <div className="text-7xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                  %{result.score}
                </div>
                <Badge className={`${getScoreLabel(result.score).color} text-white mt-2`}>
                  {getScoreLabel(result.score).emoji} {getScoreLabel(result.score).text}
                </Badge>
              </div>
            </div>

            {/* Element Bilgileri */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{result.zodiac1?.symbol}</span>
                  <span className="font-bold">{result.zodiac1?.name}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  {getElementIcon(result.zodiac1?.element || "")}
                  <span>{getElementName(result.zodiac1?.element || "")}</span>
                  <span className="text-muted-foreground">| Yönetici: {result.zodiac1?.ruling}</span>
                </div>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{result.zodiac2?.symbol}</span>
                  <span className="font-bold">{result.zodiac2?.name}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  {getElementIcon(result.zodiac2?.element || "")}
                  <span>{getElementName(result.zodiac2?.element || "")}</span>
                  <span className="text-muted-foreground">| Yönetici: {result.zodiac2?.ruling}</span>
                </div>
              </div>
            </div>

            {/* Genel Yorum */}
            <div className="p-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-500" />
                Genel Uyum Analizi
              </h3>
              <p className="text-slate-700 leading-relaxed">
                {getGeneralCompatibilityText(result.score, result.zodiac1, result.zodiac2)}
              </p>
            </div>

            {/* Uyum Detayları */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <h4 className="font-semibold text-red-700 mb-2">❤️ Aşk Uyumu</h4>
                <div className="w-full bg-red-200 rounded-full h-2">
                  <div 
                    className="bg-red-500 h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${Math.min(100, result.score + 5)}%` }}
                  />
                </div>
                <span className="text-sm text-red-600 mt-1 block">%{Math.min(100, result.score + 5)}</span>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-700 mb-2">🤝 Dostluk Uyumu</h4>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${Math.min(100, result.score + 10)}%` }}
                  />
                </div>
                <span className="text-sm text-blue-600 mt-1 block">%{Math.min(100, result.score + 10)}</span>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-700 mb-2">💼 İş Uyumu</h4>
                <div className="w-full bg-green-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${Math.max(30, result.score - 5)}%` }}
                  />
                </div>
                <span className="text-sm text-green-600 mt-1 block">%{Math.max(30, result.score - 5)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Burç Listesi */}
      <Card>
        <CardHeader>
          <CardTitle>12 Burç</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {zodiacSigns.map(sign => (
              <div 
                key={sign.id}
                className="p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors text-center"
              >
                <div className="text-3xl mb-1">{sign.symbol}</div>
                <div className="font-semibold">{sign.name}</div>
                <div className="text-xs text-muted-foreground">{sign.dates}</div>
                <div className="flex items-center justify-center gap-1 mt-1">
                  {getElementIcon(sign.element)}
                  <span className="text-xs">{getElementName(sign.element)}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
