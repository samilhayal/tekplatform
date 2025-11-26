"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Home, Weight, Target, BookOpen, Lightbulb, AlertCircle, Info, TrendingDown, TrendingUp, Activity } from "lucide-react"

export function IdealWeightCalculator() {
  const [height, setHeight] = useState("")
  const [gender, setGender] = useState("male")
  const [age, setAge] = useState("")
  const [currentWeight, setCurrentWeight] = useState("")
  const [results, setResults] = useState<any>(null)

  const calculate = () => {
    const h = parseFloat(height)
    const a = parseFloat(age)
    const w = parseFloat(currentWeight)
    if (!h || h <= 0) return

    const heightInInches = h / 2.54
    const robinson = gender === "male" ? 52 + 1.9 * (heightInInches - 60) : 49 + 1.7 * (heightInInches - 60)
    const miller = gender === "male" ? 56.2 + 1.41 * (heightInInches - 60) : 53.1 + 1.36 * (heightInInches - 60)
    const hamwi = gender === "male" ? 48 + 2.7 * (heightInInches - 60) : 45.5 + 2.2 * (heightInInches - 60)
    const devine = gender === "male" ? 50 + 2.3 * (heightInInches - 60) : 45.5 + 2.3 * (heightInInches - 60)
    const avg = (robinson + miller + hamwi + devine) / 4
    
    const diff = w ? w - avg : 0
    const bmi = w && h ? w / Math.pow(h / 100, 2) : 0

    setResults({ robinson, miller, hamwi, devine, avg, diff, bmi })
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">
      <Link href="/">
        <Button variant="outline" className="group flex items-center gap-2 hover:gap-3 transition-all hover:border-violet-300">
          <Home className="h-4 w-4 text-violet-600 group-hover:-translate-x-1 transition-transform" />
          Ana Sayfaya Dön
        </Button>
      </Link>

      <Card className="border-2 border-violet-100 shadow-xl">
        <CardContent className="pt-8 px-6 pb-8">
          <div className="mb-8 text-center">
            <div className="inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg mb-4 items-center justify-center">
              <Weight className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-2">
              İdeal Kilo Hesaplayıcı
            </h1>
            <p className="text-slate-600">4 farklı formülle ideal kilonuzu öğrenin</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block">Cinsiyet</label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger className="h-14 border-2"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Erkek 👨</SelectItem>
                  <SelectItem value="female">Kadın 👩</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block">Boy (cm)</label>
              <Input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="h-14 border-2" placeholder="175" />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block">Yaş</label>
              <Input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="h-14 border-2" placeholder="30" />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block">Mevcut Kilo (kg) - Opsiyonel</label>
              <Input type="number" value={currentWeight} onChange={(e) => setCurrentWeight(e.target.value)} className="h-14 border-2" placeholder="70" />
            </div>
          </div>

          <Button onClick={calculate} className="w-full h-14 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700">
            <Target className="mr-2" /> İdeal Kilo Hesapla
          </Button>

          {results && (
            <div className="mt-8 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="p-8 rounded-2xl bg-gradient-to-br from-violet-50 to-purple-50 border-2 border-violet-200 text-center">
                <Weight className="h-12 w-12 mx-auto text-violet-600 mb-3" />
                <p className="text-sm font-semibold text-slate-600 mb-2">Ortalama İdeal Kilo</p>
                <p className="text-6xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  {results.avg.toFixed(1)} <span className="text-3xl">kg</span>
                </p>
                {results.diff !== 0 && (
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${results.diff > 0 ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                    {results.diff > 0 ? <TrendingDown className="h-5 w-5" /> : <TrendingUp className="h-5 w-5" />}
                    <span className="font-semibold">
                      {Math.abs(results.diff).toFixed(1)} kg {results.diff > 0 ? 'vermeniz' : 'almanız'} önerilir
                    </span>
                  </div>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { name: "Robinson", value: results.robinson, color: "violet" },
                  { name: "Miller", value: results.miller, color: "purple" },
                  { name: "Hamwi", value: results.hamwi, color: "violet" },
                  { name: "Devine", value: results.devine, color: "purple" }
                ].map((formula, i) => (
                  <div key={i} className={`p-4 rounded-xl bg-white border-2 border-${formula.color}-100`}>
                    <p className="text-sm text-slate-600">{formula.name} Formülü</p>
                    <p className={`text-3xl font-bold text-${formula.color}-600`}>{formula.value.toFixed(1)} kg</p>
                  </div>
                ))}
              </div>

              {results.bmi > 0 && (
                <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-violet-50 border-2 border-indigo-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600">Mevcut BMI</p>
                      <p className="text-2xl font-bold text-indigo-700">{results.bmi.toFixed(1)}</p>
                    </div>
                    <Activity className="h-10 w-10 text-indigo-400" />
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-2 border-violet-100"><CardContent className="pt-6">
          <div className="flex items-start gap-3"><div className="p-2 bg-violet-100 rounded-lg"><BookOpen className="h-5 w-5 text-violet-600" /></div>
          <div><h3 className="font-bold mb-2">Nasıl Kullanılır?</h3>
          <ol className="text-sm text-slate-600 space-y-1 list-decimal list-inside">
            <li>Cinsiyetinizi seçin</li><li>Boyunuzu cm olarak girin</li><li>Yaşınızı girin</li><li>İsteğe bağlı mevcut kilonuzu girin</li>
          </ol></div></div></CardContent></Card>

        <Card className="border-2 border-purple-100"><CardContent className="pt-6">
          <div className="flex items-start gap-3"><div className="p-2 bg-purple-100 rounded-lg"><Lightbulb className="h-5 w-5 text-purple-600" /></div>
          <div><h3 className="font-bold mb-2">Örnek Kullanımlar</h3>
          <ul className="text-sm text-slate-600 space-y-1">
            <li><strong>Erkek:</strong> 180cm → ~75kg ideal</li><li><strong>Kadın:</strong> 165cm → ~58kg ideal</li>
          </ul></div></div></CardContent></Card>

        <Card className="border-2 border-violet-100"><CardContent className="pt-6">
          <div className="flex items-start gap-3"><div className="p-2 bg-violet-100 rounded-lg"><AlertCircle className="h-5 w-5 text-violet-600" /></div>
          <div><h3 className="font-bold mb-2">Önemli Bilgiler</h3>
          <ul className="text-sm text-slate-600 space-y-1">
            <li>4 farklı bilimsel formül kullanılır</li><li>Ortalama en doğru sonucu verir</li><li>Kas kütlesi hesaba katılmaz</li>
          </ul></div></div></CardContent></Card>

        <Card className="border-2 border-purple-100"><CardContent className="pt-6">
          <div className="flex items-start gap-3"><div className="p-2 bg-purple-100 rounded-lg"><Info className="h-5 w-5 text-purple-600" /></div>
          <div><h3 className="font-bold mb-2">İlginç Bilgiler</h3>
          <ul className="text-sm text-slate-600 space-y-1">
            <li>📐 Robinson formülü 1983'te geliştirildi</li><li>⚖️ Her formül farklı parametreler kullanır</li>
          </ul></div></div></CardContent></Card>
      </div>
    </div>
  )
}
