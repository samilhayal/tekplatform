'use client'


import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Save, RefreshCw, TrendingUp, TrendingDown, AlertCircle, CheckCircle2 } from 'lucide-react'

interface GoldPrice {
  buying: number
  selling: number
}

interface GoldPrices {
  gramAltin: GoldPrice
  bilezik22: GoldPrice
  altin18: GoldPrice
  altin14: GoldPrice
  ceyrek: GoldPrice
  yarim: GoldPrice
  tam: GoldPrice
  cumhuriyet: GoldPrice
  ata: GoldPrice
  gumus: GoldPrice
}

interface CurrencyPrices {
  USD: number
  EUR: number
  GBP: number
  lastUpdate?: string
  autoUpdate?: boolean
  updateInterval?: number
}

interface ZakatPrices {
  goldPrice: number
  silverPrice: number
  nisab: number
  lastUpdate?: string
}

const goldTypeNames: Record<keyof GoldPrices, string> = {
  gramAltin: 'Gram Altin (24 Ayar)',
  bilezik22: '22 Ayar Bilezik',
  altin18: '18 Ayar Altin',
  altin14: '14 Ayar Altin',
  ceyrek: 'Ceyrek Altin',
  yarim: 'Yarim Altin',
  tam: 'Tam Altin',
  cumhuriyet: 'Cumhuriyet Altini',
  ata: 'Ata Altin',
  gumus: 'Gumus (1 Gram)'
}

const goldCategories = [
  { title: 'Gram Altin', keys: ['gramAltin'] as const },
  { title: 'Ayar Altinlar', keys: ['bilezik22', 'altin18', 'altin14'] as const },
  { title: 'Ziynet Altinlari', keys: ['ceyrek', 'yarim', 'tam'] as const },
  { title: 'Ozel Altinlar', keys: ['cumhuriyet', 'ata'] as const },
  { title: 'Gumus', keys: ['gumus'] as const }
]

function GoldPriceInput({ 
  goldType, 
  price, 
  onChange 
}: { 
  goldType: keyof GoldPrices
  price: GoldPrice
  onChange: (goldType: keyof GoldPrices, field: 'buying' | 'selling', value: number) => void 
}) {
  const spread = price.selling > 0 ? ((price.selling - price.buying) / price.selling * 100).toFixed(2) : '0'
  
  return (
    <div className="p-4 border rounded-lg bg-background/50">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-medium text-sm">{goldTypeNames[goldType]}</h4>
        <span className="text-xs text-muted-foreground">
          Fark: %{spread}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-xs text-green-600 flex items-center gap-1">
            <TrendingDown className="h-3 w-3" />
            Alis (TL)
          </Label>
          <Input
            type="number"
            step="0.01"
            value={price.buying || ''}
            onChange={(e) => onChange(goldType, 'buying', parseFloat(e.target.value) || 0)}
            className="mt-1"
            placeholder="0.00"
          />
        </div>
        <div>
          <Label className="text-xs text-red-600 flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            Satis (TL)
          </Label>
          <Input
            type="number"
            step="0.01"
            value={price.selling || ''}
            onChange={(e) => onChange(goldType, 'selling', parseFloat(e.target.value) || 0)}
            className="mt-1"
            placeholder="0.00"
          />
        </div>
      </div>
    </div>
  )
}

