'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Calculator, TrendingUp, Award, BookOpen, Globe } from 'lucide-react'

interface Subject {
  name: string
  total: number
  correct: number
  wrong: number
}

export function KpssCalculator() {
  // Genel Yetenek
  const [genelYetenek, setGenelYetenek] = useState<Subject[]>([
    { name: 'Türkçe', total: 30, correct: 0, wrong: 0 },
    { name: 'Matematik', total: 30, correct: 0, wrong: 0 }
  ])

  // Genel Kültür
  const [genelKultur, setGenelKultur] = useState<Subject[]>([
    { name: 'Tarih', total: 27, correct: 0, wrong: 0 },
    { name: 'Coğrafya', total: 18, correct: 0, wrong: 0 },
    { name: 'Vatandaşlık', total: 15, correct: 0, wrong: 0 },
    { name: 'Güncel Bilgiler', total: 10, correct: 0, wrong: 0 }
  ])

  const calculateNet = (correct: number, wrong: number): number => {
    return Math.max(0, correct - (wrong / 4))
  }

  const updateGenelYetenek = (index: number, field: 'correct' | 'wrong', value: number) => {
    const newData = [...genelYetenek]
    newData[index] = {
      ...newData[index],
      [field]: Math.max(0, Math.min(value, newData[index].total))
    }
    setGenelYetenek(newData)
  }

  const updateGenelKultur = (index: number, field: 'correct' | 'wrong', value: number) => {
    const newData = [...genelKultur]
    newData[index] = {
      ...newData[index],
      [field]: Math.max(0, Math.min(value, newData[index].total))
    }
    setGenelKultur(newData)
  }

  const calculateCategoryNet = (subjects: Subject[]) => {
    return subjects.reduce((sum, sub) => sum + calculateNet(sub.correct, sub.wrong), 0)
  }

  const calculateCategoryStats = (subjects: Subject[]) => {
    const totalCorrect = subjects.reduce((sum, sub) => sum + sub.correct, 0)
    const totalWrong = subjects.reduce((sum, sub) => sum + sub.wrong, 0)
    const totalQuestions = subjects.reduce((sum, sub) => sum + sub.total, 0)
    const totalEmpty = totalQuestions - totalCorrect - totalWrong
    const totalNet = calculateCategoryNet(subjects)

    return { totalCorrect, totalWrong, totalEmpty, totalNet, totalQuestions }
  }

  const resetAll = () => {
    setGenelYetenek([
      { name: 'Türkçe', total: 30, correct: 0, wrong: 0 },
      { name: 'Matematik', total: 30, correct: 0, wrong: 0 }
    ])
    setGenelKultur([
      { name: 'Tarih', total: 27, correct: 0, wrong: 0 },
      { name: 'Coğrafya', total: 18, correct: 0, wrong: 0 },
      { name: 'Vatandaşlık', total: 15, correct: 0, wrong: 0 },
      { name: 'Güncel Bilgiler', total: 10, correct: 0, wrong: 0 }
    ])
  }

  const gyStats = calculateCategoryStats(genelYetenek)
  const gkStats = calculateCategoryStats(genelKultur)
  const totalNet = gyStats.totalNet + gkStats.totalNet
  const totalCorrect = gyStats.totalCorrect + gkStats.totalCorrect
  const totalWrong = gyStats.totalWrong + gkStats.totalWrong

  return (
    <div className="space-y-6">
      {/* Bilgilendirme */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200">
        <CardHeader>
          <CardTitle className="text-green-900">KPSS Net Hesaplama</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-green-800">
          <p><strong>Genel Yetenek:</strong> Türkçe 30 + Matematik 30 = 60 soru</p>
          <p><strong>Genel Kültür:</strong> Tarih 27 + Coğrafya 18 + Vatandaşlık 15 + Güncel 10 = 70 soru</p>
          <p className="text-xs text-green-700 mt-2">
            <strong>Net = Doğru - (Yanlış / 4)</strong>
          </p>
        </CardContent>
      </Card>

      {/* Genel Yetenek */}
      <Card className="bg-white/80 backdrop-blur-sm border-2 border-green-200">
        <CardHeader>
          <CardTitle className="text-green-900 flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Genel Yetenek (60 Soru)
          </CardTitle>
          <CardDescription>Türkçe ve Matematik</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {genelYetenek.map((subject, index) => (
            <div key={index} className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold">{subject.name}</h4>
                <span className="text-sm text-slate-600">{subject.total} soru</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Doğru</Label>
                  <Input
                    type="number"
                    value={subject.correct || ''}
                    onChange={(e) => updateGenelYetenek(index, 'correct', Number(e.target.value))}
                    min="0"
                    max={subject.total}
                    className="h-12 text-center text-lg font-semibold text-green-600"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Yanlış</Label>
                  <Input
                    type="number"
                    value={subject.wrong || ''}
                    onChange={(e) => updateGenelYetenek(index, 'wrong', Number(e.target.value))}
                    min="0"
                    max={subject.total}
                    className="h-12 text-center text-lg font-semibold text-red-600"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Boş</Label>
                  <div className="h-12 flex items-center justify-center bg-slate-200 rounded-md text-lg font-semibold text-slate-600">
                    {subject.total - subject.correct - subject.wrong}
                  </div>
                </div>
              </div>
              <div className="mt-3 flex justify-between items-center pt-3 border-t">
                <span className="text-sm text-slate-600">Net:</span>
                <span className="text-2xl font-bold text-green-600">
                  {calculateNet(subject.correct, subject.wrong).toFixed(2)}
                </span>
              </div>
            </div>
          ))}

          {/* GY Toplam */}
          <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-green-100 text-sm">Doğru</p>
                  <p className="text-3xl font-bold">{gyStats.totalCorrect}</p>
                </div>
                <div>
                  <p className="text-green-100 text-sm">Yanlış</p>
                  <p className="text-3xl font-bold">{gyStats.totalWrong}</p>
                </div>
              </div>
              <div className="pt-4 border-t border-green-400">
                <p className="text-green-100 text-sm mb-1">GENEL YETENEK NET</p>
                <p className="text-5xl font-bold">{gyStats.totalNet.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {/* Genel Kültür */}
      <Card className="bg-white/80 backdrop-blur-sm border-2 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900 flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Genel Kültür (70 Soru)
          </CardTitle>
          <CardDescription>Tarih, Coğrafya, Vatandaşlık, Güncel</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {genelKultur.map((subject, index) => (
            <div key={index} className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold">{subject.name}</h4>
                <span className="text-sm text-slate-600">{subject.total} soru</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Doğru</Label>
                  <Input
                    type="number"
                    value={subject.correct || ''}
                    onChange={(e) => updateGenelKultur(index, 'correct', Number(e.target.value))}
                    min="0"
                    max={subject.total}
                    className="h-12 text-center text-lg font-semibold text-green-600"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Yanlış</Label>
                  <Input
                    type="number"
                    value={subject.wrong || ''}
                    onChange={(e) => updateGenelKultur(index, 'wrong', Number(e.target.value))}
                    min="0"
                    max={subject.total}
                    className="h-12 text-center text-lg font-semibold text-red-600"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Boş</Label>
                  <div className="h-12 flex items-center justify-center bg-slate-200 rounded-md text-lg font-semibold text-slate-600">
                    {subject.total - subject.correct - subject.wrong}
                  </div>
                </div>
              </div>
              <div className="mt-3 flex justify-between items-center pt-3 border-t">
                <span className="text-sm text-slate-600">Net:</span>
                <span className="text-2xl font-bold text-blue-600">
                  {calculateNet(subject.correct, subject.wrong).toFixed(2)}
                </span>
              </div>
            </div>
          ))}

          {/* GK Toplam */}
          <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-blue-100 text-sm">Doğru</p>
                  <p className="text-3xl font-bold">{gkStats.totalCorrect}</p>
                </div>
                <div>
                  <p className="text-blue-100 text-sm">Yanlış</p>
                  <p className="text-3xl font-bold">{gkStats.totalWrong}</p>
                </div>
              </div>
              <div className="pt-4 border-t border-blue-400">
                <p className="text-blue-100 text-sm mb-1">GENEL KÜLTÜR NET</p>
                <p className="text-5xl font-bold">{gkStats.totalNet.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {/* Genel Toplam */}
      <Card className="bg-gradient-to-br from-purple-600 to-pink-700 text-white border-0 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-white text-2xl flex items-center gap-2">
            <Award className="h-6 w-6" />
            KPSS TOPLAM NET
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-7xl font-bold mb-4">
            {totalNet.toFixed(2)}
          </div>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="bg-white/20 p-3 rounded-lg">
              <p className="text-purple-100">Toplam Doğru</p>
              <p className="text-2xl font-bold">{totalCorrect}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <p className="text-pink-100">Toplam Yanlış</p>
              <p className="text-2xl font-bold">{totalWrong}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <p className="text-purple-100">Toplam Boş</p>
              <p className="text-2xl font-bold">{130 - totalCorrect - totalWrong}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Net Dağılımı */}
      <Card className="bg-white/80 backdrop-blur-sm border-2 border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-slate-700" />
            Net Dağılımı
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-3 border-b">
              <span className="font-semibold">Genel Yetenek</span>
              <span className="text-2xl font-bold text-green-600">{gyStats.totalNet.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b">
              <span className="font-semibold">Genel Kültür</span>
              <span className="text-2xl font-bold text-blue-600">{gkStats.totalNet.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center py-3 bg-purple-50 px-4 rounded-lg">
              <span className="font-bold text-lg">TOPLAM</span>
              <span className="text-3xl font-bold text-purple-600">{totalNet.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button onClick={resetAll} variant="outline" size="lg">
          <Calculator className="h-4 w-4 mr-2" />
          Sıfırla
        </Button>
      </div>
    </div>
  )
}
