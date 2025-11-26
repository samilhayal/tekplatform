'use client'

import { useState, useMemo, useEffect } from 'react'
import { tools as localTools, categories } from '@/lib/tools-data'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Eye, EyeOff, TrendingUp, Save, RefreshCw, Database } from 'lucide-react'

interface Tool {
  id: string
  title: string
  description: string
  category: string
  icon: string
  href: string
  keywords: string[]
  isActive: boolean
}

export default function ToolsManagementPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [saveMessage, setSaveMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [tools, setTools] = useState<Tool[]>([])

  // Load tools from Firestore
  const loadTools = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/tools')
      const data = await response.json()
      
      if (data.success) {
        setTools(data.tools)
      } else {
        console.error('Failed to load tools:', data.error)
        // Fallback to local data
        setTools(localTools.map(t => ({ ...t, isActive: true })))
      }
    } catch (error) {
      console.error('Error loading tools:', error)
      // Fallback to local data
      setTools(localTools.map(t => ({ ...t, isActive: true })))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTools()
  }, [])

  // Save to localStorage for backward compatibility
  useEffect(() => {
    if (tools.length > 0 && typeof window !== 'undefined') {
      const toolsStatus: Record<string, boolean> = {}
      tools.forEach(tool => {
        toolsStatus[tool.id] = tool.isActive
      })
      localStorage.setItem('toolsStatus', JSON.stringify(toolsStatus))
    }
  }, [tools])

  // Filter tools based on search and category
  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           tool.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory, tools])

  // Calculate statistics
  const stats = useMemo(() => {
    const total = tools.length
    const active = tools.filter(t => t.isActive).length
    const inactive = total - active
    return { total, active, inactive }
  }, [tools])

  const toggleToolStatus = async (toolId: string) => {
    const tool = tools.find(t => t.id === toolId)
    if (!tool) return

    const newStatus = !tool.isActive

    try {
      setSyncing(true)
      const response = await fetch('/api/tools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toolId, isActive: newStatus })
      })

      const data = await response.json()

      if (data.success) {
        // Update local state
        setTools(prev => prev.map(t => 
          t.id === toolId ? { ...t, isActive: newStatus } : t
        ))
        setSaveMessage('Değişiklik kaydedildi ✓')
        setTimeout(() => setSaveMessage(''), 3000)
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      console.error('Error toggling tool:', error)
      setSaveMessage('❌ Hata oluştu!')
      setTimeout(() => setSaveMessage(''), 3000)
    } finally {
      setSyncing(false)
    }
  }

  const toggleAll = async (status: boolean) => {
    try {
      setSyncing(true)
      const response = await fetch('/api/tools', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: status })
      })

      const data = await response.json()

      if (data.success) {
        // Update local state
        setTools(prev => prev.map(t => ({ ...t, isActive: status })))
        setSaveMessage(`Tüm araçlar ${status ? 'açıldı' : 'kapatıldı'} ✓`)
        setTimeout(() => setSaveMessage(''), 3000)
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      console.error('Error bulk toggling:', error)
      setSaveMessage('❌ Hata oluştu!')
      setTimeout(() => setSaveMessage(''), 3000)
    } finally {
      setSyncing(false)
    }
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Araç Yönetimi</h1>
          <p className="text-slate-600">Araçları etkinleştirin veya devre dışı bırakın</p>
        </div>
        {saveMessage && (
          <div className="px-4 py-2 bg-green-100 text-green-700 rounded-lg flex items-center gap-2 animate-fade-in">
            <Save className="w-4 h-4" />
            {saveMessage}
          </div>
        )}
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-100 text-sm font-medium mb-1">Toplam Araç</p>
              <p className="text-3xl font-bold">{stats.total}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-500 to-green-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium mb-1">Aktif Araçlar</p>
              <p className="text-3xl font-bold">{stats.active}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-red-500 to-red-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm font-medium mb-1">Pasif Araçlar</p>
              <p className="text-3xl font-bold">{stats.inactive}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
              <EyeOff className="w-6 h-6" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <Button
            onClick={loadTools}
            disabled={syncing}
            className="w-full bg-white/20 hover:bg-white/30 text-white border-0"
          >
            <Database className={`w-4 h-4 mr-2 ${syncing ? 'animate-spin' : ''}`} />
            Yenile
          </Button>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card className="p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Araç ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filter */}
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Kategori seçin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tüm Kategoriler</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Bulk Actions */}
          <div className="flex gap-2">
            <Button
              onClick={() => toggleAll(true)}
              disabled={syncing}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              {syncing ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : null}
              Tümünü Aç
            </Button>
            <Button
              onClick={() => toggleAll(false)}
              disabled={syncing}
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              {syncing ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : null}
              Tümünü Kapat
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 text-sm text-slate-600">
          {filteredTools.length} araç bulundu
        </div>
      </Card>

      {/* Tools List */}
      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <Card className="p-12 text-center">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-indigo-600" />
            <p className="text-slate-500">Araçlar yükleniyor...</p>
          </Card>
        ) : filteredTools.map(tool => {
          const isActive = tool.isActive
          return (
            <Card
              key={tool.id}
              className={`p-6 transition-all ${
                isActive ? 'bg-white' : 'bg-slate-50 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-slate-900">{tool.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      isActive 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {isActive ? 'Aktif' : 'Pasif'}
                    </span>
                  </div>
                  <p className="text-slate-600 mb-2">{tool.description}</p>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      <span className="font-medium">Kategori:</span> {tool.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="font-medium">ID:</span> {tool.id}
                    </span>
                  </div>
                  {tool.keywords.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {tool.keywords.slice(0, 5).map(keyword => (
                        <span
                          key={keyword}
                          className="px-2 py-1 rounded-md bg-slate-100 text-slate-600 text-xs"
                        >
                          {keyword}
                        </span>
                      ))}
                      {tool.keywords.length > 5 && (
                        <span className="px-2 py-1 text-slate-400 text-xs">
                          +{tool.keywords.length - 5} daha
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="ml-6">
                  <Button
                    onClick={() => toggleToolStatus(tool.id)}
                    disabled={syncing}
                    className={`${
                      isActive
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-red-600 hover:bg-red-700'
                    }`}
                  >
                    {syncing ? (
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    ) : isActive ? (
                      <>
                        <Eye className="w-4 h-4 mr-2" />
                        Aktif
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-4 h-4 mr-2" />
                        Pasif
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {!loading && filteredTools.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-slate-500 text-lg">Araç bulunamadı</p>
          <p className="text-slate-400 text-sm mt-2">
            Arama kriterlerinizi değiştirmeyi deneyin
          </p>
        </Card>
      )}
    </div>
  )
}
