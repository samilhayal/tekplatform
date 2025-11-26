"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { motion } from "framer-motion"

export function RandomizerTool() {
  const [diceResult, setDiceResult] = useState<number | null>(null)
  const [diceRolling, setDiceRolling] = useState(false)
  
  const [coinResult, setCoinResult] = useState<string | null>(null)
  const [coinFlipping, setCoinFlipping] = useState(false)
  const [coinCurrency, setCoinCurrency] = useState("TRY")
  
  const [cardResult, setCardResult] = useState<string | null>(null)
  const [cardDrawing, setCardDrawing] = useState(false)
  
  const [wheelResult, setWheelResult] = useState<string | null>(null)
  const [wheelSpinning, setWheelSpinning] = useState(false)
  const [wheelOptions, setWheelOptions] = useState(["Seçenek 1", "Seçenek 2", "Seçenek 3", "Seçenek 4"])
  const [newOption, setNewOption] = useState("")

  // Dice Roll
  const rollDice = () => {
    setDiceRolling(true)
    setTimeout(() => {
      const result = Math.floor(Math.random() * 6) + 1
      setDiceResult(result)
      setDiceRolling(false)
    }, 1000)
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

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Tabs defaultValue="dice" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dice">🎲 Zar</TabsTrigger>
          <TabsTrigger value="coin">🪙 Yazı Tura</TabsTrigger>
          <TabsTrigger value="card">🃏 Kart</TabsTrigger>
          <TabsTrigger value="wheel">🎡 Çarkıfelek</TabsTrigger>
        </TabsList>

        {/* Dice */}
        <TabsContent value="dice">
          <Card>
            <CardContent className="pt-12 pb-12">
              <div className="flex flex-col items-center space-y-8">
                <motion.div
                  className="relative w-32 h-32 perspective-1000"
                  animate={diceRolling ? {
                    rotateX: [0, 360, 720],
                    rotateY: [0, 360, 720],
                    rotateZ: [0, 180, 360]
                  } : {}}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  <div 
                    className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-2xl flex items-center justify-center border-4 border-white"
                    style={{
                      transform: "rotateX(0deg) rotateY(0deg)",
                      transformStyle: "preserve-3d"
                    }}
                  >
                    {diceResult && !diceRolling && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-8xl font-bold text-white"
                      >
                        {diceResult}
                      </motion.span>
                    )}
                    {!diceResult && !diceRolling && (
                      <span className="text-6xl">🎲</span>
                    )}
                  </div>
                </motion.div>

                <Button size="lg" onClick={rollDice} disabled={diceRolling} className="w-48">
                  {diceRolling ? "Atılıyor..." : "Zar At"}
                </Button>

                {diceResult && !diceRolling && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-indigo-50 rounded-xl p-6 border-2 border-indigo-200"
                  >
                    <p className="text-lg text-center text-indigo-900">
                      Sonuç: <span className="font-bold text-3xl">{diceResult}</span>
                    </p>
                  </motion.div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Coin Flip */}
        <TabsContent value="coin">
          <Card>
            <CardContent className="pt-12 pb-12">
              <div className="flex flex-col items-center space-y-8">
                <motion.div
                  className="relative w-40 h-40"
                  animate={coinFlipping ? {
                    rotateY: [0, 1800]
                  } : {}}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                >
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-2xl flex items-center justify-center border-8 border-yellow-300">
                    {coinResult && !coinFlipping && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-5xl font-bold text-white"
                      >
                        {coinResult === "Yazı" ? "Y" : "T"}
                      </motion.span>
                    )}
                    {!coinResult && !coinFlipping && (
                      <span className="text-5xl">🪙</span>
                    )}
                  </div>
                </motion.div>

                <div className="flex gap-2">
                  <select
                    value={coinCurrency}
                    onChange={(e) => setCoinCurrency(e.target.value)}
                    className="px-4 py-2 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="TRY">TRY (₺)</option>
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                  </select>
                </div>

                <Button size="lg" onClick={flipCoin} disabled={coinFlipping} className="w-48">
                  {coinFlipping ? "Atılıyor..." : "Para At"}
                </Button>

                {coinResult && !coinFlipping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-yellow-50 rounded-xl p-6 border-2 border-yellow-200"
                  >
                    <p className="text-lg text-center text-yellow-900">
                      Sonuç: <span className="font-bold text-3xl">{coinResult}</span>
                    </p>
                  </motion.div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Card Draw */}
        <TabsContent value="card">
          <Card>
            <CardContent className="pt-12 pb-12">
              <div className="flex flex-col items-center space-y-8">
                <motion.div
                  className="relative w-48 h-72"
                  animate={cardDrawing ? {
                    rotateY: [0, 180, 360],
                    y: [0, -50, 0]
                  } : {}}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  <div className="w-full h-full bg-white rounded-2xl shadow-2xl flex items-center justify-center border-4 border-slate-200">
                    {cardResult && !cardDrawing && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-8xl font-bold"
                        style={{
                          color: cardResult.includes("♥️") || cardResult.includes("♦️") 
                            ? "#dc2626" 
                            : "#000000"
                        }}
                      >
                        {cardResult}
                      </motion.span>
                    )}
                    {!cardResult && !cardDrawing && (
                      <div className="text-center">
                        <span className="text-6xl">🃏</span>
                        <p className="text-sm text-slate-500 mt-2">Kart Destesi</p>
                      </div>
                    )}
                  </div>
                </motion.div>

                <Button size="lg" onClick={drawCard} disabled={cardDrawing} className="w-48">
                  {cardDrawing ? "Çekiliyor..." : "Kart Çek"}
                </Button>

                {cardResult && !cardDrawing && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-slate-50 rounded-xl p-6 border-2 border-slate-200"
                  >
                    <p className="text-lg text-center text-slate-900">
                      Çekilen Kart: <span className="font-bold text-3xl">{cardResult}</span>
                    </p>
                  </motion.div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Wheel */}
        <TabsContent value="wheel">
          <Card>
            <CardContent className="pt-12 pb-12">
              <div className="flex flex-col items-center space-y-8">
                <motion.div
                  className="relative w-64 h-64"
                  animate={wheelSpinning ? {
                    rotate: [0, 1440]
                  } : {}}
                  transition={{ duration: 2, ease: "easeOut" }}
                >
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 shadow-2xl flex items-center justify-center border-8 border-white relative overflow-hidden">
                    {wheelOptions.map((_, index) => (
                      <div
                        key={index}
                        className="absolute w-full h-full"
                        style={{
                          transform: `rotate(${(360 / wheelOptions.length) * index}deg)`,
                          transformOrigin: "center"
                        }}
                      >
                        <div className="h-1/2 w-0.5 bg-white mx-auto" />
                      </div>
                    ))}
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      {wheelResult && !wheelSpinning ? (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-2xl font-bold text-white text-center px-4"
                        >
                          {wheelResult}
                        </motion.span>
                      ) : (
                        <span className="text-6xl">🎡</span>
                      )}
                    </div>
                  </div>
                  
                  {/* Pointer */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-red-600" />
                </motion.div>

                <div className="w-full max-w-md space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Yeni seçenek ekle..."
                      value={newOption}
                      onChange={(e) => setNewOption(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addWheelOption()}
                    />
                    <Button onClick={addWheelOption}>Ekle</Button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {wheelOptions.map((option, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-slate-100 rounded-lg p-3"
                      >
                        <span className="text-sm font-medium">{option}</span>
                        <button
                          onClick={() => removeWheelOption(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <Button 
                  size="lg" 
                  onClick={spinWheel} 
                  disabled={wheelSpinning || wheelOptions.length === 0} 
                  className="w-48"
                >
                  {wheelSpinning ? "Dönüyor..." : "Çarkı Çevir"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
