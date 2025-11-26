"use client"

import { useState } from "react"
import { Calculator, TrendingUp, Home, Calendar } from "lucide-react"

export function RentIncreaseCalculator() {
  const [currentRent, setCurrentRent] = useState<string>("")
  const [renewalDate, setRenewalDate] = useState<string>("")
  const [tufeRate, setTufeRate] = useState<string>("64.77") // Example TÜFE rate
  const [legalCap, setLegalCap] = useState<string>("25") // Example legal cap
  const [useLegalCap, setUseLegalCap] = useState<boolean>(true)
  const [additionalIncrease, setAdditionalIncrease] = useState<string>("0")
  const [calculated, setCalculated] = useState(false)

  const handleCalculate = () => {
    if (!currentRent || parseFloat(currentRent) <= 0) {
      alert("Lütfen geçerli bir kira bedeli girin")
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

  const getMonthlyPayments = (): Array<{ month: number; payment: number }> => {
    const newRent = calculateNewRent()
    return Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      payment: newRent
    }))
  }

  const formatCurrency = (amount: number): string => {
    return `₺${amount.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  const getMonthName = (month: number): string => {
    const months = [
      "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
      "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
    ]
    return months[month - 1]
  }

  return (
    <div className="space-y-8">
      {/* Current Rent */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-200 shadow-lg">
        <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-2">
          <Home className="h-6 w-6 text-blue-600" />
          Mevcut Kira Bilgileri
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Mevcut Kira Bedeli (₺)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={currentRent}
              onChange={(e) => {
                setCurrentRent(e.target.value)
                setCalculated(false)
              }}
              className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none text-lg font-semibold"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Sözleşme Yenileme Tarihi (GG/AA/YYYY)
            </label>
            <input
              type="date"
              value={renewalDate}
              onChange={(e) => {
                setRenewalDate(e.target.value)
                setCalculated(false)
              }}
              className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none"
              placeholder="GG/AA/YYYY"
            />
            <p className="text-xs text-slate-500 mt-1">Örnek: 15/06/2024</p>
          </div>
        </div>
      </div>

      {/* Increase Rates */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-200 shadow-lg">
        <h2 className="text-2xl font-bold text-purple-900 mb-6 flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-purple-600" />
          Artış Oranları
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              TÜFE 12 Aylık Ortalama (%)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={tufeRate}
              onChange={(e) => {
                setTufeRate(e.target.value)
                setCalculated(false)
              }}
              className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-purple-500 focus:outline-none"
              placeholder="0.00"
            />
            <p className="text-sm text-slate-500 mt-1">
              TÜİK tarafından açıklanan yıllık TÜFE oranını girin
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 border-2 border-purple-200">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={useLegalCap}
                onChange={(e) => {
                  setUseLegalCap(e.target.checked)
                  setCalculated(false)
                }}
                className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
              />
              <div className="flex-1">
                <div className="font-semibold text-slate-800">Yasal Zam Tavanı Uygula</div>
                <div className="text-sm text-slate-600">
                  Türkiye'de belirlenen üst sınırı uygula
                </div>
              </div>
            </label>
          </div>

          {useLegalCap && (
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Yasal Zam Tavanı (%)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={legalCap}
                onChange={(e) => {
                  setLegalCap(e.target.value)
                  setCalculated(false)
                }}
                className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-purple-500 focus:outline-none"
                placeholder="0.00"
              />
              <p className="text-sm text-slate-500 mt-1">
                Yasal olarak belirlenen maksimum artış oranı
              </p>
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Ek Artış (%) - İsteğe Bağlı
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={additionalIncrease}
              onChange={(e) => {
                setAdditionalIncrease(e.target.value)
                setCalculated(false)
              }}
              className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-purple-500 focus:outline-none"
              placeholder="0.00"
            />
            <p className="text-sm text-slate-500 mt-1">
              Ev sahibi ve kiracı arasında anlaşılan ek artış
            </p>
          </div>
        </div>
      </div>

      {/* Calculate Button */}
      <div className="flex gap-3">
        <button
          onClick={handleCalculate}
          className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
        >
          <Calculator className="h-5 w-5" />
          Hesapla
        </button>
        <button
          onClick={handleReset}
          className="px-6 py-4 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-xl transition-colors"
        >
          Sıfırla
        </button>
      </div>

      {/* Results */}
      {calculated && (
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200 shadow-lg">
          <h2 className="text-2xl font-bold text-green-900 mb-6 flex items-center gap-2">
            <Calendar className="h-6 w-6 text-green-600" />
            Hesaplama Sonucu
          </h2>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-xl p-6 border-2 border-blue-200">
              <div className="text-sm text-slate-600 mb-1">Mevcut Kira</div>
              <div className="text-2xl font-bold text-blue-600">
                {formatCurrency(parseFloat(currentRent) || 0)}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border-2 border-green-200">
              <div className="text-sm text-slate-600 mb-1">Yeni Kira</div>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(calculateNewRent())}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border-2 border-purple-200">
              <div className="text-sm text-slate-600 mb-1">Artış Tutarı</div>
              <div className="text-2xl font-bold text-purple-600">
                {formatCurrency(calculateIncrease())}
              </div>
            </div>
          </div>

          {/* Increase Rate */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 mb-6 border-2 border-purple-300">
            <div className="text-center">
              <div className="text-lg font-semibold text-slate-700 mb-2">
                Uygulanan Artış Oranı
              </div>
              <div className="text-5xl font-bold text-purple-700">
                %{calculateIncreaseRate().toFixed(2)}
              </div>
            </div>
          </div>

          {/* Breakdown */}
          <div className="bg-white rounded-xl p-6 border-2 border-slate-200 mb-6">
            <h3 className="font-bold text-slate-800 mb-4">Artış Detayı</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-2 border-b border-slate-200">
                <span className="text-slate-600">TÜFE Oranı</span>
                <span className="font-semibold">%{parseFloat(tufeRate).toFixed(2)}</span>
              </div>
              {useLegalCap && (
                <div className="flex justify-between py-2 border-b border-slate-200">
                  <span className="text-slate-600">Yasal Tavan</span>
                  <span className="font-semibold">%{parseFloat(legalCap).toFixed(2)}</span>
                </div>
              )}
              {parseFloat(additionalIncrease) > 0 && (
                <div className="flex justify-between py-2 border-b border-slate-200">
                  <span className="text-slate-600">Ek Artış</span>
                  <span className="font-semibold">%{parseFloat(additionalIncrease).toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between py-3 bg-green-50 -mx-2 px-2 rounded-lg">
                <span className="font-bold text-green-800">Toplam Artış</span>
                <span className="font-bold text-green-800">%{calculateIncreaseRate().toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Monthly Payments */}
          <div className="bg-white rounded-xl p-6 border-2 border-slate-200">
            <h3 className="font-bold text-slate-800 mb-4">Aylık Ödeme Takvimi</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {getMonthlyPayments().map((payment) => (
                <div
                  key={payment.month}
                  className="bg-slate-50 rounded-lg p-3 border border-slate-200"
                >
                  <div className="text-xs text-slate-600 mb-1">
                    {getMonthName(payment.month)}
                  </div>
                  <div className="text-sm font-bold text-slate-800">
                    {formatCurrency(payment.payment)}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-blue-800">Yıllık Toplam</span>
                <span className="text-lg font-bold text-blue-900">
                  {formatCurrency(calculateNewRent() * 12)}
                </span>
              </div>
            </div>
          </div>

          {/* Visual Comparison */}
          <div className="mt-6 bg-white rounded-xl p-6 border-2 border-slate-200">
            <h3 className="font-bold text-slate-800 mb-4">Grafik Gösterim</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-600">Eski Kira</span>
                  <span className="font-semibold">{formatCurrency(parseFloat(currentRent) || 0)}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-8">
                  <div
                    className="bg-blue-500 h-8 rounded-full flex items-center justify-end pr-3"
                    style={{ width: '100%' }}
                  >
                    <span className="text-white text-xs font-semibold">100%</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-600">Yeni Kira</span>
                  <span className="font-semibold">{formatCurrency(calculateNewRent())}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-8">
                  <div
                    className="bg-green-500 h-8 rounded-full flex items-center justify-end pr-3"
                    style={{ 
                      width: `${Math.min((calculateNewRent() / (parseFloat(currentRent) || 1)) * 100, 100)}%` 
                    }}
                  >
                    <span className="text-white text-xs font-semibold">
                      +{calculateIncreaseRate().toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Info Section */}
      <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-8 border-2 border-amber-200 shadow-lg">
        <h2 className="text-2xl font-bold text-amber-900 mb-4">Kira Artışı Hakkında</h2>
        <div className="space-y-3 text-slate-700">
          <p>
            Türkiye'de kira artışları genellikle TÜİK tarafından açıklanan TÜFE (Tüketici Fiyat Endeksi) 
            oranına göre yapılır. Ancak yasal düzenlemeler ile bu artışa tavan getirilmiştir.
          </p>
          <div className="bg-amber-100 rounded-lg p-4">
            <p className="font-semibold text-amber-900 mb-2">
              Önemli Bilgiler:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Kira artışı yıllık olarak yapılır</li>
              <li>TÜFE oranı TÜİK tarafından aylık açıklanır</li>
              <li>Yasal tavan uygulanabilir (hükümet kararı)</li>
              <li>Ek artış taraflar arasında anlaşma ile yapılabilir</li>
            </ul>
          </div>
          <p className="text-sm text-slate-600">
            <strong>Not:</strong> Bu araç genel bilgi amaçlıdır. Kesin hukuki bilgi için avukata danışınız.
          </p>
        </div>
      </div>
    </div>
  )
}
