'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  DollarSign, 
  Coins,
  Banknote,
  Save,
  RefreshCw,
  CheckCircle,
  XCircle,
  Loader2,
  Calculator,
  ArrowRightLeft
} from 'lucide-react'

const CURRENCIES = [
  { code: 'TRY', name: 'Türk Lirası', symbol: '₺', flag: '' },
  { code: 'USD', name: 'Amerikan Doları', symbol: '$', flag: '' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '' },
  { code: 'GBP', name: 'İngiliz Sterlini', symbol: '£', flag: '' },
  { code: 'CHF', name: 'İsviçre Frangı', symbol: 'CHF', flag: '' },
  { code: 'JPY', name: 'Japon Yeni', symbol: '', flag: '' },
  { code: 'SAR', name: 'Suudi Riyali', symbol: 'SR', flag: '' },
  { code: 'AED', name: 'BAE Dirhemi', symbol: 'AED', flag: '' },
  { code: 'CAD', name: 'Kanada Doları', symbol: 'C$', flag: '' },
  { code: 'AUD', name: 'Avustralya Doları', symbol: 'A$', flag: '' },
  { code: 'CNY', name: 'Çin Yuanı', symbol: '', flag: '' },
  { code: 'RUB', name: 'Rus Rublesi', symbol: '', flag: '' },
]

