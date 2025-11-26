"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Moon, Star, ArrowLeft, ArrowRight, AlertTriangle, Sparkles, Home, Info, Lightbulb, BookOpen, HelpCircle, Sun } from "lucide-react"
import Link from "next/link"

const planets = {
  mercury: { name: 'Merkür', symbol: '☿', color: 'text-amber-500', bgColor: 'bg-amber-100' },
  venus: { name: 'Venüs', symbol: '♀', color: 'text-pink-500', bgColor: 'bg-pink-100' },
  mars: { name: 'Mars', symbol: '♂', color: 'text-red-500', bgColor: 'bg-red-100' },
  jupiter: { name: 'Jüpiter', symbol: '♃', color: 'text-orange-500', bgColor: 'bg-orange-100' },
  saturn: { name: 'Satürn', symbol: '♄', color: 'text-gray-600', bgColor: 'bg-gray-100' },
  uranus: { name: 'Uranüs', symbol: '♅', color: 'text-cyan-500', bgColor: 'bg-cyan-100' },
  neptune: { name: 'Neptün', symbol: '♆', color: 'text-blue-500', bgColor: 'bg-blue-100' },
  pluto: { name: 'Plüton', symbol: '♇', color: 'text-purple-600', bgColor: 'bg-purple-100' },
}

const zodiacSigns = ['Koç', 'Boğa', 'İkizler', 'Yengeç', 'Aslan', 'Başak', 'Terazi', 'Akrep', 'Yay', 'Oğlak', 'Kova', 'Balık']

// Aralık 2025 - Aralık 2026 Retro Dönemleri
const retrogradePeriods = [
  // Merkür Retroları 2025-2026
  { planet: 'mercury', start: '2025-11-26', end: '2025-12-15', sign: 'Yay' },
  { planet: 'mercury', start: '2026-03-15', end: '2026-04-07', sign: 'Koç' },
  { planet: 'mercury', start: '2026-07-18', end: '2026-08-11', sign: 'Aslan' },
  { planet: 'mercury', start: '2026-11-10', end: '2026-11-30', sign: 'Akrep' },
  // Venüs Retrosu 2026
  { planet: 'venus', start: '2026-03-02', end: '2026-04-13', sign: 'Koç/Balık' },
  // Mars Retrosu 2025-2026
  { planet: 'mars', start: '2025-12-06', end: '2026-02-24', sign: 'Aslan/Yengeç' },
  // Jüpiter Retrosu 2026
  { planet: 'jupiter', start: '2026-07-14', end: '2026-11-10', sign: 'Terazi' },
  // Satürn Retrosu 2026
  { planet: 'saturn', start: '2026-06-09', end: '2026-10-25', sign: 'Koç/Balık' },
  // Uranüs Retrosu 2026
  { planet: 'uranus', start: '2026-08-28', end: '2027-01-27', sign: 'İkizler' },
  // Neptün Retrosu 2026
  { planet: 'neptune', start: '2026-07-04', end: '2026-12-10', sign: 'Balık/Koç' },
  // Plüton Retrosu 2026
  { planet: 'pluto', start: '2026-05-04', end: '2026-10-13', sign: 'Kova' },
]

// Tutulmalar 2025-2026
const eclipses = [
  { date: '2026-02-17', type: 'lunar', sign: 'Aslan', description: 'Parçalı Ay Tutulması - Aslan' },
  { date: '2026-03-03', type: 'solar', sign: 'Balık', description: 'Tam Güneş Tutulması - Balık' },
  { date: '2026-08-12', type: 'lunar', sign: 'Kova', description: 'Parçalı Ay Tutulması - Kova' },
  { date: '2026-08-28', type: 'solar', sign: 'Başak', description: 'Tam Güneş Tutulması - Başak' },
]

