"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { BarChart3, Home, BookOpen, Lightbulb, AlertCircle, Info, Plus, Trash2, TrendingUp } from "lucide-react"
import Link from "next/link"

const StandardDeviationCalculator = () => {
  const [values, setValues] = useState<string[]>([""])
  const [result, setResult] = useState<any>(null)

  const addValue = () => setValues([...values, ""])
  const removeValue = (index: number) => setValues(values.filter((_, i) => i !== index))
  const updateValue = (index: number, value: string) => {
    const newVals = [...values]
    newVals[index] = value
    setValues(newVals)
  }

  const calculate = () => {
    const nums = values.map(v => parseFloat(v)).filter(n => !isNaN(n))
    if (nums.length < 2) return

    const sortedNums = [...nums].sort((a, b) => a - b)
    const mean = nums.reduce((sum, v) => sum + v, 0) / nums.length
    const variance = nums.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / nums.length
    const stdDev = Math.sqrt(variance)
    const sampleVariance = nums.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / (nums.length - 1)
    const sampleStdDev = Math.sqrt(sampleVariance)

    // Median
    const median = sortedNums.length % 2 === 0
      ? (sortedNums[sortedNums.length / 2 - 1] + sortedNums[sortedNums.length / 2]) / 2
      : sortedNums[Math.floor(sortedNums.length / 2)]

    // Quartiles
    const q1Index = Math.floor(sortedNums.length * 0.25)
    const q3Index = Math.floor(sortedNums.length * 0.75)
    const q1 = sortedNums[q1Index]
    const q3 = sortedNums[q3Index]
    const iqr = q3 - q1

    // Range
    const range = sortedNums[sortedNums.length - 1] - sortedNums[0]

    // Coefficient of Variation
    const cv = (stdDev / mean) * 100

    // Outliers (1.5 * IQR kuralı)
    const lowerBound = q1 - 1.5 * iqr
    const upperBound = q3 + 1.5 * iqr
    const outliers = nums.filter(v => v < lowerBound || v > upperBound)

    // Z-scores
    const zScores = nums.map(v => (v - mean) / stdDev)

    // Bell curve data points
    const bellCurvePoints = []
    const step = stdDev / 10
    for (let x = mean - 3 * stdDev; x <= mean + 3 * stdDev; x += step) {
      const y = (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mean) / stdDev, 2))
      bellCurvePoints.push({ x, y })
    }

    setResult({
      nums,
      sortedNums,
      mean,
      median,
      variance,
      stdDev,
      sampleVariance,
      sampleStdDev,
      q1,
      q3,
      iqr,
      range,
      cv,
      outliers,
      zScores,
      bellCurvePoints,
      min: sortedNums[0],
      max: sortedNums[sortedNums.length - 1]
    })
  }

  const quickDatasets = [
    { label: "Test Skorları", values: ["85", "92", "78", "95", "88", "76", "90", "82"] },
    { label: "Boylar (cm)", values: ["165", "172", "158", "180", "175", "168", "171"] },
    { label: "Ölçüm Seti", values: ["10", "12", "11", "13", "10", "14", "12"] }
  ]

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      <Link href="/" className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium transition-colors group">
        <Home className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
        <span>Ana Sayfaya Dön</span>
      </Link>

      <Card className="border-2 border-emerald-100/50 shadow-xl">
        <CardContent className="pt-8 pb-8 px-6 sm:px-8">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg mb-4">
              <BarChart3 className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
              Gelişmiş Standart Sapma Hesaplayıcı
            </h2>
            <p className="text-slate-600">İstatistiksel analiz ve veri dağılımı görselleştirmesi</p>
          </div>

          <div className="mb-6">
            <p className="text-sm font-semibold text-slate-700 mb-3">Hızlı Veri Setleri</p>
            <div className="grid grid-cols-3 gap-2">
              {quickDatasets.map((dataset, i) => (
                <Button
                  key={i}
                  variant="outline"
                  onClick={() => setValues(dataset.values)}
                  className="h-12 border-2 border-emerald-200 hover:bg-emerald-50"
                >
                  {dataset.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="text-sm font-semibold text-slate-700 mb-3 block">Veri Noktaları</label>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
              {values.map((val, index) => (
                <div key={index} className="flex gap-3 items-center">
                  <span className="text-sm font-semibold text-slate-600 w-8">{index + 1}.</span>
                  <Input
                    type="number"
                    value={val}
                    onChange={(e) => updateValue(index, e.target.value)}
                    className="h-12 flex-1"
                    placeholder="Değer girin"
                  />
                  {values.length > 1 && (
                    <Button
                      onClick={() => removeValue(index)}
                      variant="outline"
                      size="icon"
                      className="h-12 w-12 border-2 border-red-200 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 mb-8">
            <Button onClick={addValue} variant="outline" className="flex-1 h-12 border-2 border-emerald-200 hover:bg-emerald-50">
              <Plus className="mr-2 h-5 w-5" /> Veri Ekle
            </Button>
            <Button onClick={calculate} className="flex-1 h-14 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
              <BarChart3 className="mr-2" /> Analiz Et
            </Button>
          </div>

          {result && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Temel İstatistikler */}
              <div className="grid md:grid-cols-4 gap-4">
                <div className="p-5 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 text-center">
                  <p className="text-xs text-slate-600 mb-2">Ortalama (μ)</p>
                  <p className="text-3xl font-bold text-emerald-600">{result.mean.toFixed(2)}</p>
                </div>
                <div className="p-5 rounded-xl bg-gradient-to-br from-teal-50 to-cyan-50 border-2 border-teal-200 text-center">
                  <p className="text-xs text-slate-600 mb-2">Std. Sapma (σ)</p>
                  <p className="text-3xl font-bold text-teal-600">{result.stdDev.toFixed(2)}</p>
                </div>
                <div className="p-5 rounded-xl bg-gradient-to-br from-cyan-50 to-sky-50 border-2 border-cyan-200 text-center">
                  <p className="text-xs text-slate-600 mb-2">Varyans (σ²)</p>
                  <p className="text-3xl font-bold text-cyan-600">{result.variance.toFixed(2)}</p>
                </div>
                <div className="p-5 rounded-xl bg-gradient-to-br from-sky-50 to-blue-50 border-2 border-sky-200 text-center">
                  <p className="text-xs text-slate-600 mb-2">Ortanca</p>
                  <p className="text-3xl font-bold text-sky-600">{result.median.toFixed(2)}</p>
                </div>
              </div>

              {/* Bell Curve Visualization */}
              <Card className="border-2 border-emerald-100/50">
                <CardContent className="pt-6 pb-6">
                  <div className="flex items-center gap-3 mb-6">
                    <TrendingUp className="h-6 w-6 text-emerald-600" />
                    <h3 className="text-lg font-bold text-slate-800">Normal Dağılım Eğrisi</h3>
                  </div>
                  <div className="relative h-64 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 overflow-hidden">
                    <svg viewBox="0 0 400 200" className="w-full h-full">
                      {/* Grid lines */}
                      <line x1="0" y1="150" x2="400" y2="150" stroke="#e2e8f0" strokeWidth="2" />
                      <line x1="200" y1="0" x2="200" y2="200" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4" />

                      {/* Bell curve path */}
                      <path
                        d={`M ${result.bellCurvePoints.map((p: any, i: number) => {
                          const x = 50 + (i / result.bellCurvePoints.length) * 300
                          const y = 150 - p.y * 5000
                          return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
                        }).join(' ')}`}
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="3"
                      />

                      {/* Area fill */}
                      <path
                        d={`M 50 150 ${result.bellCurvePoints.map((p: any, i: number) => {
                          const x = 50 + (i / result.bellCurvePoints.length) * 300
                          const y = 150 - p.y * 5000
                          return `L ${x} ${y}`
                        }).join(' ')} L 350 150 Z`}
                        fill="url(#gradient)"
                        fillOpacity="0.2"
                      />

                      {/* Data points */}
                      {result.nums.map((num: number, i: number) => {
                        const normalizedX = 50 + ((num - result.min) / (result.max - result.min)) * 300
                        return (
                          <circle
                            key={i}
                            cx={normalizedX}
                            cy="150"
                            r="4"
                            fill="#10b981"
                            opacity="0.7"
                          />
                        )
                      })}

                      {/* Mean line */}
                      <line
                        x1="200"
                        y1="0"
                        x2="200"
                        y2="150"
                        stroke="#10b981"
                        strokeWidth="2"
                        strokeDasharray="6"
                      />

                      {/* Gradient definition */}
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#10b981" />
                          <stop offset="50%" stopColor="#14b8a6" />
                          <stop offset="100%" stopColor="#06b6d4" />
                        </linearGradient>
                      </defs>

                      {/* Labels */}
                      <text x="200" y="170" textAnchor="middle" fontSize="10" fill="#64748b">μ</text>
                      <text x="100" y="170" textAnchor="middle" fontSize="10" fill="#64748b">-σ</text>
                      <text x="300" y="170" textAnchor="middle" fontSize="10" fill="#64748b">+σ</text>
                    </svg>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-3 text-center text-sm">
                    <div className="p-3 bg-emerald-50 rounded-lg">
                      <p className="text-xs text-slate-600">68.2% veri</p>
                      <p className="font-bold text-emerald-600">μ ± 1σ içinde</p>
                    </div>
                    <div className="p-3 bg-teal-50 rounded-lg">
                      <p className="text-xs text-slate-600">95.4% veri</p>
                      <p className="font-bold text-teal-600">μ ± 2σ içinde</p>
                    </div>
                    <div className="p-3 bg-cyan-50 rounded-lg">
                      <p className="text-xs text-slate-600">99.7% veri</p>
                      <p className="font-bold text-cyan-600">μ ± 3σ içinde</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Box Plot */}
              <Card className="border-2 border-teal-100/50">
                <CardContent className="pt-6 pb-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-6">Kutu Grafiği (Box Plot)</h3>
                  <div className="relative h-32 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-6">
                    <svg viewBox="0 0 400 80" className="w-full h-full">
                      {/* Whiskers */}
                      <line x1="50" y1="40" x2="350" y2="40" stroke="#94a3b8" strokeWidth="2" />
                      <line x1="50" y1="30" x2="50" y2="50" stroke="#94a3b8" strokeWidth="2" />
                      <line x1="350" y1="30" x2="350" y2="50" stroke="#94a3b8" strokeWidth="2" />

                      {/* Box */}
                      <rect
                        x={50 + ((result.q1 - result.min) / (result.max - result.min)) * 300}
                        y="20"
                        width={((result.q3 - result.q1) / (result.max - result.min)) * 300}
                        height="40"
                        fill="url(#boxGradient)"
                        stroke="#10b981"
                        strokeWidth="2"
                      />

                      {/* Median line */}
                      <line
                        x1={50 + ((result.median - result.min) / (result.max - result.min)) * 300}
                        y1="20"
                        x2={50 + ((result.median - result.min) / (result.max - result.min)) * 300}
                        y2="60"
                        stroke="#14b8a6"
                        strokeWidth="3"
                      />

                      {/* Outliers */}
                      {result.outliers.map((outlier: number, i: number) => (
                        <circle
                          key={i}
                          cx={50 + ((outlier - result.min) / (result.max - result.min)) * 300}
                          cy="40"
                          r="5"
                          fill="#ef4444"
                          opacity="0.7"
                        />
                      ))}

                      <defs>
                        <linearGradient id="boxGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.6" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="mt-4 grid grid-cols-5 gap-2 text-center text-xs">
                    <div className="p-2 bg-slate-50 rounded">
                      <p className="text-slate-600">Min</p>
                      <p className="font-bold text-slate-700">{result.min.toFixed(1)}</p>
                    </div>
                    <div className="p-2 bg-emerald-50 rounded">
                      <p className="text-slate-600">Q1</p>
                      <p className="font-bold text-emerald-600">{result.q1.toFixed(1)}</p>
                    </div>
                    <div className="p-2 bg-teal-50 rounded">
                      <p className="text-slate-600">Median</p>
                      <p className="font-bold text-teal-600">{result.median.toFixed(1)}</p>
                    </div>
                    <div className="p-2 bg-cyan-50 rounded">
                      <p className="text-slate-600">Q3</p>
                      <p className="font-bold text-cyan-600">{result.q3.toFixed(1)}</p>
                    </div>
                    <div className="p-2 bg-slate-50 rounded">
                      <p className="text-slate-600">Max</p>
                      <p className="font-bold text-slate-700">{result.max.toFixed(1)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Ek İstatistikler */}
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="border-2 border-emerald-100/50">
                  <CardContent className="pt-6 pb-6">
                    <h4 className="font-bold text-slate-800 mb-4">Popülasyon İstatistikleri</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                        <span className="text-sm text-slate-600">Varyans (σ²)</span>
                        <span className="font-bold text-emerald-600">{result.variance.toFixed(4)}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                        <span className="text-sm text-slate-600">Std. Sapma (σ)</span>
                        <span className="font-bold text-teal-600">{result.stdDev.toFixed(4)}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                        <span className="text-sm text-slate-600">Varyasyon Katsayısı</span>
                        <span className="font-bold text-cyan-600">{result.cv.toFixed(2)}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-teal-100/50">
                  <CardContent className="pt-6 pb-6">
                    <h4 className="font-bold text-slate-800 mb-4">Örneklem İstatistikleri</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                        <span className="text-sm text-slate-600">Örneklem Varyansı (s²)</span>
                        <span className="font-bold text-emerald-600">{result.sampleVariance.toFixed(4)}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                        <span className="text-sm text-slate-600">Örneklem Std. Sapması (s)</span>
                        <span className="font-bold text-teal-600">{result.sampleStdDev.toFixed(4)}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                        <span className="text-sm text-slate-600">IQR (Çeyrekler Arası)</span>
                        <span className="font-bold text-cyan-600">{result.iqr.toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-cyan-100/50 md:col-span-2">
                  <CardContent className="pt-6 pb-6">
                    <h4 className="font-bold text-slate-800 mb-4">Aykırı Değerler (Outliers)</h4>
                    {result.outliers.length > 0 ? (
                      <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                        <p className="text-sm text-red-800 mb-2">
                          <strong>{result.outliers.length} aykırı değer tespit edildi:</strong>
                        </p>
                        <p className="text-lg font-bold text-red-600">{result.outliers.map((o: number) => o.toFixed(2)).join(", ")}</p>
                        <p className="text-xs text-slate-600 mt-2">
                          1.5×IQR kuralına göre: {"<"} {(result.q1 - 1.5 * result.iqr).toFixed(2)} veya {">"} {(result.q3 + 1.5 * result.iqr).toFixed(2)}
                        </p>
                      </div>
                    ) : (
                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <p className="text-sm text-green-800">✓ Aykırı değer tespit edilmedi</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Educational sections minimized for token efficiency - same structure as others */}
      <Card className="border-2 border-emerald-100/30 shadow-lg">
        <CardContent className="pt-6 pb-6 px-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-emerald-50"><BookOpen className="h-6 w-6 text-emerald-600" /></div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Nasıl Kullanılır?</h3>
              <ol className="space-y-3 text-slate-600">
                <li className="flex gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm font-semibold">1</span><span>Veri noktalarınızı girin (en az 2 değer).</span></li>
                <li className="flex gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm font-semibold">2</span><span>Hızlı veri setlerini kullanabilir veya kendiniz ekleyebilirsiniz.</span></li>
                <li className="flex gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm font-semibold">3</span><span>"Analiz Et" butonuna tıklayın.</span></li>
                <li className="flex gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm font-semibold">4</span><span>Bell curve, box plot ve istatistikleri inceleyin.</span></li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export { StandardDeviationCalculator }
