"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calculator, DollarSign, Home, BookOpen, Lightbulb, AlertCircle, Info, Plus, Trash2 } from "lucide-react"
import Link from "next/link"

const AverageCostCalculator = () => {
  const [items, setItems] = useState([{ price: "", quantity: "" }])
  const [result, setResult] = useState<any>(null)

  const addItem = () => setItems([...items, { price: "", quantity: "" }])
  const removeItem = (index: number) => setItems(items.filter((_, i) => i !== index))
  const updateItem = (index: number, field: 'price' | 'quantity', value: string) => {
    const newItems = [...items]
    newItems[index][field] = value
    setItems(newItems)
  }

  const calculate = () => {
    let totalCost = 0
    let totalQuantity = 0
    items.forEach(item => {
      const price = parseFloat(item.price) || 0
      const quantity = parseFloat(item.quantity) || 0
      totalCost += price * quantity
      totalQuantity += quantity
    })
    const avgCost = totalQuantity > 0 ? totalCost / totalQuantity : 0
    setResult({ totalCost, totalQuantity, avgCost })
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Ana Sayfaya Dön Butonu */}
      <Link 
        href="/" 
        className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium transition-colors group"
      >
        <Home className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
        <span>Ana Sayfaya Dön</span>
      </Link>

      <Card className="border-2 border-teal-100/50 shadow-xl">
        <CardContent className="pt-8 pb-8 px-6 sm:px-8">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 shadow-lg mb-4">
              <Calculator className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-2">
              Ortalama Maliyet Hesaplayıcı
            </h2>
            <p className="text-slate-600">Birim maliyet hesaplama ve alım ortalaması</p>
          </div>

          <div className="space-y-4 mb-6">
            {items.map((item, index) => (
              <div key={index} className="flex gap-3 items-center p-4 rounded-xl bg-slate-50 border-2 border-slate-200">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-sm font-semibold">
                  {index + 1}
                </div>
                <Input 
                  type="number" 
                  value={item.price} 
                  onChange={(e) => updateItem(index, 'price', e.target.value)}
                  className="h-12 flex-1" 
                  placeholder="Birim Fiyat (₺)" 
                />
                <Input 
                  type="number" 
                  value={item.quantity} 
                  onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                  className="h-12 flex-1" 
                  placeholder="Miktar (Adet)" 
                />
                {items.length > 1 && (
                  <Button 
                    onClick={() => removeItem(index)} 
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

          <div className="flex gap-4 mb-8">
            <Button onClick={addItem} variant="outline" className="flex-1 h-14 border-2 border-teal-200 hover:bg-teal-50">
              <Plus className="mr-2 h-5 w-5" /> Ürün Ekle
            </Button>
            <Button onClick={calculate} className="flex-1 h-14 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700">
              <Calculator className="mr-2 h-5 w-5" /> Hesapla
            </Button>
          </div>

          {result && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-teal-50 to-cyan-50 border-2 border-teal-200 text-center">
                  <DollarSign className="h-8 w-8 mx-auto text-teal-600 mb-2" />
                  <p className="text-sm font-semibold text-slate-600 mb-1">Toplam Maliyet</p>
                  <p className="text-3xl font-bold text-teal-600">₺{result.totalCost.toLocaleString('tr-TR', {maximumFractionDigits: 2})}</p>
                </div>
                <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-200 text-center">
                  <Calculator className="h-8 w-8 mx-auto text-cyan-600 mb-2" />
                  <p className="text-sm font-semibold text-slate-600 mb-1">Toplam Miktar</p>
                  <p className="text-3xl font-bold text-cyan-600">{result.totalQuantity} Adet</p>
                </div>
                <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 text-center">
                  <DollarSign className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                  <p className="text-sm font-semibold text-slate-600 mb-1">Ortalama Maliyet</p>
                  <p className="text-3xl font-bold text-blue-600">₺{result.avgCost.toLocaleString('tr-TR', {maximumFractionDigits: 2})}</p>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-slate-200">
                <p className="text-sm font-semibold text-slate-700 mb-2">Detaylı Analiz</p>
                <div className="space-y-2">
                  {items.map((item, index) => {
                    const price = parseFloat(item.price) || 0
                    const quantity = parseFloat(item.quantity) || 0
                    const total = price * quantity
                    if (quantity === 0) return null
                    return (
                      <div key={index} className="flex justify-between items-center text-sm py-2 border-b border-slate-200 last:border-0">
                        <span className="text-slate-600">
                          <span className="font-semibold">Alım {index + 1}:</span> {quantity} adet × ₺{price.toLocaleString('tr-TR', {maximumFractionDigits: 2})}
                        </span>
                        <span className="font-semibold text-slate-800">₺{total.toLocaleString('tr-TR', {maximumFractionDigits: 2})}</span>
                      </div>
                    )
                  })}
                  <div className="pt-3 mt-2 border-t-2 border-teal-200">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-800">Birim Başına Ortalama:</span>
                      <span className="text-2xl font-bold text-teal-600">₺{result.avgCost.toLocaleString('tr-TR', {maximumFractionDigits: 2})}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Nasıl Kullanılır? */}
      <Card className="border-2 border-teal-100/30 shadow-lg">
        <CardContent className="pt-6 pb-6 px-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-teal-50">
              <BookOpen className="h-6 w-6 text-teal-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Nasıl Kullanılır?</h3>
              <ol className="space-y-3 text-slate-600">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-sm font-semibold">1</span>
                  <span><strong>Birim Fiyat:</strong> Her bir alım için ödediğiniz birim fiyatı girin.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-sm font-semibold">2</span>
                  <span><strong>Miktar:</strong> O fiyattan kaç adet aldığınızı belirtin.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-sm font-semibold">3</span>
                  <span><strong>Ürün Ekle:</strong> Farklı fiyatlardan yaptığınız alımları ekleyin.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-sm font-semibold">4</span>
                  <span><strong>Sonuçlar:</strong> Toplam maliyet, miktar ve ortalama birim maliyeti görün.</span>
                </li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Örnek Kullanımlar */}
      <Card className="border-2 border-teal-100/30 shadow-lg">
        <CardContent className="pt-6 pb-6 px-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-xl bg-teal-50">
              <Lightbulb className="h-6 w-6 text-teal-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-800 mb-2">Örnek Kullanımlar</h3>
              <p className="text-slate-600">Ortalama maliyet hesaplama senaryoları</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold">📊</div>
                <h4 className="font-bold text-slate-800">Hisse Senedi Alımı</h4>
              </div>
              <p className="text-sm text-slate-600 mb-3">
                1. Alım: 100 adet × ₺50 = ₺5.000<br/>
                2. Alım: 150 adet × ₺45 = ₺6.750<br/>
                3. Alım: 50 adet × ₺55 = ₺2.750
              </p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Toplam:</span>
                  <span className="font-semibold text-teal-600">300 adet | ₺14.500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Ortalama:</span>
                  <span className="font-semibold text-blue-600">₺48,33/adet</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center text-white font-bold">🛒</div>
                <h4 className="font-bold text-slate-800">Toplu Alışveriş</h4>
              </div>
              <p className="text-sm text-slate-600 mb-3">
                Market A: 10 kg × ₺40 = ₺400<br/>
                Market B: 20 kg × ₺35 = ₺700<br/>
                Market C: 5 kg × ₺50 = ₺250
              </p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Toplam:</span>
                  <span className="font-semibold text-teal-600">35 kg | ₺1.350</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Ortalama:</span>
                  <span className="font-semibold text-blue-600">₺38,57/kg</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500 flex items-center justify-center text-white font-bold">💎</div>
                <h4 className="font-bold text-slate-800">Altın Alımı</h4>
              </div>
              <p className="text-sm text-slate-600 mb-3">
                Ocak: 5 gr × ₺1.200 = ₺6.000<br/>
                Mart: 3 gr × ₺1.350 = ₺4.050<br/>
                Haziran: 7 gr × ₺1.100 = ₺7.700
              </p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Toplam:</span>
                  <span className="font-semibold text-teal-600">15 gr | ₺17.750</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Ortalama:</span>
                  <span className="font-semibold text-blue-600">₺1.183,33/gr</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-yellow-500 flex items-center justify-center text-white font-bold">🏢</div>
                <h4 className="font-bold text-slate-800">Hammadde Stoku</h4>
              </div>
              <p className="text-sm text-slate-600 mb-3">
                Parti 1: 500 kg × ₺25 = ₺12.500<br/>
                Parti 2: 300 kg × ₺28 = ₺8.400<br/>
                Parti 3: 700 kg × ₺23 = ₺16.100
              </p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Toplam:</span>
                  <span className="font-semibold text-teal-600">1.500 kg | ₺37.000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Ortalama:</span>
                  <span className="font-semibold text-blue-600">₺24,67/kg</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Önemli Bilgiler */}
      <Card className="border-2 border-teal-100/30 shadow-lg">
        <CardContent className="pt-6 pb-6 px-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-xl bg-cyan-50">
              <AlertCircle className="h-6 w-6 text-cyan-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-800 mb-2">Önemli Bilgiler</h3>
              <p className="text-slate-600">Ortalama maliyet hesaplama hakkında bilmeniz gerekenler</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-slate-50 border-l-4 border-teal-500">
              <h4 className="font-semibold text-slate-800 mb-2">📊 Ortalama Maliyet Formülü</h4>
              <p className="text-sm text-slate-600">
                Ortalama Maliyet = <code className="px-2 py-1 bg-white rounded text-teal-600">Toplam Maliyet ÷ Toplam Miktar</code>
                <br/>Her alımın fiyatı ve miktarı ağırlıklandırılarak hesaplanır (weighted average).
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border-l-4 border-teal-500">
              <h4 className="font-semibold text-slate-800 mb-2">💼 DCA (Dollar Cost Averaging) Stratejisi</h4>
              <p className="text-sm text-slate-600">
                Düzenli aralıklarla sabit tutar yatırım yapmak, fiyat dalgalanmalarının etkisini azaltır.
                Fiyatlar düşükken daha fazla, yüksekken daha az alırsınız.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border-l-4 border-teal-500">
              <h4 className="font-semibold text-slate-800 mb-2">⚖️ Ağırlıklı Ortalama</h4>
              <p className="text-sm text-slate-600">
                Basit ortalama yerine ağırlıklı ortalama kullanılır. 10 adet ×₺100 ve 100 adet ×₺50'nin 
                ortalaması ₺75 değil, ₺54,54'tür (daha fazla alınan fiyatın ağırlığı fazladır).
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border-l-4 border-teal-500">
              <h4 className="font-semibold text-slate-800 mb-2">📈 Stok Değerleme</h4>
              <p className="text-sm text-slate-600">
                İşletmelerde FIFO (ilk giren ilk çıkar) ve ağırlıklı ortalama maliyet yaygın stok 
                değerleme yöntemleridir. Vergi ve kâr hesaplamalarını etkiler.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* İlginç Bilgiler */}
      <Card className="border-2 border-teal-100/30 shadow-lg">
        <CardContent className="pt-6 pb-6 px-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-xl bg-blue-50">
              <Info className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-800 mb-2">Bilmeniz İlginç Olabilecek Şeyler</h3>
              <p className="text-slate-600">Ortalama maliyet ve yatırım stratejileri</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <span className="text-2xl">🎯</span>
                DCA Başarısı
              </h4>
              <p className="text-sm text-slate-600">
                Araştırmalar gösteriyor ki, 20 yıllık yatırımlarda DCA stratejisi kullanarak 
                her ayın belirli günü yatırım yapanlar, timing yapmaya çalışanlardan daha başarılı!
              </p>
            </div>
            <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <span className="text-2xl">📉</span>
                Düşen Piyasalar
              </h4>
              <p className="text-sm text-slate-600">
                Hisse fiyatı düştüğünde ortalama maliyetiniz azalır (averaging down). 
                Ancak bu sadece şirketin temelleri sağlamsa mantıklıdır - batık gemiye yatırım değil!
              </p>
            </div>
            <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <span className="text-2xl">🏪</span>
                Perakende Taktikleri
              </h4>
              <p className="text-sm text-slate-600">
                Marketler toplu alımlarda birim fiyatı düşürür. "3 al 2 öde" kampanyaları 
                aslında ortalama maliyetinizi %33 azaltır!
              </p>
            </div>
            <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <span className="text-2xl">💰</span>
                Buffett Prensibi
              </h4>
              <p className="text-sm text-slate-600">
                Warren Buffett: "Kaliteli şirketlerde düşük fiyatlardan alım yapmak, 
                ortalama maliyeti düşürmenin en iyi yoludur." Değer yatırımının temeli!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export { AverageCostCalculator }
