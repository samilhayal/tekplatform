"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Home, Heart, Activity, BookOpen, Lightbulb, AlertCircle, Info } from "lucide-react"

export function BMICalculator() {
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [bmi, setBmi] = useState<number | null>(null)

  const calculateBMI = () => {
    const h = parseFloat(height) / 100
    const w = parseFloat(weight)
    if (h > 0 && w > 0) {
      setBmi(w / (h * h))
    }
  }

  const getCategory = (bmi: number) => {
    if (bmi < 18.5) return { name: "Zayıf", color: "from-blue-400 to-cyan-500", text: "text-blue-700", advice: "Kilo almanız önerilir" }
    if (bmi < 25) return { name: "Normal", color: "from-green-400 to-emerald-500", text: "text-green-700", advice: "İdeal kilo aralığındasınız" }
    if (bmi < 30) return { name: "Fazla Kilolu", color: "from-yellow-400 to-amber-500", text: "text-yellow-700", advice: "Kilo vermeniz önerilir" }
    return { name: "Obez", color: "from-red-400 to-orange-500", text: "text-red-700", advice: "Sağlık uzmanına başvurun" }
  }

  const category = bmi ? getCategory(bmi) : null

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">
      <Link href="/">
        <Button variant="outline" className="group flex items-center gap-2 hover:gap-3 transition-all hover:border-pink-300 hover:bg-pink-50">
          <Home className="h-4 w-4 text-pink-600 group-hover:-translate-x-1 transition-transform" />
          <span className="text-pink-900 font-medium">Ana Sayfaya Dön</span>
        </Button>
      </Link>

      <Card className="border-2 border-pink-100 shadow-xl">
        <CardContent className="pt-8 pb-8 px-6">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 shadow-lg mb-4">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-2">
              Vücut Kitle İndeksi Hesaplayıcı
            </h1>
            <p className="text-slate-600">BMI değerinizi hesaplayın</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block">Boy (cm)</label>
              <Input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="h-14 border-2" placeholder="175" />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block">Kilo (kg)</label>
              <Input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="h-14 border-2" placeholder="70" />
            </div>
          </div>

          <Button onClick={calculateBMI} className="w-full h-14 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700">
            <Activity className="mr-2" /> BMI Hesapla
          </Button>

          {bmi && category && (
            <div className="mt-8 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className={`p-8 rounded-2xl bg-gradient-to-br ${category.color} text-white text-center`}>
                <p className="text-lg font-semibold mb-2">BMI Değeriniz</p>
                <p className="text-6xl font-bold mb-3">{bmi.toFixed(1)}</p>
                <p className="text-2xl font-semibold">{category.name}</p>
                <p className="mt-3 text-sm opacity-90">{category.advice}</p>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {[
                  { label: "Zayıf", range: "<18.5", color: "bg-blue-400" },
                  { label: "Normal", range: "18.5-25", color: "bg-green-400" },
                  { label: "Fazla", range: "25-30", color: "bg-yellow-400" },
                  { label: "Obez", range: "≥30", color: "bg-red-400" }
                ].map((cat, i) => (
                  <div key={i} className="text-center p-3 rounded-lg bg-slate-50 border-2 border-slate-200">
                    <div className={`h-2 rounded-full ${cat.color} mb-2`}></div>
                    <p className="text-xs font-bold text-slate-700">{cat.label}</p>
                    <p className="text-xs text-slate-500">{cat.range}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-2 border-pink-100">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-pink-100 rounded-lg">
                <BookOpen className="h-5 w-5 text-pink-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">Nasıl Kullanılır?</h3>
                <ol className="text-sm text-slate-600 space-y-1 list-decimal list-inside">
                  <li>Boyunuzu cm cinsinden girin</li>
                  <li>Kilonuzu kg cinsinden girin</li>
                  <li>BMI Hesapla butonuna tıklayın</li>
                  <li>Sonucunuzu ve kategorinizi görün</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-rose-100">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-rose-100 rounded-lg">
                <Lightbulb className="h-5 w-5 text-rose-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">Örnek Kullanımlar</h3>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li><strong>Örnek 1:</strong> Boy: 175cm, Kilo: 70kg → BMI: 22.9 (Normal)</li>
                  <li><strong>Örnek 2:</strong> Boy: 160cm, Kilo: 55kg → BMI: 21.5 (Normal)</li>
                  <li><strong>Örnek 3:</strong> Boy: 180cm, Kilo: 95kg → BMI: 29.3 (Fazla)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-pink-100">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-pink-100 rounded-lg">
                <AlertCircle className="h-5 w-5 text-pink-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">Önemli Bilgiler</h3>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>BMI = Kilo (kg) / Boy² (m²)</li>
                  <li>18.5-24.9 arası ideal kabul edilir</li>
                  <li>Kas kütlesi BMI'yi etkileyebilir</li>
                  <li>Yaş ve cinsiyet faktörleri önemlidir</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-rose-100">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-rose-100 rounded-lg">
                <Info className="h-5 w-5 text-rose-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">İlginç Bilgiler</h3>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>🏋️ Sporcuların BMI'si yüksek olabilir (kas)</li>
                  <li>📊 BMI 1832'de Adolphe Quetelet tarafından geliştirildi</li>
                  <li>🌍 WHO tarafından standart olarak kullanılır</li>
                  <li>⚖️ Vücut kompozisyonu da önemlidir</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
