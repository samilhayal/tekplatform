'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { 
  Home, Save, RefreshCw, Percent, Building2, MapPin,
  Plus, Trash2, FileText
} from 'lucide-react'

interface TapuSettings {
  aliciHarcOrani: number
  saticiHarcOrani: number
  donerSermaye: number
  tapuKayitUcreti: number
  year: number
}

interface RayicBedel {
  id: string
  il: string
  ilce: string
  mahalle: string
  m2Fiyat: number
  yil: number
}

export default function TapuSettingsPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [activeTab, setActiveTab] = useState('tapu')
  
  const [tapuSettings, setTapuSettings] = useState<TapuSettings>({
    aliciHarcOrani: 2,
    saticiHarcOrani: 2,
    donerSermaye: 2150,
    tapuKayitUcreti: 457.30,
    year: new Date().getFullYear()
  })

  const [rayicBedeller, setRayicBedeller] = useState<RayicBedel[]>([])
  const [newRayic, setNewRayic] = useState<Partial<RayicBedel>>({
    il: '',
    ilce: '',
    mahalle: '',
    m2Fiyat: 0,
    yil: new Date().getFullYear()
  })

  useEffect(() => {
    const loadSettings = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/admin/tapu-settings')
        const data = await response.json()
        
        if (data.success) {
          if (data.tapuSettings) setTapuSettings(data.tapuSettings)
          if (data.rayicBedeller) setRayicBedeller(data.rayicBedeller)
        }
      } catch (error) {
        console.error('Error loading settings:', error)
      } finally {
        setLoading(false)
      }
    }

    loadSettings()
  }, [])

  const handleSaveTapu = async () => {
    try {
      setSaving(true)
      const response = await fetch('/api/admin/tapu-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'tapu', data: tapuSettings })
      })

      const result = await response.json()

      if (result.success) {
        setMessage('✓ Tapu ayarları kaydedildi')
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

  const handleAddRayic = async () => {
    if (!newRayic.il || !newRayic.ilce || !newRayic.mahalle || !newRayic.m2Fiyat) {
      setMessage('❌ Tüm alanları doldurun')
      setTimeout(() => setMessage(''), 3000)
      return
    }

    try {
      setSaving(true)
      const response = await fetch('/api/admin/tapu-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'rayic', data: newRayic })
      })

      const result = await response.json()

      if (result.success) {
        setRayicBedeller(prev => [...prev, { ...newRayic, id: result.id } as RayicBedel])
        setNewRayic({
          il: '',
          ilce: '',
          mahalle: '',
          m2Fiyat: 0,
          yil: new Date().getFullYear()
        })
        setMessage('✓ Rayiç bedel eklendi')
        setTimeout(() => setMessage(''), 3000)
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      console.error('Error adding:', error)
      setMessage('❌ Ekleme hatası')
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteRayic = async (id: string) => {
    try {
      setSaving(true)
      const response = await fetch('/api/admin/tapu-settings', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'rayic', id })
      })

      const result = await response.json()

      if (result.success) {
        setRayicBedeller(prev => prev.filter(r => r.id !== id))
        setMessage('✓ Rayiç bedel silindi')
        setTimeout(() => setMessage(''), 3000)
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      console.error('Error deleting:', error)
      setMessage('❌ Silme hatası')
    } finally {
      setSaving(false)
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('tr-TR', { 
      style: 'currency', 
      currency: 'TRY',
      minimumFractionDigits: 2 
    }).format(value)
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-3">
            <Home className="w-8 h-8 text-emerald-600" />
            Tapu & Rayiç Ayarları
          </h1>
          <p className="text-slate-600">
            Tapu harç oranları ve rayiç bedel bilgilerini yönetin
          </p>
        </div>
        {message && (
          <Badge variant={message.includes('✓') ? 'default' : 'destructive'} className="px-4 py-2">
            {message}
          </Badge>
        )}
      </div>

      {loading ? (
        <Card className="p-12 text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-emerald-600" />
          <p className="text-slate-500">Yükleniyor...</p>
        </Card>
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="tapu" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Tapu Harçları
            </TabsTrigger>
            <TabsTrigger value="rayic" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Rayiç Bedeller
            </TabsTrigger>
          </TabsList>

          {/* Tapu Harçları */}
          <TabsContent value="tapu">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-emerald-600" />
                  Tapu Harç Oranları ({tapuSettings.year})
                </h3>
                <Button onClick={handleSaveTapu} disabled={saving} className="bg-emerald-600 hover:bg-emerald-700">
                  {saving ? (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  Kaydet
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Alıcı Tapu Harcı Oranı (%)
                  </label>
                  <div className="relative">
                    <Input
                      type="number"
                      step="0.01"
                      value={tapuSettings.aliciHarcOrani}
                      onChange={(e) => setTapuSettings(prev => ({ ...prev, aliciHarcOrani: parseFloat(e.target.value) || 0 }))}
                    />
                    <Percent className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Standart: %2</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Satıcı Tapu Harcı Oranı (%)
                  </label>
                  <div className="relative">
                    <Input
                      type="number"
                      step="0.01"
                      value={tapuSettings.saticiHarcOrani}
                      onChange={(e) => setTapuSettings(prev => ({ ...prev, saticiHarcOrani: parseFloat(e.target.value) || 0 }))}
                    />
                    <Percent className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Standart: %2</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Döner Sermaye Ücreti (TL)
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={tapuSettings.donerSermaye}
                    onChange={(e) => setTapuSettings(prev => ({ ...prev, donerSermaye: parseFloat(e.target.value) || 0 }))}
                  />
                  <p className="text-xs text-slate-500 mt-1">2024: 2.150 TL</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Tapu Kayıt Ücreti (TL)
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={tapuSettings.tapuKayitUcreti}
                    onChange={(e) => setTapuSettings(prev => ({ ...prev, tapuKayitUcreti: parseFloat(e.target.value) || 0 }))}
                  />
                  <p className="text-xs text-slate-500 mt-1">2024: 457.30 TL</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Geçerli Yıl
                  </label>
                  <Input
                    type="number"
                    value={tapuSettings.year}
                    onChange={(e) => setTapuSettings(prev => ({ ...prev, year: parseInt(e.target.value) || new Date().getFullYear() }))}
                  />
                </div>
              </div>

              <div className="mt-6 p-4 bg-emerald-50 rounded-lg">
                <h4 className="font-medium text-emerald-800 mb-2">Özet</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-emerald-600">Alıcı Harcı:</span>
                    <strong className="ml-1">%{tapuSettings.aliciHarcOrani}</strong>
                  </div>
                  <div>
                    <span className="text-emerald-600">Satıcı Harcı:</span>
                    <strong className="ml-1">%{tapuSettings.saticiHarcOrani}</strong>
                  </div>
                  <div>
                    <span className="text-emerald-600">Döner Sermaye:</span>
                    <strong className="ml-1">{formatCurrency(tapuSettings.donerSermaye)}</strong>
                  </div>
                  <div>
                    <span className="text-emerald-600">Kayıt Ücreti:</span>
                    <strong className="ml-1">{formatCurrency(tapuSettings.tapuKayitUcreti)}</strong>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Rayiç Bedeller */}
          <TabsContent value="rayic">
            <Card className="p-6 mb-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-600" />
                Yeni Rayiç Bedel Ekle
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">İl</label>
                  <Input
                    value={newRayic.il}
                    onChange={(e) => setNewRayic(prev => ({ ...prev, il: e.target.value }))}
                    placeholder="İstanbul"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">İlçe</label>
                  <Input
                    value={newRayic.ilce}
                    onChange={(e) => setNewRayic(prev => ({ ...prev, ilce: e.target.value }))}
                    placeholder="Kadıköy"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Mahalle</label>
                  <Input
                    value={newRayic.mahalle}
                    onChange={(e) => setNewRayic(prev => ({ ...prev, mahalle: e.target.value }))}
                    placeholder="Caferağa"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">m² Fiyatı (TL)</label>
                  <Input
                    type="number"
                    value={newRayic.m2Fiyat || ''}
                    onChange={(e) => setNewRayic(prev => ({ ...prev, m2Fiyat: parseFloat(e.target.value) || 0 }))}
                    placeholder="15000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Yıl</label>
                  <Input
                    type="number"
                    value={newRayic.yil}
                    onChange={(e) => setNewRayic(prev => ({ ...prev, yil: parseInt(e.target.value) || new Date().getFullYear() }))}
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={handleAddRayic} disabled={saving} className="w-full bg-blue-600 hover:bg-blue-700">
                    {saving ? (
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Plus className="w-4 h-4 mr-2" />
                    )}
                    Ekle
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-600" />
                Kayıtlı Rayiç Bedeller ({rayicBedeller.length})
              </h3>
              
              {rayicBedeller.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                  <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Henüz kayıtlı rayiç bedel bulunmuyor.</p>
                  <p className="text-sm">Yukarıdaki formu kullanarak yeni kayıt ekleyebilirsiniz.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b text-left text-sm text-slate-600">
                        <th className="pb-3 font-medium">İl</th>
                        <th className="pb-3 font-medium">İlçe</th>
                        <th className="pb-3 font-medium">Mahalle</th>
                        <th className="pb-3 font-medium">m² Fiyatı</th>
                        <th className="pb-3 font-medium">Yıl</th>
                        <th className="pb-3 font-medium"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {rayicBedeller.map((rayic) => (
                        <tr key={rayic.id} className="border-b hover:bg-slate-50">
                          <td className="py-3">{rayic.il}</td>
                          <td className="py-3">{rayic.ilce}</td>
                          <td className="py-3">{rayic.mahalle}</td>
                          <td className="py-3 font-medium text-emerald-600">
                            {formatCurrency(rayic.m2Fiyat)}
                          </td>
                          <td className="py-3">
                            <Badge variant="outline">{rayic.yil}</Badge>
                          </td>
                          <td className="py-3">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteRayic(rayic.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