// Ay Fazları 2025 Aralık - 2026 Aralık
const moonPhases = [
  // 2025 Aralık
  { date: '2025-12-01', type: 'full', sign: 'İkizler' },
  { date: '2025-12-15', type: 'new', sign: 'Yay' },
  { date: '2025-12-30', type: 'full', sign: 'Yengeç' },
  // 2026 Ocak
  { date: '2026-01-14', type: 'new', sign: 'Oğlak' },
  { date: '2026-01-29', type: 'full', sign: 'Aslan' },
  // 2026 Şubat
  { date: '2026-02-13', type: 'new', sign: 'Kova' },
  { date: '2026-02-27', type: 'full', sign: 'Başak' },
  // 2026 Mart
  { date: '2026-03-14', type: 'new', sign: 'Balık' },
  { date: '2026-03-29', type: 'full', sign: 'Terazi' },
  // 2026 Nisan
  { date: '2026-04-12', type: 'new', sign: 'Koç' },
  { date: '2026-04-28', type: 'full', sign: 'Akrep' },
  // 2026 Mayıs
  { date: '2026-05-12', type: 'new', sign: 'Boğa' },
  { date: '2026-05-27', type: 'full', sign: 'Yay' },
  // 2026 Haziran
  { date: '2026-06-10', type: 'new', sign: 'İkizler' },
  { date: '2026-06-26', type: 'full', sign: 'Oğlak' },
  // 2026 Temmuz
  { date: '2026-07-10', type: 'new', sign: 'Yengeç' },
  { date: '2026-07-25', type: 'full', sign: 'Kova' },
  // 2026 Ağustos
  { date: '2026-08-08', type: 'new', sign: 'Aslan' },
  { date: '2026-08-24', type: 'full', sign: 'Balık' },
  // 2026 Eylül
  { date: '2026-09-07', type: 'new', sign: 'Başak' },
  { date: '2026-09-22', type: 'full', sign: 'Koç' },
  // 2026 Ekim
  { date: '2026-10-06', type: 'new', sign: 'Terazi' },
  { date: '2026-10-22', type: 'full', sign: 'Boğa' },
  // 2026 Kasım
  { date: '2026-11-05', type: 'new', sign: 'Akrep' },
  { date: '2026-11-20', type: 'full', sign: 'İkizler' },
  // 2026 Aralık
  { date: '2026-12-04', type: 'new', sign: 'Yay' },
  { date: '2026-12-20', type: 'full', sign: 'Yengeç' },
]

// Önemli Astrolojik Tarihler 2025-2026
const importantDates = [
  { date: '2025-12-21', event: 'Kış Gündönümü - Güneş Oğlak\'a geçiyor', icon: '❄️' },
  { date: '2026-01-19', event: 'Güneş Kova burcuna geçiyor', icon: '♒' },
  { date: '2026-02-18', event: 'Güneş Balık burcuna geçiyor', icon: '♓' },
  { date: '2026-03-20', event: 'İlkbahar Ekinoksu - Güneş Koç\'a geçiyor', icon: '🌸' },
  { date: '2026-04-19', event: 'Güneş Boğa burcuna geçiyor', icon: '♉' },
  { date: '2026-05-20', event: 'Güneş İkizler burcuna geçiyor', icon: '♊' },
  { date: '2026-06-20', event: 'Yaz Gündönümü - Güneş Yengeç\'e geçiyor', icon: '☀️' },
  { date: '2026-07-22', event: 'Güneş Aslan burcuna geçiyor', icon: '♌' },
  { date: '2026-08-22', event: 'Güneş Başak burcuna geçiyor', icon: '♍' },
  { date: '2026-09-22', event: 'Sonbahar Ekinoksu - Güneş Terazi\'ye geçiyor', icon: '🍂' },
  { date: '2026-10-22', event: 'Güneş Akrep burcuna geçiyor', icon: '♏' },
  { date: '2026-11-21', event: 'Güneş Yay burcuna geçiyor', icon: '♐' },
  { date: '2026-12-21', event: 'Kış Gündönümü - Güneş Oğlak\'a geçiyor', icon: '❄️' },
]

const monthNames = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık']