export default function AdminPricesPage() {
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [autoUpdating, setAutoUpdating] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [lastUpdate, setLastUpdate] = useState<string>('')

  const [goldPrices, setGoldPrices] = useState<GoldPrices>({
    gramAltin: { buying: 0, selling: 0 },
    bilezik22: { buying: 0, selling: 0 },
    altin18: { buying: 0, selling: 0 },
    altin14: { buying: 0, selling: 0 },
    ceyrek: { buying: 0, selling: 0 },
    yarim: { buying: 0, selling: 0 },
    tam: { buying: 0, selling: 0 },
    cumhuriyet: { buying: 0, selling: 0 },
    ata: { buying: 0, selling: 0 },
    gumus: { buying: 0, selling: 0 },
  })

  const [currencyPrices, setCurrencyPrices] = useState<CurrencyPrices>({
    USD: 0,
    EUR: 0,
    GBP: 0,
    autoUpdate: false,
    updateInterval: 60
  })

  const [zakatPrices, setZakatPrices] = useState<ZakatPrices>({
    goldPrice: 0,
    silverPrice: 0,
    nisab: 0
  })

  useEffect(() => {
    fetchPrices()
  }, [])

  const fetchPrices = async () => {
    setLoading(true)
    try {
      const [goldRes, currencyRes, zakatRes] = await Promise.all([
        fetch('/api/prices?type=gold'),
        fetch('/api/prices?type=currency'),
        fetch('/api/prices?type=zakat')
      ])

      if (goldRes.ok) {
        const goldData = await goldRes.json()
        if (goldData.data) {
          setGoldPrices(prev => ({ ...prev, ...goldData.data }))
          if (goldData.data.lastUpdate) {
            setLastUpdate(new Date(goldData.data.lastUpdate).toLocaleString('tr-TR'))
          }
        }
      }

      if (currencyRes.ok) {
        const currencyData = await currencyRes.json()
        if (currencyData.data) {
          setCurrencyPrices(prev => ({ ...prev, ...currencyData.data }))
        }
      }

      if (zakatRes.ok) {
        const zakatData = await zakatRes.json()
        if (zakatData.data) {
          setZakatPrices(prev => ({ ...prev, ...zakatData.data }))
        }
      }
    } catch (error) {
      console.error('Fiyatlar yuklenirken hata:', error)
      setMessage({ type: 'error', text: 'Fiyatlar yuklenirken hata olustu' })
    } finally {
      setLoading(false)
    }
  }

  const handleGoldPriceChange = (goldType: keyof GoldPrices, field: 'buying' | 'selling', value: number) => {
    setGoldPrices(prev => ({
      ...prev,
      [goldType]: { ...prev[goldType], [field]: value }
    }))
  }

  const handleCurrencyChange = (currency: 'USD' | 'EUR' | 'GBP', value: number) => {
    setCurrencyPrices(prev => ({ ...prev, [currency]: value }))
  }

  const handleZakatChange = (field: keyof ZakatPrices, value: number) => {
    setZakatPrices(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = async (priceType: 'gold' | 'currency' | 'zakat') => {
    setSaving(true)
    setMessage(null)

    try {
      let data: Record<string, unknown> = {}
      
      if (priceType === 'gold') {
        data = { ...goldPrices, lastUpdate: new Date().toISOString() }
      } else if (priceType === 'currency') {
        data = { ...currencyPrices, lastUpdate: new Date().toISOString() }
      } else if (priceType === 'zakat') {
        data = { ...zakatPrices, lastUpdate: new Date().toISOString() }
      }

      const response = await fetch('/api/admin/prices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: priceType, data })
      })

      if (response.ok) {
        setMessage({ type: 'success', text: 'Fiyatlar basariyla kaydedildi!' })
        setLastUpdate(new Date().toLocaleString('tr-TR'))
      } else {
        const error = await response.json()
        setMessage({ type: 'error', text: error.error || 'Kaydetme hatasi' })
      }
    } catch (error) {
      console.error('Kaydetme hatasi:', error)
      setMessage({ type: 'error', text: 'Fiyatlar kaydedilemedi' })
    } finally {
      setSaving(false)
    }
  }

  const handleAutoUpdate = async (priceType: 'gold' | 'currency') => {
    setAutoUpdating(true)
    setMessage(null)

    try {
      const response = await fetch('/api/admin/prices/auto-update?type=' + priceType, {
        method: 'POST'
      })

      if (response.ok) {
        const result = await response.json()
        
        if (priceType === 'gold' && result.data) {
          setGoldPrices(prev => ({ ...prev, ...result.data }))
        } else if (priceType === 'currency' && result.data) {
          setCurrencyPrices(prev => ({ ...prev, ...result.data }))
        }
        
        const typeName = priceType === 'gold' ? 'Altin' : 'Doviz'
        setMessage({ type: 'success', text: typeName + ' fiyatlari guncellendi!' })
        setLastUpdate(new Date().toLocaleString('tr-TR'))
      } else {
        const error = await response.json()
        setMessage({ type: 'error', text: error.error || 'API guncelleme hatasi' })
      }
    } catch (error) {
      console.error('Auto update hatasi:', error)
      setMessage({ type: 'error', text: 'Otomatik guncelleme basarisiz' })
    } finally {
      setAutoUpdating(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Fiyat Yonetimi</h1>
          <p className="text-muted-foreground">
            Altin, doviz ve zekat fiyatlarini yonetin
          </p>
        </div>
        {lastUpdate && (
          <div className="text-sm text-muted-foreground">
            Son guncelleme: {lastUpdate}
          </div>
        )}
      </div>

      {message && (
        <Alert variant={message.type === 'error' ? 'destructive' : 'default'}>
          {message.type === 'error' ? (
            <AlertCircle className="h-4 w-4" />
          ) : (
            <CheckCircle2 className="h-4 w-4" />
          )}
          <AlertDescription>{message.text}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="gold" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="gold">Altin/Gumus</TabsTrigger>
          <TabsTrigger value="currency">Doviz</TabsTrigger>
          <TabsTrigger value="zakat">Zekat</TabsTrigger>
        </TabsList>

        <TabsContent value="gold" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Altin ve Gumus Fiyatlari</CardTitle>
                  <CardDescription>
                    12 farkli altin ve gumus turu icin alis-satis fiyatlarini yonetin
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handleAutoUpdate('gold')}
                    disabled={autoUpdating}
                  >
                    {autoUpdating ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <RefreshCw className="h-4 w-4 mr-2" />
                    )}
                    API den Guncelle
                  </Button>
                  <Button
                    onClick={() => handleSave('gold')}
                    disabled={saving}
                  >
                    {saving ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <Save className="h-4 w-4 mr-2" />
                    )}
                    Kaydet
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {goldCategories.map((category) => (
                <div key={category.title} className="space-y-3">
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                    {category.title}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.keys.map((key) => (
                      <GoldPriceInput
                        key={key}
                        goldType={key}
                        price={goldPrices[key]}
                        onChange={handleGoldPriceChange}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="currency" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Doviz Kurlari</CardTitle>
                  <CardDescription>
                    USD, EUR ve GBP kurlarini yonetin
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handleAutoUpdate('currency')}
                    disabled={autoUpdating}
                  >
                    {autoUpdating ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <RefreshCw className="h-4 w-4 mr-2" />
                    )}
                    API den Guncelle
                  </Button>
                  <Button
                    onClick={() => handleSave('currency')}
                    disabled={saving}
                  >
                    {saving ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <Save className="h-4 w-4 mr-2" />
                    )}
                    Kaydet
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="usd">USD (Amerikan Dolari)</Label>
                  <Input
                    id="usd"
                    type="number"
                    step="0.0001"
                    value={currencyPrices.USD || ''}
                    onChange={(e) => handleCurrencyChange('USD', parseFloat(e.target.value) || 0)}
                    placeholder="0.0000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eur">EUR (Euro)</Label>
                  <Input
                    id="eur"
                    type="number"
                    step="0.0001"
                    value={currencyPrices.EUR || ''}
                    onChange={(e) => handleCurrencyChange('EUR', parseFloat(e.target.value) || 0)}
                    placeholder="0.0000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gbp">GBP (Ingiliz Sterlini)</Label>
                  <Input
                    id="gbp"
                    type="number"
                    step="0.0001"
                    value={currencyPrices.GBP || ''}
                    onChange={(e) => handleCurrencyChange('GBP', parseFloat(e.target.value) || 0)}
                    placeholder="0.0000"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="zakat" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Zekat Hesaplama Fiyatlari</CardTitle>
                  <CardDescription>
                    Zekat hesaplamasi icin kullanilan degerleri yonetin
                  </CardDescription>
                </div>
                <Button
                  onClick={() => handleSave('zakat')}
                  disabled={saving}
                >
                  {saving ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  Kaydet
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="goldPrice">Altin Fiyati (TL/gram)</Label>
                  <Input
                    id="goldPrice"
                    type="number"
                    step="0.01"
                    value={zakatPrices.goldPrice || ''}
                    onChange={(e) => handleZakatChange('goldPrice', parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                  />
                  <p className="text-xs text-muted-foreground">
                    24 ayar gram altin fiyati
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="silverPrice">Gumus Fiyati (TL/gram)</Label>
                  <Input
                    id="silverPrice"
                    type="number"
                    step="0.01"
                    value={zakatPrices.silverPrice || ''}
                    onChange={(e) => handleZakatChange('silverPrice', parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                  />
                  <p className="text-xs text-muted-foreground">
                    Saf gumus fiyati
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nisab">Nisab Miktari (gram altin)</Label>
                  <Input
                    id="nisab"
                    type="number"
                    step="0.01"
                    value={zakatPrices.nisab || ''}
                    onChange={(e) => handleZakatChange('nisab', parseFloat(e.target.value) || 0)}
                    placeholder="80.18"
                  />
                  <p className="text-xs text-muted-foreground">
                    Standart: 80.18 gram altin
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
