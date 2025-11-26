"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Home, Volume2, VolumeX, Trophy, Flame, Zap, RotateCcw, History, Target, Sparkles, PartyPopper, Crown, Star } from "lucide-react"
import Link from "next/link"

// 3D Zar Yüzleri CSS Sınıfları
const diceFaces = {
  1: [{ x: 50, y: 50 }],
  2: [{ x: 25, y: 25 }, { x: 75, y: 75 }],
  3: [{ x: 25, y: 25 }, { x: 50, y: 50 }, { x: 75, y: 75 }],
  4: [{ x: 25, y: 25 }, { x: 75, y: 25 }, { x: 25, y: 75 }, { x: 75, y: 75 }],
  5: [{ x: 25, y: 25 }, { x: 75, y: 25 }, { x: 50, y: 50 }, { x: 25, y: 75 }, { x: 75, y: 75 }],
  6: [{ x: 25, y: 25 }, { x: 75, y: 25 }, { x: 25, y: 50 }, { x: 75, y: 50 }, { x: 25, y: 75 }, { x: 75, y: 75 }]
}

// Başarı mesajları
const successMessages = [
  "Şanslı atış! 🍀",
  "Harika! 🎯",
  "Müthiş! ✨",
  "Vay be! 🔥",
  "İnanılmaz! 💫",
  "Süper! 🚀"
]

// Zar renk temaları
const diceThemes = [
  { id: "classic", name: "Klasik", bg: "from-red-600 to-red-700", dot: "bg-white", shadow: "shadow-red-500/50" },
  { id: "ocean", name: "Okyanus", bg: "from-cyan-500 to-blue-600", dot: "bg-white", shadow: "shadow-blue-500/50" },
  { id: "forest", name: "Orman", bg: "from-emerald-500 to-green-700", dot: "bg-white", shadow: "shadow-green-500/50" },
  { id: "sunset", name: "Gün Batımı", bg: "from-orange-500 to-pink-600", dot: "bg-white", shadow: "shadow-orange-500/50" },
  { id: "galaxy", name: "Galaksi", bg: "from-purple-600 to-indigo-800", dot: "bg-yellow-300", shadow: "shadow-purple-500/50" },
  { id: "gold", name: "Altın", bg: "from-yellow-500 to-amber-600", dot: "bg-black", shadow: "shadow-yellow-500/50" },
  { id: "neon", name: "Neon", bg: "from-pink-500 to-violet-600", dot: "bg-cyan-300", shadow: "shadow-pink-500/50" },
  { id: "dark", name: "Karanlık", bg: "from-slate-800 to-slate-900", dot: "bg-red-500", shadow: "shadow-slate-500/50" }
]

