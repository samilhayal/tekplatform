"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Palette, Copy, Check, Shuffle } from "lucide-react"

export function ColorPaletteGenerator() {
  const [baseColor, setBaseColor] = useState("#3b82f6")
  const [palette, setPalette] = useState<string[]>([])
  const [copied, setCopied] = useState("")

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  }

  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + [r, g, b].map(x => {
      const hex = Math.round(x).toString(16)
      return hex.length === 1 ? "0" + hex : hex
    }).join('')
  }

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255
    const max = Math.max(r, g, b), min = Math.min(r, g, b)
    let h = 0, s = 0, l = (max + min) / 2

    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
        case g: h = ((b - r) / d + 2) / 6; break
        case b: h = ((r - g) / d + 4) / 6; break
      }
    }
    return { h: h * 360, s: s * 100, l: l * 100 }
  }

  const hslToRgb = (h: number, s: number, l: number) => {
    h /= 360; s /= 100; l /= 100
    let r, g, b

    if (s === 0) {
      r = g = b = l
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1
        if (t > 1) t -= 1
        if (t < 1/6) return p + (q - p) * 6 * t
        if (t < 1/2) return q
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
        return p
      }
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s
      const p = 2 * l - q
      r = hue2rgb(p, q, h + 1/3)
      g = hue2rgb(p, q, h)
      b = hue2rgb(p, q, h - 1/3)
    }
    return { r: r * 255, g: g * 255, b: b * 255 }
  }

  const generatePalette = () => {
    const rgb = hexToRgb(baseColor)
    if (!rgb) return

    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
    const colors: string[] = []

    // Monochromatic
    for (let i = 0; i < 5; i++) {
      const lightness = 20 + (i * 15)
      const { r, g, b } = hslToRgb(hsl.h, hsl.s, lightness)
      colors.push(rgbToHex(r, g, b))
    }

    // Analogous
    for (let i = -30; i <= 30; i += 15) {
      const { r, g, b } = hslToRgb((hsl.h + i + 360) % 360, hsl.s, hsl.l)
      colors.push(rgbToHex(r, g, b))
    }

    // Complementary
    const { r: cr, g: cg, b: cb } = hslToRgb((hsl.h + 180) % 360, hsl.s, hsl.l)
    colors.push(rgbToHex(cr, cg, cb))

    setPalette(colors)
  }

  const randomColor = () => {
    const random = "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')
    setBaseColor(random)
  }

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color)
    setCopied(color)
    setTimeout(() => setCopied(""), 2000)
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Card className="border-2 border-rose-100/50 shadow-xl">
        <CardContent className="pt-8 pb-8 px-6 sm:px-8">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 shadow-lg mb-4">
              <Palette className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Renk Paleti Oluşturucu
            </h2>
            <p className="text-slate-600">HEX, RGB, HSL renk paletleri</p>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-sm font-semibold text-slate-700 mb-2 block">Ana Renk</label>
                <div className="flex gap-3">
                  <input type="color" value={baseColor} onChange={(e) => setBaseColor(e.target.value)}
                    className="w-16 h-14 rounded-lg cursor-pointer border-2 border-slate-200" />
                  <Input value={baseColor} onChange={(e) => setBaseColor(e.target.value)}
                    className="h-14 font-mono uppercase" />
                </div>
              </div>
              <div className="pt-7">
                <Button onClick={randomColor} variant="outline" className="h-14">
                  <Shuffle className="mr-2" /> Rastgele
                </Button>
              </div>
            </div>

            <Button onClick={generatePalette} className="w-full h-14 bg-gradient-to-r from-rose-500 to-pink-600">
              <Palette className="mr-2" /> Palet Oluştur
            </Button>

            {palette.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-700">Oluşturulan Palet</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {palette.map((color, i) => (
                    <div key={i} className="group cursor-pointer" onClick={() => copyToClipboard(color)}>
                      <div className="h-24 rounded-lg border-2 border-slate-200 shadow-md transition group-hover:scale-105"
                        style={{ backgroundColor: color }} />
                      <div className="mt-2 text-center">
                        <code className="text-xs font-mono text-slate-600">{color}</code>
                        {copied === color && <Check className="h-3 w-3 inline ml-1 text-green-600" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
