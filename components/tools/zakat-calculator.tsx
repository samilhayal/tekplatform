'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AlertCircle, CheckCircle2, Info, TrendingUp, DollarSign, Landmark } from 'lucide-react'

// Para cinsleri
interface CashAssets {
  try: number
  usd: number
  eur: number
  bankAccountsTRY: number
  bankAccountsUSD: number
  bankAccountsEUR: number
}

// Altın ve Gümüş
interface PreciousMetals {
  goldGrams: number
  goldPricePerGram: number
  silverGrams: number
  silverPricePerGram: number
}

// Ticari Mallar ve Yatırımlar
interface Investments {
  tradeGoods: number // Ticari mal stok değeri
  stocks: number // Hisse senedi
  funds: number // Yatırım fonu
  crypto: number // Kripto varlık
  receivables: number // Tahsil edilebilir alacaklar
}

// Borçlar
interface Debts {
  creditCardDebt: number // Kredi kartı borcu
  shortTermLoans: number // Kısa vadeli borçlar
  annualLoanInstallments: number // Yıllık kredi taksitleri
  taxesAndBills: number // Vergi ve faturalar
  personalDebts: number // Elden alınan borçlar
}

// Döviz kurları
interface ExchangeRates {
  usdToTry: number
  eurToTry: number
}

interface ZakatResult {
  totalAssetsTRY: number
  totalDebtsTRY: number
  netAssetsTRY: number
  nisabThresholdTRY: number
  nisabType: 'gold' | 'silver'
  isAboveNisab: boolean
  zakatAmountTRY: number
  zakatRate: number
  breakdown: {
    cash: number
    preciousMetals: number
    investments: number
  }
}

