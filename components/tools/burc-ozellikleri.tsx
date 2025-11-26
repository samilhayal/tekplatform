"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, Briefcase, Users, Flame, Droplet, Wind, Mountain, Sparkles, Brain, Crown, Shield, Gem, Zap } from "lucide-react"

interface ZodiacDetail {
  id: string
  name: string
  symbol: string
  dates: string
  element: "fire" | "earth" | "air" | "water"
  modality: "cardinal" | "fixed" | "mutable"
  ruling: string
  house: number
  traits: {
    positive: string[]
    negative: string[]
  }
  compatibility: {
    best: string[]
    good: string[]
    challenging: string[]
  }
  career: string[]
  health: {
    bodyParts: string[]
    tips: string
  }
  colors: string[]
  numbers: number[]
  stones: string[]
  metal: string
  day: string
  description: string
}

const zodiacDetails: ZodiacDetail[] = [
  {
    id: "aries",
    name: "Koç",
    symbol: "♈",
    dates: "21 Mart - 19 Nisan",
    element: "fire",
    modality: "cardinal",
    ruling: "Mars",
    house: 1,
    traits: {
      positive: ["Cesur", "Enerjik", "Lider", "İyimser", "Tutkulu", "Özgüvenli"],
      negative: ["Sabırsız", "Dürtüsel", "Bencil", "Saldırgan", "Rekabetçi"]
    },
    compatibility: {
      best: ["Aslan", "Yay"],
      good: ["İkizler", "Kova"],
      challenging: ["Yengeç", "Oğlak"]
    },
    career: ["Girişimci", "Sporcu", "Asker", "Lider Pozisyonları", "Satış", "Acil Servis"],
    health: {
      bodyParts: ["Baş", "Yüz", "Beyin"],
      tips: "Baş ağrıları ve migrene dikkat edin. Fiziksel aktivite şart."
    },
    colors: ["Kırmızı", "Turuncu"],
    numbers: [1, 9],
    stones: ["Elmas", "Kırmızı Jasper"],
    metal: "Demir",
    day: "Salı",
    description: "Koç burcu, Zodyak'ın ilk burcu olup yeni başlangıçları ve liderliği temsil eder. Mars'ın yönetiminde olan bu ateş burcu, cesaret, tutku ve sonsuz enerji ile bilinir. Koç'lar doğal liderlerdir ve zorlukların üstesinden gelmekten çekinmezler."
  },
  {
    id: "taurus",
    name: "Boğa",
    symbol: "♉",
    dates: "20 Nisan - 20 Mayıs",
    element: "earth",
    modality: "fixed",
    ruling: "Venüs",
    house: 2,
    traits: {
      positive: ["Güvenilir", "Sabırlı", "Pratik", "Sadık", "Sorumlu", "Kararlı"],
      negative: ["İnatçı", "Possesif", "Materyalist", "Tutucu", "Tembel"]
    },
    compatibility: {
      best: ["Başak", "Oğlak"],
      good: ["Yengeç", "Balık"],
      challenging: ["Aslan", "Kova"]
    },
    career: ["Bankacı", "Şef", "Sanatçı", "Mimar", "Gayrimenkul", "Tarım"],
    health: {
      bodyParts: ["Boyun", "Boğaz", "Tiroid"],
      tips: "Boğaz enfeksiyonlarına dikkat. Düzenli beslenme önemli."
    },
    colors: ["Yeşil", "Pembe"],
    numbers: [2, 6],
    stones: ["Zümrüt", "Safir"],
    metal: "Bakır",
    day: "Cuma",
    description: "Boğa burcu, istikrar ve maddi güvenlik arayışını temsil eder. Venüs'ün yönetimindeki bu toprak burcu, güzellik, konfor ve lüks ile ilişkilidir. Boğa'lar güvenilir ve pratik yaklaşımlarıyla tanınır."
  },
  {
    id: "gemini",
    name: "İkizler",
    symbol: "♊",
    dates: "21 Mayıs - 20 Haziran",
    element: "air",
    modality: "mutable",
    ruling: "Merkür",
    house: 3,
    traits: {
      positive: ["Zeki", "Uyumlu", "İletişimci", "Meraklı", "Esprili", "Çok yönlü"],
      negative: ["Kararsız", "Yüzeysel", "Tutarsız", "Sinirli", "Dedikodu"]
    },
    compatibility: {
      best: ["Terazi", "Kova"],
      good: ["Koç", "Aslan"],
      challenging: ["Başak", "Balık"]
    },
    career: ["Yazar", "Gazeteci", "Öğretmen", "Satış", "Pazarlama", "İletişim"],
    health: {
      bodyParts: ["Omuzlar", "Kollar", "Eller", "Akciğerler"],
      tips: "Solunum sistemi hassas. Çok fazla stres yönetin."
    },
    colors: ["Sarı", "Açık Mavi"],
    numbers: [3, 5],
    stones: ["Akik", "Sitrin"],
    metal: "Cıva",
    day: "Çarşamba",
    description: "İkizler burcu, iletişim ve zihinsel aktiviteyi temsil eder. Merkür'ün yönetimindeki bu hava burcu, merak, uyum yeteneği ve çok yönlülük ile karakterize edilir. İkizler'in ikili doğası onları hem büyüleyici hem de karmaşık kılar."
  },
  {
    id: "cancer",
    name: "Yengeç",
    symbol: "♋",
    dates: "21 Haziran - 22 Temmuz",
    element: "water",
    modality: "cardinal",
    ruling: "Ay",
    house: 4,
    traits: {
      positive: ["Duygusal", "Koruyucu", "Sezgisel", "Sadık", "Şefkatli", "Evcimen"],
      negative: ["Hassas", "Kinci", "Karamsar", "Manipülatif", "Huysuz"]
    },
    compatibility: {
      best: ["Akrep", "Balık"],
      good: ["Boğa", "Başak"],
      challenging: ["Koç", "Terazi"]
    },
    career: ["Hemşire", "Şef", "Psikolog", "Emlakçı", "Tarihçi", "Sosyal Hizmet"],
    health: {
      bodyParts: ["Göğüs", "Mide", "Sindirim Sistemi"],
      tips: "Duygusal yeme alışkanlığına dikkat. Stres mideyi etkiler."
    },
    colors: ["Beyaz", "Gümüş"],
    numbers: [2, 7],
    stones: ["İnci", "Ay Taşı"],
    metal: "Gümüş",
    day: "Pazartesi",
    description: "Yengeç burcu, ev, aile ve duygusal güvenliği temsil eder. Ay'ın yönetimindeki bu su burcu, derin sezgi, koruyuculuk ve şefkat ile bilinir. Yengeç'ler aileleri ve sevdikleri için her şeyi yaparlar."
  },
  {
    id: "leo",
    name: "Aslan",
    symbol: "♌",
    dates: "23 Temmuz - 22 Ağustos",
    element: "fire",
    modality: "fixed",
    ruling: "Güneş",
    house: 5,
    traits: {
      positive: ["Cömert", "Yaratıcı", "Tutkulu", "Karizmatik", "Sadık", "Eğlenceli"],
      negative: ["Kibirli", "İnatçı", "Bencil", "Gösterişçi", "Egoist"]
    },
    compatibility: {
      best: ["Koç", "Yay"],
      good: ["İkizler", "Terazi"],
      challenging: ["Boğa", "Akrep"]
    },
    career: ["Aktör", "Politikacı", "CEO", "Tasarımcı", "Organizatör", "Eğlence Sektörü"],
    health: {
      bodyParts: ["Kalp", "Sırt", "Omurga"],
      tips: "Kalp sağlığına önem verin. Düzenli egzersiz şart."
    },
    colors: ["Altın", "Turuncu", "Kırmızı"],
    numbers: [1, 4],
    stones: ["Yakut", "Amber"],
    metal: "Altın",
    day: "Pazar",
    description: "Aslan burcu, yaratıcılık, kendini ifade etme ve liderliği temsil eder. Güneş'in yönetimindeki bu ateş burcu, karizma, cömertlik ve tutkuyla parlar. Aslan'lar doğal performansçılardır ve her ortamda dikkat çekerler."
  },
  {
    id: "virgo",
    name: "Başak",
    symbol: "♍",
    dates: "23 Ağustos - 22 Eylül",
    element: "earth",
    modality: "mutable",
    ruling: "Merkür",
    house: 6,
    traits: {
      positive: ["Analitik", "Çalışkan", "Pratik", "Mükemmeliyetçi", "Yardımsever", "Dikkatli"],
      negative: ["Eleştirel", "Endişeli", "Takıntılı", "Aşırı Düşünceli", "Utangaç"]
    },
    compatibility: {
      best: ["Boğa", "Oğlak"],
      good: ["Yengeç", "Akrep"],
      challenging: ["İkizler", "Yay"]
    },
    career: ["Doktor", "Editör", "Araştırmacı", "Muhasebeci", "Beslenme Uzmanı", "Kalite Kontrol"],
    health: {
      bodyParts: ["Bağırsaklar", "Sindirim", "Sinir Sistemi"],
      tips: "Stresi yönetin. Düzenli beslenme ve uyku önemli."
    },
    colors: ["Lacivert", "Gri", "Kahverengi"],
    numbers: [5, 6],
    stones: ["Safir", "Yeşil Jasper"],
    metal: "Cıva",
    day: "Çarşamba",
    description: "Başak burcu, hizmet, sağlık ve mükemmeliyeti temsil eder. Merkür'ün yönetimindeki bu toprak burcu, analitik düşünce, pratiklik ve detaylara dikkat ile karakterize edilir. Başak'lar doğal problem çözücülerdir."
  },
  {
    id: "libra",
    name: "Terazi",
    symbol: "♎",
    dates: "23 Eylül - 22 Ekim",
    element: "air",
    modality: "cardinal",
    ruling: "Venüs",
    house: 7,
    traits: {
      positive: ["Diplomatik", "Zarif", "Adil", "Romantik", "Sosyal", "Estetik"],
      negative: ["Kararsız", "Yüzeysel", "Bağımlı", "Çatışmadan Kaçan", "Tembel"]
    },
    compatibility: {
      best: ["İkizler", "Kova"],
      good: ["Aslan", "Yay"],
      challenging: ["Yengeç", "Oğlak"]
    },
    career: ["Avukat", "Diplomat", "Tasarımcı", "Hakim", "Danışman", "Sanat"],
    health: {
      bodyParts: ["Böbrekler", "Bel", "Cilt"],
      tips: "Su tüketimini artırın. Böbrek sağlığına dikkat edin."
    },
    colors: ["Pembe", "Açık Mavi", "Lavanta"],
    numbers: [4, 6],
    stones: ["Opal", "Lapis Lazuli"],
    metal: "Bakır",
    day: "Cuma",
    description: "Terazi burcu, denge, uyum ve ortaklıkları temsil eder. Venüs'ün yönetimindeki bu hava burcu, estetik anlayış, diplomasi ve adalet duygusuyla bilinir. Terazi'ler barış yapıcılar ve mükemmel arabuluculardır."
  },
  {
    id: "scorpio",
    name: "Akrep",
    symbol: "♏",
    dates: "23 Ekim - 21 Kasım",
    element: "water",
    modality: "fixed",
    ruling: "Plüton",
    house: 8,
    traits: {
      positive: ["Tutkulu", "Kararlı", "Sadık", "Güçlü", "Sezgisel", "Araştırmacı"],
      negative: ["Kıskanç", "Gizlemci", "İntikamcı", "Obsesif", "Manipülatif"]
    },
    compatibility: {
      best: ["Yengeç", "Balık"],
      good: ["Başak", "Oğlak"],
      challenging: ["Aslan", "Kova"]
    },
    career: ["Dedektif", "Cerrah", "Psikolog", "Araştırmacı", "Finansçı", "Kriz Yönetimi"],
    health: {
      bodyParts: ["Üreme Organları", "Mesane", "Prostat"],
      tips: "Duygusal sağlığa önem verin. Detoks faydalı olabilir."
    },
    colors: ["Bordo", "Siyah", "Koyu Kırmızı"],
    numbers: [8, 9],
    stones: ["Topaz", "Obsidyen"],
    metal: "Demir, Platin",
    day: "Salı",
    description: "Akrep burcu, dönüşüm, tutku ve yoğunluğu temsil eder. Plüton'un yönetimindeki bu su burcu, derin duygular, kararlılık ve gizem ile karakterize edilir. Akrep'ler yaşamın derinliklerine inen güçlü bireylerdir."
  },
  {
    id: "sagittarius",
    name: "Yay",
    symbol: "♐",
    dates: "22 Kasım - 21 Aralık",
    element: "fire",
    modality: "mutable",
    ruling: "Jüpiter",
    house: 9,
    traits: {
      positive: ["İyimser", "Maceraperest", "Özgür", "Felsefeci", "Dürüst", "Cömert"],
      negative: ["Patavatsız", "Taahhüt Fobik", "Sabırsız", "Dağınık", "Abartıcı"]
    },
    compatibility: {
      best: ["Koç", "Aslan"],
      good: ["Terazi", "Kova"],
      challenging: ["Başak", "Balık"]
    },
    career: ["Akademisyen", "Gezgin", "Yayıncı", "Atlet", "Rehber", "Felsefeci"],
    health: {
      bodyParts: ["Kalça", "Uyluk", "Karaciğer"],
      tips: "Aşırı kiloya dikkat. Açık havada aktivite faydalı."
    },
    colors: ["Mor", "Turkuaz"],
    numbers: [3, 9],
    stones: ["Turkuaz", "Ametist"],
    metal: "Kalay",
    day: "Perşembe",
    description: "Yay burcu, keşif, bilgi arayışı ve özgürlüğü temsil eder. Jüpiter'in yönetimindeki bu ateş burcu, iyimserlik, macera ruhu ve felsefi düşünce ile tanınır. Yay'lar hayatın anlamını arayan gezginlerdir."
  },
  {
    id: "capricorn",
    name: "Oğlak",
    symbol: "♑",
    dates: "22 Aralık - 19 Ocak",
    element: "earth",
    modality: "cardinal",
    ruling: "Satürn",
    house: 10,
    traits: {
      positive: ["Disiplinli", "Sorumlu", "Hırslı", "Pratik", "Sabırlı", "Güvenilir"],
      negative: ["Soğuk", "Kötümser", "İnatçı", "Materyalist", "Katı"]
    },
    compatibility: {
      best: ["Boğa", "Başak"],
      good: ["Akrep", "Balık"],
      challenging: ["Koç", "Terazi"]
    },
    career: ["CEO", "Yönetici", "Politikacı", "Mühendis", "Bankacı", "Mimar"],
    health: {
      bodyParts: ["Kemikler", "Dizler", "Diş"],
      tips: "Kalsiyum alımına dikkat. Eklem sağlığını koruyun."
    },
    colors: ["Kahverengi", "Siyah", "Gri"],
    numbers: [4, 8],
    stones: ["Oniks", "Garnet"],
    metal: "Kurşun",
    day: "Cumartesi",
    description: "Oğlak burcu, kariyer, sorumluluk ve başarıyı temsil eder. Satürn'ün yönetimindeki bu toprak burcu, disiplin, azim ve pratik zeka ile karakterize edilir. Oğlak'lar hayattaki hedeflerine ulaşmak için yılmadan çalışırlar."
  },
  {
    id: "aquarius",
    name: "Kova",
    symbol: "♒",
    dates: "20 Ocak - 18 Şubat",
    element: "air",
    modality: "fixed",
    ruling: "Uranüs",
    house: 11,
    traits: {
      positive: ["Yenilikçi", "Bağımsız", "Hümanist", "Orijinal", "Entelektüel", "Vizyoner"],
      negative: ["Mesafeli", "İsyankar", "İnatçı", "Öngörülemez", "Soğuk"]
    },
    compatibility: {
      best: ["İkizler", "Terazi"],
      good: ["Koç", "Yay"],
      challenging: ["Boğa", "Akrep"]
    },
    career: ["Bilim İnsanı", "Teknoloji", "Aktivist", "Mühendis", "Sosyal Girişimci", "Astrolog"],
    health: {
      bodyParts: ["Bilekler", "Dolaşım Sistemi", "Sinir Sistemi"],
      tips: "Dolaşım sorunlarına dikkat. Düzenli egzersiz önemli."
    },
    colors: ["Elektrik Mavisi", "Gümüş", "Turkuaz"],
    numbers: [4, 7],
    stones: ["Ametist", "Akuamarin"],
    metal: "Alüminyum, Uranüs",
    day: "Cumartesi",
    description: "Kova burcu, yenilik, insanlık ve özgür düşünceyi temsil eder. Uranüs'ün yönetimindeki bu hava burcu, orijinallik, bağımsızlık ve vizyonerlik ile tanınır. Kova'lar geleceği şekillendiren öncülerdir."
  },
  {
    id: "pisces",
    name: "Balık",
    symbol: "♓",
    dates: "19 Şubat - 20 Mart",
    element: "water",
    modality: "mutable",
    ruling: "Neptün",
    house: 12,
    traits: {
      positive: ["Şefkatli", "Sezgisel", "Sanatçı", "Romantik", "Empati", "Ruhani"],
      negative: ["Hayalperest", "Kaçık", "Kurban Rolü", "Bağımlı", "Kararsız"]
    },
    compatibility: {
      best: ["Yengeç", "Akrep"],
      good: ["Boğa", "Oğlak"],
      challenging: ["İkizler", "Yay"]
    },
    career: ["Sanatçı", "Müzisyen", "Psikolog", "Hemşire", "Şifacı", "Film Yapımcısı"],
    health: {
      bodyParts: ["Ayaklar", "Lenf Sistemi", "Bağışıklık"],
      tips: "Ayak bakımına özen gösterin. Yeterli uyku şart."
    },
    colors: ["Deniz Yeşili", "Lavanta", "Mor"],
    numbers: [3, 12],
    stones: ["Akuamarin", "Ay Taşı"],
    metal: "Kalay",
    day: "Perşembe",
    description: "Balık burcu, hayal gücü, spiritüellik ve sınırsız sevgiyi temsil eder. Neptün'ün yönetimindeki bu su burcu, empati, sanatsal yetenek ve ruhani derinlik ile karakterize edilir. Balık'lar görünmeyeni gören hayalperestlerdir."
  }
]

