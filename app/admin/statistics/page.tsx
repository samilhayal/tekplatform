'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { BarChart3, TrendingUp, Users, Clock, Calendar } from 'lucide-react'

export default function StatisticsPage() {
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month'>('week')

  // Mock data - replace with real API data
  const mockStats = {
    today: {
      totalVisits: 1245,
      uniqueVisitors: 876,
      avgSessionTime: '3:45',
      topTools: [
        { name: 'Yüzde Hesaplayıcı', visits: 245, trend: 12 },
        { name: 'BMI Hesaplama', visits: 189, trend: -5 },
        { name: 'Kredi Hesaplama', visits: 156, trend: 8 },
        { name: 'GANO Hesaplama', visits: 134, trend: 23 },
        { name: 'Döviz Çevirici', visits: 98, trend: -2 },
      ]
    },
    week: {
      totalVisits: 8732,
      uniqueVisitors: 5421,
      avgSessionTime: '4:12',
      topTools: [
        { name: 'Yüzde Hesaplayıcı', visits: 1678, trend: 15 },
        { name: 'GANO Hesaplama', visits: 1234, trend: 28 },
        { name: 'BMI Hesaplama', visits: 987, trend: -3 },
        { name: 'Kredi Hesaplama', visits: 856, trend: 11 },
        { name: 'YKS Net Hesaplama', visits: 734, trend: 45 },
        { name: 'Döviz Çevirici', visits: 623, trend: 7 },
        { name: 'Tarih Hesaplama', visits: 543, trend: -8 },
        { name: 'KPSS Net Hesaplama', visits: 456, trend: 22 },
      ]
    },
    month: {
      totalVisits: 34521,
      uniqueVisitors: 21456,
      avgSessionTime: '3:58',
      topTools: [
        { name: 'Yüzde Hesaplayıcı', visits: 6543, trend: 18 },
        { name: 'GANO Hesaplama', visits: 5234, trend: 32 },
        { name: 'BMI Hesaplama', visits: 4321, trend: 5 },
        { name: 'Kredi Hesaplama', visits: 3876, trend: 14 },
        { name: 'YKS Net Hesaplama', visits: 3124, trend: 56 },
        { name: 'Döviz Çevirici', visits: 2543, trend: 9 },
        { name: 'Zekat Hesaplama', visits: 2134, trend: 25 },
        { name: 'Tarih Hesaplama', visits: 1987, trend: -4 },
      ]
    }
  }

  const currentStats = mockStats[timeRange]

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">İstatistikler</h1>
          <p className="text-slate-600">Araç kullanım istatistikleri ve analizler</p>
        </div>

        <Select value={timeRange} onValueChange={(value: any) => setTimeRange(value)}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Bugün</SelectItem>
            <SelectItem value="week">Bu Hafta</SelectItem>
            <SelectItem value="month">Bu Ay</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
              <BarChart3 className="w-6 h-6" />
            </div>
          </div>
          <p className="text-indigo-100 text-sm font-medium mb-1">Toplam Ziyaret</p>
          <p className="text-3xl font-bold mb-1">{currentStats.totalVisits.toLocaleString()}</p>
          <p className="text-indigo-200 text-xs">
            {timeRange === 'today' ? 'Bugün' : timeRange === 'week' ? 'Son 7 gün' : 'Son 30 gün'}
          </p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-500 to-green-600 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
          </div>
          <p className="text-green-100 text-sm font-medium mb-1">Benzersiz Ziyaretçi</p>
          <p className="text-3xl font-bold mb-1">{currentStats.uniqueVisitors.toLocaleString()}</p>
          <p className="text-green-200 text-xs">
            Ortalama: {Math.round(currentStats.totalVisits / currentStats.uniqueVisitors * 10) / 10} sayfa/ziyaret
          </p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-amber-500 to-amber-600 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
          </div>
          <p className="text-amber-100 text-sm font-medium mb-1">Ort. Oturum Süresi</p>
          <p className="text-3xl font-bold mb-1">{currentStats.avgSessionTime}</p>
          <p className="text-amber-200 text-xs">Dakika:Saniye formatı</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
          </div>
          <p className="text-purple-100 text-sm font-medium mb-1">Aktif Araçlar</p>
          <p className="text-3xl font-bold mb-1">98</p>
          <p className="text-purple-200 text-xs">Toplam araç sayısı</p>
        </Card>
      </div>

      {/* Top Tools Table */}
      <Card className="p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900 mb-2">En Çok Kullanılan Araçlar</h2>
          <p className="text-slate-600 text-sm">
            {timeRange === 'today' ? 'Bugün' : timeRange === 'week' ? 'Son 7 günde' : 'Son 30 günde'} en popüler araçlar
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Sıra</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Araç Adı</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">Ziyaret</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">Trend</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">Grafik</th>
              </tr>
            </thead>
            <tbody>
              {currentStats.topTools.map((tool, index) => (
                <tr key={tool.name} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-4">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                      index === 0 ? 'bg-amber-100 text-amber-700' :
                      index === 1 ? 'bg-slate-200 text-slate-700' :
                      index === 2 ? 'bg-orange-100 text-orange-700' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {index + 1}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-medium text-slate-900">{tool.name}</span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className="font-semibold text-slate-900">{tool.visits.toLocaleString()}</span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                      tool.trend > 0 
                        ? 'bg-green-100 text-green-700' 
                        : tool.trend < 0 
                        ? 'bg-red-100 text-red-700' 
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      <TrendingUp className={`w-4 h-4 ${tool.trend < 0 ? 'rotate-180' : ''}`} />
                      {Math.abs(tool.trend)}%
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex justify-end">
                      <div className="w-24 h-8 bg-slate-100 rounded flex items-end gap-1 px-2 py-1">
                        {[...Array(7)].map((_, i) => (
                          <div
                            key={i}
                            className="flex-1 bg-indigo-500 rounded-sm"
                            style={{ height: `${Math.random() * 100}%` }}
                          />
                        ))}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card className="p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Kategori Dağılımı</h2>
          <div className="space-y-4">
            {[
              { name: 'Finans & Matematik', percentage: 28, color: 'bg-indigo-500' },
              { name: 'Eğitim & Sınav', percentage: 22, color: 'bg-green-500' },
              { name: 'Sağlık & Fitness', percentage: 18, color: 'bg-amber-500' },
              { name: 'PDF Araçları', percentage: 15, color: 'bg-purple-500' },
              { name: 'Metin & Kod', percentage: 12, color: 'bg-pink-500' },
              { name: 'Diğer', percentage: 5, color: 'bg-slate-400' },
            ].map(category => (
              <div key={category.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">{category.name}</span>
                  <span className="text-sm font-semibold text-slate-900">{category.percentage}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${category.color} rounded-full transition-all duration-500`}
                    style={{ width: `${category.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Ziyaretçi Kaynakları</h2>
          <div className="space-y-4">
            {[
              { name: 'Organik Arama', value: 4521, percentage: 52, color: 'bg-green-500' },
              { name: 'Doğrudan Trafik', value: 2345, percentage: 27, color: 'bg-indigo-500' },
              { name: 'Sosyal Medya', value: 1234, percentage: 14, color: 'bg-pink-500' },
              { name: 'Referans', value: 621, percentage: 7, color: 'bg-amber-500' },
            ].map(source => (
              <div key={source.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">{source.name}</span>
                  <span className="text-sm font-semibold text-slate-900">
                    {source.value.toLocaleString()} ({source.percentage}%)
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${source.color} rounded-full transition-all duration-500`}
                    style={{ width: `${source.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