export function ZakatCalculator() {
  // Load prices from API (Firestore)
  useEffect(() => {
    const loadPrices = async () => {
      try {
        const response = await fetch('/api/prices?type=zakat')
        const data = await response.json()
        
        if (data.success) {
          // Zekat ayarlarından altın ve gümüş fiyatları
          if (data.zakat) {
            setPreciousMetals(prev => ({
              ...prev,
              goldPricePerGram: data.zakat.goldGramPrice || prev.goldPricePerGram,
              silverPricePerGram: data.zakat.silverGramPrice || prev.silverPricePerGram
            }))
          }
          
          // Döviz kurları
          if (data.usdRate && data.eurRate) {
            setExchangeRates({
              usdToTry: data.usdRate,
              eurToTry: data.eurRate
            })
          }
        }
      } catch (error) {
        console.error('Failed to load prices:', error)
      }
    }
    
    loadPrices()
  }, [])

  // Para ve Nakit
  const [cashAssets, setCashAssets] = useState<CashAssets>({
    try: 0,
    usd: 0,
    eur: 0,
    bankAccountsTRY: 0,
    bankAccountsUSD: 0,
    bankAccountsEUR: 0
  })

  // Altın ve Gümüş
  const [preciousMetals, setPreciousMetals] = useState<PreciousMetals>({
    goldGrams: 0,
    goldPricePerGram: 3000,
    silverGrams: 0,
    silverPricePerGram: 35
  })

  // Yatırımlar ve Ticari Mallar
  const [investments, setInvestments] = useState<Investments>({
    tradeGoods: 0,
    stocks: 0,
    funds: 0,
    crypto: 0,
    receivables: 0
  })

  // Borçlar
  const [debts, setDebts] = useState<Debts>({
    creditCardDebt: 0,
    shortTermLoans: 0,
    annualLoanInstallments: 0,
    taxesAndBills: 0,
    personalDebts: 0
  })

  // Döviz Kurları
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({
    usdToTry: 34.50,
    eurToTry: 37.80
  })

  const [zakatRate] = useState(2.5)
  const [result, setResult] = useState<ZakatResult | null>(null)

  const calculateZakat = () => {
    // 1) VARLIK HESAPLAMA (TL cinsinden)
    
    // A) Para ve Nakit
    const cashTRY = cashAssets.try
    const cashUSD_TRY = cashAssets.usd * exchangeRates.usdToTry
    const cashEUR_TRY = cashAssets.eur * exchangeRates.eurToTry
    const bankTRY = cashAssets.bankAccountsTRY
    const bankUSD_TRY = cashAssets.bankAccountsUSD * exchangeRates.usdToTry
    const bankEUR_TRY = cashAssets.bankAccountsEUR * exchangeRates.eurToTry
    
    const totalCashTRY = cashTRY + cashUSD_TRY + cashEUR_TRY + bankTRY + bankUSD_TRY + bankEUR_TRY

    // B) Altın ve Gümüş
    const goldValueTRY = preciousMetals.goldGrams * preciousMetals.goldPricePerGram
    const silverValueTRY = preciousMetals.silverGrams * preciousMetals.silverPricePerGram
    const totalPreciousMetalsTRY = goldValueTRY + silverValueTRY

    // C) Yatırımlar ve Ticari Mallar
    const totalInvestmentsTRY = 
      investments.tradeGoods +
      investments.stocks +
      investments.funds +
      investments.crypto +
      investments.receivables

    // TOPLAM VARLIK
    const totalAssetsTRY = totalCashTRY + totalPreciousMetalsTRY + totalInvestmentsTRY

    // 2) BORÇ HESAPLAMA (TL cinsinden)
    const totalDebtsTRY = 
      debts.creditCardDebt +
      debts.shortTermLoans +
      debts.annualLoanInstallments + // Sadece 1 yıllık taksit
      debts.taxesAndBills +
      debts.personalDebts

    // 3) NET VARLIK (Borçlar düşüldükten sonra)
    const netAssetsTRY = totalAssetsTRY - totalDebtsTRY

    // 4) NİSAP EŞİĞİ HESAPLAMA
    // Nisab: 85 gram altın VEYA 595 gram gümüş (hangisi düşükse)
    const goldNisab = 85 * preciousMetals.goldPricePerGram
    const silverNisab = 595 * preciousMetals.silverPricePerGram

    let nisabThresholdTRY = 0
    let nisabType: 'gold' | 'silver' = 'gold'

    if (goldNisab > 0 && silverNisab > 0) {
      // İkisi de varsa düşük olanı al (daha çok kişi zekat verebilsin)
      nisabThresholdTRY = Math.min(goldNisab, silverNisab)
      nisabType = goldNisab <= silverNisab ? 'gold' : 'silver'
    } else if (goldNisab > 0) {
      nisabThresholdTRY = goldNisab
      nisabType = 'gold'
    } else if (silverNisab > 0) {
      nisabThresholdTRY = silverNisab
      nisabType = 'silver'
    } else {
      // Hiçbiri girilmemişse varsayılan olarak güncel piyasa değerini kullan
      nisabThresholdTRY = 85 * 3000 // Varsayılan ~3000 TL/gram altın
      nisabType = 'gold'
    }

    // 5) NİSAP ÜSTÜNDE Mİ?
    const isAboveNisab = netAssetsTRY >= nisabThresholdTRY

    // 6) ZEKAT MİKTARI (%2.5)
    const zakatAmountTRY = isAboveNisab ? (netAssetsTRY * zakatRate) / 100 : 0

    setResult({
      totalAssetsTRY,
      totalDebtsTRY,
      netAssetsTRY,
      nisabThresholdTRY,
      nisabType,
      isAboveNisab,
      zakatAmountTRY,
      zakatRate,
      breakdown: {
        cash: totalCashTRY,
        preciousMetals: totalPreciousMetalsTRY,
        investments: totalInvestmentsTRY
      }
    })
  }

  const formatTRY = (amount: number) => {
    return `₺${amount.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  const formatPercent = (value: number, total: number) => {
    if (total === 0) return '0%'
    return `${((value / total) * 100).toFixed(1)}%`
  }

  const resetForm = () => {
    setCashAssets({
      try: 0,
      usd: 0,
      eur: 0,
      bankAccountsTRY: 0,
      bankAccountsUSD: 0,
      bankAccountsEUR: 0
    })
    setPreciousMetals({
      goldGrams: 0,
      goldPricePerGram: 3000,
      silverGrams: 0,
      silverPricePerGram: 35
    })
    setInvestments({
      tradeGoods: 0,
      stocks: 0,
      funds: 0,
      crypto: 0,
      receivables: 0
    })
    setDebts({
      creditCardDebt: 0,
      shortTermLoans: 0,
      annualLoanInstallments: 0,
      taxesAndBills: 0,
      personalDebts: 0
    })
    setResult(null)
  }

  return (
    <div className="space-y-6">
      {/* Bilgilendirme Kartı */}
      <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Info className="h-5 w-5 text-emerald-600" />
            <CardTitle className="text-emerald-900">Zekat Hesaplama Kuralları</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-emerald-800">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <p><strong>Nisap Eşiği:</strong> 85 gram altın veya 595 gram gümüş değeri (hangisi düşükse)</p>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <p><strong>Zekat Oranı:</strong> Net varlığın %2.5'i (1/40)</p>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <p><strong>Borçlar:</strong> Uzun vadeli kredilerde sadece 1 yıllık taksitler düşülür</p>
          </div>
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <p className="text-amber-700"><strong>Önemli:</strong> Malın üzerinden 1 kameri yıl (355 gün) geçmiş olmalıdır</p>
          </div>
        </CardContent>
      </Card>

      {/* Döviz Kurları */}
      <Card className="bg-white/80 backdrop-blur-sm border-2 border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Döviz Kurları (TL)
          </CardTitle>
          <CardDescription>Hesaplama için kullanılacak güncel kurları girin</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>1 USD = ? TL</Label>
            <Input
              type="number"
              step="0.01"
              value={exchangeRates.usdToTry || ''}
              onChange={(e) => setExchangeRates({...exchangeRates, usdToTry: Number(e.target.value)})}
              placeholder="34.50"
            />
          </div>
          <div className="space-y-2">
            <Label>1 EUR = ? TL</Label>
            <Input
              type="number"
              step="0.01"
              value={exchangeRates.eurToTry || ''}
              onChange={(e) => setExchangeRates({...exchangeRates, eurToTry: Number(e.target.value)})}
              placeholder="37.80"
            />
          </div>
        </CardContent>
      </Card>

      {/* Ana Form - Tabs */}
      <Tabs defaultValue="cash" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="cash">Para & Nakit</TabsTrigger>
          <TabsTrigger value="metals">Altın & Gümüş</TabsTrigger>
          <TabsTrigger value="investments">Yatırımlar</TabsTrigger>
          <TabsTrigger value="debts">Borçlar</TabsTrigger>
        </TabsList>

        {/* Para ve Nakit */}
        <TabsContent value="cash">
          <Card className="bg-white/80 backdrop-blur-sm border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900">A) Para ve Nakit Varlıklar</CardTitle>
              <CardDescription>Nakit para ve banka hesaplarınızdaki bakiyeler</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Nakit TL</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={cashAssets.try || ''}
                    onChange={(e) => setCashAssets({...cashAssets, try: Number(e.target.value)})}
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Nakit USD ($)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={cashAssets.usd || ''}
                    onChange={(e) => setCashAssets({...cashAssets, usd: Number(e.target.value)})}
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Nakit EUR (€)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={cashAssets.eur || ''}
                    onChange={(e) => setCashAssets({...cashAssets, eur: Number(e.target.value)})}
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3">Banka Hesapları</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Banka Hesap TL</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={cashAssets.bankAccountsTRY || ''}
                      onChange={(e) => setCashAssets({...cashAssets, bankAccountsTRY: Number(e.target.value)})}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Banka Hesap USD ($)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={cashAssets.bankAccountsUSD || ''}
                      onChange={(e) => setCashAssets({...cashAssets, bankAccountsUSD: Number(e.target.value)})}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Banka Hesap EUR (€)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={cashAssets.bankAccountsEUR || ''}
                      onChange={(e) => setCashAssets({...cashAssets, bankAccountsEUR: Number(e.target.value)})}
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Altın ve Gümüş */}
        <TabsContent value="metals">
          <Card className="bg-white/80 backdrop-blur-sm border-2 border-amber-200">
            <CardHeader>
              <CardTitle className="text-amber-900">B) Altın ve Gümüş</CardTitle>
              <CardDescription>Ziynet eşyaları dahil tüm altın ve gümüş (Hanefi mezhebine göre)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Altın Miktarı (gram)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={preciousMetals.goldGrams || ''}
                    onChange={(e) => setPreciousMetals({...preciousMetals, goldGrams: Number(e.target.value)})}
                    placeholder="0.00"
                  />
                  <p className="text-xs text-amber-700">Bilezik, yüzük, kolye, gram altın, külçe dahil</p>
                </div>
                <div className="space-y-2">
                  <Label>Altın Gram Fiyatı (₺)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={preciousMetals.goldPricePerGram || ''}
                    onChange={(e) => setPreciousMetals({...preciousMetals, goldPricePerGram: Number(e.target.value)})}
                    placeholder="3000.00"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Gümüş Miktarı (gram)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={preciousMetals.silverGrams || ''}
                    onChange={(e) => setPreciousMetals({...preciousMetals, silverGrams: Number(e.target.value)})}
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Gümüş Gram Fiyatı (₺)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={preciousMetals.silverPricePerGram || ''}
                    onChange={(e) => setPreciousMetals({...preciousMetals, silverPricePerGram: Number(e.target.value)})}
                    placeholder="35.00"
                  />
                </div>
              </div>

              <div className="bg-amber-50 p-3 rounded-lg text-sm text-amber-800">
                <strong>Nisap Eşikleri:</strong>
                <div className="mt-1">• Altın: 85 gram = {formatTRY(85 * preciousMetals.goldPricePerGram)}</div>
                <div>• Gümüş: 595 gram = {formatTRY(595 * preciousMetals.silverPricePerGram)}</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Yatırımlar */}
        <TabsContent value="investments">
          <Card className="bg-white/80 backdrop-blur-sm border-2 border-purple-200">
            <CardHeader>
              <CardTitle className="text-purple-900">C) Ticari Mallar ve Yatırımlar</CardTitle>
              <CardDescription>Satış için alınan ürünler, hisse senetleri, kripto varlıklar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Ticari Mallar / Stoklar (₺)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={investments.tradeGoods || ''}
                  onChange={(e) => setInvestments({...investments, tradeGoods: Number(e.target.value)})}
                  placeholder="0.00"
                />
                <p className="text-xs text-slate-600">Mağaza/şirket ürünleri, satmak için alınan eşyalar</p>
              </div>

              <div className="space-y-2">
                <Label>Hisse Senedi (₺)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={investments.stocks || ''}
                  onChange={(e) => setInvestments({...investments, stocks: Number(e.target.value)})}
                  placeholder="0.00"
                />
              </div>

              <div className="space-y-2">
                <Label>Yatırım Fonu (₺)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={investments.funds || ''}
                  onChange={(e) => setInvestments({...investments, funds: Number(e.target.value)})}
                  placeholder="0.00"
                />
              </div>

              <div className="space-y-2">
                <Label>Kripto Varlık (₺)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={investments.crypto || ''}
                  onChange={(e) => setInvestments({...investments, crypto: Number(e.target.value)})}
                  placeholder="0.00"
                />
                <p className="text-xs text-slate-600">Hanefi mezhebine göre ticari meta gibi hesaplanır</p>
              </div>

              <div className="space-y-2">
                <Label>Tahsil Edilebilir Alacaklar (₺)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={investments.receivables || ''}
                  onChange={(e) => setInvestments({...investments, receivables: Number(e.target.value)})}
                  placeholder="0.00"
                />
                <p className="text-xs text-amber-700">Sadece kesin tahsil edilebilir alacaklar yazılmalı</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Borçlar */}
        <TabsContent value="debts">
          <Card className="bg-white/80 backdrop-blur-sm border-2 border-rose-200">
            <CardHeader>
              <CardTitle className="text-rose-900">D) Borçlar (Varlıklardan Düşülecek)</CardTitle>
              <CardDescription>Kısa vadeli borçlar ve yıllık taksitler</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Kredi Kartı Borcu (₺)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={debts.creditCardDebt || ''}
                  onChange={(e) => setDebts({...debts, creditCardDebt: Number(e.target.value)})}
                  placeholder="0.00"
                />
              </div>

              <div className="space-y-2">
                <Label>Kısa Vadeli Borçlar (₺)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={debts.shortTermLoans || ''}
                  onChange={(e) => setDebts({...debts, shortTermLoans: Number(e.target.value)})}
                  placeholder="0.00"
                />
                <p className="text-xs text-slate-600">Vadesi yakın, 1 yıl içinde ödenecek borçlar</p>
              </div>

              <div className="space-y-2">
                <Label>Yıllık Kredi Taksitleri (₺)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={debts.annualLoanInstallments || ''}
                  onChange={(e) => setDebts({...debts, annualLoanInstallments: Number(e.target.value)})}
                  placeholder="0.00"
                />
                <p className="text-xs text-amber-700"><strong>Önemli:</strong> Uzun vadeli kredilerde sadece 1 yıllık taksit düşülür</p>
              </div>

              <div className="space-y-2">
                <Label>Vergi ve Faturalar (₺)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={debts.taxesAndBills || ''}
                  onChange={(e) => setDebts({...debts, taxesAndBills: Number(e.target.value)})}
                  placeholder="0.00"
                />
                <p className="text-xs text-slate-600">Kesinleşmiş, ödenmesi gereken vergi/fatura</p>
              </div>

              <div className="space-y-2">
                <Label>Elden Alınan Borçlar (₺)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={debts.personalDebts || ''}
                  onChange={(e) => setDebts({...debts, personalDebts: Number(e.target.value)})}
                  placeholder="0.00"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Hesaplama Butonları */}
      <div className="flex gap-3">
        <Button 
          onClick={calculateZakat}
          className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
          size="lg"
        >
          <DollarSign className="mr-2 h-5 w-5" />
          Zekat Hesapla
        </Button>
        <Button 
          onClick={resetForm}
          variant="outline"
          size="lg"
        >
          Sıfırla
        </Button>
      </div>

      {/* Sonuçlar */}
      {result && (
        <div className="space-y-4 animate-in fade-in-50 slide-in-from-bottom-3">
          {/* Nisap Durumu */}
          <Card className={`border-2 ${result.isAboveNisab ? 'bg-green-50 border-green-300' : 'bg-amber-50 border-amber-300'}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {result.isAboveNisab ? (
                  <>
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                    <span className="text-green-900">Nisap Üstünde - Zekat Farz</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-6 w-6 text-amber-600" />
                    <span className="text-amber-900">Nisap Altında - Zekat Gerekmez</span>
                  </>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-600">Nisap Eşiği ({result.nisabType === 'gold' ? '85 gr Altın' : '595 gr Gümüş'})</p>
                  <p className="text-2xl font-bold text-slate-900">{formatTRY(result.nisabThresholdTRY)}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Net Varlığınız</p>
                  <p className="text-2xl font-bold text-slate-900">{formatTRY(result.netAssetsTRY)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Zekat Miktarı */}
          {result.isAboveNisab && (
            <Card className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white text-2xl">Zekat Miktarı</CardTitle>
                <CardDescription className="text-emerald-100">Vermeniz gereken zekat tutarı</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-5xl font-bold mb-2">
                  {formatTRY(result.zakatAmountTRY)}
                </div>
                <p className="text-emerald-100">
                  Net varlığın %{result.zakatRate}'i (1/40)
                </p>
              </CardContent>
            </Card>
          )}

          {/* Detaylı Döküm */}
          <Card className="bg-white/80 backdrop-blur-sm border-2 border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Landmark className="h-5 w-5 text-slate-700" />
                Detaylı Döküm
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-slate-600">Toplam Nakit ve Para</span>
                  <span className="font-semibold">{formatTRY(result.breakdown.cash)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-slate-600">Altın ve Gümüş Değeri</span>
                  <span className="font-semibold">{formatTRY(result.breakdown.preciousMetals)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-slate-600">Ticari Mal ve Yatırımlar</span>
                  <span className="font-semibold">{formatTRY(result.breakdown.investments)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-300 bg-slate-50 px-3 rounded">
                  <span className="font-semibold text-slate-900">Toplam Varlık</span>
                  <span className="font-bold text-lg">{formatTRY(result.totalAssetsTRY)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b text-rose-600">
                  <span className="font-semibold">(-) Toplam Borç</span>
                  <span className="font-bold">-{formatTRY(result.totalDebtsTRY)}</span>
                </div>
                <div className="flex justify-between items-center py-3 bg-emerald-50 px-3 rounded-lg">
                  <span className="font-bold text-emerald-900 text-lg">Net Varlık (Zekat Matrahı)</span>
                  <span className="font-bold text-2xl text-emerald-700">{formatTRY(result.netAssetsTRY)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