export function BurcOzellikleri() {
  const [selectedSign, setSelectedSign] = useState<string>("aries")

  const selectedZodiac = zodiacDetails.find(z => z.id === selectedSign)

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

  const getModalityName = (modality: string) => {
    const names: Record<string, string> = { cardinal: "Öncü", fixed: "Sabit", mutable: "Değişken" }
    return names[modality] || modality
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Burç Seçici */}
      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2">
        {zodiacDetails.map(sign => (
          <button
            key={sign.id}
            onClick={() => setSelectedSign(sign.id)}
            className={`p-3 rounded-xl transition-all text-center ${
              selectedSign === sign.id 
                ? "bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-lg scale-105" 
                : "bg-slate-100 hover:bg-slate-200"
            }`}
          >
            <div className="text-2xl mb-1">{sign.symbol}</div>
            <div className="text-xs font-medium truncate">{sign.name}</div>
          </button>
        ))}
      </div>

      {selectedZodiac && (
        <>
          {/* Ana Bilgi Kartı */}
          <Card className="border-2 border-indigo-200">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-6xl">{selectedZodiac.symbol}</span>
                  <div>
                    <div className="text-4xl font-bold">{selectedZodiac.name}</div>
                    <div className="text-muted-foreground">{selectedZodiac.dates}</div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <div className="flex items-center gap-2">
                    {getElementIcon(selectedZodiac.element)}
                    <Badge variant="outline">{getElementName(selectedZodiac.element)}</Badge>
                  </div>
                  <Badge variant="secondary">{getModalityName(selectedZodiac.modality)}</Badge>
                  <Badge className="bg-indigo-500">Ev: {selectedZodiac.house}</Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-lg text-slate-700 leading-relaxed">{selectedZodiac.description}</p>
            </CardContent>
          </Card>

          {/* Detay Sekmeleri */}
          <Card>
            <CardContent className="pt-6">
              <Tabs defaultValue="traits" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-6">
                  <TabsTrigger value="traits">Özellikler</TabsTrigger>
                  <TabsTrigger value="compatibility">Uyum</TabsTrigger>
                  <TabsTrigger value="career">Kariyer</TabsTrigger>
                  <TabsTrigger value="health">Sağlık</TabsTrigger>
                  <TabsTrigger value="lucky">Şans</TabsTrigger>
                </TabsList>

                <TabsContent value="traits" className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 bg-green-50 rounded-xl border border-green-200">
                      <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-green-700">
                        <Sparkles className="h-5 w-5" />
                        Pozitif Özellikler
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedZodiac.traits.positive.map(trait => (
                          <Badge key={trait} className="bg-green-500">{trait}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="p-6 bg-red-50 rounded-xl border border-red-200">
                      <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-red-700">
                        <Shield className="h-5 w-5" />
                        Zorlu Özellikler
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedZodiac.traits.negative.map(trait => (
                          <Badge key={trait} variant="destructive">{trait}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="compatibility" className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-6 bg-green-50 rounded-xl border border-green-200">
                      <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-green-700">
                        <Heart className="h-5 w-5" />
                        En Uyumlu
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedZodiac.compatibility.best.map(sign => (
                          <Badge key={sign} className="bg-green-500">{sign}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
                      <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-blue-700">
                        <Users className="h-5 w-5" />
                        İyi Uyumlu
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedZodiac.compatibility.good.map(sign => (
                          <Badge key={sign} className="bg-blue-500">{sign}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="p-6 bg-orange-50 rounded-xl border border-orange-200">
                      <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-orange-700">
                        <Zap className="h-5 w-5" />
                        Zorlu Uyum
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedZodiac.compatibility.challenging.map(sign => (
                          <Badge key={sign} className="bg-orange-500">{sign}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="career" className="space-y-6">
                  <div className="p-6 bg-indigo-50 rounded-xl border border-indigo-200">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-indigo-700">
                      <Briefcase className="h-5 w-5" />
                      Uygun Kariyer Alanları
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedZodiac.career.map(career => (
                        <Badge key={career} variant="outline" className="text-indigo-700 border-indigo-300">
                          {career}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="health" className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 bg-rose-50 rounded-xl border border-rose-200">
                      <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-rose-700">
                        <Brain className="h-5 w-5" />
                        Hassas Bölgeler
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedZodiac.health.bodyParts.map(part => (
                          <Badge key={part} className="bg-rose-500">{part}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200">
                      <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-emerald-700">
                        <Star className="h-5 w-5" />
                        Sağlık Önerileri
                      </h3>
                      <p className="text-emerald-800">{selectedZodiac.health.tips}</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="lucky" className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-purple-50 rounded-xl border border-purple-200 text-center">
                      <div className="text-sm text-purple-600 font-medium mb-2">Yönetici Gezegen</div>
                      <div className="text-xl font-bold text-purple-700">{selectedZodiac.ruling}</div>
                    </div>
                    <div className="p-4 bg-pink-50 rounded-xl border border-pink-200 text-center">
                      <div className="text-sm text-pink-600 font-medium mb-2">Şanslı Gün</div>
                      <div className="text-xl font-bold text-pink-700">{selectedZodiac.day}</div>
                    </div>
                    <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-center">
                      <div className="text-sm text-amber-600 font-medium mb-2">Şanslı Sayılar</div>
                      <div className="text-xl font-bold text-amber-700">{selectedZodiac.numbers.join(", ")}</div>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-200 text-center">
                      <div className="text-sm text-blue-600 font-medium mb-2">Şanslı Renkler</div>
                      <div className="text-lg font-bold text-blue-700">{selectedZodiac.colors.join(", ")}</div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-xl border border-green-200 text-center">
                      <div className="text-sm text-green-600 font-medium mb-2 flex items-center justify-center gap-1">
                        <Gem className="h-4 w-4" /> Şanslı Taşlar
                      </div>
                      <div className="text-lg font-bold text-green-700">{selectedZodiac.stones.join(", ")}</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-center">
                      <div className="text-sm text-gray-600 font-medium mb-2">Metal</div>
                      <div className="text-xl font-bold text-gray-700">{selectedZodiac.metal}</div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
