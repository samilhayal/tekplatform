'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Calculator, TrendingUp, BookOpen, Target, Award } from 'lucide-react'

interface Subject {
  name: string
  total: number
  correct: number
  wrong: number
}

interface ExamResult {
  subjects: Subject[]
  totalNet: number
  totalCorrect: number
  totalWrong: number
  totalEmpty: number
}

export function YksCalculator() {
  // TYT
  const [tyt, setTyt] = useState<Subject[]>([
    { name: 'Türkçe', total: 40, correct: 0, wrong: 0 },
    { name: 'Matematik', total: 40, correct: 0, wrong: 0 },
    { name: 'Fen Bilimleri', total: 20, correct: 0, wrong: 0 },
    { name: 'Sosyal Bilimler', total: 20, correct: 0, wrong: 0 }
  ])

  // AYT
  const [aytMat, setAytMat] = useState<Subject>({ name: 'Matematik', total: 40, correct: 0, wrong: 0 })
  const [aytFen, setAytFen] = useState<Subject[]>([
    { name: 'Fizik', total: 14, correct: 0, wrong: 0 },
    { name: 'Kimya', total: 13, correct: 0, wrong: 0 },
    { name: 'Biyoloji', total: 13, correct: 0, wrong: 0 }
  ])
  const [aytEd, setAytEd] = useState<Subject>({ name: 'Edebiyat-Sosyal 1', total: 40, correct: 0, wrong: 0 })
  const [aytSos, setAytSos] = useState<Subject>({ name: 'Sosyal Bilimler 2', total: 40, correct: 0, wrong: 0 })

  const [examType, setExamType] = useState<'sayisal' | 'esitagirlik' | 'sozel'>('sayisal')

  const calculateNet = (correct: number, wrong: number): number => {
    return Math.max(0, correct - (wrong / 4))
  }

  const updateTyt = (index: number, field: 'correct' | 'wrong', value: number) => {
    const newTyt = [...tyt]
    const subject = newTyt[index]
    const newValue = Math.max(0, Math.min(value, subject.total))
    const otherField = field === 'correct' ? 'wrong' : 'correct'
    const maxAllowed = subject.total - subject[otherField]
    newTyt[index] = {
      ...subject,
      [field]: Math.min(newValue, maxAllowed)
    }
    setTyt(newTyt)
  }

  const updateAytFen = (index: number, field: 'correct' | 'wrong', value: number) => {
    const newFen = [...aytFen]
    const subject = newFen[index]
    const newValue = Math.max(0, Math.min(value, subject.total))
    const otherField = field === 'correct' ? 'wrong' : 'correct'
    const maxAllowed = subject.total - subject[otherField]
    newFen[index] = {
      ...subject,
      [field]: Math.min(newValue, maxAllowed)
    }
    setAytFen(newFen)
  }

  const updateAytMat = (field: 'correct' | 'wrong', value: number) => {
    const newValue = Math.max(0, Math.min(value, aytMat.total))
    const otherField = field === 'correct' ? 'wrong' : 'correct'
    const maxAllowed = aytMat.total - aytMat[otherField]
    setAytMat({...aytMat, [field]: Math.min(newValue, maxAllowed)})
  }

  const updateAytEd = (field: 'correct' | 'wrong', value: number) => {
    const newValue = Math.max(0, Math.min(value, aytEd.total))
    const otherField = field === 'correct' ? 'wrong' : 'correct'
    const maxAllowed = aytEd.total - aytEd[otherField]
    setAytEd({...aytEd, [field]: Math.min(newValue, maxAllowed)})
  }

  const updateAytSos = (field: 'correct' | 'wrong', value: number) => {
    const newValue = Math.max(0, Math.min(value, aytSos.total))
    const otherField = field === 'correct' ? 'wrong' : 'correct'
    const maxAllowed = aytSos.total - aytSos[otherField]
    setAytSos({...aytSos, [field]: Math.min(newValue, maxAllowed)})
  }

  const calculateTytResult = (): ExamResult => {
    const subjects = tyt.map(sub => ({
      ...sub,
      net: calculateNet(sub.correct, sub.wrong),
      empty: sub.total - sub.correct - sub.wrong
    }))

    return {
      subjects,
      totalNet: subjects.reduce((sum, sub) => sum + calculateNet(sub.correct, sub.wrong), 0),
      totalCorrect: subjects.reduce((sum, sub) => sum + sub.correct, 0),
      totalWrong: subjects.reduce((sum, sub) => sum + sub.wrong, 0),
      totalEmpty: subjects.reduce((sum, sub) => sum + (sub.total - sub.correct - sub.wrong), 0)
    }
  }

  const calculateAytSayisal = (): ExamResult => {
    const matSub = {
      ...aytMat,
      net: calculateNet(aytMat.correct, aytMat.wrong),
      empty: aytMat.total - aytMat.correct - aytMat.wrong
    }

    const fenSubjects = aytFen.map(sub => ({
      ...sub,
      net: calculateNet(sub.correct, sub.wrong),
      empty: sub.total - sub.correct - sub.wrong
    }))

    const allSubjects = [matSub, ...fenSubjects]

    return {
      subjects: allSubjects,
      totalNet: allSubjects.reduce((sum, sub) => sum + calculateNet(sub.correct, sub.wrong), 0),
      totalCorrect: allSubjects.reduce((sum, sub) => sum + sub.correct, 0),
      totalWrong: allSubjects.reduce((sum, sub) => sum + sub.wrong, 0),
      totalEmpty: allSubjects.reduce((sum, sub) => sum + (sub.total - sub.correct - sub.wrong), 0)
    }
  }

  const calculateAytEsitagirlik = (): ExamResult => {
    const matSub = {
      ...aytMat,
      net: calculateNet(aytMat.correct, aytMat.wrong),
      empty: aytMat.total - aytMat.correct - aytMat.wrong
    }

    const edSub = {
      ...aytEd,
      net: calculateNet(aytEd.correct, aytEd.wrong),
      empty: aytEd.total - aytEd.correct - aytEd.wrong
    }

    const allSubjects = [matSub, edSub]

    return {
      subjects: allSubjects,
      totalNet: allSubjects.reduce((sum, sub) => sum + calculateNet(sub.correct, sub.wrong), 0),
      totalCorrect: allSubjects.reduce((sum, sub) => sum + sub.correct, 0),
      totalWrong: allSubjects.reduce((sum, sub) => sum + sub.wrong, 0),
      totalEmpty: allSubjects.reduce((sum, sub) => sum + (sub.total - sub.correct - sub.wrong), 0)
    }
  }

  const calculateAytSozel = (): ExamResult => {
    const edSub = {
      ...aytEd,
      net: calculateNet(aytEd.correct, aytEd.wrong),
      empty: aytEd.total - aytEd.correct - aytEd.wrong
    }

    const sosSub = {
      ...aytSos,
      net: calculateNet(aytSos.correct, aytSos.wrong),
      empty: aytSos.total - aytSos.correct - aytSos.wrong
    }

    const allSubjects = [edSub, sosSub]

    return {
      subjects: allSubjects,
      totalNet: allSubjects.reduce((sum, sub) => sum + calculateNet(sub.correct, sub.wrong), 0),
      totalCorrect: allSubjects.reduce((sum, sub) => sum + sub.correct, 0),
      totalWrong: allSubjects.reduce((sum, sub) => sum + sub.wrong, 0),
      totalEmpty: allSubjects.reduce((sum, sub) => sum + (sub.total - sub.correct - sub.wrong), 0)
    }
  }

  const resetAll = () => {
    setTyt([
      { name: 'Türkçe', total: 40, correct: 0, wrong: 0 },
      { name: 'Matematik', total: 40, correct: 0, wrong: 0 },
      { name: 'Fen Bilimleri', total: 20, correct: 0, wrong: 0 },
      { name: 'Sosyal Bilimler', total: 20, correct: 0, wrong: 0 }
    ])
    setAytMat({ name: 'Matematik', total: 40, correct: 0, wrong: 0 })
    setAytFen([
      { name: 'Fizik', total: 14, correct: 0, wrong: 0 },
      { name: 'Kimya', total: 13, correct: 0, wrong: 0 },
      { name: 'Biyoloji', total: 13, correct: 0, wrong: 0 }
    ])
    setAytEd({ name: 'Edebiyat-Sosyal 1', total: 40, correct: 0, wrong: 0 })
    setAytSos({ name: 'Sosyal Bilimler 2', total: 40, correct: 0, wrong: 0 })
  }

  const tytResult = calculateTytResult()
  const aytResult = examType === 'sayisal' 
    ? calculateAytSayisal() 
    : examType === 'esitagirlik' 
    ? calculateAytEsitagirlik() 
    : calculateAytSozel()

  return (
    <div className="space-y-6">
      {/* Bilgilendirme */}
      <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200">
        <CardHeader>
          <CardTitle className="text-amber-900">YKS Net Hesaplama</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-amber-800">
          <p><strong>TYT:</strong> Temel Yeterlilik Testi - Tüm adaylar girer (120 soru)</p>
          <p><strong>AYT:</strong> Alan Yeterlilik Testi - Bölüme göre farklı testler (80 soru)</p>
          <p className="text-xs text-amber-700 mt-2">
            <strong>Net = Doğru - (Yanlış / 4)</strong>
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="tyt">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="tyt">TYT</TabsTrigger>
          <TabsTrigger value="ayt">AYT</TabsTrigger>
        </TabsList>

        {/* TYT */}
        <TabsContent value="tyt">
          <Card className="bg-white/80 backdrop-blur-sm border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900">Temel Yeterlilik Testi (TYT)</CardTitle>
              <CardDescription>Toplam 120 soru</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {tyt.map((subject, index) => (
                <div key={index} className="p-4 bg-slate-50 rounded-lg">
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
                        onChange={(e) => updateTyt(index, 'correct', Number(e.target.value))}
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
                        onChange={(e) => updateTyt(index, 'wrong', Number(e.target.value))}
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

              {/* TYT Toplam */}
              <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-0 shadow-lg">
                <CardContent className="pt-6">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-blue-100 text-sm">Toplam Doğru</p>
                      <p className="text-3xl font-bold">{tytResult.totalCorrect}</p>
                    </div>
                    <div>
                      <p className="text-blue-100 text-sm">Toplam Yanlış</p>
                      <p className="text-3xl font-bold">{tytResult.totalWrong}</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-blue-400">
                    <p className="text-blue-100 text-sm mb-1">TYT TOPLAM NET</p>
                    <p className="text-5xl font-bold">{tytResult.totalNet.toFixed(2)}</p>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AYT */}
        <TabsContent value="ayt">
          <div className="space-y-4">
            {/* Alan Seçimi */}
            <Card className="bg-white/80 backdrop-blur-sm border-2 border-purple-200">
              <CardHeader>
                <CardTitle className="text-purple-900">Alan Seçimi</CardTitle>
                <CardDescription>Hedef bölüm türünüzü seçin</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Button
                    variant={examType === 'sayisal' ? 'default' : 'outline'}
                    onClick={() => setExamType('sayisal')}
                    className={examType === 'sayisal' ? 'bg-purple-600' : ''}
                  >
                    <Target className="h-4 w-4 mr-2" />
                    Sayısal (MF)
                  </Button>
                  <Button
                    variant={examType === 'esitagirlik' ? 'default' : 'outline'}
                    onClick={() => setExamType('esitagirlik')}
                    className={examType === 'esitagirlik' ? 'bg-purple-600' : ''}
                  >
                    <Award className="h-4 w-4 mr-2" />
                    Eşit Ağırlık (EA)
                  </Button>
                  <Button
                    variant={examType === 'sozel' ? 'default' : 'outline'}
                    onClick={() => setExamType('sozel')}
                    className={examType === 'sozel' ? 'bg-purple-600' : ''}
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    Sözel (TS)
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Sayısal */}
            {examType === 'sayisal' && (
              <Card className="bg-white/80 backdrop-blur-sm border-2 border-purple-200">
                <CardHeader>
                  <CardTitle className="text-purple-900">Sayısal (MF) - 80 Soru</CardTitle>
                  <CardDescription>Matematik + Fen Bilimleri</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Matematik */}
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{aytMat.name}</h4>
                      <span className="text-sm text-slate-600">{aytMat.total} soru</span>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs">Doğru</Label>
                        <Input
                          type="number"
                          value={aytMat.correct || ''}
                          onChange={(e) => updateAytMat('correct', Number(e.target.value))}
                          min="0"
                          max={aytMat.total}
                          className="h-12 text-center text-lg font-semibold text-green-600"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Yanlış</Label>
                        <Input
                          type="number"
                          value={aytMat.wrong || ''}
                          onChange={(e) => updateAytMat('wrong', Number(e.target.value))}
                          min="0"
                          max={aytMat.total}
                          className="h-12 text-center text-lg font-semibold text-red-600"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Boş</Label>
                        <div className="h-12 flex items-center justify-center bg-slate-200 rounded-md text-lg font-semibold text-slate-600">
                          {aytMat.total - aytMat.correct - aytMat.wrong}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex justify-between items-center pt-3 border-t">
                      <span className="text-sm text-slate-600">Net:</span>
                      <span className="text-2xl font-bold text-purple-600">
                        {calculateNet(aytMat.correct, aytMat.wrong).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Fen Bilimleri */}
                  {aytFen.map((subject, index) => (
                    <div key={index} className="p-4 bg-slate-50 rounded-lg">
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
                            onChange={(e) => updateAytFen(index, 'correct', Number(e.target.value))}
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
                            onChange={(e) => updateAytFen(index, 'wrong', Number(e.target.value))}
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
                        <span className="text-2xl font-bold text-purple-600">
                          {calculateNet(subject.correct, subject.wrong).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Eşit Ağırlık */}
            {examType === 'esitagirlik' && (
              <Card className="bg-white/80 backdrop-blur-sm border-2 border-purple-200">
                <CardHeader>
                  <CardTitle className="text-purple-900">Eşit Ağırlık (EA) - 80 Soru</CardTitle>
                  <CardDescription>Matematik + Edebiyat-Sosyal 1</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Matematik */}
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{aytMat.name}</h4>
                      <span className="text-sm text-slate-600">{aytMat.total} soru</span>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs">Doğru</Label>
                        <Input
                          type="number"
                          value={aytMat.correct || ''}
                          onChange={(e) => updateAytMat('correct', Number(e.target.value))}
                          min="0"
                          max={aytMat.total}
                          className="h-12 text-center text-lg font-semibold text-green-600"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Yanlış</Label>
                        <Input
                          type="number"
                          value={aytMat.wrong || ''}
                          onChange={(e) => updateAytMat('wrong', Number(e.target.value))}
                          min="0"
                          max={aytMat.total}
                          className="h-12 text-center text-lg font-semibold text-red-600"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Boş</Label>
                        <div className="h-12 flex items-center justify-center bg-slate-200 rounded-md text-lg font-semibold text-slate-600">
                          {aytMat.total - aytMat.correct - aytMat.wrong}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex justify-between items-center pt-3 border-t">
                      <span className="text-sm text-slate-600">Net:</span>
                      <span className="text-2xl font-bold text-purple-600">
                        {calculateNet(aytMat.correct, aytMat.wrong).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Edebiyat */}
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{aytEd.name}</h4>
                      <span className="text-sm text-slate-600">{aytEd.total} soru</span>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs">Doğru</Label>
                        <Input
                          type="number"
                          value={aytEd.correct || ''}
                          onChange={(e) => updateAytEd('correct', Number(e.target.value))}
                          min="0"
                          max={aytEd.total}
                          className="h-12 text-center text-lg font-semibold text-green-600"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Yanlış</Label>
                        <Input
                          type="number"
                          value={aytEd.wrong || ''}
                          onChange={(e) => updateAytEd('wrong', Number(e.target.value))}
                          min="0"
                          max={aytEd.total}
                          className="h-12 text-center text-lg font-semibold text-red-600"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Boş</Label>
                        <div className="h-12 flex items-center justify-center bg-slate-200 rounded-md text-lg font-semibold text-slate-600">
                          {aytEd.total - aytEd.correct - aytEd.wrong}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex justify-between items-center pt-3 border-t">
                      <span className="text-sm text-slate-600">Net:</span>
                      <span className="text-2xl font-bold text-purple-600">
                        {calculateNet(aytEd.correct, aytEd.wrong).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Sözel */}
            {examType === 'sozel' && (
              <Card className="bg-white/80 backdrop-blur-sm border-2 border-purple-200">
                <CardHeader>
                  <CardTitle className="text-purple-900">Sözel (TS) - 80 Soru</CardTitle>
                  <CardDescription>Edebiyat-Sosyal 1 + Sosyal Bilimler 2</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Edebiyat */}
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{aytEd.name}</h4>
                      <span className="text-sm text-slate-600">{aytEd.total} soru</span>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs">Doğru</Label>
                        <Input
                          type="number"
                          value={aytEd.correct || ''}
                          onChange={(e) => updateAytEd('correct', Number(e.target.value))}
                          min="0"
                          max={aytEd.total}
                          className="h-12 text-center text-lg font-semibold text-green-600"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Yanlış</Label>
                        <Input
                          type="number"
                          value={aytEd.wrong || ''}
                          onChange={(e) => updateAytEd('wrong', Number(e.target.value))}
                          min="0"
                          max={aytEd.total}
                          className="h-12 text-center text-lg font-semibold text-red-600"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Boş</Label>
                        <div className="h-12 flex items-center justify-center bg-slate-200 rounded-md text-lg font-semibold text-slate-600">
                          {aytEd.total - aytEd.correct - aytEd.wrong}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex justify-between items-center pt-3 border-t">
                      <span className="text-sm text-slate-600">Net:</span>
                      <span className="text-2xl font-bold text-purple-600">
                        {calculateNet(aytEd.correct, aytEd.wrong).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Sosyal 2 */}
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{aytSos.name}</h4>
                      <span className="text-sm text-slate-600">{aytSos.total} soru</span>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs">Doğru</Label>
                        <Input
                          type="number"
                          value={aytSos.correct || ''}
                          onChange={(e) => updateAytSos('correct', Number(e.target.value))}
                          min="0"
                          max={aytSos.total}
                          className="h-12 text-center text-lg font-semibold text-green-600"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Yanlış</Label>
                        <Input
                          type="number"
                          value={aytSos.wrong || ''}
                          onChange={(e) => updateAytSos('wrong', Number(e.target.value))}
                          min="0"
                          max={aytSos.total}
                          className="h-12 text-center text-lg font-semibold text-red-600"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Boş</Label>
                        <div className="h-12 flex items-center justify-center bg-slate-200 rounded-md text-lg font-semibold text-slate-600">
                          {aytSos.total - aytSos.correct - aytSos.wrong}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex justify-between items-center pt-3 border-t">
                      <span className="text-sm text-slate-600">Net:</span>
                      <span className="text-2xl font-bold text-purple-600">
                        {calculateNet(aytSos.correct, aytSos.wrong).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* AYT Toplam */}
            <Card className="bg-gradient-to-br from-purple-500 to-pink-600 text-white border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-purple-100 text-sm">Toplam Doğru</p>
                    <p className="text-3xl font-bold">{aytResult.totalCorrect}</p>
                  </div>
                  <div>
                    <p className="text-purple-100 text-sm">Toplam Yanlış</p>
                    <p className="text-3xl font-bold">{aytResult.totalWrong}</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-purple-400">
                  <p className="text-purple-100 text-sm mb-1">AYT TOPLAM NET</p>
                  <p className="text-5xl font-bold">{aytResult.totalNet.toFixed(2)}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Genel Sonuç */}
      <Card className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white border-0 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-white text-2xl flex items-center gap-2">
            <TrendingUp className="h-6 w-6" />
            TOPLAM NET
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-7xl font-bold mb-4">
            {(tytResult.totalNet + aytResult.totalNet).toFixed(2)}
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-white/20 p-3 rounded-lg">
              <p className="text-indigo-100">TYT Net</p>
              <p className="text-2xl font-bold">{tytResult.totalNet.toFixed(2)}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <p className="text-purple-100">AYT Net</p>
              <p className="text-2xl font-bold">{aytResult.totalNet.toFixed(2)}</p>
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
