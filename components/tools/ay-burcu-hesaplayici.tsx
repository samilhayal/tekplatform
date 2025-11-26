"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Moon, Calendar, Clock, MapPin, Sparkles, Heart, Briefcase, Brain, Home, Info, Lightbulb, BookOpen, HelpCircle, Star, Sun, Flame, Droplet, Wind, Mountain } from "lucide-react"
import Link from "next/link"

// Türkiye şehirleri listesi (81 il - koordinatlarla birlikte)
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

const moonSignData = {
  'Koç': {
    element: 'Ateş',
    emoji: '🔥',
    traits: ['Dürtüsel', 'Tutkulu', 'Cesur', 'Sabırsız'],
    emotionalStyle: 'Duygularını anlık ve yoğun yaşar. Öfke hızlı gelir, hızlı gider.',
    needs: 'Bağımsızlık, aksiyon ve heyecan ihtiyacı yüksektir.',
    loveStyle: 'Aşkta cesur ve girişkendir. Peşinden koşmayı sever.',
    stressResponse: 'Stres altında agresif veya dürtüsel davranabilir.',
    childhood: 'Enerjik ve rekabetçi bir çocukluk geçirmiş olabilir.',
    comfort: 'Fiziksel aktivite ve yeni deneyimler rahatlatır.'
  },
  'Boğa': {
    element: 'Toprak',
    emoji: '🌍',
    traits: ['Kararlı', 'Sadık', 'Pratik', 'İnatçı'],
    emotionalStyle: 'Duygusal olarak istikrarlı ve sabırlıdır. Değişime direnç gösterebilir.',
    needs: 'Güvenlik, konfor ve maddi istikrar ihtiyacı vardır.',
    loveStyle: 'Aşkta sadık ve şefkatlidir. Fiziksel yakınlık önemlidir.',
    stressResponse: 'Stres altında daha da inatçı ve kapalı olabilir.',
    childhood: 'Rahat ve güvenli bir çocukluk arayışı içindeydi.',
    comfort: 'Güzel yemekler, dokunsal zevkler ve doğa rahatlatır.'
  },
  'İkizler': {
    element: 'Hava',
    emoji: '💨',
    traits: ['Meraklı', 'Uyumlu', 'Sosyal', 'Huzursuz'],
    emotionalStyle: 'Duygularını zihinselleştirir. Değişken ruh halleri olabilir.',
    needs: 'Mental uyarım, iletişim ve çeşitlilik ihtiyacı vardır.',
    loveStyle: 'Aşkta iletişim ve entelektüel bağ arar.',
    stressResponse: 'Stres altında dağınık ve gergin olabilir.',
    childhood: 'Meraklı ve konuşkan bir çocuktu.',
    comfort: 'Sohbet, okuma ve öğrenme rahatlatır.'
  },
  'Yengeç': {
    element: 'Su',
    emoji: '💧',
    traits: ['Şefkatli', 'Koruyucu', 'Sezgisel', 'Kaprisli'],
    emotionalStyle: 'Son derece duygusal ve sezgiseldir. Ay döngülerinden etkilenir.',
    needs: 'Aile, yuva ve duygusal güvenlik ihtiyacı çok yüksektir.',
    loveStyle: 'Aşkta besleyici ve koruyucudur. Derin bağlar kurar.',
    stressResponse: 'Stres altında içine kapanır veya aşırı duygusal olabilir.',
    childhood: 'Aile ortamı ve anne figürü çok önemlidir.',
    comfort: 'Ev ortamı, yemek pişirme ve sevdiklerle vakit geçirme rahatlatır.'
  },
  'Aslan': {
    element: 'Ateş',
    emoji: '🔥',
    traits: ['Cömert', 'Yaratıcı', 'Dramatik', 'Gururlu'],
    emotionalStyle: 'Duygularını canlı ve dramatik ifade eder. Takdir edilmeyi sever.',
    needs: 'Saygı, hayranlık ve yaratıcı ifade ihtiyacı vardır.',
    loveStyle: 'Aşkta romantik ve cömerttir. Merkez olmayı sever.',
    stressResponse: 'Stres altında dramatik veya ego merkezli olabilir.',
    childhood: 'Dikkat ve övgü bekleyen bir çocuktu.',
    comfort: 'Yaratıcı aktiviteler ve sosyal etkileşim rahatlatır.'
  },
  'Başak': {
    element: 'Toprak',
    emoji: '🌍',
    traits: ['Analitik', 'Yardımsever', 'Mütevazı', 'Kaygılı'],
    emotionalStyle: 'Duygularını analiz eder ve kontrol etmeye çalışır.',
    needs: 'Düzen, kullanışlılık ve mükemmellik arayışı vardır.',
    loveStyle: 'Aşkta pratik ve fedakar davranır. Hizmet eder.',
    stressResponse: 'Stres altında aşırı eleştirel veya kaygılı olabilir.',
    childhood: 'Yardımsever ve sorumlu bir çocuktu.',
    comfort: 'Temizlik, organizasyon ve faydalı işler yapmak rahatlatır.'
  },
  'Terazi': {
    element: 'Hava',
    emoji: '💨',
    traits: ['Diplomatik', 'Uyumlu', 'Estetik', 'Kararsız'],
    emotionalStyle: 'Duygusal dengeyi arar. Çatışmadan kaçınır.',
    needs: 'Uyum, güzellik ve ortaklık ihtiyacı yüksektir.',
    loveStyle: 'Aşkta adil ve romantiktir. İlişki odaklıdır.',
    stressResponse: 'Stres altında kararsız ve pasif-agresif olabilir.',
    childhood: 'Hoş görünmek ve beğenilmek isteyen bir çocuktu.',
    comfort: 'Sanat, müzik ve uyumlu ilişkiler rahatlatır.'
  },
  'Akrep': {
    element: 'Su',
    emoji: '💧',
    traits: ['Yoğun', 'Tutkulu', 'Sezgisel', 'Gizli'],
    emotionalStyle: 'Derin ve yoğun duygular yaşar. Duygularını saklama eğilimi vardır.',
    needs: 'Derin bağlar, güven ve kontrol ihtiyacı vardır.',
    loveStyle: 'Aşkta tutkulu ve bağlıdır. "Ya hep ya hiç" yaklaşımı.',
    stressResponse: 'Stres altında manipülatif veya intikamcı olabilir.',
    childhood: 'Duygusal yoğunlukla dolu bir çocukluk geçirmiş olabilir.',
    comfort: 'Dönüşüm, gizem ve derin sohbetler rahatlatır.'
  },
  'Yay': {
    element: 'Ateş',
    emoji: '🔥',
    traits: ['İyimser', 'Maceraperest', 'Filozofik', 'Dikkatsiz'],
    emotionalStyle: 'Duygusal olarak iyimser ve umutludur. Özgürlüğe değer verir.',
    needs: 'Özgürlük, keşif ve anlam arayışı vardır.',
    loveStyle: 'Aşkta eğlenceli ve maceracıdır. Kısıtlamayı sevmez.',
    stressResponse: 'Stres altında kaçınmacı veya aşırı iyimser olabilir.',
    childhood: 'Meraklı ve maceraperest bir çocuktu.',
    comfort: 'Seyahat, öğrenme ve felsefi sohbetler rahatlatır.'
  },
  'Oğlak': {
    element: 'Toprak',
    emoji: '🌍',
    traits: ['Disiplinli', 'Sorumluluk sahibi', 'Gerçekçi', 'Mesafeli'],
    emotionalStyle: 'Duygularını kontrol altında tutar. Dışarıdan soğuk görünebilir.',
    needs: 'Başarı, statü ve duygusal güvenlik ihtiyacı vardır.',
    loveStyle: 'Aşkta kararlı ve sadıktır. Uzun vadeli düşünür.',
    stressResponse: 'Stres altında daha da çalışkan veya mesafeli olabilir.',
    childhood: 'Erken olgunlaşmış veya sorumluluk almış bir çocuk olabilir.',
    comfort: 'Hedeflere ulaşmak ve düzen rahatlatır.'
  },
  'Kova': {
    element: 'Hava',
    emoji: '💨',
    traits: ['Orijinal', 'Bağımsız', 'İnsancıl', 'Uzak'],
    emotionalStyle: 'Duygularını zihinselleştirir. Duygusal mesafe koyabilir.',
    needs: 'Özgürlük, orijinallik ve sosyal bağlantı ihtiyacı vardır.',
    loveStyle: 'Aşkta arkadaş canlısı ve bağımsızdır.',
    stressResponse: 'Stres altında duygusal olarak kopuk veya isyankar olabilir.',
    childhood: 'Farklı ve bağımsız bir çocuktu.',
    comfort: 'Sosyal aktiviteler ve entelektüel uğraşlar rahatlatır.'
  },
  'Balık': {
    element: 'Su',
    emoji: '💧',
    traits: ['Empatik', 'Yaratıcı', 'Sezgisel', 'Kaçışçı'],
    emotionalStyle: 'Son derece empatik ve hassastır. Sınırlar konusunda zorlanabilir.',
    needs: 'Maneviyat, yaratıcılık ve duygusal bağlantı ihtiyacı vardır.',
    loveStyle: 'Aşkta romantik ve fedakardır. Ruh eşini arar.',
    stressResponse: 'Stres altında kaçışçı veya kurban rolüne girebilir.',
    childhood: 'Hayal gücü güçlü ve hassas bir çocuktu.',
    comfort: 'Sanat, müzik, meditasyon ve su kenarları rahatlatır.'
  }
}

