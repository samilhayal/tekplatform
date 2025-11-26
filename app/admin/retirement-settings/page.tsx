'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Clock, Save, RefreshCw, Plus, Trash2, Calendar, Users
} from 'lucide-react'

interface RetirementRule {
  id: string
  gender: 'erkek' | 'kadin'
  startYear: number
  endYear: number | null
  minAge: number
  minPremiumDays: number
  description: string
}

interface RetirementSettings {
  rules: RetirementRule[]
  year: number
}

export default function RetirementSettingsPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  
  const [settings, setSettings] = useState<RetirementSettings>({
    year: new Date().getFullYear(),
    rules: [
      { id: '1', gender: 'erkek', startYear: 1999, endYear: 2008, minAge: 60, minPremiumDays: 7000, description: '1999-2008 arası erkek' },
      { id: '2', gender: 'erkek', startYear: 2008, endYear: null, minAge: 65, minPremiumDays: 7200, description: '2008 sonrası erkek' },
      { id: '3', gender: 'kadin', startYear: 1999, endYear: 2008, minAge: 58, minPremiumDays: 7000, description: '1999-2008 arası kadın' },
      { id: '4', gender: 'kadin', startYear: 2008, endYear: null, minAge: 65, minPremiumDays: 7200, description: '2008 sonrası kadın' }
    ]
  })

  const [newRule, setNewRule] = useState<Partial<RetirementRule>>({
    gender: 'erkek',
    startYear: 2008,
    endYear: null,
    minAge: 65,
    minPremiumDays: 7200,
    description: ''
  })

  useEffect(() => {
    const loadSettings = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/admin/retirement-settings')
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
      const response = await fetch('/api/admin/retirement-settings', {
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

  const addRule = () => {
    if (!newRule.description || !newRule.minAge || !newRule.minPremiumDays) {
      setMessage('❌ Tüm alanları doldurun')
      setTimeout(() => setMessage(''), 3000)
      return
    }

    const id = Date.now().toString()
    setSettings(prev => ({
      ...prev,
      rules: [...prev.rules, { ...newRule, id } as RetirementRule]
    }))
    setNewRule({
      gender: 'erkek',
      startYear: 2008,
      endYear: null,
      minAge: 65,
      minPremiumDays: 7200,
      description: ''
    })
    setMessage('✓ Kural eklendi')
    setTimeout(() => setMessage(''), 3000)
  }

  const removeRule = (id: string) => {
    setSettings(prev => ({
      ...prev,
      rules: prev.rules.filter(r => r.id !== id)
    }))
  }

  const updateRule = (id: string, field: keyof RetirementRule, value: string | number | null) => {
    setSettings(prev => ({
      ...prev,
      rules: prev.rules.map(rule => 
        rule.id === id ? { ...rule, [field]: value } : rule
      )
    }))
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-3">
            <Clock className="w-8 h-8 text-amber-600" />
            Emeklilik Ayarları
          </h1>
          <p className="text-slate-600">
            Emeklilik yaşı ve prim gün sayısı kurallarını yönetin
          </p>
        </div>
        <div className="flex items-center gap-3">
          {message && (
            <Badge variant={message.includes('✓') ? 'default' : 'destructive'} className="px-4 py-2">
              {message}
            </Badge>
          )}
          <Button onClick={handleSave} disabled={saving} className="bg-amber-600 hover:bg-amber-700">
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
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-amber-600" />
          <p className="text-slate-500">Yükleniyor...</p>
        </Card>
      ) : (
        <>
          {/* Yeni Kural Ekle */}
          <Card className="p-6 mb-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5 text-blue-600" />
              Yeni Kural Ekle
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Cinsiyet</label>
                <select
                  value={newRule.gender}
                  onChange={(e) => setNewRule(prev => ({ ...prev, gender: e.target.value as 'erkek' | 'kadin' }))}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="erkek">Erkek</option>
                  <option value="kadin">Kadın</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Başlangıç Yılı</label>
                <Input
                  type="number"
                  value={newRule.startYear}
                  onChange={(e) => setNewRule(prev => ({ ...prev, startYear: parseInt(e.target.value) || 1999 }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Bitiş Yılı</label>
                <Input
                  type="number"
                  value={newRule.endYear || ''}
                  onChange={(e) => setNewRule(prev => ({ ...prev, endYear: e.target.value ? parseInt(e.target.value) : null }))}
                  placeholder="Sınırsız"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Min. Yaş</label>
                <Input
                  type="number"
                  value={newRule.minAge}
                  onChange={(e) => setNewRule(prev => ({ ...prev, minAge: parseInt(e.target.value) || 60 }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Min. Prim Gün</label>
                <Input
                  type="number"
                  value={newRule.minPremiumDays}
                  onChange={(e) => setNewRule(prev => ({ ...prev, minPremiumDays: parseInt(e.target.value) || 7000 }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Açıklama</label>
                <Input
                  value={newRule.description}
                  onChange={(e) => setNewRule(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Kural açıklaması"
                />
              </div>
              <div className="flex items-end">
                <Button onClick={addRule} disabled={saving} className="w-full bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Ekle
                </Button>
              </div>
            </div>
          </Card>

          {/* Kurallar Listesi */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-600" />
              Emeklilik Kuralları ({settings.rules.length})
            </h3>

            {/* Erkek Kuralları */}
            <div className="mb-8">
              <h4 className="text-md font-medium text-slate-800 mb-4 flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" />
                Erkek
              </h4>
              <div className="space-y-3">
                {settings.rules.filter(r => r.gender === 'erkek').map((rule) => (
                  <div key={rule.id} className="grid grid-cols-12 gap-4 items-center p-4 bg-blue-50 rounded-lg">
                    <div className="col-span-2">
                      <span className="text-xs text-slate-500">Dönem</span>
                      <p className="font-medium">{rule.startYear} - {rule.endYear || '∞'}</p>
                    </div>
                    <div className="col-span-2">
                      <span className="text-xs text-slate-500">Min. Yaş</span>
                      <Input
                        type="number"
                        value={rule.minAge}
                        onChange={(e) => updateRule(rule.id, 'minAge', parseInt(e.target.value) || 0)}
                        className="mt-1"
                      />
                    </div>
                    <div className="col-span-2">
                      <span className="text-xs text-slate-500">Min. Prim Gün</span>
                      <Input
                        type="number"
                        value={rule.minPremiumDays}
                        onChange={(e) => updateRule(rule.id, 'minPremiumDays', parseInt(e.target.value) || 0)}
                        className="mt-1"
                      />
                    </div>
                    <div className="col-span-5">
                      <span className="text-xs text-slate-500">Açıklama</span>
                      <Input
                        value={rule.description}
                        onChange={(e) => updateRule(rule.id, 'description', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div className="col-span-1 flex justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeRule(rule.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Kadın Kuralları */}
            <div>
              <h4 className="text-md font-medium text-slate-800 mb-4 flex items-center gap-2">
                <Users className="w-4 h-4 text-pink-600" />
                Kadın
              </h4>
              <div className="space-y-3">
                {settings.rules.filter(r => r.gender === 'kadin').map((rule) => (
                  <div key={rule.id} className="grid grid-cols-12 gap-4 items-center p-4 bg-pink-50 rounded-lg">
                    <div className="col-span-2">
                      <span className="text-xs text-slate-500">Dönem</span>
                      <p className="font-medium">{rule.startYear} - {rule.endYear || '∞'}</p>
                    </div>
                    <div className="col-span-2">
                      <span className="text-xs text-slate-500">Min. Yaş</span>
                      <Input
                        type="number"
                        value={rule.minAge}
                        onChange={(e) => updateRule(rule.id, 'minAge', parseInt(e.target.value) || 0)}
                        className="mt-1"
                      />
                    </div>
                    <div className="col-span-2">
                      <span className="text-xs text-slate-500">Min. Prim Gün</span>
                      <Input
                        type="number"
                        value={rule.minPremiumDays}
                        onChange={(e) => updateRule(rule.id, 'minPremiumDays', parseInt(e.target.value) || 0)}
                        className="mt-1"
                      />
                    </div>
                    <div className="col-span-5">
                      <span className="text-xs text-slate-500">Açıklama</span>
                      <Input
                        value={rule.description}
                        onChange={(e) => updateRule(rule.id, 'description', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div className="col-span-1 flex justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeRule(rule.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  )
}
