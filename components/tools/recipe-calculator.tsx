"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { 
  ChefHat, 
  Users, 
  Scale, 
  Plus, 
  Trash2, 
  ArrowRightLeft,
  RefreshCw,
  Copy,
  Check,
  Calculator,
  Utensils,
  Home
} from "lucide-react"
import Link from "next/link"

// Ölçü birimleri ve dönüşüm oranları (gram bazında)
const UNIT_CONVERSIONS: Record<string, Record<string, number>> = {
  // Katı malzemeler (un, şeker, tuz vb.) - gram bazında
  solid: {
    'gram': 1,
    'kg': 1000,
    'bardak': 125, // 1 bardak un ≈ 125g
    'su_bardagi': 125,
    'cay_bardagi': 80,
    'yemek_kasigi': 10,
    'tatli_kasigi': 5,
    'cay_kasigi': 2.5,
    'kahve_fincani': 50,
    'tutam': 0.5,
    'adet': 1, // Adet için özel işlem gerekir
  },
  // Sıvı malzemeler (su, süt, yağ vb.) - ml bazında
  liquid: {
    'ml': 1,
    'litre': 1000,
    'bardak': 200, // 1 bardak sıvı ≈ 200ml
    'su_bardagi': 200,
    'cay_bardagi': 100,
    'yemek_kasigi': 15,
    'tatli_kasigi': 7.5,
    'cay_kasigi': 5,
    'kahve_fincani': 80,
  }
}

// Birim gösterim isimleri
const UNIT_LABELS: Record<string, string> = {
  'gram': 'Gram (g)',
  'kg': 'Kilogram (kg)',
  'ml': 'Mililitre (ml)',
  'litre': 'Litre (L)',
  'bardak': 'Bardak',
  'su_bardagi': 'Su Bardağı',
  'cay_bardagi': 'Çay Bardağı',
  'yemek_kasigi': 'Yemek Kaşığı',
  'tatli_kasigi': 'Tatlı Kaşığı',
  'cay_kasigi': 'Çay Kaşığı',
  'kahve_fincani': 'Kahve Fincanı',
  'tutam': 'Tutam',
  'adet': 'Adet',
}

// Kısa birim isimleri
const UNIT_SHORT: Record<string, string> = {
  'gram': 'g',
  'kg': 'kg',
  'ml': 'ml',
  'litre': 'L',
  'bardak': 'bardak',
  'su_bardagi': 'su bardağı',
  'cay_bardagi': 'çay bardağı',
  'yemek_kasigi': 'yemek kaşığı',
  'tatli_kasigi': 'tatlı kaşığı',
  'cay_kasigi': 'çay kaşığı',
  'kahve_fincani': 'fincan',
  'tutam': 'tutam',
  'adet': 'adet',
}

// Malzeme tipi (katı/sıvı) için öneriler
const LIQUID_KEYWORDS = ['su', 'süt', 'yağ', 'sıvı', 'sos', 'sirke', 'limon suyu', 'portakal suyu', 'meyve suyu', 'krema', 'yoğurt']

interface Ingredient {
  id: string
  name: string
  amount: number
  unit: string
  type: 'solid' | 'liquid'
}

