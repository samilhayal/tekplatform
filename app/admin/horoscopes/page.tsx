'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { 
  Star, Save, RefreshCw, Calendar, CalendarDays, 
  CalendarRange, CalendarClock, Sparkles
} from 'lucide-react'

const BURCLAR = [
  { id: 'koc', name: 'Koç', icon: '♈', dates: '21 Mart - 19 Nisan' },
  { id: 'boga', name: 'Boğa', icon: '♉', dates: '20 Nisan - 20 Mayıs' },
  { id: 'ikizler', name: 'İkizler', icon: '♊', dates: '21 Mayıs - 20 Haziran' },
  { id: 'yengec', name: 'Yengeç', icon: '♋', dates: '21 Haziran - 22 Temmuz' },
  { id: 'aslan', name: 'Aslan', icon: '♌', dates: '23 Temmuz - 22 Ağustos' },
  { id: 'basak', name: 'Başak', icon: '♍', dates: '23 Ağustos - 22 Eylül' },
  { id: 'terazi', name: 'Terazi', icon: '♎', dates: '23 Eylül - 22 Ekim' },
  { id: 'akrep', name: 'Akrep', icon: '♏', dates: '23 Ekim - 21 Kasım' },
  { id: 'yay', name: 'Yay', icon: '♐', dates: '22 Kasım - 21 Aralık' },
  { id: 'oglak', name: 'Oğlak', icon: '♑', dates: '22 Aralık - 19 Ocak' },
  { id: 'kova', name: 'Kova', icon: '♒', dates: '20 Ocak - 18 Şubat' },
  { id: 'balik', name: 'Balık', icon: '♓', dates: '19 Şubat - 20 Mart' }
]

const PERIOD_TYPES = [
  { id: 'daily', name: 'Günlük', icon: Calendar },
  { id: 'weekly', name: 'Haftalık', icon: CalendarDays },
  { id: 'monthly', name: 'Aylık', icon: CalendarRange },
  { id: 'yearly', name: 'Yıllık', icon: CalendarClock }
]

interface HoroscopeData {
  [burcId: string]: {
    general: string
    love: string
    career: string
    health: string
    luckyNumbers?: string
    luckyColor?: string
  }
}

