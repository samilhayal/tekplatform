"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calculator, TrendingUp, Home, Calendar, ArrowRight, Wallet, PiggyBank, BarChart3, AlertCircle, Info, Lightbulb, BookOpen, CheckCircle2, Building2, Banknote, Percent, Scale } from "lucide-react"

export function RentIncreaseCalculator() {
  const [currentRent, setCurrentRent] = useState<string>("")
  const [renewalDate, setRenewalDate] = useState<string>("")
  const [tufeRate, setTufeRate] = useState<string>("64.77")
  const [legalCap, setLegalCap] = useState<string>("25")
  const [useLegalCap, setUseLegalCap] = useState<boolean>(true)
  const [additionalIncrease, setAdditionalIncrease] = useState<string>("0")
  const [calculated, setCalculated] = useState(false)

  const handleCalculate = () => {
    if (!currentRent || parseFloat(currentRent) <= 0) {
      return
    }
    setCalculated(true)
  }

  const handleReset = () => {
    setCurrentRent("")
    setRenewalDate("")
    setTufeRate("64.77")
    setLegalCap("25")
    setAdditionalIncrease("0")
    setCalculated(false)
  }

  const calculateIncreaseRate = (): number => {
    let rate = parseFloat(tufeRate) || 0
    if (useLegalCap) {
      const cap = parseFloat(legalCap) || 0
      rate = Math.min(rate, cap)
    }
    const additional = parseFloat(additionalIncrease) || 0
    return rate + additional
  }

  const calculateNewRent = (): number => {
    const current = parseFloat(currentRent) || 0
    const increaseRate = calculateIncreaseRate()
    return current * (1 + increaseRate / 100)
  }

  const calculateIncrease = (): number => {
    const current = parseFloat(currentRent) || 0
    return calculateNewRent() - current
  }

  const formatCurrency = (amount: number): string => {
    return `₺${amount.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  const getMonthName = (month: number): string => {
    const months = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"]
    return months[month - 1]
  }

  const progress = calculated ? 100 : 0
  const circumference = 2 * Math.PI * 80

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">
      {/* Ana Sayfaya Dön */}
      <Link href="/">
        <Button variant="outline" className="group flex items-center gap-2 hover:gap-3 transition-all hover:border-emerald-300">
          <Home className="h-4 w-4 text-emerald-600 group-hover:-translate-x-1 transition-transform" />
          Ana Sayfaya Dön
        </Button>
      </Link>

      {/* Hero Card */}
      <Card className="border-2 border-emerald-100 shadow-xl overflow-hidden">
        <CardContent className="pt-8 px-6 pb-8">
          <div className="mb-8 text-center">
            <div className="inline-flex w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg mb-4 items-center justify-center animate-pulse">
              <Building2 className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
              Kira Zammı Hesaplayıcı
            </h1>
            <p className="text-slate-600">TÜFE ve yasal tavan oranlarına göre yeni kira bedelinizi hesaplayın</p>
          </div>

          {/* Form Alanları */}
          <div className="space-y-6">
            {/* Mevcut Kira */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-500 rounded-xl">
                  <Wallet className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-blue-900">Mevcut Kira Bedeli</h3>
                  <p className="text-sm text-blue-700">Şu an ödediğiniz aylık kira tutarı</p>
                </div>
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-blue-500">₺</span>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={currentRent}
                  onChange={(e) => { setCurrentRent(e.target.value); setCalculated(false) }}
                  className="h-16 pl-12 text-2xl font-bold border-2 border-blue-300 focus:border-blue-500"
                  placeholder="15.000"
                />
              </div>
            </div>

            {/* Artış Oranları */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-purple-500 rounded-xl">
                  <Percent className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-purple-900">Artış Oranları</h3>
                  <p className="text-sm text-purple-700">TÜFE ve yasal tavan oranlarını belirleyin</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-2 block">TÜFE 12 Aylık Ortalama (%)</label>
                  <div className="relative">
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={tufeRate}
                      onChange={(e) => { setTufeRate(e.target.value); setCalculated(false) }}
                      className="h-14 pr-10 text-lg font-semibold border-2"
                      placeholder="64.77"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-lg font-bold text-purple-500">%</span>
                  </div>
                </div>
                
                {useLegalCap && (
                  <div>
                    <label className="text-sm font-semibold text-slate-700 mb-2 block">Yasal Zam Tavanı (%)</label>
                    <div className="relative">
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={legalCap}
                        onChange={(e) => { setLegalCap(e.target.value); setCalculated(false) }}
                        className="h-14 pr-10 text-lg font-semibold border-2"
                        placeholder="25"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-lg font-bold text-purple-500">%</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Yasal Tavan Toggle */}
              <div 
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${useLegalCap ? 'bg-purple-100 border-purple-400' : 'bg-white border-slate-200'}`}
                onClick={() => { setUseLegalCap(!useLegalCap); setCalculated(false) }}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${useLegalCap ? 'bg-purple-500 border-purple-500' : 'border-slate-300'}`}>
                    {useLegalCap && <CheckCircle2 className="h-5 w-5 text-white" />}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-slate-800 flex items-center gap-2">
                      <Scale className="h-4 w-4" />
                      Yasal Zam Tavanı Uygula
                    </div>
                    <p className="text-sm text-slate-600">Hükümet tarafından belirlenen üst sınır</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hesapla Butonu */}
            <div className="flex gap-3">
              <Button 
                onClick={handleCalculate}
                disabled={!currentRent || parseFloat(currentRent) <= 0}
                className="flex-1 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-lg font-bold shadow-lg hover:shadow-xl transition-all"
              >
                <Calculator className="h-6 w-6 mr-2" />
                Yeni Kirayı Hesapla
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button 
                onClick={handleReset}
                variant="outline"
                className="h-16 px-6 border-2"
              >
                Sıfırla
              </Button>
            </div>
          </div>

          {/* Sonuçlar */}
          {calculated && (
            <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {/* Ana Sonuç Kartı - SVG Circular */}
              <div className="p-8 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
                <div className="flex flex-col md:flex-row items-center justify-around gap-8">
                  {/* Circular Progress */}
                  <div className="relative">
                    <svg width="200" height="200" className="transform -rotate-90">
                      <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="16" />
                      <circle 
                        cx="100" cy="100" r="80" 
                        fill="none" 
                        stroke="white" 
                        strokeWidth="16" 
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference - (calculateIncreaseRate() / 100) * circumference}
                        strokeLinecap="round"
                        className="transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-bold">%{calculateIncreaseRate().toFixed(1)}</span>
                      <span className="text-sm opacity-80">Artış Oranı</span>
                    </div>
                  </div>

                  {/* Sonuç Bilgileri */}
                  <div className="text-center md:text-left space-y-4">
                    <div>
                      <p className="text-emerald-100 text-sm mb-1">Mevcut Kira</p>
                      <p className="text-2xl font-bold line-through opacity-70">{formatCurrency(parseFloat(currentRent) || 0)}</p>
                    </div>
                    <div>
                      <p className="text-emerald-100 text-sm mb-1">Yeni Kira</p>
                      <p className="text-5xl font-bold">{formatCurrency(calculateNewRent())}</p>
                    </div>
                    <div className="inline-block px-4 py-2 bg-white/20 rounded-full">
                      <span className="font-semibold">+{formatCurrency(calculateIncrease())} artış</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detay Kartları */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-6 rounded-xl bg-blue-50 border-2 border-blue-200 text-center">
                  <Wallet className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-sm text-slate-600 mb-1">Eski Kira</p>
                  <p className="text-2xl font-bold text-blue-600">{formatCurrency(parseFloat(currentRent) || 0)}</p>
                </div>
                <div className="p-6 rounded-xl bg-emerald-50 border-2 border-emerald-200 text-center">
                  <Banknote className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
                  <p className="text-sm text-slate-600 mb-1">Yeni Kira</p>
                  <p className="text-2xl font-bold text-emerald-600">{formatCurrency(calculateNewRent())}</p>
                </div>
                <div className="p-6 rounded-xl bg-purple-50 border-2 border-purple-200 text-center">
                  <TrendingUp className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <p className="text-sm text-slate-600 mb-1">Fark</p>
                  <p className="text-2xl font-bold text-purple-600">+{formatCurrency(calculateIncrease())}</p>
                </div>
              </div>

              {/* Yıllık Özet */}
              <div className="p-6 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200">
                <div className="flex items-center gap-3 mb-4">
                  <PiggyBank className="h-8 w-8 text-amber-600" />
                  <h3 className="font-bold text-amber-900 text-lg">Yıllık Özet</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white rounded-lg">
                    <p className="text-sm text-slate-600 mb-1">Eski Yıllık Toplam</p>
                    <p className="text-xl font-bold text-slate-700">{formatCurrency((parseFloat(currentRent) || 0) * 12)}</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg">
                    <p className="text-sm text-slate-600 mb-1">Yeni Yıllık Toplam</p>
                    <p className="text-xl font-bold text-amber-600">{formatCurrency(calculateNewRent() * 12)}</p>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-amber-100 rounded-lg text-center">
                  <p className="text-sm text-amber-800 mb-1">Yıllık Fark</p>
                  <p className="text-2xl font-bold text-amber-700">+{formatCurrency(calculateIncrease() * 12)}</p>
                </div>
              </div>

              {/* Görsel Karşılaştırma */}
              <div className="p-6 rounded-xl bg-slate-50 border-2 border-slate-200">
                <div className="flex items-center gap-3 mb-4">
                  <BarChart3 className="h-6 w-6 text-slate-600" />
                  <h3 className="font-bold text-slate-800">Görsel Karşılaştırma</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-600 font-medium">Eski Kira</span>
                      <span className="font-bold">{formatCurrency(parseFloat(currentRent) || 0)}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-8 overflow-hidden">
                      <div className="bg-gradient-to-r from-blue-400 to-blue-500 h-8 rounded-full flex items-center justify-end pr-3 transition-all duration-1000" style={{ width: '75%' }}>
                        <span className="text-white text-xs font-semibold">100%</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-600 font-medium">Yeni Kira</span>
                      <span className="font-bold">{formatCurrency(calculateNewRent())}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-8 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-emerald-400 to-teal-500 h-8 rounded-full flex items-center justify-end pr-3 transition-all duration-1000" 
                        style={{ width: '100%' }}
                      >
                        <span className="text-white text-xs font-semibold">+{calculateIncreaseRate().toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 12 Aylık Takvim */}
              <div className="p-6 rounded-xl bg-white border-2 border-slate-200">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="h-6 w-6 text-slate-600" />
                  <h3 className="font-bold text-slate-800">12 Aylık Ödeme Takvimi</h3>
                </div>
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {Array.from({ length: 12 }, (_, i) => (
                    <div key={i} className="p-3 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg border border-slate-200 text-center hover:shadow-md transition-shadow">
                      <p className="text-xs text-slate-500 mb-1">{getMonthName(i + 1)}</p>
                      <p className="text-sm font-bold text-slate-700">{formatCurrency(calculateNewRent())}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bilgi Kartları */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-2 border-emerald-100">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <BookOpen className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-bold mb-2">Nasıl Hesaplanır?</h3>
                <ol className="text-sm text-slate-600 space-y-1 list-decimal list-inside">
                  <li>Mevcut kira bedelinizi girin</li>
                  <li>TÜFE oranını kontrol edin</li>
                  <li>Yasal tavan varsa uygulayın</li>
                  <li>Yeni kira otomatik hesaplanır</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-teal-100">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-teal-100 rounded-lg">
                <Lightbulb className="h-5 w-5 text-teal-600" />
              </div>
              <div>
                <h3 className="font-bold mb-2">Örnek</h3>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li><strong>15.000₺ kira:</strong> %25 artış = 18.750₺</li>
                  <li><strong>20.000₺ kira:</strong> %25 artış = 25.000₺</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-blue-100">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <AlertCircle className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold mb-2">Önemli Bilgi</h3>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>Kira artışı yıllık olarak uygulanır</li>
                  <li>Yasal tavan hükümet kararıdır</li>
                  <li>TÜFE oranı TÜİK'ten alınır</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-purple-100">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Info className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold mb-2">Yasal Uyarı</h3>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>Hesaplama bilgi amaçlıdır</li>
                  <li>Kesin bilgi için avukata danışın</li>
                  <li>Güncel oranları TÜİK'ten kontrol edin</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