export function RecipeCalculator() {
  const [originalServings, setOriginalServings] = useState<number>(4)
  const [targetServings, setTargetServings] = useState<number>(4)
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: '1', name: 'Un', amount: 250, unit: 'gram', type: 'solid' },
    { id: '2', name: 'Şeker', amount: 150, unit: 'gram', type: 'solid' },
    { id: '3', name: 'Süt', amount: 200, unit: 'ml', type: 'liquid' },
  ])
  const [copied, setCopied] = useState(false)

  // Hızlı birim dönüştürücü state'leri
  const [converterType, setConverterType] = useState<'solid' | 'liquid'>('solid')
  const [converterAmount, setConverterAmount] = useState<number>(1)
  const [converterFromUnit, setConverterFromUnit] = useState<string>('bardak')
  const [converterToUnit, setConverterToUnit] = useState<string>('gram')
  const [activeTab, setActiveTab] = useState<'recipe' | 'converter'>('recipe')

  // Yeni malzeme ekle
  const addIngredient = () => {
    const newId = Date.now().toString()
    setIngredients([...ingredients, { 
      id: newId, 
      name: '', 
      amount: 0, 
      unit: 'gram',
      type: 'solid'
    }])
  }

  // Malzeme sil
  const removeIngredient = (id: string) => {
    setIngredients(ingredients.filter(ing => ing.id !== id))
  }

  // Malzeme güncelle
  const updateIngredient = (id: string, field: keyof Ingredient, value: string | number) => {
    setIngredients(ingredients.map(ing => {
      if (ing.id !== id) return ing
      
      const updated = { ...ing, [field]: value }
      
      // İsim değiştiğinde otomatik tip belirleme
      if (field === 'name' && typeof value === 'string') {
        const isLiquid = LIQUID_KEYWORDS.some(keyword => 
          value.toLowerCase().includes(keyword.toLowerCase())
        )
        updated.type = isLiquid ? 'liquid' : 'solid'
      }
      
      return updated
    }))
  }

  // Kişi sayısına göre miktar hesapla
  const calculateAdjustedAmount = useCallback((originalAmount: number): number => {
    if (originalServings === 0) return originalAmount
    const ratio = targetServings / originalServings
    return originalAmount * ratio
  }, [originalServings, targetServings])

  // Birim dönüştürme
  const convertUnit = useCallback((amount: number, fromUnit: string, toUnit: string, type: 'solid' | 'liquid'): number => {
    const conversions = UNIT_CONVERSIONS[type]
    
    if (!conversions[fromUnit] || !conversions[toUnit]) {
      return amount // Dönüşüm yapılamıyorsa orijinal değeri döndür
    }
    
    // Önce gram/ml'ye çevir, sonra hedef birime
    const baseAmount = amount * conversions[fromUnit]
    return baseAmount / conversions[toUnit]
  }, [])

  // Miktarı formatla
  const formatAmount = (amount: number): string => {
    if (amount === 0) return '0'
    if (amount < 0.1) return amount.toFixed(3)
    if (amount < 1) return amount.toFixed(2)
    if (amount < 10) return amount.toFixed(1)
    return Math.round(amount).toString()
  }

  // Tüm malzemeleri sıfırla
  const resetIngredients = () => {
    setIngredients([
      { id: '1', name: '', amount: 0, unit: 'gram', type: 'solid' },
    ])
    setOriginalServings(4)
    setTargetServings(4)
  }

  // Sonuçları kopyala
  const copyResults = () => {
    const results = ingredients
      .filter(ing => ing.name && ing.amount > 0)
      .map(ing => {
        const adjustedAmount = calculateAdjustedAmount(ing.amount)
        return `${ing.name}: ${formatAmount(adjustedAmount)} ${UNIT_SHORT[ing.unit]}`
      })
      .join('\n')
    
    const header = `${targetServings} Kişilik Tarif:\n`
    navigator.clipboard.writeText(header + results)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Hızlı birim dönüştürme hesaplama
  const calculateConversion = useCallback((): number => {
    return convertUnit(converterAmount, converterFromUnit, converterToUnit, converterType)
  }, [converterAmount, converterFromUnit, converterToUnit, converterType, convertUnit])

  // Birimleri yer değiştir
  const swapConverterUnits = () => {
    const tempUnit = converterFromUnit
    setConverterFromUnit(converterToUnit)
    setConverterToUnit(tempUnit)
  }

  // Belirli bir malzemeyi farklı birime dönüştür
  const convertIngredientUnit = (id: string, newUnit: string) => {
    setIngredients(ingredients.map(ing => {
      if (ing.id !== id) return ing
      
      const convertedAmount = convertUnit(ing.amount, ing.unit, newUnit, ing.type)
      return { ...ing, amount: parseFloat(convertedAmount.toFixed(2)), unit: newUnit }
    }))
  }

  // Katı birimler
  const solidUnits = ['gram', 'kg', 'bardak', 'su_bardagi', 'cay_bardagi', 'yemek_kasigi', 'tatli_kasigi', 'cay_kasigi', 'kahve_fincani', 'tutam', 'adet']
  
  // Sıvı birimler
  const liquidUnits = ['ml', 'litre', 'bardak', 'su_bardagi', 'cay_bardagi', 'yemek_kasigi', 'tatli_kasigi', 'cay_kasigi', 'kahve_fincani']

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Ana Sayfa Butonu */}
      <Link href="/">
        <Button variant="outline" className="group hover:border-orange-400 hover:bg-orange-50 transition-all">
          <Home className="h-4 w-4 mr-2 group-hover:text-orange-600" />
          Ana Sayfaya Dön
        </Button>
      </Link>

      {/* Başlık */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30 mb-4">
          <ChefHat className="h-8 w-8" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900">Tarif Hesaplayıcı</h1>
        <p className="text-slate-600 max-w-xl mx-auto">
          Tariflerdeki malzeme miktarlarını kişi sayısına göre ayarlayın ve farklı ölçü birimlerine dönüştürün
        </p>
      </div>

      {/* Tab Seçimi */}
      <div className="flex justify-center">
        <div className="inline-flex p-1 bg-slate-100 rounded-xl">
          <button
            onClick={() => setActiveTab('recipe')}
            className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
              activeTab === 'recipe'
                ? 'bg-white text-orange-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="h-4 w-4" />
            Kişi Sayısına Göre Hesapla
          </button>
          <button
            onClick={() => setActiveTab('converter')}
            className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
              activeTab === 'converter'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ArrowRightLeft className="h-4 w-4" />
            Ölçü Birimi Dönüştür
          </button>
        </div>
      </div>

      {/* Hızlı Birim Dönüştürücü */}
      {activeTab === 'converter' && (
        <Card className="border-2 border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Scale className="h-5 w-5 text-blue-600" />
              Ölçü Birimi Dönüştürücü
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Tip Seçimi */}
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setConverterType('solid')
                  setConverterFromUnit('bardak')
                  setConverterToUnit('gram')
                }}
                className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
                  converterType === 'solid'
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                    : 'bg-white text-slate-600 border-2 border-slate-200 hover:border-orange-300'
                }`}
              >
                <span className="text-xl">🧂</span>
                Katı Malzeme
              </button>
              <button
                onClick={() => {
                  setConverterType('liquid')
                  setConverterFromUnit('bardak')
                  setConverterToUnit('ml')
                }}
                className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
                  converterType === 'liquid'
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-white text-slate-600 border-2 border-slate-200 hover:border-blue-300'
                }`}
              >
                <span className="text-xl">💧</span>
                Sıvı Malzeme
              </button>
            </div>

            {/* Dönüştürme Alanı */}
            <div className="grid md:grid-cols-5 gap-4 items-end">
              {/* Miktar */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">Miktar</Label>
                <Input
                  type="number"
                  min="0"
                  step="0.1"
                  value={converterAmount}
                  onChange={(e) => setConverterAmount(parseFloat(e.target.value) || 0)}
                  className="h-14 text-xl font-bold text-center border-2 border-blue-200 focus:border-blue-400"
                />
              </div>

              {/* Kaynak Birim */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">Kaynak Birim</Label>
                <select
                  value={converterFromUnit}
                  onChange={(e) => setConverterFromUnit(e.target.value)}
                  className="w-full h-14 px-4 rounded-lg border-2 border-blue-200 bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-200 text-base font-medium"
                >
                  {(converterType === 'liquid' ? liquidUnits : solidUnits).map(unit => (
                    <option key={unit} value={unit}>{UNIT_LABELS[unit]}</option>
                  ))}
                </select>
              </div>

              {/* Değiştir Butonu */}
              <div className="flex items-center justify-center">
                <button
                  onClick={swapConverterUnits}
                  className="w-14 h-14 rounded-full bg-white border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 flex items-center justify-center shadow-sm transition-all"
                >
                  <ArrowRightLeft className="h-6 w-6 text-blue-500" />
                </button>
              </div>

              {/* Hedef Birim */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">Hedef Birim</Label>
                <select
                  value={converterToUnit}
                  onChange={(e) => setConverterToUnit(e.target.value)}
                  className="w-full h-14 px-4 rounded-lg border-2 border-green-200 bg-green-50 focus:border-green-400 focus:ring-2 focus:ring-green-200 text-base font-medium"
                >
                  {(converterType === 'liquid' ? liquidUnits : solidUnits).map(unit => (
                    <option key={unit} value={unit}>{UNIT_LABELS[unit]}</option>
                  ))}
                </select>
              </div>

              {/* Sonuç */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-green-600">Sonuç</Label>
                <div className="h-14 px-4 rounded-lg bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-300 flex items-center justify-center">
                  <span className="text-xl font-bold text-green-700">
                    {formatAmount(calculateConversion())} {UNIT_SHORT[converterToUnit]}
                  </span>
                </div>
              </div>
            </div>

            {/* Dönüşüm Özeti */}
            <div className="p-4 bg-white/60 rounded-xl border border-blue-200 text-center">
              <p className="text-lg">
                <span className="font-bold text-blue-700">{converterAmount} {UNIT_SHORT[converterFromUnit]}</span>
                <span className="text-slate-500 mx-3">=</span>
                <span className="font-bold text-green-700">{formatAmount(calculateConversion())} {UNIT_SHORT[converterToUnit]}</span>
              </p>
              <p className="text-sm text-slate-500 mt-1">
                {converterType === 'solid' ? '(Un, şeker gibi katı malzemeler için)' : '(Su, süt gibi sıvı malzemeler için)'}
              </p>
            </div>

            {/* Hızlı Dönüşümler */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[1, 2, 3, 4].map(num => (
                <button
                  key={num}
                  onClick={() => setConverterAmount(num)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    converterAmount === num
                      ? 'border-blue-400 bg-blue-50 text-blue-700'
                      : 'border-slate-200 bg-white hover:border-blue-200 text-slate-600'
                  }`}
                >
                  <div className="font-bold">{num} {UNIT_SHORT[converterFromUnit]}</div>
                  <div className="text-sm text-slate-500">
                    = {formatAmount(convertUnit(num, converterFromUnit, converterToUnit, converterType))} {UNIT_SHORT[converterToUnit]}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Kişi Sayısı Ayarı - Sadece recipe tab'ında göster */}
      {activeTab === 'recipe' && (
        <>
          <Card className="border-2 border-orange-100 bg-gradient-to-r from-orange-50 to-red-50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Users className="h-5 w-5 text-orange-600" />
            Kişi Sayısı Ayarı
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-6 items-end">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">
                Orijinal Tarif (Kişi)
              </Label>
              <div className="relative">
                <Input
                  type="number"
                  min="1"
                  max="100"
                  value={originalServings}
                  onChange={(e) => setOriginalServings(parseInt(e.target.value) || 1)}
                  className="h-14 text-xl font-bold text-center border-2 border-orange-200 focus:border-orange-400"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">kişi</span>
              </div>
              <p className="text-xs text-slate-500">Tarifin kaç kişilik olduğu</p>
            </div>

            <div className="flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white border-2 border-orange-200 flex items-center justify-center shadow-sm">
                <ArrowRightLeft className="h-5 w-5 text-orange-500" />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">
                Hedef Kişi Sayısı
              </Label>
              <div className="relative">
                <Input
                  type="number"
                  min="1"
                  max="100"
                  value={targetServings}
                  onChange={(e) => setTargetServings(parseInt(e.target.value) || 1)}
                  className="h-14 text-xl font-bold text-center border-2 border-green-200 focus:border-green-400 bg-green-50"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">kişi</span>
              </div>
              <p className="text-xs text-slate-500">Kaç kişilik hazırlamak istiyorsunuz</p>
            </div>
          </div>

          {originalServings !== targetServings && (
            <div className="mt-4 p-3 bg-white/60 rounded-lg border border-orange-200">
              <p className="text-sm text-center">
                <span className="font-medium text-orange-700">
                  Oran: {(targetServings / originalServings).toFixed(2)}x
                </span>
                <span className="text-slate-500 ml-2">
                  (Malzeme miktarları {targetServings > originalServings ? 'artırılacak' : 'azaltılacak'})
                </span>
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Malzeme Listesi */}
      <Card className="border-2 border-slate-100">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Utensils className="h-5 w-5 text-slate-600" />
              Malzemeler
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={resetIngredients}
                className="text-slate-600 hover:text-red-600 hover:border-red-200"
              >
                <RefreshCw className="h-4 w-4 mr-1" />
                Sıfırla
              </Button>
              <Button
                size="sm"
                onClick={addIngredient}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              >
                <Plus className="h-4 w-4 mr-1" />
                Malzeme Ekle
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {ingredients.map((ingredient, index) => {
            const adjustedAmount = calculateAdjustedAmount(ingredient.amount)
            const units = ingredient.type === 'liquid' ? liquidUnits : solidUnits
            
            return (
              <div 
                key={ingredient.id}
                className="p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-orange-200 transition-colors"
              >
                <div className="grid sm:grid-cols-12 gap-4 items-start">
                  {/* Sıra numarası */}
                  <div className="sm:col-span-1 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-400 text-white flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                  </div>

                  {/* Malzeme adı */}
                  <div className="sm:col-span-3 space-y-1">
                    <Label className="text-xs text-slate-500">Malzeme</Label>
                    <Input
                      placeholder="Malzeme adı"
                      value={ingredient.name}
                      onChange={(e) => updateIngredient(ingredient.id, 'name', e.target.value)}
                      className="border-slate-200 focus:border-orange-300"
                    />
                  </div>

                  {/* Orijinal miktar */}
                  <div className="sm:col-span-2 space-y-1">
                    <Label className="text-xs text-slate-500">Orijinal Miktar</Label>
                    <Input
                      type="number"
                      min="0"
                      step="0.1"
                      placeholder="0"
                      value={ingredient.amount || ''}
                      onChange={(e) => updateIngredient(ingredient.id, 'amount', parseFloat(e.target.value) || 0)}
                      className="border-slate-200 focus:border-orange-300"
                    />
                  </div>

                  {/* Birim seçimi */}
                  <div className="sm:col-span-2 space-y-1">
                    <Label className="text-xs text-slate-500">Birim</Label>
                    <select
                      value={ingredient.unit}
                      onChange={(e) => convertIngredientUnit(ingredient.id, e.target.value)}
                      className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white focus:border-orange-300 focus:ring-1 focus:ring-orange-300 text-sm"
                    >
                      {units.map(unit => (
                        <option key={unit} value={unit}>{UNIT_LABELS[unit]}</option>
                      ))}
                    </select>
                  </div>

                  {/* Tip seçimi */}
                  <div className="sm:col-span-1 space-y-1">
                    <Label className="text-xs text-slate-500">Tip</Label>
                    <div className="flex gap-1">
                      <button
                        onClick={() => updateIngredient(ingredient.id, 'type', 'solid')}
                        className={`flex-1 px-2 py-2 text-xs rounded-md transition-colors ${
                          ingredient.type === 'solid' 
                            ? 'bg-orange-500 text-white' 
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                        title="Katı"
                      >
                        🧂
                      </button>
                      <button
                        onClick={() => updateIngredient(ingredient.id, 'type', 'liquid')}
                        className={`flex-1 px-2 py-2 text-xs rounded-md transition-colors ${
                          ingredient.type === 'liquid' 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                        title="Sıvı"
                      >
                        💧
                      </button>
                    </div>
                  </div>

                  {/* Hesaplanan miktar */}
                  <div className="sm:col-span-2 space-y-1">
                    <Label className="text-xs text-green-600 font-medium">Yeni Miktar</Label>
                    <div className="h-10 px-3 rounded-md bg-green-50 border border-green-200 flex items-center justify-center">
                      <span className="font-bold text-green-700">
                        {formatAmount(adjustedAmount)} {UNIT_SHORT[ingredient.unit]}
                      </span>
                    </div>
                  </div>

                  {/* Silme butonu */}
                  <div className="sm:col-span-1 flex items-end justify-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeIngredient(ingredient.id)}
                      className="h-10 w-10 p-0 text-slate-400 hover:text-red-500 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}

          {ingredients.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              <Utensils className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>Henüz malzeme eklenmedi</p>
              <p className="text-sm">Yukarıdaki "Malzeme Ekle" butonunu kullanın</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Sonuç Özeti */}
      {ingredients.filter(ing => ing.name && ing.amount > 0).length > 0 && (
        <Card className="border-2 border-green-100 bg-gradient-to-r from-green-50 to-emerald-50">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calculator className="h-5 w-5 text-green-600" />
                {targetServings} Kişilik Tarif Özeti
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={copyResults}
                className="border-green-300 text-green-700 hover:bg-green-100"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-1" />
                    Kopyalandı
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-1" />
                    Kopyala
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {ingredients
                .filter(ing => ing.name && ing.amount > 0)
                .map(ing => {
                  const adjustedAmount = calculateAdjustedAmount(ing.amount)
                  return (
                    <div 
                      key={ing.id}
                      className="flex items-center justify-between p-3 bg-white rounded-lg border border-green-200"
                    >
                      <span className="font-medium text-slate-700">{ing.name}</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                        {formatAmount(adjustedAmount)} {UNIT_SHORT[ing.unit]}
                      </Badge>
                    </div>
                  )
                })
              }
            </div>
          </CardContent>
        </Card>
      )}
      </>
      )}

      {/* Birim Dönüştürme Tablosu */}
      <Card className="border-2 border-blue-100">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Scale className="h-5 w-5 text-blue-600" />
            Ölçü Birimi Rehberi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Katı malzemeler */}
            <div className="space-y-3">
              <h4 className="font-semibold text-slate-700 flex items-center gap-2">
                <span className="text-lg">🧂</span> Katı Malzemeler (Un, Şeker vb.)
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between p-2 bg-slate-50 rounded">
                  <span>1 Su Bardağı</span>
                  <span className="font-medium">≈ 125 gram</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded">
                  <span>1 Çay Bardağı</span>
                  <span className="font-medium">≈ 80 gram</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded">
                  <span>1 Yemek Kaşığı</span>
                  <span className="font-medium">≈ 10 gram</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded">
                  <span>1 Tatlı Kaşığı</span>
                  <span className="font-medium">≈ 5 gram</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded">
                  <span>1 Çay Kaşığı</span>
                  <span className="font-medium">≈ 2.5 gram</span>
                </div>
              </div>
            </div>

            {/* Sıvı malzemeler */}
            <div className="space-y-3">
              <h4 className="font-semibold text-slate-700 flex items-center gap-2">
                <span className="text-lg">💧</span> Sıvı Malzemeler (Su, Süt vb.)
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between p-2 bg-slate-50 rounded">
                  <span>1 Su Bardağı</span>
                  <span className="font-medium">≈ 200 ml</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded">
                  <span>1 Çay Bardağı</span>
                  <span className="font-medium">≈ 100 ml</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded">
                  <span>1 Yemek Kaşığı</span>
                  <span className="font-medium">≈ 15 ml</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded">
                  <span>1 Tatlı Kaşığı</span>
                  <span className="font-medium">≈ 7.5 ml</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded">
                  <span>1 Çay Kaşığı</span>
                  <span className="font-medium">≈ 5 ml</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bilgi Kutusu */}
      <Card className="border-2 border-amber-100 bg-gradient-to-r from-amber-50 to-yellow-50">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0">
              <ChefHat className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-2">💡 Kullanım İpuçları</h3>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• <strong>Kişi Sayısına Göre Hesapla:</strong> Tarifteki tüm malzemeleri kişi sayısına göre ölçeklendirin</li>
                <li>• <strong>Ölçü Birimi Dönüştür:</strong> Bardak, kaşık, gram arasında hızlı dönüşüm yapın</li>
                <li>• Malzeme adını girdiğinizde, sıvı malzemeler otomatik olarak algılanır</li>
                <li>• Katı ve sıvı malzemeler için farklı dönüşüm oranları uygulanır</li>
                <li>• Sonuçları tek tıkla kopyalayabilir ve tarifinize yapıştırabilirsiniz</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
