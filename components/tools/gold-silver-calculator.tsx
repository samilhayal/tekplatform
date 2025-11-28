"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Sparkles, 
  TrendingUp, 
  TrendingDown, 
  RefreshCw, 
  Copy, 
  Crown, 
  Home, 
  Loader2,
  ArrowUpDown,
  Coins,
  CircleDollarSign,
  Calculator,
  Check
} from "lucide-react"
import Link from "next/link"

// API'den gelecek fiyat yapısı - Firestore'daki yapıyla eşleşmeli
interface GoldPrice {
  buying: number
  selling: number
}

interface GoldPricesData {
  gramAltin: GoldPrice
  bilezik22: GoldPrice
  altin18: GoldPrice
  altin14: GoldPrice
  ceyrek: GoldPrice
  yarim: GoldPrice
  tam: GoldPrice
  cumhuriyet: GoldPrice
  ata: GoldPrice
  gumus: GoldPrice
  lastUpdate?: string
}

// Altın türleri tanımları - Firestore key'leriyle eşleşmeli
const goldTypes = [
  { id: 'gramAltin', name: 'Gram Altın (24 Ayar)', icon: '🥇', category: 'gram', unit: 'gram', purity: '99.9%' },
  { id: 'bilezik22', name: '22 Ayar Bilezik', icon: '💍', category: 'gram', unit: 'gram', purity: '91.6%' },
  { id: 'altin18', name: '18 Ayar Altın', icon: '✨', category: 'gram', unit: 'gram', purity: '75%' },
  { id: 'altin14', name: '14 Ayar Altın', icon: '💫', category: 'gram', unit: 'gram', purity: '58.5%' },
  { id: 'ceyrek', name: 'Çeyrek Altın', icon: '🪙', category: 'ziynet', unit: 'adet', weight: '1.75g' },
  { id: 'yarim', name: 'Yarım Altın', icon: '💰', category: 'ziynet', unit: 'adet', weight: '3.5g' },
  { id: 'tam', name: 'Tam Altın', icon: '👑', category: 'ziynet', unit: 'adet', weight: '7g' },
  { id: 'cumhuriyet', name: 'Cumhuriyet Altını', icon: '🏛️', category: 'ozel', unit: 'adet' },
  { id: 'ata', name: 'Ata Altını', icon: '🎖️', category: 'ozel', unit: 'adet' },
  { id: 'gumus', name: 'Gümüş', icon: '🥈', category: 'gumus', unit: 'gram' },
]

// Varsayılan fiyatlar (API'den veri gelmezse)
const DEFAULT_PRICES: GoldPricesData = {
  gramAltin: { buying: 5703.26, selling: 5707.33 },
  bilezik22: { buying: 5185.55, selling: 5361.27 },
  altin18: { buying: 4221.41, selling: 4225.52 },
  altin14: { buying: 3296.17, selling: 3299.38 },
  ceyrek: { buying: 9231.42, selling: 9382.22 },
  yarim: { buying: 18462.83, selling: 18792.97 },
  tam: { buying: 36811.70, selling: 37414.83 },
  cumhuriyet: { buying: 37666.46, selling: 38327.39 },
  ata: { buying: 37666.46, selling: 38327.39 },
  gumus: { buying: 73.49, selling: 73.68 },
}

