"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Shuffle, Home, BookOpen, Lightbulb, AlertCircle, Info, BarChart3, Copy, RefreshCw } from "lucide-react"
import Link from "next/link"

const RandomNumberGenerator = () => {
  const [min, setMin] = useState("1")
  const [max, setMax] = useState("100")
  const [count, setCount] = useState("10")
  const [allowDuplicates, setAllowDuplicates] = useState(true)
  const [sort, setSort] = useState(false)
  const [numbers, setNumbers] = useState<number[]>([])
  const [stats, setStats] = useState<any>(null)

  const generate = () => {
    const minVal = parseInt(min)
    const maxVal = parseInt(max)
    const countVal = parseInt(count)
    
    if (isNaN(minVal) || isNaN(maxVal) || isNaN(countVal) || minVal >= maxVal || countVal < 1) return
    
    if (!allowDuplicates && countVal > (maxVal - minVal + 1)) {
      alert("Tekrarsız üretimde sayı adedi, aralıktaki toplam sayıdan fazla olamaz!")
      return
    }

    let generated: number[] = []
    
    if (allowDuplicates) {
      for (let i = 0; i < countVal; i++) {
        generated.push(Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal)
      }
    } else {
      const available = Array.from({ length: maxVal - minVal + 1 }, (_, i) => minVal + i)
      for (let i = 0; i < countVal; i++) {
        const index = Math.floor(Math.random() * available.length)
        generated.push(available.splice(index, 1)[0])
      }
    }

    if (sort) {
      generated.sort((a, b) => a - b)
    }

    // İstatistikler
    const sortedNums = [...generated].sort((a, b) => a - b)
    const mean = generated.reduce((sum, n) => sum + n, 0) / generated.length
    const median = sortedNums.length % 2 === 0
      ? (sortedNums[sortedNums.length / 2 - 1] + sortedNums[sortedNums.length / 2]) / 2
      : sortedNums[Math.floor(sortedNums.length / 2)]
    
    // Mod (en çok tekrar eden)
    const frequency: { [key: number]: number } = {}
    generated.forEach(n => frequency[n] = (frequency[n] || 0) + 1)
    const maxFreq = Math.max(...Object.values(frequency))
    const modes = Object.keys(frequency).filter(k => frequency[parseInt(k)] === maxFreq).map(Number)
    
    // Dağılım grafiği için histogram verisi
    const bins = 10
    const binSize = Math.ceil((maxVal - minVal + 1) / bins)
    const histogram: number[] = Array(bins).fill(0)
    generated.forEach(num => {
      const binIndex = Math.min(Math.floor((num - minVal) / binSize), bins - 1)
      histogram[binIndex]++
    })

    setNumbers(generated)
    setStats({
      min: Math.min(...generated),
      max: Math.max(...generated),
      mean: mean.toFixed(2),
      median: median.toFixed(2),
      mode: modes.length === generated.length ? "Yok" : modes.join(", "),
      range: Math.max(...generated) - Math.min(...generated),
      unique: new Set(generated).size,
      histogram,
      binSize,
      bins,
      minVal,
      maxVal
    })
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(numbers.join(", "))
    alert("Sayılar panoya kopyalandı!")
  }

  const quickPresets = [
    { label: "Zar (1-6)", min: 1, max: 6, count: 1 },
    { label: "Madeni Para", min: 0, max: 1, count: 1 },
    { label: "Loto", min: 1, max: 90, count: 6 },
    { label: "1-100", min: 1, max: 100, count: 10 }
  ]

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      <Link href="/" className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 font-medium transition-colors group">
        <Home className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
        <span>Ana Sayfaya Dön</span>
      </Link>

      <Card className="border-2 border-violet-100/50 shadow-xl">
        <CardContent className="pt-8 pb-8 px-6 sm:px-8">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg mb-4">
              <Shuffle className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Gelişmiş Rastgele Sayı Üretici
            </h2>
            <p className="text-slate-600">İstatistiksel analiz ve görselleştirme ile</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block">Minimum Değer</label>
              <Input type="number" value={min} onChange={(e) => setMin(e.target.value)} className="h-14" />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block">Maksimum Değer</label>
              <Input type="number" value={max} onChange={(e) => setMax(e.target.value)} className="h-14" />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block">Üretilecek Adet</label>
              <Input type="number" value={count} onChange={(e) => setCount(e.target.value)} className="h-14" />
            </div>
          </div>

          <div className="mb-6">
            <p className="text-sm font-semibold text-slate-700 mb-3">Hızlı Ayarlar</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {quickPresets.map((preset, i) => (
                <Button
                  key={i}
                  variant="outline"
                  onClick={() => {
                    setMin(preset.min.toString())
                    setMax(preset.max.toString())
                    setCount(preset.count.toString())
                  }}
                  className="h-12 border-2 border-violet-200 hover:bg-violet-50"
                >
                  {preset.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <label className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border-2 border-slate-200 cursor-pointer hover:bg-slate-100">
              <input type="checkbox" checked={allowDuplicates} onChange={(e) => setAllowDuplicates(e.target.checked)} className="w-5 h-5" />
              <span className="text-sm font-semibold text-slate-700">Tekrarlı sayılara izin ver</span>
            </label>
            <label className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border-2 border-slate-200 cursor-pointer hover:bg-slate-100">
              <input type="checkbox" checked={sort} onChange={(e) => setSort(e.target.checked)} className="w-5 h-5" />
              <span className="text-sm font-semibold text-slate-700">Üretilen sayıları sırala</span>
            </label>
          </div>

          <div className="flex gap-3 mb-8">
            <Button onClick={generate} className="flex-1 h-14 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700">
              <Shuffle className="mr-2" /> Sayıları Üret
            </Button>
            {numbers.length > 0 && (
              <>
                <Button onClick={generate} variant="outline" className="h-14 border-2 border-violet-200 hover:bg-violet-50">
                  <RefreshCw className="h-5 w-5" />
                </Button>
                <Button onClick={copyToClipboard} variant="outline" className="h-14 border-2 border-violet-200 hover:bg-violet-50">
                  <Copy className="h-5 w-5" />
                </Button>
              </>
            )}
          </div>

          {numbers.length > 0 && stats && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Üretilen Sayılar */}
              <Card className="border-2 border-violet-100/50">
                <CardContent className="pt-6 pb-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">Üretilen Sayılar ({numbers.length})</h3>
                  <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                    {numbers.map((num, i) => (
                      <div key={i} className="p-3 rounded-lg bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200 text-center font-bold text-violet-600">
                        {num}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* İstatistikler */}
              <div className="grid md:grid-cols-4 gap-4">
                <div className="p-5 rounded-xl bg-gradient-to-br from-violet-50 to-purple-50 border-2 border-violet-200 text-center">
                  <p className="text-xs text-slate-600 mb-2">Ortalama</p>
                  <p className="text-3xl font-bold text-violet-600">{stats.mean}</p>
                </div>
                <div className="p-5 rounded-xl bg-gradient-to-br from-purple-50 to-fuchsia-50 border-2 border-purple-200 text-center">
                  <p className="text-xs text-slate-600 mb-2">Ortanca</p>
                  <p className="text-3xl font-bold text-purple-600">{stats.median}</p>
                </div>
                <div className="p-5 rounded-xl bg-gradient-to-br from-fuchsia-50 to-pink-50 border-2 border-fuchsia-200 text-center">
                  <p className="text-xs text-slate-600 mb-2">Aralık</p>
                  <p className="text-3xl font-bold text-fuchsia-600">{stats.range}</p>
                </div>
                <div className="p-5 rounded-xl bg-gradient-to-br from-pink-50 to-rose-50 border-2 border-pink-200 text-center">
                  <p className="text-xs text-slate-600 mb-2">Benzersiz</p>
                  <p className="text-3xl font-bold text-pink-600">{stats.unique}</p>
                </div>
              </div>

              {/* Histogram */}
              <Card className="border-2 border-violet-100/50">
                <CardContent className="pt-6 pb-6">
                  <div className="flex items-center gap-3 mb-6">
                    <BarChart3 className="h-6 w-6 text-violet-600" />
                    <h3 className="text-lg font-bold text-slate-800">Dağılım Grafiği</h3>
                  </div>
                  <div className="space-y-3">
                    {stats.histogram.map((freq: number, i: number) => {
                      const rangeStart = stats.minVal + i * stats.binSize
                      const rangeEnd = Math.min(rangeStart + stats.binSize - 1, stats.maxVal)
                      const percentage = (freq / numbers.length) * 100
                      return (
                        <div key={i} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="font-semibold text-slate-700">{rangeStart} - {rangeEnd}</span>
                            <span className="text-slate-600">{freq} sayı ({percentage.toFixed(1)}%)</span>
                          </div>
                          <div className="h-10 bg-slate-100 rounded-lg overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-violet-500 to-purple-600 flex items-center justify-end pr-3 transition-all duration-700"
                              style={{ width: `${Math.max(percentage, 2)}%` }}
                            >
                              {freq > 0 && <span className="text-xs font-semibold text-white">{freq}</span>}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Ek İstatistikler */}
              <Card className="border-2 border-purple-100/50">
                <CardContent className="pt-6 pb-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">Ek İstatistikler</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-slate-50">
                      <p className="text-sm text-slate-600 mb-1">En Küçük</p>
                      <p className="text-2xl font-bold text-violet-600">{stats.min}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-slate-50">
                      <p className="text-sm text-slate-600 mb-1">En Büyük</p>
                      <p className="text-2xl font-bold text-purple-600">{stats.max}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-slate-50 md:col-span-2">
                      <p className="text-sm text-slate-600 mb-1">Mod (En Sık Tekrar Eden)</p>
                      <p className="text-2xl font-bold text-fuchsia-600">{stats.mode}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Nasıl Kullanılır, Örnekler, Önemli Bilgiler, İlginç Bilgiler */}
      <Card className="border-2 border-violet-100/30 shadow-lg">
        <CardContent className="pt-6 pb-6 px-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-violet-50">
              <BookOpen className="h-6 w-6 text-violet-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Nasıl Kullanılır?</h3>
              <ol className="space-y-3 text-slate-600">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center text-sm font-semibold">1</span>
                  <span><strong>Aralık Belirleyin:</strong> Min ve max değerleri girin (örn: 1-100).</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center text-sm font-semibold">2</span>
                  <span><strong>Adet Seçin:</strong> Kaç sayı üretmek istediğinizi belirtin.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center text-sm font-semibold">3</span>
                  <span><strong>Seçenekler:</strong> Tekrarlı/tekrarsız ve sıralama tercihlerinizi yapın.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center text-sm font-semibold">4</span>
                  <span><strong>Analiz Edin:</strong> İstatistikler ve dağılım grafiğini inceleyin.</span>
                </li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 border-violet-100/30 shadow-lg">
        <CardContent className="pt-6 pb-6 px-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-xl bg-violet-50">
              <Lightbulb className="h-6 w-6 text-violet-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-800 mb-2">Örnek Kullanımlar</h3>
              <p className="text-slate-600">Rastgele sayı üretmenin pratik uygulamaları</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200">
              <h4 className="font-bold text-slate-800 mb-2">🎲 Oyun Zarı</h4>
              <p className="text-sm text-slate-600 mb-2">1-6 arası rastgele sayı</p>
              <p className="text-xs text-slate-500">Masa oyunları, şans oyunları</p>
            </div>
            <div className="p-5 rounded-xl bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200">
              <h4 className="font-bold text-slate-800 mb-2">🎟️ Loto Numaraları</h4>
              <p className="text-sm text-slate-600 mb-2">1-90 arası 6 tekrarsız sayı</p>
              <p className="text-xs text-slate-500">Şans oyunları, çekiliş</p>
            </div>
            <div className="p-5 rounded-xl bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200">
              <h4 className="font-bold text-slate-800 mb-2">🔐 Şifre Üretimi</h4>
              <p className="text-sm text-slate-600 mb-2">33-126 ASCII karakterleri</p>
              <p className="text-xs text-slate-500">Güvenli parola oluşturma</p>
            </div>
            <div className="p-5 rounded-xl bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200">
              <h4 className="font-bold text-slate-800 mb-2">📊 Örnekleme</h4>
              <p className="text-sm text-slate-600 mb-2">Veri kümesinden random seçim</p>
              <p className="text-xs text-slate-500">İstatistik, anket, A/B test</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 border-violet-100/30 shadow-lg">
        <CardContent className="pt-6 pb-6 px-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-xl bg-rose-50">
              <AlertCircle className="h-6 w-6 text-rose-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-800 mb-2">Önemli Bilgiler</h3>
              <p className="text-slate-600">Rastgele sayı üretimi hakkında temel bilgiler</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-slate-50 border-l-4 border-violet-500">
              <h4 className="font-semibold text-slate-800 mb-2">🎲 Pseudo-Random</h4>
              <p className="text-sm text-slate-600">
                JavaScript'in Math.random() fonksiyonu "pseudo-random" (sahte-rastgele) sayı üretir.
                Algoritmik olarak tahmin edilebilir, gerçek rastgelelik değil.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border-l-4 border-violet-500">
              <h4 className="font-semibold text-slate-800 mb-2">🔒 Kriptografik Güvenlik</h4>
              <p className="text-sm text-slate-600">
                Güvenlik-kritik uygulamalar için crypto.getRandomValues() kullanılmalı.
                Şifre, token, anahtar üretiminde Math.random() yeterli değildir.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border-l-4 border-violet-500">
              <h4 className="font-semibold text-slate-800 mb-2">📊 Dağılım (Distribution)</h4>
              <p className="text-sm text-slate-600">
                Bu araç uniform (düzgün) dağılım kullanır - her sayının eşit olasılığı vardır.
                Normal dağılım, Poisson dağılımı gibi alternatifler de mevcuttur.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border-l-4 border-violet-500">
              <h4 className="font-semibold text-slate-800 mb-2">🎯 Seed (Tohum) Değeri</h4>
              <p className="text-sm text-slate-600">
                Math.random() tohum değeri kullanmaz, her çalışma farklı sonuç verir.
                Tekrarlanabilir rastgelelik için seed-based RNG gerekir (örn: Mersenne Twister).
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 border-violet-100/30 shadow-lg">
        <CardContent className="pt-6 pb-6 px-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-xl bg-blue-50">
              <Info className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-800 mb-2">Bilmeniz İlginç Olabilecek Şeyler</h3>
              <p className="text-slate-600">Rastgelelik ve olasılık hakkında ilginç gerçekler</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <span className="text-2xl">🎰</span>
                Monte Carlo Yöntemi
              </h4>
              <p className="text-sm text-slate-600">
                Rastgele sayılarla Pi sayısı hesaplanabilir! Milyon nokta atıp daire içinde kalanları sayarak
                π ≈ 4 × (daire içi / toplam) formülü kullanılır.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <span className="text-2xl">💾</span>
                RAND Corporation
              </h4>
              <p className="text-sm text-slate-600">
                1955'te yayınlanan "A Million Random Digits" kitabı hala kullanılır!
                Elektronik gürültü kullanarak gerçek rastgele sayılar üretildi.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <span className="text-2xl">🎲</span>
                Doğum Günü Paradoksu
              </h4>
              <p className="text-sm text-slate-600">
                23 kişilik bir grupta 2 kişinin aynı doğum gününe sahip olma olasılığı %50'den fazla!
                60 kişide bu oran %99'a çıkar.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <span className="text-2xl">🌡️</span>
                Termal Gürültü
              </h4>
              <p className="text-sm text-slate-600">
                Random.org gibi siteler atmosferik gürültü kullanır.
                Lavarand ise lav lambasının görüntüsünden gerçek rastgele sayı üretir!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export { RandomNumberGenerator }
