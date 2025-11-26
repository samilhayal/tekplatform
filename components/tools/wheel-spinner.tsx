"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence, useAnimation } from "framer-motion"
import { 
  Home, Volume2, VolumeX, Trophy, RotateCcw, History, Sparkles, 
  PartyPopper, Star, Plus, Trash2, Palette, Settings, Gift, 
  Zap, Target, Crown, Medal, Shuffle, Download, Upload, Copy,
  Check, X, Edit2, Save, Lightbulb, HelpCircle, Info
} from "lucide-react"
import Link from "next/link"

// Preset renk temaları
const colorPresets = [
  { 
    id: "rainbow", 
    name: "Gökkuşağı", 
    colors: ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD", "#98D8C8", "#F7DC6F"]
  },
  { 
    id: "sunset", 
    name: "Gün Batımı", 
    colors: ["#FF6B6B", "#FFA07A", "#FFD700", "#FF8C00", "#FF4500", "#DC143C", "#FF69B4", "#FF1493"]
  },
  { 
    id: "ocean", 
    name: "Okyanus", 
    colors: ["#006994", "#40E0D0", "#00CED1", "#20B2AA", "#48D1CC", "#00BFFF", "#1E90FF", "#4169E1"]
  },
  { 
    id: "forest", 
    name: "Orman", 
    colors: ["#228B22", "#32CD32", "#00FA9A", "#7CFC00", "#ADFF2F", "#9ACD32", "#6B8E23", "#556B2F"]
  },
  { 
    id: "candy", 
    name: "Şeker", 
    colors: ["#FF69B4", "#FF1493", "#FF00FF", "#DA70D6", "#EE82EE", "#DDA0DD", "#BA55D3", "#9932CC"]
  },
  { 
    id: "neon", 
    name: "Neon", 
    colors: ["#FF00FF", "#00FFFF", "#FF00FF", "#FFFF00", "#00FF00", "#FF6600", "#FF0066", "#6600FF"]
  },
  { 
    id: "pastel", 
    name: "Pastel", 
    colors: ["#FFB3BA", "#BAFFC9", "#BAE1FF", "#FFFFBA", "#FFB3F7", "#E0BBE4", "#957DAD", "#D291BC"]
  },
  { 
    id: "gold", 
    name: "Altın", 
    colors: ["#FFD700", "#FFA500", "#FF8C00", "#DAA520", "#B8860B", "#CD853F", "#D2691E", "#8B4513"]
  }
]

// Hazır şablon listeler
const presetLists = [
  { 
    id: "yesno", 
    name: "Evet / Hayır", 
    items: ["Evet ✓", "Hayır ✗"]
  },
  { 
    id: "days", 
    name: "Haftanın Günleri", 
    items: ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"]
  },
  { 
    id: "numbers", 
    name: "Sayılar (1-10)", 
    items: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
  },
  { 
    id: "food", 
    name: "Yemek Seçimi", 
    items: ["Pizza 🍕", "Burger 🍔", "Sushi 🍣", "Döner 🥙", "Makarna 🍝", "Salata 🥗", "Tavuk 🍗", "Köfte 🧆"]
  },
  { 
    id: "movie", 
    name: "Film Türü", 
    items: ["Aksiyon 💥", "Komedi 😂", "Korku 👻", "Romantik 💕", "Bilim Kurgu 🚀", "Animasyon 🎬", "Belgesel 📚", "Gerilim 😱"]
  },
  { 
    id: "activity", 
    name: "Aktivite", 
    items: ["Yürüyüş 🚶", "Sinema 🎬", "Oyun 🎮", "Kitap 📖", "Müzik 🎵", "Spor ⚽", "Yemek 🍳", "Uyku 😴"]
  },
  { 
    id: "truth-dare", 
    name: "Doğruluk / Cesaret", 
    items: ["Doğruluk 🤔", "Cesaret 💪"]
  },
  { 
    id: "team", 
    name: "Takım Seçimi", 
    items: ["Takım A 🔴", "Takım B 🔵", "Takım C 🟢", "Takım D 🟡"]
  }
]

