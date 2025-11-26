"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Palette, Copy, Check } from "lucide-react"

export function CSSGradientGenerator() {
  const [type, setType] = useState<"linear" | "radial">("linear")
  const [angle, setAngle] = useState(90)
  const [color1, setColor1] = useState("#667eea")
  const [color2, setColor2] = useState("#764ba2")
  const [copied, setCopied] = useState(false)

  const gradientCSS = type === "linear" 
    ? `background: linear-gradient(${angle}deg, ${color1}, ${color2});`
    : `background: radial-gradient(circle, ${color1}, ${color2});`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(gradientCSS)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const presets = [
    { name: "Sunset", c1: "#ff6b6b", c2: "#feca57" },
    { name: "Ocean", c1: "#667eea", c2: "#764ba2" },
    { name: "Forest", c1: "#11998e", c2: "#38ef7d" },
    { name: "Fire", c1: "#f953c6", c2: "#b91d73" },
    { name: "Sky", c1: "#4facfe", c2: "#00f2fe" },
    { name: "Purple", c1: "#a8edea", c2: "#fed6e3" },
  ]

  return (
    <div className="w-full max-w-5xl mx-auto">
      <Card className="border-2 border-pink-100/50 shadow-xl">
        <CardContent className="pt-8 pb-8 px-6 sm:px-8">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 shadow-lg mb-4">
              <Palette className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
              CSS Gradient Oluşturucu
            </h2>
            <p className="text-slate-600">Modern gradient tasarımları</p>
          </div>

          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <Button onClick={() => setType("linear")} variant={type === "linear" ? "default" : "outline"} className="h-12">
                Linear Gradient
              </Button>
              <Button onClick={() => setType("radial")} variant={type === "radial" ? "default" : "outline"} className="h-12">
                Radial Gradient
              </Button>
            </div>

            {type === "linear" && (
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-2 block">Açı: {angle}°</label>
                <input type="range" min="0" max="360" value={angle} onChange={(e) => setAngle(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-pink-600" />
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-2 block">Renk 1</label>
                <div className="flex gap-3">
                  <input type="color" value={color1} onChange={(e) => setColor1(e.target.value)}
                    className="w-16 h-14 rounded-lg cursor-pointer border-2 border-slate-200" />
                  <input type="text" value={color1} onChange={(e) => setColor1(e.target.value)}
                    className="flex-1 h-14 px-4 rounded-lg border-2 border-slate-200 font-mono" />
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-2 block">Renk 2</label>
                <div className="flex gap-3">
                  <input type="color" value={color2} onChange={(e) => setColor2(e.target.value)}
                    className="w-16 h-14 rounded-lg cursor-pointer border-2 border-slate-200" />
                  <input type="text" value={color2} onChange={(e) => setColor2(e.target.value)}
                    className="flex-1 h-14 px-4 rounded-lg border-2 border-slate-200 font-mono" />
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-700 mb-3">Hazır Paletler</p>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {presets.map(preset => (
                  <button key={preset.name} onClick={() => { setColor1(preset.c1); setColor2(preset.c2) }}
                    className="h-12 rounded-lg border-2 border-slate-200 hover:scale-105 transition"
                    style={{ background: `linear-gradient(135deg, ${preset.c1}, ${preset.c2})` }}
                    title={preset.name} />
                ))}
              </div>
            </div>

            <div className="h-64 rounded-2xl border-2 border-slate-200 shadow-lg"
              style={{ background: type === "linear" ? `linear-gradient(${angle}deg, ${color1}, ${color2})` : `radial-gradient(circle, ${color1}, ${color2})` }} />

            <div className="p-6 rounded-xl bg-slate-50 border-2 border-slate-200">
              <div className="flex justify-between items-start mb-2">
                <code className="text-sm font-mono text-slate-700">{gradientCSS}</code>
                <Button onClick={copyToClipboard} variant="ghost" size="sm">
                  {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