export function AstrolojiTakvimi() {
  const [selectedMonth, setSelectedMonth] = useState(11) // Aralık
  const [selectedYear, setSelectedYear] = useState(2025)

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    const day = new Date(year, month, 1).getDay()
    return day === 0 ? 6 : day - 1
  }

  const formatDate = (year: number, month: number, day: number): string => {
    const m = (month + 1).toString().padStart(2, '0')
    const d = day.toString().padStart(2, '0')
    return `${year}-${m}-${d}`
  }

  const getEventsForDate = (dateStr: string) => {
    const events: Array<{ type: string; description: string; color: string }> = []

    retrogradePeriods.forEach(retro => {
      if (dateStr >= retro.start && dateStr <= retro.end) {
        const planet = planets[retro.planet as keyof typeof planets]
        if (planet) {
          events.push({
            type: 'retrograde',
            description: `${planet.name} Retro`,
            color: 'bg-red-100 text-red-700'
          })
        }
      }
    })

    eclipses.forEach(eclipse => {
      if (eclipse.date === dateStr) {
        events.push({
          type: 'eclipse',
          description: eclipse.description,
          color: eclipse.type === 'solar' ? 'bg-amber-100 text-amber-800' : 'bg-indigo-100 text-indigo-800'
        })
      }
    })

    moonPhases.forEach(moon => {
      if (moon.date === dateStr) {
        events.push({
          type: 'moon',
          description: moon.type === 'new' ? `Yeni Ay - ${moon.sign}` : `Dolunay - ${moon.sign}`,
          color: moon.type === 'new' ? 'bg-gray-800 text-white' : 'bg-yellow-100 text-yellow-800'
        })
      }
    })

    importantDates.forEach(date => {
      if (date.date === dateStr) {
        events.push({
          type: 'important',
          description: date.event,
          color: 'bg-purple-100 text-purple-700'
        })
      }
    })

    return events
  }

  const activeRetrogrades = useMemo(() => {
    const today = new Date().toISOString().split('T')[0]
    return retrogradePeriods.filter(r => today >= r.start && today <= r.end)
  }, [])

  const upcomingEvents = useMemo(() => {
    const today = new Date().toISOString().split('T')[0]
    const allEvents: Array<{ date: string; description: string; type: string }> = []

    eclipses.forEach(e => {
      if (e.date >= today) {
        allEvents.push({ date: e.date, description: e.description, type: 'eclipse' })
      }
    })

    let moonCount = 0
    moonPhases.forEach(m => {
      if (m.date >= today && moonCount < 6) {
        allEvents.push({
          date: m.date,
          description: m.type === 'new' ? `Yeni Ay - ${m.sign}` : `Dolunay - ${m.sign}`,
          type: 'moon'
        })
        moonCount++
      }
    })

    let impCount = 0
    importantDates.forEach(d => {
      if (d.date >= today && impCount < 5) {
        allEvents.push({ date: d.date, description: d.event, type: 'important' })
        impCount++
      }
    })

    return allEvents.sort((a, b) => a.date.localeCompare(b.date)).slice(0, 10)
  }, [])

  const previousMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11)
      setSelectedYear(selectedYear - 1)
    } else {
      setSelectedMonth(selectedMonth - 1)
    }
  }

  const nextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0)
      setSelectedYear(selectedYear + 1)
    } else {
      setSelectedMonth(selectedMonth + 1)
    }
  }

  const daysInMonth = getDaysInMonth(selectedYear, selectedMonth)
  const firstDay = getFirstDayOfMonth(selectedYear, selectedMonth)

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Home Button */}
      <div className="flex justify-start">
        <Link href="/">
          <Button variant="outline" size="sm" className="gap-2">
            <Home className="h-4 w-4" />
            Ana Sayfaya Dön
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-8 text-white">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute top-4 right-4 opacity-20">
          <Star className="h-32 w-32 animate-pulse" />
        </div>
        <div className="absolute bottom-4 left-4 opacity-20">
          <Moon className="h-24 w-24 animate-bounce" style={{ animationDuration: '3s' }} />
        </div>
        <div className="relative z-10 text-center">
          <div className="flex justify-center gap-3 mb-4">
            <Calendar className="h-12 w-12 animate-pulse" />
            <Sun className="h-12 w-12 text-yellow-300" />
            <Moon className="h-12 w-12" />
          </div>
          <h1 className="text-4xl font-bold mb-3">Astroloji Takvimi 2025-2026</h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Gezegen retroları, tutulmalar, ay fazları ve önemli astrolojik olayları takip edin
          </p>
          <div className="flex justify-center gap-4 mt-6 flex-wrap">
            <div className="bg-white/20 rounded-full px-4 py-2 text-sm backdrop-blur-sm">
              🔄 {retrogradePeriods.length} Retro Dönemi
            </div>
            <div className="bg-white/20 rounded-full px-4 py-2 text-sm backdrop-blur-sm">
              🌑🌕 {moonPhases.length} Ay Fazı
            </div>
            <div className="bg-white/20 rounded-full px-4 py-2 text-sm backdrop-blur-sm">
              🌒 {eclipses.length} Tutulma
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="calendar" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6 h-auto">
          <TabsTrigger value="calendar" className="flex items-center gap-2 py-3">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Takvim</span>
          </TabsTrigger>
          <TabsTrigger value="retrogrades" className="flex items-center gap-2 py-3">
            <AlertTriangle className="h-4 w-4" />
            <span className="hidden sm:inline">Retrolar</span>
          </TabsTrigger>
          <TabsTrigger value="moon" className="flex items-center gap-2 py-3">
            <Moon className="h-4 w-4" />
            <span className="hidden sm:inline">Ay Fazları</span>
          </TabsTrigger>
          <TabsTrigger value="eclipses" className="flex items-center gap-2 py-3">
            <Sun className="h-4 w-4" />
            <span className="hidden sm:inline">Tutulmalar</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calendar">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <Card className="lg:col-span-3 border-2">
              <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
                <div className="flex items-center justify-between">
                  <Button variant="outline" size="icon" onClick={previousMonth} className="hover:bg-indigo-100">
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <CardTitle className="text-2xl text-indigo-700">
                    {monthNames[selectedMonth]} {selectedYear}
                  </CardTitle>
                  <Button variant="outline" size="icon" onClick={nextMonth} className="hover:bg-indigo-100">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].map(day => (
                    <div key={day} className="text-center font-semibold text-slate-600 py-2">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: firstDay }).map((_, i) => (
                    <div key={`empty-${i}`} className="h-24 bg-slate-50 rounded-lg" />
                  ))}

                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1
                    const dateStr = formatDate(selectedYear, selectedMonth, day)
                    const events = getEventsForDate(dateStr)
                    const isToday = dateStr === new Date().toISOString().split('T')[0]

                    return (
                      <div
                        key={day}
                        className={`h-24 p-1 rounded-lg border transition-all hover:shadow-md overflow-hidden ${
                          isToday ? 'bg-blue-50 border-blue-400' : 'bg-white border-slate-200'
                        }`}
                      >
                        <div className={`text-sm font-semibold mb-1 ${isToday ? 'text-blue-600' : 'text-slate-700'}`}>
                          {day}
                        </div>
                        <div className="space-y-0.5">
                          {events.slice(0, 2).map((event, idx) => (
                            <div
                              key={idx}
                              className={`text-xs px-1 py-0.5 rounded truncate ${event.color}`}
                              title={event.description}
                            >
                              {event.description.length > 12 ? event.description.substring(0, 12) + '...' : event.description}
                            </div>
                          ))}
                          {events.length > 2 && (
                            <div className="text-xs text-slate-500">+{events.length - 2}</div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {activeRetrogrades.length > 0 && (
                <Card className="bg-red-50 border-red-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-red-700 flex items-center gap-2 text-lg">
                      <AlertTriangle className="h-5 w-5" />
                      Aktif Retrolar
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {activeRetrogrades.map((retro, idx) => {
                      const planet = planets[retro.planet as keyof typeof planets]
                      return (
                        <div key={idx} className="flex items-center gap-2 mb-2">
                          <span className={`text-xl ${planet.color}`}>{planet.symbol}</span>
                          <div>
                            <p className="font-medium text-red-800">{planet.name}</p>
                            <p className="text-xs text-red-600">{retro.sign}</p>
                          </div>
                        </div>
                      )
                    })}
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Sparkles className="h-5 w-5 text-purple-500" />
                    Yaklaşan Olaylar
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {upcomingEvents.map((event, idx) => {
                    const eventDate = new Date(event.date)
                    return (
                      <div key={idx} className="flex items-start gap-3 pb-2 border-b last:border-0">
                        <div className="text-center min-w-[40px]">
                          <div className="text-lg font-bold text-slate-700">{eventDate.getDate()}</div>
                          <div className="text-xs text-slate-500">{monthNames[eventDate.getMonth()].substring(0, 3)}</div>
                        </div>
                        <p className="text-sm text-slate-700">{event.description}</p>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="retrogrades">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(planets).map(([key, planet]) => {
              const retros = retrogradePeriods.filter(r => r.planet === key)
              return (
                <Card key={key} className="hover:shadow-lg transition-shadow border-2 hover:border-slate-300">
                  <CardHeader className={`${planet.bgColor} rounded-t-lg`}>
                    <CardTitle className={`flex items-center gap-3 ${planet.color}`}>
                      <span className="text-4xl">{planet.symbol}</span>
                      {planet.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    {retros.length === 0 ? (
                      <p className="text-slate-500 text-sm">Bu dönemde retro yok</p>
                    ) : (
                      <div className="space-y-3">
                        {retros.map((retro, idx) => {
                          const startDate = new Date(retro.start)
                          const endDate = new Date(retro.end)
                          const today = new Date()
                          const isActive = today >= startDate && today <= endDate

                          return (
                            <div
                              key={idx}
                              className={`p-3 rounded-lg ${isActive ? 'bg-red-100 border-2 border-red-400 shadow-md' : 'bg-slate-50'}`}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-semibold text-slate-800">{retro.sign}</span>
                                {isActive && (
                                  <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full animate-pulse">AKTİF</span>
                                )}
                              </div>
                              <p className="text-sm text-slate-600">
                                {startDate.getDate()} {monthNames[startDate.getMonth()]} {startDate.getFullYear()} - {endDate.getDate()} {monthNames[endDate.getMonth()]} {endDate.getFullYear()}
                              </p>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Retro Dönemleri Ne Anlama Gelir?</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-amber-50 rounded-lg">
                <h4 className="font-semibold text-amber-800 mb-2">☿ Merkür Retrosu</h4>
                <p className="text-sm text-amber-700">İletişim sorunları, teknoloji aksaklıkları, gecikmeler. Eski ilişkileri gözden geçirme zamanı.</p>
              </div>
              <div className="p-3 bg-pink-50 rounded-lg">
                <h4 className="font-semibold text-pink-800 mb-2">♀ Venüs Retrosu</h4>
                <p className="text-sm text-pink-700">Aşk ve finans konularında yeniden değerlendirme. Eski aşklar geri dönebilir.</p>
              </div>
              <div className="p-3 bg-red-50 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2">♂ Mars Retrosu</h4>
                <p className="text-sm text-red-700">Enerji düşüklüğü, aksiyon almakta zorlanma. İç motivasyonu gözden geçirme.</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg">
                <h4 className="font-semibold text-orange-800 mb-2">♃ Jüpiter Retrosu</h4>
                <p className="text-sm text-orange-700">İç büyüme ve manevi gelişim zamanı. Dış fırsatlar yerine içsel zenginleşme.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">♄ Satürn Retrosu</h4>
                <p className="text-sm text-gray-700">Karma ile yüzleşme, geçmiş sorumlulukları gözden geçirme. Disiplin ve yapı sorgulaması.</p>
              </div>
              <div className="p-3 bg-cyan-50 rounded-lg">
                <h4 className="font-semibold text-cyan-800 mb-2">♅ Uranüs Retrosu</h4>
                <p className="text-sm text-cyan-700">İç devrim, beklenmedik içsel değişimler. Özgürlük ihtiyacının sorgulanması.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="moon">
          <Card className="border-2 border-indigo-200">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-indigo-50">
              <CardTitle className="flex items-center gap-2">
                <Moon className="h-6 w-6 text-indigo-600" />
                2025-2026 Ay Fazları
              </CardTitle>
              <CardDescription>Aralık 2025 - Aralık 2026 arası Yeni Ay ve Dolunay tarihleri</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {moonPhases.map((moon, idx) => {
                  const moonDate = new Date(moon.date)
                  const isPast = moonDate < new Date()

                  return (
                    <Card
                      key={idx}
                      className={`${
                        moon.type === 'new'
                          ? 'bg-gradient-to-br from-slate-800 to-slate-900 text-white border-slate-700'
                          : 'bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 border-yellow-300'
                      } ${isPast ? 'opacity-50' : 'hover:scale-105 transition-transform cursor-pointer'} border-2`}
                    >
                      <CardContent className="pt-4 pb-4">
                        <div className="flex flex-col items-center text-center">
                          <span className="text-3xl mb-2">
                            {moon.type === 'new' ? '🌑' : '🌕'}
                          </span>
                          <h4 className={`font-semibold ${moon.type === 'new' ? 'text-white' : 'text-slate-800'}`}>
                            {moon.type === 'new' ? 'Yeni Ay' : 'Dolunay'}
                          </h4>
                          <p className={`text-sm mb-1 ${moon.type === 'new' ? 'text-slate-300' : 'text-slate-600'}`}>
                            {moon.sign}
                          </p>
                          <div className={`text-xs ${moon.type === 'new' ? 'text-slate-400' : 'text-slate-500'}`}>
                            {moonDate.getDate()} {monthNames[moonDate.getMonth()]} {moonDate.getFullYear()}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tutulmalar Tab */}
        <TabsContent value="eclipses">
          <div className="space-y-6">
            <Card className="border-2 border-amber-200">
              <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50">
                <CardTitle className="flex items-center gap-2 text-amber-700">
                  <Sun className="h-6 w-6" />
                  2026 Tutulmaları
                </CardTitle>
                <CardDescription>Güneş ve Ay tutulmaları - Önemli dönüşüm dönemleri</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {eclipses.map((eclipse, idx) => {
                    const eclipseDate = new Date(eclipse.date)
                    const isPast = eclipseDate < new Date()
                    const isSolar = eclipse.type === 'solar'

                    return (
                      <Card
                        key={idx}
                        className={`${
                          isSolar
                            ? 'bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-100 border-amber-400'
                            : 'bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-100 border-indigo-400'
                        } ${isPast ? 'opacity-50' : 'hover:shadow-lg transition-shadow'} border-2`}
                      >
                        <CardContent className="pt-6 pb-6">
                          <div className="flex items-center gap-4">
                            <div className="text-5xl">
                              {isSolar ? '☀️' : '🌙'}
                            </div>
                            <div>
                              <h4 className={`font-bold text-lg ${isSolar ? 'text-amber-800' : 'text-indigo-800'}`}>
                                {eclipse.description}
                              </h4>
                              <p className={`text-sm ${isSolar ? 'text-amber-600' : 'text-indigo-600'}`}>
                                {eclipseDate.getDate()} {monthNames[eclipseDate.getMonth()]} {eclipseDate.getFullYear()}
                              </p>
                              <p className={`text-xs mt-2 ${isSolar ? 'text-amber-700' : 'text-indigo-700'}`}>
                                {isSolar 
                                  ? '🔥 Yeni başlangıçlar, büyük değişimler için güçlü enerji' 
                                  : '💫 Duygusal arınma, geçmişi bırakma zamanı'}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-indigo-50">
              <CardHeader>
                <CardTitle className="text-purple-700">Tutulmalar Ne Anlama Gelir?</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <h4 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
                    ☀️ Güneş Tutulması
                  </h4>
                  <p className="text-sm text-amber-700">
                    Yeni başlangıçlar, büyük değişimler ve kadersel olayların kapısını açar. 
                    Genellikle 6 ay etkisini gösterir. Yeni projelere başlamak için güçlü bir zamandır.
                  </p>
                </div>
                <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                  <h4 className="font-semibold text-indigo-800 mb-2 flex items-center gap-2">
                    🌙 Ay Tutulması
                  </h4>
                  <p className="text-sm text-indigo-700">
                    Duygusal arınma, bitiş ve sonlanmalar için ideal dönem. 
                    Geçmişte takılı kaldığınız konuları bırakmanıza yardımcı olur. Farkındalık getirir.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

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
            <p>• Takvim sekmesinden aylık astrolojik olayları görüntüleyin</p>
            <p>• Retrolar sekmesinden tüm gezegen retro dönemlerini kontrol edin</p>
            <p>• Ay Fazları sekmesinden yeni ay ve dolunay tarihlerini takip edin</p>
            <p>• Tutulmalar sekmesinden önemli tutulma tarihlerini öğrenin</p>
            <p>• Takvimde renkli kutucuklar önemli astrolojik olayları gösterir</p>
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
            <p>• <strong>Önemli kararlar:</strong> Merkür retrosu olmayan dönemleri tercih edin</p>
            <p>• <strong>Yeni başlangıçlar:</strong> Yeni ay günlerini seçin</p>
            <p>• <strong>Sonlandırma:</strong> Dolunay günleri bitişler için uygun</p>
            <p>• <strong>İlişki kararları:</strong> Venüs retrosu dışındaki dönemleri tercih edin</p>
            <p>• <strong>Kontrat imzalama:</strong> Retro dönemlerinden kaçının</p>
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
            <p>• Retro dönemleri kötü değildir - gözden geçirme ve tamamlama için idealdir</p>
            <p>• Yeni ay: Tohumlama, başlatma enerjisi taşır</p>
            <p>• Dolunay: Tamamlama, hasat ve farkındalık enerjisi verir</p>
            <p>• Tutulmalar 6 ay boyunca etkisini gösterir</p>
            <p>• Gündönümü ve ekinokslar mevsimsel dönüm noktalarıdır</p>
            <p>• Her burç geçişi farklı bir enerji akışı başlatır</p>
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
            <p>• Merkür yılda 3-4 kez retro yapar ve her retro yaklaşık 3 hafta sürer</p>
            <p>• 2026'da 4 tutulma olacak - bunlar önemli değişim dönemleridir</p>
            <p>• Plüton retrosu en uzun süren retrodur (5-6 ay)</p>
            <p>• Venüs retrosu 18 ayda bir gerçekleşir ve 40 gün sürer</p>
            <p>• Ay burcu değişimleri 2,5 günde bir olur</p>
            <p>• Eski zamanlarda çiftçiler ekim-hasat için ay fazlarını takip ederdi</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
