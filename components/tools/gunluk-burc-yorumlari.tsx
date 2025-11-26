"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Heart, Briefcase, Coins, Calendar, Sparkles, Moon, Sun, Flame, Droplet, Wind, Mountain, Home, Info, Lightbulb, BookOpen, HelpCircle } from "lucide-react"
import Link from "next/link"

interface ZodiacSign {
  id: string
  name: string
  symbol: string
  dates: string
  element: "fire" | "earth" | "air" | "water"
  ruling: string
}

interface DailyHoroscope {
  general: string
  love: string
  career: string
  money: string
  health: string
  luckyNumbers: number[]
  luckyColor: string
  mood: string
  compatibility: string
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

// Günlük yorum şablonları - Her burç için benzersiz günlük yorumlar
const horoscopeTemplates: Record<string, DailyHoroscope[]> = {
  aries: [
    {
      general: "Bugün enerji seviyeniz yüksek! Yeni başlangıçlar için harika bir gün. Cesaretle adım atın.",
      love: "Romantik ilişkinizde yeni bir sayfa açabilirsiniz. Duygularınızı ifade etmekten çekinmeyin.",
      career: "İş yerinde liderlik özellikleriniz ön plana çıkıyor. Fikirlerinizi paylaşın.",
      money: "Finansal konularda dikkatli olun. Ani harcamalardan kaçının.",
      health: "Fiziksel aktivite size iyi gelecek. Spor yapmayı düşünün.",
      luckyNumbers: [7, 14, 21],
      luckyColor: "Kırmızı",
      mood: "Enerjik",
      compatibility: "Aslan"
    },
    {
      general: "Bugün sabırlı olmanız gereken bir gün. Aceleci kararlardan kaçının.",
      love: "Partnerinizle iletişiminizi güçlendirin. Dinlemek kadar konuşmak da önemli.",
      career: "Yeni projeler için hazırlık yapın. Planlı hareket edin.",
      money: "Beklenmedik bir gelir kapısı açılabilir. Fırsatları değerlendirin.",
      health: "Stresten uzak durun. Meditasyon size iyi gelebilir.",
      luckyNumbers: [3, 12, 27],
      luckyColor: "Turuncu",
      mood: "Düşünceli",
      compatibility: "Yay"
    }
  ],
  taurus: [
    {
      general: "Bugün maddi konular ön planda. Pratik yaklaşımlarınız size avantaj sağlayacak.",
      love: "Aşk hayatınızda istikrar arıyorsunuz. Güven veren ilişkiler öne çıkıyor.",
      career: "Sabırlı çalışmalarınızın karşılığını almaya başlayacaksınız.",
      money: "Yatırım fırsatlarını değerlendirin. Uzun vadeli düşünün.",
      health: "Beslenme alışkanlıklarınıza dikkat edin. Sağlıklı tercihler yapın.",
      luckyNumbers: [5, 16, 23],
      luckyColor: "Yeşil",
      mood: "Kararlı",
      compatibility: "Başak"
    }
  ],
  gemini: [
    {
      general: "İletişim yetenekleriniz bugün çok güçlü. Sosyal etkinlikler için ideal bir gün.",
      love: "Flört etmek için harika bir zaman. Çekiciliğiniz artıyor.",
      career: "Networking fırsatlarını değerlendirin. Yeni bağlantılar kurabilirsiniz.",
      money: "Birden fazla gelir kaynağı düşünün. Yaratıcı fikirler size para kazandırabilir.",
      health: "Zihninizi meşgul tutun ama dinlenmeyi de unutmayın.",
      luckyNumbers: [9, 18, 24],
      luckyColor: "Sarı",
      mood: "Meraklı",
      compatibility: "Kova"
    }
  ],
  cancer: [
    {
      general: "Duygusal yoğunluk yaşayabilirsiniz. İçgüdülerinize güvenin.",
      love: "Aile ve ev hayatı ön planda. Sevdiklerinizle vakit geçirin.",
      career: "Yaratıcılığınızı kullanın. Duygusal zeka iş yerinde avantaj.",
      money: "Ev ve aile ile ilgili harcamalar gündemde olabilir.",
      health: "Duygusal sağlığınıza önem verin. Kendinize zaman ayırın.",
      luckyNumbers: [2, 11, 20],
      luckyColor: "Gümüş",
      mood: "Duygusal",
      compatibility: "Akrep"
    }
  ],
  leo: [
    {
      general: "Sahne sizin! Karizmanız bugün çok güçlü. Dikkat çekmekten korkmayın.",
      love: "Romantizm dolu bir gün. Partnerinizi özel hissettirin.",
      career: "Yaratıcı projeler için ideal. Yeteneklerinizi sergileyin.",
      money: "Cömertliğiniz ön plana çıkıyor ama bütçenizi de göz önünde bulundurun.",
      health: "Kalp sağlığınıza dikkat edin. Neşeli aktiviteler size iyi gelecek.",
      luckyNumbers: [1, 19, 28],
      luckyColor: "Altın",
      mood: "Kendinden emin",
      compatibility: "Koç"
    }
  ],
  virgo: [
    {
      general: "Detaylara odaklanın. Analitik yetenekleriniz bugün çok değerli.",
      love: "İlişkinizde pratik adımlar atın. Küçük jestler büyük anlam ifade eder.",
      career: "Organizasyon becerileri öne çıkıyor. Düzen size başarı getirir.",
      money: "Bütçe planlaması için ideal gün. Tasarruf fırsatlarını değerlendirin.",
      health: "Sağlıklı rutinler oluşturun. Düzenli yaşam size iyi gelecek.",
      luckyNumbers: [6, 15, 22],
      luckyColor: "Lacivert",
      mood: "Odaklanmış",
      compatibility: "Oğlak"
    }
  ],
  libra: [
    {
      general: "Denge arayışı içindesiniz. Estetik ve uyum bugün önemli.",
      love: "İlişkilerde adalet ve eşitlik arıyorsunuz. Karşılıklı anlayış gelişiyor.",
      career: "Ortaklıklar ve işbirlikleri için uygun gün.",
      money: "Lüks harcamalardan kaçının. Dengeli bir bütçe oluşturun.",
      health: "Böbrekler ve bel bölgesi hassas olabilir. Su tüketimine dikkat edin.",
      luckyNumbers: [4, 13, 26],
      luckyColor: "Pembe",
      mood: "Uyumlu",
      compatibility: "İkizler"
    }
  ],
  scorpio: [
    {
      general: "Derinlere inin. Sezgileriniz bugün çok güçlü. Gizli gerçekler ortaya çıkabilir.",
      love: "Yoğun ve tutkulu bir gün. Derin bağlar kurabilirsiniz.",
      career: "Araştırma ve analiz için ideal. Detayları kaçırmayın.",
      money: "Ortak yatırımlar gündemde olabilir. Dikkatli olun.",
      health: "Duygusal arınma size iyi gelecek. Eski sorunları çözün.",
      luckyNumbers: [8, 17, 25],
      luckyColor: "Bordo",
      mood: "Gizemli",
      compatibility: "Balık"
    }
  ],
  sagittarius: [
    {
      general: "Macera zamanı! Yeni deneyimler ve keşifler için açık olun.",
      love: "Özgürlük ve eğlence ön planda. Hafif ve neşeli ilişkiler.",
      career: "Eğitim ve gelişim fırsatları. Ufkunuzu genişletin.",
      money: "Şans yanınızda ama kumar oynamayın. Akıllı riskler alın.",
      health: "Kalça ve bacaklar hassas olabilir. Egzersiz yapın.",
      luckyNumbers: [3, 12, 21],
      luckyColor: "Mor",
      mood: "İyimser",
      compatibility: "Koç"
    }
  ],
  capricorn: [
    {
      general: "Kariyer odaklı bir gün. Hedeflerinize doğru adım adım ilerleyin.",
      love: "Ciddi ve kararlı ilişkiler arıyorsunuz. Güven önemli.",
      career: "Profesyonel tanınırlık artıyor. Başarılar yakın.",
      money: "Uzun vadeli yatırımlar için ideal. Sabırlı olun.",
      health: "Kemikler ve eklemler hassas olabilir. Kalsiyum alımına dikkat edin.",
      luckyNumbers: [4, 16, 28],
      luckyColor: "Kahverengi",
      mood: "Odaklanmış",
      compatibility: "Boğa"
    }
  ],
  aquarius: [
    {
      general: "Yenilikçi fikirler akıyor. Farklı düşünmekten korkmayın.",
      love: "Özgür ruhlu ilişkiler. Arkadaşlık temelli aşk öne çıkıyor.",
      career: "Teknoloji ve inovasyon projelerinde parlayın.",
      money: "Beklenmedik kazançlar olabilir. Esnek olun.",
      health: "Sinir sistemi hassas olabilir. Rahatlama teknikleri deneyin.",
      luckyNumbers: [7, 14, 22],
      luckyColor: "Elektrik mavisi",
      mood: "Yaratıcı",
      compatibility: "İkizler"
    }
  ],
  pisces: [
    {
      general: "Hayal gücünüz dorukta. Sanatsal ve spiritüel aktiviteler için ideal.",
      love: "Romantik ve hassas bir gün. Ruh eşinizi çekebilirsiniz.",
      career: "Yaratıcı işlerde başarı. Sezgilerinize güvenin.",
      money: "Hayalci yaklaşımdan kaçının. Pratik kararlar verin.",
      health: "Ayaklar ve bağışıklık sistemi hassas olabilir. Dinlenin.",
      luckyNumbers: [2, 11, 29],
      luckyColor: "Deniz yeşili",
      mood: "Hayalperest",
      compatibility: "Yengeç"
    }
  ]
}

export function GunlukBurcYorumlari() {
  const [selectedSign, setSelectedSign] = useState<string>("aries")
  const [dailyHoroscope, setDailyHoroscope] = useState<DailyHoroscope | null>(null)
  const [currentDate, setCurrentDate] = useState<string>("")

  useEffect(() => {
    // Günün tarihini al
    const today = new Date()
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }
    setCurrentDate(today.toLocaleDateString('tr-TR', options))

    // Günlük yorumu seç (tarih bazlı deterministik seçim)
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24)
    const templates = horoscopeTemplates[selectedSign] || horoscopeTemplates.aries
    const index = dayOfYear % templates.length
    setDailyHoroscope(templates[index])
  }, [selectedSign])

  const getElementIcon = (element: string) => {
    switch(element) {
      case "fire": return <Flame className="h-4 w-4 text-red-500" />
      case "water": return <Droplet className="h-4 w-4 text-blue-500" />
      case "air": return <Wind className="h-4 w-4 text-cyan-500" />
      case "earth": return <Mountain className="h-4 w-4 text-amber-700" />
    }
  }

  const selectedZodiac = zodiacSigns.find(z => z.id === selectedSign)

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Ana Sayfaya Dön Butonu */}
      <div className="flex justify-between items-center">
        <Link href="/">
          <Button variant="outline" className="gap-2">
            <Home className="h-4 w-4" />
            Ana Sayfaya Dön
          </Button>
        </Link>
        <Badge variant="secondary" className="text-lg px-4 py-2">
          <Calendar className="h-4 w-4 mr-2" />
          {currentDate}
        </Badge>
      </div>

      {/* Hero Section */}
      <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <CardHeader className="text-center pb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Moon className="h-20 w-20 text-purple-500 animate-pulse" />
              <Sparkles className="h-8 w-8 text-pink-500 absolute -top-2 -right-2 animate-bounce" />
            </div>
          </div>
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            Günlük Burç Yorumları
          </CardTitle>
          <CardDescription className="text-lg mt-2">
            Bugün için kişisel astrolojik rehberiniz
          </CardDescription>
        </CardHeader>
      </Card>
      {/* Tarih */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 text-lg text-slate-600">
          <Calendar className="h-5 w-5" />
          {currentDate}
        </div>
      </div>

      {/* Burç Seçici */}
      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-3">
        {zodiacSigns.map((sign, index) => (
          <button
            key={sign.id}
            onClick={() => setSelectedSign(sign.id)}
            className={`group p-4 rounded-2xl transition-all duration-300 text-center relative overflow-hidden ${
              selectedSign === sign.id 
                ? "bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 text-white shadow-2xl scale-110 z-10" 
                : "bg-gradient-to-br from-slate-50 to-slate-100 hover:from-purple-100 hover:to-pink-100 hover:shadow-lg hover:scale-105"
            }`}
            style={{
              animationDelay: `${index * 30}ms`,
              animation: 'fadeIn 0.4s ease-out forwards',
            }}
          >
            <div className={`text-3xl mb-2 transition-transform duration-300 ${
              selectedSign === sign.id ? 'scale-110' : 'group-hover:scale-125'
            }`}>
              {sign.symbol}
            </div>
            <div className={`text-xs font-semibold truncate ${
              selectedSign === sign.id ? 'text-white' : 'text-slate-700 group-hover:text-purple-600'
            }`}>
              {sign.name}
            </div>
            {selectedSign === sign.id && (
              <div className="absolute inset-0 bg-white/20 animate-pulse pointer-events-none" />
            )}
          </button>
        ))}
      </div>

      {/* Seçili Burç Bilgisi */}
      {selectedZodiac && (
        <Card className="border-2 border-purple-200">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-5xl">{selectedZodiac.symbol}</span>
                <div>
                  <div className="text-3xl font-bold">{selectedZodiac.name}</div>
                  <div className="text-sm text-muted-foreground">{selectedZodiac.dates}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {getElementIcon(selectedZodiac.element)}
                <Badge variant="outline">{selectedZodiac.ruling}</Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {dailyHoroscope && (
              <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid w-full grid-cols-5 mb-6">
                  <TabsTrigger value="general" className="flex items-center gap-1">
                    <Sparkles className="h-4 w-4" />
                    <span className="hidden sm:inline">Genel</span>
                  </TabsTrigger>
                  <TabsTrigger value="love" className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    <span className="hidden sm:inline">Aşk</span>
                  </TabsTrigger>
                  <TabsTrigger value="career" className="flex items-center gap-1">
                    <Briefcase className="h-4 w-4" />
                    <span className="hidden sm:inline">Kariyer</span>
                  </TabsTrigger>
                  <TabsTrigger value="money" className="flex items-center gap-1">
                    <Coins className="h-4 w-4" />
                    <span className="hidden sm:inline">Para</span>
                  </TabsTrigger>
                  <TabsTrigger value="health" className="flex items-center gap-1">
                    <Star className="h-4 w-4" />
                    <span className="hidden sm:inline">Sağlık</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="space-y-4">
                  <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                    <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-purple-500" />
                      Günlük Genel Yorum
                    </h3>
                    <p className="text-slate-700 leading-relaxed text-lg">{dailyHoroscope.general}</p>
                  </div>
                </TabsContent>

                <TabsContent value="love" className="space-y-4">
                  <div className="p-6 bg-gradient-to-r from-pink-50 to-red-50 rounded-xl">
                    <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                      <Heart className="h-5 w-5 text-pink-500" />
                      Aşk ve İlişkiler
                    </h3>
                    <p className="text-slate-700 leading-relaxed text-lg">{dailyHoroscope.love}</p>
                  </div>
                </TabsContent>

                <TabsContent value="career" className="space-y-4">
                  <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                    <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-blue-500" />
                      Kariyer ve İş
                    </h3>
                    <p className="text-slate-700 leading-relaxed text-lg">{dailyHoroscope.career}</p>
                  </div>
                </TabsContent>

                <TabsContent value="money" className="space-y-4">
                  <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                    <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                      <Coins className="h-5 w-5 text-green-500" />
                      Para ve Finans
                    </h3>
                    <p className="text-slate-700 leading-relaxed text-lg">{dailyHoroscope.money}</p>
                  </div>
                </TabsContent>

                <TabsContent value="health" className="space-y-4">
                  <div className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl">
                    <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                      <Star className="h-5 w-5 text-amber-500" />
                      Sağlık ve Wellness
                    </h3>
                    <p className="text-slate-700 leading-relaxed text-lg">{dailyHoroscope.health}</p>
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </CardContent>
        </Card>
      )}

      {/* Günlük İpuçları */}
      {dailyHoroscope && (
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-purple-100 to-purple-50 border-purple-200">
            <CardContent className="pt-4 text-center">
              <div className="text-sm text-purple-600 font-medium mb-1">Şanslı Sayılar</div>
              <div className="text-xl font-bold text-purple-700">
                {dailyHoroscope.luckyNumbers.join(", ")}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-pink-100 to-pink-50 border-pink-200">
            <CardContent className="pt-4 text-center">
              <div className="text-sm text-pink-600 font-medium mb-1">Şanslı Renk</div>
              <div className="text-xl font-bold text-pink-700">
                {dailyHoroscope.luckyColor}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-100 to-blue-50 border-blue-200">
            <CardContent className="pt-4 text-center">
              <div className="text-sm text-blue-600 font-medium mb-1">Günün Modunuz</div>
              <div className="text-xl font-bold text-blue-700">
                {dailyHoroscope.mood}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-100 to-green-50 border-green-200">
            <CardContent className="pt-4 text-center">
              <div className="text-sm text-green-600 font-medium mb-1">En Uyumlu Burç</div>
              <div className="text-xl font-bold text-green-700">
                {dailyHoroscope.compatibility}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

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
            <p className="text-slate-700">Yukarıdaki burç listesinden kendi burcunuzu seçin</p>
          </div>
          <div className="flex gap-3">
            <Badge className="bg-blue-500">2</Badge>
            <p className="text-slate-700">Günlük yorumunuz otomatik olarak yüklenecektir</p>
          </div>
          <div className="flex gap-3">
            <Badge className="bg-blue-500">3</Badge>
            <p className="text-slate-700">Genel, Aşk, Kariyer, Para ve Sağlık sekmelerini inceleyebilirsiniz</p>
          </div>
          <div className="flex gap-3">
            <Badge className="bg-blue-500">4</Badge>
            <p className="text-slate-700">Şanslı sayılar, renkler ve uyumlu burç bilgilerini kontrol edin</p>
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
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-semibold text-green-700 mb-2">📅 Sabah Rutini</h4>
            <p className="text-slate-600">Her sabah kahvaltıdan önce günlük burcunuzu okuyun ve güne hazırlanın.</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-700 mb-2">💼 İş Kararları</h4>
            <p className="text-slate-600">Önemli toplantı veya karar öncesi kariyer yorumlarınıza göz atın.</p>
          </div>
          <div className="p-4 bg-pink-50 rounded-lg">
            <h4 className="font-semibold text-pink-700 mb-2">❤️ İlişki Planlaması</h4>
            <p className="text-slate-600">Aşk yorumlarınıza göre partnerinizle özel zaman planlayın.</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <h4 className="font-semibold text-purple-700 mb-2">🎨 Renk Seçimi</h4>
            <p className="text-slate-600">Günün şanslı rengine göre kıyafet seçimi yapabilirsiniz.</p>
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
              <strong>Güncellik:</strong> Burç yorumları her gün güncellenir ve o güne özgüdür.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <Star className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <p className="text-slate-700">
              <strong>Kişiselleştirme:</strong> Yorumlar doğum haritanıza değil, burç özelliklerinize göre hazırlanır.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <Star className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <p className="text-slate-700">
              <strong>Rehberlik:</strong> Astroloji yorumları rehberlik amaçlıdır, kesin tahmin değildir.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <Star className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <p className="text-slate-700">
              <strong>Element Bilgisi:</strong> Her burcun elementi (Ateş, Toprak, Hava, Su) karakterini etkiler.
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
              <Moon className="h-5 w-5" />
              Ay'ın Etkisi
            </h4>
            <p className="text-slate-600">
              Ay'ın bulunduğu burç, günlük ruh halinizi ve duygusal durumunuzu etkiler. Her 2.5 günde bir burç değiştirir.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h4 className="font-semibold text-blue-700 mb-2 flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Retro Dönemler
            </h4>
            <p className="text-slate-600">
              Merkür retrosu gibi gezegen geri gidişleri, iletişim ve teknoloji konularında ekstra dikkat gerektirir.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h4 className="font-semibold text-green-700 mb-2 flex items-center gap-2">
              <Sun className="h-5 w-5" />
              Güneş ve Yükselen Burç
            </h4>
            <p className="text-slate-600">
              Sadece güneş burcunuz değil, yükselen burcunuz da kişiliğinizi şekillendirir. Tam doğum saati önemlidir.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h4 className="font-semibold text-orange-700 mb-2 flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Venüs ve Mars
            </h4>
            <p className="text-slate-600">
              Venüs aşk ve ilişkileri, Mars ise enerji ve tutkuyu yönetir. Bu gezegenlerin konumu önemlidir.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h4 className="font-semibold text-pink-700 mb-2 flex items-center gap-2">
              <Star className="h-5 w-5" />
              12 Ev Sistemi
            </h4>
            <p className="text-slate-600">
              Astrolojide 12 ev vardır ve her biri hayatın farklı alanlarını temsil eder: kariyer, aşk, sağlık vs.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
