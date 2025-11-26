'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { 
  Wallet, Save, RefreshCw, Plus, Trash2, Percent, 
  DollarSign, Calculator, AlertCircle
} from 'lucide-react'

interface TaxBracket {
  min: number
  max: number | null
  rate: number
}

interface DeductionRates {
  sgk: number
  issizlik: number
  gelirVergisi: number
  damgaVergisi: number
}

interface SalarySettings {
  minWage: number
  taxBrackets: TaxBracket[]
  deductionRates: DeductionRates
  year: number
  updatedAt?: Date
}

export default function SalarySettingsPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [activeTab, setActiveTab] = useState('general')
  
  const [settings, setSettings] = useState<SalarySettings>({
    minWage: 22104,
    year: new Date().getFullYear(),
    taxBrackets: [
      { min: 0, max: 110000, rate: 15 },
      { min: 110000, max: 230000, rate: 20 },
      { min: 230000, max: 580000, rate: 27 },
      { min: 580000, max: 3000000, rate: 35 },
      { min: 3000000, max: null, rate: 40 }
    ],
    deductionRates: {
      sgk: 14,
      issizlik: 1,
      gelirVergisi: 15,
      damgaVergisi: 0.759
    }
  })

  useEffect(() => {
    const loadSettings = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/admin/salary-settings')
        const data = await response.json()
        
        if (data.success && data.settings) {
          setSettings(data.settings)
        }
      } catch (error) {
        console.error('Error loading settings:', error)
      } finally {
        setLoading(false)
      }
    }

    loadSettings()
  }, [])

  const handleSave = async () => {
    try {
      setSaving(true)
      const response = await fetch('/api/admin/salary-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      })

      const result = await response.json()

      if (result.success) {
        setMessage('✓ Ayarlar kaydedildi')
        setTimeout(() => setMessage(''), 3000)
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      console.error('Error saving:', error)
      setMessage('❌ Kaydetme hatası')
    } finally {
      setSaving(false)
    }
  }

  const addTaxBracket = () => {
    const lastBracket = settings.taxBrackets[settings.taxBrackets.length - 1]
    setSettings(prev => ({
      ...prev,
      taxBrackets: [
        ...prev.taxBrackets.slice(0, -1),
        { ...lastBracket, max: (lastBracket.min || 0) + 100000 },
        { min: (lastBracket.min || 0) + 100000, max: null, rate: lastBracket.rate + 5 }
      ]
    }))
  }

  const removeTaxBracket = (index: number) => {
    if (settings.taxBrackets.length <= 1) return
    
    setSettings(prev => ({
      ...prev,
      taxBrackets: prev.taxBrackets.filter((_, i) => i !== index)
    }))
  }

  const updateTaxBracket = (index: number, field: keyof TaxBracket, value: number | null) => {
    setSettings(prev => ({
      ...prev,
      taxBrackets: prev.taxBrackets.map((bracket, i) => 
        i === index ? { ...bracket, [field]: value } : bracket
      )
    }))
  }

  const updateDeductionRate = (field: keyof DeductionRates, value: number) => {
    setSettings(prev => ({
      ...prev,
      deductionRates: {
        ...prev.deductionRates,
        [field]: value
      }
    }))
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('tr-TR', { 
      style: 'currency', 
      currency: 'TRY',
      minimumFractionDigits: 0 
    }).format(value)
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-3">
            <Wallet className="w-8 h-8 text-blue-600" />
            Maaş Hesaplama Ayarları
          </h1>
          <p className="text-slate-600">
            Brüt-Net maaş hesaplama için vergi dilimleri ve kesinti oranlarını yönetin
          </p>
        </div>
        <div className="flex items-center gap-3">
          {message && (
            <Badge variant={message.includes('✓') ? 'default' : 'destructive'} className="px-4 py-2">
              {message}
            </Badge>
          )}
          <Button onClick={handleSave} disabled={saving} className="bg-blue-600 hover:bg-blue-700">
            {saving ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Kaydet
          </Button>
        </div>
      </div>

      {loading ? (
        <Card className="p-12 text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-slate-500">Yükleniyor...</p>
        </Card>
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Genel Ayarlar
            </TabsTrigger>
            <TabsTrigger value="tax" className="flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              Vergi Dilimleri
            </TabsTrigger>
            <TabsTrigger value="deductions" className="flex items-center gap-2">
              <Percent className="w-4 h-4" />
              Kesinti Oranları
            </TabsTrigger>
          </TabsList>

          {/* Genel Ayarlar */}
          <TabsContent value="general">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  Asgari Ücret
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Brüt Asgari Ücret (TL)
                    </label>
                    <Input
                      type="number"
                      value={settings.minWage}
                      onChange={(e) => setSettings(prev => ({ ...prev, minWage: parseFloat(e.target.value) || 0 }))}
                      className="text-xl font-bold"
                    />
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700">
                      <strong>Güncel Değer:</strong> {formatCurrency(settings.minWage)}
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-purple-600" />
                  Yıl Bilgisi
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Geçerli Yıl
                    </label>
                    <Input
                      type="number"
                      value={settings.year}
                      onChange={(e) => setSettings(prev => ({ ...prev, year: parseInt(e.target.value) || new Date().getFullYear() }))}
                      className="text-xl font-bold"
                    />
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-purple-700">
                      Vergi dilimleri ve kesinti oranları bu yıl için geçerli olacaktır.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Vergi Dilimleri */}
          <TabsContent value="tax">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-orange-600" />
                  Gelir Vergisi Dilimleri ({settings.year})
                </h3>
                <Button onClick={addTaxBracket} variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Dilim Ekle
                </Button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-12 gap-4 text-sm font-medium text-slate-600 pb-2 border-b">
                  <div className="col-span-4">Alt Limit (TL)</div>
                  <div className="col-span-4">Üst Limit (TL)</div>
                  <div className="col-span-3">Oran (%)</div>
                  <div className="col-span-1"></div>
                </div>

                {settings.taxBrackets.map((bracket, index) => (
                  <div key={index} className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-4">
                      <Input
                        type="number"
                        value={bracket.min}
                        onChange={(e) => updateTaxBracket(index, 'min', parseFloat(e.target.value) || 0)}
                        placeholder="0"
                      />
                    </div>
                    <div className="col-span-4">
                      <Input
                        type="number"
                        value={bracket.max || ''}
                        onChange={(e) => updateTaxBracket(index, 'max', e.target.value ? parseFloat(e.target.value) : null)}
                        placeholder="Sınırsız"
                      />
                    </div>
                    <div className="col-span-3">
                      <div className="relative">
                        <Input
                          type="number"
                          value={bracket.rate}
                          onChange={(e) => updateTaxBracket(index, 'rate', parseFloat(e.target.value) || 0)}
                          className="pr-8"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400">%</span>
                      </div>
                    </div>
                    <div className="col-span-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeTaxBracket(index)}
                        disabled={settings.taxBrackets.length <= 1}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-orange-50 rounded-lg">
                <h4 className="font-medium text-orange-800 mb-2">Vergi Dilimleri Özeti</h4>
                <div className="space-y-1 text-sm text-orange-700">
                  {settings.taxBrackets.map((bracket, index) => (
                    <div key={index}>
                      {formatCurrency(bracket.min)} - {bracket.max ? formatCurrency(bracket.max) : '∞'}: 
                      <strong> %{bracket.rate}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Kesinti Oranları */}
          <TabsContent value="deductions">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">İşçi Payı Kesintileri</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      SGK Primi İşçi Payı (%)
                    </label>
                    <div className="relative">
                      <Input
                        type="number"
                        step="0.01"
                        value={settings.deductionRates.sgk}
                        onChange={(e) => updateDeductionRate('sgk', parseFloat(e.target.value) || 0)}
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400">%</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Standart: %14</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      İşsizlik Sigortası İşçi Payı (%)
                    </label>
                    <div className="relative">
                      <Input
                        type="number"
                        step="0.01"
                        value={settings.deductionRates.issizlik}
                        onChange={(e) => updateDeductionRate('issizlik', parseFloat(e.target.value) || 0)}
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400">%</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Standart: %1</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Vergi Kesintileri</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Gelir Vergisi Başlangıç Oranı (%)
                    </label>
                    <div className="relative">
                      <Input
                        type="number"
                        step="0.01"
                        value={settings.deductionRates.gelirVergisi}
                        onChange={(e) => updateDeductionRate('gelirVergisi', parseFloat(e.target.value) || 0)}
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400">%</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">İlk dilim oranı</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Damga Vergisi (%)
                    </label>
                    <div className="relative">
                      <Input
                        type="number"
                        step="0.001"
                        value={settings.deductionRates.damgaVergisi}
                        onChange={(e) => updateDeductionRate('damgaVergisi', parseFloat(e.target.value) || 0)}
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400">%</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Standart: %0.759</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 md:col-span-2">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Kesinti Özeti</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg text-center">
                    <p className="text-sm text-blue-600 mb-1">SGK</p>
                    <p className="text-2xl font-bold text-blue-700">%{settings.deductionRates.sgk}</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg text-center">
                    <p className="text-sm text-green-600 mb-1">İşsizlik</p>
                    <p className="text-2xl font-bold text-green-700">%{settings.deductionRates.issizlik}</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg text-center">
                    <p className="text-sm text-orange-600 mb-1">Gelir V.</p>
                    <p className="text-2xl font-bold text-orange-700">%{settings.deductionRates.gelirVergisi}</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg text-center">
                    <p className="text-sm text-purple-600 mb-1">Damga V.</p>
                    <p className="text-2xl font-bold text-purple-700">%{settings.deductionRates.damgaVergisi}</p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
