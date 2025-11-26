'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  TrendingUp, 
  Users, 
  Eye, 
  Activity,
  BarChart3,
  Clock,
  Calendar
} from 'lucide-react'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalVisits: 0,
    todayVisits: 0,
    weeklyVisits: 0,
    monthlyVisits: 0,
    activeTools: 0,
    totalTools: 0,
    pendingFeedback: 0
  })

  useEffect(() => {
    // In a real app, fetch from API
    // For now, using mock data
    setStats({
      totalVisits: 125430,
      todayVisits: 1245,
      weeklyVisits: 8732,
      monthlyVisits: 34521,
      activeTools: 95,
      totalTools: 98,
      pendingFeedback: 12
    })
  }, [])

  const topTools = [
    { name: 'Yüzde Hesaplayıcı', visits: 12543, trend: '+12%' },
    { name: 'BMI Hesaplayıcı', visits: 9821, trend: '+8%' },
    { name: 'Döviz Kurları', visits: 8932, trend: '+15%' },
    { name: 'Kredi Hesaplama', visits: 7654, trend: '+5%' },
    { name: 'PDF Birleştirme', visits: 6543, trend: '+22%' },
  ]

  const recentActivity = [
    { action: 'Yeni geri bildirim', tool: 'Zekat Hesaplama', time: '5 dakika önce' },
    { action: 'Fiyat güncellendi', tool: 'Altın Hesaplama', time: '1 saat önce' },
    { action: 'Araç devre dışı', tool: 'Test Aracı', time: '3 saat önce' },
    { action: 'Yeni geri bildirim', tool: 'GANO Hesaplama', time: '5 saat önce' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600 mt-2">Sistem genel bakış ve istatistikler</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-blue-900">
                Bugünkü Ziyaret
              </CardTitle>
              <Eye className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">
              {stats.todayVisits.toLocaleString('tr-TR')}
            </div>
            <p className="text-xs text-blue-700 mt-2">
              Son 24 saat
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-green-900">
                Haftalık Ziyaret
              </CardTitle>
              <Calendar className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {stats.weeklyVisits.toLocaleString('tr-TR')}
            </div>
            <p className="text-xs text-green-700 mt-2">
              Son 7 gün
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-purple-900">
                Aylık Ziyaret
              </CardTitle>
              <TrendingUp className="h-5 w-5 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">
              {stats.monthlyVisits.toLocaleString('tr-TR')}
            </div>
            <p className="text-xs text-purple-700 mt-2">
              Son 30 gün
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-orange-900">
                Aktif Araçlar
              </CardTitle>
              <Activity className="h-5 w-5 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">
              {stats.activeTools} / {stats.totalTools}
            </div>
            <p className="text-xs text-orange-700 mt-2">
              Toplam araç sayısı
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Tools */}
        <Card className="border-2 border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-slate-700" />
              En Çok Kullanılan Araçlar
            </CardTitle>
            <CardDescription>Son 30 gündeki kullanım istatistikleri</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topTools.map((tool, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{tool.name}</p>
                      <p className="text-sm text-slate-600">
                        {tool.visits.toLocaleString('tr-TR')} ziyaret
                      </p>
                    </div>
                  </div>
                  <div className="text-green-600 font-semibold text-sm">
                    {tool.trend}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-2 border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-slate-700" />
              Son Aktiviteler
            </CardTitle>
            <CardDescription>Sistemdeki son değişiklikler</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg"
                >
                  <div className="w-2 h-2 rounded-full bg-blue-600 mt-2"></div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900">{activity.action}</p>
                    <p className="text-sm text-slate-600">{activity.tool}</p>
                    <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50">
        <CardHeader>
          <CardTitle>Hızlı İşlemler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 bg-white rounded-lg border-2 border-slate-200 hover:border-purple-400 hover:shadow-lg transition-all text-left">
              <Users className="h-8 w-8 text-purple-600 mb-2" />
              <h3 className="font-semibold text-slate-900">Geri Bildirimleri Gör</h3>
              <p className="text-sm text-slate-600 mt-1">
                {stats.pendingFeedback} bekleyen bildirim
              </p>
            </button>

            <button className="p-4 bg-white rounded-lg border-2 border-slate-200 hover:border-green-400 hover:shadow-lg transition-all text-left">
              <TrendingUp className="h-8 w-8 text-green-600 mb-2" />
              <h3 className="font-semibold text-slate-900">Fiyatları Güncelle</h3>
              <p className="text-sm text-slate-600 mt-1">
                Altın, döviz ve TÜFE oranları
              </p>
            </button>

            <button className="p-4 bg-white rounded-lg border-2 border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all text-left">
              <BarChart3 className="h-8 w-8 text-blue-600 mb-2" />
              <h3 className="font-semibold text-slate-900">Detaylı İstatistikler</h3>
              <p className="text-sm text-slate-600 mt-1">
                Tüm araçların analizi
              </p>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
