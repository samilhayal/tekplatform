"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Droplets, Activity } from "lucide-react"

export function WaterIntakeCalculator() {
  const [weight, setWeight] = useState("")
  const [activity, setActivity] = useState("moderate")
  const [result, setResult] = useState<number | null>(null)

  const activityMultipliers = {
    low: { name: "Az Hareketli", multiplier: 30 },
    moderate: { name: "Orta Hareketli", multiplier: 35 },
    high: { name: "Çok Hareketli", multiplier: 40 },
  }

  const calculateWater = () => {
    const w = parseFloat(weight)
    if (isNaN(w) || w <= 0) return

    const water = (w * activityMultipliers[activity as keyof typeof activityMultipliers].multiplier) / 1000
    setResult(water)
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      <Card className="border-2 border-cyan-100/50 shadow-xl">
        <CardContent className="pt-8 pb-8 px-6 sm:px-8">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg mb-4">
              <Droplets className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-2">
              Su İhtiyacı Hesaplama
            </h2>
            <p className="text-slate-600">Günlük su tüketiminizi hesaplayın</p>
          </div>

          <div className="space-y-6 mb-8">
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block">Kilonuz (kg)</label>
              <Input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="h-14" placeholder="Örn: 70" />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block">Aktivite Seviyesi</label>
              <Select value={activity} onValueChange={setActivity}>
                <SelectTrigger className="h-14"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(activityMultipliers).map(([key, val]) => (
                    <SelectItem key={key} value={key}>{val.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={calculateWater} className="w-full h-14 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
            <Droplets className="mr-2" /> Hesapla
          </Button>

          {result && (
            <div className="mt-8 p-8 rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-200 text-center animate-in fade-in">
              <Droplets className="h-12 w-12 mx-auto text-cyan-600 mb-4" />
              <p className="text-sm font-semibold text-slate-600 mb-2">Günlük Su İhtiyacınız</p>
              <p className="text-6xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                {result.toFixed(1)}
              </p>
              <p className="text-slate-600 mt-2">litre/gün</p>
              <p className="text-sm text-slate-500 mt-4">≈ {Math.round(result * 4)} su bardağı</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
