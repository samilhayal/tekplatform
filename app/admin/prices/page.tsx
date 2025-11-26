'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { 
  DollarSign, 
  TrendingUp, 
  Coins,
  Banknote,
  Save,
  RefreshCw,
  Calendar
} from 'lucide-react'

export default function AdminPricesPage() {
  // Gold Prices
  const [goldPrices, setGoldPrices] = useState({
    gramGold: '2850.50',
    quarterGold: '4650.00',
    halfGold: '9300.00',
    fullGold: '18600.00',
    ceyrek: '4650.00',
    yarim: '9300.00',
    tam: '18600.00'
  })

  // Currency Rates
  const [currencyRates, setcurrencyRates] = useState({
    usdTry: '34.50',
    eurTry: '37.80',
    gbpTry: '43.20',
    usdEur: '0.91'
  })

  // TUFE Rates
  const [tufeRates, setTufeRates] = useState({
    monthly: '2.85',
    yearly: '64.77',
    lastUpdate: new Date().toISOString().split('T')[0]
  })

  // Zakat Settings
  const [zakatSettings, setZakatSettings] = useState({
    goldPrice: '2850.50',
    silverPrice: '35.20',
    nisabGold: '85',
    nisabSilver: '595',
    zakatRate: '2.5',
    usdRate: '34.50',
    eurRate: '37.80'
  })

  const [saveStatus, setSaveStatus] = useState<{[key: string]: string}>({})

  const handleSaveGold = () => {
    // In production, save to database/API
    localStorage.setItem('admin_gold_prices', JSON.stringify(goldPrices))
    setSaveStatus({...saveStatus, gold: 'Altın fiyatları güncellendi!'})
    setTimeout(() => setSaveStatus({...saveStatus, gold: ''}), 3000)
  }

  const handleSaveCurrency = () => {
    localStorage.setItem('admin_currency_rates', JSON.stringify(currencyRates))
    setSaveStatus({...saveStatus, currency: 'Döviz kurları güncellendi!'})
    setTimeout(() => setSaveStatus({...saveStatus, currency: ''}), 3000)
  }

  const handleSaveTufe = () => {
    const updated = {...tufeRates, lastUpdate: new Date().toISOString().split('T')[0]}
    setTufeRates(updated)
    localStorage.setItem('admin_tufe_rates', JSON.stringify(updated))
    setSaveStatus({...saveStatus, tufe: 'TÜFE oranları güncellendi!'})
    setTimeout(() => setSaveStatus({...saveStatus, tufe: ''}), 3000)
  }

  const handleSaveZakat = () => {
    localStorage.setItem('admin_zakat_settings', JSON.stringify(zakatSettings))
    setSaveStatus({...saveStatus, zakat: 'Zekat ayarları güncellendi!'})
    setTimeout(() => setSaveStatus({...saveStatus, zakat: ''}), 3000)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-slate-900">Fiyat Güncelleme</h1>
        <p className="text-slate-600 mt-2">
          Araçlarda kullanılan güncel fiyat ve oranları manuel olarak güncelleyin
        </p>
      </div>

      {/* Gold Prices */}
      <Card className="border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-900">
            <Coins className="h-6 w-6 text-amber-600" />
            Altın Fiyatları
          </CardTitle>
          <CardDescription>Altın Hesaplama aracı için güncel fiyatlar</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Gram Altın (₺)</Label>
              <Input
                type="number"
                step="0.01"
                value={goldPrices.gramGold}
                onChange={(e) => setGoldPrices({...goldPrices, gramGold: e.target.value})}
                className="h-12 text-lg font-semibold"
              />
            </div>

            <div className="space-y-2">
              <Label>Çeyrek Altın (₺)</Label>
              <Input
                type="number"
                step="0.01"
                value={goldPrices.quarterGold}
                onChange={(e) => setGoldPrices({...goldPrices, quarterGold: e.target.value})}
                className="h-12 text-lg font-semibold"
              />
            </div>

            <div className="space-y-2">
              <Label>Yarım Altın (₺)</Label>
              <Input
                type="number"
                step="0.01"
                value={goldPrices.halfGold}
                onChange={(e) => setGoldPrices({...goldPrices, halfGold: e.target.value})}
                className="h-12 text-lg font-semibold"
              />
            </div>

            <div className="space-y-2">
              <Label>Tam Altın (₺)</Label>
              <Input
                type="number"
                step="0.01"
                value={goldPrices.fullGold}
                onChange={(e) => setGoldPrices({...goldPrices, fullGold: e.target.value})}
                className="h-12 text-lg font-semibold"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button 
              onClick={handleSaveGold}
              className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700"
            >
              <Save className="h-4 w-4 mr-2" />
              Kaydet
            </Button>
            {saveStatus.gold && (
              <p className="text-sm text-green-600 font-semibold">{saveStatus.gold}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Currency Rates */}
      <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-900">
            <Banknote className="h-6 w-6 text-green-600" />
            Döviz Kurları
          </CardTitle>
          <CardDescription>Döviz Kurları ve Zekat Hesaplama araçları için</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>USD/TRY</Label>
              <Input
                type="number"
                step="0.01"
                value={currencyRates.usdTry}
                onChange={(e) => setcurrencyRates({...currencyRates, usdTry: e.target.value})}
                className="h-12 text-lg font-semibold"
              />
            </div>

            <div className="space-y-2">
              <Label>EUR/TRY</Label>
              <Input
                type="number"
                step="0.01"
                value={currencyRates.eurTry}
                onChange={(e) => setcurrencyRates({...currencyRates, eurTry: e.target.value})}
                className="h-12 text-lg font-semibold"
              />
            </div>

            <div className="space-y-2">
              <Label>GBP/TRY</Label>
              <Input
                type="number"
                step="0.01"
                value={currencyRates.gbpTry}
                onChange={(e) => setcurrencyRates({...currencyRates, gbpTry: e.target.value})}
                className="h-12 text-lg font-semibold"
              />
            </div>

            <div className="space-y-2">
              <Label>USD/EUR</Label>
              <Input
                type="number"
                step="0.01"
                value={currencyRates.usdEur}
                onChange={(e) => setcurrencyRates({...currencyRates, usdEur: e.target.value})}
                className="h-12 text-lg font-semibold"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button 
              onClick={handleSaveCurrency}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              <Save className="h-4 w-4 mr-2" />
              Kaydet
            </Button>
            {saveStatus.currency && (
              <p className="text-sm text-green-600 font-semibold">{saveStatus.currency}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* TUFE Rates */}
      <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-900">
            <TrendingUp className="h-6 w-6 text-purple-600" />
            TÜFE Oranları
          </CardTitle>
          <CardDescription>Kira Zammı Hesaplama aracı için enflasyon oranları</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Aylık TÜFE (%)</Label>
              <Input
                type="number"
                step="0.01"
                value={tufeRates.monthly}
                onChange={(e) => setTufeRates({...tufeRates, monthly: e.target.value})}
                className="h-12 text-lg font-semibold"
              />
            </div>

            <div className="space-y-2">
              <Label>Yıllık TÜFE (%)</Label>
              <Input
                type="number"
                step="0.01"
                value={tufeRates.yearly}
                onChange={(e) => setTufeRates({...tufeRates, yearly: e.target.value})}
                className="h-12 text-lg font-semibold"
              />
            </div>

            <div className="space-y-2">
              <Label>Son Güncelleme</Label>
              <Input
                type="date"
                value={tufeRates.lastUpdate}
                disabled
                className="h-12 text-lg font-semibold bg-slate-100"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button 
              onClick={handleSaveTufe}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Save className="h-4 w-4 mr-2" />
              Kaydet
            </Button>
            {saveStatus.tufe && (
              <p className="text-sm text-green-600 font-semibold">{saveStatus.tufe}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Zakat Settings */}
      <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <DollarSign className="h-6 w-6 text-blue-600" />
            Zekat Hesaplama Ayarları
          </CardTitle>
          <CardDescription>Zekat Hesaplama aracı için altın, gümüş ve döviz kurları</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Altın Fiyatı (₺/gram)</Label>
              <Input
                type="number"
                step="0.01"
                value={zakatSettings.goldPrice}
                onChange={(e) => setZakatSettings({...zakatSettings, goldPrice: e.target.value})}
                className="h-12 text-lg font-semibold"
              />
            </div>

            <div className="space-y-2">
              <Label>Gümüş Fiyatı (₺/gram)</Label>
              <Input
                type="number"
                step="0.01"
                value={zakatSettings.silverPrice}
                onChange={(e) => setZakatSettings({...zakatSettings, silverPrice: e.target.value})}
                className="h-12 text-lg font-semibold"
              />
            </div>

            <div className="space-y-2">
              <Label>Nisap Altın (gram)</Label>
              <Input
                type="number"
                value={zakatSettings.nisabGold}
                onChange={(e) => setZakatSettings({...zakatSettings, nisabGold: e.target.value})}
                className="h-12 text-lg font-semibold"
              />
            </div>

            <div className="space-y-2">
              <Label>Nisap Gümüş (gram)</Label>
              <Input
                type="number"
                value={zakatSettings.nisabSilver}
                onChange={(e) => setZakatSettings({...zakatSettings, nisabSilver: e.target.value})}
                className="h-12 text-lg font-semibold"
              />
            </div>

            <div className="space-y-2">
              <Label>USD/TRY Kuru</Label>
              <Input
                type="number"
                step="0.01"
                value={zakatSettings.usdRate}
                onChange={(e) => setZakatSettings({...zakatSettings, usdRate: e.target.value})}
                className="h-12 text-lg font-semibold"
              />
            </div>

            <div className="space-y-2">
              <Label>EUR/TRY Kuru</Label>
              <Input
                type="number"
                step="0.01"
                value={zakatSettings.eurRate}
                onChange={(e) => setZakatSettings({...zakatSettings, eurRate: e.target.value})}
                className="h-12 text-lg font-semibold"
              />
            </div>
          </div>

          <div className="bg-blue-100 border-2 border-blue-300 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              <strong>Not:</strong> Zekat oranı sabit %{zakatSettings.zakatRate} olarak uygulanır. 
              Nisap hesaplaması için altın ve gümüş fiyatlarının güncel olması önemlidir.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button 
              onClick={handleSaveZakat}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
            >
              <Save className="h-4 w-4 mr-2" />
              Kaydet
            </Button>
            {saveStatus.zakat && (
              <p className="text-sm text-green-600 font-semibold">{saveStatus.zakat}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Auto Update Info */}
      <Card className="border-2 border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5 text-slate-700" />
            Otomatik Güncelleme
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-slate-600">
            Gelecek sürümlerde, fiyatlar ve oranlar API'ler üzerinden otomatik olarak güncellenebilir:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-sm text-slate-600">
            <li>TCMB (Türkiye Cumhuriyet Merkez Bankası) - Döviz kurları</li>
            <li>Altın piyasa API'leri - Güncel altın fiyatları</li>
            <li>TÜİK - TÜFE oranları</li>
          </ul>
          <p className="text-xs text-slate-500 mt-3">
            Şimdilik tüm güncellemeler manuel olarak yapılmalıdır.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
