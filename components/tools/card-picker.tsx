"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Home, Volume2, VolumeX, Trophy, RotateCcw, History, Sparkles, 
  PartyPopper, Star, Shuffle, Crown, Medal, Info, Lightbulb,
  Zap, Target, Gift, Heart, Diamond, Club, Spade
} from "lucide-react"
import Link from "next/link"

// Kart tipleri
const suits = [
  { id: "spades", symbol: "♠", name: "Maça", color: "#1e293b", icon: Spade },
  { id: "hearts", symbol: "♥", name: "Kupa", color: "#dc2626", icon: Heart },
  { id: "diamonds", symbol: "♦", name: "Karo", color: "#dc2626", icon: Diamond },
  { id: "clubs", symbol: "♣", name: "Sinek", color: "#1e293b", icon: Club }
]

const values = [
  { id: "A", name: "As", value: 1 },
  { id: "2", name: "2", value: 2 },
  { id: "3", name: "3", value: 3 },
  { id: "4", name: "4", value: 4 },
  { id: "5", name: "5", value: 5 },
  { id: "6", name: "6", value: 6 },
  { id: "7", name: "7", value: 7 },
  { id: "8", name: "8", value: 8 },
  { id: "9", name: "9", value: 9 },
  { id: "10", name: "10", value: 10 },
  { id: "J", name: "Vale", value: 11 },
  { id: "Q", name: "Kız", value: 12 },
  { id: "K", name: "Papaz", value: 13 }
]

// Kart arka yüz desenleri
const cardBackPatterns = [
  { id: "classic", name: "Klasik", color: "from-blue-700 to-blue-900", pattern: "diamonds" },
  { id: "royal", name: "Kraliyet", color: "from-purple-700 to-purple-900", pattern: "crown" },
  { id: "casino", name: "Casino", color: "from-red-700 to-red-900", pattern: "chips" },
  { id: "emerald", name: "Zümrüt", color: "from-emerald-700 to-emerald-900", pattern: "clover" },
  { id: "gold", name: "Altın", color: "from-amber-600 to-amber-800", pattern: "star" },
  { id: "midnight", name: "Gece", color: "from-slate-800 to-slate-950", pattern: "moon" }
]

// Özel kart kombinasyonları
const specialCombos = {
  "blackjack": { name: "Blackjack! 🎰", description: "As + 10/J/Q/K", condition: (cards: CardType[]) => {
    if (cards.length < 2) return false
    const last2 = cards.slice(-2)
    const hasAce = last2.some(c => c.value.id === "A")
    const hasTen = last2.some(c => ["10", "J", "Q", "K"].includes(c.value.id))
    return hasAce && hasTen
  }},
  "pair": { name: "Çift! 👯", description: "Aynı değer", condition: (cards: CardType[]) => {
    if (cards.length < 2) return false
    return cards[cards.length - 1].value.id === cards[cards.length - 2].value.id
  }},
  "flush": { name: "Flush! 🌊", description: "Aynı renk 3 kart", condition: (cards: CardType[]) => {
    if (cards.length < 3) return false
    const last3 = cards.slice(-3)
    return last3.every(c => c.suit.color === last3[0].suit.color)
  }},
  "straight": { name: "Sıralı! 📈", description: "Ardışık 3 kart", condition: (cards: CardType[]) => {
    if (cards.length < 3) return false
    const last3 = cards.slice(-3).map(c => c.value.value).sort((a, b) => a - b)
    return last3[2] - last3[1] === 1 && last3[1] - last3[0] === 1
  }},
  "royalCard": { name: "Asalet! 👑", description: "J, Q veya K", condition: (cards: CardType[]) => {
    if (cards.length < 1) return false
    return ["J", "Q", "K"].includes(cards[cards.length - 1].value.id)
  }},
  "luckyAce": { name: "Şanslı As! 🍀", description: "As çektiniz", condition: (cards: CardType[]) => {
    if (cards.length < 1) return false
    return cards[cards.length - 1].value.id === "A"
  }}
}

interface CardType {
  suit: typeof suits[0]
  value: typeof values[0]
  id: string
}

// Başarı mesajları
const drawMessages = [
  "Harika çekiş! ✨",
  "Şanslı gün! 🍀",
  "Bakalım ne geldi! 🎯",
  "İşte kartınız! 🎴",
  "Kader konuştu! 🔮"
]

