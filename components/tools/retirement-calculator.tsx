'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AlertCircle, Calendar, Clock, TrendingUp, CheckCircle2, Info } from 'lucide-react'

type Status = '4A-1999-oncesi' | '4A-1999-2008' | '4A-2008-sonrasi' | '4B' | '4C'
type Gender = 'kadın' | 'erkek'

interface RetirementResult {
  canRetire: boolean
  retirementDate: Date | null
  remainingDays: number
  remainingYears: number
  remainingMonths: number
  requiredAge: number
  requiredDays: number
  currentAge: number
  currentDays: number
  completionPercentage: number
  ageProgress: number
  daysProgress: number
}

export function RetirementCalculator() {
  const [birthDate, setBirthDate] = useState('')
  const [insuranceStartDate, setInsuranceStartDate] = useState('')
  const [premiumDays, setPremiumDays] = useState(0)
  const [status, setStatus] = useState<Status>('4A-2008-sonrasi')
  const [gender, setGender] = useState<Gender>('erkek')
  const [result, setResult] = useState<RetirementResult | null>(null)

  const calculateAge = (birthDateStr: string): number => {
    const birth = new Date(birthDateStr)
    const today = new Date()
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    return age
  }

  const calculateRetirement = () => {
    if (!birthDate || !insuranceStartDate) {
      alert('Lütfen tüm alanları doldurun')
      return
    }

    const currentAge = calculateAge(birthDate)
    const today = new Date()
    const birth = new Date(birthDate)
    
    let requiredAge = 0
    let requiredDays = 0
    let canRetire = false

    // Statüye göre emeklilik şartları
    switch (status) {
      case '4A-1999-oncesi':
        // Yaş şartı yok, sadece prim ve yıl
        requiredDays = 5000 // Minimum
        const requiredYears = gender === 'kadın' ? 20 : 25
        const insuranceYears = (today.getTime() - new Date(insuranceStartDate).getTime()) / (1000 * 60 * 60 * 24 * 365.25)
        
        canRetire = premiumDays >= 5000 && insuranceYears >= requiredYears
        requiredAge = 0 // Yaş şartı yok
        break

      case '4A-1999-2008':
        requiredAge = gender === 'kadın' ? 58 : 60
        requiredDays = 7000 // veya 4500 (kısmi)
        canRetire = currentAge >= requiredAge && premiumDays >= requiredDays
        break

      case '4A-2008-sonrasi':
        // Kademeli geçiş (sadeleştirme için 2025 sonrası için 65 yaş kabul ediyoruz)
        requiredAge = 65
        requiredDays = 7200
        canRetire = currentAge >= requiredAge && premiumDays >= requiredDays
        break

      case '4B':
        requiredAge = gender === 'kadın' ? 58 : 60
        requiredDays = 9000
        canRetire = currentAge >= requiredAge && premiumDays >= requiredDays
        break

      case '4C':
        requiredAge = gender === 'kadın' ? 60 : 65
        requiredDays = 9000
        canRetire = currentAge >= requiredAge && premiumDays >= requiredDays
        break
    }

    // Emeklilik tarihini hesapla
    let retirementDate: Date | null = null
    let remainingDays = 0
    let remainingYears = 0
    let remainingMonths = 0

    if (!canRetire) {
      // Yaşa göre emeklilik tarihi
      const retirementBirthDate = new Date(birth)
      retirementBirthDate.setFullYear(birth.getFullYear() + requiredAge)
      
      // Prim gününe göre gereken süre
      const remainingPremiumDays = Math.max(0, requiredDays - premiumDays)
      const daysUntilAge = Math.max(0, Math.floor((retirementBirthDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)))
      
      // Hangisi daha geç ise o emeklilik tarihi
      remainingDays = Math.max(daysUntilAge, remainingPremiumDays)
      
      retirementDate = new Date(today)
      retirementDate.setDate(today.getDate() + remainingDays)
      
      remainingYears = Math.floor(remainingDays / 365)
      remainingMonths = Math.floor((remainingDays % 365) / 30)
    }

    // İlerleme yüzdeleri
    const ageProgress = requiredAge > 0 ? Math.min(100, (currentAge / requiredAge) * 100) : 100
    const daysProgress = requiredDays > 0 ? Math.min(100, (premiumDays / requiredDays) * 100) : 100
    const completionPercentage = (ageProgress + daysProgress) / 2

    setResult({
      canRetire,
      retirementDate,
      remainingDays,
      remainingYears,
      remainingMonths,
      requiredAge,
      requiredDays,
      currentAge,
      currentDays: premiumDays,
      completionPercentage,
      ageProgress,
      daysProgress
    })
  }

  const resetForm = () => {
    setBirthDate('')
    setInsuranceStartDate('')
    setPremiumDays(0)
    setStatus('4A-2008-sonrasi')
    setGender('erkek')
    setResult(null)
  }

  return (
    <div className="space-y-6">
      {/* Bilgilendirme */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Info className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-blue-900">Türkiye Emeklilik Sistemi</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-blue-800">
          <p><strong>4A (SSK):</strong> İşçi, memur ve diğer çalışanlar</p>
          <p><strong>4B (Bağkur):</strong> Esnaf, sanatkar, çiftçi</p>
          <p><strong>4C (Emekli Sandığı):</strong> Eski kamu görevlileri</p>
          <p className="text-xs text-blue-600 mt-3">
            ⚠️ Bu hesaplama genel bilgilendirme amaçlıdır. Kesin bilgi için SGK'ya başvurunuz.
          </p>
        </CardContent>
      </Card>

      {/* Form */}
      <Card className="bg-white/80 backdrop-blur-sm border-2 border-slate-200">
        <CardHeader>
          <CardTitle>Emeklilik Bilgileri</CardTitle>
          <CardDescription>Bilgilerinizi girerek emekliliğe kalan süreyi hesaplayın</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Doğum Tarihi (GG/AA/YYYY)</Label>
              <Input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                placeholder="GG/AA/YYYY"
              />
              <p className="text-xs text-slate-500">Örnek: 15/03/1980</p>
            </div>

            <div className="space-y-2">
              <Label>Cinsiyet</Label>
              <Select value={gender} onValueChange={(v) => setGender(v as Gender)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kadın">Kadın</SelectItem>
                  <SelectItem value="erkek">Erkek</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Sigorta Başlangıç Tarihi (GG/AA/YYYY)</Label>
              <Input
                type="date"
                value={insuranceStartDate}
                onChange={(e) => setInsuranceStartDate(e.target.value)}
                placeholder="GG/AA/YYYY"
              />
              <p className="text-xs text-slate-500">Örnek: 01/05/2010</p>
            </div>

            <div className="space-y-2">
              <Label>Toplam Prim Gün Sayısı</Label>
              <Input
                type="number"
                value={premiumDays || ''}
                onChange={(e) => setPremiumDays(Number(e.target.value))}
                placeholder="0"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>Statü</Label>
              <Select value={status} onValueChange={(v) => setStatus(v as Status)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="4A-1999-oncesi">4A (08.09.1999 Öncesi Giriş)</SelectItem>
                  <SelectItem value="4A-1999-2008">4A (09.09.1999 - 30.04.2008 Arası)</SelectItem>
                  <SelectItem value="4A-2008-sonrasi">4A (01.05.2008 Sonrası Giriş)</SelectItem>
                  <SelectItem value="4B">4B (Bağkur)</SelectItem>
                  <SelectItem value="4C">4C (Emekli Sandığı)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Button 
              onClick={calculateRetirement}
              className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600"
              size="lg"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Hesapla
            </Button>
            <Button onClick={resetForm} variant="outline" size="lg">
              Sıfırla
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Sonuçlar */}
      {result && (
        <div className="space-y-4 animate-in fade-in-50 slide-in-from-bottom-3">
          {/* Emeklilik Durumu */}
          <Card className={`border-2 ${result.canRetire ? 'bg-green-50 border-green-300' : 'bg-blue-50 border-blue-300'}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {result.canRetire ? (
                  <>
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                    <span className="text-green-900">Emekli Olabilirsiniz! 🎉</span>
                  </>
                ) : (
                  <>
                    <Clock className="h-6 w-6 text-blue-600" />
                    <span className="text-blue-900">Emekliliğe Kalan Süre</span>
                  </>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!result.canRetire && result.retirementDate && (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg">
                      <p className="text-sm text-slate-600">Tahmini Emeklilik</p>
                      <p className="text-2xl font-bold text-slate-900">
                        {result.retirementDate.toLocaleDateString('tr-TR', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <p className="text-sm text-slate-600">Kalan Süre</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {result.remainingYears} yıl {result.remainingMonths} ay
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <p className="text-sm text-slate-600">Tamamlanma</p>
                      <p className="text-2xl font-bold text-indigo-600">
                        %{result.completionPercentage.toFixed(1)}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* İlerleme Grafikleri */}
          <Card className="bg-white/80 backdrop-blur-sm border-2 border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-slate-700" />
                İlerleme Durumu
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Yaş İlerlemesi */}
              {result.requiredAge > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold">Yaş Şartı</span>
                    <span className="text-slate-600">
                      {result.currentAge} / {result.requiredAge} yaş
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 h-4 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                      style={{ width: `${result.ageProgress}%` }}
                    >
                      <span className="text-xs text-white font-semibold">
                        {result.ageProgress.toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Prim Günü İlerlemesi */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-semibold">Prim Günü Şartı</span>
                  <span className="text-slate-600">
                    {result.currentDays.toLocaleString('tr-TR')} / {result.requiredDays.toLocaleString('tr-TR')} gün
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 h-4 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                    style={{ width: `${result.daysProgress}%` }}
                  >
                    <span className="text-xs text-white font-semibold">
                      {result.daysProgress.toFixed(0)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Genel İlerleme */}
              <div className="space-y-2 pt-4 border-t">
                <div className="flex justify-between text-sm">
                  <span className="font-bold text-lg">Genel İlerleme</span>
                  <span className="text-lg font-bold text-indigo-600">
                    %{result.completionPercentage.toFixed(1)}
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-6 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-600 h-6 rounded-full transition-all duration-500 flex items-center justify-center"
                    style={{ width: `${result.completionPercentage}%` }}
                  >
                    <span className="text-sm text-white font-bold">
                      %{result.completionPercentage.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detaylı Bilgi */}
          <Card className="bg-slate-50 border-2 border-slate-200">
            <CardHeader>
              <CardTitle className="text-slate-900">Emeklilik Şartları</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between py-2 border-b">
                <span className="text-slate-600">Mevcut Yaşınız:</span>
                <span className="font-semibold">{result.currentAge} yaş</span>
              </div>
              {result.requiredAge > 0 && (
                <div className="flex justify-between py-2 border-b">
                  <span className="text-slate-600">Gereken Yaş:</span>
                  <span className="font-semibold">{result.requiredAge} yaş</span>
                </div>
              )}
              <div className="flex justify-between py-2 border-b">
                <span className="text-slate-600">Mevcut Prim Gününüz:</span>
                <span className="font-semibold">{result.currentDays.toLocaleString('tr-TR')} gün</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-slate-600">Gereken Prim Günü:</span>
                <span className="font-semibold">{result.requiredDays.toLocaleString('tr-TR')} gün</span>
              </div>
              {!result.canRetire && (
                <div className="flex justify-between py-2 bg-blue-50 px-3 rounded mt-2">
                  <span className="text-blue-900 font-semibold">Eksik Prim Günü:</span>
                  <span className="font-bold text-blue-600">
                    {Math.max(0, result.requiredDays - result.currentDays).toLocaleString('tr-TR')} gün
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