// Başarı mesajları
const winMessages = [
  "Tebrikler! 🎉",
  "Şanslı gün! 🍀",
  "Harika seçim! ✨",
  "Kader konuştu! 🔮",
  "İşte kazanan! 🏆",
  "Muhteşem! 💫",
  "Vay canına! 🎯",
  "Süper! 🚀"
]

export function WheelSpinner() {
  // States
  const [options, setOptions] = useState<string[]>(["Seçenek 1", "Seçenek 2", "Seçenek 3", "Seçenek 4"])
  const [newOption, setNewOption] = useState("")
  const [isSpinning, setIsSpinning] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [rotation, setRotation] = useState(0)
  const [history, setHistory] = useState<{ result: string; time: string }[]>([])
  const [totalSpins, setTotalSpins] = useState(0)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [selectedColorPreset, setSelectedColorPreset] = useState(colorPresets[0])
  const [showConfetti, setShowConfetti] = useState(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editValue, setEditValue] = useState("")
  const [spinSpeed, setSpinSpeed] = useState<"slow" | "normal" | "fast">("normal")
  const [showSettings, setShowSettings] = useState(false)
  const [removeAfterWin, setRemoveAfterWin] = useState(false)
  const [resultStats, setResultStats] = useState<Record<string, number>>({})
  
  const wheelRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()

  // Speed durations
  const spinDurations = {
    slow: 6,
    normal: 4,
    fast: 2
  }

  // Play spin sound
  const playSpinSound = useCallback(() => {
    if (!soundEnabled) return
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      
      // Click sounds during spin
      const createClick = (time: number) => {
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()
        
        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)
        
        oscillator.frequency.setValueAtTime(800 + Math.random() * 400, audioContext.currentTime + time)
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime + time)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + time + 0.05)
        
        oscillator.start(audioContext.currentTime + time)
        oscillator.stop(audioContext.currentTime + time + 0.05)
      }
      
      // Create multiple clicks
      for (let i = 0; i < 20; i++) {
        createClick(i * 0.15)
      }
    } catch (e) {
      // Audio not available
    }
  }, [soundEnabled])

  // Play win sound
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
        
        oscillator.frequency.setValueAtTime(freq, audioContext.currentTime + i * 0.15)
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime + i * 0.15)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + i * 0.15 + 0.4)
        
        oscillator.start(audioContext.currentTime + i * 0.15)
        oscillator.stop(audioContext.currentTime + i * 0.15 + 0.4)
      })
    } catch (e) {
      // Audio not available
    }
  }, [soundEnabled])

  // Spin the wheel
  const spinWheel = useCallback(() => {
    if (options.length < 2 || isSpinning) return
    
    setIsSpinning(true)
    setResult(null)
    playSpinSound()
    
    // Calculate winning segment
    const winningIndex = Math.floor(Math.random() * options.length)
    const segmentAngle = 360 / options.length
    
    // Calculate target rotation (multiple full rotations + position)
    const fullRotations = 5 + Math.floor(Math.random() * 3) // 5-7 full rotations
    const targetAngle = 360 - (winningIndex * segmentAngle + segmentAngle / 2) // Point to center of segment
    const newRotation = rotation + (fullRotations * 360) + targetAngle - (rotation % 360)
    
    setRotation(newRotation)
    
    const duration = spinDurations[spinSpeed]
    
    // After spin completes
    setTimeout(() => {
      const winner = options[winningIndex]
      setResult(winner)
      setIsSpinning(false)
      setTotalSpins(prev => prev + 1)
      setShowConfetti(true)
      playWinSound()
      
      // Update stats
      setResultStats(prev => ({
        ...prev,
        [winner]: (prev[winner] || 0) + 1
      }))
      
      // Add to history
      const now = new Date()
      const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
      setHistory(prev => [{ result: winner, time: timeString }, ...prev].slice(0, 20))
      
      // Remove winner if option enabled
      if (removeAfterWin && options.length > 2) {
        setOptions(prev => prev.filter((_, i) => i !== winningIndex))
      }
      
      setTimeout(() => setShowConfetti(false), 3000)
    }, duration * 1000)
  }, [options, isSpinning, rotation, spinSpeed, playSpinSound, playWinSound, removeAfterWin])

  // Add option
  const addOption = () => {
    if (newOption.trim() && options.length < 20) {
      setOptions([...options, newOption.trim()])
      setNewOption("")
    }
  }

  // Remove option
  const removeOption = (index: number) => {
    if (options.length > 2) {
      const removed = options[index]
      setOptions(options.filter((_, i) => i !== index))
      // Update stats
      const newStats = { ...resultStats }
      delete newStats[removed]
      setResultStats(newStats)
    }
  }

  // Edit option
  const startEdit = (index: number) => {
    setEditingIndex(index)
    setEditValue(options[index])
  }

  const saveEdit = () => {
    if (editingIndex !== null && editValue.trim()) {
      const oldValue = options[editingIndex]
      const newOptions = [...options]
      newOptions[editingIndex] = editValue.trim()
      setOptions(newOptions)
      
      // Update stats key
      if (resultStats[oldValue]) {
        const newStats = { ...resultStats }
        newStats[editValue.trim()] = newStats[oldValue]
        delete newStats[oldValue]
        setResultStats(newStats)
      }
    }
    setEditingIndex(null)
    setEditValue("")
  }

  // Load preset list
  const loadPresetList = (presetId: string) => {
    const preset = presetLists.find(p => p.id === presetId)
    if (preset) {
      setOptions([...preset.items])
      setResultStats({})
      setHistory([])
    }
  }

  // Shuffle options
  const shuffleOptions = () => {
    const shuffled = [...options].sort(() => Math.random() - 0.5)
    setOptions(shuffled)
  }

  // Reset all
  const resetAll = () => {
    setOptions(["Seçenek 1", "Seçenek 2", "Seçenek 3", "Seçenek 4"])
    setResult(null)
    setHistory([])
    setTotalSpins(0)
    setResultStats({})
    setRotation(0)
  }

  // Copy options to clipboard
  const copyOptions = () => {
    navigator.clipboard.writeText(options.join("\n"))
  }

  // Paste options from clipboard
  const pasteOptions = async () => {
    try {
      const text = await navigator.clipboard.readText()
      const newItems = text.split("\n").filter(s => s.trim()).slice(0, 20)
      if (newItems.length >= 2) {
        setOptions(newItems)
        setResultStats({})
      }
    } catch (e) {
      // Clipboard not available
    }
  }

  // Get segment color
  const getSegmentColor = (index: number) => {
    return selectedColorPreset.colors[index % selectedColorPreset.colors.length]
  }

  // Confetti Component
  const Confetti = () => (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {Array(60).fill(0).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: -20
          }}
          animate={{
            y: window.innerHeight + 100,
            x: (Math.random() - 0.5) * 300,
            rotate: Math.random() * 1080,
            opacity: [1, 1, 0]
          }}
          transition={{
            duration: 2.5 + Math.random(),
            ease: "easeOut",
            delay: Math.random() * 0.5
          }}
        >
          {["🎉", "🎊", "✨", "⭐", "🌟", "💫", "🎯", "🏆"][i % 8]}
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
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600 p-6 sm:p-8 text-white"
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSI0Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
        
        {/* Animated decorative elements */}
        <motion.div 
          className="absolute top-4 right-10 text-4xl sm:text-6xl opacity-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          🎡
        </motion.div>
        <motion.div 
          className="absolute bottom-4 left-10 text-3xl sm:text-5xl opacity-20"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          🎯
        </motion.div>
        
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="text-6xl sm:text-8xl"
          >
            🎡
          </motion.div>
          
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-4xl font-bold mb-2">3D Çarkıfelek</h1>
            <p className="text-white/80 text-sm sm:text-lg max-w-2xl">
              Kendi seçeneklerinizi ekleyin ve şansınızı deneyin! 
              Renkli 3D animasyonlar, ses efektleri ve kutlama animasyonları ile eğlenceli deneyim.
            </p>
            <div className="flex flex-wrap gap-2 mt-4 justify-center sm:justify-start">
              <Badge className="bg-white/20 hover:bg-white/30 text-white">🎨 8 Renk Teması</Badge>
              <Badge className="bg-white/20 hover:bg-white/30 text-white">📋 Hazır Listeler</Badge>
              <Badge className="bg-white/20 hover:bg-white/30 text-white">📊 İstatistikler</Badge>
              <Badge className="bg-white/20 hover:bg-white/30 text-white">🔊 Ses Efektleri</Badge>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Confetti Effect */}
      <AnimatePresence>
        {showConfetti && <Confetti />}
      </AnimatePresence>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Wheel Area */}
        <Card className="lg:col-span-2 border-2 border-purple-100">
          <CardContent className="pt-6 sm:pt-8 pb-6 sm:pb-8">
            <div className="flex flex-col items-center space-y-6 sm:space-y-8">
              
              {/* Color Theme Selector */}
              <div className="flex flex-wrap justify-center gap-2">
                {colorPresets.map(preset => (
                  <button
                    key={preset.id}
                    onClick={() => setSelectedColorPreset(preset)}
                    className={`relative w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 transition-all hover:scale-110 ${
                      selectedColorPreset.id === preset.id ? 'ring-2 ring-offset-2 ring-purple-500 border-white' : 'border-gray-200'
                    }`}
                    title={preset.name}
                  >
                    <div className="absolute inset-0 flex">
                      {preset.colors.slice(0, 4).map((color, i) => (
                        <div key={i} className="flex-1" style={{ backgroundColor: color }} />
                      ))}
                    </div>
                  </button>
                ))}
              </div>

              {/* Wheel Container */}
              <div className="relative">
                {/* Pointer */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-20">
                  <motion.div 
                    className="relative"
                    animate={isSpinning ? { y: [0, 5, 0] } : {}}
                    transition={{ duration: 0.1, repeat: isSpinning ? Infinity : 0 }}
                  >
                    <div className="w-0 h-0 border-l-[16px] border-r-[16px] border-t-[28px] border-l-transparent border-r-transparent border-t-red-600 drop-shadow-lg" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-r-[12px] border-t-[20px] border-l-transparent border-r-transparent border-t-red-400" />
                  </motion.div>
                </div>

                {/* Wheel Glow Effect */}
                <motion.div 
                  className="absolute inset-0 rounded-full blur-xl"
                  style={{ 
                    background: `conic-gradient(${selectedColorPreset.colors.map((c, i) => 
                      `${c} ${(i / selectedColorPreset.colors.length) * 100}%`
                    ).join(', ')})`,
                    opacity: 0.3
                  }}
                  animate={isSpinning ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.5, repeat: isSpinning ? Infinity : 0 }}
                />

                {/* Main Wheel */}
                <motion.div
                  ref={wheelRef}
                  className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96"
                  animate={{ rotate: rotation }}
                  transition={{ 
                    duration: spinDurations[spinSpeed], 
                    ease: [0.2, 0.8, 0.2, 1] // Custom easing for realistic spin
                  }}
                  style={{ transformOrigin: "center center" }}
                >
                  {/* Wheel Shadow */}
                  <div className="absolute inset-0 rounded-full shadow-2xl" />
                  
                  {/* Wheel Border */}
                  <div className="absolute inset-0 rounded-full border-8 border-white shadow-xl overflow-hidden">
                    {/* SVG Wheel */}
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      {options.map((option, index) => {
                        const angle = 360 / options.length
                        const startAngle = index * angle - 90
                        const endAngle = startAngle + angle
                        
                        const startRad = (startAngle * Math.PI) / 180
                        const endRad = (endAngle * Math.PI) / 180
                        
                        const x1 = 100 + 100 * Math.cos(startRad)
                        const y1 = 100 + 100 * Math.sin(startRad)
                        const x2 = 100 + 100 * Math.cos(endRad)
                        const y2 = 100 + 100 * Math.sin(endRad)
                        
                        const largeArc = angle > 180 ? 1 : 0
                        
                        const midAngle = (startAngle + endAngle) / 2
                        const midRad = (midAngle * Math.PI) / 180
                        const textX = 100 + 60 * Math.cos(midRad)
                        const textY = 100 + 60 * Math.sin(midRad)
                        
                        return (
                          <g key={index}>
                            {/* Segment */}
                            <path
                              d={`M 100 100 L ${x1} ${y1} A 100 100 0 ${largeArc} 1 ${x2} ${y2} Z`}
                              fill={getSegmentColor(index)}
                              stroke="white"
                              strokeWidth="1"
                              className="transition-all duration-300"
                            />
                            {/* Inner gradient overlay */}
                            <path
                              d={`M 100 100 L ${x1} ${y1} A 100 100 0 ${largeArc} 1 ${x2} ${y2} Z`}
                              fill="url(#segmentGradient)"
                              opacity="0.3"
                            />
                            {/* Text */}
                            <text
                              x={textX}
                              y={textY}
                              fill="white"
                              fontSize={options.length > 8 ? "6" : options.length > 5 ? "8" : "10"}
                              fontWeight="bold"
                              textAnchor="middle"
                              dominantBaseline="middle"
                              transform={`rotate(${midAngle + 90}, ${textX}, ${textY})`}
                              style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
                            >
                              {option.length > 12 ? option.substring(0, 10) + "..." : option}
                            </text>
                          </g>
                        )
                      })}
                      
                      {/* Gradient definition */}
                      <defs>
                        <radialGradient id="segmentGradient">
                          <stop offset="0%" stopColor="white" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="black" stopOpacity="0.2" />
                        </radialGradient>
                      </defs>
                    </svg>
                  </div>

                  {/* Center Circle */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white shadow-lg flex items-center justify-center z-10">
                    <motion.div
                      animate={isSpinning ? { rotate: -rotation } : { rotate: 0 }}
                      transition={{ duration: spinDurations[spinSpeed], ease: [0.2, 0.8, 0.2, 1] }}
                    >
                      {isSpinning ? (
                        <span className="text-2xl sm:text-3xl">🎡</span>
                      ) : result ? (
                        <span className="text-2xl sm:text-3xl">🎯</span>
                      ) : (
                        <span className="text-2xl sm:text-3xl">🎲</span>
                      )}
                    </motion.div>
                  </div>

                  {/* Decorative dots on wheel edge */}
                  {options.map((_, index) => {
                    const angle = (index * 360 / options.length - 90) * Math.PI / 180
                    const x = 50 + 46 * Math.cos(angle)
                    const y = 50 + 46 * Math.sin(angle)
                    return (
                      <div
                        key={index}
                        className="absolute w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full shadow-md"
                        style={{
                          left: `${x}%`,
                          top: `${y}%`,
                          transform: "translate(-50%, -50%)"
                        }}
                      />
                    )
                  })}
                </motion.div>
              </div>

              {/* Speed Selector */}
              <div className="flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-2">
                <Zap className="h-4 w-4 text-slate-500" />
                <span className="text-xs sm:text-sm font-medium text-slate-600">Hız:</span>
                <div className="flex gap-1">
                  {(["slow", "normal", "fast"] as const).map(speed => (
                    <Button
                      key={speed}
                      size="sm"
                      variant={spinSpeed === speed ? "default" : "ghost"}
                      className={`text-xs px-2 sm:px-3 ${spinSpeed === speed ? "bg-purple-600 hover:bg-purple-700" : ""}`}
                      onClick={() => setSpinSpeed(speed)}
                    >
                      {speed === "slow" ? "Yavaş" : speed === "normal" ? "Normal" : "Hızlı"}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Spin Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  onClick={spinWheel}
                  disabled={isSpinning || options.length < 2}
                  className="w-56 sm:w-64 h-14 sm:h-16 text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 hover:from-purple-700 hover:via-pink-700 hover:to-rose-700 shadow-lg disabled:opacity-50"
                >
                  {isSpinning ? (
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                      className="text-2xl"
                    >
                      🎡
                    </motion.span>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 mr-2" />
                      Çarkı Çevir!
                    </>
                  )}
                </Button>
              </motion.div>

              {/* Sound Toggle */}
              <Button
                size="sm"
                variant={soundEnabled ? "default" : "outline"}
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="gap-2"
              >
                {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                {soundEnabled ? "Ses Açık" : "Ses Kapalı"}
              </Button>

              {/* Result Display */}
              <AnimatePresence>
                {result && !isSpinning && (
                  <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -30, scale: 0.8 }}
                    className="relative"
                  >
                    <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-rose-50 rounded-2xl p-6 sm:p-8 border-2 border-purple-200 shadow-xl">
                      <div className="flex items-center justify-center gap-4">
                        <motion.div
                          animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                          transition={{ duration: 0.5 }}
                        >
                          <PartyPopper className="h-8 w-8 sm:h-10 sm:w-10 text-purple-600" />
                        </motion.div>
                        <div className="text-center">
                          <p className="text-sm text-purple-600 font-medium mb-1">
                            {winMessages[Math.floor(Math.random() * winMessages.length)]}
                          </p>
                          <motion.p 
                            className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent"
                            initial={{ scale: 0 }}
                            animate={{ scale: [0, 1.2, 1] }}
                            transition={{ duration: 0.5 }}
                          >
                            {result}
                          </motion.p>
                        </div>
                        <motion.div
                          animate={{ rotate: [0, 10, -10, 10, -10, 0] }}
                          transition={{ duration: 0.5 }}
                        >
                          <PartyPopper className="h-8 w-8 sm:h-10 sm:w-10 text-rose-600" />
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>

        {/* Right Panel - Options & Stats */}
        <div className="space-y-4">
          {/* Options Card */}
          <Card className="border-2 border-purple-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-base sm:text-lg flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-purple-500" />
                  Seçenekler ({options.length}/20)
                </span>
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost" onClick={shuffleOptions} title="Karıştır">
                    <Shuffle className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={copyOptions} title="Kopyala">
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={pasteOptions} title="Yapıştır">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Preset Lists */}
              <div className="flex flex-wrap gap-1">
                {presetLists.map(preset => (
                  <Button
                    key={preset.id}
                    size="sm"
                    variant="outline"
                    className="text-xs h-7 px-2"
                    onClick={() => loadPresetList(preset.id)}
                  >
                    {preset.name}
                  </Button>
                ))}
              </div>

              {/* Add Option */}
              <div className="flex gap-2">
                <Input
                  placeholder="Yeni seçenek ekle..."
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addOption()}
                  className="text-sm"
                  maxLength={30}
                />
                <Button 
                  onClick={addOption} 
                  disabled={!newOption.trim() || options.length >= 20}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {/* Options List */}
              <div className="max-h-48 overflow-y-auto space-y-1.5">
                {options.map((option, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 p-2 rounded-lg group"
                    style={{ backgroundColor: `${getSegmentColor(index)}20` }}
                  >
                    <div 
                      className="w-3 h-3 rounded-full flex-shrink-0" 
                      style={{ backgroundColor: getSegmentColor(index) }}
                    />
                    
                    {editingIndex === index ? (
                      <>
                        <Input
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="h-7 text-xs flex-1"
                          autoFocus
                          onKeyPress={(e) => e.key === "Enter" && saveEdit()}
                          maxLength={30}
                        />
                        <Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={saveEdit}>
                          <Check className="h-3 w-3 text-green-600" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={() => setEditingIndex(null)}>
                          <X className="h-3 w-3 text-red-600" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <span className="text-xs sm:text-sm font-medium flex-1 truncate">{option}</span>
                        {resultStats[option] && (
                          <Badge variant="secondary" className="text-xs">
                            {resultStats[option]}x
                          </Badge>
                        )}
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                          onClick={() => startEdit(index)}
                        >
                          <Edit2 className="h-3 w-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 text-red-600 hover:text-red-800"
                          onClick={() => removeOption(index)}
                          disabled={options.length <= 2}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Remove after win toggle */}
              <label className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={removeAfterWin}
                  onChange={(e) => setRemoveAfterWin(e.target.checked)}
                  className="rounded border-slate-300"
                />
                Kazananı listeden çıkar
              </label>
            </CardContent>
          </Card>

          {/* Stats Card */}
          <Card className="border-2 border-amber-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                <Trophy className="h-5 w-5 text-amber-500" />
                İstatistikler
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-amber-50 rounded-lg">
                <span className="text-xs sm:text-sm text-slate-600">Toplam Çevirme</span>
                <Badge variant="secondary" className="text-sm font-bold">{totalSpins}</Badge>
              </div>
              
              {Object.entries(resultStats).length > 0 && (
                <div className="space-y-1 pt-2 border-t">
                  <p className="text-xs text-slate-500 font-medium">En çok gelenler:</p>
                  {Object.entries(resultStats)
                    .sort(([,a], [,b]) => b - a)
                    .slice(0, 5)
                    .map(([option, count], i) => (
                      <div key={option} className="flex items-center justify-between text-xs sm:text-sm">
                        <span className="flex items-center gap-1 truncate">
                          {i === 0 && <Crown className="h-3 w-3 text-yellow-500" />}
                          {i === 1 && <Medal className="h-3 w-3 text-gray-400" />}
                          {i === 2 && <Medal className="h-3 w-3 text-amber-600" />}
                          {option}
                        </span>
                        <span className="font-medium text-purple-600">{count}x</span>
                      </div>
                    ))
                  }
                </div>
              )}
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={resetAll}
                className="w-full mt-2 gap-2"
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
                Son Sonuçlar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-h-40 overflow-y-auto space-y-1.5">
                {history.length === 0 ? (
                  <p className="text-xs sm:text-sm text-slate-400 text-center py-4">
                    Henüz çevirme yapılmadı
                  </p>
                ) : (
                  history.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-between p-2 bg-slate-50 rounded-lg text-xs sm:text-sm"
                    >
                      <span className="text-slate-400">{item.time}</span>
                      <span className="font-medium text-purple-600 truncate ml-2">{item.result}</span>
                    </motion.div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Educational Section */}
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-2 border-purple-100">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Target className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold mb-2">Kullanım Alanları</h3>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-1">
                  <li>• Karar verme</li>
                  <li>• Oyun & eğlence</li>
                  <li>• Çekiliş yapma</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-pink-100">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-pink-100 rounded-lg">
                <Lightbulb className="h-5 w-5 text-pink-600" />
              </div>
              <div>
                <h3 className="font-bold mb-2">İpuçları</h3>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-1">
                  <li>• Emoji kullanabilirsin 🎉</li>
                  <li>• Hazır listeler var</li>
                  <li>• Max 20 seçenek</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-rose-100">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-rose-100 rounded-lg">
                <Gift className="h-5 w-5 text-rose-600" />
              </div>
              <div>
                <h3 className="font-bold mb-2">Özellikler</h3>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-1">
                  <li>• 8 renk teması</li>
                  <li>• 3 hız seçeneği</li>
                  <li>• Ses efektleri</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-amber-100">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <Info className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-bold mb-2">İlginç Bilgiler</h3>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-1">
                  <li>• Her seçenek eşit şans</li>
                  <li>• Gerçek rastgelelik</li>
                  <li>• Adil sonuçlar</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
