'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { 
  Save, 
  RefreshCw, 
  Briefcase, 
  Percent, 
  Calculator, 
  AlertCircle,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Trash2,
  Plus
} from 'lucide-react'

interface VergiDilimi {
  limit: number | null
  oran: number
  aciklama: string
}

interface IhbarSuresi {
  yilAraligi: string
  sure: number
  aciklama: string
}

interface CikisTuru {
  id: string
  label: string
  kidemHakki: boolean
  ihbarHakki: boolean
}

interface JobChangeSettings {
  yil: number
  vergiDilimleri: VergiDilimi[]
  sgkIsciOrani: number
  issizlikIsciOrani: number
  damgaVergisiOrani: number
  kidemTavani: number
  asgariUcretBrut: number
  asgariUcretNet: number
  ihbarSureleri: IhbarSuresi[]
  cikisTurleri: CikisTuru[]
  aciklamalar: {
    kidemTazminati: string
    ihbarTazminati: string
    kullanilamayanIzin: string
    kumulatifMatrah: string
  }
  updatedAt?: Date
}

export default function JobChangeSettingsPage() {
  const [settings, setSettings] = useState<JobChangeSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    vergiDilimleri: true,
    kesintiler: true,
    kidemIhbar: true,
    cikisTurleri: false,
    aciklamalar: false
  })

  // Ayarları yükle
  const loadSettings = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/job-change-settings')
      const data = await response.json()
      
      if (data.success) {
        setSettings(data.settings)
      } else {
        setMessage({ type: 'error', text: 'Ayarlar yüklenemedi' })
      }
    } catch (error) {
      console.error('Error loading settings:', error)
      setMessage({ type: 'error', text: 'Bağlantı hatası' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSettings()
  }, [])

  // Ayarları kaydet
  const saveSettings = async () => {
    if (!settings) return

    try {
      setSaving(true)
      const response = await fetch('/api/admin/job-change-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      })
      
      const data = await response.json()
      
      if (data.success) {
        setMessage({ type: 'success', text: 'Ayarlar başarıyla kaydedildi!' })
        setTimeout(() => setMessage(null), 3000)
      } else {
        setMessage({ type: 'error', text: data.error || 'Kaydetme hatası' })
      }
    } catch (error) {
      console.error('Error saving settings:', error)
      setMessage({ type: 'error', text: 'Kaydetme sırasında hata oluştu' })
    } finally {
      setSaving(false)
    }
  }

  // Section toggle
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  // Vergi dilimi güncelle
  const updateVergiDilimi = (index: number, field: keyof VergiDilimi, value: string | number | null) => {
    if (!settings) return
    const updated = [...settings.vergiDilimleri]
    updated[index] = { ...updated[index], [field]: value }
    setSettings({ ...settings, vergiDilimleri: updated })
  }

  // Çıkış türü güncelle
  const updateCikisTuru = (index: number, field: keyof CikisTuru, value: string | boolean) => {
    if (!settings) return
    const updated = [...settings.cikisTurleri]
    updated[index] = { ...updated[index], [field]: value }
    setSettings({ ...settings, cikisTurleri: updated })
  }

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin text-indigo-600 mx-auto mb-4" />
          <p className="text-slate-600">Ayarlar yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (!settings) {
    return (
      <div className="p-8">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-700">Ayarlar yüklenemedi. Lütfen sayfayı yenileyin.</p>
            <Button onClick={loadSettings} className="mt-4">
              <RefreshCw className="h-4 w-4 mr-2" />
              Tekrar Dene
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-3">
            <Briefcase className="h-8 w-8 text-indigo-600" />
            İş Değişikliği Hesaplama Ayarları
          </h1>
          <p className="text-slate-600">
            İş değişikliği maaş ve tazminat hesaplama aracı için sistem parametrelerini yönetin
          </p>
        </div>
        <div className="flex items-center gap-3">
          {message && (
            <div className={`px-4 py-2 rounded-lg flex items-center gap-2 animate-fade-in ${
              message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {message.type === 'success' ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
              {message.text}
            </div>
          )}
          <Button
            onClick={saveSettings}
            disabled={saving}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
          >
            {saving ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
            Kaydet
          </Button>
        </div>
      </div>

      {/* Yıl ve Genel Bilgiler */}
      <Card className="mb-6 border-2 border-indigo-100">
        <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-indigo-600" />
            Genel Parametreler
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <Label>Yıl</Label>
              <Input
                type="number"
                value={settings.yil}
                onChange={(e) => setSettings({ ...settings, yil: parseInt(e.target.value) || 2025 })}
              />
            </div>
            <div className="space-y-2">
              <Label>Kıdem Tazminatı Tavanı (TL)</Label>
              <Input
                type="number"
                step="0.01"
                value={settings.kidemTavani}
                onChange={(e) => setSettings({ ...settings, kidemTavani: parseFloat(e.target.value) || 0 })}
              />
            </div>
            <div className="space-y-2">
              <Label>Asgari Ücret Brüt (TL)</Label>
              <Input
                type="number"
                step="0.01"
                value={settings.asgariUcretBrut}
                onChange={(e) => setSettings({ ...settings, asgariUcretBrut: parseFloat(e.target.value) || 0 })}
              />
            </div>
            <div className="space-y-2">
              <Label>Asgari Ücret Net (TL)</Label>
              <Input
                type="number"
                step="0.01"
                value={settings.asgariUcretNet}
                onChange={(e) => setSettings({ ...settings, asgariUcretNet: parseFloat(e.target.value) || 0 })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Kesinti Oranları */}
      <Card className="mb-6 border-2 border-green-100">
        <CardHeader 
          className="bg-gradient-to-r from-green-50 to-emerald-50 cursor-pointer"
          onClick={() => toggleSection('kesintiler')}
        >
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Percent className="h-5 w-5 text-green-600" />
              Kesinti Oranları
            </div>
            {expandedSections.kesintiler ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </CardTitle>
        </CardHeader>
        {expandedSections.kesintiler && (
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label>SGK İşçi Payı (%)</Label>
                <div className="relative">
                  <Input
                    type="number"
                    step="0.01"
                    value={(settings.sgkIsciOrani * 100).toFixed(2)}
                    onChange={(e) => setSettings({ ...settings, sgkIsciOrani: parseFloat(e.target.value) / 100 || 0 })}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">%</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label>İşsizlik Sigortası İşçi Payı (%)</Label>
                <div className="relative">
                  <Input
                    type="number"
                    step="0.01"
                    value={(settings.issizlikIsciOrani * 100).toFixed(2)}
                    onChange={(e) => setSettings({ ...settings, issizlikIsciOrani: parseFloat(e.target.value) / 100 || 0 })}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">%</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Damga Vergisi (%)</Label>
                <div className="relative">
                  <Input
                    type="number"
                    step="0.001"
                    value={(settings.damgaVergisiOrani * 100).toFixed(3)}
                    onChange={(e) => setSettings({ ...settings, damgaVergisiOrani: parseFloat(e.target.value) / 100 || 0 })}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">%</span>
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-slate-50 rounded-lg text-sm text-slate-600">
              <p>• SGK İşçi Payı: Brüt maaştan kesilen sosyal güvenlik primi</p>
              <p>• İşsizlik Sigortası: Brüt maaştan kesilen işsizlik primi</p>
              <p>• Damga Vergisi: Brüt maaş üzerinden kesilen damga vergisi</p>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Vergi Dilimleri */}
      <Card className="mb-6 border-2 border-amber-100">
        <CardHeader 
          className="bg-gradient-to-r from-amber-50 to-orange-50 cursor-pointer"
          onClick={() => toggleSection('vergiDilimleri')}
        >
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-amber-600" />
              Gelir Vergisi Dilimleri ({settings.yil})
            </div>
            {expandedSections.vergiDilimleri ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </CardTitle>
        </CardHeader>
        {expandedSections.vergiDilimleri && (
          <CardContent className="p-6">
            <div className="space-y-4">
              {settings.vergiDilimleri.map((dilim, index) => (
                <div key={index} className="grid md:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-lg items-end">
                  <div className="space-y-2">
                    <Label>Üst Limit (TL)</Label>
                    <Input
                      type="number"
                      placeholder="Sınırsız"
                      value={dilim.limit ?? ''}
                      onChange={(e) => updateVergiDilimi(index, 'limit', e.target.value ? parseInt(e.target.value) : null)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Oran (%)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={(dilim.oran * 100).toFixed(0)}
                      onChange={(e) => updateVergiDilimi(index, 'oran', parseFloat(e.target.value) / 100 || 0)}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>Açıklama</Label>
                    <Input
                      value={dilim.aciklama}
                      onChange={(e) => updateVergiDilimi(index, 'aciklama', e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Çıkış Türleri */}
      <Card className="mb-6 border-2 border-purple-100">
        <CardHeader 
          className="bg-gradient-to-r from-purple-50 to-pink-50 cursor-pointer"
          onClick={() => toggleSection('cikisTurleri')}
        >
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-purple-600" />
              Çıkış Türleri ve Haklar
            </div>
            {expandedSections.cikisTurleri ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </CardTitle>
        </CardHeader>
        {expandedSections.cikisTurleri && (
          <CardContent className="p-6">
            <div className="space-y-3">
              {settings.cikisTurleri.map((tur, index) => (
                <div key={tur.id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                  <div className="flex-1">
                    <Input
                      value={tur.label}
                      onChange={(e) => updateCikisTuru(index, 'label', e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={tur.kidemHakki}
                        onChange={(e) => updateCikisTuru(index, 'kidemHakki', e.target.checked)}
                        className="w-4 h-4 rounded text-indigo-600"
                      />
                      <span className="text-sm">Kıdem Hakkı</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={tur.ihbarHakki}
                        onChange={(e) => updateCikisTuru(index, 'ihbarHakki', e.target.checked)}
                        className="w-4 h-4 rounded text-indigo-600"
                      />
                      <span className="text-sm">İhbar Hakkı</span>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* İhbar Süreleri */}
      <Card className="mb-6 border-2 border-blue-100">
        <CardHeader 
          className="bg-gradient-to-r from-blue-50 to-cyan-50 cursor-pointer"
          onClick={() => toggleSection('kidemIhbar')}
        >
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-blue-600" />
              İhbar Süreleri
            </div>
            {expandedSections.kidemIhbar ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </CardTitle>
        </CardHeader>
        {expandedSections.kidemIhbar && (
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {settings.ihbarSureleri.map((ihbar, index) => (
                <div key={index} className="p-4 bg-slate-50 rounded-lg text-center">
                  <Badge variant="secondary" className="mb-2">{ihbar.yilAraligi}</Badge>
                  <p className="text-2xl font-bold text-blue-600">{ihbar.sure} Hafta</p>
                  <p className="text-xs text-slate-500 mt-1">{ihbar.aciklama}</p>
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Son Güncelleme */}
      {settings.updatedAt && (
        <div className="text-center text-sm text-slate-500">
          Son güncelleme: {new Date(settings.updatedAt).toLocaleString('tr-TR')}
        </div>
      )}
    </div>
  )
}
