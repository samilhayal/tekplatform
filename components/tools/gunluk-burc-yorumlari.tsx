"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, Briefcase, Coins, Calendar, Sparkles, Moon, Sun, Flame, Droplet, Wind, Mountain } from "lucide-react"

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
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Tarih */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 text-lg text-slate-600">
          <Calendar className="h-5 w-5" />
          {currentDate}
        </div>
      </div>

      {/* Burç Seçici */}
      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2">
        {zodiacSigns.map(sign => (
          <button
            key={sign.id}
            onClick={() => setSelectedSign(sign.id)}
            className={`p-3 rounded-xl transition-all text-center ${
              selectedSign === sign.id 
                ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg scale-105" 
                : "bg-slate-100 hover:bg-slate-200"
            }`}
          >
            <div className="text-2xl mb-1">{sign.symbol}</div>
            <div className="text-xs font-medium truncate">{sign.name}</div>
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
    </div>
  )
}
