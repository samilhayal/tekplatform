"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Home, Clock, Globe, BookOpen, Lightbulb, AlertCircle, Info, MapPin } from "lucide-react"

interface Timezone {
  city: string
  country: string
  timezone: string
  offset: number
  emoji: string
}

const timezones: Timezone[] = [
  { city: "İstanbul", country: "Türkiye", timezone: "Europe/Istanbul", offset: 3, emoji: "🇹🇷" },
  { city: "New York", country: "ABD", timezone: "America/New_York", offset: -5, emoji: "🇺🇸" },
  { city: "London", country: "İngiltere", timezone: "Europe/London", offset: 0, emoji: "🇬🇧" },
  { city: "Tokyo", country: "Japonya", timezone: "Asia/Tokyo", offset: 9, emoji: "🇯🇵" },
  { city: "Dubai", country: "BAE", timezone: "Asia/Dubai", offset: 4, emoji: "🇦🇪" },
  { city: "Los Angeles", country: "ABD", timezone: "America/Los_Angeles", offset: -8, emoji: "🇺🇸" },
  { city: "Paris", country: "Fransa", timezone: "Europe/Paris", offset: 1, emoji: "🇫🇷" },
  { city: "Sydney", country: "Avustralya", timezone: "Australia/Sydney", offset: 11, emoji: "🇦🇺" },
  { city: "Moscow", country: "Rusya", timezone: "Europe/Moscow", offset: 3, emoji: "🇷🇺" },
  { city: "Beijing", country: "Çin", timezone: "Asia/Shanghai", offset: 8, emoji: "🇨🇳" },
  { city: "Sao Paulo", country: "Brezilya", timezone: "America/Sao_Paulo", offset: -3, emoji: "🇧🇷" },
  { city: "Singapore", country: "Singapur", timezone: "Asia/Singapore", offset: 8, emoji: "🇸🇬" },
]

