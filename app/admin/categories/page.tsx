'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { 
  FolderTree, Search, Save, RefreshCw, CheckCircle, 
  XCircle, ArrowUpDown, Loader2 
} from 'lucide-react'

interface Category {
  id: string
  name: string
  isActive: boolean
  displayOrder: number
  toolCount: number
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/categories')
      const data = await response.json()
      if (data.success) {
        setCategories(data.categories)
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Kategoriler yüklenirken hata oluştu' })
    } finally {
      setLoading(false)
    }
  }

  const toggleCategory = (id: string) => {
    setCategories(prev => 
      prev.map(cat => 
        cat.id === id ? { ...cat, isActive: !cat.isActive } : cat
      )
    )
  }

  const updateOrder = (id: string, newOrder: number) => {
    setCategories(prev => 
      prev.map(cat => 
        cat.id === id ? { ...cat, displayOrder: newOrder } : cat
      )
    )
  }

  const saveChanges = async () => {
    try {
      setSaving(true)
      const response = await fetch('/api/admin/categories', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categories })
      })
      const data = await response.json()
      if (data.success) {
        setMessage({ type: 'success', text: 'Kategoriler başarıyla güncellendi!' })
      } else {
        setMessage({ type: 'error', text: data.error || 'Güncelleme başarısız' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Kaydetme sırasında hata oluştu' })
    } finally {
      setSaving(false)
      setTimeout(() => setMessage(null), 3000)
    }
  }

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const activeCount = categories.filter(c => c.isActive).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <FolderTree className="h-8 w-8 text-purple-600" />
            Kategori Yönetimi
          </h1>
          <p className="text-slate-600 mt-1">
            Kategorileri aktif/pasif yapın ve sıralamayı düzenleyin
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={fetchCategories} variant="outline" disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Yenile
          </Button>
          <Button onClick={saveChanges} disabled={saving} className="bg-purple-600 hover:bg-purple-700">
            {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
            Kaydet
          </Button>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className={`p-4 rounded-lg flex items-center gap-3 ${
          message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {message.type === 'success' ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
          {message.text}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4">
            <p className="text-purple-100 text-sm">Toplam Kategori</p>
            <p className="text-3xl font-bold">{categories.length}</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <p className="text-green-100 text-sm">Aktif</p>
            <p className="text-3xl font-bold">{activeCount}</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white">
          <CardContent className="p-4">
            <p className="text-red-100 text-sm">Pasif</p>
            <p className="text-3xl font-bold">{categories.length - activeCount}</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <p className="text-blue-100 text-sm">Toplam Araç</p>
            <p className="text-3xl font-bold">{categories.reduce((sum, c) => sum + c.toolCount, 0)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input
              placeholder="Kategori ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Categories List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowUpDown className="h-5 w-5" />
            Kategoriler
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
            </div>
          ) : filteredCategories.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              {searchTerm ? 'Arama sonucu bulunamadı' : 'Henüz kategori yok. Database\'i başlatın.'}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredCategories
                .sort((a, b) => a.displayOrder - b.displayOrder)
                .map((category) => (
                  <div
                    key={category.id}
                    className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                      category.isActive 
                        ? 'bg-white border-green-200 hover:border-green-300' 
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={category.isActive}
                          onCheckedChange={() => toggleCategory(category.id)}
                        />
                        <Badge variant={category.isActive ? 'default' : 'secondary'}>
                          {category.isActive ? 'Aktif' : 'Pasif'}
                        </Badge>
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">{category.name}</h3>
                        <p className="text-sm text-slate-500">{category.toolCount} araç</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-500">Sıra:</span>
                        <Input
                          type="number"
                          value={category.displayOrder}
                          onChange={(e) => updateOrder(category.id, parseInt(e.target.value) || 0)}
                          className="w-20 text-center"
                          min={0}
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
