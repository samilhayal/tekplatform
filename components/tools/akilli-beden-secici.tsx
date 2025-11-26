"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Ruler, User, Shirt, Info, ChevronRight } from "lucide-react"

interface SizeChart {
  [size: string]: {
    chest: [number, number]
    waist: [number, number]
    hip: [number, number]
    height?: [number, number]
  }
}

interface BrandSizes {
  name: string
  country: string
  sizeChart: SizeChart
  notes?: string
}

// Marka beden tabloları - erkek giyim
const mensBrands: BrandSizes[] = [
  {
    name: "Zara",
    country: "İspanya",
    sizeChart: {
      "XS": { chest: [84, 87], waist: [72, 75], hip: [88, 91] },
      "S": { chest: [88, 91], waist: [76, 79], hip: [92, 95] },
      "M": { chest: [92, 95], waist: [80, 83], hip: [96, 99] },
      "L": { chest: [96, 99], waist: [84, 87], hip: [100, 103] },
      "XL": { chest: [100, 103], waist: [88, 91], hip: [104, 107] },
      "XXL": { chest: [104, 107], waist: [92, 95], hip: [108, 111] }
    },
    notes: "Zara genellikle dar kesim kullanır"
  },
  {
    name: "H&M",
    country: "İsveç",
    sizeChart: {
      "XS": { chest: [82, 85], waist: [70, 73], hip: [86, 89] },
      "S": { chest: [86, 89], waist: [74, 77], hip: [90, 93] },
      "M": { chest: [90, 93], waist: [78, 81], hip: [94, 97] },
      "L": { chest: [94, 97], waist: [82, 85], hip: [98, 101] },
      "XL": { chest: [98, 101], waist: [86, 89], hip: [102, 105] },
      "XXL": { chest: [102, 105], waist: [90, 93], hip: [106, 109] }
    },
    notes: "H&M standart kesim kullanır"
  },
  {
    name: "Mavi",
    country: "Türkiye",
    sizeChart: {
      "S": { chest: [88, 92], waist: [76, 80], hip: [92, 96] },
      "M": { chest: [93, 97], waist: [81, 85], hip: [97, 101] },
      "L": { chest: [98, 102], waist: [86, 90], hip: [102, 106] },
      "XL": { chest: [103, 107], waist: [91, 95], hip: [107, 111] },
      "XXL": { chest: [108, 112], waist: [96, 100], hip: [112, 116] }
    },
    notes: "Mavi Türk bedenleri kullanır, biraz geniş kalıp"
  },
  {
    name: "LC Waikiki",
    country: "Türkiye",
    sizeChart: {
      "S": { chest: [86, 90], waist: [74, 78], hip: [90, 94] },
      "M": { chest: [91, 95], waist: [79, 83], hip: [95, 99] },
      "L": { chest: [96, 100], waist: [84, 88], hip: [100, 104] },
      "XL": { chest: [101, 105], waist: [89, 93], hip: [105, 109] },
      "XXL": { chest: [106, 110], waist: [94, 98], hip: [110, 114] },
      "3XL": { chest: [111, 115], waist: [99, 103], hip: [115, 119] }
    }
  },
  {
    name: "Tommy Hilfiger",
    country: "ABD",
    sizeChart: {
      "S": { chest: [89, 94], waist: [76, 81], hip: [92, 97] },
      "M": { chest: [95, 100], waist: [82, 87], hip: [98, 103] },
      "L": { chest: [101, 106], waist: [88, 93], hip: [104, 109] },
      "XL": { chest: [107, 112], waist: [94, 99], hip: [110, 115] },
      "XXL": { chest: [113, 118], waist: [100, 105], hip: [116, 121] }
    },
    notes: "Amerikan bedenleri genellikle Avrupa'dan büyük gelir"
  },
  {
    name: "Koton",
    country: "Türkiye",
    sizeChart: {
      "S": { chest: [87, 91], waist: [75, 79], hip: [91, 95] },
      "M": { chest: [92, 96], waist: [80, 84], hip: [96, 100] },
      "L": { chest: [97, 101], waist: [85, 89], hip: [101, 105] },
      "XL": { chest: [102, 106], waist: [90, 94], hip: [106, 110] },
      "XXL": { chest: [107, 111], waist: [95, 99], hip: [111, 115] }
    }
  }
]

