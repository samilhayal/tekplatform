"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Home, Volume2, VolumeX, Trophy, RotateCcw, History, Sparkles, 
  PartyPopper, Star, Crown, Medal, Info, Lightbulb, Zap, Target, 
  Flame, TrendingUp, BarChart3, Coins
} from "lucide-react"
import Link from "next/link"

// Para birimleri ve tasarımları
const currencies = [
  { 
    id: "TRY", 
    name: "Türk Lirası", 
    symbol: "₺", 
    flag: "🇹🇷",
    headsName: "Yazı",
    tailsName: "Tura",
    headsImage: "ATATÜRK",
    tailsImage: "₺",
    color: "from-red-500 to-red-700",
    bgColor: "bg-red-50",
    textColor: "text-red-700"
  },
  { 
    id: "USD", 
    name: "Amerikan Doları", 
    symbol: "$", 
    flag: "🇺🇸",
    headsName: "Heads",
    tailsName: "Tails",
    headsImage: "LIBERTY",
    tailsImage: "$",
    color: "from-green-500 to-green-700",
    bgColor: "bg-green-50",
    textColor: "text-green-700"
  },
  { 
    id: "EUR", 
    name: "Euro", 
    symbol: "€", 
    flag: "🇪🇺",
    headsName: "Kopf",
    tailsName: "Zahl",
    headsImage: "EUROPA",
    tailsImage: "€",
    color: "from-blue-500 to-blue-700",
    bgColor: "bg-blue-50",
    textColor: "text-blue-700"
  },
  { 
    id: "GBP", 
    name: "İngiliz Sterlini", 
    symbol: "£", 
    flag: "🇬🇧",
    headsName: "Heads",
    tailsName: "Tails",
    headsImage: "QUEEN",
    tailsImage: "£",
    color: "from-purple-500 to-purple-700",
    bgColor: "bg-purple-50",
    textColor: "text-purple-700"
  },
  { 
    id: "JPY", 
    name: "Japon Yeni", 
    symbol: "¥", 
    flag: "🇯🇵",
    headsName: "表 (Omote)",
    tailsName: "裏 (Ura)",
    headsImage: "菊",
    tailsImage: "¥",
    color: "from-rose-400 to-rose-600",
    bgColor: "bg-rose-50",
    textColor: "text-rose-700"
  },
  { 
    id: "BTC", 
    name: "Bitcoin", 
    symbol: "₿", 
    flag: "🪙",
    headsName: "Bit",
    tailsName: "Coin",
    headsImage: "₿",
    tailsImage: "🔗",
    color: "from-orange-400 to-orange-600",
    bgColor: "bg-orange-50",
    textColor: "text-orange-700"
  }
]

// Özel durumlar
const specialEvents = {
  streak3: { name: "Hat-trick! 🎯", description: "3 kez aynı sonuç" },
  streak5: { name: "Süper Seri! 🔥", description: "5 kez aynı sonuç" },
  streak7: { name: "İNANILMAZ! 💫", description: "7 kez aynı sonuç" },
  perfect5050: { name: "Mükemmel Denge! ⚖️", description: "10+ atışta %50-%50" },
  first: { name: "İlk Atış! 🎉", description: "Şansınız açık olsun!" }
}

// Sonuç mesajları
const resultMessages = {
  heads: ["Yazı geldi! ✨", "Yazı! 🎯", "Yazı tarafı! 📝", "Ve... Yazı! 🌟"],
  tails: ["Tura geldi! ✨", "Tura! 🎯", "Tura tarafı! 🔄", "Ve... Tura! 🌟"]
}