export function GoldSilverCalculator() {
  const [prices, setPrices] = useState<GoldPricesData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedType, setSelectedType] = useState("gramAltin")
  const [transactionType, setTransactionType] = useState<"buying" | "selling">("buying")
  const [amount, setAmount] = useState("1")
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState("fiyatlar")

  const fetchPrices = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/prices?type=gold')
      const data = await response.json()
      
      // API'den gelen veriyi kontrol et (data.gold veya data.data)
      const goldData = data.gold || data.data
      
      if (data.success && goldData) {
        // lastUpdate formatını düzelt
        let lastUpdateStr = new Date().toLocaleString('tr-TR')
        if (goldData.lastUpdate) {
          if (goldData.lastUpdate._seconds) {
            lastUpdateStr = new Date(goldData.lastUpdate._seconds * 1000).toLocaleString('tr-TR')
          } else if (typeof goldData.lastUpdate === 'string') {
            lastUpdateStr = new Date(goldData.lastUpdate).toLocaleString('tr-TR')
          }
        }
        
        setPrices({
          gramAltin: goldData.gramAltin || DEFAULT_PRICES.gramAltin,
          bilezik22: goldData.bilezik22 || DEFAULT_PRICES.bilezik22,
          altin18: goldData.altin18 || DEFAULT_PRICES.altin18,
          altin14: goldData.altin14 || DEFAULT_PRICES.altin14,
          ceyrek: goldData.ceyrek || DEFAULT_PRICES.ceyrek,
          yarim: goldData.yarim || DEFAULT_PRICES.yarim,
          tam: goldData.tam || DEFAULT_PRICES.tam,
          cumhuriyet: goldData.cumhuriyet || DEFAULT_PRICES.cumhuriyet,
          ata: goldData.ata || DEFAULT_PRICES.ata,
          gumus: goldData.gumus || DEFAULT_PRICES.gumus,
          lastUpdate: lastUpdateStr
        })
      } else {
        setPrices({
          ...DEFAULT_PRICES,
          lastUpdate: new Date().toLocaleString('tr-TR')
        })
      }
    } catch (error) {
      console.error('Fiyatlar alınamadı:', error)
      setPrices({
        ...DEFAULT_PRICES,
        lastUpdate: new Date().toLocaleString('tr-TR')
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPrices()
  }, [])

  const getPrice = (typeId: string, type: "buying" | "selling"): number => {
    if (!prices) return 0
    const priceData = prices[typeId as keyof GoldPricesData]
    if (!priceData || typeof priceData === 'string') return 0
    return (priceData as GoldPrice)[type] || 0
  }

  const calculateTotal = (): number => {
    const numAmount = parseFloat(amount) || 0
    const unitPrice = getPrice(selectedType, transactionType)
    return numAmount * unitPrice
  }

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const selectedGoldType = goldTypes.find(t => t.id === selectedType)
  const currentBuyingPrice = getPrice(selectedType, "buying")
  const currentSellingPrice = getPrice(selectedType, "selling")
  const spread = currentSellingPrice - currentBuyingPrice
  const spreadPercentage = currentBuyingPrice > 0 ? ((spread / currentBuyingPrice) * 100).toFixed(2) : "0"
  const total = calculateTotal()

  // Kategorilere göre grupla
  const gramGolds = goldTypes.filter(t => t.category === 'gram')
  const ziynetGolds = goldTypes.filter(t => t.category === 'ziynet')
  const ozelGolds = goldTypes.filter(t => t.category === 'ozel')
  const gumusType = goldTypes.filter(t => t.category === 'gumus')

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Back to Home Button */}
      <Link href="/">
        <Button variant="outline" className="group hover:border-yellow-400 hover:bg-yellow-50 transition-all">
          <Home className="h-4 w-4 mr-2 group-hover:text-yellow-600" />
          Ana Sayfaya Dön
        </Button>
      </Link>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 h-14 p-1 bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-200 rounded-2xl">
          <TabsTrigger 
            value="fiyatlar" 
            className="h-12 rounded-xl text-base font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-amber-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all"
          >
            <TrendingUp className="h-5 w-5 mr-2" />
            Güncel Fiyatlar
          </TabsTrigger>
          <TabsTrigger 
            value="hesaplama" 
            className="h-12 rounded-xl text-base font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all"
          >
            <Calculator className="h-5 w-5 mr-2" />
            Hesaplama Yap
          </TabsTrigger>
        </TabsList>

        {/* Fiyatlar Tab */}
        <TabsContent value="fiyatlar" className="mt-6">
          <div className="space-y-6">
            {/* Header Info */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <Coins className="h-6 w-6 text-yellow-600" />
                  Altın & Gümüş Fiyatları
                </h2>
                {prices?.lastUpdate && (
                  <p className="text-sm text-slate-500 mt-1">
                    Son güncelleme: {prices.lastUpdate}
                  </p>
                )}
              </div>
              <Button
                onClick={fetchPrices}
                disabled={loading}
                className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white shadow-lg shadow-yellow-500/30"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Fiyatları Yenile
              </Button>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-10 w-10 animate-spin text-yellow-500" />
              </div>
            ) : (
              <div className="space-y-8">
                {/* Gram Altınlar */}
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-yellow-600" />
                    Gram Altınlar
                  </h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {gramGolds.map((type) => (
                      <PriceCard 
                        key={type.id} 
                        type={type} 
                        buying={getPrice(type.id, "buying")} 
                        selling={getPrice(type.id, "selling")}
                        onClick={() => {
                          setSelectedType(type.id)
                          setActiveTab("hesaplama")
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Ziynet Altınlar */}
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Crown className="h-5 w-5 text-amber-600" />
                    Ziynet Altınlar
                  </h3>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {ziynetGolds.map((type) => (
                      <PriceCard 
                        key={type.id} 
                        type={type} 
                        buying={getPrice(type.id, "buying")} 
                        selling={getPrice(type.id, "selling")}
                        onClick={() => {
                          setSelectedType(type.id)
                          setActiveTab("hesaplama")
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Özel Altınlar */}
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Crown className="h-5 w-5 text-orange-600" />
                    Özel Altınlar
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {ozelGolds.map((type) => (
                      <PriceCard 
                        key={type.id} 
                        type={type} 
                        buying={getPrice(type.id, "buying")} 
                        selling={getPrice(type.id, "selling")}
                        onClick={() => {
                          setSelectedType(type.id)
                          setActiveTab("hesaplama")
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Gümüş */}
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <CircleDollarSign className="h-5 w-5 text-slate-500" />
                    Gümüş
                  </h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {gumusType.map((type) => (
                      <PriceCard 
                        key={type.id} 
                        type={type} 
                        buying={getPrice(type.id, "buying")} 
                        selling={getPrice(type.id, "selling")}
                        onClick={() => {
                          setSelectedType(type.id)
                          setActiveTab("hesaplama")
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Hesaplama Tab */}
        <TabsContent value="hesaplama" className="mt-6">
          <Card className="border-2 border-yellow-100/50 shadow-xl shadow-amber-500/10 backdrop-blur-sm bg-white/80 overflow-hidden">
            <CardContent className="pt-8 pb-8 px-6 sm:px-8">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Sol Taraf - Seçim ve Giriş */}
                <div className="space-y-6">
                  {/* Altın Türü Seçimi */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                      <Sparkles className="h-4 w-4 text-yellow-600" />
                      Altın/Gümüş Türü
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
                      {goldTypes.map((type) => (
                        <button
                          key={type.id}
                          onClick={() => setSelectedType(type.id)}
                          className={`p-3 rounded-xl border-2 transition-all duration-300 text-left ${
                            selectedType === type.id
                              ? 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-amber-50 shadow-lg shadow-yellow-500/20'
                              : 'border-slate-200 hover:border-yellow-200 bg-white hover:shadow-md'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{type.icon}</span>
                            <div className="flex-1 min-w-0">
                              <p className={`text-xs font-semibold truncate ${
                                selectedType === type.id ? 'text-yellow-700' : 'text-slate-700'
                              }`}>
                                {type.name}
                              </p>
                              {type.purity && (
                                <p className="text-[10px] text-slate-500">{type.purity}</p>
                              )}
                              {type.weight && (
                                <p className="text-[10px] text-slate-500">{type.weight}</p>
                              )}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Alış/Satış Seçimi */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                      <ArrowUpDown className="h-4 w-4 text-amber-600" />
                      İşlem Türü
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setTransactionType("buying")}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                          transactionType === "buying"
                            ? 'border-green-400 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg shadow-green-500/20'
                            : 'border-slate-200 hover:border-green-200 bg-white hover:shadow-md'
                        }`}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <TrendingUp className={`h-5 w-5 ${transactionType === "buying" ? 'text-green-600' : 'text-slate-400'}`} />
                          <span className={`font-semibold ${transactionType === "buying" ? 'text-green-700' : 'text-slate-600'}`}>
                            Alış Fiyatı
                          </span>
                        </div>
                        <p className="text-center mt-2 text-lg font-bold text-green-600">
                          {formatCurrency(currentBuyingPrice)}
                        </p>
                        <p className="text-center text-xs text-slate-500 mt-1">Kuyumcu satıyor</p>
                      </button>
                      <button
                        onClick={() => setTransactionType("selling")}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                          transactionType === "selling"
                            ? 'border-red-400 bg-gradient-to-br from-red-50 to-rose-50 shadow-lg shadow-red-500/20'
                            : 'border-slate-200 hover:border-red-200 bg-white hover:shadow-md'
                        }`}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <TrendingDown className={`h-5 w-5 ${transactionType === "selling" ? 'text-red-600' : 'text-slate-400'}`} />
                          <span className={`font-semibold ${transactionType === "selling" ? 'text-red-700' : 'text-slate-600'}`}>
                            Satış Fiyatı
                          </span>
                        </div>
                        <p className="text-center mt-2 text-lg font-bold text-red-600">
                          {formatCurrency(currentSellingPrice)}
                        </p>
                        <p className="text-center text-xs text-slate-500 mt-1">Kuyumcu alıyor</p>
                      </button>
                    </div>
                  </div>

                  {/* Miktar Girişi */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                      <Calculator className="h-4 w-4 text-orange-600" />
                      Miktar ({selectedGoldType?.unit || 'adet'})
                    </label>
                    <div className="relative group">
                      <Input
                        type="number"
                        placeholder="Miktar girin"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        min="0"
                        step="0.01"
                        className="h-16 text-xl pl-14 border-2 border-slate-200 focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100 transition-all rounded-xl font-semibold"
                      />
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl">
                        {selectedGoldType?.icon}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Sağ Taraf - Sonuç */}
                <div className="lg:flex lg:items-center">
                  <div className="relative w-full overflow-hidden rounded-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50"></div>
                    <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-yellow-200 to-amber-200 rounded-full blur-3xl opacity-50"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-orange-200 to-yellow-200 rounded-full blur-2xl opacity-40"></div>
                    
                    <div className="relative border-2 border-yellow-200 rounded-2xl p-6 sm:p-8">
                      {/* Seçili Altın Bilgisi */}
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center text-3xl shadow-lg shadow-yellow-500/30">
                          {selectedGoldType?.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-slate-900">{selectedGoldType?.name}</h3>
                          <Badge variant="outline" className={`mt-1 ${
                            transactionType === "buying" ? 'border-green-300 text-green-700 bg-green-50' : 'border-red-300 text-red-700 bg-red-50'
                          }`}>
                            {transactionType === "buying" ? "Alış Fiyatı" : "Satış Fiyatı"}
                          </Badge>
                        </div>
                      </div>

                      {/* Fiyat Bilgisi */}
                      <div className="mb-6">
                        <p className="text-sm text-slate-600 mb-1">Birim Fiyat</p>
                        <p className={`text-3xl font-bold ${
                          transactionType === "buying" ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {formatCurrency(transactionType === "buying" ? currentBuyingPrice : currentSellingPrice)}
                        </p>
                      </div>

                      {/* Spread Bilgisi */}
                      <div className="p-3 bg-white/60 rounded-xl mb-6">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-600">Alış-Satış Farkı</span>
                          <span className="font-semibold text-slate-900">
                            {formatCurrency(spread)} <span className="text-slate-500">(%{spreadPercentage})</span>
                          </span>
                        </div>
                      </div>

                      <div className="h-px bg-gradient-to-r from-transparent via-yellow-300 to-transparent mb-6"></div>

                      {/* Toplam Değer */}
                      <div className="mb-6">
                        <div className="flex items-center gap-2 mb-2">
                          <Crown className="h-5 w-5 text-amber-600" />
                          <p className="text-sm font-semibold text-slate-700">Toplam Değer</p>
                        </div>
                        <p className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                          {formatCurrency(total)}
                        </p>
                        <p className="text-sm text-slate-600 mt-2">
                          {amount || 0} {selectedGoldType?.unit} × {formatCurrency(transactionType === "buying" ? currentBuyingPrice : currentSellingPrice)}
                        </p>
                      </div>

                      {/* Kopyala Butonu */}
                      <Button
                        onClick={() => copyToClipboard(total.toFixed(2))}
                        className="w-full h-12 bg-white hover:bg-yellow-50 text-yellow-700 border-2 border-yellow-200 hover:border-yellow-300 shadow-sm hover:shadow-md transition-all font-semibold"
                      >
                        {copied ? (
                          <>
                            <Check className="h-5 w-5 mr-2 text-green-600" />
                            Kopyalandı!
                          </>
                        ) : (
                          <>
                            <Copy className="h-5 w-5 mr-2" />
                            Sonucu Kopyala
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Bilgi Kutusu */}
      <Card className="border-2 border-yellow-100 bg-gradient-to-r from-yellow-50 to-amber-50">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center flex-shrink-0">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-2">💡 Altın Alım Satım Bilgisi</h3>
              <p className="text-sm text-slate-600 mb-3">
                <strong>Alış Fiyatı:</strong> Kuyumcunun size altın sattığı fiyattır. Altın almak istediğinizde bu fiyatı ödersiniz.
              </p>
              <p className="text-sm text-slate-600">
                <strong>Satış Fiyatı:</strong> Kuyumcunun sizden altın aldığı fiyattır. Altın satmak istediğinizde bu fiyatı alırsınız.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Fiyat Kartı Bileşeni
interface PriceCardProps {
  type: typeof goldTypes[0]
  buying: number
  selling: number
  onClick: () => void
}

function PriceCard({ type, buying, selling, onClick }: PriceCardProps) {
  const spread = selling - buying
  const spreadPercentage = buying > 0 ? ((spread / buying) * 100).toFixed(2) : "0"

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value)
  }

  return (
    <Card 
      className="group cursor-pointer border-2 border-slate-100 hover:border-yellow-300 hover:shadow-xl transition-all duration-300 overflow-hidden"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-100 to-amber-100 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
            {type.icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-slate-900 truncate">{type.name}</p>
            <div className="flex gap-2 mt-1">
              {type.purity && (
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0">{type.purity}</Badge>
              )}
              {type.weight && (
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0">{type.weight}</Badge>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-2 rounded-lg bg-green-50 border border-green-100">
            <p className="text-[10px] text-green-600 font-medium mb-0.5">ALIŞ</p>
            <p className="text-sm font-bold text-green-700">{formatCurrency(buying)}</p>
          </div>
          <div className="p-2 rounded-lg bg-red-50 border border-red-100">
            <p className="text-[10px] text-red-600 font-medium mb-0.5">SATIŞ</p>
            <p className="text-sm font-bold text-red-700">{formatCurrency(selling)}</p>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-100">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500">Fark</span>
            <span className="font-medium text-slate-700">%{spreadPercentage}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