export function CardPicker() {
  const [drawnCards, setDrawnCards] = useState<CardType[]>([])
  const [currentCard, setCurrentCard] = useState<CardType | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [isFlipped, setIsFlipped] = useState(false)
  const [deck, setDeck] = useState<CardType[]>(() => createDeck())
  const [history, setHistory] = useState<{ card: CardType; time: string }[]>([])
  const [totalDraws, setTotalDraws] = useState(0)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [selectedPattern, setSelectedPattern] = useState(cardBackPatterns[0])
  const [showConfetti, setShowConfetti] = useState(false)
  const [lastCombo, setLastCombo] = useState<string | null>(null)
  const [stats, setStats] = useState<Record<string, number>>({
    spades: 0, hearts: 0, diamonds: 0, clubs: 0,
    aces: 0, royals: 0
  })
  const [multiDraw, setMultiDraw] = useState(1)

  // Deste oluştur
  function createDeck(): CardType[] {
    const newDeck: CardType[] = []
    suits.forEach(suit => {
      values.forEach(value => {
        newDeck.push({ suit, value, id: `${value.id}-${suit.id}` })
      })
    })
    return shuffleDeck(newDeck)
  }

  // Desteyi karıştır
  function shuffleDeck(cards: CardType[]): CardType[] {
    const shuffled = [...cards]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  // Ses efektleri
  const playDrawSound = useCallback(() => {
    if (!soundEnabled) return
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      
      // Kart çekme sesi
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.setValueAtTime(300, audioContext.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.1)
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)
      
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.2)
    } catch (e) {}
  }, [soundEnabled])

  const playFlipSound = useCallback(() => {
    if (!soundEnabled) return
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.05)
      gainNode.gain.setValueAtTime(0.15, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
      
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.1)
    } catch (e) {}
  }, [soundEnabled])

  const playComboSound = useCallback(() => {
    if (!soundEnabled) return
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const notes = [523, 659, 784, 1047]
      
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
    } catch (e) {}
  }, [soundEnabled])

  // Kart çek
  const drawCard = useCallback(() => {
    if (isDrawing || deck.length === 0) return
    
    setIsDrawing(true)
    setIsFlipped(false)
    setLastCombo(null)
    playDrawSound()
    
    // Kartı çek
    const card = deck[0]
    const newDeck = deck.slice(1)
    
    setTimeout(() => {
      playFlipSound()
      setIsFlipped(true)
      setCurrentCard(card)
      setDeck(newDeck)
      setDrawnCards(prev => [...prev, card])
      setTotalDraws(prev => prev + 1)
      
      // İstatistikleri güncelle
      setStats(prev => ({
        ...prev,
        [card.suit.id]: prev[card.suit.id] + 1,
        aces: card.value.id === "A" ? prev.aces + 1 : prev.aces,
        royals: ["J", "Q", "K"].includes(card.value.id) ? prev.royals + 1 : prev.royals
      }))
      
      // Geçmişe ekle
      const now = new Date()
      const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
      setHistory(prev => [{ card, time: timeString }, ...prev].slice(0, 20))
      
      // Kombolar kontrol et
      const allCards = [...drawnCards, card]
      for (const [key, combo] of Object.entries(specialCombos)) {
        if (combo.condition(allCards)) {
          setLastCombo(key)
          setShowConfetti(true)
          playComboSound()
          setTimeout(() => setShowConfetti(false), 2500)
          break
        }
      }
      
      setTimeout(() => setIsDrawing(false), 300)
    }, 600)
  }, [deck, isDrawing, drawnCards, playDrawSound, playFlipSound, playComboSound])

  // Desteyi sıfırla
  const resetDeck = () => {
    setDeck(createDeck())
    setDrawnCards([])
    setCurrentCard(null)
    setIsFlipped(false)
    setLastCombo(null)
  }

  // Tüm istatistikleri sıfırla
  const resetAll = () => {
    resetDeck()
    setHistory([])
    setTotalDraws(0)
    setStats({ spades: 0, hearts: 0, diamonds: 0, clubs: 0, aces: 0, royals: 0 })
  }

  // Kart render
  const renderCard = (card: CardType | null, isBack: boolean = false, size: "sm" | "md" | "lg" = "lg") => {
    const sizeClasses = {
      sm: "w-16 h-24",
      md: "w-24 h-36",
      lg: "w-40 h-56 sm:w-48 sm:h-72"
    }
    
    if (isBack || !card) {
      return (
        <div className={`${sizeClasses[size]} rounded-xl bg-gradient-to-br ${selectedPattern.color} shadow-2xl border-4 border-white relative overflow-hidden`}>
          {/* Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)`
            }} />
          </div>
          {/* Center emblem */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/10 flex items-center justify-center">
              <span className="text-3xl sm:text-4xl">🎴</span>
            </div>
          </div>
          {/* Corner decorations */}
          <div className="absolute top-2 left-2 text-white/30 text-xl">♠</div>
          <div className="absolute bottom-2 right-2 text-white/30 text-xl rotate-180">♠</div>
        </div>
      )
    }
    
    const isRed = card.suit.color === "#dc2626"
    const isRoyal = ["J", "Q", "K"].includes(card.value.id)
    
    return (
      <div className={`${sizeClasses[size]} rounded-xl bg-white shadow-2xl border-4 border-slate-200 relative overflow-hidden`}>
        {/* Top left corner */}
        <div className="absolute top-2 left-2 text-center">
          <div className={`text-lg sm:text-xl font-bold ${isRed ? 'text-red-600' : 'text-slate-800'}`}>
            {card.value.id}
          </div>
          <div className={`text-lg sm:text-xl ${isRed ? 'text-red-600' : 'text-slate-800'}`}>
            {card.suit.symbol}
          </div>
        </div>
        
        {/* Center */}
        <div className="absolute inset-0 flex items-center justify-center">
          {isRoyal ? (
            <div className="text-center">
              <span className="text-5xl sm:text-6xl">
                {card.value.id === "J" ? "🤴" : card.value.id === "Q" ? "👸" : "🤴"}
              </span>
              <div className={`text-3xl sm:text-4xl mt-1 ${isRed ? 'text-red-600' : 'text-slate-800'}`}>
                {card.suit.symbol}
              </div>
            </div>
          ) : card.value.id === "A" ? (
            <div className={`text-7xl sm:text-8xl ${isRed ? 'text-red-600' : 'text-slate-800'}`}>
              {card.suit.symbol}
            </div>
          ) : (
            <div className={`text-5xl sm:text-6xl font-bold ${isRed ? 'text-red-600' : 'text-slate-800'}`}>
              {card.suit.symbol}
            </div>
          )}
        </div>
        
        {/* Bottom right corner (rotated) */}
        <div className="absolute bottom-2 right-2 text-center rotate-180">
          <div className={`text-lg sm:text-xl font-bold ${isRed ? 'text-red-600' : 'text-slate-800'}`}>
            {card.value.id}
          </div>
          <div className={`text-lg sm:text-xl ${isRed ? 'text-red-600' : 'text-slate-800'}`}>
            {card.suit.symbol}
          </div>
        </div>
        
        {/* Shine effect */}
        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/50 to-transparent" />
      </div>
    )
  }

  // Confetti
  const Confetti = () => (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {Array(50).fill(0).map((_, i) => (
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
          {["♠", "♥", "♦", "♣", "🎴", "✨", "⭐", "🃏"][i % 8]}
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
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800 via-slate-900 to-black p-6 sm:p-8 text-white"
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNCIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        
        {/* Decorative cards */}
        <motion.div 
          className="absolute top-4 right-10 text-4xl sm:text-5xl opacity-20"
          animate={{ rotate: [0, 10, 0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          🃏
        </motion.div>
        <motion.div 
          className="absolute bottom-4 left-10 text-3xl sm:text-4xl opacity-20"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🎴
        </motion.div>
        
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
          <motion.div
            className="flex gap-2"
            animate={{ rotateY: [0, 10, 0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="text-5xl sm:text-6xl">♠</span>
            <span className="text-5xl sm:text-6xl text-red-500">♥</span>
            <span className="text-5xl sm:text-6xl text-red-500">♦</span>
            <span className="text-5xl sm:text-6xl">♣</span>
          </motion.div>
          
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-4xl font-bold mb-2">3D Kart Çekme</h1>
            <p className="text-white/70 text-sm sm:text-lg max-w-2xl">
              52 kartlık desteden şansınızı deneyin! 3D çevirme animasyonları,
              özel kombinasyonlar ve detaylı istatistiklerle eğlenceli kart deneyimi.
            </p>
            <div className="flex flex-wrap gap-2 mt-4 justify-center sm:justify-start">
              <Badge className="bg-white/20 hover:bg-white/30 text-white">🎴 52 Kart</Badge>
              <Badge className="bg-white/20 hover:bg-white/30 text-white">🎰 Özel Kombolar</Badge>
              <Badge className="bg-white/20 hover:bg-white/30 text-white">📊 İstatistikler</Badge>
              <Badge className="bg-white/20 hover:bg-white/30 text-white">🎨 6 Desen</Badge>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Confetti */}
      <AnimatePresence>
        {showConfetti && <Confetti />}
      </AnimatePresence>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Card Area */}
        <Card className="lg:col-span-2 border-2 border-slate-200">
          <CardContent className="pt-6 sm:pt-8 pb-6 sm:pb-8">
            <div className="flex flex-col items-center space-y-6">
              
              {/* Deck Info */}
              <div className="flex items-center gap-4 text-sm">
                <Badge variant="outline" className="gap-1">
                  🎴 Destede: {deck.length} kart
                </Badge>
                <Badge variant="outline" className="gap-1">
                  ✓ Çekilen: {drawnCards.length} kart
                </Badge>
              </div>

              {/* Card Back Pattern Selector */}
              <div className="flex flex-wrap justify-center gap-2">
                {cardBackPatterns.map(pattern => (
                  <button
                    key={pattern.id}
                    onClick={() => setSelectedPattern(pattern)}
                    className={`w-10 h-14 sm:w-12 sm:h-16 rounded-lg bg-gradient-to-br ${pattern.color} border-2 transition-all hover:scale-105 ${
                      selectedPattern.id === pattern.id ? 'ring-2 ring-offset-2 ring-blue-500 border-white' : 'border-white/50'
                    }`}
                    title={pattern.name}
                  >
                    <span className="text-white/50 text-xs">🎴</span>
                  </button>
                ))}
              </div>

              {/* Card Display Area */}
              <div 
                className="relative h-72 sm:h-80 w-full flex items-center justify-center"
                style={{ perspective: "1000px" }}
              >
                {/* Deck stack */}
                <div className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2">
                  {[...Array(Math.min(5, deck.length))].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{ 
                        transform: `translateX(${i * 2}px) translateY(${i * 2}px)`,
                        zIndex: 5 - i
                      }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      {renderCard(null, true, "md")}
                    </motion.div>
                  ))}
                </div>

                {/* Main card area */}
                <motion.div
                  className="relative"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <motion.div
                    animate={{
                      rotateY: isFlipped ? 180 : 0,
                      x: isDrawing && !isFlipped ? [-200, 0] : 0,
                      scale: isDrawing ? [0.8, 1] : 1
                    }}
                    transition={{ 
                      duration: 0.6,
                      type: "spring",
                      stiffness: 100
                    }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Card Back */}
                    <motion.div
                      className="absolute"
                      style={{ 
                        backfaceVisibility: "hidden",
                        transform: "rotateY(0deg)"
                      }}
                    >
                      {renderCard(null, true, "lg")}
                    </motion.div>
                    
                    {/* Card Front */}
                    <motion.div
                      style={{ 
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)"
                      }}
                    >
                      {currentCard && renderCard(currentCard, false, "lg")}
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>

              {/* Combo Display */}
              <AnimatePresence>
                {lastCombo && specialCombos[lastCombo as keyof typeof specialCombos] && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: -20 }}
                    className="bg-gradient-to-r from-amber-100 to-yellow-100 rounded-xl p-4 border-2 border-amber-300"
                  >
                    <div className="flex items-center gap-3">
                      <Crown className="h-6 w-6 text-amber-600" />
                      <div>
                        <p className="font-bold text-amber-800">
                          {specialCombos[lastCombo as keyof typeof specialCombos].name}
                        </p>
                        <p className="text-xs text-amber-600">
                          {specialCombos[lastCombo as keyof typeof specialCombos].description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Draw Button */}
              <div className="flex flex-col sm:flex-row gap-3 items-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    onClick={drawCard}
                    disabled={isDrawing || deck.length === 0}
                    className="w-56 h-14 text-lg font-bold bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-black shadow-lg"
                  >
                    {isDrawing ? (
                      <motion.span
                        animate={{ rotateY: 360 }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                      >
                        🎴
                      </motion.span>
                    ) : deck.length === 0 ? (
                      "Deste Bitti"
                    ) : (
                      <>
                        <Sparkles className="h-5 w-5 mr-2" />
                        Kart Çek!
                      </>
                    )}
                  </Button>
                </motion.div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={resetDeck}
                    className="gap-2"
                  >
                    <Shuffle className="h-4 w-4" />
                    Karıştır
                  </Button>
                  <Button
                    variant={soundEnabled ? "default" : "outline"}
                    size="icon"
                    onClick={() => setSoundEnabled(!soundEnabled)}
                  >
                    {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Result Display */}
              <AnimatePresence>
                {currentCard && isFlipped && !isDrawing && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-4 sm:p-6 border-2 border-slate-200"
                  >
                    <div className="flex items-center gap-4">
                      <span className={`text-4xl ${currentCard.suit.color === "#dc2626" ? 'text-red-600' : 'text-slate-800'}`}>
                        {currentCard.suit.symbol}
                      </span>
                      <div>
                        <p className="text-sm text-slate-500">{drawMessages[totalDraws % drawMessages.length]}</p>
                        <p className="text-2xl font-bold text-slate-800">
                          {currentCard.value.name} {currentCard.suit.name}
                        </p>
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
                <Trophy className="h-5 w-5 text-amber-500" />
                İstatistikler
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center p-2 bg-amber-50 rounded-lg">
                <span className="text-sm text-slate-600">Toplam Çekiş</span>
                <Badge variant="secondary" className="font-bold">{totalDraws}</Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                {suits.map(suit => (
                  <div key={suit.id} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                    <span className={`text-lg ${suit.color === "#dc2626" ? 'text-red-600' : 'text-slate-800'}`}>
                      {suit.symbol}
                    </span>
                    <span className="font-medium text-slate-600">{stats[suit.id]}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between items-center p-2 bg-yellow-50 rounded-lg">
                <span className="text-sm text-slate-600 flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  As
                </span>
                <Badge className="bg-yellow-500">{stats.aces}</Badge>
              </div>
              
              <div className="flex justify-between items-center p-2 bg-purple-50 rounded-lg">
                <span className="text-sm text-slate-600 flex items-center gap-1">
                  <Crown className="h-4 w-4 text-purple-500" />
                  Asil (J/Q/K)
                </span>
                <Badge className="bg-purple-500">{stats.royals}</Badge>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={resetAll}
                className="w-full gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Tümünü Sıfırla
              </Button>
            </CardContent>
          </Card>

          {/* Drawn Cards */}
          <Card className="border-2 border-slate-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                <History className="h-5 w-5 text-slate-500" />
                Çekilen Kartlar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1 max-h-32 overflow-y-auto">
                {drawnCards.length === 0 ? (
                  <p className="text-sm text-slate-400 text-center w-full py-4">
                    Henüz kart çekilmedi
                  </p>
                ) : (
                  drawnCards.map((card, i) => (
                    <motion.div
                      key={card.id + i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={`w-8 h-10 rounded bg-white border flex items-center justify-center text-sm font-bold ${
                        card.suit.color === "#dc2626" ? 'text-red-600' : 'text-slate-800'
                      }`}
                    >
                      {card.value.id}{card.suit.symbol}
                    </motion.div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Combos Info */}
          <Card className="border-2 border-emerald-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                <Gift className="h-5 w-5 text-emerald-500" />
                Özel Kombolar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-xs sm:text-sm">
                {Object.entries(specialCombos).slice(0, 4).map(([key, combo]) => (
                  <div key={key} className="flex items-center gap-2 p-2 bg-emerald-50 rounded-lg">
                    <span className="font-medium">{combo.name.split(" ")[0]}</span>
                    <span className="text-slate-500">{combo.description}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Educational Section */}
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-2 border-slate-100">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-slate-100 rounded-lg">
                <Target className="h-5 w-5 text-slate-600" />
              </div>
              <div>
                <h3 className="font-bold mb-2">Kart Bilgisi</h3>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-1">
                  <li>• 52 kart, 4 simge</li>
                  <li>• Her simge 13 kart</li>
                  <li>• As en yüksek veya 1</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-red-100">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <Heart className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-bold mb-2">Simgeler</h3>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-1">
                  <li>♠ Maça (Siyah)</li>
                  <li>♥ Kupa (Kırmızı)</li>
                  <li>♦ Karo (Kırmızı)</li>
                  <li>♣ Sinek (Siyah)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-purple-100">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Crown className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold mb-2">Asil Kartlar</h3>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-1">
                  <li>J - Vale (Jack)</li>
                  <li>Q - Kız (Queen)</li>
                  <li>K - Papaz (King)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-amber-100">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <Lightbulb className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-bold mb-2">İlginç Bilgi</h3>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-1">
                  <li>• İlk kartlar: 9. yy Çin</li>
                  <li>• Avrupa: 14. yüzyıl</li>
                  <li>• 52 = Yılın haftaları</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
