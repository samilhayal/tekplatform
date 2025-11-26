"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowLeftRight, DollarSign, TrendingUp, RefreshCw, Sparkles, Copy, Home } from "lucide-react"
import Link from "next/link"

// Popular currencies
const currencies = [
  { code: 'USD', name: 'ABD Doları', symbol: '$', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  { code: 'GBP', name: 'İngiliz Sterlini', symbol: '£', flag: '🇬🇧' },
  { code: 'TRY', name: 'Türk Lirası', symbol: '₺', flag: '🇹🇷' },
  { code: 'JPY', name: 'Japon Yeni', symbol: '¥', flag: '🇯🇵' },
  { code: 'CHF', name: 'İsviçre Frangı', symbol: 'Fr', flag: '🇨🇭' },
  { code: 'CAD', name: 'Kanada Doları', symbol: 'C$', flag: '🇨🇦' },
  { code: 'AUD', name: 'Avustralya Doları', symbol: 'A$', flag: '🇦🇺' },
  { code: 'CNY', name: 'Çin Yuanı', symbol: '¥', flag: '🇨🇳' },
  { code: 'INR', name: 'Hint Rupisi', symbol: '₹', flag: '🇮🇳' },
  { code: 'RUB', name: 'Rus Rublesi', symbol: '₽', flag: '🇷🇺' },
  { code: 'SAR', name: 'Suudi Riyali', symbol: 'ر.س', flag: '🇸🇦' },
  { code: 'AED', name: 'BAE Dirhemi', symbol: 'د.إ', flag: '🇦🇪' },
  { code: 'KRW', name: 'Güney Kore Wonu', symbol: '₩', flag: '🇰🇷' },
  { code: 'SEK', name: 'İsveç Kronu', symbol: 'kr', flag: '🇸🇪' },
]

interface ExchangeRates {
  [key: string]: number
}

export function CurrencyConverter() {
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("TRY")
  const [amount, setAmount] = useState("100")
  const [result, setResult] = useState<number | null>(null)
  const [rates, setRates] = useState<ExchangeRates>({})
  const [loading, setLoading] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<string>("")

  const fetchRates = async () => {
    setLoading(true)
    try {
      // Check if admin has set custom rates for TRY pairs
      let customRates: ExchangeRates = {}
      
      if (typeof window !== 'undefined') {
        const storedPrices = localStorage.getItem('adminPrices')
        if (storedPrices) {
          try {
            const prices = JSON.parse(storedPrices)
            if (prices.currency) {
              // If we have admin rates and converting from/to TRY
              if (fromCurrency === 'TRY' || toCurrency === 'TRY') {
                customRates = {
                  'USD': prices.currency.usdTry || 34.50,
                  'EUR': prices.currency.eurTry || 37.20,
                  'GBP': prices.currency.gbpTry || 43.50,
                  'TRY': 1
                }
              }
            }
          } catch (error) {
            console.error('Failed to load admin currency rates:', error)
          }
        }
      }
      
      // If we have custom rates for this conversion, use them
      if (Object.keys(customRates).length > 0 && (fromCurrency === 'TRY' || toCurrency === 'TRY')) {
        if (fromCurrency === 'TRY') {
          // Convert TRY to others
          const converted: ExchangeRates = { 'TRY': 1 }
          Object.keys(customRates).forEach(code => {
            if (code !== 'TRY') {
              converted[code] = 1 / customRates[code]
            }
          })
          setRates(converted)
        } else {
          // Convert others to TRY
          setRates(customRates)
        }
        setLastUpdate(new Date().toLocaleString('tr-TR') + ' (Admin)')
      } else {
        // Use API for other conversions
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
        const data = await response.json()
        setRates(data.rates)
        setLastUpdate(new Date().toLocaleString('tr-TR'))
      }
    } catch (error) {
      console.error('Kur bilgileri alınamadı:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRates()
  }, [fromCurrency])

  useEffect(() => {
    if (amount && rates[toCurrency]) {
      const numAmount = parseFloat(amount)
      if (!isNaN(numAmount)) {
        setResult(numAmount * rates[toCurrency])
      }
    }
  }, [amount, rates, toCurrency])

  const swapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const getFromCurrency = currencies.find(c => c.code === fromCurrency)
  const getToCurrency = currencies.find(c => c.code === toCurrency)

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Back to Home Button */}
      <Link href="/">
        <Button variant="outline" className="group hover:border-green-400 hover:bg-green-50 transition-all">
          <Home className="h-4 w-4 mr-2 group-hover:text-green-600" />
          Ana Sayfaya Dön
        </Button>
      </Link>

      {/* Animated Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-200 to-emerald-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-200 to-cyan-200 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <Card className="border-2 border-green-100/50 shadow-xl shadow-green-500/10 backdrop-blur-sm bg-white/80">
        <CardContent className="pt-8 pb-8 px-6 sm:px-8">
          {/* Header Section */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/50 mb-4">
              <DollarSign className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
              Döviz Kurları Dönüştürücü
            </h2>
            <p className="text-slate-600">Güncel kurlarla para birimi dönüşümü yapın</p>
            {lastUpdate && (
              <p className="text-xs text-slate-500 mt-2">
                Son güncelleme: {lastUpdate}
              </p>
            )}
          </div>

          {/* Conversion Area */}
          <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6 items-center mb-8">
            {/* From Currency */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Sparkles className="h-4 w-4 text-green-600" />
                Çevrilecek Miktar
              </label>
              <div className="relative group">
                <Input
                  type="number"
                  placeholder="Miktar girin"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="h-16 text-lg pl-12 border-2 border-slate-200 focus:border-green-400 focus:ring-4 focus:ring-green-100 transition-all rounded-xl"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl">
                  {getFromCurrency?.flag}
                </span>
              </div>
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger className="h-12 text-base border-2 border-slate-200 hover:border-green-300 focus:border-green-400 focus:ring-4 focus:ring-green-100 rounded-xl transition-all">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {currencies.map((currency) => (
                    <SelectItem 
                      key={currency.code} 
                      value={currency.code}
                      className="cursor-pointer hover:bg-green-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{currency.flag}</span>
                        <span className="font-medium">{currency.code}</span>
                        <span className="text-slate-500 text-sm">- {currency.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center md:mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={swapCurrencies}
                className="h-14 w-14 rounded-full border-2 border-green-200 hover:border-green-400 hover:bg-green-50 hover:scale-110 hover:rotate-180 transition-all duration-300 shadow-lg shadow-green-500/20 group"
              >
                <ArrowLeftRight className="h-6 w-6 text-green-600 group-hover:text-green-700" />
              </Button>
            </div>

            {/* To Currency */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <TrendingUp className="h-4 w-4 text-emerald-600" />
                Dönüştürülen Miktar
              </label>
              <div className="relative group">
                <Input
                  type="text"
                  value={result ? result.toFixed(2) : '0.00'}
                  readOnly
                  className="h-16 text-lg pl-12 border-2 border-slate-200 rounded-xl bg-gradient-to-r from-white to-green-50/30 font-bold text-green-700"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl">
                  {getToCurrency?.flag}
                </span>
              </div>
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger className="h-12 text-base border-2 border-slate-200 hover:border-emerald-300 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 rounded-xl transition-all">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {currencies.map((currency) => (
                    <SelectItem 
                      key={currency.code} 
                      value={currency.code}
                      className="cursor-pointer hover:bg-emerald-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{currency.flag}</span>
                        <span className="font-medium">{currency.code}</span>
                        <span className="text-slate-500 text-sm">- {currency.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Result Display */}
          {result !== null && (
            <div className="relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 mb-6">
              {/* Decorative Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-cyan-50 rounded-2xl"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-200 to-emerald-200 rounded-full blur-2xl opacity-40"></div>
              
              {/* Content */}
              <div className="relative border-2 border-green-200 rounded-2xl p-8 shadow-xl text-center">
                <p className="text-sm font-medium text-slate-600 mb-4">Dönüşüm Sonucu</p>
                <div className="flex items-center justify-center gap-4 flex-wrap mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      {amount}
                    </span>
                    <span className="text-xl font-semibold text-green-600">{fromCurrency}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white/80 shadow-sm">
                    <ArrowLeftRight className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                      {result.toFixed(2)}
                    </span>
                    <span className="text-xl font-semibold text-emerald-600">{toCurrency}</span>
                  </div>
                </div>
                <p className="text-sm text-slate-600 mb-4">
                  Kur: 1 {fromCurrency} = {rates[toCurrency]?.toFixed(4)} {toCurrency}
                </p>
                <div className="flex gap-3 justify-center">
                  <Button 
                    size="sm" 
                    onClick={() => copyToClipboard(result.toFixed(2))}
                    className="bg-white hover:bg-green-50 text-green-600 border-2 border-green-200 hover:border-green-300 shadow-sm hover:shadow-md transition-all"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Sonucu Kopyala
                  </Button>
                  <Button 
                    size="sm"
                    variant="outline"
                    onClick={fetchRates}
                    disabled={loading}
                    className="hover:bg-slate-50"
                  >
                    <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                    Kurları Yenile
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Popular Rates */}
          {rates && Object.keys(rates).length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Popüler Kurlar ({fromCurrency} Bazında)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {currencies.slice(0, 8).filter(c => c.code !== fromCurrency).map((currency) => (
                  <div 
                    key={currency.code}
                    className="p-4 rounded-xl border-2 border-slate-100 hover:border-green-200 hover:shadow-md transition-all cursor-pointer group"
                    onClick={() => setToCurrency(currency.code)}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{currency.flag}</span>
                      <span className="font-bold text-slate-900">{currency.code}</span>
                    </div>
                    <p className="text-xl font-bold text-green-600 group-hover:text-green-700">
                      {rates[currency.code]?.toFixed(4)}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">{currency.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Info Tip */}
          {!result && (
            <div className="mt-8 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl">
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-slate-700">
                  <p className="font-semibold text-green-900 mb-1">💡 Bilgi</p>
                  <p>Döviz kurları gerçek zamanlı olarak güncellenir. Miktar girin ve anında dönüşümü görün!</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