export function TimezoneConverter() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedCity, setSelectedCity] = useState("İstanbul")

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const getTimeForTimezone = (tz: Timezone) => {
    return new Intl.DateTimeFormat('tr-TR', {
      timeZone: tz.timezone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(currentTime)
  }

  const getDateForTimezone = (tz: Timezone) => {
    return new Intl.DateTimeFormat('tr-TR', {
      timeZone: tz.timezone,
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      weekday: 'long',
    }).format(currentTime)
  }

  const getDayPeriod = (tz: Timezone) => {
    const hour = parseInt(getTimeForTimezone(tz).split(':')[0])
    if (hour >= 5 && hour < 12) return { label: "Sabah", color: "from-yellow-400 to-orange-400", icon: "🌅" }
    if (hour >= 12 && hour < 17) return { label: "Öğleden Sonra", color: "from-orange-400 to-amber-500", icon: "☀️" }
    if (hour >= 17 && hour < 21) return { label: "Akşam", color: "from-purple-400 to-pink-500", icon: "🌆" }
    return { label: "Gece", color: "from-indigo-600 to-purple-700", icon: "🌙" }
  }

  const selectedTz = timezones.find(tz => tz.city === selectedCity) || timezones[0]
  const selectedPeriod = getDayPeriod(selectedTz)

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Home Button */}
      <Link href="/">
        <Button 
          variant="outline" 
          className="group flex items-center gap-2 hover:gap-3 transition-all duration-300 hover:border-blue-300 hover:bg-blue-50"
        >
          <Home className="h-4 w-4 text-blue-600 group-hover:-translate-x-1 transition-transform" />
          <span className="text-blue-900 font-medium">Ana Sayfaya Dön</span>
        </Button>
      </Link>

      {/* Featured City Display */}
      <Card className={`border-2 border-blue-100 shadow-2xl overflow-hidden relative`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${selectedPeriod.color} opacity-10`}></div>
        <CardContent className="pt-8 pb-8 px-6 relative">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-600 shadow-lg mb-4">
              <Globe className="h-10 w-10 text-white animate-pulse" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
              Saat Dilimi Dönüştürücü
            </h1>
            <p className="text-slate-600">Dünya şehirlerinin anlık saatlerini görüntüleyin</p>
          </div>

          <div className={`max-w-2xl mx-auto p-8 rounded-3xl bg-gradient-to-br ${selectedPeriod.color} text-white shadow-2xl`}>
            <div className="text-center">
              <div className="text-6xl mb-4">{selectedTz.emoji}</div>
              <h2 className="text-3xl font-bold mb-2">{selectedTz.city}</h2>
              <p className="text-lg opacity-90 mb-6">{selectedTz.country}</p>
              
              <div className="text-7xl font-bold font-mono mb-4 tracking-tight">
                {getTimeForTimezone(selectedTz)}
              </div>
              
              <div className="text-xl opacity-90 mb-4">
                {getDateForTimezone(selectedTz)}
              </div>

              <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full">
                <span className="text-3xl">{selectedPeriod.icon}</span>
                <span className="font-semibold">{selectedPeriod.label}</span>
              </div>
            </div>
          </div>

          {/* City Selector */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {timezones.map((tz) => (
              <Button
                key={tz.city}
                variant={selectedCity === tz.city ? "default" : "outline"}
                onClick={() => setSelectedCity(tz.city)}
                className={`transition-all ${
                  selectedCity === tz.city 
                    ? "bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 scale-105" 
                    : "hover:border-blue-300 hover:bg-blue-50"
                }`}
              >
                <span className="mr-2">{tz.emoji}</span>
                {tz.city}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* All Timezones Grid */}
      <Card className="border-2 border-blue-100 shadow-xl">
        <CardContent className="pt-6">
          <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-600" />
            Tüm Şehirler
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {timezones.map((tz) => {
              const time = getTimeForTimezone(tz)
              const period = getDayPeriod(tz)
              
              return (
                <div
                  key={tz.city}
                  onClick={() => setSelectedCity(tz.city)}
                  className={`p-5 rounded-xl border-2 transition-all cursor-pointer hover:scale-105 ${
                    selectedCity === tz.city
                      ? "border-blue-400 bg-gradient-to-br from-blue-50 to-cyan-50 shadow-lg"
                      : "border-slate-200 bg-white hover:border-blue-300 hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">{tz.emoji}</span>
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900 text-sm">{tz.city}</h3>
                      <p className="text-xs text-slate-500">{tz.country}</p>
                    </div>
                    <Clock className="h-4 w-4 text-blue-600" />
                  </div>
                  
                  <div className="mb-2">
                    <p className="text-3xl font-bold text-blue-600 font-mono">
                      {time}
                    </p>
                  </div>
                  
                  <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-gradient-to-r ${period.color} text-white text-xs font-semibold`}>
                    <span>{period.icon}</span>
                    <span>{period.label}</span>
                  </div>
                  
                  <div className="mt-2 text-xs text-slate-500">
                    UTC {tz.offset >= 0 ? '+' : ''}{tz.offset}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* World Map Visualization */}
      <Card className="border-2 border-blue-100 shadow-xl overflow-hidden">
        <CardContent className="pt-6 pb-0">
          <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Globe className="h-5 w-5 text-blue-600" />
            Zaman Dilimi Haritası
          </h3>
          <div className="relative h-64 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl overflow-hidden mb-6">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Globe className="h-32 w-32 text-blue-300 mb-4 mx-auto animate-spin-slow" style={{ animationDuration: '20s' }} />
                <p className="text-slate-600 font-medium">
                  24 saat içinde dünya döner ve günler değişir
                </p>
              </div>
            </div>
            {/* Time zone indicators */}
            <div className="absolute inset-0 flex items-center justify-around px-4">
              {[-12, -6, 0, 6, 12].map((offset) => (
                <div key={offset} className="text-center">
                  <div className="w-1 h-16 bg-blue-400 rounded-full mb-2 mx-auto"></div>
                  <span className="text-xs font-bold text-blue-700">UTC{offset >= 0 ? '+' : ''}{offset}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Educational Sections */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* How to Use */}
        <Card className="border-2 border-blue-100 hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BookOpen className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">Nasıl Kullanılır?</h3>
                <ol className="text-sm text-slate-600 space-y-2 list-decimal list-inside">
                  <li>Görmek istediğiniz şehri seçin</li>
                  <li>Anlık saat bilgisi otomatik güncellenir</li>
                  <li>Gün/Gece durumunu emoji ile görün</li>
                  <li>Tüm şehirleri aynı anda karşılaştırın</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Examples */}
        <Card className="border-2 border-cyan-100 hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 bg-cyan-100 rounded-lg">
                <Lightbulb className="h-5 w-5 text-cyan-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">Örnek Kullanımlar</h3>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li><strong>İş Toplantısı:</strong> New York ile İstanbul saat farkı</li>
                  <li><strong>Aile Görüşmesi:</strong> Yurtdışındaki yakınlarınızı arayın</li>
                  <li><strong>Seyahat:</strong> Varış şehrindeki saati öğrenin</li>
                  <li><strong>Online Etkinlik:</strong> Küresel etkinlik zamanlaması</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Info */}
        <Card className="border-2 border-blue-100 hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <AlertCircle className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">Önemli Bilgiler</h3>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li><strong>UTC:</strong> Koordineli Evrensel Zaman (referans)</li>
                  <li><strong>DST:</strong> Yaz saati uygulaması bazı ülkelerde var</li>
                  <li><strong>Fark:</strong> İstanbul UTC+3, New York UTC-5</li>
                  <li><strong>Güncelleme:</strong> Saatler her saniye güncellenir</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fun Facts */}
        <Card className="border-2 border-cyan-100 hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 bg-cyan-100 rounded-lg">
                <Info className="h-5 w-5 text-cyan-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">İlginç Bilgiler</h3>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li>🌍 Dünyada 38 farklı zaman dilimi vardır</li>
                  <li>🕐 İlk zaman dilimi sistemi 1884'te kabul edildi</li>
                  <li>🇨🇳 Çin tüm ülkede tek saat dilimi kullanır</li>
                  <li>🏝️ Kiribati ilk günü karşılayan ülkedir (UTC+14)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
