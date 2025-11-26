'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Database, CheckCircle, XCircle, RefreshCw, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function InitDatabasePage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const initializeDatabase = async () => {
    try {
      setLoading(true)
      setResult(null)

      const response = await fetch('/api/init-database', {
        method: 'POST'
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({
        success: false,
        error: 'Veritabanı başlatılamadı',
        details: error instanceof Error ? error.message : 'Bilinmeyen hata'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8">
      <div className="max-w-3xl mx-auto">
        {/* Geri Butonu */}
        <Link href="/admin/dashboard" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Dashboard'a Dön
        </Link>

        <Card className="p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Database className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Firestore Veritabanı Başlatma
            </h1>
            <p className="text-slate-600">
              Bu işlem tüm collection ve dokümanları oluşturacaktır
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
              <div className="mt-0.5">ℹ️</div>
              <div>
                <p className="font-medium text-blue-900">Oluşturulacak Collections:</p>
                <ul className="mt-2 space-y-1 text-sm text-blue-800 grid grid-cols-2 gap-x-4">
                  <li>• <strong>tools</strong> - Tüm araçlar</li>
                  <li>• <strong>categories</strong> - Kategoriler</li>
                  <li>• <strong>horoscopes</strong> - Burç yorumları</li>
                  <li>• <strong>prices</strong> - Altın & Döviz</li>
                  <li>• <strong>salarySettings</strong> - Maaş ayarları</li>
                  <li>• <strong>tapuSettings</strong> - Tapu harçları</li>
                  <li>• <strong>rayicBedel</strong> - Rayiç bedeller</li>
                  <li>• <strong>gayrimenkulSettings</strong> - GV dilimleri</li>
                  <li>• <strong>retirementSettings</strong> - Emeklilik</li>
                  <li>• <strong>brands</strong> - Marka bedenleri</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg">
              <div className="mt-0.5">⚠️</div>
              <div>
                <p className="font-medium text-amber-900">Uyarı:</p>
                <p className="text-sm text-amber-800 mt-1">
                  Bu işlem mevcut verilerin üzerine yazacaktır. 
                  Sadece ilk kurulumda veya sıfırlama gerektiğinde kullanın.
                </p>
              </div>
            </div>
          </div>

          <Button
            onClick={initializeDatabase}
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-6 text-lg"
          >
            {loading ? (
              <>
                <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                Veritabanı Oluşturuluyor...
              </>
            ) : (
              <>
                <Database className="w-5 h-5 mr-2" />
                Veritabanını Başlat
              </>
            )}
          </Button>

          {result && (
            <div className={`mt-6 p-6 rounded-lg ${
              result.success 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`}>
              <div className="flex items-center gap-3 mb-4">
                {result.success ? (
                  <CheckCircle className="w-8 h-8 text-green-600" />
                ) : (
                  <XCircle className="w-8 h-8 text-red-600" />
                )}
                <h3 className={`text-xl font-bold ${
                  result.success ? 'text-green-900' : 'text-red-900'
                }`}>
                  {result.success ? 'Başarılı!' : 'Hata Oluştu'}
                </h3>
              </div>

              <p className={`mb-4 ${
                result.success ? 'text-green-800' : 'text-red-800'
              }`}>
                {result.message}
              </p>

              {result.stats && (
                <div className="space-y-3 text-sm">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-3 rounded-lg">
                      <span className="text-green-700 block">Araçlar:</span>
                      <span className="font-bold text-green-900 text-lg">{result.stats.tools}</span>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <span className="text-green-700 block">Kategoriler:</span>
                      <span className="font-bold text-green-900 text-lg">{result.stats.categories}</span>
                    </div>
                  </div>
                  
                  {result.stats.horoscopes && (
                    <div className="bg-white p-3 rounded-lg">
                      <span className="text-green-700 block mb-2">Burç Yorumları:</span>
                      <div className="grid grid-cols-4 gap-2 text-xs">
                        <span>Günlük: <strong>{result.stats.horoscopes.daily}</strong></span>
                        <span>Haftalık: <strong>{result.stats.horoscopes.weekly}</strong></span>
                        <span>Aylık: <strong>{result.stats.horoscopes.monthly}</strong></span>
                        <span>Yıllık: <strong>{result.stats.horoscopes.yearly}</strong></span>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="bg-white p-2 rounded">
                      <span className="text-green-700">Maaş Ayarları:</span>
                      <span className="font-bold block">{result.stats.salarySettings}</span>
                    </div>
                    <div className="bg-white p-2 rounded">
                      <span className="text-green-700">Rayiç Bedel:</span>
                      <span className="font-bold block">{result.stats.rayicBedel}</span>
                    </div>
                    <div className="bg-white p-2 rounded">
                      <span className="text-green-700">Markalar:</span>
                      <span className="font-bold block">{result.stats.brands}</span>
                    </div>
                  </div>

                  {result.timestamp && (
                    <div className="text-xs text-green-600 mt-2">
                      Oluşturma zamanı: {new Date(result.timestamp).toLocaleString('tr-TR')}
                    </div>
                  )}
                </div>
              )}

              {result.error && (
                <div className="mt-4 p-3 bg-red-100 rounded text-sm text-red-800">
                  <strong>Hata:</strong> {result.error}
                  {result.details && (
                    <div className="mt-2 text-xs opacity-75">
                      Detay: {result.details}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