// Marka beden tabloları - kadın giyim
const womensBrands: BrandSizes[] = [
  {
    name: "Zara",
    country: "İspanya",
    sizeChart: {
      "XS": { chest: [80, 83], waist: [60, 63], hip: [86, 89] },
      "S": { chest: [84, 87], waist: [64, 67], hip: [90, 93] },
      "M": { chest: [88, 91], waist: [68, 71], hip: [94, 97] },
      "L": { chest: [92, 95], waist: [72, 75], hip: [98, 101] },
      "XL": { chest: [96, 99], waist: [76, 79], hip: [102, 105] },
      "XXL": { chest: [100, 103], waist: [80, 83], hip: [106, 109] }
    },
    notes: "Zara kadın giyim dar kesimdir"
  },
  {
    name: "H&M",
    country: "İsveç",
    sizeChart: {
      "32/XXS": { chest: [76, 79], waist: [56, 59], hip: [82, 85] },
      "34/XS": { chest: [80, 83], waist: [60, 63], hip: [86, 89] },
      "36/S": { chest: [84, 87], waist: [64, 67], hip: [90, 93] },
      "38/M": { chest: [88, 91], waist: [68, 71], hip: [94, 97] },
      "40/L": { chest: [92, 95], waist: [72, 75], hip: [98, 101] },
      "42/XL": { chest: [96, 99], waist: [76, 79], hip: [102, 105] },
      "44/XXL": { chest: [100, 103], waist: [80, 83], hip: [106, 109] }
    }
  },
  {
    name: "Mavi",
    country: "Türkiye",
    sizeChart: {
      "XS": { chest: [82, 85], waist: [62, 65], hip: [88, 91] },
      "S": { chest: [86, 89], waist: [66, 69], hip: [92, 95] },
      "M": { chest: [90, 93], waist: [70, 73], hip: [96, 99] },
      "L": { chest: [94, 97], waist: [74, 77], hip: [100, 103] },
      "XL": { chest: [98, 101], waist: [78, 81], hip: [104, 107] }
    }
  },
  {
    name: "LC Waikiki",
    country: "Türkiye",
    sizeChart: {
      "34/XS": { chest: [80, 84], waist: [60, 64], hip: [86, 90] },
      "36/S": { chest: [85, 89], waist: [65, 69], hip: [91, 95] },
      "38/M": { chest: [90, 94], waist: [70, 74], hip: [96, 100] },
      "40/L": { chest: [95, 99], waist: [75, 79], hip: [101, 105] },
      "42/XL": { chest: [100, 104], waist: [80, 84], hip: [106, 110] },
      "44/XXL": { chest: [105, 109], waist: [85, 89], hip: [111, 115] }
    }
  },
  {
    name: "Koton",
    country: "Türkiye",
    sizeChart: {
      "34/XS": { chest: [79, 82], waist: [59, 62], hip: [85, 88] },
      "36/S": { chest: [83, 86], waist: [63, 66], hip: [89, 92] },
      "38/M": { chest: [87, 90], waist: [67, 70], hip: [93, 96] },
      "40/L": { chest: [91, 94], waist: [71, 74], hip: [97, 100] },
      "42/XL": { chest: [95, 98], waist: [75, 78], hip: [101, 104] },
      "44/XXL": { chest: [99, 102], waist: [79, 82], hip: [105, 108] }
    }
  },
  {
    name: "Tommy Hilfiger",
    country: "ABD",
    sizeChart: {
      "XS": { chest: [83, 86], waist: [63, 66], hip: [89, 92] },
      "S": { chest: [87, 90], waist: [67, 70], hip: [93, 96] },
      "M": { chest: [91, 94], waist: [71, 74], hip: [97, 100] },
      "L": { chest: [95, 98], waist: [75, 78], hip: [101, 104] },
      "XL": { chest: [99, 102], waist: [79, 82], hip: [105, 108] }
    },
    notes: "Amerikan bedenleri genellikle Avrupa'dan büyük gelir"
  }
]

