"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Clock } from "lucide-react"

interface Timezone {
  city: string;
  timezone: string;
  offset: number;
}

const timezones: Timezone[] = [
  { city: "İstanbul", timezone: "Europe/Istanbul", offset: 3 },
  { city: "New York", timezone: "America/New_York", offset: -5 },
  { city: "London", timezone: "Europe/London", offset: 0 },
  { city: "Tokyo", timezone: "Asia/Tokyo", offset: 9 },
  { city: "Dubai", timezone: "Asia/Dubai", offset: 4 },
  { city: "Los Angeles", timezone: "America/Los_Angeles", offset: -8 },
  { city: "Paris", timezone: "Europe/Paris", offset: 1 },
  { city: "Sydney", timezone: "Australia/Sydney", offset: 11 },
  { city: "Moscow", timezone: "Europe/Moscow", offset: 3 },
  { city: "Beijing", timezone: "Asia/Shanghai", offset: 8 },
]

export function TimezoneConverter() {
  const [currentTime, setCurrentTime] = useState(new Date())

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
    }).format(currentTime)
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {timezones.map((tz) => {
              const time = getTimeForTimezone(tz)
              const date = getDateForTimezone(tz)
              
              return (
                <div
                  key={tz.city}
                  className="p-6 rounded-xl border-2 border-slate-200 bg-gradient-to-br from-white to-slate-50 hover:border-indigo-300 transition-all hover:shadow-md"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="h-5 w-5 text-indigo-600" />
                    <h3 className="font-semibold text-slate-900">{tz.city}</h3>
                  </div>
                  
                  <div className="mb-2">
                    <p className="text-3xl font-bold text-indigo-600 font-mono">
                      {time}
                    </p>
                  </div>
                  
                  <div className="text-sm text-slate-600">
                    {date}
                  </div>
                  
                  <div className="mt-3 text-xs text-slate-500">
                    UTC {tz.offset >= 0 ? '+' : ''}{tz.offset}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
