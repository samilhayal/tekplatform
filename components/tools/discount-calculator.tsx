"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tag, Percent, ShoppingCart, Sparkles, Copy } from "lucide-react"

interface DiscountResult {
  originalPrice: number
  discountAmount: number
  finalPrice: number
  discountPercentage: number
  youSave: number
}

export function DiscountCalculator() {
  const [originalPrice, setOriginalPrice] = useState("100")
  const [discountPercent, setDiscountPercent] = useState("20")
  const [result, setResult] = useState<DiscountResult | null>(null)

  const calculateDiscount = () => {
    const price = parseFloat(originalPrice)
    const discount = parseFloat(discountPercent)

    if (isNaN(price) || isNaN(discount) || price <= 0 || discount < 0) {
      return
    }

    const discountAmount = (price * discount) / 100
    const finalPrice = price - discountAmount

    setResult({
      originalPrice: price,
      discountAmount,
      finalPrice,
      discountPercentage: discount,
      youSave: discountAmount,
    })
  }

  const resetCalculator = () => {
    setOriginalPrice("100")
    setDiscountPercent("20")
    setResult(null)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="w-full max-w-5xl mx-auto relative">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-200 to-red-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-pink-200 to-orange-200 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <Card className="border-2 border-orange-100/50 shadow-xl shadow-orange-500/10 backdrop-blur-sm bg-white/80">
        <CardContent className="pt-8 pb-8 px-6 sm:px-8">
          {/* Header Section */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 shadow-lg shadow-orange-500/50 mb-4">
              <Tag className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
              İndirim Hesaplama
            </h2>
            <p className="text-slate-600">İndirimli fiyatı anında hesaplayın</p>
          </div>

          {/* Input Section */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <ShoppingCart className="h-4 w-4 text-orange-600" />
                Orijinal Fiyat (₺)
              </label>
              <div className="relative group">
                <Input
                  type="number"
                  placeholder="Örn: 100"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  className="h-16 text-lg pl-12 border-2 border-slate-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all rounded-xl"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl">🏷️</span>
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Percent className="h-4 w-4 text-red-600" />
                İndirim Oranı (%)
              </label>
              <div className="relative group">
                <Input
                  type="number"
                  step="0.1"
                  placeholder="Örn: 20"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(e.target.value)}
                  className="h-16 text-lg pl-12 border-2 border-slate-200 focus:border-red-400 focus:ring-4 focus:ring-red-100 transition-all rounded-xl"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl">%</span>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <Button
              onClick={calculateDiscount}
              className="h-14 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all"
            >
              <Tag className="h-5 w-5 mr-2" />
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
              {/* Main Result */}
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 rounded-2xl"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-200 to-red-200 rounded-full blur-2xl opacity-40"></div>
                
                <div className="relative border-2 border-orange-200 rounded-2xl p-8 shadow-xl text-center">
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <div className="text-2xl sm:text-3xl text-slate-500 line-through">
                      ₺{result.originalPrice.toFixed(2)}
                    </div>
                    <div className="px-4 py-2 rounded-full bg-red-500 text-white font-bold text-sm animate-pulse">
                      %{result.discountPercentage} İNDİRİM
                    </div>
                  </div>

                  <p className="text-sm font-semibold text-slate-600 mb-2">İndirimli Fiyat</p>
                  <p className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
                    ₺{result.finalPrice.toFixed(2)}
                  </p>

                  <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-50 border-2 border-green-200 mb-4">
                    <Sparkles className="h-5 w-5 text-green-600" />
                    <span className="text-lg font-bold text-green-700">
                      ₺{result.youSave.toFixed(2)} tasarruf!
                    </span>
                  </div>

                  <div className="flex gap-3 justify-center mt-6">
                    <Button
                      onClick={() => copyToClipboard(result.finalPrice.toFixed(2))}
                      className="bg-white hover:bg-orange-50 text-orange-600 border-2 border-orange-200"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Fiyatı Kopyala
                    </Button>
                  </div>
                </div>
              </div>

              {/* Breakdown */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-xl bg-gradient-to-br from-slate-50 to-gray-50 border-2 border-slate-200 text-center">
                  <p className="text-sm text-slate-600 mb-2">Orijinal Fiyat</p>
                  <p className="text-2xl font-bold text-slate-900">₺{result.originalPrice.toFixed(2)}</p>
                </div>

                <div className="p-5 rounded-xl bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 text-center">
                  <p className="text-sm text-slate-600 mb-2">İndirim Tutarı</p>
                  <p className="text-2xl font-bold text-red-600">-₺{result.discountAmount.toFixed(2)}</p>
                </div>

                <div className="p-5 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 text-center">
                  <p className="text-sm text-slate-600 mb-2">Ödeyeceğiniz</p>
                  <p className="text-2xl font-bold text-green-600">₺{result.finalPrice.toFixed(2)}</p>
                </div>
              </div>

              {/* Savings Visualization */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200">
                <h3 className="font-bold text-orange-900 mb-4 text-center">💰 Tasarruf Gösterimi</h3>
                <div className="relative h-12 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold transition-all duration-500"
                    style={{ width: `${result.discountPercentage}%` }}
                  >
                    <span className="text-sm drop-shadow">%{result.discountPercentage} İndirim</span>
                  </div>
                  <div
                    className="absolute right-0 top-0 h-full bg-gradient-to-r from-orange-400 to-red-400 flex items-center justify-center text-white font-bold transition-all duration-500"
                    style={{ width: `${100 - result.discountPercentage}%` }}
                  >
                    <span className="text-sm drop-shadow">Ödenecek</span>
                  </div>
                </div>
                <div className="flex justify-between mt-3 text-sm text-slate-600">
                  <span>₺0</span>
                  <span>₺{result.originalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Quick Discount Buttons */}
          {!result && (
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-slate-700 mb-3 text-center">Hızlı İndirim Oranları</h3>
              <div className="grid grid-cols-5 gap-2">
                {[10, 20, 25, 30, 50].map((percent) => (
                  <button
                    key={percent}
                    onClick={() => setDiscountPercent(percent.toString())}
                    className="p-3 rounded-lg border-2 border-orange-200 hover:border-orange-400 hover:bg-orange-50 font-semibold text-orange-600 transition-all"
                  >
                    %{percent}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Info Tip */}
          {!result && (
            <div className="mt-8 p-4 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl">
              <div className="flex items-start gap-3">
                <Tag className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-slate-700">
                  <p className="font-semibold text-orange-900 mb-1">💡 Bilgi</p>
                  <p>Alışveriş yaparken gerçek tasarrufunuzu öğrenin. Hızlı indirim butonlarını kullanabilir veya özel oran girebilirsiniz!</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