export function RandomizerTool() {
  // Dice States
  const [diceResult, setDiceResult] = useState<number | null>(null)
  const [diceRolling, setDiceRolling] = useState(false)
  const [diceCount, setDiceCount] = useState(1)
  const [diceResults, setDiceResults] = useState<number[]>([])
  const [rollHistory, setRollHistory] = useState<{ results: number[], total: number, time: string }[]>([])
  const [totalRolls, setTotalRolls] = useState(0)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [lastNumber, setLastNumber] = useState<number | null>(null)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [selectedTheme, setSelectedTheme] = useState(diceThemes[0])
  const [showConfetti, setShowConfetti] = useState(false)
  const [quickMode, setQuickMode] = useState(false)
  const [targetNumber, setTargetNumber] = useState<number | null>(null)
  const [targetHits, setTargetHits] = useState(0)
  const [animatingDice, setAnimatingDice] = useState<number[]>([])
  
  // Coin States
  const [coinResult, setCoinResult] = useState<string | null>(null)
  const [coinFlipping, setCoinFlipping] = useState(false)
  const [coinCurrency, setCoinCurrency] = useState("TRY")
  
  // Card States
  const [cardResult, setCardResult] = useState<string | null>(null)
  const [cardDrawing, setCardDrawing] = useState(false)
  
  // Wheel States
  const [wheelResult, setWheelResult] = useState<string | null>(null)
  const [wheelSpinning, setWheelSpinning] = useState(false)
  const [wheelOptions, setWheelOptions] = useState(["Seçenek 1", "Seçenek 2", "Seçenek 3", "Seçenek 4"])
  const [newOption, setNewOption] = useState("")

  // Sound Effect
  const playRollSound = useCallback(() => {
    if (!soundEnabled) return
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.setValueAtTime(200, audioContext.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1)
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
      
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.3)
    } catch (e) {
      // Audio not available
    }
  }, [soundEnabled])

  const playWinSound = useCallback(() => {
    if (!soundEnabled) return
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const notes = [523, 659, 784, 1047] // C5, E5, G5, C6
      
      notes.forEach((freq, i) => {
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()
        
        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)
        
        oscillator.frequency.setValueAtTime(freq, audioContext.currentTime + i * 0.1)
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime + i * 0.1)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + i * 0.1 + 0.3)
        
        oscillator.start(audioContext.currentTime + i * 0.1)
        oscillator.stop(audioContext.currentTime + i * 0.1 + 0.3)
      })
    } catch (e) {
      // Audio not available
    }
  }, [soundEnabled])

  // Dice Roll with 3D animation
  const rollDice = useCallback(() => {
    setDiceRolling(true)
    playRollSound()
    
    // Generate random intermediate values for animation
    const animationInterval = setInterval(() => {
      const randomValues = Array(diceCount).fill(0).map(() => Math.floor(Math.random() * 6) + 1)
      setAnimatingDice(randomValues)
    }, 80)
    
    const rollDuration = quickMode ? 500 : 1500
    
    setTimeout(() => {
      clearInterval(animationInterval)
      const results = Array(diceCount).fill(0).map(() => Math.floor(Math.random() * 6) + 1)
      const total = results.reduce((a, b) => a + b, 0)
      
      setDiceResults(results)
      setDiceResult(total)
      setDiceRolling(false)
      setAnimatingDice([])
      setTotalRolls(prev => prev + 1)
      
      // Add to history
      const now = new Date()
      const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
      setRollHistory(prev => [{ results, total, time: timeString }, ...prev].slice(0, 20))
      
      // Check streak (same number in a row)
      if (diceCount === 1) {
        if (results[0] === lastNumber) {
          const newStreak = streak + 1
          setStreak(newStreak)
          if (newStreak > bestStreak) {
            setBestStreak(newStreak)
          }
          if (newStreak >= 2) {
            setShowConfetti(true)
            playWinSound()
            setTimeout(() => setShowConfetti(false), 2000)
          }
        } else {
          setStreak(1)
        }
        setLastNumber(results[0])
      }
      
      // Check target
      if (targetNumber !== null && results.includes(targetNumber)) {
        setTargetHits(prev => prev + 1)
        setShowConfetti(true)
        playWinSound()
        setTimeout(() => setShowConfetti(false), 2000)
      }
      
      // Special celebrations
      if (diceCount === 1 && results[0] === 6) {
        setShowConfetti(true)
        playWinSound()
        setTimeout(() => setShowConfetti(false), 2000)
      }
      if (diceCount === 2 && results[0] === results[1]) {
        setShowConfetti(true)
        playWinSound()
        setTimeout(() => setShowConfetti(false), 2000)
      }
      if (results.every(r => r === 6)) {
        setShowConfetti(true)
        playWinSound()
        setTimeout(() => setShowConfetti(false), 3000)
      }
    }, rollDuration)
  }, [diceCount, quickMode, playRollSound, playWinSound, lastNumber, streak, bestStreak, targetNumber])

  // Reset stats
  const resetStats = () => {
    setDiceResult(null)
    setDiceResults([])
    setRollHistory([])
    setTotalRolls(0)
    setStreak(0)
    setBestStreak(0)
    setLastNumber(null)
    setTargetHits(0)
  }

  // Coin Flip
  const flipCoin = () => {
    setCoinFlipping(true)
    setTimeout(() => {
      const result = Math.random() > 0.5 ? "Yazı" : "Tura"
      setCoinResult(result)
      setCoinFlipping(false)
    }, 1500)
  }

  // Card Draw
  const drawCard = () => {
    setCardDrawing(true)
    const suits = ["♠️", "♥️", "♦️", "♣️"]
    const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
    
    setTimeout(() => {
      const suit = suits[Math.floor(Math.random() * suits.length)]
      const value = values[Math.floor(Math.random() * values.length)]
      setCardResult(`${value}${suit}`)
      setCardDrawing(false)
    }, 1000)
  }

  // Wheel Spin
  const spinWheel = () => {
    if (wheelOptions.length === 0) return
    setWheelSpinning(true)
    
    setTimeout(() => {
      const result = wheelOptions[Math.floor(Math.random() * wheelOptions.length)]
      setWheelResult(result)
      setWheelSpinning(false)
    }, 2000)
  }

  const addWheelOption = () => {
    if (newOption.trim()) {
      setWheelOptions([...wheelOptions, newOption.trim()])
      setNewOption("")
    }
  }

  const removeWheelOption = (index: number) => {
    setWheelOptions(wheelOptions.filter((_, i) => i !== index))
  }

  // Render 3D Dice Face
  const renderDiceFace = (value: number, size: "sm" | "md" | "lg" = "lg", isAnimating: boolean = false) => {
    const sizeClasses = {
      sm: "w-12 h-12",
      md: "w-20 h-20",
      lg: "w-28 h-28 sm:w-32 sm:h-32"
    }
    const dotSizes = {
      sm: "w-2 h-2",
      md: "w-3 h-3",
      lg: "w-4 h-4"
    }
    
    return (
      <motion.div
        className={`relative ${sizeClasses[size]} rounded-xl sm:rounded-2xl bg-gradient-to-br ${selectedTheme.bg} ${selectedTheme.shadow} shadow-2xl`}
        animate={isAnimating ? {
          rotateX: [0, 360, 720, 1080],
          rotateY: [0, 180, 360, 540, 720],
          rotateZ: [0, 90, 180, 270, 360],
          scale: [1, 1.1, 0.9, 1.05, 1]
        } : {
          rotateX: 0,
          rotateY: 0,
          rotateZ: 0,
          scale: 1
        }}
        transition={isAnimating ? {
          duration: quickMode ? 0.5 : 1.5,
          ease: "easeInOut",
          repeat: Infinity
        } : {
          type: "spring",
          stiffness: 200,
          damping: 15
        }}
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px"
        }}
      >
        {/* Dice border glow effect */}
        <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-white/20 blur-sm" />
        
        {/* Dice face */}
        <div className="absolute inset-1 rounded-lg sm:rounded-xl bg-gradient-to-br from-white/10 to-transparent" />
        
        {/* Dots */}
        {diceFaces[value as keyof typeof diceFaces]?.map((pos, i) => (
          <motion.div
            key={i}
            className={`absolute ${dotSizes[size]} ${selectedTheme.dot} rounded-full shadow-lg`}
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              transform: "translate(-50%, -50%)"
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.05, type: "spring", stiffness: 500 }}
          />
        ))}
        
        {/* Shine effect */}
        <div className="absolute top-1 left-1 right-1/2 bottom-1/2 rounded-tl-lg sm:rounded-tl-xl bg-gradient-to-br from-white/30 to-transparent" />
      </motion.div>
    )
  }

  // Confetti Component
  const Confetti = () => (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {Array(50).fill(0).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full"
          style={{
            backgroundColor: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ff8800', '#8800ff'][i % 8],
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
            delay: Math.random() * 0.5
          }}
        />
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
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-6 sm:p-8 text-white"
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSI0Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
        
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
          <motion.div
            animate={{ 
              rotateY: [0, 360],
              rotateX: [0, 15, 0, -15, 0]
            }}
            transition={{ 
              rotateY: { duration: 8, repeat: Infinity, ease: "linear" },
              rotateX: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
            className="text-7xl sm:text-8xl"
            style={{ transformStyle: "preserve-3d" }}
          >
            🎲
          </motion.div>
          
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-4xl font-bold mb-2">3D Zar Atma & Şans Oyunları</h1>
            <p className="text-white/80 text-sm sm:text-lg max-w-2xl">
              Gerçekçi 3D animasyonlu zar atma, yazı-tura, kart çekme ve çarkıfelek. 
              Eğlenceli ses efektleri ve kutlama animasyonları ile şansınızı deneyin!
            </p>
            <div className="flex flex-wrap gap-2 mt-4 justify-center sm:justify-start">
              <Badge className="bg-white/20 hover:bg-white/30 text-white">🎲 3D Zar</Badge>
              <Badge className="bg-white/20 hover:bg-white/30 text-white">🪙 Yazı Tura</Badge>
              <Badge className="bg-white/20 hover:bg-white/30 text-white">🃏 Kart Çek</Badge>
              <Badge className="bg-white/20 hover:bg-white/30 text-white">🎡 Çarkıfelek</Badge>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Confetti Effect */}
      <AnimatePresence>
        {showConfetti && <Confetti />}
      </AnimatePresence>

      <Tabs defaultValue="dice" className="w-full">
        <TabsList className="grid w-full grid-cols-4 h-auto p-1">
          <TabsTrigger value="dice" className="text-xs sm:text-sm py-2 sm:py-3 gap-1 sm:gap-2">
            <span className="hidden sm:inline">🎲</span> Zar
          </TabsTrigger>
          <TabsTrigger value="coin" className="text-xs sm:text-sm py-2 sm:py-3 gap-1 sm:gap-2">
            <span className="hidden sm:inline">🪙</span> Yazı Tura
          </TabsTrigger>
          <TabsTrigger value="card" className="text-xs sm:text-sm py-2 sm:py-3 gap-1 sm:gap-2">
            <span className="hidden sm:inline">🃏</span> Kart
          </TabsTrigger>
          <TabsTrigger value="wheel" className="text-xs sm:text-sm py-2 sm:py-3 gap-1 sm:gap-2">
            <span className="hidden sm:inline">🎡</span> Çark
          </TabsTrigger>
        </TabsList>

        {/* Dice Tab */}
        <TabsContent value="dice" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Dice Area */}
            <Card className="lg:col-span-2 border-2 border-indigo-100">
              <CardContent className="pt-6 sm:pt-8 pb-6 sm:pb-8">
                <div className="flex flex-col items-center space-y-6 sm:space-y-8">
                  {/* Settings Bar */}
                  <div className="w-full flex flex-wrap items-center justify-center gap-2 sm:gap-4">
                    <div className="flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-2">
                      <span className="text-xs sm:text-sm font-medium">Zar Sayısı:</span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5, 6].map(n => (
                          <Button
                            key={n}
                            size="sm"
                            variant={diceCount === n ? "default" : "ghost"}
                            className="w-7 h-7 sm:w-8 sm:h-8 p-0 text-xs sm:text-sm"
                            onClick={() => setDiceCount(n)}
                          >
                            {n}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <Button
                      size="sm"
                      variant={soundEnabled ? "default" : "outline"}
                      onClick={() => setSoundEnabled(!soundEnabled)}
                      className="gap-1"
                    >
                      {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                      <span className="hidden sm:inline">Ses</span>
                    </Button>
                    
                    <Button
                      size="sm"
                      variant={quickMode ? "default" : "outline"}
                      onClick={() => setQuickMode(!quickMode)}
                      className="gap-1"
                    >
                      <Zap className="h-4 w-4" />
                      <span className="hidden sm:inline">Hızlı</span>
                    </Button>
                  </div>

                  {/* Theme Selector */}
                  <div className="flex flex-wrap justify-center gap-2">
                    {diceThemes.map(theme => (
                      <button
                        key={theme.id}
                        onClick={() => setSelectedTheme(theme)}
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br ${theme.bg} ${selectedTheme.id === theme.id ? 'ring-2 ring-offset-2 ring-indigo-500' : ''} transition-all hover:scale-110`}
                        title={theme.name}
                      />
                    ))}
                  </div>

                  {/* Dice Display Area */}
                  <div 
                    className="relative min-h-[180px] sm:min-h-[220px] w-full flex items-center justify-center"
                    style={{ perspective: "1000px" }}
                  >
                    <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                      {diceRolling ? (
                        // Animating dice during roll
                        Array(diceCount).fill(0).map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ y: -100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            {renderDiceFace(animatingDice[i] || 1, diceCount > 3 ? "md" : "lg", true)}
                          </motion.div>
                        ))
                      ) : diceResults.length > 0 ? (
                        // Show results
                        diceResults.map((result, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0, rotateY: 180 }}
                            animate={{ scale: 1, rotateY: 0 }}
                            transition={{ 
                              type: "spring", 
                              stiffness: 200, 
                              delay: i * 0.1,
                              damping: 15
                            }}
                          >
                            {renderDiceFace(result, diceCount > 3 ? "md" : "lg")}
                          </motion.div>
                        ))
                      ) : (
                        // Initial state
                        Array(diceCount).fill(0).map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            animate={{ 
                              opacity: 1,
                              y: [0, -5, 0]
                            }}
                            transition={{
                              opacity: { duration: 0.3, delay: i * 0.1 },
                              y: { duration: 2, repeat: Infinity, delay: i * 0.2 }
                            }}
                          >
                            {renderDiceFace(i + 1, diceCount > 3 ? "md" : "lg")}
                          </motion.div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Roll Button */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      size="lg" 
                      onClick={rollDice} 
                      disabled={diceRolling}
                      className="w-48 sm:w-56 h-12 sm:h-14 text-base sm:text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg"
                    >
                      {diceRolling ? (
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                        >
                          🎲
                        </motion.span>
                      ) : (
                        <>
                          <Sparkles className="h-5 w-5 mr-2" />
                          Zar At!
                        </>
                      )}
                    </Button>
                  </motion.div>

                  {/* Result Display */}
                  <AnimatePresence>
                    {diceResult !== null && !diceRolling && (
                      <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="relative"
                      >
                        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-4 sm:p-6 border-2 border-indigo-200 shadow-lg">
                          <div className="flex items-center justify-center gap-3 sm:gap-4">
                            <PartyPopper className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-600" />
                            <div className="text-center">
                              <p className="text-xs sm:text-sm text-indigo-600 font-medium">
                                {successMessages[Math.floor(Math.random() * successMessages.length)]}
                              </p>
                              <p className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                {diceResult}
                              </p>
                              {diceCount > 1 && (
                                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                                  ({diceResults.join(" + ")})
                                </p>
                              )}
                            </div>
                            <PartyPopper className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>

            {/* Stats & Features Panel */}
            <div className="space-y-4">
              {/* Stats Card */}
              <Card className="border-2 border-amber-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-amber-500" />
                    İstatistikler
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-amber-50 rounded-lg">
                    <span className="text-xs sm:text-sm text-slate-600">Toplam Atış</span>
                    <Badge variant="secondary" className="text-base sm:text-lg font-bold">{totalRolls}</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <span className="text-xs sm:text-sm text-slate-600 flex items-center gap-1">
                      <Flame className="h-4 w-4 text-orange-500" />
                      Seri
                    </span>
                    <Badge className="bg-orange-500 text-base sm:text-lg font-bold">{streak}</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <span className="text-xs sm:text-sm text-slate-600 flex items-center gap-1">
                      <Crown className="h-4 w-4 text-yellow-500" />
                      En İyi Seri
                    </span>
                    <Badge className="bg-yellow-500 text-base sm:text-lg font-bold">{bestStreak}</Badge>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={resetStats}
                    className="w-full mt-2 gap-2"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Sıfırla
                  </Button>
                </CardContent>
              </Card>

              {/* Target Number */}
              <Card className="border-2 border-emerald-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                    <Target className="h-5 w-5 text-emerald-500" />
                    Hedef Sayı
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 mb-3">
                    {[1, 2, 3, 4, 5, 6].map(n => (
                      <Button
                        key={n}
                        size="sm"
                        variant={targetNumber === n ? "default" : "outline"}
                        className={`flex-1 ${targetNumber === n ? 'bg-emerald-500 hover:bg-emerald-600' : ''}`}
                        onClick={() => setTargetNumber(targetNumber === n ? null : n)}
                      >
                        {n}
                      </Button>
                    ))}
                  </div>
                  {targetNumber && (
                    <div className="text-center p-3 bg-emerald-50 rounded-lg">
                      <p className="text-xs sm:text-sm text-emerald-700">
                        <Star className="h-4 w-4 inline mr-1" />
                        {targetNumber} geldi: <span className="font-bold text-lg">{targetHits}</span> kez
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* History */}
              <Card className="border-2 border-slate-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                    <History className="h-5 w-5 text-slate-500" />
                    Son Atışlar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="max-h-48 overflow-y-auto space-y-2">
                    {rollHistory.length === 0 ? (
                      <p className="text-xs sm:text-sm text-slate-400 text-center py-4">
                        Henüz atış yapılmadı
                      </p>
                    ) : (
                      rollHistory.map((roll, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center justify-between p-2 bg-slate-50 rounded-lg text-xs sm:text-sm"
                        >
                          <span className="text-slate-400">{roll.time}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-slate-600">{roll.results.join(", ")}</span>
                            <Badge variant="secondary">{roll.total}</Badge>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Coin Flip */}
        <TabsContent value="coin" className="space-y-6">
          <Card className="border-2 border-yellow-100">
            <CardContent className="pt-8 sm:pt-12 pb-8 sm:pb-12">
              <div className="flex flex-col items-center space-y-6 sm:space-y-8">
                <motion.div
                  className="relative w-32 h-32 sm:w-40 sm:h-40"
                  animate={coinFlipping ? {
                    rotateY: [0, 1800],
                    y: [0, -50, 0, -30, 0]
                  } : {}}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Coin glow effect */}
                  <div className="absolute inset-0 rounded-full bg-yellow-400/50 blur-xl animate-pulse" />
                  
                  <div className="relative w-full h-full rounded-full bg-gradient-to-br from-yellow-300 via-yellow-400 to-amber-500 shadow-2xl flex items-center justify-center border-4 sm:border-8 border-yellow-200">
                    {/* Coin shine effect */}
                    <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-white/40 via-transparent to-transparent" />
                    
                    {coinResult && !coinFlipping && (
                      <motion.div
                        initial={{ scale: 0, rotateY: 180 }}
                        animate={{ scale: 1, rotateY: 0 }}
                        className="text-center"
                      >
                        <span className="text-4xl sm:text-5xl font-bold text-amber-800 drop-shadow-lg">
                          {coinResult === "Yazı" ? "Y" : "T"}
                        </span>
                        <p className="text-xs text-amber-700 font-medium mt-1">{coinResult}</p>
                      </motion.div>
                    )}
                    {!coinResult && !coinFlipping && (
                      <div className="text-center">
                        <span className="text-4xl sm:text-5xl">🪙</span>
                      </div>
                    )}
                  </div>
                </motion.div>

                <div className="flex flex-wrap gap-2 justify-center">
                  {["TRY", "USD", "EUR", "GBP"].map(currency => (
                    <Button
                      key={currency}
                      size="sm"
                      variant={coinCurrency === currency ? "default" : "outline"}
                      onClick={() => setCoinCurrency(currency)}
                      className={coinCurrency === currency ? "bg-yellow-500 hover:bg-yellow-600" : ""}
                    >
                      {currency === "TRY" && "₺ TRY"}
                      {currency === "USD" && "$ USD"}
                      {currency === "EUR" && "€ EUR"}
                      {currency === "GBP" && "£ GBP"}
                    </Button>
                  ))}
                </div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    size="lg" 
                    onClick={flipCoin} 
                    disabled={coinFlipping} 
                    className="w-48 sm:w-56 h-12 sm:h-14 text-base sm:text-lg font-bold bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 shadow-lg"
                  >
                    {coinFlipping ? (
                      <motion.span animate={{ rotateY: 360 }} transition={{ duration: 0.3, repeat: Infinity }}>
                        🪙
                      </motion.span>
                    ) : (
                      <>🪙 Para At!</>
                    )}
                  </Button>
                </motion.div>

                <AnimatePresence>
                  {coinResult && !coinFlipping && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl p-4 sm:p-6 border-2 border-yellow-200 shadow-lg"
                    >
                      <div className="flex items-center justify-center gap-3 sm:gap-4">
                        <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-600" />
                        <div className="text-center">
                          <p className="text-xs sm:text-sm text-yellow-600 font-medium">Sonuç</p>
                          <p className="text-3xl sm:text-5xl font-bold text-amber-600">
                            {coinResult}
                          </p>
                        </div>
                        <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-amber-600" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Card Draw */}
        <TabsContent value="card" className="space-y-6">
          <Card className="border-2 border-slate-100">
            <CardContent className="pt-8 sm:pt-12 pb-8 sm:pb-12">
              <div className="flex flex-col items-center space-y-6 sm:space-y-8">
                <motion.div
                  className="relative w-40 h-56 sm:w-48 sm:h-72"
                  animate={cardDrawing ? {
                    rotateY: [0, 180, 360],
                    y: [0, -50, 0],
                    scale: [1, 1.1, 1]
                  } : {}}
                  transition={{ duration: 1, ease: "easeOut" }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Card shadow */}
                  <div className="absolute inset-0 translate-y-2 bg-black/20 rounded-2xl blur-lg" />
                  
                  <div className="relative w-full h-full bg-white rounded-2xl shadow-2xl flex items-center justify-center border-4 border-slate-200 overflow-hidden">
                    {/* Card pattern background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100" />
                    
                    {cardResult && !cardDrawing && (
                      <motion.div
                        initial={{ scale: 0, rotateY: 180 }}
                        animate={{ scale: 1, rotateY: 0 }}
                        className="relative z-10 text-center"
                      >
                        <span 
                          className="text-6xl sm:text-8xl font-bold"
                          style={{
                            color: cardResult.includes("♥️") || cardResult.includes("♦️") 
                              ? "#dc2626" 
                              : "#1e293b"
                          }}
                        >
                          {cardResult}
                        </span>
                      </motion.div>
                    )}
                    {!cardResult && !cardDrawing && (
                      <div className="relative z-10 text-center">
                        <div className="w-32 h-44 sm:w-40 sm:h-56 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
                          <div className="text-white text-4xl sm:text-6xl">🃏</div>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    size="lg" 
                    onClick={drawCard} 
                    disabled={cardDrawing}
                    className="w-48 sm:w-56 h-12 sm:h-14 text-base sm:text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg"
                  >
                    {cardDrawing ? (
                      <motion.span animate={{ rotateY: 360 }} transition={{ duration: 0.3, repeat: Infinity }}>
                        🃏
                      </motion.span>
                    ) : (
                      <>🃏 Kart Çek!</>
                    )}
                  </Button>
                </motion.div>

                <AnimatePresence>
                  {cardResult && !cardDrawing && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-4 sm:p-6 border-2 border-slate-200 shadow-lg"
                    >
                      <p className="text-lg sm:text-xl text-center text-slate-900">
                        Çekilen Kart: <span className="font-bold text-2xl sm:text-3xl">{cardResult}</span>
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Wheel */}
        <TabsContent value="wheel" className="space-y-6">
          <Card className="border-2 border-purple-100">
            <CardContent className="pt-8 sm:pt-12 pb-8 sm:pb-12">
              <div className="flex flex-col items-center space-y-6 sm:space-y-8">
                <div className="relative">
                  {/* Pointer */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-20">
                    <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-t-[20px] border-l-transparent border-r-transparent border-t-red-600 drop-shadow-lg" />
                  </div>
                  
                  <motion.div
                    className="relative w-56 h-56 sm:w-72 sm:h-72"
                    animate={wheelSpinning ? {
                      rotate: [0, 1800 + Math.random() * 720]
                    } : {}}
                    transition={{ duration: 3, ease: "easeOut" }}
                  >
                    {/* Wheel glow */}
                    <div className="absolute inset-0 rounded-full bg-purple-400/30 blur-xl" />
                    
                    <div className="relative w-full h-full rounded-full shadow-2xl border-4 sm:border-8 border-white overflow-hidden">
                      {/* Wheel segments */}
                      {wheelOptions.map((option, index) => {
                        const colors = [
                          "from-pink-500 to-rose-500",
                          "from-purple-500 to-violet-500",
                          "from-blue-500 to-cyan-500",
                          "from-emerald-500 to-green-500",
                          "from-yellow-500 to-orange-500",
                          "from-red-500 to-pink-500",
                          "from-indigo-500 to-purple-500",
                          "from-teal-500 to-cyan-500"
                        ]
                        const angle = (360 / wheelOptions.length) * index
                        const skewAngle = 90 - (360 / wheelOptions.length)
                        
                        return (
                          <div
                            key={index}
                            className={`absolute w-1/2 h-1/2 origin-bottom-right bg-gradient-to-r ${colors[index % colors.length]}`}
                            style={{
                              transform: `rotate(${angle}deg) skewY(${skewAngle}deg)`,
                              transformOrigin: "100% 100%",
                              left: 0,
                              top: 0
                            }}
                          />
                        )
                      })}
                      
                      {/* Center circle */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white shadow-lg flex items-center justify-center">
                          {wheelResult && !wheelSpinning ? (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="text-xs sm:text-sm font-bold text-center text-purple-600 px-2"
                            >
                              {wheelResult}
                            </motion.span>
                          ) : (
                            <span className="text-2xl sm:text-3xl">🎡</span>
                          )}
                        </div>
                      </div>
                      
                      {/* Segment dividers */}
                      {wheelOptions.map((_, index) => (
                        <div
                          key={index}
                          className="absolute w-full h-0.5 bg-white/50 origin-left"
                          style={{
                            transform: `rotate(${(360 / wheelOptions.length) * index}deg)`,
                            left: "50%",
                            top: "50%"
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                </div>

                <div className="w-full max-w-md space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Yeni seçenek ekle..."
                      value={newOption}
                      onChange={(e) => setNewOption(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addWheelOption()}
                      className="text-sm sm:text-base"
                    />
                    <Button onClick={addWheelOption} className="bg-purple-600 hover:bg-purple-700">Ekle</Button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                    {wheelOptions.map((option, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center justify-between bg-slate-100 rounded-lg p-2 sm:p-3"
                      >
                        <span className="text-xs sm:text-sm font-medium truncate">{option}</span>
                        <button
                          onClick={() => removeWheelOption(index)}
                          className="text-red-600 hover:text-red-800 ml-2"
                        >
                          ✕
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    size="lg" 
                    onClick={spinWheel} 
                    disabled={wheelSpinning || wheelOptions.length === 0}
                    className="w-48 sm:w-56 h-12 sm:h-14 text-base sm:text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg"
                  >
                    {wheelSpinning ? (
                      <motion.span animate={{ rotate: 360 }} transition={{ duration: 0.5, repeat: Infinity }}>
                        🎡
                      </motion.span>
                    ) : (
                      <>🎡 Çarkı Çevir!</>
                    )}
                  </Button>
                </motion.div>

                <AnimatePresence>
                  {wheelResult && !wheelSpinning && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 sm:p-6 border-2 border-purple-200 shadow-lg"
                    >
                      <div className="flex items-center justify-center gap-3 sm:gap-4">
                        <PartyPopper className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
                        <div className="text-center">
                          <p className="text-xs sm:text-sm text-purple-600 font-medium">Kazanan</p>
                          <p className="text-xl sm:text-3xl font-bold text-purple-700">
                            {wheelResult}
                          </p>
                        </div>
                        <PartyPopper className="h-6 w-6 sm:h-8 sm:w-8 text-pink-600" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Educational Section */}
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-2 border-indigo-100">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Target className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-bold mb-2">Olasılık Bilgisi</h3>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-1">
                  <li>• Zarda her sayı: %16.67</li>
                  <li>• Yazı-Tura: %50 - %50</li>
                  <li>• Kart çekme: 52 olasılık</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-amber-100">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <History className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-bold mb-2">Tarihçe</h3>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-1">
                  <li>• İlk zar: MÖ 3000</li>
                  <li>• Antik Mısır'da popüler</li>
                  <li>• Roma'da kumar aracı</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-emerald-100">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Sparkles className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-bold mb-2">Kullanım Alanları</h3>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-1">
                  <li>• Masa oyunları</li>
                  <li>• Karar verme</li>
                  <li>• Eğlence & parti</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-purple-100">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Star className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold mb-2">İlginç Bilgiler</h3>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-1">
                  <li>• 6 = en şanslı sayı 🍀</li>
                  <li>• Yakan top: 2 zar ile</li>
                  <li>• D20: Rol yapma zarı</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
