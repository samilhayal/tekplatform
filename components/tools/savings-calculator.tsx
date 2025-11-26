"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { TrendingUp, PiggyBank, Sparkles, BarChart3, Copy, Home } from "lucide-react"
import Link from "next/link"

interface SavingsResult {
  totalSavings: number
  totalDeposits: number
  totalInterest: number
  monthlyBreakdown: {
    month: number
    deposit: number
    interest: number
    balance: number
  }[]
}

export function SavingsCalculator() {
  const [initialDeposit, setInitialDeposit] = useState("10000")
  const [monthlyDeposit, setMonthlyDeposit] = useState("1000")
  const [annualRate, setAnnualRate] = useState("15")
  const [months, setMonths] = useState("12")
  const [result, setResult] = useState<SavingsResult | null>(null)

  const calculateSavings = () => {
    const initial = parseFloat(initialDeposit) || 0
    const monthly = parseFloat(monthlyDeposit) || 0
    const rate = parseFloat(annualRate) / 100 / 12 // Monthly rate
    const period = parseInt(months) || 0

    if (period <= 0) return

    let balance = initial
    let totalDeposits = initial
    const breakdown = []

    for (let month = 1; month <= period; month++) {
      const interest = balance * rate
      balance += interest + monthly
      totalDeposits += monthly

      breakdown.push({
        month,
        deposit: monthly,
        interest,
        balance,
      })
    }

    const totalInterest = balance - totalDeposits

    setResult({
      totalSavings: balance,
      totalDeposits,
      totalInterest,
      monthlyBreakdown: breakdown,
    })
  }

  const resetCalculator = () => {
    setInitialDeposit("10000")
    setMonthlyDeposit("1000")
    setAnnualRate("15")
    setMonths("12")
    setResult(null)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Back to Home Button */}
      <Link href="/">
        <Button variant="outline" className="group hover:border-emerald-400 hover:bg-emerald-50 transition-all">
          <Home className="h-4 w-4 mr-2 group-hover:text-emerald-600" />
          Ana Sayfaya Dön
        </Button>
      </Link>

      {/* Animated Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-green-200 to-emerald-200 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <Card className="border-2 border-emerald-100/50 shadow-xl shadow-emerald-500/10 backdrop-blur-sm bg-white/80">
        <CardContent className="pt-8 pb-8 px-6 sm:px-8">
          {/* Header Section */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/50 mb-4">
              <PiggyBank className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
              Tasarruf Hesaplama
            </h2>
            <p className="text-slate-600">Düzenli tasarrufunuzun geleceğini görün</p>
          </div>

          {/* Input Section */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <PiggyBank className="h-4 w-4 text-emerald-600" />
                Başlangıç Tutarı (₺)
              </label>
              <div className="relative group">
                <Input
                  type="number"
                  placeholder="Örn: 10000"
                  value={initialDeposit}
                  onChange={(e) => setInitialDeposit(e.target.value)}
                  className="h-14 text-lg pl-12 border-2 border-slate-200 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 transition-all rounded-xl"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">💰</span>
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <TrendingUp className="h-4 w-4 text-teal-600" />
                Aylık Katkı (₺)
              </label>
              <div className="relative group">
                <Input
                  type="number"
                  placeholder="Örn: 1000"
                  value={monthlyDeposit}
                  onChange={(e) => setMonthlyDeposit(e.target.value)}
                  className="h-14 text-lg pl-12 border-2 border-slate-200 focus:border-teal-400 focus:ring-4 focus:ring-teal-100 transition-all rounded-xl"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">📈</span>
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <BarChart3 className="h-4 w-4 text-green-600" />
                Yıllık Faiz Oranı (%)
              </label>
              <div className="relative group">
                <Input
                  type="number"
                  step="0.1"
                  placeholder="Örn: 15"
                  value={annualRate}
                  onChange={(e) => setAnnualRate(e.target.value)}
                  className="h-14 text-lg pl-12 border-2 border-slate-200 focus:border-green-400 focus:ring-4 focus:ring-green-100 transition-all rounded-xl"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">%</span>
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Sparkles className="h-4 w-4 text-emerald-600" />
                Süre (Ay)
              </label>
              <div className="relative group">
                <Input
                  type="number"
                  placeholder="Örn: 12"
                  value={months}
                  onChange={(e) => setMonths(e.target.value)}
                  className="h-14 text-lg pl-12 border-2 border-slate-200 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 transition-all rounded-xl"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">📅</span>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <Button
              onClick={calculateSavings}
              className="h-14 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transition-all"
            >
              <BarChart3 className="h-5 w-5 mr-2" />
              Hesapla
            </Button>
            <Button
              onClick={resetCalculator}
              variant="outline"
              className="h-14 border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 font-semibold rounded-xl transition-all"
            >
              Sıfırla
            </Button>
          </div>

          {/* Result Section */}
          {result && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
              {/* Main Results */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl"></div>
                  <div className="relative border-2 border-emerald-200 rounded-2xl p-6 shadow-xl text-center">
                    <PiggyBank className="h-10 w-10 mx-auto text-emerald-600 mb-3" />
                    <p className="text-sm font-semibold text-slate-600 mb-2">Toplam Birikim</p>
                    <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
                      ₺{result.totalSavings.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                    <Button
                      size="sm"
                      onClick={() => copyToClipboard(result.totalSavings.toFixed(2))}
                      className="bg-white hover:bg-emerald-50 text-emerald-600 border-2 border-emerald-200"
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      Kopyala
                    </Button>
                  </div>
                </div>

                <div className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl"></div>
                  <div className="relative border-2 border-teal-200 rounded-2xl p-6 shadow-xl text-center">
                    <TrendingUp className="h-10 w-10 mx-auto text-teal-600 mb-3" />
                    <p className="text-sm font-semibold text-slate-600 mb-2">Toplam Yatırım</p>
                    <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                      ₺{result.totalDeposits.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                    <p className="text-xs text-slate-500 mt-2">Aylık katkılarınız</p>
                  </div>
                </div>

                <div className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl"></div>
                  <div className="relative border-2 border-green-200 rounded-2xl p-6 shadow-xl text-center">
                    <Sparkles className="h-10 w-10 mx-auto text-green-600 mb-3" />
                    <p className="text-sm font-semibold text-slate-600 mb-2">Kazanılan Faiz</p>
                    <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      ₺{result.totalInterest.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                    <p className="text-xs text-slate-500 mt-2">
                      +{((result.totalInterest / result.totalDeposits) * 100).toFixed(1)}% getiri
                    </p>
                  </div>
                </div>
              </div>

              {/* Visual Growth Chart */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200">
                <h3 className="font-bold text-emerald-900 mb-4 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Birikim Büyümesi
                </h3>
                <div className="space-y-2">
                  {result.monthlyBreakdown.filter((_, i) => i % Math.max(1, Math.floor(result.monthlyBreakdown.length / 6)) === 0 || i === result.monthlyBreakdown.length - 1).map((item) => (
                    <div key={item.month} className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-slate-700 w-16">{item.month}. ay</span>
                      <div className="flex-1 bg-slate-200 rounded-full h-8 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-end pr-3 transition-all duration-500"
                          style={{ width: `${(item.balance / result.totalSavings) * 100}%` }}
                        >
                          <span className="text-xs font-bold text-white drop-shadow">
                            ₺{item.balance.toLocaleString('tr-TR', { maximumFractionDigits: 0 })}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary Stats */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-white border-2 border-emerald-100">
                  <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <span className="text-xl">📊</span>
                    Yatırım Özeti
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Başlangıç:</span>
                      <span className="font-bold text-slate-900">₺{parseFloat(initialDeposit).toLocaleString('tr-TR')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Aylık Katkı:</span>
                      <span className="font-bold text-slate-900">₺{parseFloat(monthlyDeposit).toLocaleString('tr-TR')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Toplam Katkı:</span>
                      <span className="font-bold text-emerald-600">₺{result.totalDeposits.toLocaleString('tr-TR')}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-white border-2 border-green-100">
                  <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <span className="text-xl">💹</span>
                    Faiz Özeti
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Yıllık Oran:</span>
                      <span className="font-bold text-slate-900">%{annualRate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Süre:</span>
                      <span className="font-bold text-slate-900">{months} ay</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Toplam Faiz:</span>
                      <span className="font-bold text-green-600">₺{result.totalInterest.toLocaleString('tr-TR')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Info Tip */}
          {!result && (
            <div className="mt-8 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl">
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-slate-700">
                  <p className="font-semibold text-emerald-900 mb-1">💡 Bilgi</p>
                  <p>Düzenli tasarruf ve bileşik faiz gücü ile paranızın nasıl büyüyeceğini görün. Küçük katkılar büyük sonuçlar yaratır!</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
