"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Sparkles, TrendingUp, RefreshCw, Copy, Crown, Home, Loader2 } from "lucide-react"
import Link from "next/link"

interface GoldPrices {
  gram24: number
  gram22: number
  gram18: number
  ceyrek: number
  yarim: number
  tam: number
  cumhuriyet: number
  ata: number
  resat: number
  onsUsd: number
  lastUpdate?: string
}

const goldTypes = [
  { id: 'gram24', name: '24 Ayar Altın (Gram)', key: 'gram24', purity: 1, icon: '🥇' },
  { id: 'gram22', name: '22 Ayar Altın (Gram)', key: 'gram22', purity: 0.916, icon: '🥈' },
  { id: 'gram18', name: '18 Ayar Altın (Gram)', key: 'gram18', purity: 0.75, icon: '🥉' },
  { id: 'ceyrek', name: 'Çeyrek Altın', key: 'ceyrek', weight: 1.75, icon: '💰' },
  { id: 'yarim', name: 'Yarım Altın', key: 'yarim', weight: 3.5, icon: '💎' },
  { id: 'tam', name: 'Tam Altın', key: 'tam', weight: 7, icon: '👑' },
]

// Varsayılan fiyatlar (Firestore'dan veri gelmezse)
const DEFAULT_PRICES: GoldPrices = {
  gram24: 3200,
  gram22: 2930,
  gram18: 2400,
  ceyrek: 5200,
  yarim: 10400,
  tam: 20800,
  cumhuriyet: 22000,
  ata: 21500,
  resat: 22500,
  onsUsd: 2650,
}