export default function AdminPricesPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const [goldPrices, setGoldPrices] = useState({
    gram24: 0, gram22: 0, gram18: 0,
    ceyrek: 0, yarim: 0, tam: 0,
    cumhuriyet: 0, ata: 0, resat: 0, onsUsd: 0,
  })

  const [usdRates, setUsdRates] = useState<Record<string, number>>({
    TRY: 34.50, EUR: 0.92, GBP: 0.79, CHF: 0.88,
    JPY: 149.50, SAR: 3.75, AED: 3.67, CAD: 1.36,
    AUD: 1.53, CNY: 7.24, RUB: 92.50,
  })

  const [zakatSettings, setZakatSettings] = useState({
    goldGramPrice: 0, silverGramPrice: 0,
  })

  const [crossRates, setCrossRates] = useState<Record<string, Record<string, number>>>({})

  useEffect(() => { fetchPrices() }, [])
  useEffect(() => { calculateCrossRates() }, [usdRates])

  const calculateCrossRates = () => {
    const rates: Record<string, Record<string, number>> = {}
    CURRENCIES.forEach(from => {
      rates[from.code] = {}
      CURRENCIES.forEach(to => {
        if (from.code === to.code) {
          rates[from.code][to.code] = 1
        } else if (from.code === 'USD') {
          rates[from.code][to.code] = usdRates[to.code] || 0
        } else if (to.code === 'USD') {
          rates[from.code][to.code] = usdRates[from.code] ? 1 / usdRates[from.code] : 0
        } else {
          const fromToUsd = usdRates[from.code] ? 1 / usdRates[from.code] : 0
          const usdToTarget = usdRates[to.code] || 0
          rates[from.code][to.code] = fromToUsd * usdToTarget
        }
      })
    })
    setCrossRates(rates)
  }

  const fetchPrices = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/prices')
      const data = await response.json()
      if (data.success) {
        if (data.gold) {
          setGoldPrices(prev => ({
            gram24: data.gold.gram24 ?? prev.gram24,
            gram22: data.gold.gram22 ?? prev.gram22,
            gram18: data.gold.gram18 ?? prev.gram18,
            ceyrek: data.gold.ceyrek ?? prev.ceyrek,
            yarim: data.gold.yarim ?? prev.yarim,
            tam: data.gold.tam ?? prev.tam,
            cumhuriyet: data.gold.cumhuriyet ?? prev.cumhuriyet,
            ata: data.gold.ata ?? prev.ata,
            resat: data.gold.resat ?? prev.resat,
            onsUsd: data.gold.onsUsd ?? prev.onsUsd,
          }))
        }
        if (data.usdRates) {
          setUsdRates(prev => ({
            TRY: data.usdRates.TRY ?? prev.TRY,
            EUR: data.usdRates.EUR ?? prev.EUR,
            GBP: data.usdRates.GBP ?? prev.GBP,
            CHF: data.usdRates.CHF ?? prev.CHF,
            JPY: data.usdRates.JPY ?? prev.JPY,
            SAR: data.usdRates.SAR ?? prev.SAR,
            AED: data.usdRates.AED ?? prev.AED,
            CAD: data.usdRates.CAD ?? prev.CAD,
            AUD: data.usdRates.AUD ?? prev.AUD,
            CNY: data.usdRates.CNY ?? prev.CNY,
            RUB: data.usdRates.RUB ?? prev.RUB,
          }))
        }
        if (data.zakat) {
          setZakatSettings(prev => ({
            goldGramPrice: data.zakat.goldGramPrice ?? prev.goldGramPrice,
            silverGramPrice: data.zakat.silverGramPrice ?? prev.silverGramPrice,
          }))
        }
      }
    } catch { setMessage({ type: 'error', text: 'Fiyatlar yüklenirken hata oluştu' }) }
    finally { setLoading(false) }
  }

  const handleSave = async (type: 'gold' | 'currency' | 'zakat') => {
    try {
      setSaving(type)
      const payload: Record<string, unknown> = { type }
      if (type === 'gold') payload.data = goldPrices
      else if (type === 'currency') payload.data = { usdRates, crossRates, lastUpdate: new Date().toISOString() }
      else payload.data = zakatSettings
      
      const response = await fetch('/api/admin/prices', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const result = await response.json()
      if (result.success) {
        setMessage({ type: 'success', text: `${type === 'gold' ? 'Altın fiyatları' : type === 'currency' ? 'Döviz kurları' : 'Zekat ayarları'} güncellendi!` })
      } else { setMessage({ type: 'error', text: result.error || 'Güncelleme başarısız' }) }
    } catch { setMessage({ type: 'error', text: 'Kaydetme sırasında hata oluştu' }) }
    finally { setSaving(null); setTimeout(() => setMessage(null), 3000) }
  }

  if (loading) {
    return <div className="flex justify-center items-center min-h-[400px]"><Loader2 className="h-8 w-8 animate-spin text-purple-600" /></div>
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <Coins className="h-8 w-8 text-amber-600" />Fiyat Yönetimi
          </h1>
          <p className="text-slate-600 mt-1">Altın, döviz kurları ve zekat hesaplama ayarları</p>
        </div>
        <Button onClick={fetchPrices} variant="outline"><RefreshCw className="h-4 w-4 mr-2" />Yenile</Button>
      </div>

      {message && (
        <div className={`p-4 rounded-lg flex items-center gap-3 ${message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
          {message.type === 'success' ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
          {message.text}
        </div>
      )}

      <Tabs defaultValue="gold" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="gold" className="flex items-center gap-2"><Coins className="h-4 w-4" />Altın</TabsTrigger>
          <TabsTrigger value="currency" className="flex items-center gap-2"><Banknote className="h-4 w-4" />Döviz</TabsTrigger>
          <TabsTrigger value="zakat" className="flex items-center gap-2"><DollarSign className="h-4 w-4" />Zekat</TabsTrigger>
        </TabsList>

        <TabsContent value="gold">
          <Card className="border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50">
            <CardHeader>
              <CardTitle className="text-amber-900 flex items-center gap-2"><Coins className="h-5 w-5" />Altın Fiyatları</CardTitle>
              <CardDescription>Altın Hesaplama aracı için güncel fiyatlar (₺)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-amber-800 mb-3">Gram Altın Fiyatları</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="space-y-2"><Label>24 Ayar Gram (₺)</Label><Input type="number" step="0.01" value={goldPrices.gram24} onChange={(e) => setGoldPrices({...goldPrices, gram24: parseFloat(e.target.value) || 0})} className="h-12 text-lg font-semibold" /></div>
                  <div className="space-y-2"><Label>22 Ayar Gram (₺)</Label><Input type="number" step="0.01" value={goldPrices.gram22} onChange={(e) => setGoldPrices({...goldPrices, gram22: parseFloat(e.target.value) || 0})} className="h-12 text-lg font-semibold" /></div>
                  <div className="space-y-2"><Label>18 Ayar Gram (₺)</Label><Input type="number" step="0.01" value={goldPrices.gram18} onChange={(e) => setGoldPrices({...goldPrices, gram18: parseFloat(e.target.value) || 0})} className="h-12 text-lg font-semibold" /></div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-amber-800 mb-3">Ziynet Altın</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="space-y-2"><Label>Çeyrek (₺)</Label><Input type="number" step="0.01" value={goldPrices.ceyrek} onChange={(e) => setGoldPrices({...goldPrices, ceyrek: parseFloat(e.target.value) || 0})} className="h-12 text-lg font-semibold" /></div>
                  <div className="space-y-2"><Label>Yarım (₺)</Label><Input type="number" step="0.01" value={goldPrices.yarim} onChange={(e) => setGoldPrices({...goldPrices, yarim: parseFloat(e.target.value) || 0})} className="h-12 text-lg font-semibold" /></div>
                  <div className="space-y-2"><Label>Tam (₺)</Label><Input type="number" step="0.01" value={goldPrices.tam} onChange={(e) => setGoldPrices({...goldPrices, tam: parseFloat(e.target.value) || 0})} className="h-12 text-lg font-semibold" /></div>
                  <div className="space-y-2"><Label>Cumhuriyet (₺)</Label><Input type="number" step="0.01" value={goldPrices.cumhuriyet} onChange={(e) => setGoldPrices({...goldPrices, cumhuriyet: parseFloat(e.target.value) || 0})} className="h-12 text-lg font-semibold" /></div>
                  <div className="space-y-2"><Label>Ata (₺)</Label><Input type="number" step="0.01" value={goldPrices.ata} onChange={(e) => setGoldPrices({...goldPrices, ata: parseFloat(e.target.value) || 0})} className="h-12 text-lg font-semibold" /></div>
                  <div className="space-y-2"><Label>Reşat (₺)</Label><Input type="number" step="0.01" value={goldPrices.resat} onChange={(e) => setGoldPrices({...goldPrices, resat: parseFloat(e.target.value) || 0})} className="h-12 text-lg font-semibold" /></div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-amber-800 mb-3">Uluslararası</h3>
                <div className="space-y-2 w-48"><Label>Ons Altın (USD)</Label><Input type="number" step="0.01" value={goldPrices.onsUsd} onChange={(e) => setGoldPrices({...goldPrices, onsUsd: parseFloat(e.target.value) || 0})} className="h-12 text-lg font-semibold" /></div>
              </div>
              <Button onClick={() => handleSave('gold')} disabled={saving === 'gold'} className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700">
                {saving === 'gold' ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}Altın Fiyatlarını Kaydet
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="currency">
          <div className="space-y-6">
            <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
              <CardHeader>
                <CardTitle className="text-green-900 flex items-center gap-2"><DollarSign className="h-5 w-5" />USD Bazlı Kur Girişi</CardTitle>
                <CardDescription>1 USD = X para birimi şeklinde girin. Çapraz kurlar otomatik hesaplanır.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {CURRENCIES.filter(c => c.code !== 'USD').map(currency => (
                    <div key={currency.code} className="space-y-2">
                      <Label className="flex items-center gap-2"><span>{currency.flag}</span>1 USD = ? {currency.code}</Label>
                      <Input type="number" step="0.0001" value={usdRates[currency.code] ?? 0} onChange={(e) => setUsdRates({...usdRates, [currency.code]: parseFloat(e.target.value) || 0})} className="h-12 text-lg font-semibold" />
                    </div>
                  ))}
                </div>
                <Button onClick={() => handleSave('currency')} disabled={saving === 'currency'} className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                  {saving === 'currency' ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}Döviz Kurlarını Kaydet
                </Button>
              </CardContent>
            </Card>
            <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardHeader>
                <CardTitle className="text-blue-900 flex items-center gap-2"><ArrowRightLeft className="h-5 w-5" />Otomatik Hesaplanan Çapraz Kurlar</CardTitle>
                <CardDescription>USD kurlarına göre otomatik hesaplanan değerler</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="border-b-2 border-blue-200"><th className="text-left p-2 font-semibold text-blue-900">From / To</th>{CURRENCIES.slice(0, 6).map(c => (<th key={c.code} className="text-center p-2 font-semibold text-blue-900">{c.flag} {c.code}</th>))}</tr></thead>
                    <tbody>{CURRENCIES.slice(0, 6).map(from => (<tr key={from.code} className="border-b border-blue-100"><td className="p-2 font-semibold text-blue-800">{from.flag} {from.code}</td>{CURRENCIES.slice(0, 6).map(to => (<td key={to.code} className="text-center p-2">{from.code === to.code ? <span className="text-slate-400">1.0000</span> : <span className="font-mono text-blue-700">{crossRates[from.code]?.[to.code]?.toFixed(4) || '-'}</span>}</td>))}</tr>))}</tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="zakat">
          <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-violet-50">
            <CardHeader>
              <CardTitle className="text-purple-900 flex items-center gap-2"><Calculator className="h-5 w-5" />Zekat Hesaplama Ayarları</CardTitle>
              <CardDescription>Zekat hesaplama için altın ve gümüş gram fiyatları</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Altın Gram Fiyatı (₺)</Label><Input type="number" step="0.01" value={zakatSettings.goldGramPrice} onChange={(e) => setZakatSettings({...zakatSettings, goldGramPrice: parseFloat(e.target.value) || 0})} className="h-12 text-lg font-semibold" /><p className="text-xs text-slate-500">24 ayar altın gram fiyatı</p></div>
                <div className="space-y-2"><Label>Gümüş Gram Fiyatı (₺)</Label><Input type="number" step="0.01" value={zakatSettings.silverGramPrice} onChange={(e) => setZakatSettings({...zakatSettings, silverGramPrice: parseFloat(e.target.value) || 0})} className="h-12 text-lg font-semibold" /></div>
              </div>
              <div className="bg-purple-100 border-2 border-purple-300 rounded-lg p-4 space-y-3">
                <h4 className="font-semibold text-purple-900">Otomatik Hesaplanan Nisap Değerleri</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="text-purple-700">Altın Nisabı (85 gram):</span><span className="font-bold text-purple-900 ml-2">{(zakatSettings.goldGramPrice * 85).toLocaleString('tr-TR')} ₺</span></div>
                  <div><span className="text-purple-700">Gümüş Nisabı (595 gram):</span><span className="font-bold text-purple-900 ml-2">{(zakatSettings.silverGramPrice * 595).toLocaleString('tr-TR')} ₺</span></div>
                </div>
              </div>
              <Button onClick={() => handleSave('zakat')} disabled={saving === 'zakat'} className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700">
                {saving === 'zakat' ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}Zekat Ayarlarını Kaydet
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
