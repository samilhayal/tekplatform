'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Database, CheckCircle, XCircle, RefreshCw } from 'lucide-react'

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
        error: 'Failed to initialize database',
        details: error instanceof Error ? error.message : 'Unknown error'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <Card className="p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Database className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Firestore Database Başlatma
            </h1>
            <p className="text-slate-600">
              Bu işlem database'i ilk verilerle dolduracaktır
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
              <div className="mt-0.5">ℹ️</div>
              <div>
                <p className="font-medium text-blue-900">Yapılacaklar:</p>
                <ul className="mt-2 space-y-1 text-sm text-blue-800">
                  <li>• Tüm araçlar (98 adet) aktif olarak eklenecek</li>
                  <li>• Varsayılan fiyatlar ayarlanacak (Altın, Döviz, TUFE, Zekat)</li>
                  <li>• Admin ayarları oluşturulacak</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg">
              <div className="mt-0.5">⚠️</div>
              <div>
                <p className="font-medium text-amber-900">Uyarı:</p>
                <p className="text-sm text-amber-800 mt-1">
                  Bu işlem database'deki mevcut verilerin üzerine yazabilir. 
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
                Database Başlatılıyor...
              </>
            ) : (
              <>
                <Database className="w-5 h-5 mr-2" />
                Database'i Başlat
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
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-green-700">Oluşturulan Araçlar:</span>
                    <span className="font-bold text-green-900">
                      {result.stats.toolsCreated}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Fiyat Ayarları:</span>
                    <span className="font-bold text-green-900">
                      {result.stats.pricesSet ? '✓ Hazır' : '✗ Hata'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Admin Ayarları:</span>
                    <span className="font-bold text-green-900">
                      {result.stats.adminSettingsSet ? '✓ Hazır' : '✗ Hata'}
                    </span>
                  </div>
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