export function AkillBedenSecici() {
  const [gender, setGender] = useState<"men" | "women">("men")
  const [chest, setChest] = useState("")
  const [waist, setWaist] = useState("")
  const [hip, setHip] = useState("")
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [selectedBrand, setSelectedBrand] = useState<string>("all")
  const [showResult, setShowResult] = useState(false)

  const brands = gender === "men" ? mensBrands : womensBrands

  const findSize = (brand: BrandSizes, chestCm: number, waistCm: number, hipCm: number) => {
    const sizes = Object.entries(brand.sizeChart)
    let bestMatch = { size: "", score: 0, fits: { chest: false, waist: false, hip: false } }

    for (const [size, measurements] of sizes) {
      let score = 0
      const fits = { chest: false, waist: false, hip: false }

      // Göğüs kontrolü
      if (chestCm >= measurements.chest[0] && chestCm <= measurements.chest[1]) {
        score += 3
        fits.chest = true
      } else if (chestCm >= measurements.chest[0] - 2 && chestCm <= measurements.chest[1] + 2) {
        score += 1
      }

      // Bel kontrolü
      if (waistCm >= measurements.waist[0] && waistCm <= measurements.waist[1]) {
        score += 3
        fits.waist = true
      } else if (waistCm >= measurements.waist[0] - 2 && waistCm <= measurements.waist[1] + 2) {
        score += 1
      }

      // Kalça kontrolü
      if (hipCm >= measurements.hip[0] && hipCm <= measurements.hip[1]) {
        score += 3
        fits.hip = true
      } else if (hipCm >= measurements.hip[0] - 2 && hipCm <= measurements.hip[1] + 2) {
        score += 1
      }

      if (score > bestMatch.score) {
        bestMatch = { size, score, fits }
      }
    }

    return bestMatch
  }

  const results = useMemo(() => {
    if (!chest || !waist || !hip) return []

    const chestCm = parseFloat(chest)
    const waistCm = parseFloat(waist)
    const hipCm = parseFloat(hip)

    if (isNaN(chestCm) || isNaN(waistCm) || isNaN(hipCm)) return []

    const brandsToCheck = selectedBrand === "all" 
      ? brands 
      : brands.filter(b => b.name === selectedBrand)

    return brandsToCheck.map(brand => ({
      brand,
      ...findSize(brand, chestCm, waistCm, hipCm)
    })).filter(r => r.score > 0).sort((a, b) => b.score - a.score)
  }, [chest, waist, hip, selectedBrand, brands])

  const handleCalculate = () => {
    if (chest && waist && hip) {
      setShowResult(true)
    }
  }

  const getFitLabel = (score: number) => {
    if (score >= 9) return { label: "Mükemmel Uyum", color: "bg-green-500" }
    if (score >= 6) return { label: "İyi Uyum", color: "bg-blue-500" }
    if (score >= 3) return { label: "Kabul Edilebilir", color: "bg-yellow-500" }
    return { label: "Yaklaşık Uyum", color: "bg-orange-500" }
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Nasıl Ölçüm Yapılır */}
      <Card className="border-2 border-blue-200 bg-blue-50/50">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg text-blue-700">
            <Info className="h-5 w-5" />
            Nasıl Ölçüm Yapılır?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-blue-800">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-start gap-2">
              <span className="font-bold text-blue-600">1.</span>
              <div>
                <strong>Göğüs:</strong> Mezura ile göğsün en geniş noktasından, koltuk altlarının hizasından ölçün.
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-blue-600">2.</span>
              <div>
                <strong>Bel:</strong> Belin en ince yerinden, göbek deliğinin hemen üstünden ölçün.
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-blue-600">3.</span>
              <div>
                <strong>Kalça:</strong> Kalçanın en geniş noktasından, yere paralel şekilde ölçün.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Giriş Formu */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Ruler className="h-5 w-5" />
            Vücut Ölçüleriniz
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Cinsiyet Seçimi */}
          <div className="flex gap-4">
            <Button
              variant={gender === "men" ? "default" : "outline"}
              onClick={() => { setGender("men"); setShowResult(false); }}
              className="flex-1"
            >
              <User className="h-4 w-4 mr-2" />
              Erkek
            </Button>
            <Button
              variant={gender === "women" ? "default" : "outline"}
              onClick={() => { setGender("women"); setShowResult(false); }}
              className="flex-1"
            >
              <User className="h-4 w-4 mr-2" />
              Kadın
            </Button>
          </div>

          {/* Ölçüler */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="chest">Göğüs Çevresi (cm)</Label>
              <Input
                id="chest"
                type="number"
                placeholder="Örn: 96"
                value={chest}
                onChange={(e) => { setChest(e.target.value); setShowResult(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="waist">Bel Çevresi (cm)</Label>
              <Input
                id="waist"
                type="number"
                placeholder="Örn: 82"
                value={waist}
                onChange={(e) => { setWaist(e.target.value); setShowResult(false); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hip">Kalça Çevresi (cm)</Label>
              <Input
                id="hip"
                type="number"
                placeholder="Örn: 98"
                value={hip}
                onChange={(e) => { setHip(e.target.value); setShowResult(false); }}
              />
            </div>
          </div>

          {/* Opsiyonel bilgiler */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="height">Boy (cm) - Opsiyonel</Label>
              <Input
                id="height"
                type="number"
                placeholder="Örn: 175"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Kilo (kg) - Opsiyonel</Label>
              <Input
                id="weight"
                type="number"
                placeholder="Örn: 75"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
          </div>

          {/* Marka Seçimi */}
          <div className="space-y-2">
            <Label>Marka Filtresi</Label>
            <Select value={selectedBrand} onValueChange={(v) => { setSelectedBrand(v); setShowResult(false); }}>
              <SelectTrigger>
                <SelectValue placeholder="Marka seçin (opsiyonel)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Markalar</SelectItem>
                {brands.map(brand => (
                  <SelectItem key={brand.name} value={brand.name}>
                    {brand.name} ({brand.country})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={handleCalculate}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
            disabled={!chest || !waist || !hip}
          >
            <Shirt className="h-4 w-4 mr-2" />
            Beden Öner
          </Button>
        </CardContent>
      </Card>

      {/* Sonuçlar */}
      {showResult && results.length > 0 && (
        <Card className="border-2 border-purple-200">
          <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
            <CardTitle className="flex items-center gap-2">
              <Shirt className="h-5 w-5 text-purple-600" />
              Önerilen Bedenler
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-4">
              {results.map((result, index) => {
                const fit = getFitLabel(result.score)
                return (
                  <div 
                    key={result.brand.name}
                    className="flex items-center justify-between p-4 rounded-xl bg-white border-2 hover:border-purple-300 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-lg">{result.brand.name}</span>
                        <span className="text-sm text-slate-500">{result.brand.country}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600">{result.size}</div>
                        <Badge className={`${fit.color} text-white`}>{fit.label}</Badge>
                      </div>
                      <div className="hidden md:flex gap-2 text-sm">
                        <span className={result.fits.chest ? "text-green-600" : "text-orange-500"}>
                          Göğüs {result.fits.chest ? "✓" : "~"}
                        </span>
                        <span className={result.fits.waist ? "text-green-600" : "text-orange-500"}>
                          Bel {result.fits.waist ? "✓" : "~"}
                        </span>
                        <span className={result.fits.hip ? "text-green-600" : "text-orange-500"}>
                          Kalça {result.fits.hip ? "✓" : "~"}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Notlar */}
            {results.some(r => r.brand.notes) && (
              <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <h4 className="font-semibold text-amber-700 mb-2">Marka Notları:</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-amber-800">
                  {results.filter(r => r.brand.notes).map(r => (
                    <li key={r.brand.name}><strong>{r.brand.name}:</strong> {r.brand.notes}</li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Sonuç yok mesajı */}
      {showResult && results.length === 0 && (
        <Card className="border-2 border-red-200 bg-red-50">
          <CardContent className="pt-6 text-center">
            <p className="text-red-700">Girilen ölçülere uygun beden bulunamadı. Lütfen ölçülerinizi kontrol edin.</p>
          </CardContent>
        </Card>
      )}

      {/* Beden Karşılaştırma Tablosu */}
      <Card>
        <CardHeader>
          <CardTitle>Uluslararası Beden Karşılaştırması</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="men">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="men">Erkek</TabsTrigger>
              <TabsTrigger value="women">Kadın</TabsTrigger>
            </TabsList>
            
            <TabsContent value="men">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 bg-slate-50">
                      <th className="p-3 text-left">Türkiye</th>
                      <th className="p-3 text-left">AB</th>
                      <th className="p-3 text-left">ABD/UK</th>
                      <th className="p-3 text-left">Göğüs (cm)</th>
                      <th className="p-3 text-left">Bel (cm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-slate-50"><td className="p-3">S</td><td className="p-3">44-46</td><td className="p-3">34-36</td><td className="p-3">88-92</td><td className="p-3">76-80</td></tr>
                    <tr className="border-b hover:bg-slate-50"><td className="p-3">M</td><td className="p-3">48-50</td><td className="p-3">38-40</td><td className="p-3">93-97</td><td className="p-3">81-85</td></tr>
                    <tr className="border-b hover:bg-slate-50"><td className="p-3">L</td><td className="p-3">52-54</td><td className="p-3">42-44</td><td className="p-3">98-102</td><td className="p-3">86-90</td></tr>
                    <tr className="border-b hover:bg-slate-50"><td className="p-3">XL</td><td className="p-3">56-58</td><td className="p-3">46-48</td><td className="p-3">103-107</td><td className="p-3">91-95</td></tr>
                    <tr className="border-b hover:bg-slate-50"><td className="p-3">XXL</td><td className="p-3">60-62</td><td className="p-3">50-52</td><td className="p-3">108-112</td><td className="p-3">96-100</td></tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="women">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 bg-slate-50">
                      <th className="p-3 text-left">Türkiye</th>
                      <th className="p-3 text-left">AB</th>
                      <th className="p-3 text-left">ABD</th>
                      <th className="p-3 text-left">UK</th>
                      <th className="p-3 text-left">Göğüs (cm)</th>
                      <th className="p-3 text-left">Bel (cm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-slate-50"><td className="p-3">34/XS</td><td className="p-3">34</td><td className="p-3">2-4</td><td className="p-3">6-8</td><td className="p-3">80-84</td><td className="p-3">60-64</td></tr>
                    <tr className="border-b hover:bg-slate-50"><td className="p-3">36/S</td><td className="p-3">36</td><td className="p-3">4-6</td><td className="p-3">8-10</td><td className="p-3">85-89</td><td className="p-3">65-69</td></tr>
                    <tr className="border-b hover:bg-slate-50"><td className="p-3">38/M</td><td className="p-3">38</td><td className="p-3">6-8</td><td className="p-3">10-12</td><td className="p-3">90-94</td><td className="p-3">70-74</td></tr>
                    <tr className="border-b hover:bg-slate-50"><td className="p-3">40/L</td><td className="p-3">40</td><td className="p-3">8-10</td><td className="p-3">12-14</td><td className="p-3">95-99</td><td className="p-3">75-79</td></tr>
                    <tr className="border-b hover:bg-slate-50"><td className="p-3">42/XL</td><td className="p-3">42</td><td className="p-3">10-12</td><td className="p-3">14-16</td><td className="p-3">100-104</td><td className="p-3">80-84</td></tr>
                    <tr className="border-b hover:bg-slate-50"><td className="p-3">44/XXL</td><td className="p-3">44</td><td className="p-3">12-14</td><td className="p-3">16-18</td><td className="p-3">105-109</td><td className="p-3">85-89</td></tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Uyarı */}
      <div className="text-center text-sm text-slate-500 p-4 bg-slate-50 rounded-lg">
        <p>
          <strong>Not:</strong> Beden ölçüleri markadan markaya farklılık gösterebilir. 
          Kesin bilgi için mağazanın kendi beden tablosunu kontrol etmenizi öneririz.
        </p>
      </div>
    </div>
  )
}
