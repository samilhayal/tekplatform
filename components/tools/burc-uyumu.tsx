"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Heart, Star, Users, Flame, Droplet, Wind, Mountain, Sparkles, TrendingUp, Home, Info, Lightbulb, BookOpen, HelpCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

type Gender = "female" | "male"
type RelationType = "heterosexual" | "lesbian" | "gay"

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
  const [gender1, setGender1] = useState<Gender>("female")
  const [gender2, setGender2] = useState<Gender>("male")
  const [sign1, setSign1] = useState<string>("")
  const [sign2, setSign2] = useState<string>("")
  const [showResult, setShowResult] = useState(false)

  const getRelationType = (): RelationType => {
    if (gender1 === "female" && gender2 === "male") return "heterosexual"
    if (gender1 === "male" && gender2 === "female") return "heterosexual"
    if (gender1 === "female" && gender2 === "female") return "lesbian"
    return "gay"
  }

  const getGenderIcon = (gender: Gender) => {
    return gender === "female" ? "♀" : "♂"
  }

  const getGenderColor = (gender: Gender) => {
    return gender === "female" ? "from-pink-500 to-purple-500" : "from-blue-500 to-cyan-500"
  }

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
      <Card className="border-2 border-pink-200 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Heart className="h-20 w-20 text-pink-500 animate-pulse" />
              <Sparkles className="h-8 w-8 text-purple-500 absolute -top-2 -right-2 animate-spin" style={{animationDuration: '3s'}} />
            </div>
          </div>
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            Burç Uyumu
          </CardTitle>
          <CardDescription className="text-lg mt-2">
            İki burç arasındaki uyumu keşfedin
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Burç Seçimi */}
      <Card className="border-2 border-pink-100">
        <CardHeader className="bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50">
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Heart className="h-6 w-6 text-pink-500" />
            Burç Uyumu Hesapla
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          {/* İlişki Tipi Seçimi */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50 rounded-xl">
            <button
              onClick={() => { setGender1("female"); setGender2("male"); setShowResult(false); }}
              className={`p-4 rounded-lg border-2 transition-all ${
                gender1 === "female" && gender2 === "male"
                  ? "border-pink-500 bg-pink-50 shadow-md"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="text-3xl mb-2">♀ ❤ ♂</div>
              <div className="font-semibold text-sm">Kadın - Erkek</div>
            </button>
            <button
              onClick={() => { setGender1("female"); setGender2("female"); setShowResult(false); }}
              className={`p-4 rounded-lg border-2 transition-all ${
                gender1 === "female" && gender2 === "female"
                  ? "border-pink-500 bg-pink-50 shadow-md"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="text-3xl mb-2">♀ ❤ ♀</div>
              <div className="font-semibold text-sm">Kadın - Kadın</div>
            </button>
            <button
              onClick={() => { setGender1("male"); setGender2("male"); setShowResult(false); }}
              className={`p-4 rounded-lg border-2 transition-all ${
                gender1 === "male" && gender2 === "male"
                  ? "border-blue-500 bg-blue-50 shadow-md"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="text-3xl mb-2">♂ ❤ ♂</div>
              <div className="font-semibold text-sm">Erkek - Erkek</div>
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Kişi 1 */}
            <div className="space-y-4 p-6 rounded-xl bg-gradient-to-br from-white to-slate-50 border-2 border-slate-100">
              <div className="flex items-center gap-3 mb-4">
                <div className={`text-5xl bg-gradient-to-r ${getGenderColor(gender1)} bg-clip-text text-transparent`}>
                  {getGenderIcon(gender1)}
                </div>
                <div>
                  <Label className="text-lg font-bold">Kişi 1</Label>
                  <p className="text-sm text-muted-foreground">Burç seçin</p>
                </div>
              </div>
              <Select value={sign1} onValueChange={(v) => { setSign1(v); setShowResult(false); }}>
                <SelectTrigger className="text-lg h-14 border-2">
                  <SelectValue placeholder="Burç seçin" />
                </SelectTrigger>
                <SelectContent>
                  {zodiacSigns.map(sign => (
                    <SelectItem key={sign.id} value={sign.id} className="text-lg py-3">
                      <span className="flex items-center gap-3">
                        <span className="text-2xl">{sign.symbol}</span>
                        <div className="flex flex-col">
                          <span className="font-semibold">{sign.name}</span>
                          <span className="text-xs text-muted-foreground">{sign.dates}</span>
                        </div>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Kişi 2 */}
            <div className="space-y-4 p-6 rounded-xl bg-gradient-to-br from-white to-slate-50 border-2 border-slate-100">
              <div className="flex items-center gap-3 mb-4">
                <div className={`text-5xl bg-gradient-to-r ${getGenderColor(gender2)} bg-clip-text text-transparent`}>
                  {getGenderIcon(gender2)}
                </div>
                <div>
                  <Label className="text-lg font-bold">Kişi 2</Label>
                  <p className="text-sm text-muted-foreground">Burç seçin</p>
                </div>
              </div>
              <Select value={sign2} onValueChange={(v) => { setSign2(v); setShowResult(false); }}>
                <SelectTrigger className="text-lg h-14 border-2">
                  <SelectValue placeholder="Burç seçin" />
                </SelectTrigger>
                <SelectContent>
                  {zodiacSigns.map(sign => (
                    <SelectItem key={sign.id} value={sign.id} className="text-lg py-3">
                      <span className="flex items-center gap-3">
                        <span className="text-2xl">{sign.symbol}</span>
                        <div className="flex flex-col">
                          <span className="font-semibold">{sign.name}</span>
                          <span className="text-xs text-muted-foreground">{sign.dates}</span>
                        </div>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={() => setShowResult(true)}
            className="w-full h-14 text-lg bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 shadow-lg hover:shadow-xl transition-all"
            disabled={!sign1 || !sign2}
          >
            <Star className="h-5 w-5 mr-2" />
            Uyumu Hesapla
            <Sparkles className="h-5 w-5 ml-2" />
          </Button>
        </CardContent>
      </Card>

      {/* Sonuçlar */}
      {showResult && result && (
        <div className="space-y-6">
          {/* Ana Skor Kartı */}
          <Card className="border-4 border-pink-200 overflow-hidden">
            <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 p-8 text-white">
              <div className="flex items-center justify-center gap-6 mb-4">
                <div className="text-center">
                  <div className="text-7xl mb-2">{result.zodiac1?.symbol}</div>
                  <div className={`text-4xl ${gender1 === "female" ? "text-pink-200" : "text-blue-200"}`}>
                    {getGenderIcon(gender1)}
                  </div>
                </div>
                <div className="relative">
                  <Heart className="h-16 w-16 fill-white animate-pulse" />
                  <Sparkles className="h-8 w-8 absolute -top-2 -right-2 animate-spin" style={{ animationDuration: "3s" }} />
                </div>
                <div className="text-center">
                  <div className="text-7xl mb-2">{result.zodiac2?.symbol}</div>
                  <div className={`text-4xl ${gender2 === "female" ? "text-pink-200" : "text-blue-200"}`}>
                    {getGenderIcon(gender2)}
                  </div>
                </div>
              </div>
              <h2 className="text-4xl font-bold text-center mb-2">
                {result.zodiac1?.name} & {result.zodiac2?.name}
              </h2>
              <p className="text-center text-pink-100 text-lg">
                {getRelationType() === "heterosexual" ? "Kadın - Erkek" : 
                 getRelationType() === "lesbian" ? "Kadın - Kadın" : "Erkek - Erkek"} İlişkisi
              </p>
            </div>
            
            <CardContent className="pt-8 space-y-8">
              {/* Circular Score Display */}
              <div className="text-center relative">
                <div className="relative inline-block">
                  <svg className="w-64 h-64" viewBox="0 0 200 200">
                    {/* Background circle */}
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="20"
                    />
                    {/* Progress circle */}
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="20"
                      strokeDasharray={`${result.score * 5.03} 503`}
                      strokeLinecap="round"
                      transform="rotate(-90 100 100)"
                      className="transition-all duration-1000"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ec4899" />
                        <stop offset="50%" stopColor="#a855f7" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-6xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                      %{result.score}
                    </div>
                    <div className="text-2xl mt-2">{getScoreLabel(result.score).emoji}</div>
                  </div>
                </div>
                <div className="mt-4">
                  <Badge className={`${getScoreLabel(result.score).color} text-white text-lg px-6 py-2`}>
                    {getScoreLabel(result.score).text}
                  </Badge>
                </div>
              </div>

              {/* Element & Ruling */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className={`p-6 rounded-xl bg-gradient-to-br ${gender1 === "female" ? "from-pink-50 to-purple-50" : "from-blue-50 to-cyan-50"} border-2 ${gender1 === "female" ? "border-pink-200" : "border-blue-200"}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-5xl">{result.zodiac1?.symbol}</span>
                    <div>
                      <div className="font-bold text-xl">{result.zodiac1?.name}</div>
                      <div className="text-sm text-muted-foreground">{result.zodiac1?.dates}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-4">
                    {getElementIcon(result.zodiac1?.element || "")}
                    <span className="font-semibold">{getElementName(result.zodiac1?.element || "")}</span>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Yönetici Gezegen: <span className="font-semibold text-slate-700">{result.zodiac1?.ruling}</span>
                  </div>
                </div>
                
                <div className={`p-6 rounded-xl bg-gradient-to-br ${gender2 === "female" ? "from-pink-50 to-purple-50" : "from-blue-50 to-cyan-50"} border-2 ${gender2 === "female" ? "border-pink-200" : "border-blue-200"}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-5xl">{result.zodiac2?.symbol}</span>
                    <div>
                      <div className="font-bold text-xl">{result.zodiac2?.name}</div>
                      <div className="text-sm text-muted-foreground">{result.zodiac2?.dates}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-4">
                    {getElementIcon(result.zodiac2?.element || "")}
                    <span className="font-semibold">{getElementName(result.zodiac2?.element || "")}</span>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Yönetici Gezegen: <span className="font-semibold text-slate-700">{result.zodiac2?.ruling}</span>
                  </div>
                </div>
              </div>

              {/* Genel Analiz */}
              <div className="p-8 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 rounded-2xl border-2 border-purple-200">
                <h3 className="font-bold text-2xl mb-4 flex items-center gap-2">
                  <Users className="h-6 w-6 text-purple-500" />
                  Genel Uyum Analizi
                </h3>
                <p className="text-slate-700 leading-relaxed text-lg">
                  {getGeneralCompatibilityText(result.score, result.zodiac1, result.zodiac2)}
                </p>
              </div>

              {/* Detaylı Uyum Skorları */}
              <Tabs defaultValue="love" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="love">❤️ Aşk</TabsTrigger>
                  <TabsTrigger value="friendship">🤝 Dostluk</TabsTrigger>
                  <TabsTrigger value="work">💼 İş</TabsTrigger>
                </TabsList>

                <TabsContent value="love" className="mt-6">
                  <Card className="border-2 border-red-200 bg-gradient-to-br from-red-50 to-pink-50">
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-lg font-semibold text-red-700">Aşk Uyumu</span>
                          <span className="text-2xl font-bold text-red-600">%{Math.min(100, result.score + 5)}</span>
                        </div>
                        
                        <div className="relative w-full h-8 bg-red-100 rounded-full overflow-hidden">
                          <div 
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-400 via-pink-500 to-red-600 rounded-full transition-all duration-1000 flex items-center justify-end pr-4"
                            style={{ width: `${Math.min(100, result.score + 5)}%` }}
                          >
                            <TrendingUp className="h-5 w-5 text-white" />
                          </div>
                        </div>

                        <div className="grid grid-cols-5 gap-2 mt-6">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`h-24 rounded-lg transition-all duration-500 ${
                                i < Math.floor((Math.min(100, result.score + 5) / 100) * 5)
                                  ? "bg-gradient-to-t from-red-400 to-pink-500 shadow-lg"
                                  : "bg-red-100"
                              }`}
                              style={{ transitionDelay: `${i * 100}ms` }}
                            />
                          ))}
                        </div>
                        
                        <p className="text-slate-600 mt-4 leading-relaxed">
                          Aşk hayatınızda tutkulu ve heyecan dolu anlar yaşayabilirsiniz. 
                          {result.score > 70 ? " İkiniz de birbirinize güçlü bir çekim hissediyorsunuz." : " Farklılıklarınız ilişkinize renk katabilir."}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="friendship" className="mt-6">
                  <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-lg font-semibold text-blue-700">Dostluk Uyumu</span>
                          <span className="text-2xl font-bold text-blue-600">%{Math.min(100, result.score + 10)}</span>
                        </div>
                        
                        <div className="relative w-full h-8 bg-blue-100 rounded-full overflow-hidden">
                          <div 
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-600 rounded-full transition-all duration-1000 flex items-center justify-end pr-4"
                            style={{ width: `${Math.min(100, result.score + 10)}%` }}
                          >
                            <TrendingUp className="h-5 w-5 text-white" />
                          </div>
                        </div>

                        <div className="grid grid-cols-5 gap-2 mt-6">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`h-24 rounded-lg transition-all duration-500 ${
                                i < Math.floor((Math.min(100, result.score + 10) / 100) * 5)
                                  ? "bg-gradient-to-t from-blue-400 to-cyan-500 shadow-lg"
                                  : "bg-blue-100"
                              }`}
                              style={{ transitionDelay: `${i * 100}ms` }}
                            />
                          ))}
                        </div>
                        
                        <p className="text-slate-600 mt-4 leading-relaxed">
                          Arkadaşlık açısından birbirinize destek olabilirsiniz.
                          {result.score > 70 ? " Güçlü bir güven bağı oluşturabilirsiniz." : " Farklı bakış açılarınız sizi zenginleştirir."}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="work" className="mt-6">
                  <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-lg font-semibold text-green-700">İş Uyumu</span>
                          <span className="text-2xl font-bold text-green-600">%{Math.max(30, result.score - 5)}</span>
                        </div>
                        
                        <div className="relative w-full h-8 bg-green-100 rounded-full overflow-hidden">
                          <div 
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 rounded-full transition-all duration-1000 flex items-center justify-end pr-4"
                            style={{ width: `${Math.max(30, result.score - 5)}%` }}
                          >
                            <TrendingUp className="h-5 w-5 text-white" />
                          </div>
                        </div>

                        <div className="grid grid-cols-5 gap-2 mt-6">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`h-24 rounded-lg transition-all duration-500 ${
                                i < Math.floor((Math.max(30, result.score - 5) / 100) * 5)
                                  ? "bg-gradient-to-t from-green-400 to-emerald-500 shadow-lg"
                                  : "bg-green-100"
                              }`}
                              style={{ transitionDelay: `${i * 100}ms` }}
                            />
                          ))}
                        </div>
                        
                        <p className="text-slate-600 mt-4 leading-relaxed">
                          İş birliği konusunda {result.score > 60 ? "uyumlu bir takım oluşturabilirsiniz" : "farklı yaklaşımlarınız bazen çatışabilir"}.
                          {result.score > 70 ? " Hedefleriniz aynı yöndedir." : " Net görev dağılımı başarıyı artırır."}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
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
            <p className="text-slate-700">İlişki tipini seçin (Kadın-Erkek, Kadın-Kadın, Erkek-Erkek)</p>
          </div>
          <div className="flex gap-3">
            <Badge className="bg-blue-500">2</Badge>
            <p className="text-slate-700">1. kişinin burcunu seçin</p>
          </div>
          <div className="flex gap-3">
            <Badge className="bg-blue-500">3</Badge>
            <p className="text-slate-700">2. kişinin burcunu seçin</p>
          </div>
          <div className="flex gap-3">
            <Badge className="bg-blue-500">4</Badge>
            <p className="text-slate-700">"Uyumu Hesapla" butonuna tıklayın</p>
          </div>
          <div className="flex gap-3">
            <Badge className="bg-blue-500">5</Badge>
            <p className="text-slate-700">Aşk, Dostluk ve İş uyumu sekmelerini inceleyin</p>
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
          <div className="p-4 bg-pink-50 rounded-lg">
            <h4 className="font-semibold text-pink-700 mb-2">❤️ Yeni İlişki</h4>
            <p className="text-slate-600">Tanıştığınız biriyle aranızdaki astrolojik uyumu öğrenin. Aşk sekmesinde detaylı analiz bulabilirsiniz.</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-700 mb-2">🤝 Arkadaşlık</h4>
            <p className="text-slate-600">En iyi arkadaşınızla uyumunuzu test edin. Dostluk sekmesinde hangi alanlarda uyumlu olduğunuzu görebilirsiniz.</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-semibold text-green-700 mb-2">💼 İş Ortaklığı</h4>
            <p className="text-slate-600">Potansiyel iş ortağınızla profesyonel uyumunuzu değerlendirin. İş sekmesi size yol gösterecektir.</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <h4 className="font-semibold text-purple-700 mb-2">👨‍👩‍👧‍👦 Aile İçi</h4>
            <p className="text-slate-600">Aile bireylerinizle uyumunuzu anlamak için kullanabilirsiniz. Hangi burçlarla daha uyumlu olduğunuzu keşfedin.</p>
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
              <strong>Güneş Burcu:</strong> Bu hesaplama sadece güneş burçlarına göre yapılır. Tam uyum için ay ve yükselen burç da önemlidir.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <Star className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <p className="text-slate-700">
              <strong>Element Uyumu:</strong> Aynı elementten burçlar (Ateş-Ateş, Su-Su) genellikle birbirini anlar. Tamamlayıcı elementler (Ateş-Hava, Toprak-Su) de uyumludur.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <Star className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <p className="text-slate-700">
              <strong>Düşük Uyum:</strong> Düşük uyum kötü ilişki anlamına gelmez. Zorluklarla başa çıkmak ilişkiyi güçlendirebilir.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <Star className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <p className="text-slate-700">
              <strong>Farklı İlişki Tipleri:</strong> Aynı burç kombinasyonu, ilişki tipine göre (aşk, dostluk, iş) farklı skorlar alabilir.
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
              <Heart className="h-5 w-5" />
              Karşıt Burçlar
            </h4>
            <p className="text-slate-600">
              Zodyak çemberinde karşı karşıya olan burçlar (Koç-Terazi, Boğa-Akrep) birbirini çekse de çatışma yaşayabilir. "Karşıtlar çeker" prensibi!
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h4 className="font-semibold text-blue-700 mb-2 flex items-center gap-2">
              <Flame className="h-5 w-5" />
              En Uyumlu Elementler
            </h4>
            <p className="text-slate-600">
              Ateş ile Hava (enerjik ve dinamik), Toprak ile Su (stabil ve duygusal) elementleri en uyumlu kombinasyonlardır.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h4 className="font-semibold text-green-700 mb-2 flex items-center gap-2">
              <Users className="h-5 w-5" />
              Venüs Faktörü
            </h4>
            <p className="text-slate-600">
              Astrolojide aşk uyumu için Venüs burcunuz çok önemlidir. Venüs, nasıl sevdiğinizi ve sevilmek istediğinizi gösterir.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h4 className="font-semibold text-orange-700 mb-2 flex items-center gap-2">
              <Mountain className="h-5 w-5" />
              Sabit Burçlar
            </h4>
            <p className="text-slate-600">
              Boğa, Aslan, Akrep ve Kova gibi sabit burçlar biraz inatçıdır. İki sabit burç bir araya geldiğinde güç savaşları yaşanabilir.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h4 className="font-semibold text-pink-700 mb-2 flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Ay Burcu Etkisi
            </h4>
            <p className="text-slate-600">
              İki kişinin ay burçları uyumluysa, duygusal bağları çok güçlü olur. Uzun vadeli ilişkilerde ay burcu uyumu kritiktir.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
