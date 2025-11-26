'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Shirt, Save, RefreshCw, Plus, Trash2, Edit2, X, Check
} from 'lucide-react'

interface SizeChart {
  size: string
  chest: string
  waist: string
  hips: string
}

interface Brand {
  id: string
  name: string
  logo?: string
  isActive: boolean
  sizeCharts: {
    men: SizeChart[]
    women: SizeChart[]
  }
}

export default function BrandsPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [brands, setBrands] = useState<Brand[]>([])
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  
  const [newBrand, setNewBrand] = useState<Partial<Brand>>({
    name: '',
    logo: '',
    isActive: true,
    sizeCharts: {
      men: [
        { size: 'XS', chest: '86-91', waist: '71-76', hips: '86-91' },
        { size: 'S', chest: '91-96', waist: '76-81', hips: '91-96' },
        { size: 'M', chest: '96-101', waist: '81-86', hips: '96-101' },
        { size: 'L', chest: '101-106', waist: '86-91', hips: '101-106' },
        { size: 'XL', chest: '106-111', waist: '91-96', hips: '106-111' },
        { size: 'XXL', chest: '111-116', waist: '96-101', hips: '111-116' }
      ],
      women: [
        { size: 'XS', chest: '81-86', waist: '61-66', hips: '86-91' },
        { size: 'S', chest: '86-91', waist: '66-71', hips: '91-96' },
        { size: 'M', chest: '91-96', waist: '71-76', hips: '96-101' },
        { size: 'L', chest: '96-101', waist: '76-81', hips: '101-106' },
        { size: 'XL', chest: '101-106', waist: '81-86', hips: '106-111' },
        { size: 'XXL', chest: '106-111', waist: '86-91', hips: '111-116' }
      ]
    }
  })

  useEffect(() => {
    const loadBrands = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/admin/brands')
        const data = await response.json()
        
        if (data.success) {
          setBrands(data.brands)
        }
      } catch (error) {
        console.error('Error loading brands:', error)
      } finally {
        setLoading(false)
      }
    }

    loadBrands()
  }, [])

  const handleAddBrand = async () => {
    if (!newBrand.name) {
      setMessage('❌ Marka adı gerekli')
      setTimeout(() => setMessage(''), 3000)
      return
    }

    try {
      setSaving(true)
      const response = await fetch('/api/admin/brands', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBrand)
      })

      const result = await response.json()

      if (result.success) {
        setBrands(prev => [...prev, { ...newBrand, id: result.id } as Brand])
        setNewBrand({
          name: '',
          logo: '',
          isActive: true,
          sizeCharts: newBrand.sizeCharts
        })
        setShowAddForm(false)
        setMessage('✓ Marka eklendi')
        setTimeout(() => setMessage(''), 3000)
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      console.error('Error adding brand:', error)
      setMessage('❌ Ekleme hatası')
    } finally {
      setSaving(false)
    }
  }

  const handleUpdateBrand = async (brand: Brand) => {
    try {
      setSaving(true)
      const response = await fetch('/api/admin/brands', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(brand)
      })

      const result = await response.json()

      if (result.success) {
        setBrands(prev => prev.map(b => b.id === brand.id ? brand : b))
        setEditingBrand(null)
        setMessage('✓ Marka güncellendi')
        setTimeout(() => setMessage(''), 3000)
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      console.error('Error updating brand:', error)
      setMessage('❌ Güncelleme hatası')
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteBrand = async (id: string) => {
    if (!confirm('Bu markayı silmek istediğinize emin misiniz?')) return

    try {
      setSaving(true)
      const response = await fetch('/api/admin/brands', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      })

      const result = await response.json()

      if (result.success) {
        setBrands(prev => prev.filter(b => b.id !== id))
        setMessage('✓ Marka silindi')
        setTimeout(() => setMessage(''), 3000)
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      console.error('Error deleting brand:', error)
      setMessage('❌ Silme hatası')
    } finally {
      setSaving(false)
    }
  }

  const toggleBrandStatus = async (brand: Brand) => {
    const updatedBrand = { ...brand, isActive: !brand.isActive }
    await handleUpdateBrand(updatedBrand)
  }

  const updateSizeChart = (gender: 'men' | 'women', index: number, field: keyof SizeChart, value: string) => {
    if (editingBrand) {
      setEditingBrand(prev => {
        if (!prev) return prev
        const newCharts = [...prev.sizeCharts[gender]]
        newCharts[index] = { ...newCharts[index], [field]: value }
        return {
          ...prev,
          sizeCharts: {
            ...prev.sizeCharts,
            [gender]: newCharts
          }
        }
      })
    }
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-3">
            <Shirt className="w-8 h-8 text-indigo-600" />
            Marka Yönetimi
          </h1>
          <p className="text-slate-600">
            Akıllı beden seçici için marka ve beden tablosu bilgilerini yönetin
          </p>
        </div>
        <div className="flex items-center gap-3">
          {message && (
            <Badge variant={message.includes('✓') ? 'default' : 'destructive'} className="px-4 py-2">
              {message}
            </Badge>
          )}
          <Button 
            onClick={() => setShowAddForm(true)} 
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Yeni Marka
          </Button>
        </div>
      </div>

      {loading ? (
        <Card className="p-12 text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-indigo-600" />
          <p className="text-slate-500">Yükleniyor...</p>
        </Card>
      ) : (
        <>
          {/* Add Brand Form */}
          {showAddForm && (
            <Card className="p-6 mb-6 border-2 border-indigo-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-indigo-600" />
                  Yeni Marka Ekle
                </h3>
                <Button variant="ghost" size="sm" onClick={() => setShowAddForm(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Marka Adı *</label>
                  <Input
                    value={newBrand.name}
                    onChange={(e) => setNewBrand(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Nike, Adidas, vs."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Logo URL</label>
                  <Input
                    value={newBrand.logo}
                    onChange={(e) => setNewBrand(prev => ({ ...prev, logo: e.target.value }))}
                    placeholder="https://..."
                  />
                </div>
                <div className="flex items-end">
                  <Button 
                    onClick={handleAddBrand} 
                    disabled={saving} 
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    {saving ? (
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Check className="w-4 h-4 mr-2" />
                    )}
                    Ekle
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Brands List */}
          <div className="space-y-4">
            {brands.length === 0 ? (
              <Card className="p-12 text-center">
                <Shirt className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                <p className="text-slate-500">Henüz marka eklenmemiş.</p>
                <p className="text-sm text-slate-400">Yukarıdaki "Yeni Marka" butonunu kullanarak ekleyebilirsiniz.</p>
              </Card>
            ) : (
              brands.map(brand => (
                <Card key={brand.id} className={`p-6 ${!brand.isActive ? 'opacity-60' : ''}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      {brand.logo && (
                        <img src={brand.logo} alt={brand.name} className="w-12 h-12 object-contain" />
                      )}
                      <div>
                        <h3 className="text-xl font-semibold text-slate-900">{brand.name}</h3>
                        <Badge variant={brand.isActive ? 'default' : 'secondary'}>
                          {brand.isActive ? 'Aktif' : 'Pasif'}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        variant={brand.isActive ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleBrandStatus(brand)}
                        className={brand.isActive ? "bg-green-600 hover:bg-green-700" : ""}
                      >
                        {brand.isActive ? 'Aktif' : 'Pasif'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingBrand(brand)}
                      >
                        <Edit2 className="w-4 h-4 mr-2" />
                        Düzenle
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteBrand(brand.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Size Charts Preview */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium text-blue-700">Erkek Bedenleri:</span>
                      <span className="ml-2 text-blue-600">
                        {brand.sizeCharts?.men?.map(s => s.size).join(', ') || 'Tanımlanmamış'}
                      </span>
                    </div>
                    <div className="p-3 bg-pink-50 rounded-lg">
                      <span className="font-medium text-pink-700">Kadın Bedenleri:</span>
                      <span className="ml-2 text-pink-600">
                        {brand.sizeCharts?.women?.map(s => s.size).join(', ') || 'Tanımlanmamış'}
                      </span>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>

          {/* Edit Modal */}
          {editingBrand && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                    <Edit2 className="w-5 h-5 text-indigo-600" />
                    {editingBrand.name} - Beden Tablosu Düzenle
                  </h3>
                  <Button variant="ghost" size="sm" onClick={() => setEditingBrand(null)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {/* Men's Size Chart */}
                <div className="mb-6">
                  <h4 className="font-medium text-blue-700 mb-3">Erkek Beden Tablosu (cm)</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 px-2">Beden</th>
                          <th className="text-left py-2 px-2">Göğüs</th>
                          <th className="text-left py-2 px-2">Bel</th>
                          <th className="text-left py-2 px-2">Kalça</th>
                        </tr>
                      </thead>
                      <tbody>
                        {editingBrand.sizeCharts?.men?.map((size, index) => (
                          <tr key={index} className="border-b">
                            <td className="py-2 px-2">
                              <Input
                                value={size.size}
                                onChange={(e) => updateSizeChart('men', index, 'size', e.target.value)}
                                className="w-20"
                              />
                            </td>
                            <td className="py-2 px-2">
                              <Input
                                value={size.chest}
                                onChange={(e) => updateSizeChart('men', index, 'chest', e.target.value)}
                                className="w-24"
                              />
                            </td>
                            <td className="py-2 px-2">
                              <Input
                                value={size.waist}
                                onChange={(e) => updateSizeChart('men', index, 'waist', e.target.value)}
                                className="w-24"
                              />
                            </td>
                            <td className="py-2 px-2">
                              <Input
                                value={size.hips}
                                onChange={(e) => updateSizeChart('men', index, 'hips', e.target.value)}
                                className="w-24"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Women's Size Chart */}
                <div className="mb-6">
                  <h4 className="font-medium text-pink-700 mb-3">Kadın Beden Tablosu (cm)</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 px-2">Beden</th>
                          <th className="text-left py-2 px-2">Göğüs</th>
                          <th className="text-left py-2 px-2">Bel</th>
                          <th className="text-left py-2 px-2">Kalça</th>
                        </tr>
                      </thead>
                      <tbody>
                        {editingBrand.sizeCharts?.women?.map((size, index) => (
                          <tr key={index} className="border-b">
                            <td className="py-2 px-2">
                              <Input
                                value={size.size}
                                onChange={(e) => updateSizeChart('women', index, 'size', e.target.value)}
                                className="w-20"
                              />
                            </td>
                            <td className="py-2 px-2">
                              <Input
                                value={size.chest}
                                onChange={(e) => updateSizeChart('women', index, 'chest', e.target.value)}
                                className="w-24"
                              />
                            </td>
                            <td className="py-2 px-2">
                              <Input
                                value={size.waist}
                                onChange={(e) => updateSizeChart('women', index, 'waist', e.target.value)}
                                className="w-24"
                              />
                            </td>
                            <td className="py-2 px-2">
                              <Input
                                value={size.hips}
                                onChange={(e) => updateSizeChart('women', index, 'hips', e.target.value)}
                                className="w-24"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setEditingBrand(null)}>
                    İptal
                  </Button>
                  <Button 
                    onClick={() => handleUpdateBrand(editingBrand)} 
                    disabled={saving}
                    className="bg-indigo-600 hover:bg-indigo-700"
                  >
                    {saving ? (
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4 mr-2" />
                    )}
                    Kaydet
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </>
      )}
    </div>
  )
}
