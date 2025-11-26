"use client"

import { useState } from "react"
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
import { Banknote, CreditCard, TrendingUp, Calculator, Sparkles, Copy, PieChart, Home } from "lucide-react"
import Link from "next/link"

interface LoanResult {
  monthlyPayment: number
  totalPayment: number
  totalInterest: number
  schedule: {
    month: number
    payment: number
    principal: number
    interest: number
    balance: number
  }[]
}

const loanTypes = [
  { id: 'housing', name: 'Konut Kredisi', icon: '🏠', color: 'blue' },
  { id: 'car', name: 'Taşıt Kredisi', icon: '🚗', color: 'green' },
  { id: 'personal', name: 'İhtiyaç Kredisi', icon: '💳', color: 'purple' },
  { id: 'business', name: 'İşletme Kredisi', icon: '💼', color: 'orange' },
]

export function LoanCalculator() {
  const [principal, setPrincipal] = useState("100000")
  const [interestRate, setInterestRate] = useState("2.5")
  const [term, setTerm] = useState("12")
  const [loanType, setLoanType] = useState("housing")
  const [result, setResult] = useState<LoanResult | null>(null)
  const [showSchedule, setShowSchedule] = useState(false)

  const calculateLoan = () => {
    const p = parseFloat(principal)
    const r = parseFloat(interestRate) / 100 // Monthly interest rate
    const n = parseInt(term)

    if (isNaN(p) || isNaN(r) || isNaN(n) || p <= 0 || r < 0 || n <= 0) {
      return
    }

    // Calculate monthly payment using formula: M = P * [r(1+r)^n] / [(1+r)^n - 1]
    let monthlyPayment: number
    if (r === 0) {
      monthlyPayment = p / n
    } else {
      monthlyPayment = p * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    }

    const totalPayment = monthlyPayment * n
    const totalInterest = totalPayment - p

    // Generate amortization schedule
    const schedule = []
    let balance = p
    for (let month = 1; month <= n; month++) {
      const interestPayment = balance * r
      const principalPayment = monthlyPayment - interestPayment
      balance -= principalPayment

      schedule.push({
        month,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, balance),
      })
    }

    setResult({ monthlyPayment, totalPayment, totalInterest, schedule })
    setShowSchedule(false)
  }

  const resetCalculator = () => {
    setPrincipal("100000")
    setInterestRate("2.5")
    setTerm("12")
    setResult(null)
    setShowSchedule(false)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const selectedLoanType = loanTypes.find(t => t.id === loanType)

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Back to Home Button */}
      <Link href="/">
        <Button variant="outline" className="group hover:border-blue-400 hover:bg-blue-50 transition-all">
          <Home className="h-4 w-4 mr-2 group-hover:text-blue-600" />
          Ana Sayfaya Dön
        </Button>
      </Link>

      {/* Animated Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-cyan-200 to-blue-200 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <Card className="border-2 border-blue-100/50 shadow-xl shadow-blue-500/10 backdrop-blur-sm bg-white/80">
        <CardContent className="pt-8 pb-8 px-6 sm:px-8">
          {/* Header Section */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/50 mb-4">
              <CreditCard className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              Kredi Hesaplama
            </h2>
            <p className="text-slate-600">Aylık ödeme ve toplam maliyetinizi hesaplayın</p>
          </div>

          {/* Loan Type Selection */}
          <div className="mb-6">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
              <Sparkles className="h-4 w-4 text-blue-600" />
              Kredi Türü
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {loanTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setLoanType(type.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    loanType === type.id
                      ? `border-${type.color}-400 bg-gradient-to-br from-${type.color}-50 to-${type.color}-100 shadow-lg shadow-${type.color}-500/20`
                      : 'border-slate-200 hover:border-blue-200 bg-white hover:shadow-md'
                  }`}
                >
                  <div className="text-3xl mb-2">{type.icon}</div>
                  <p className={`text-sm font-semibold ${
                    loanType === type.id ? `text-${type.color}-700` : 'text-slate-700'
                  }`}>
                    {type.name}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Input Section */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Banknote className="h-4 w-4 text-blue-600" />
                Kredi Tutarı (₺)
              </label>
              <div className="relative group">
                <Input
                  type="number"
                  placeholder="Örn: 100000"
                  value={principal}
                  onChange={(e) => setPrincipal(e.target.value)}
                  className="h-14 text-lg pl-12 border-2 border-slate-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all rounded-xl"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">💰</span>
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <TrendingUp className="h-4 w-4 text-indigo-600" />
                Aylık Faiz Oranı (%)
              </label>
              <div className="relative group">
                <Input
                  type="number"
                  step="0.1"
                  placeholder="Örn: 2.5"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  className="h-14 text-lg pl-12 border-2 border-slate-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all rounded-xl"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">📊</span>
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Calculator className="h-4 w-4 text-cyan-600" />
                Vade (Ay)
              </label>
              <div className="relative group">
                <Input
                  type="number"
                  placeholder="Örn: 12"
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  className="h-14 text-lg pl-12 border-2 border-slate-200 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100 transition-all rounded-xl"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">📅</span>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <Button
              onClick={calculateLoan}
              className="h-14 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all"
            >
              <Calculator className="h-5 w-5 mr-2" />
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
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl"></div>
                  <div className="relative border-2 border-blue-200 rounded-2xl p-6 shadow-xl text-center">
                    <CreditCard className="h-10 w-10 mx-auto text-blue-600 mb-3" />
                    <p className="text-sm font-semibold text-slate-600 mb-2">Aylık Ödeme</p>
                    <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                      ₺{result.monthlyPayment.toFixed(2)}
                    </p>
                    <Button
                      size="sm"
                      onClick={() => copyToClipboard(result.monthlyPayment.toFixed(2))}
                      className="bg-white hover:bg-blue-50 text-blue-600 border-2 border-blue-200"
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      Kopyala
                    </Button>
                  </div>
                </div>

                <div className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl"></div>
                  <div className="relative border-2 border-indigo-200 rounded-2xl p-6 shadow-xl text-center">
                    <Banknote className="h-10 w-10 mx-auto text-indigo-600 mb-3" />
                    <p className="text-sm font-semibold text-slate-600 mb-2">Toplam Ödeme</p>
                    <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      ₺{result.totalPayment.toFixed(2)}
                    </p>
                    <p className="text-xs text-slate-500 mt-2">{term} ay boyunca</p>
                  </div>
                </div>

                <div className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl"></div>
                  <div className="relative border-2 border-purple-200 rounded-2xl p-6 shadow-xl text-center">
                    <TrendingUp className="h-10 w-10 mx-auto text-purple-600 mb-3" />
                    <p className="text-sm font-semibold text-slate-600 mb-2">Toplam Faiz</p>
                    <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      ₺{result.totalInterest.toFixed(2)}
                    </p>
                    <p className="text-xs text-slate-500 mt-2">
                      {((result.totalInterest / parseFloat(principal)) * 100).toFixed(1)}% maliyet
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment Breakdown */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200">
                <div className="flex items-start gap-3 mb-4">
                  <PieChart className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-bold text-blue-900 mb-2">Ödeme Dağılımı</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-white/80 border border-blue-100">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold text-slate-700">Anapara</span>
                          <span className="text-lg font-bold text-blue-600">₺{parseFloat(principal).toFixed(2)}</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${(parseFloat(principal) / result.totalPayment) * 100}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-slate-600 mt-1">
                          {((parseFloat(principal) / result.totalPayment) * 100).toFixed(1)}% toplam ödemeden
                        </p>
                      </div>
                      <div className="p-4 rounded-xl bg-white/80 border border-purple-100">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold text-slate-700">Faiz</span>
                          <span className="text-lg font-bold text-purple-600">₺{result.totalInterest.toFixed(2)}</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-purple-500 to-pink-600 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${(result.totalInterest / result.totalPayment) * 100}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-slate-600 mt-1">
                          {((result.totalInterest / result.totalPayment) * 100).toFixed(1)}% toplam ödemeden
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Amortization Schedule Toggle */}
              <div className="text-center">
                <Button
                  onClick={() => setShowSchedule(!showSchedule)}
                  variant="outline"
                  className="border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50"
                >
                  {showSchedule ? '📊 Tabloyu Gizle' : '📊 Ödeme Planını Göster'}
                </Button>
              </div>

              {/* Amortization Schedule Table */}
              {showSchedule && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <div className="overflow-x-auto rounded-2xl border-2 border-slate-200">
                    <table className="w-full">
                      <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-bold text-slate-700 uppercase">Ay</th>
                          <th className="px-4 py-3 text-right text-xs font-bold text-slate-700 uppercase">Ödeme</th>
                          <th className="px-4 py-3 text-right text-xs font-bold text-slate-700 uppercase">Anapara</th>
                          <th className="px-4 py-3 text-right text-xs font-bold text-slate-700 uppercase">Faiz</th>
                          <th className="px-4 py-3 text-right text-xs font-bold text-slate-700 uppercase">Kalan</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-slate-100">
                        {result.schedule.map((row) => (
                          <tr key={row.month} className="hover:bg-blue-50/50 transition-colors">
                            <td className="px-4 py-3 text-sm font-semibold text-slate-900">{row.month}</td>
                            <td className="px-4 py-3 text-sm text-right text-blue-600 font-semibold">₺{row.payment.toFixed(2)}</td>
                            <td className="px-4 py-3 text-sm text-right text-slate-700">₺{row.principal.toFixed(2)}</td>
                            <td className="px-4 py-3 text-sm text-right text-purple-600">₺{row.interest.toFixed(2)}</td>
                            <td className="px-4 py-3 text-sm text-right text-slate-900 font-semibold">₺{row.balance.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Info Tip */}
          {!result && (
            <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-slate-700">
                  <p className="font-semibold text-blue-900 mb-1">💡 Bilgi</p>
                  <p>Kredi tutarı, faiz oranı ve vade bilgilerini girerek aylık ödemenizi ve toplam maliyetinizi öğrenin. Ödeme planı detaylarını da görebilirsiniz.</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
