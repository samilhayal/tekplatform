"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Sparkles, Star, Home, Info, Lightbulb, BookOpen, HelpCircle, Moon, Sun, Flame, Droplet, Wind, Mountain, Heart } from "lucide-react"
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

const zodiacSigns = ['Koç', 'Boğa', 'İkizler', 'Yengeç', 'Aslan', 'Başak', 'Terazi', 'Akrep', 'Yay', 'Oğlak', 'Kova', 'Balık']

interface Planet {
  name: string
  sign: string
  house: number
  degree: number
}

interface NatalChartResult {
  sun: Planet
  moon: Planet
  mercury: Planet
  venus: Planet
  mars: Planet
  jupiter: Planet
  saturn: Planet
  ascendant: string
  houses: number[]
  aspects: Array<{ planet1: string; planet2: string; type: string; orb: number }>
}

export function YildizHaritasi() {
  const [birthDay, setBirthDay] = useState('')
  const [birthMonth, setBirthMonth] = useState('')
  const [birthYear, setBirthYear] = useState('')
  const [birthHour, setBirthHour] = useState('')
  const [birthMinute, setBirthMinute] = useState('')
  const [city, setCity] = useState('')
  const [citySearch, setCitySearch] = useState('')
  const [result, setResult] = useState<NatalChartResult | null>(null)

  // Yıllar (1920-2025)
  const years = Array.from({ length: 106 }, (_, i) => 2025 - i)
  // Aylar
  const months = [
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
  const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'))
  // Dakikalar (00-59)
  const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'))

  // Şehir arama filtresi
  const filteredCities = turkishCities.filter(c =>
    c.name.toLowerCase().includes(citySearch.toLowerCase())
  )

  const calculateNatalChart = () => {
    if (!birthDay || !birthMonth || !birthYear || !birthHour || !birthMinute || !city) return

    const birthDate = `${birthYear}-${birthMonth}-${birthDay}`
    const birthTime = `${birthHour}:${birthMinute}`
    const date = new Date(birthDate + 'T' + birthTime)
    const selectedCity = turkishCities.find(c => c.name === city)
    if (!selectedCity) return

    // Simplified planetary position calculations
    const jd = getJulianDate(date)
    const lst = getLocalSiderealTime(jd, selectedCity.lon)

    const planets: NatalChartResult = {
      sun: calculatePlanetPosition(date, 'Güneş'),
      moon: calculatePlanetPosition(date, 'Ay'),
      mercury: calculatePlanetPosition(date, 'Merkür'),
      venus: calculatePlanetPosition(date, 'Venüs'),
      mars: calculatePlanetPosition(date, 'Mars'),
      jupiter: calculatePlanetPosition(date, 'Jüpiter'),
      saturn: calculatePlanetPosition(date, 'Satürn'),
      ascendant: calculateAscendant(lst, selectedCity.lat),
      houses: calculateHouses(lst, selectedCity.lat),
      aspects: []
    }

    // Calculate aspects
    planets.aspects = calculateAspects([
      planets.sun,
      planets.moon,
      planets.mercury,
      planets.venus,
      planets.mars,
      planets.jupiter,
      planets.saturn
    ])

    setResult(planets)
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

  const getLocalSiderealTime = (jd: number, lng: number): number => {
    const T = (jd - 2451545.0) / 36525
    let theta = 280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * T * T - T * T * T / 38710000
    theta = (theta + lng) % 360
    return theta < 0 ? theta + 360 : theta
  }

  const calculatePlanetPosition = (date: Date, planetName: string): Planet => {
    const jd = getJulianDate(date)
    const T = (jd - 2451545.0) / 36525

    let longitude = 0

    switch (planetName) {
      case 'Güneş':
        longitude = 280.466 + 36000.770 * T
        break
      case 'Ay':
        longitude = 218.316 + 481267.881 * T
        break
      case 'Merkür':
        longitude = 252.250 + 149472.674 * T
        break
      case 'Venüs':
        longitude = 181.980 + 58517.816 * T
        break
      case 'Mars':
        longitude = 355.433 + 19140.299 * T
        break
      case 'Jüpiter':
        longitude = 34.351 + 3034.906 * T
        break
      case 'Satürn':
        longitude = 50.078 + 1222.114 * T
        break
    }

    longitude = ((longitude % 360) + 360) % 360
    const signIndex = Math.floor(longitude / 30)
    const degree = longitude % 30
    const house = Math.floor(Math.random() * 12) + 1

    return {
      name: planetName,
      sign: zodiacSigns[signIndex],
      house,
      degree: Math.floor(degree)
    }
  }

  const calculateAscendant = (lst: number, lat: number): string => {
    const signIndex = Math.floor(lst / 30) % 12
    return zodiacSigns[signIndex]
  }

  const calculateHouses = (lst: number, lat: number): number[] => {
    const houses: number[] = []
    for (let i = 0; i < 12; i++) {
      houses.push(Math.floor((lst + i * 30) % 360))
    }
    return houses
  }

  const calculateAspects = (planets: Planet[]): Array<{ planet1: string; planet2: string; type: string; orb: number }> => {
    const aspects: Array<{ planet1: string; planet2: string; type: string; orb: number }> = []
    const aspectTypes = [
      { name: 'Kavuşum', angle: 0, orb: 8 },
      { name: 'Trine', angle: 120, orb: 8 },
      { name: 'Kare', angle: 90, orb: 8 },
      { name: 'Karşıt', angle: 180, orb: 8 },
      { name: 'Sextile', angle: 60, orb: 6 }
    ]

    for (let i = 0; i < planets.length; i++) {
      for (let j = i + 1; j < planets.length; j++) {
        const p1 = planets[i]
        const p2 = planets[j]
        const angle = Math.abs(zodiacSigns.indexOf(p1.sign) * 30 + p1.degree - (zodiacSigns.indexOf(p2.sign) * 30 + p2.degree))

        for (const aspectType of aspectTypes) {
          if (Math.abs(angle - aspectType.angle) <= aspectType.orb) {
            aspects.push({
              planet1: p1.name,
              planet2: p2.name,
              type: aspectType.name,
              orb: Math.abs(angle - aspectType.angle)
            })
          }
        }
      }
    }

    return aspects
  }

  const getPlanetInterpretation = (planet: Planet): string => {
    const interpretations: { [key: string]: { [key: string]: string } } = {
      'Güneş': {
        'Koç': 'Enerjik, lider ruhlu ve girişken bir kişiliğe sahipsiniz.',
        'Boğa': 'Kararlı, sabırlı ve maddi güvenliğe önem veriyorsunuz.',
        'İkizler': 'Meraklı, çok yönlü ve iletişim becerileriniz güçlü.',
        'Yengeç': 'Duygusal, koruyucu ve aile odaklısınız.',
        'Aslan': 'Yaratıcı, cömert ve doğal bir lidersiniz.',
        'Başak': 'Analitik, pratik ve detaylara dikkat eden bir yapınız var.',
        'Terazi': 'Uyumlu, diplomatik ve estetik duygunuz gelişmiş.',
        'Akrep': 'Tutkulu, derin ve sezgisel bir yapınız var.',
        'Yay': 'İyimser, maceraperest ve özgürlük seven birisiniz.',
        'Oğlak': 'Disiplinli, hırslı ve sorumluluk sahibisiniz.',
        'Kova': 'Özgün, bağımsız ve insancıl değerlere sahipsiniz.',
        'Balık': 'Empatik, yaratıcı ve sezgisel bir ruhunuz var.'
      },
      'Ay': {
        'Koç': 'Duygularınız anlık ve yoğundur. Bağımsızlığa ihtiyacınız var.',
        'Boğa': 'Duygusal güvenlik ve konfor size önemlidir.',
        'İkizler': 'Duygularınızı zihinselleştirirsiniz. İletişim ihtiyacınız yüksek.',
        'Yengeç': 'Son derece duygusal ve besleyici bir iç dünyanız var.',
        'Aslan': 'Duygusal ifade biçiminiz canlı ve dramatiktir.',
        'Başak': 'Duygularınızı analiz eder ve kontrol etmeye çalışırsınız.',
        'Terazi': 'Duygusal dengeye ve uyuma ihtiyaç duyarsınız.',
        'Akrep': 'Derin ve yoğun duygular yaşarsınız.',
        'Yay': 'Duygusal olarak iyimser ve özgürlük seversiniz.',
        'Oğlak': 'Duygularınızı kontrol altında tutarsınız.',
        'Kova': 'Duygusal mesafe koyabilir ve zihinsel yaklaşırsınız.',
        'Balık': 'Son derece empatik ve hassas bir iç dünyanız var.'
      }
    }

    return interpretations[planet.name]?.[planet.sign] || `${planet.name} ${planet.sign} burcunda.`
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
      <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Sparkles className="h-20 w-20 text-purple-500 animate-pulse" />
              <Star className="h-8 w-8 text-indigo-500 absolute -top-2 -right-2 animate-bounce" />
            </div>
          </div>
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
            Yıldız Haritası Oluşturucu
          </CardTitle>
          <CardDescription className="text-lg mt-2">
            Doğum anınızdaki gezegen pozisyonlarını keşfedin ve natal chart'ınızı oluşturun
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="border-2 border-purple-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-6 w-6 text-purple-500" />
            Doğum Bilgilerinizi Girin
          </CardTitle>
          <CardDescription>
            Natal chart'ınız doğum anınızdaki gezegenlerin konumunu gösterir
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
                    {months.map((m) => (
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
                    {hours.map((h) => (
                      <SelectItem key={h} value={h}>{h}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={birthMinute} onValueChange={setBirthMinute}>
                  <SelectTrigger className="bg-slate-50">
                    <SelectValue placeholder="Dakika" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[200px]">
                    {minutes.map((m) => (
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
            onClick={calculateNatalChart}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            size="lg"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Yıldız Haritamı Oluştur
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Tabs defaultValue="planets" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="planets">Gezegenler</TabsTrigger>
            <TabsTrigger value="houses">Evler</TabsTrigger>
            <TabsTrigger value="aspects">Aspektler</TabsTrigger>
          </TabsList>

          <TabsContent value="planets" className="space-y-4">
            {/* SVG Natal Chart Görselleştirmesi */}
            <Card className="bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 border-2 border-purple-200 overflow-hidden">
              <CardHeader>
                <CardTitle className="text-center text-2xl">
                  <div className="flex items-center justify-center gap-3">
                    <Star className="h-7 w-7 text-purple-500" />
                    <span>Natal Chart</span>
                    <Star className="h-7 w-7 text-indigo-500" />
                  </div>
                </CardTitle>
                <CardDescription className="text-center text-base">
                  Yükselen Burç: <strong className="text-purple-700">{result.ascendant}</strong>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center py-6">
                {/* SVG Zodyak Çemberi */}
                <svg width="400" height="400" viewBox="0 0 400 400" className="drop-shadow-xl">
                  {/* Dış çember (zodyak işaretleri) */}
                  <circle
                    cx="200"
                    cy="200"
                    r="180"
                    fill="none"
                    stroke="url(#zodiacGradient)"
                    strokeWidth="3"
                  />
                  
                  {/* İç çember */}
                  <circle
                    cx="200"
                    cy="200"
                    r="140"
                    fill="white"
                    fillOpacity="0.9"
                    stroke="#a855f7"
                    strokeWidth="2"
                  />

                  {/* Orta çember */}
                  <circle
                    cx="200"
                    cy="200"
                    r="100"
                    fill="url(#centerGradient)"
                    stroke="#6366f1"
                    strokeWidth="2"
                  />

                  {/* 12 burç bölümü çizgileri */}
                  {Array.from({ length: 12 }).map((_, i) => {
                    const angle = (i * 30 - 90) * (Math.PI / 180)
                    const x1 = 200 + 100 * Math.cos(angle)
                    const y1 = 200 + 100 * Math.sin(angle)
                    const x2 = 200 + 180 * Math.cos(angle)
                    const y2 = 200 + 180 * Math.sin(angle)
                    return (
                      <line
                        key={i}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="#d8b4fe"
                        strokeWidth="1"
                        opacity="0.5"
                      />
                    )
                  })}

                  {/* Gezegen pozisyonları */}
                  {[result.sun, result.moon, result.mercury, result.venus, result.mars, result.jupiter, result.saturn].map((planet, idx) => {
                    const colors = ['#f59e0b', '#818cf8', '#06b6d4', '#ec4899', '#ef4444', '#f97316', '#8b5cf6']
                    const angle = ((planet.degree + 90) * -1) * (Math.PI / 180)
                    const x = 200 + 120 * Math.cos(angle)
                    const y = 200 + 120 * Math.sin(angle)
                    return (
                      <g key={idx}>
                        <circle
                          cx={x}
                          cy={y}
                          r="8"
                          fill={colors[idx]}
                          stroke="white"
                          strokeWidth="2"
                          className="animate-pulse"
                          style={{ animationDelay: `${idx * 0.1}s` }}
                        />
                        <text
                          x={x}
                          y={y - 15}
                          textAnchor="middle"
                          fontSize="11"
                          fontWeight="bold"
                          fill={colors[idx]}
                        >
                          {planet.name.charAt(0)}
                        </text>
                      </g>
                    )
                  })}

                  {/* Merkezdeki yükselen burç göstergesi */}
                  <text
                    x="200"
                    y="200"
                    textAnchor="middle"
                    dy=".3em"
                    fontSize="24"
                    fontWeight="bold"
                    fill="#6366f1"
                  >
                    {result.ascendant}
                  </text>
                  <text
                    x="200"
                    y="220"
                    textAnchor="middle"
                    fontSize="10"
                    fill="#818cf8"
                  >
                    Yükselen
                  </text>

                  {/* Gradyanlar */}
                  <defs>
                    <linearGradient id="zodiacGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#a855f7" />
                      <stop offset="50%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                    <radialGradient id="centerGradient">
                      <stop offset="0%" stopColor="#faf5ff" />
                      <stop offset="100%" stopColor="#ede9fe" />
                    </radialGradient>
                  </defs>
                </svg>
              </CardContent>
            </Card>

            {/* Gezegen Açıklamaları */}
            <div className="grid md:grid-cols-2 gap-4">
              {[result.sun, result.moon, result.mercury, result.venus, result.mars, result.jupiter, result.saturn].map((planet, idx) => (
                <Card key={idx} className="hover:shadow-lg transition-all border-2 border-purple-100 hover:border-purple-300">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center justify-between text-lg">
                      <span className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-purple-500" />
                        {planet.name}
                      </span>
                      <Badge variant="outline" className="text-purple-700">
                        {planet.sign}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Ev:</span>
                        <span className="font-semibold">{planet.house}. Ev</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Derece:</span>
                        <span className="font-semibold">{planet.degree}°</span>
                      </div>
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed">{getPlanetInterpretation(planet)}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="houses" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {result.houses.map((house, idx) => (
                <Card key={idx} className="text-center">
                  <CardContent className="pt-6">
                    <h3 className="text-2xl font-bold text-purple-600">{idx + 1}. Ev</h3>
                    <p className="text-sm text-slate-600 mt-2">{Math.floor(house)}°</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="aspects" className="space-y-4">
            {result.aspects.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center text-slate-500">
                  Belirgin aspekt bulunamadı
                </CardContent>
              </Card>
            ) : (
              result.aspects.map((aspect, idx) => (
                <Card key={idx} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-semibold">{aspect.planet1}</span>
                        <span className="mx-2 text-purple-600">{aspect.type}</span>
                        <span className="font-semibold">{aspect.planet2}</span>
                      </div>
                      <span className="text-sm text-slate-600">Orb: {aspect.orb.toFixed(1)}°</span>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
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
            <p className="text-slate-700">Doğum tarihinizi, doğum saatinizi (mümkünse dakika cinsinden) girin</p>
          </div>
          <div className="flex gap-3">
            <Badge className="bg-blue-500">2</Badge>
            <p className="text-slate-700">Doğum yerinizi (şehir) arama kutusundan bulup seçin</p>
          </div>
          <div className="flex gap-3">
            <Badge className="bg-blue-500">3</Badge>
            <p className="text-slate-700">"Yıldız Haritamı Oluştur" butonuna tıklayın</p>
          </div>
          <div className="flex gap-3">
            <Badge className="bg-blue-500">4</Badge>
            <p className="text-slate-700">Gezegenler, Evler ve Aspektler sekmelerini inceleyin</p>
          </div>
          <div className="flex gap-3">
            <Badge className="bg-blue-500">5</Badge>
            <p className="text-slate-700">Her gezegenin hangi burçta ve evde olduğunu görün, yorumları okuyun</p>
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
          <div className="p-4 bg-purple-50 rounded-lg">
            <h4 className="font-semibold text-purple-700 mb-2">🌟 Kendini Keşfetme</h4>
            <p className="text-slate-600">Natal chart'ınız kişiliğinizin derinliklerini gösterir. Güneş burcunuz iç dünyanızı, Ay burcunuz duygusal yapınızı, Yükselen burcunuz ise dış kişiliğinizi temsil eder.</p>
          </div>
          <div className="p-4 bg-indigo-50 rounded-lg">
            <h4 className="font-semibold text-indigo-700 mb-2">💼 Kariyer Planlaması</h4>
            <p className="text-slate-600">10. ev (kariyer evi) ve içindeki gezegenler hangi kariyerlere yatkın olduğunuzu gösterir. Merkür'ün konumu iletişim becerilerinizi, Mars ise enerji ve hırsınızı belirtir.</p>
          </div>
          <div className="p-4 bg-pink-50 rounded-lg">
            <h4 className="font-semibold text-pink-700 mb-2">❤️ İlişki Analizi</h4>
            <p className="text-slate-600">Venüs'ün (aşk gezegeni) konumu aşk tarzınızı, 7. ev ise partnerinizde aradığınız özellikleri gösterir. Partnerinizle karşılaştırmalı harita (synastry) yapabilirsiniz.</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-700 mb-2">🔮 Astroloji Öğrenme</h4>
            <p className="text-slate-600">Kendi haritanızı inceleyerek astrolojiyi öğrenmeye başlayabilirsiniz. Her gezegenin anlamını ve evlerin temsil ettiği hayat alanlarını keşfedin.</p>
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
              <strong>Doğum Saati Hassasiyeti:</strong> Natal chart hesaplaması için doğum saatinizin dakika cinsinden doğruluğu çok önemlidir. Birkaç dakikalık fark bile yükselen burcunuzu değiştirebilir.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <Star className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <p className="text-slate-700">
              <strong>12 Ev Sistemi:</strong> Natal chart 12 eve ayrılmıştır. Her ev hayatın farklı bir alanını temsil eder (1.Ev: Kişilik, 2.Ev: Para, 7.Ev: İlişkiler, 10.Ev: Kariyer vb.)
            </p>
          </div>
          <div className="flex items-start gap-3">
            <Star className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <p className="text-slate-700">
              <strong>Aspektler:</strong> Gezegenler arasındaki açısal ilişkilerdir. Konjunksyon (0°), Trigon (120°), Kare (90°), Karşıt (180°) en önemli aspektlerdir.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <Star className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <p className="text-slate-700">
              <strong>Basitleştirilmiş Hesaplama:</strong> Bu araç eğitim amaçlıdır. Profesyonel astrolojik danışmanlık için uzman bir astrolog ile görüşün.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* İlginç Bilgiler */}
      <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-purple-500" />
            Bilmeniz İlginç Olabilecek Şeyler
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h4 className="font-semibold text-purple-700 mb-2 flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Natal Chart Nedir?
            </h4>
            <p className="text-slate-600">
              Natal chart (doğum haritası), doğduğunuz an gökyüzündeki gezegenlerin, yıldızların ve burçların konumunu gösteren astrolojik haritadır. Yunanca "natal" (doğum) kelimesinden gelir.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h4 className="font-semibold text-blue-700 mb-2 flex items-center gap-2">
              <Moon className="h-5 w-5" />
              Üçlü Büyük Kombinasyon
            </h4>
            <p className="text-slate-600">
              Astrolojide en önemli 3 nokta: Güneş burcu (kimlik), Ay burcu (duygular), Yükselen burcu (dış kişilik). Bu üçlü her insanın benzersiz astrolojik imzasını oluşturur.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h4 className="font-semibold text-green-700 mb-2 flex items-center gap-2">
              <Sun className="h-5 w-5" />
              Yükselen Burç Değişimi
            </h4>
            <p className="text-slate-600">
              Yükselen burç yaklaşık her 2 saatte bir değişir. Bu yüzden doğum saatiniz çok önemlidir. Aynı gün doğan iki kişi farklı yükselen burçlara sahip olabilir.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h4 className="font-semibold text-orange-700 mb-2 flex items-center gap-2">
              <Star className="h-5 w-5" />
              Retrograd Gezegenler
            </h4>
            <p className="text-slate-600">
              Doğum haritanızda retrograd (geriye giden) gezegen varsa, o gezegenin enerjisi içe dönük çalışır. Merkür retrosu iletişim, Venüs retrosu aşk konularında içsel yolculuk anlamına gelir.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h4 className="font-semibold text-pink-700 mb-2 flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Synastry (İlişki Uyumu)
            </h4>
            <p className="text-slate-600">
              İki kişinin natal chart'ını karşılaştırmaya synastry denir. Partnerinizle uyumunuzu görmek için her ikinizin de doğum bilgilerine ihtiyaç vardır.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