export default function HoroscopesPage() {
  const [activeTab, setActiveTab] = useState('daily')
  const [selectedBurc, setSelectedBurc] = useState('koc')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [horoscopes, setHoroscopes] = useState<Record<string, HoroscopeData>>({
    daily: {},
    weekly: {},
    monthly: {},
    yearly: {}
  })

  // Load horoscopes from API
  useEffect(() => {
    const loadHoroscopes = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/admin/horoscopes')
        const data = await response.json()
        
        if (data.success) {
          setHoroscopes(data.horoscopes)
        }
      } catch (error) {
        console.error('Error loading horoscopes:', error)
        setMessage('❌ Veriler yüklenemedi')
      } finally {
        setLoading(false)
      }
    }

    loadHoroscopes()
  }, [])

  const getCurrentHoroscope = () => {
    return horoscopes[activeTab]?.[selectedBurc] || {
      general: '',
      love: '',
      career: '',
      health: '',
      luckyNumbers: '',
      luckyColor: ''
    }
  }

  const updateHoroscope = (field: string, value: string) => {
    setHoroscopes(prev => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        [selectedBurc]: {
          ...prev[activeTab]?.[selectedBurc],
          [field]: value
        }
      }
    }))
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      const response = await fetch('/api/admin/horoscopes', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          period: activeTab,
          burcId: selectedBurc,
          data: getCurrentHoroscope()
        })
      })

      const result = await response.json()

      if (result.success) {
        setMessage('✓ Kaydedildi')
        setTimeout(() => setMessage(''), 3000)
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      console.error('Error saving:', error)
      setMessage('❌ Kaydetme hatası')
    } finally {
      setSaving(false)
    }
  }

  const currentData = getCurrentHoroscope()
  const currentBurc = BURCLAR.find(b => b.id === selectedBurc)

  return (
    <div className="p-8">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-purple-600" />
            Burç Yorumları
          </h1>
          <p className="text-slate-600">Günlük, haftalık, aylık ve yıllık burç yorumlarını yönetin</p>
        </div>
        {message && (
          <Badge variant={message.includes('✓') ? 'default' : 'destructive'} className="px-4 py-2">
            {message}
          </Badge>
        )}
      </div>

      {loading ? (
        <Card className="p-12 text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-purple-600" />
          <p className="text-slate-500">Yükleniyor...</p>
        </Card>
      ) : (
        <>
          {/* Period Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid grid-cols-4 w-full max-w-2xl">
              {PERIOD_TYPES.map(period => (
                <TabsTrigger key={period.id} value={period.id} className="flex items-center gap-2">
                  <period.icon className="w-4 h-4" />
                  {period.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Burç Selection Sidebar */}
            <Card className="p-4 lg:col-span-1">
              <h3 className="font-semibold text-slate-700 mb-4 flex items-center gap-2">
                <Star className="w-4 h-4" />
                Burç Seçin
              </h3>
              <div className="space-y-2">
                {BURCLAR.map(burc => (
                  <button
                    key={burc.id}
                    onClick={() => setSelectedBurc(burc.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
                      selectedBurc === burc.id
                        ? 'bg-purple-100 text-purple-700 border-2 border-purple-400'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <span className="text-2xl">{burc.icon}</span>
                    <div>
                      <div className="font-medium">{burc.name}</div>
                      <div className="text-xs text-slate-500">{burc.dates}</div>
                    </div>
                    {horoscopes[activeTab]?.[burc.id]?.general && (
                      <Badge variant="outline" className="ml-auto text-xs">✓</Badge>
                    )}
                  </button>
                ))}
              </div>
            </Card>

            {/* Editor */}
            <Card className="p-6 lg:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{currentBurc?.icon}</span>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">{currentBurc?.name}</h2>
                    <p className="text-slate-500">
                      {PERIOD_TYPES.find(p => p.id === activeTab)?.name} Yorum
                    </p>
                  </div>
                </div>
                <Button onClick={handleSave} disabled={saving} className="bg-purple-600 hover:bg-purple-700">
                  {saving ? (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  Kaydet
                </Button>
              </div>

              <div className="space-y-6">
                {/* Genel Yorum */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Genel Yorum
                  </label>
                  <Textarea
                    value={currentData.general}
                    onChange={(e) => updateHoroscope('general', e.target.value)}
                    placeholder="Bu burç için genel yorum yazın..."
                    className="min-h-[120px]"
                  />
                </div>

                {/* Aşk */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    💕 Aşk & İlişkiler
                  </label>
                  <Textarea
                    value={currentData.love}
                    onChange={(e) => updateHoroscope('love', e.target.value)}
                    placeholder="Aşk ve ilişkiler hakkında yorum..."
                    className="min-h-[100px]"
                  />
                </div>

                {/* Kariyer */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    💼 Kariyer & İş
                  </label>
                  <Textarea
                    value={currentData.career}
                    onChange={(e) => updateHoroscope('career', e.target.value)}
                    placeholder="Kariyer ve iş hayatı hakkında yorum..."
                    className="min-h-[100px]"
                  />
                </div>

                {/* Sağlık */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    🏥 Sağlık
                  </label>
                  <Textarea
                    value={currentData.health}
                    onChange={(e) => updateHoroscope('health', e.target.value)}
                    placeholder="Sağlık hakkında yorum..."
                    className="min-h-[100px]"
                  />
                </div>

                {/* Extra Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      🎰 Şanslı Sayılar
                    </label>
                    <input
                      type="text"
                      value={currentData.luckyNumbers || ''}
                      onChange={(e) => updateHoroscope('luckyNumbers', e.target.value)}
                      placeholder="3, 7, 12, 21"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      🎨 Şanslı Renk
                    </label>
                    <input
                      type="text"
                      value={currentData.luckyColor || ''}
                      onChange={(e) => updateHoroscope('luckyColor', e.target.value)}
                      placeholder="Mavi, Yeşil"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </>
      )}
    </div>
  )
}
