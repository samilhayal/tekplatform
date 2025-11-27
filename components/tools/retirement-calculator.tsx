'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  AlertCircle, Calendar, Clock, TrendingUp, CheckCircle2, Info, Home,
  Lightbulb, BookOpen, Sparkles, HelpCircle, ArrowRight, Users, Building,
  Wallet, Target, Award, Heart, Globe, FileText, Star, Zap, PiggyBank,
  CalendarDays, Timer, Trophy, Gift
} from 'lucide-react'
import Link from 'next/link'

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
  // Doğum tarihi
  const [birthDay, setBirthDay] = useState('')
  const [birthMonth, setBirthMonth] = useState('')
  const [birthYear, setBirthYear] = useState('')
  // Sigorta başlangıç tarihi
  const [insuranceDay, setInsuranceDay] = useState('')
  const [insuranceMonth, setInsuranceMonth] = useState('')
  const [insuranceYear, setInsuranceYear] = useState('')
  
  const [premiumDays, setPremiumDays] = useState(0)
  const [status, setStatus] = useState<Status>('4A-2008-sonrasi')
  const [gender, setGender] = useState<Gender>('erkek')
  const [result, setResult] = useState<RetirementResult | null>(null)

  // Tarih helper fonksiyonları
  const getBirthDateString = () => {
    if (birthYear && birthMonth && birthDay) {
      return `${birthYear}-${birthMonth.padStart(2, '0')}-${birthDay.padStart(2, '0')}`
    }
    return ''
  }

  const getInsuranceDateString = () => {
    if (insuranceYear && insuranceMonth && insuranceDay) {
      return `${insuranceYear}-${insuranceMonth.padStart(2, '0')}-${insuranceDay.padStart(2, '0')}`
    }
    return ''
  }

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
    const birthDate = getBirthDateString()
    const insuranceStartDate = getInsuranceDateString()
    
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
    setBirthDay('')
    setBirthMonth('')
    setBirthYear('')
    setInsuranceDay('')
    setInsuranceMonth('')
    setInsuranceYear('')
    setPremiumDays(0)
    setStatus('4A-2008-sonrasi')
    setGender('erkek')
    setResult(null)
  }

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-6 sm:p-8 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
        
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
            <CalendarDays className="h-12 w-12 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-2xl sm:text-3xl font-bold">Emekliliğe Kalan Süre Hesaplayıcı</h1>
              <Badge className="bg-yellow-400 text-yellow-900 hover:bg-yellow-500">2025</Badge>
            </div>
            <p className="text-indigo-100 text-sm sm:text-base max-w-2xl">
              SGK emeklilik şartlarına göre ne zaman emekli olabileceğinizi hesaplayın. 
              4A (SSK), 4B (Bağkur), 4C (Emekli Sandığı) statüleri desteklenir.
            </p>
          </div>
        </div>

        {/* Hızlı Bilgi Kartları */}
        <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
            <Users className="h-5 w-5 mx-auto mb-1 text-yellow-300" />
            <div className="text-xs text-indigo-200">4A (SSK)</div>
            <div className="text-sm font-bold">İşçiler</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
            <Building className="h-5 w-5 mx-auto mb-1 text-green-300" />
            <div className="text-xs text-indigo-200">4B (Bağkur)</div>
            <div className="text-sm font-bold">Esnaflar</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
            <Award className="h-5 w-5 mx-auto mb-1 text-orange-300" />
            <div className="text-xs text-indigo-200">4C (E.S.)</div>
            <div className="text-sm font-bold">Memurlar</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
            <Target className="h-5 w-5 mx-auto mb-1 text-pink-300" />
            <div className="text-xs text-indigo-200">Max Yaş</div>
            <div className="text-sm font-bold">65</div>
          </div>
        </div>
      </div>

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
              <Label>Doğum Tarihi</Label>
              <div className="grid grid-cols-3 gap-3">
                <Input 
                  type="number" 
                  value={birthDay} 
                  onChange={(e) => setBirthDay(e.target.value)} 
                  placeholder="Gün" 
                  className="h-14 border-2 text-center text-lg"
                  min="1" 
                  max="31"
                />
                <Input 
                  type="number" 
                  value={birthMonth} 
                  onChange={(e) => setBirthMonth(e.target.value)} 
                  placeholder="Ay" 
                  className="h-14 border-2 text-center text-lg"
                  min="1" 
                  max="12"
                />
                <Input 
                  type="number" 
                  value={birthYear} 
                  onChange={(e) => setBirthYear(e.target.value)} 
                  placeholder="Yıl" 
                  className="h-14 border-2 text-center text-lg"
                  min="1930" 
                  max={new Date().getFullYear()}
                />
              </div>
              <p className="text-xs text-slate-500">Örnek: 15 / 03 / 1980</p>
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
              <Label>Sigorta Başlangıç Tarihi</Label>
              <div className="grid grid-cols-3 gap-3">
                <Input 
                  type="number" 
                  value={insuranceDay} 
                  onChange={(e) => setInsuranceDay(e.target.value)} 
                  placeholder="Gün" 
                  className="h-14 border-2 text-center text-lg"
                  min="1" 
                  max="31"
                />
                <Input 
                  type="number" 
                  value={insuranceMonth} 
                  onChange={(e) => setInsuranceMonth(e.target.value)} 
                  placeholder="Ay" 
                  className="h-14 border-2 text-center text-lg"
                  min="1" 
                  max="12"
                />
                <Input 
                  type="number" 
                  value={insuranceYear} 
                  onChange={(e) => setInsuranceYear(e.target.value)} 
                  placeholder="Yıl" 
                  className="h-14 border-2 text-center text-lg"
                  min="1965" 
                  max={new Date().getFullYear()}
                />
              </div>
              <p className="text-xs text-slate-500">Örnek: 01 / 05 / 2010</p>
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

      {/* Eğitici Bölümler */}
      <div className="grid gap-6 mt-8">
        {/* Nasıl Kullanılır */}
        <Card className="border-2 border-green-100">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
            <CardTitle className="flex items-center gap-2 text-green-800">
              <HelpCircle className="h-5 w-5" />
              Nasıl Kullanılır?
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl">
                <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                <div>
                  <h4 className="font-semibold text-green-800">Kişisel Bilgiler</h4>
                  <p className="text-sm text-green-700 mt-1">Doğum tarihinizi ve cinsiyetinizi girin</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl">
                <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                <div>
                  <h4 className="font-semibold text-green-800">Sigorta Bilgileri</h4>
                  <p className="text-sm text-green-700 mt-1">İlk sigorta başlangıç tarihinizi belirtin</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl">
                <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                <div>
                  <h4 className="font-semibold text-green-800">Prim & Statü</h4>
                  <p className="text-sm text-green-700 mt-1">Prim gün sayısı ve SGK statünüzü seçin</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl">
                <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">4</div>
                <div>
                  <h4 className="font-semibold text-green-800">Hesapla</h4>
                  <p className="text-sm text-green-700 mt-1">Emekliliğe kalan sürenizi görün</p>
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-green-100 rounded-lg">
              <p className="text-sm text-green-800 flex items-start gap-2">
                <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                Prim gün sayınızı SGK e-Devlet üzerinden "4A/4B Hizmet Dökümü" bölümünden öğrenebilirsiniz.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Örnek Kullanımlar */}
        <Card className="border-2 border-blue-100">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <BookOpen className="h-5 w-5" />
              Örnek Senaryolar
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-blue-600" />
                  <h4 className="font-semibold text-blue-800">Genç Çalışan (25 yaş)</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-700">Sigorta Başlangıcı:</span>
                    <span className="font-bold">2020</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Prim Günü:</span>
                    <span className="font-bold">1.500 gün</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Tahmini Emeklilik:</span>
                    <span className="font-bold text-green-600">~40 yıl sonra</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-center gap-2 mb-3">
                  <Building className="h-5 w-5 text-blue-600" />
                  <h4 className="font-semibold text-blue-800">Orta Yaş (45 yaş)</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-700">Sigorta Başlangıcı:</span>
                    <span className="font-bold">2000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Prim Günü:</span>
                    <span className="font-bold">6.000 gün</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Tahmini Emeklilik:</span>
                    <span className="font-bold text-green-600">~15 yıl sonra</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-center gap-2 mb-3">
                  <Trophy className="h-5 w-5 text-blue-600" />
                  <h4 className="font-semibold text-blue-800">Kıdemli (55 yaş)</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-700">Sigorta Başlangıcı:</span>
                    <span className="font-bold">1995</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Prim Günü:</span>
                    <span className="font-bold">8.000 gün</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Tahmini Emeklilik:</span>
                    <span className="font-bold text-green-600">~5 yıl sonra</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Önemli Bilgiler */}
        <Card className="border-2 border-amber-100">
          <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50">
            <CardTitle className="flex items-center gap-2 text-amber-800">
              <AlertCircle className="h-5 w-5" />
              Önemli Bilgiler
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-amber-800">Yaş Şartı Kademeli Artış</h4>
                    <p className="text-sm text-amber-700">2008 sonrası sigortalılar için emeklilik yaşı kademeli olarak 65'e çıkacak</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-amber-800">Prim Gün Sayısı</h4>
                    <p className="text-sm text-amber-700">Minimum 7.200 gün (~20 yıl) prim ödemeniz gerekiyor</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-amber-800">Erken Emeklilik</h4>
                    <p className="text-sm text-amber-700">Bazı meslekler için yıpranma payı ile erken emeklilik mümkün</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-amber-800">Borçlanma Hakkı</h4>
                    <p className="text-sm text-amber-700">Askerlik, doğum gibi süreler için SGK'ya borçlanma yapabilirsiniz</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-amber-800">Kadın-Erkek Farkı</h4>
                    <p className="text-sm text-amber-700">Kadınlar için emeklilik yaşı genellikle erkeklere göre daha düşük</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-amber-800">Engelli Emekliliği</h4>
                    <p className="text-sm text-amber-700">Engel oranına göre daha düşük yaş ve prim günü şartları uygulanır</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* İlginç Bilgiler */}
        <Card className="border-2 border-purple-100">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
            <CardTitle className="flex items-center gap-2 text-purple-800">
              <Sparkles className="h-5 w-5" />
              Bilmeniz İlginç Olabilecek Şeyler
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                <Globe className="h-8 w-8 text-purple-500 mb-3" />
                <h4 className="font-semibold text-purple-800 mb-2">Dünya Ortalaması</h4>
                <p className="text-sm text-purple-700">
                  OECD ülkelerinde ortalama emeklilik yaşı erkeklerde 64.2, kadınlarda 63.4'tür. 
                  Türkiye'de bu yaş kademeli olarak 65'e çıkacak.
                </p>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                <PiggyBank className="h-8 w-8 text-purple-500 mb-3" />
                <h4 className="font-semibold text-purple-800 mb-2">Emekli Maaşı Formülü</h4>
                <p className="text-sm text-purple-700">
                  Emekli maaşınız, çalıştığınız süre ve ödediğiniz prim miktarına göre belirlenir. 
                  Ne kadar uzun çalışırsanız, o kadar yüksek maaş alırsınız.
                </p>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                <Timer className="h-8 w-8 text-purple-500 mb-3" />
                <h4 className="font-semibold text-purple-800 mb-2">1 Yıl = 360 Gün</h4>
                <p className="text-sm text-purple-700">
                  SGK hesaplamalarında 1 yıl = 360 gün olarak kabul edilir. 
                  Yani 7.200 gün = 20 tam yıl demektir.
                </p>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                <Gift className="h-8 w-8 text-purple-500 mb-3" />
                <h4 className="font-semibold text-purple-800 mb-2">İkramiye Hakkı</h4>
                <p className="text-sm text-purple-700">
                  Bazı kamu çalışanları emekli olduklarında hizmet sürelerine göre 
                  toplu ikramiye (kıdem tazminatı benzeri) alabilir.
                </p>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                <Heart className="h-8 w-8 text-purple-500 mb-3" />
                <h4 className="font-semibold text-purple-800 mb-2">Dul-Yetim Aylığı</h4>
                <p className="text-sm text-purple-700">
                  Emeklinin vefatı halinde eşe %50, çocuklara %25 oranında aylık bağlanır. 
                  Bu hak ömür boyu devam edebilir.
                </p>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                <Zap className="h-8 w-8 text-purple-500 mb-3" />
                <h4 className="font-semibold text-purple-800 mb-2">Yıpranma Payı</h4>
                <p className="text-sm text-purple-700">
                  Madenci, pilot, itfaiyeci gibi riskli mesleklerde her 4 yılda 1 yıl 
                  veya her 5 yılda 1 yıl yıpranma payı eklenir.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sıkça Sorulan Sorular */}
        <Card className="border-2 border-slate-200">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100">
            <CardTitle className="flex items-center gap-2 text-slate-800">
              <Lightbulb className="h-5 w-5" />
              Sıkça Sorulan Sorular
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-xl">
                <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-blue-500" />
                  4A, 4B, 4C ne anlama geliyor?
                </h4>
                <p className="text-sm text-slate-600 pl-6">
                  4A: SSK'lı çalışanlar (işçiler), 4B: Bağkur'lu çalışanlar (esnaf, serbest meslek), 
                  4C: Emekli Sandığı'na tabi kamu görevlileri. Her birinin farklı emeklilik koşulları vardır.
                </p>
              </div>
              
              <div className="p-4 bg-slate-50 rounded-xl">
                <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-blue-500" />
                  Prim gün sayımı nereden öğrenebilirim?
                </h4>
                <p className="text-sm text-slate-600 pl-6">
                  e-Devlet üzerinden "SGK Tescil ve Hizmet Dökümü" veya "4A/4B Hizmet Dökümü" 
                  sorgulama yaparak güncel prim gün sayınızı görebilirsiniz.
                </p>
              </div>
              
              <div className="p-4 bg-slate-50 rounded-xl">
                <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-blue-500" />
                  Askerlik süresi emekliliğe sayılır mı?
                </h4>
                <p className="text-sm text-slate-600 pl-6">
                  Evet, askerlik süreniz için SGK'ya borçlanma yaparak bu süreyi prim gün sayınıza 
                  ekletebilirsiniz. Başvuru için SGK'ya müracaat etmeniz gerekir.
                </p>
              </div>
              
              <div className="p-4 bg-slate-50 rounded-xl">
                <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-blue-500" />
                  Emekli olduktan sonra çalışabilir miyim?
                </h4>
                <p className="text-sm text-slate-600 pl-6">
                  Evet, emekli olduktan sonra çalışmaya devam edebilirsiniz. Ancak bu durumda 
                  SGDP (Sosyal Güvenlik Destek Primi) ödemek zorunda kalırsınız.
                </p>
              </div>
              
              <div className="p-4 bg-slate-50 rounded-xl">
                <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-blue-500" />
                  EYT (Emeklilikte Yaşa Takılanlar) nedir?
                </h4>
                <p className="text-sm text-slate-600 pl-6">
                  1999 öncesi işe başlayıp prim gün şartını dolduran ancak yaş nedeniyle emekli 
                  olamayanlar için 2023'te çıkan yasa ile yaş şartı kaldırıldı.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
