'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MessageSquare, CheckCircle, Clock, XCircle, Search, Mail } from 'lucide-react'

interface Feedback {
  id: string
  name: string
  email: string
  tool: string
  message: string
  status: 'pending' | 'reviewed' | 'resolved'
  date: string
  rating?: number
}

export default function FeedbackPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  
  // Mock feedback data
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([
    {
      id: '1',
      name: 'Ahmet Yılmaz',
      email: 'ahmet@example.com',
      tool: 'Yüzde Hesaplayıcı',
      message: 'Çok faydalı bir araç. Ancak mobil görünümde butonlar küçük kalıyor.',
      status: 'pending',
      date: '2024-12-15',
      rating: 4
    },
    {
      id: '2',
      name: 'Ayşe Demir',
      email: 'ayse@example.com',
      tool: 'GANO Hesaplama',
      message: 'Dönem ekleme özelliği harika! Teşekkürler.',
      status: 'reviewed',
      date: '2024-12-14',
      rating: 5
    },
    {
      id: '3',
      name: 'Mehmet Kaya',
      email: 'mehmet@example.com',
      tool: 'BMI Hesaplama',
      message: 'Sonuçlar doğru görünüyor ama daha detaylı açıklama eklenebilir.',
      status: 'pending',
      date: '2024-12-14',
      rating: 4
    },
    {
      id: '4',
      name: 'Fatma Şahin',
      email: 'fatma@example.com',
      tool: 'Kredi Hesaplama',
      message: 'Mükemmel! Tam ihtiyacım olan araçtı.',
      status: 'resolved',
      date: '2024-12-13',
      rating: 5
    },
    {
      id: '5',
      name: 'Ali Çelik',
      email: 'ali@example.com',
      tool: 'YKS Net Hesaplama',
      message: 'TYT ve AYT ayrımı çok iyi düşünülmüş. Başarı grafiği de eklenebilir.',
      status: 'pending',
      date: '2024-12-13',
      rating: 5
    },
    {
      id: '6',
      name: 'Zeynep Aydın',
      email: 'zeynep@example.com',
      tool: 'Döviz Çevirici',
      message: 'Kurlar güncel değil gibi görünüyor.',
      status: 'reviewed',
      date: '2024-12-12',
      rating: 3
    },
  ])

  const updateStatus = (id: string, newStatus: 'pending' | 'reviewed' | 'resolved') => {
    setFeedbacks(prev => 
      prev.map(fb => fb.id === id ? { ...fb, status: newStatus } : fb)
    )
  }

  const filteredFeedbacks = feedbacks.filter(fb => {
    const matchesSearch = 
      fb.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fb.tool.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fb.message.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || fb.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: feedbacks.length,
    pending: feedbacks.filter(f => f.status === 'pending').length,
    reviewed: feedbacks.filter(f => f.status === 'reviewed').length,
    resolved: feedbacks.filter(f => f.status === 'resolved').length,
    avgRating: (feedbacks.reduce((sum, f) => sum + (f.rating || 0), 0) / feedbacks.length).toFixed(1)
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Geri Bildirimler</h1>
        <p className="text-slate-600">Kullanıcı geri bildirimlerini yönetin</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <Card className="p-6 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
              <MessageSquare className="w-6 h-6" />
            </div>
          </div>
          <p className="text-indigo-100 text-sm font-medium mb-1">Toplam</p>
          <p className="text-3xl font-bold">{stats.total}</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-amber-500 to-amber-600 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
          </div>
          <p className="text-amber-100 text-sm font-medium mb-1">Bekleyen</p>
          <p className="text-3xl font-bold">{stats.pending}</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
              <Mail className="w-6 h-6" />
            </div>
          </div>
          <p className="text-blue-100 text-sm font-medium mb-1">İncelenen</p>
          <p className="text-3xl font-bold">{stats.reviewed}</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-500 to-green-600 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
              <CheckCircle className="w-6 h-6" />
            </div>
          </div>
          <p className="text-green-100 text-sm font-medium mb-1">Çözüldü</p>
          <p className="text-3xl font-bold">{stats.resolved}</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
              <span className="text-2xl">⭐</span>
            </div>
          </div>
          <p className="text-purple-100 text-sm font-medium mb-1">Ort. Puan</p>
          <p className="text-3xl font-bold">{stats.avgRating}</p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Durum filtrele" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tümü</SelectItem>
              <SelectItem value="pending">Bekleyen</SelectItem>
              <SelectItem value="reviewed">İncelenen</SelectItem>
              <SelectItem value="resolved">Çözüldü</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-4 text-sm text-slate-600">
          {filteredFeedbacks.length} geri bildirim bulundu
        </div>
      </Card>

      {/* Feedback List */}
      <div className="space-y-4">
        {filteredFeedbacks.map(feedback => (
          <Card key={feedback.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-slate-900">{feedback.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    feedback.status === 'pending' 
                      ? 'bg-amber-100 text-amber-700'
                      : feedback.status === 'reviewed'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {feedback.status === 'pending' ? 'Bekleyen' : 
                     feedback.status === 'reviewed' ? 'İncelenen' : 'Çözüldü'}
                  </span>
                  {feedback.rating && (
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < feedback.rating! ? 'text-amber-400' : 'text-slate-300'}>
                          ⭐
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                  <span>{feedback.email}</span>
                  <span>•</span>
                  <span>{new Date(feedback.date).toLocaleDateString('tr-TR')}</span>
                  <span>•</span>
                  <span className="font-medium text-indigo-600">{feedback.tool}</span>
                </div>
                <p className="text-slate-700 leading-relaxed">{feedback.message}</p>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t border-slate-100">
              {feedback.status !== 'reviewed' && (
                <Button
                  onClick={() => updateStatus(feedback.id, 'reviewed')}
                  className="bg-blue-600 hover:bg-blue-700"
                  size="sm"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  İncelenmiş Olarak İşaretle
                </Button>
              )}
              {feedback.status !== 'resolved' && (
                <Button
                  onClick={() => updateStatus(feedback.id, 'resolved')}
                  className="bg-green-600 hover:bg-green-700"
                  size="sm"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Çözüldü Olarak İşaretle
                </Button>
              )}
              {feedback.status !== 'pending' && (
                <Button
                  onClick={() => updateStatus(feedback.id, 'pending')}
                  variant="outline"
                  size="sm"
                >
                  <Clock className="w-4 h-4 mr-2" />
                  Bekliyor Olarak İşaretle
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {filteredFeedbacks.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-slate-500 text-lg">Geri bildirim bulunamadı</p>
          <p className="text-slate-400 text-sm mt-2">
            Arama kriterlerinizi değiştirmeyi deneyin
          </p>
        </Card>
      )}
    </div>
  )
}