export function GoldCalculator() {
  const [prices, setPrices] = useState<GoldPrices | null>(null)
  const [loading, setLoading] = useState(true)
  const [amount, setAmount] = useState("1")
  const [selectedType, setSelectedType] = useState("gram24")

  const fetchGoldPrices = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/prices?type=gold')
      const data = await response.json()
      
      if (data.success && data.gold) {
        setPrices({
          ...data.gold,
          lastUpdate: data.gold.lastUpdate 
            ? new Date(data.gold.lastUpdate._seconds * 1000).toLocaleString('tr-TR')
            : new Date().toLocaleString('tr-TR')
        })
      } else {
        // Fallback to default prices
        setPrices({
          ...DEFAULT_PRICES,
          lastUpdate: new Date().toLocaleString('tr-TR')
        })
      }
    } catch (error) {
      console.error('Altın fiyatları alınamadı:', error)
      // Fallback to default prices
      setPrices({
        ...DEFAULT_PRICES,
        lastUpdate: new Date().toLocaleString('tr-TR')
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGoldPrices()
  }, [])

  const calculateTotal = () => {
    if (!prices || !amount) return 0
    const numAmount = parseFloat(amount)
    if (isNaN(numAmount)) return 0
    return numAmount * (prices[selectedType as keyof GoldPrices] as number)
  }

  const total = calculateTotal()
  const currentPrice = prices ? prices[selectedType as keyof GoldPrices] as number : 0
  const selectedGoldType = goldTypes.find(t => t.id === selectedType)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Back to Home Button */}
      <Link href="/">
        <Button variant="outline" className="group hover:border-yellow-400 hover:bg-yellow-50 transition-all">
          <Home className="h-4 w-4 mr-2 group-hover:text-yellow-600" />
          Ana Sayfaya Dön
        </Button>
      </Link>

      {/* Animated Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-yellow-200 to-amber-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-orange-200 to-yellow-200 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <Card className="border-2 border-yellow-100/50 shadow-xl shadow-amber-500/10 backdrop-blur-sm bg-white/80">
        <CardContent className="pt-8 pb-8 px-6 sm:px-8">
          {/* Header Section */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-amber-600 shadow-lg shadow-yellow-500/50 mb-4">
              <Crown className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent mb-2">
              Altın Hesaplama
            </h2>
            <p className="text-slate-600">Güncel altın fiyatlarıyla hesaplama yapın</p>
            {prices && (
              <p className="text-xs text-slate-500 mt-2">
                Son güncelleme: {prices.lastUpdate}
              </p>
            )}
          </div>

          {/* Calculation Area */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Input Section */}
            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                  <Sparkles className="h-4 w-4 text-yellow-600" />
                  Altın Türü Seçin
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {goldTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                        selectedType === type.id
                          ? 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-amber-50 shadow-lg shadow-yellow-500/20'
                          : 'border-slate-200 hover:border-yellow-200 bg-white hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl">{type.icon}</span>
                        <span className={`text-xs font-bold ${
                          selectedType === type.id ? 'text-yellow-700' : 'text-slate-600'
                        }`}>
                          {type.id === 'quarter' || type.id === 'half' || type.id === 'full' ? `${type.weight}g` : type.name.includes('24') ? '99.9%' : type.name.includes('22') ? '91.6%' : '75%'}
                        </span>
                      </div>
                      <p className={`text-sm font-semibold ${
                        selectedType === type.id ? 'text-slate-900' : 'text-slate-700'
                      }`}>
                        {type.name.replace(' (Gram)', '')}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                  <TrendingUp className="h-4 w-4 text-amber-600" />
                  Miktar
                </label>
                <div className="relative group">
                  <Input
                    type="number"
                    placeholder="Miktar girin"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="h-16 text-lg pl-12 border-2 border-slate-200 focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100 transition-all rounded-xl"
                  />
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl">
                    {selectedGoldType?.icon}
                  </span>
                </div>
              </div>

              <Button
                onClick={fetchGoldPrices}
                disabled={loading}
                className="w-full h-12 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white font-semibold rounded-xl shadow-lg shadow-yellow-500/30 hover:shadow-xl hover:shadow-yellow-500/40 transition-all"
              >
                <RefreshCw className={`h-5 w-5 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Fiyatları Yenile
              </Button>
            </div>

            {/* Result Section */}
            <div className="space-y-4">
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 rounded-2xl"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-200 to-amber-200 rounded-full blur-2xl opacity-40"></div>
                
                <div className="relative border-2 border-yellow-200 rounded-2xl p-6 shadow-xl">
                  <div className="flex items-center gap-2 mb-4">
                    <Crown className="h-5 w-5 text-yellow-600" />
                    <p className="text-sm font-semibold text-slate-700">Birim Fiyat</p>
                  </div>
                  <div className="mb-6">
                    <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
                      ₺{currentPrice.toFixed(2)}
                    </p>
                    <p className="text-sm text-slate-600 mt-1">{selectedGoldType?.name}</p>
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-yellow-300 to-transparent mb-6"></div>

                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="h-5 w-5 text-amber-600" />
                    <p className="text-sm font-semibold text-slate-700">Toplam Değer</p>
                  </div>
                  <div className="mb-4">
                    <p className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                      ₺{total.toFixed(2)}
                    </p>
                    <p className="text-sm text-slate-600 mt-1">{amount} x {selectedGoldType?.name}</p>
                  </div>

                  <Button
                    onClick={() => copyToClipboard(total.toFixed(2))}
                    className="w-full bg-white hover:bg-yellow-50 text-yellow-600 border-2 border-yellow-200 hover:border-yellow-300 shadow-sm hover:shadow-md transition-all"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Sonucu Kopyala
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* All Prices Table */}
          {prices && (
            <div className="mt-8">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-yellow-600" />
                Güncel Altın Fiyatları
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {goldTypes.map((type) => {
                  const price = prices[type.key as keyof GoldPrices] as number
                  return (
                    <div
                      key={type.id}
                      className="group p-4 rounded-xl border-2 border-slate-100 hover:border-yellow-200 hover:shadow-lg transition-all cursor-pointer"
                      onClick={() => setSelectedType(type.id)}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl">{type.icon}</span>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-slate-900">{type.name}</p>
                          {(type.purity || type.weight) && (
                            <p className="text-xs text-slate-500">
                              {type.purity ? `Saflık: ${(type.purity * 100).toFixed(1)}%` : `Ağırlık: ${type.weight}g`}
                            </p>
                          )}
                        </div>
                      </div>
                      <p className="text-2xl font-bold text-yellow-600 group-hover:text-yellow-700">
                        ₺{price.toFixed(2)}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Info Tip */}
          <div className="mt-8 p-4 bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl">
            <div className="flex items-start gap-3">
              <Sparkles className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-slate-700">
                <p className="font-semibold text-yellow-900 mb-1">💡 Bilgi</p>
                <p>Fiyatlar piyasa koşullarına göre anlık olarak güncellenir. Alım-satım için kuyumcu ve bankalardan teyit almanızı öneririz.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