export function CoinFlip() {
  const [result, setResult] = useState<"heads" | "tails" | null>(null)
  const [isFlipping, setIsFlipping] = useState(false)
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0])
  const [history, setHistory] = useState<{ result: "heads" | "tails"; currency: string; time: string }[]>([])
  const [stats, setStats] = useState({ heads: 0, tails: 0, total: 0, currentStreak: 0, bestStreak: 0, lastResult: null as "heads" | "tails" | null })
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [showConfetti, setShowConfetti] = useState(false)
  const [flipCount, setFlipCount] = useState(0)
  const [specialEvent, setSpecialEvent] = useState<string | null>(null)
  const [prediction, setPrediction] = useState<"heads" | "tails" | null>(null)
  const [correctPredictions, setCorrectPredictions] = useState(0)
  const [autoFlipMode, setAutoFlipMode] = useState(false)
  const [autoFlipCount, setAutoFlipCount] = useState(10)

  // Ses efektleri
  const playFlipSound = useCallback(() => {
    if (!soundEnabled) return
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      
      // Havaya atma sesi
      for (let i = 0; i < 8; i++) {
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()
        
        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)
        
        oscillator.frequency.setValueAtTime(300 + i * 50, audioContext.currentTime + i * 0.1)
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime + i * 0.1)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + i * 0.1 + 0.08)
        
        oscillator.start(audioContext.currentTime + i * 0.1)
        oscillator.stop(audioContext.currentTime + i * 0.1 + 0.08)
      }
    } catch (e) {}
  }, [soundEnabled])

  const playCatchSound = useCallback(() => {
    if (!soundEnabled) return
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1)
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15)
      
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.15)
    } catch (e) {}
  }, [soundEnabled])

  const playWinSound = useCallback(() => {
    if (!soundEnabled) return
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const notes = [523, 659, 784, 1047]
      
      notes.forEach((freq, i) => {
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()
        
        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)
        
        oscillator.frequency.setValueAtTime(freq, audioContext.currentTime + i * 0.12)
        gainNode.gain.setValueAtTime(0.15, audioContext.currentTime + i * 0.12)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + i * 0.12 + 0.3)
        
        oscillator.start(audioContext.currentTime + i * 0.12)
        oscillator.stop(audioContext.currentTime + i * 0.12 + 0.3)
      })
    } catch (e) {}
  }, [soundEnabled])

  // Para at
  const flipCoin = useCallback(() => {
    if (isFlipping) return
    
    setIsFlipping(true)
    setSpecialEvent(null)
    playFlipSound()
    setFlipCount(prev => prev + 1)
    
    // Sonucu belirle
    const newResult: "heads" | "tails" = Math.random() > 0.5 ? "heads" : "tails"
    
    setTimeout(() => {
      playCatchSound()
      setResult(newResult)
      
      // İstatistikleri güncelle
      setStats(prev => {
        const newStreak = prev.lastResult === newResult ? prev.currentStreak + 1 : 1
        const newBestStreak = Math.max(prev.bestStreak, newStreak)
        
        // Özel olayları kontrol et
        if (prev.total === 0) {
          setSpecialEvent("first")
          setShowConfetti(true)
          setTimeout(() => setShowConfetti(false), 2000)
        } else if (newStreak === 3) {
          setSpecialEvent("streak3")
          setShowConfetti(true)
          playWinSound()
          setTimeout(() => setShowConfetti(false), 2500)
        } else if (newStreak === 5) {
          setSpecialEvent("streak5")
          setShowConfetti(true)
          playWinSound()
          setTimeout(() => setShowConfetti(false), 3000)
        } else if (newStreak === 7) {
          setSpecialEvent("streak7")
          setShowConfetti(true)
          playWinSound()
          setTimeout(() => setShowConfetti(false), 4000)
        }
        
        const newTotal = prev.total + 1
        const newHeads = newResult === "heads" ? prev.heads + 1 : prev.heads
        const newTails = newResult === "tails" ? prev.tails + 1 : prev.tails
        
        // %50-%50 kontrolü
        if (newTotal >= 10 && newHeads === newTails) {
          setSpecialEvent("perfect5050")
          setShowConfetti(true)
          playWinSound()
          setTimeout(() => setShowConfetti(false), 3000)
        }
        
        return {
          heads: newHeads,
          tails: newTails,
          total: newTotal,
          currentStreak: newStreak,
          bestStreak: newBestStreak,
          lastResult: newResult
        }
      })
      
      // Tahmin kontrolü
      if (prediction === newResult) {
        setCorrectPredictions(prev => prev + 1)
      }
      setPrediction(null)
      
      // Geçmişe ekle
      const now = new Date()
      const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
      setHistory(prev => [{ result: newResult, currency: selectedCurrency.id, time: timeString }, ...prev].slice(0, 50))
      
      setIsFlipping(false)
    }, 1500)
  }, [isFlipping, selectedCurrency, prediction, playFlipSound, playCatchSound, playWinSound])

  // Otomatik atış
  const startAutoFlip = useCallback(async () => {
    setAutoFlipMode(true)
    for (let i = 0; i < autoFlipCount; i++) {
      if (!autoFlipMode) break
      flipCoin()
      await new Promise(resolve => setTimeout(resolve, 2000))
    }
    setAutoFlipMode(false)
  }, [autoFlipCount, flipCoin])

  // Sıfırla
  const resetAll = () => {
    setResult(null)
    setHistory([])
    setStats({ heads: 0, tails: 0, total: 0, currentStreak: 0, bestStreak: 0, lastResult: null })
    setFlipCount(0)
    setCorrectPredictions(0)
    setPrediction(null)
    setSpecialEvent(null)
  }

  // Yüzde hesapla
  const headsPercent = stats.total > 0 ? Math.round((stats.heads / stats.total) * 100) : 50
  const tailsPercent = stats.total > 0 ? Math.round((stats.tails / stats.total) * 100) : 50

  // Confetti
  const Confetti = () => (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {Array(40).fill(0).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: -20
          }}
          animate={{
            y: window.innerHeight + 100,
            x: (Math.random() - 0.5) * 200,
            rotate: Math.random() * 720,
            opacity: [1, 1, 0]
          }}
          transition={{
            duration: 2 + Math.random(),
            ease: "easeOut",
            delay: Math.random() * 0.3
          }}
        >
          {["🪙", "✨", "⭐", "💫", "🌟", "💰", "🎉", "🎊"][i % 8]}
        </motion.div>
      ))}
    </div>
  )

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Home Button */}
      <div className="flex justify-start">
        <Link href="/">
          <Button variant="outline" size="sm" className="gap-2">
            <Home className="h-4 w-4" />
            Ana Sayfaya Dön
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500 via-yellow-500 to-orange-500 p-6 sm:p-8 text-white"
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxMCIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
        
        {/* Decorative coins */}
        <motion.div 
          className="absolute top-4 right-10 text-4xl sm:text-6xl opacity-30"
          animate={{ rotateY: [0, 360] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          🪙
        </motion.div>
        <motion.div 
          className="absolute bottom-4 left-10 text-3xl sm:text-5xl opacity-30"
          animate={{ rotateY: [360, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          💰
        </motion.div>
        
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
          <motion.div
            animate={{ rotateY: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="text-6xl sm:text-8xl"
            style={{ transformStyle: "preserve-3d" }}
          >
            🪙
          </motion.div>
          
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-4xl font-bold mb-2">3D Yazı Tura</h1>
            <p className="text-white/80 text-sm sm:text-lg max-w-2xl">
              6 farklı para birimi, gerçekçi 3D döndürme animasyonları,
              tahmin modu ve detaylı istatistiklerle klasik yazı tura deneyimi!
            </p>
            <div className="flex flex-wrap gap-2 mt-4 justify-center sm:justify-start">
              <Badge className="bg-white/20 hover:bg-white/30 text-white">🪙 6 Para Birimi</Badge>
              <Badge className="bg-white/20 hover:bg-white/30 text-white">🎯 Tahmin Modu</Badge>
              <Badge className="bg-white/20 hover:bg-white/30 text-white">📊 İstatistikler</Badge>
              <Badge className="bg-white/20 hover:bg-white/30 text-white">🔥 Seri Takibi</Badge>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Confetti */}
      <AnimatePresence>
        {showConfetti && <Confetti />}
      </AnimatePresence>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Coin Area */}
        <Card className="lg:col-span-2 border-2 border-amber-100">
          <CardContent className="pt-6 sm:pt-8 pb-6 sm:pb-8">
            <div className="flex flex-col items-center space-y-6">
              
              {/* Currency Selector */}
              <div className="flex flex-wrap justify-center gap-2">
                {currencies.map(currency => (
                  <button
                    key={currency.id}
                    onClick={() => setSelectedCurrency(currency)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all hover:scale-105 ${
                      selectedCurrency.id === currency.id 
                        ? 'border-amber-500 bg-amber-50 shadow-md' 
                        : 'border-gray-200 bg-white hover:border-amber-300'
                    }`}
                  >
                    <span className="text-xl">{currency.flag}</span>
                    <span className="text-sm font-medium hidden sm:inline">{currency.symbol}</span>
                  </button>
                ))}
              </div>

              {/* Prediction Mode */}
              <div className="flex items-center gap-4">
                <span className="text-sm text-slate-500">Tahminin:</span>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={prediction === "heads" ? "default" : "outline"}
                    onClick={() => setPrediction(prediction === "heads" ? null : "heads")}
                    className={prediction === "heads" ? "bg-amber-500 hover:bg-amber-600" : ""}
                    disabled={isFlipping}
                  >
                    {selectedCurrency.headsName}
                  </Button>
                  <Button
                    size="sm"
                    variant={prediction === "tails" ? "default" : "outline"}
                    onClick={() => setPrediction(prediction === "tails" ? null : "tails")}
                    className={prediction === "tails" ? "bg-amber-500 hover:bg-amber-600" : ""}
                    disabled={isFlipping}
                  >
                    {selectedCurrency.tailsName}
                  </Button>
                </div>
                {stats.total > 0 && (
                  <Badge variant="secondary" className="gap-1">
                    <Target className="h-3 w-3" />
                    {correctPredictions}/{stats.total}
                  </Badge>
                )}
              </div>

              {/* Coin Display */}
              <div 
                className="relative h-64 sm:h-80 w-full flex items-center justify-center"
                style={{ perspective: "1000px" }}
              >
                <motion.div
                  className="relative w-40 h-40 sm:w-52 sm:h-52"
                  animate={isFlipping ? {
                    rotateX: [0, 1800],
                    y: [0, -100, -150, -100, 0],
                    scale: [1, 0.9, 0.85, 0.9, 1]
                  } : {
                    rotateX: result === "tails" ? 180 : 0
                  }}
                  transition={isFlipping ? {
                    duration: 1.5,
                    ease: [0.25, 0.1, 0.25, 1]
                  } : {
                    duration: 0.3
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Coin shadow */}
                  <motion.div
                    className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-32 h-8 bg-black/20 rounded-full blur-lg"
                    animate={isFlipping ? {
                      scale: [1, 0.5, 0.3, 0.5, 1],
                      opacity: [0.3, 0.1, 0.05, 0.1, 0.3]
                    } : {}}
                    transition={{ duration: 1.5 }}
                  />
                  
                  {/* Heads side */}
                  <div 
                    className={`absolute inset-0 rounded-full bg-gradient-to-br ${selectedCurrency.color} shadow-2xl flex items-center justify-center border-8 border-yellow-200`}
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    {/* Shine effect */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/40 via-transparent to-transparent" />
                    
                    {/* Edge texture */}
                    <div className="absolute inset-2 rounded-full border-4 border-yellow-300/30" />
                    
                    <div className="text-center z-10">
                      <div className="text-3xl sm:text-4xl font-bold text-white drop-shadow-lg">
                        {selectedCurrency.headsImage}
                      </div>
                      <div className="text-xs sm:text-sm text-white/80 mt-1 font-medium">
                        {selectedCurrency.headsName}
                      </div>
                    </div>
                  </div>
                  
                  {/* Tails side */}
                  <div 
                    className={`absolute inset-0 rounded-full bg-gradient-to-br ${selectedCurrency.color} shadow-2xl flex items-center justify-center border-8 border-yellow-200`}
                    style={{ 
                      backfaceVisibility: "hidden",
                      transform: "rotateX(180deg)"
                    }}
                  >
                    {/* Shine effect */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/40 via-transparent to-transparent" />
                    
                    {/* Edge texture */}
                    <div className="absolute inset-2 rounded-full border-4 border-yellow-300/30" />
                    
                    <div className="text-center z-10">
                      <div className="text-4xl sm:text-5xl font-bold text-white drop-shadow-lg">
                        {selectedCurrency.tailsImage}
                      </div>
                      <div className="text-xs sm:text-sm text-white/80 mt-1 font-medium">
                        {selectedCurrency.tailsName}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Special Event */}
              <AnimatePresence>
                {specialEvent && specialEvents[specialEvent as keyof typeof specialEvents] && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="bg-gradient-to-r from-amber-100 to-yellow-100 rounded-xl p-4 border-2 border-amber-300"
                  >
                    <div className="flex items-center gap-3">
                      <Star className="h-6 w-6 text-amber-600" />
                      <div>
                        <p className="font-bold text-amber-800">
                          {specialEvents[specialEvent as keyof typeof specialEvents].name}
                        </p>
                        <p className="text-xs text-amber-600">
                          {specialEvents[specialEvent as keyof typeof specialEvents].description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Flip Button */}
              <div className="flex flex-col sm:flex-row gap-3 items-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    onClick={flipCoin}
                    disabled={isFlipping}
                    className={`w-56 h-14 text-lg font-bold bg-gradient-to-r ${selectedCurrency.color} hover:opacity-90 shadow-lg`}
                  >
                    {isFlipping ? (
                      <motion.span
                        animate={{ rotateY: 360 }}
                        transition={{ duration: 0.3, repeat: Infinity }}
                        className="text-2xl"
                      >
                        🪙
                      </motion.span>
                    ) : (
                      <>
                        <Coins className="h-5 w-5 mr-2" />
                        Para At!
                      </>
                    )}
                  </Button>
                </motion.div>

                <Button
                  variant={soundEnabled ? "default" : "outline"}
                  size="icon"
                  onClick={() => setSoundEnabled(!soundEnabled)}
                >
                  {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                </Button>
              </div>

              {/* Result Display */}
              <AnimatePresence>
                {result && !isFlipping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className={`${selectedCurrency.bgColor} rounded-xl p-4 sm:p-6 border-2 border-amber-200`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-4xl">
                        {result === "heads" ? "📝" : "🔄"}
                      </span>
                      <div>
                        <p className="text-sm text-amber-600">
                          {resultMessages[result][flipCount % resultMessages[result].length]}
                        </p>
                        <p className={`text-2xl sm:text-3xl font-bold ${selectedCurrency.textColor}`}>
                          {result === "heads" ? selectedCurrency.headsName : selectedCurrency.tailsName}
                        </p>
                        {prediction && (
                          <p className={`text-sm mt-1 ${prediction === result ? 'text-green-600' : 'text-red-500'}`}>
                            {prediction === result ? "✓ Doğru tahmin!" : "✗ Yanlış tahmin"}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>

        {/* Right Panel */}
        <div className="space-y-4">
          {/* Stats Card */}
          <Card className="border-2 border-amber-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-amber-500" />
                İstatistikler
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center p-2 bg-amber-50 rounded-lg">
                <span className="text-sm text-slate-600">Toplam Atış</span>
                <Badge variant="secondary" className="font-bold">{stats.total}</Badge>
              </div>
              
              {/* Visual ratio bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{selectedCurrency.headsName}: {stats.heads}</span>
                  <span>{selectedCurrency.tailsName}: {stats.tails}</span>
                </div>
                <div className="h-4 bg-gray-100 rounded-full overflow-hidden flex">
                  <motion.div 
                    className="bg-gradient-to-r from-amber-400 to-amber-500 h-full"
                    animate={{ width: `${headsPercent}%` }}
                    transition={{ duration: 0.5 }}
                  />
                  <motion.div 
                    className="bg-gradient-to-r from-orange-400 to-orange-500 h-full"
                    animate={{ width: `${tailsPercent}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>%{headsPercent}</span>
                  <span>%{tailsPercent}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center justify-between p-2 bg-orange-50 rounded-lg">
                  <span className="text-xs text-slate-600 flex items-center gap-1">
                    <Flame className="h-3 w-3 text-orange-500" />
                    Seri
                  </span>
                  <Badge className="bg-orange-500">{stats.currentStreak}</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-yellow-50 rounded-lg">
                  <span className="text-xs text-slate-600 flex items-center gap-1">
                    <Crown className="h-3 w-3 text-yellow-600" />
                    En İyi
                  </span>
                  <Badge className="bg-yellow-500">{stats.bestStreak}</Badge>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={resetAll}
                className="w-full gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Sıfırla
              </Button>
            </CardContent>
          </Card>

          {/* History Card */}
          <Card className="border-2 border-slate-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                <History className="h-5 w-5 text-slate-500" />
                Son Atışlar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
                {history.length === 0 ? (
                  <p className="text-sm text-slate-400 text-center w-full py-4">
                    Henüz atış yapılmadı
                  </p>
                ) : (
                  history.slice(0, 30).map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        item.result === "heads" 
                          ? 'bg-amber-100 text-amber-700' 
                          : 'bg-orange-100 text-orange-700'
                      }`}
                      title={`${item.time} - ${item.result === "heads" ? "Yazı" : "Tura"}`}
                    >
                      {item.result === "heads" ? "Y" : "T"}
                    </motion.div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Probability Info */}
          <Card className="border-2 border-emerald-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-emerald-500" />
                Olasılık Bilgisi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-xs sm:text-sm text-slate-600">
                <p>• Her atışta %50 yazı, %50 tura</p>
                <p>• Önceki sonuçlar gelecek atışları etkilemez</p>
                <p>• 10 atışta hep aynı gelme: %0.1</p>
                <p>• "Büyük sayılar yasası" uzun vadede dengeye getirir</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Educational Section */}
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-2 border-amber-100">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <Target className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-bold mb-2">Kullanım Alanları</h3>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-1">
                  <li>• Karar verme</li>
                  <li>• Oyun başlatma</li>
                  <li>• Adil seçim yapma</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-orange-100">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Lightbulb className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h3 className="font-bold mb-2">Tarihçe</h3>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-1">
                  <li>• Roma: "Navia aut Caput"</li>
                  <li>• 2000+ yıllık gelenek</li>
                  <li>• Futbol maç başlangıcı</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-yellow-100">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Star className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-bold mb-2">Olasılık</h3>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-1">
                  <li>• Her atış: %50 - %50</li>
                  <li>• Bağımsız olaylar</li>
                  <li>• Kumar yanılgısı: Yanlış!</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-emerald-100">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Info className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-bold mb-2">İlginç Bilgi</h3>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-1">
                  <li>• Belçika: "Pile ou Face"</li>
                  <li>• İngiltere: "Heads or Tails"</li>
                  <li>• Almanya: "Kopf oder Zahl"</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