interface MoonSignResult {
  moonSign: string
  moonSignData: typeof moonSignData['Koç']
  moonPhase: string
  moonDegree: number
}

export function AyBurcuHesaplayici() {
  const [birthDay, setBirthDay] = useState('')
  const [birthMonth, setBirthMonth] = useState('')
  const [birthYear, setBirthYear] = useState('')
  const [birthHour, setBirthHour] = useState('')
  const [birthMinute, setBirthMinute] = useState('')
  const [city, setCity] = useState('')
  const [citySearch, setCitySearch] = useState('')
  const [result, setResult] = useState<MoonSignResult | null>(null)

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

  const zodiacSigns = ['Koç', 'Boğa', 'İkizler', 'Yengeç', 'Aslan', 'Başak', 'Terazi', 'Akrep', 'Yay', 'Oğlak', 'Kova', 'Balık']

  // Şehir arama filtresi
  const filteredCities = turkishCities.filter(c =>
    c.name.toLowerCase().includes(citySearch.toLowerCase())
  )

  const calculateMoonSign = () => {
    if (!birthDay || !birthMonth || !birthYear || !birthHour || !birthMinute || !city) return

    const birthDate = `${birthYear}-${birthMonth}-${birthDay}`
    const birthTime = `${birthHour}:${birthMinute}`
    const date = new Date(birthDate + 'T' + birthTime)
    const selectedCity = turkishCities.find(c => c.name === city)
    if (!selectedCity) return

    const jd = getJulianDate(date)
    const moonLongitude = calculateMoonLongitude(jd, selectedCity.lon)
    const signIndex = Math.floor(moonLongitude / 30) % 12
    const moonSign = zodiacSigns[signIndex]
    const moonDegree = Math.floor(moonLongitude % 30)
    const moonPhase = calculateMoonPhase(jd)

    setResult({
      moonSign,
      moonSignData: moonSignData[moonSign as keyof typeof moonSignData],
      moonPhase,
      moonDegree
    })
  }

  const getJulianDate = (date: Date): number => {
    const y = date.getFullYear()
    const m = date.getMonth() + 1
    const d = date.getDate() + (date.getHours() + date.getMinutes() / 60) / 24

    let jy = y
    let jm = m
    if (m <= 2) {
      jy = y - 1
      jm = m + 12
    }

    const a = Math.floor(jy / 100)
    const b = 2 - a + Math.floor(a / 4)

    return Math.floor(365.25 * (jy + 4716)) + Math.floor(30.6001 * (jm + 1)) + d + b - 1524.5
  }

  const calculateMoonLongitude = (jd: number, lng: number): number => {
    const T = (jd - 2451545.0) / 36525
    const L0 = 218.3164477 + 481267.88123421 * T - 0.0015786 * T * T
    const M = 134.9633964 + 477198.8675055 * T + 0.0087414 * T * T
    const Ms = 357.5291092 + 35999.0502909 * T - 0.0001536 * T * T
    const F = 93.2720950 + 483202.0175233 * T - 0.0036539 * T * T
    const D = 297.8501921 + 445267.1114034 * T - 0.0018819 * T * T

    const correction = 6.289 * Math.sin(M * Math.PI / 180)
                     - 1.274 * Math.sin((2 * D - M) * Math.PI / 180)
                     + 0.658 * Math.sin(2 * D * Math.PI / 180)
                     - 0.214 * Math.sin(2 * M * Math.PI / 180)
                     - 0.186 * Math.sin(Ms * Math.PI / 180)

    let moonLong = L0 + correction + (lng / 15)
    moonLong = ((moonLong % 360) + 360) % 360

    return moonLong
  }

  const calculateMoonPhase = (jd: number): string => {
    const synodicMonth = 29.530588853
    const refNewMoon = 2451550.1
    const daysSinceNewMoon = (jd - refNewMoon) % synodicMonth
    const phase = daysSinceNewMoon / synodicMonth

    if (phase < 0.0625) return 'Yeni Ay 🌑'
    if (phase < 0.1875) return 'Hilal (Büyüyen) 🌒'
    if (phase < 0.3125) return 'İlk Dördün 🌓'
    if (phase < 0.4375) return 'Şişkin Ay (Büyüyen) 🌔'
    if (phase < 0.5625) return 'Dolunay 🌕'
    if (phase < 0.6875) return 'Şişkin Ay (Küçülen) 🌖'
    if (phase < 0.8125) return 'Son Dördün 🌗'
    if (phase < 0.9375) return 'Hilal (Küçülen) 🌘'
    return 'Yeni Ay 🌑'
  }

  const getElementColor = (element: string): string => {
    switch (element) {
      case 'Ateş': return 'from-red-500 to-orange-500'
      case 'Toprak': return 'from-green-600 to-amber-600'
      case 'Hava': return 'from-cyan-500 to-blue-500'
      case 'Su': return 'from-blue-600 to-purple-600'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
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
      <Card className="border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Moon className="h-20 w-20 text-indigo-500 animate-pulse" />
              <Sparkles className="h-8 w-8 text-purple-500 absolute -top-2 -right-2 animate-bounce" />
            </div>
          </div>
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            Ay Burcu Hesaplayıcı
          </CardTitle>
          <CardDescription className="text-lg mt-2">
            Duygusal iç dünyanızı ve temel ihtiyaçlarınızı keşfedin
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="border-2 border-indigo-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Moon className="h-6 w-6 text-indigo-500" />
            Doğum Bilgilerinizi Girin
          </CardTitle>
          <CardDescription>
            Ay burcunuz duygusal iç dünyanızı ve ihtiyaçlarınızı gösterir
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Doğum Tarihi */}
            <div>
              <Label className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4" />
                Doğum Tarihi (Gün/Ay/Yıl)
              </Label>
              <div className="grid grid-cols-3 gap-2">
                <Select value={birthDay} onValueChange={setBirthDay}>
                  <SelectTrigger className="bg-slate-50">
                    <SelectValue placeholder="Gün" />
                  </SelectTrigger>
                  <SelectContent>
                    {days.map((d) => (
                      <SelectItem key={d} value={d}>{d}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={birthMonth} onValueChange={setBirthMonth}>
                  <SelectTrigger className="bg-slate-50">
                    <SelectValue placeholder="Ay" />
                  </SelectTrigger>
                  <SelectContent>
                    {monthsList.map((m) => (
                      <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={birthYear} onValueChange={setBirthYear}>
                  <SelectTrigger className="bg-slate-50">
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
            <div>
              <Label className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4" />
                Doğum Saati (24 saat)
              </Label>
              <div className="grid grid-cols-2 gap-2">
                <Select value={birthHour} onValueChange={setBirthHour}>
                  <SelectTrigger className="bg-slate-50">
                    <SelectValue placeholder="Saat" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[200px]">
                    {hoursList.map((h) => (
                      <SelectItem key={h} value={h}>{h}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={birthMinute} onValueChange={setBirthMinute}>
                  <SelectTrigger className="bg-slate-50">
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
            <div className="md:col-span-2">
              <Label htmlFor="city" className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4" />
                Doğum Yeri
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <Input
                  placeholder="Şehir ara..."
                  value={citySearch}
                  onChange={(e) => setCitySearch(e.target.value)}
                  className="bg-slate-50 text-base"
                />
                <Select 
                  value={city} 
                  onValueChange={(v) => { 
                    setCity(v); 
                    setCitySearch(v);
                  }}
                >
                  <SelectTrigger className="bg-slate-50">
                    <SelectValue placeholder="Şehir seçin" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    {filteredCities.length > 0 ? (
                      filteredCities.map((c) => (
                        <SelectItem key={c.name} value={c.name}>
                          {c.name}
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
            onClick={calculateMoonSign}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
            size="lg"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Ay Burcumu Hesapla
          </Button>
        </CardContent>
      </Card>

      {result && (
        <div className="space-y-6">
          <Card className={`bg-gradient-to-br ${getElementColor(result.moonSignData.element)} text-white`}>
            <CardContent className="pt-8 pb-8 text-center">
              <div className="text-6xl mb-4">{result.moonSignData.emoji}</div>
              <h2 className="text-4xl font-bold mb-2">Ay Burcunuz: {result.moonSign}</h2>
              <p className="text-xl opacity-90 mb-4">
                {result.moonSign} burcunun {result.moonDegree}. derecesinde
              </p>
              <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
                <span className="text-lg">{result.moonPhase}</span>
              </div>
              <p className="mt-4 text-lg">
                Element: {result.moonSignData.element} {result.moonSignData.emoji}
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {result.moonSignData.traits.map((trait, index) => (
              <Card key={index} className="bg-white hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 text-center">
                  <p className="font-semibold text-slate-800">{trait}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Brain className="h-5 w-5 text-purple-500" />
                  Duygusal Stil
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">{result.moonSignData.emotionalStyle}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Sparkles className="h-5 w-5 text-amber-500" />
                  Temel İhtiyaçlar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">{result.moonSignData.needs}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Heart className="h-5 w-5 text-pink-500" />
                  Aşk ve İlişkiler
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">{result.moonSignData.loveStyle}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Briefcase className="h-5 w-5 text-blue-500" />
                  Stres Tepkisi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">{result.moonSignData.stressResponse}</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-br from-slate-50 to-slate-100">
            <CardHeader>
              <CardTitle>Derin Bilgiler</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">🌙 Çocukluk ve Kökenler</h4>
                <p className="text-slate-600">{result.moonSignData.childhood}</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">🧘 Rahatlama ve Konfor</h4>
                <p className="text-slate-600">{result.moonSignData.comfort}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Educational Sections */}
      <div className="grid gap-6 md:grid-cols-2 mt-8">
        <Card className="border-indigo-200 bg-gradient-to-br from-indigo-50 to-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-indigo-700">
              <HelpCircle className="h-5 w-5" />
              Nasıl Kullanılır?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-600">
            <p>• Doğum tarihinizi, saatinizi ve şehrinizi girin</p>
            <p>• Doğum saatinizi mümkün olduğunca doğru girin (nüfus cüzdanı veya anne/babadan öğrenin)</p>
            <p>• "Ay Burcumu Hesapla" butonuna tıklayın</p>
            <p>• Duygusal doğanız, iç dünyanız ve bilinçaltı eğilimlerinizi öğrenin</p>
            <p>• Ay fazı da sonuçlarda gösterilir (dolu ay, yeni ay vb.)</p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-700">
              <BookOpen className="h-5 w-5" />
              Örnek Kullanımlar
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-600">
            <p>• <strong>Kendini tanıma:</strong> Duygusal tepkilerinizi anlamak için</p>
            <p>• <strong>İlişki analizi:</strong> Partnerinizin ay burcuyla uyum kontrolü</p>
            <p>• <strong>Anne-çocuk ilişkisi:</strong> Anne ile bağı anlamak için</p>
            <p>• <strong>Stres yönetimi:</strong> Zorlu dönemlerde neye ihtiyaç duyduğunuzu bilmek</p>
            <p>• <strong>Ev ve aile:</strong> Evinizde nasıl bir atmosfer istediğinizi keşfetmek</p>
          </CardContent>
        </Card>

        <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-700">
              <Info className="h-5 w-5" />
              Önemli Bilgiler
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-600">
            <p>• Ay burcu, güneş burcunuzun aksine duygusal ve içsel doğanızı temsil eder</p>
            <p>• Ay yaklaşık 2,5 günde bir burç değiştirir, bu yüzden doğum saati çok önemlidir</p>
            <p>• Güneş = dış kişilik, Ay = iç dünya ve duygular</p>
            <p>• Ay burcunuz annenizle ve kadın enerjisiyle bağlantılıdır</p>
            <p>• İlişkilerde ve evlilikte ay burcu uyumu çok önemlidir</p>
            <p>• Ay fazı da doğumdaki enerjiyi etkiler (yeni ay = yeni başlangıçlar, dolu ay = farkındalık)</p>
          </CardContent>
        </Card>

        <Card className="border-teal-200 bg-gradient-to-br from-teal-50 to-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-teal-700">
              <Lightbulb className="h-5 w-5" />
              İlginç Bilgiler
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-600">
            <p>• Ay burcu, "gerçek sizi" gösteren burçtur - yakın çevrenizin gördüğü hali</p>
            <p>• Stresli zamanlarda güneş değil, ay burcunuzun özelliklerini sergilersiniz</p>
            <p>• Yemek tercihleri, uyku alışkanlıkları ve ev ortamı ay burcundan etkilenir</p>
            <p>• Çocukluk anıları ve anne ilişkisi ay burcuyla bağlantılıdır</p>
            <p>• Bazı astrologlar ay burcunun kadınlar için daha belirgin olduğunu söyler</p>
            <p>• Rüyalar ve bilinçaltı sembolleri ay burcunuzla ilişkilidir</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
